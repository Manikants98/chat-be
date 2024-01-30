import express, { Request, Response } from 'express';
import useConnectDB from '../config/mongo.config';
import User from '../schemas/user';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  useConnectDB();
  const users = await User.find();
  res.send({ users, message: 'User Get Successfully' });
});

router.get('/mani', (req: Request, res: Response) => {
  res.send('Hello, Mani!');
});

export default router;
