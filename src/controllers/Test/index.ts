import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server, Socket } from 'socket.io';

import { uri } from '../../config/mongo.config';
import { Messages } from '../../models/Messages';
const app = express();
const server = http.createServer(app);
const io = new Server(server);
interface RequestBody {
  contact_id: string;
  message: string | object;
  message_type: 'image' | 'video' | 'text' | 'document';
  sender: string;
}
export const testFn = async (socket: Socket) => {
  console.log('Socket Connected');
  try {
    await mongoose.connect(uri);
    console.log('MongoDB Connected');
    socket.on('getMessages', async () => {
      console.log('Event Triggered');
      try {
        const option = [{ path: 'sender', select: 'name email _id' }];
        const messages = await Messages.find({ contact_id: '65c1fa406709e451bc22f928' }).populate(option);
        console.log('Messages sent to Client');
        socket.emit('messages', { message: 'Messages get successfully', messages });
      } catch (error) {
        console.error('Error fetching messages:', error);
        socket.emit('error', { message: 'Error fetching messages' });
      }
    });
    socket.on('sendMessage', async (data: RequestBody) => {
      console.log('sendMessage Triggered');
      const { contact_id, message, message_type, sender } = data;

      if (!contact_id) {
        return socket.emit('error', { message: 'Missing key contact_id' });
      }

      if (!message) {
        return socket.emit('error', { message: 'Missing key message' });
      }

      const contact = new Messages({
        contact_id,
        message,
        message_type,
        sender
      });

      await contact.save();

      io.emit('getMessages', { message: 'Message sent successfully' });
    });

    socket.on('disconnect', () => {
      console.log('Socket Disconnected');
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    socket.emit('error', { message: 'Error connecting to MongoDB' });
  }
};
