import { Request, Response, NextFunction } from 'express';

export const useAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/' || req.path === '/upload') {
    return next();
  }
  if (req.headers.authorization) {
    return next();
  } else {
    return res.status(401).json({ message: 'Authorization is missing!' });
  }
};
