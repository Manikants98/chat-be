import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server, Socket } from 'socket.io';
import { uri } from '../../config/mongo.config';
import { Messages } from '../../models/Messages';

interface RequestBody {
  contact_id: string;
  message: string | object;
  message_type: 'image' | 'video' | 'text' | 'document';
  sender: string;
}

const app = express();
const server = http.createServer(app);
const io = new Server(server);

export const socketFn = async (socket: Socket) => {
  console.log('A user connected');
  await mongoose.connect(uri);

  socket.on('sendMessage', async (data: RequestBody) => {
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

    io.emit('newMessage', { message: 'Message sent successfully' });
  });

  socket.on('getMessages', async () => {
    const messages = await Messages.find({ contact_id: '65c1fa406709e451bc22f928' }).populate([
      { path: 'sender', select: 'name email _id' }
    ]);

    console.log('mkx');
    socket.emit('messages', { message: 'Messages get successfully', messages });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
};
