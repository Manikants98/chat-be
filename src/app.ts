import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import useConnectDB from './config/mongo.config';
import { socketFn } from './controllers/socket2';
import { useAuth } from './middlewares/useAuth';
import route from './routes';

const app = express();

const port = 4000;

const server = http.createServer(app);

export const io = new Server(server, { cors: { allowedHeaders: '*' } });

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(useConnectDB);

app.use(useAuth);

app.use(cors({ allowedHeaders: '*' }));

app.use(route);

io.on('connect', (socket) => {
  socketFn(socket);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
