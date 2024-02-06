import { Request, Response } from 'express';
import { User } from '../../models/Users';

export async function getUsersFn(req: Request, res: Response) {
  try {
    const message = 'Users Executed Successfully';
    // const users = await User.find();
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).send({ error });
  }
}
