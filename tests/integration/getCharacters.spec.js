import request from 'supertest';

import { app } from '../../src/app';

jest.setTimeout(10000);

describe('Get Characters', () => {
  it('should return a list of characters', async () => {
    const response = await request(app).get('/api/movies/1/characters');
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchSnapshot();
  });

  it('should return a list of only female characters', async () => {
    const response = await request(app).get('/api/movies/1/characters?filter=female');
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchSnapshot();
  });

  it('should return a list of characters sorted by name in descending order', async () => {
    const response = await request(app).get('/api/movies/1/characters?sort=name&order=desc');
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchSnapshot();
  });

  it('should return a list of characters sorted by height in ascending order', async () => {
    const response = await request(app).get('/api/movies/1/characters?sort=height&order=asc');
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchSnapshot();
  });
});
