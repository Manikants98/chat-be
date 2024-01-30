import express, { Request, Response } from 'express';
import useConnectDB from '../config/mongo.config';
import User from '../models/user';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.send('MKX CHAT APIs');
});

router.get('/users', async (req: Request, res: Response) => {
  useConnectDB();
  const users = await User.find();
  res.send({ users, message: 'User Get Successfully' });
});

export default router;
