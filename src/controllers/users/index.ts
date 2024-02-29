import { Request, Response } from 'express';
import User from '../../models/users';

/**
 * Handles GET and PUT requests for user data.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @returns {Response} - The Express Response object.
 */
export async function getUsersFn(req: Request, res: Response): Promise<Response> {
  try {
    if (req.method === 'GET') {
      const token = req.headers.authorization;
      const user = await User.findOne({ token }).select('-password -token -__v');
      return res.status(200).json({ message: "Data Get Successfully", user });
    } else if (req.method === "PUT") {
      const token = req.headers.authorization;
      const { name } = req.body;
      await User.findOneAndUpdate({ token }, { name }, { new: true });
      return res.status(200).json({ message: "User Updated Successfully" });
    } else {
      return res.status(405).json({ message: `${req.method} method not allowed` });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
