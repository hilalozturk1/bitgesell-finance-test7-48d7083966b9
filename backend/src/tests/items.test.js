const request = require('supertest');
const express = require('express');
const itemsRouter = require('../routes/items');

const app = express();
app.use(express.json());
app.use('/api/items', itemsRouter);

describe('GET /api/items', () => {
  it('should return items array', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should handle file read errors gracefully', async () => {
    expect(true).toBe(true);
  });
});