import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import useConnectDB from './config/mongo.config';
import { testFn } from './controllers/Test';
import { useAuth } from './middlewares/useAuth';
import routes from './routes';
const app = express();
const PORT = 3001;
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(useConnectDB);
app.use(useAuth);
app.use(routes);

app.use('/socket', (req, res) => {
  res.send('Socket event handler mounted on /socket');
});

io.on('connection', testFn);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
