import { Request, Response } from 'express';
import { Messages } from '../../models/Messages';
import { User } from '../../models/Users';

interface requestBody {
  contact_id: string;
  message: string | object;
  message_type: 'image' | 'video' | 'text' | 'document';
}

export const messagesFn = async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const { contact_id, message, message_type }: requestBody = await req.body;

    const token = req.headers.authorization;

    if (!contact_id) {
      return res.status(400).json({ message: 'Missing Name' });
    }

    if (!message) {
      return res.status(400).json({ message: 'Missing Message' });
    }

    if (!message_type) {
      return res.status(400).json({ message: 'Missing Message Type' });
    }

    const newMessage = new Messages({
      contact_id,
      message,
      message_type,
      is_sender: true
    });
    await newMessage.save();
    return res.json({ message: 'Message sent successfully' });
  }

  if (req.method === 'GET') {
    const { contact_id } = req.query;

    console.log(req.query);

    if (!contact_id) {
      return res.status(400).json({ message: 'Missing key contact_id' });
    }

    const token = req.headers.authorization;

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).json({ message: 'Provide Valid Token' });
    }

    const messages = await Messages.find({ contact_id });

    return res.json({ message: 'Messages get successfully', messages });
  }
  return res.status(405).json({ message: `${req.method} method not allowed` });
};
