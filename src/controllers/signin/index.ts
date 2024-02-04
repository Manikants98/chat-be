import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../../models/users';

interface RequestBody {
  email: string;
  password: string;
}

export const signInFn = async (req: Request, res: Response) => {
  const { email, password }: RequestBody = await req.body;
  console.log(req.body);
  try {
    if (!email) {
      return res.status(400).json({ message: 'Please enter your email' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Please enter your password' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Oops! You have enterd incorrect email.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Oops! You have enterd incorrect password.' });
    }
    return res.status(200).json({ message: 'Login successful', token: user.token });
  } catch (error) {
    return res.status(500).json({ error: 'Login failed. Please try again later' });
  }
};
