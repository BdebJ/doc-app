import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';

const app: Application = express();

app.use(cors(), helmet());
app.use(morgan('dev', { stream: { write: msg => console.log(msg) } }));
app.use(express.json({ limit: '10mb' }), express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api', routes);

app.use(errorHandler);

export default app;