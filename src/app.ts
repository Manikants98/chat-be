import express from 'express';
import routes from './routes';
import useConnectDB from './config/mongo.config';
import { useAuth } from './middlewares/useAuth';
import cors from 'cors';
const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(useConnectDB);
app.use(useAuth);
app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
