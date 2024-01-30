import mongoose, { ConnectOptions } from 'mongoose';

const uri: string =
  'mongodb+srv://dadzheromani:PeWU5zRkj2Wk9DCj@cluster0.tusysu3.mongodb.net/chatsDB?retryWrites=true&w=majority';

const useConnectDB = () => {
  try {
    mongoose.connect(uri);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      console.log('Connected to MongoDB');
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default useConnectDB;
