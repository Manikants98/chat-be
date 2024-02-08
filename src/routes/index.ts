import express, { Request, Response } from 'express';
import { getUsersFn } from '../controllers/users';
import { signUpFn } from '../controllers/authentication/signup';
import { signInFn } from '../controllers/authentication/signin';
import { contactsFn } from '../controllers/contacts';
import { messagesFn } from '../controllers/messages';

const route = express.Router();

route.get('/', (req: Request, res: Response) => {
  res.send('MKX CHAT APIs 1.1');
});

route.all('/users', getUsersFn);
route.post('/signup', signUpFn);
route.post('/signin', signInFn);
route.all('/contacts', contactsFn);
route.all('/messages', messagesFn);

export default route;
