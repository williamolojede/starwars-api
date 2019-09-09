import request from 'supertest';

import { app } from '../../src/app';

describe('Add Comment', () => {
  it('should create a comment', async () => {
    const response = await request(app).post('/api/movies/1/comments')
      .send({
        comment: 'A new comment',
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Your comment has been saved');
    expect(response.body.data.comment).toBe('A new comment');
  });

  it('should reject request when comment is not provided', async() => {
    const response = await request(app).post('/api/movies/1/comments');
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('"comment" is required');
  });
});
