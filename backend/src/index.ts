import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { corsOptions, limiter } from './config';
import { notFound, errorHandler } from './middleware';
import { routes } from './routes';
import { db, initializeDatabase } from './database';
import { SYSTEM_MESSAGES } from './constants';

const app: express.Application = express();
app.set('trust proxy', 'loopback');

//--------------------Security Middleware Suite--------------------
app.use(helmet());
app.use(cors(corsOptions));
app.use(limiter);

//--------------------Initialize Database Suite--------------------
initializeDatabase(db);

//--------------------Common Utility Suite--------------------
app.use(express.json());

//--------------------API Endpoint Routing Suite--------------------
app.use('/api', routes);

//--------------------Error Handling Middleware--------------------
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () =>
  process.stdout.write(
    `${SYSTEM_MESSAGES.SERVER_STARTED} ${process.env.PORT}∆\n`
  )
);
