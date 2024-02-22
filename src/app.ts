
import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import useConnectDB from './config/mongo.config';
import { useAuth } from './middlewares/useAuth';
import route from './routes';
import { socketFn } from './controllers/socketmkx';


const app = express();
const port = 4000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    allowedHeaders: '*'
  }
});

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(useConnectDB);

app.use(useAuth);

app.use(cors());

app.use(route);

app.use('/socket', (req, res) => {
  res.send('Socket event handler mounted on /socket');
});

io.on('connect', (socket) => {
  socketFn(socket, io);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
