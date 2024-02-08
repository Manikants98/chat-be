import { Request, Response } from 'express';
import { useUser } from '../../helpers';
import { Messages } from '../../models/Messages';

interface requestBody {
  contact_id: string;
  message: string | object;
  message_type: 'image' | 'video' | 'text' | 'document';
}

export const messagesFn = async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const { contact_id, message, message_type }: requestBody = await req.body;

    const user = await useUser(req);

    if (!contact_id) {
      return res.status(400).json({ message: 'Missing key contact_id' });
    }

    if (!message) {
      return res.status(400).json({ message: 'Missing key message' });
    }

    const contact = new Messages({
      contact_id,
      message,
      message_type,
      sender: user._id
    });

    await contact.save();

    return res.json({ message: 'Message sent successfully' });
  }

  if (req.method === 'GET') {
    const { contact_id } = req.query;

    if (!contact_id) {
      return res.status(400).json({ message: 'Missing key contact_id' });
    }

    const { _id, name, email } = await useUser(req);

    const messages = await Messages.find({ contact_id }).populate([{ path: 'sender', select: 'name email _id' }]);

    return res.json({ message: 'Messages get successfully', messages, user: { _id, name, email } });
  }

  return res.status(405).json({ message: `${req.method} method not allowed` });
};
