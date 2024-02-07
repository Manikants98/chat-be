import { Request, Response, NextFunction } from 'express';
// import User from '../../models/Users';

export const useAuth = async (req: Request, res: Response, next: NextFunction) => {
  const withoutToken = ['/', '/upload', '/signup', '/signin'];

  if (withoutToken.includes(req.path)) {
    return next();
  }

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authorization is missing!' });
  }

  // const user = await User.findOne({ token });

  // if (!user) {
  return res.status(401).json({ message: 'Invalid Authorization Token' });
  // }
  next();
};
