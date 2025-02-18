import express from 'express';
import cors from 'cors';
import routesEvent from './routes/event.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routesEvent);

export default app;

