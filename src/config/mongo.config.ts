import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const uri: string =
  'mongodb+srv://dadzheromani:PeWU5zRkj2Wk9DCj@cluster0.tusysu3.mongodb.net/chatsDB?retryWrites=true&w=majority';

const useConnectDB = (req: Request, res: Response, next: NextFunction) => {
  try {
    mongoose.connect(uri);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      console.log('MongoDB is Connected');
    });
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default useConnectDB;
