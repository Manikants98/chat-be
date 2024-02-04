import express, { Request, Response } from 'express';
import { signInFn } from '../controllers/signin';
import { signUpFn } from '../controllers/signup';
import { User } from '../models/users';
const route = express.Router();

route.get('/', async (req: Request, res: Response) => {
  res.send('MKX CHAT APIs');
});

route.get('/users', async (req: Request, res: Response) => {
  const users = await User.find();
  res.send({ users, message: 'User Get Successfully' });
});

route.post('/signup', signUpFn);
route.post('/signin', signInFn);

export default route;
