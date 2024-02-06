import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
// import { User } from '../../../models/Users';

interface requestBody {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const signUpFn = async (req: Request, res: Response) => {
  const { name, email, password, role = 'User' }: requestBody = await req.body;

  if (!name) {
    return res.status(400).json({ message: 'Please enter your first name' });
  }

  if (!email) {
    return res.status(400).json({ message: 'Please enter your email' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Please enter your password' });
  }

  // const users = await User.findOne({ email: email });

  // if (users) {
  //   return res.status(400).json({ message: 'This email already exists.' });
  // }
  const token = jwt.sign({ email, role }, 'MkxReactJsDev');
  // const user = new User({
  //   name,
  //   email,
  //   token,
  //   password: await bcrypt.hash(password, 10)
  // });
  // await user.save();
  return res.json({ message: 'User registered successfully', token });
};
