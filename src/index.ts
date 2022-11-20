import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import healthRouter from './routers/health';
import authorizeRouter from './routers/authorize';
import clientRouter from './routers/client';
import tokenRouter from './routers/token';

const app = express();

app.use(express.json({ limit: '20mb' }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.use(healthRouter());
app.use(clientRouter());
app.use(authorizeRouter());
app.use(tokenRouter());

const PORT = process.env.PORT || 3000;

app
  .listen(PORT, () => console.log(`Listening on port ${PORT}.`))
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown');
  });
