import express from 'express';
import supertest from 'supertest';

import healthRouter from '../../routers/health';

describe('Health router', () => {
  it('Pass health check (GET)', async () => {
    const app = express();
    app.use(healthRouter());
    const response = await supertest(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('success');
    expect(response.body.data).toBe('OK');
  });
  it('Pass health check (POST)', async () => {
    const app = express();
    app.use(express.json({ limit: '20mb' }));
    app.use(healthRouter());
    const response = await supertest(app).post('/health').send({
      health: 'good',
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('success');
    expect(response.body.data).toBe('good');
  });
});
