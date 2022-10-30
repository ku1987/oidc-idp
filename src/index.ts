import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import healthRouter from './routers/health';
import authorizeRouter from './routers/authorize';
import redirectRouter from './routers/redirect';

const app = express();

app.use(express.json({ limit: '20mb' }));
app.use(cors());
app.use(morgan('combined'));

app.use(healthRouter());
app.use(redirectRouter());
app.use(authorizeRouter());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
