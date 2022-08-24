import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/app';

const agent = request.agent(app);

describe('cards', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });
  jest.setTimeout(20000);
  describe('GET /cards', () => {
    test('responds with 200 status', async () => {
      const res = await agent.get('/cards');
      expect(res.statusCode).toEqual(200);
    });
  });
});
