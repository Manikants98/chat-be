import express, { Request, Response } from 'express';
import { signInFn } from '../controllers/authentication/signin';
import { signUpFn } from '../controllers/authentication/signup';
import { contactsFn } from '../controllers/contacts';
import { messagesFn } from '../controllers/messages';
import { getUsersFn } from '../controllers/users';

const route = express.Router();

route.get('/', (req: Request, res: Response) => {
  res.send('MKX CHAT APIs 1.3');
});

route.all('/profile', getUsersFn);
route.post('/signup', signUpFn);
route.post('/signin', signInFn);
route.all('/contacts', contactsFn);
route.all('/messages', messagesFn);

export default route;
