import { Request, Response } from 'express';
import { Contact } from '../../models/Contacts';
import User from '../../models/users';
import { useUser } from '../../helpers';

interface requestBody {
  avatar: string;
  name: string;
  email: string;
  mobile_number: string | number | undefined;
  instagram: string;
  linkedin: string;
  contact_type: 'General';
}

export const contactsFn = async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const {
      name,
      email,
      mobile_number,
      instagram = 'https://instagram.com/',
      linkedin = 'https://linkedin.com/',
      contact_type = 'General',
    }: requestBody = await req.body;

    const token = req.headers.authorization;

    if (!name) {
      return res.status(400).json({ message: 'Please enter your name' });
    }

    if (!email) {
      return res.status(400).json({ message: 'Please enter your email' });
    }

    const user = await User.findOne({ token });

    const isContact = await Contact.findOne({ email, sender: user._id });

    if (isContact) {
      return res.status(400).json({ message: 'Contact already exist' });
    }
    const receiver = await User.findOne({ email });

    const contact = new Contact({
      name,
      email,
      mobile_number,
      instagram,
      linkedin,
      contact_type,
      sender: user._id,
      receiver: receiver ? receiver?._id : null,
    });
    await contact.save();
    return res.json({ message: 'Contact created successfully' });
  }

  if (req.method === 'GET') {
    const { contact_id } = req.query;
    const user = await useUser(req);

    try {
      if (contact_id) {
        const contact = await Contact.findById(contact_id).populate([
          { path: 'receiver', select: '-password -token' },
          { path: 'sender', select: '-password -token' },
        ]);
        if (!contact) {
          return res.status(404).json({ message: 'Contact not found' });
        }
        return res.json({ message: 'Contact retrieved successfully', contact });
      }

      const contacts = await Contact.aggregate([
        {
          $match: {
            $or: [{ receiver: user._id }, { sender: user._id }],
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'receiver',
            foreignField: '_id',
            as: 'receiver',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'sender',
            foreignField: '_id',
            as: 'sender',
          },
        },
        {
          $addFields: {
            other: {
              $cond: {
                if: { $eq: ['$receiver._id', user._id] },
                then: '$sender',
                else: '$receiver',
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            mobile_number: 1,
            email: {
              $cond: [
                { $gt: [{ $size: '$other' }, 0] },
                { $arrayElemAt: ['$other.email', 0] },
                { $ifNull: ['$email', null] },
              ],
            },
            created_date: 1,
            last_modified_date: 1,
            is_chat_active: {
              $cond: { if: { $or: ['$receiver', '$sender'] }, then: true, else: false },
            },
          },
        },
      ]);

      return res.json({ message: 'Contacts retrieved successfully', contacts });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ message: `${req.method} method not allowed` });
};
