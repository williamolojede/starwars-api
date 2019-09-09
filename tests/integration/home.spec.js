import request from 'supertest';

import { app } from '../../src/app';

describe('API root', () => {
  it('should respond with status code 200 and a welcome message', async () => {
    const response = await request(app).get('/api');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Welcome to the starwars movies api.');
  });
});
