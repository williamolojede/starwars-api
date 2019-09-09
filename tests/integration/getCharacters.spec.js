import request from 'supertest';

import { app } from '../../src/app';

jest.setTimeout(10000);

describe('Get Characters', () => {
  it('should return a list of characters ', async () => {
    const response = await request(app).get('/api/movies/1/characters');
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchSnapshot();
  });
});
