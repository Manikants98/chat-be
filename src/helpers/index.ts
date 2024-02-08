import { Request } from 'express';
import User from '../models/users';

export const useToken = (req: Request) => req.headers.authorization;

export const useUser = async (req: Request) => {
  const token = useToken(req);
  const user = await User.findOne({ token });
  return user;
};
