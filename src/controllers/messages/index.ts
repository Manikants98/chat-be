import { Request, Response } from 'express';
import { Messages } from '../../models/Messages';

interface requestBody {
  contact_id: string;
  message: string | object;
  message_type: 'image' | 'video' | 'text' | 'document';
}

export const messagesFn = async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const { contact_id, message, message_type }: requestBody = await req.body;

    if (!contact_id) {
      return res.status(400).json({ message: 'Missing key contact_id' });
    }

    if (!message) {
      return res.status(400).json({ message: 'Missing key message' });
    }

    const contact = new Messages({
      contact_id,
      message,
      message_type
    });

    await contact.save();

    return res.json({ message: 'Message sent successfully' });
  }

  if (req.method === 'GET') {
    const { contact_id } = req.query;

    if (!contact_id) {
      return res.status(400).json({ message: 'Missing key contact_id' });
    }

    const messages = await Messages.find({ contact_id });

    return res.json({ message: 'Messages get successfully', messages });
  }

  return res.status(405).json({ message: `${req.method} method not allowed` });
};
