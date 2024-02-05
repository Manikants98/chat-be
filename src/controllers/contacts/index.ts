import { Request, Response } from 'express';
import { Contact } from '../../models/Contacts';
import { User } from '../../models/Users';

interface requestBody {
  avatar: string;
  name: string;
  email: string;
  mobile_number: string | number | undefined;
  instagram: string;
  linkedin: string;
  contact_type: string | 'General';
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
    if (!user) {
      return res.status(401).json({ message: 'Provide Valid Token' });
    }

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
      receiver: receiver ? receiver._id : null
    });
    await contact.save();
    return res.json({ message: 'Contact created successfully' });
  }
  if (req.method === 'GET') {
    const token = req.headers.authorization;

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).json({ message: 'Provide Valid Token' });
    }

    const senderContacts = await Contact.find({ sender: user._id });
    const receiverContacts = await Contact.find({ receiver: user._id });

    const contacts = senderContacts.concat(receiverContacts);
    return res.json({ message: 'Contacts get successfully', contacts });
  }
  return res.status(405).json({ message: `${req.method} method not allowed` });
};
