import { Request, Response } from 'express';
import User from '../../models/users';

export async function getUsersFn(req: Request, res: Response) {
  try {
    const token = req.headers.authorization
    const user = await User.findOne({ token }).select('-password -token -__v');
    res.status(200).json({ message: "Data Get Successfully", user });
  } catch (error) {
    res.status(500).send({ error });
  }
}
