import express from 'express';
import router from './routes';
import { config } from 'dotenv';
const app = express();
const PORT = 3001;
app.use(router);
config();

app.listen(PORT, () => console.log(`Server is listening ${PORT}`));
