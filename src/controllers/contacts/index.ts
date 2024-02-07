import { Request, Response } from 'express';
import { Contact } from '../../models/Contacts';
import User from '../../models/Users';

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
      contact_type = 'General'
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
      return res.json({ message: 'Contact already exist' });
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
      receiver: receiver ? receiver?._id : null
    });
    await contact.save();
    return res.json({ message: 'Contact created successfully' });
  }

  if (req.method === 'GET') {
    const user = await User.findOne({ token: req.headers.authorization });

    const data = await Contact.find({ $or: [{ receiver: user._id }, { sender: user._id }] }).populate([
      { path: 'receiver', select: '-password -token' },
      { path: 'sender', select: '-password -token' }
    ]);

    const contacts = data.map(contact => {
      const other = contact.receiver && contact.receiver.equals(user._id) ? contact.sender : contact.receiver;
      return {
        _id: contact._id,
        name: contact.name,
        email: other ? other.email : contact.email,
        created_date: contact.created_date,
        last_modified_date: contact.last_modified_date,
        is_chat_active: !!other
      };
    });

    return res.json({ message: 'Contacts get successfully', contacts });
  }
  return res.status(405).json({ message: `${req.method} method not allowed` });
};
