import mongoose from 'mongoose';
import { Socket } from 'socket.io';
import { uri } from '../../config/mongo.config';
import { Messages } from '../../models/Messages';
/**
 * Function to handle socket events and emit messages to the client
 * @param {Socket} socket - The socket object
 * @param {number} page - The page number for pagination (default: 1)
 * @param {number} limit - The limit of messages per page (default: 20)
 */
export const socketFn = async (socket: Socket, page: number = 1, limit: number = 20) => {
  await mongoose.connect(uri);
  console.log('Mongo Connected');
  try {
    let messages: object[] = [];
    let reqbody: object = {};
    socket.on('authentication', async (response) => {
      console.log('mkx');
      const { user_id, contact_id } = response;
      reqbody = response;
      messages = await Messages.find({ contact_id })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ _id: -1 });
      socket.emit('messages', { messages });
      console.log('Messages Sent', messages);
      console.log('Messages reqbody', reqbody);
    });
  } catch (error) {
    socket.emit('error', { error });
  }
};
