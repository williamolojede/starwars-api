import axios from 'axios';

import models from '../models';

const { Comment } = models;

export const getMovies = async () => {
  const { data: { results } } = await axios.get('https://swapi.co/api/films');

  return {
    payload: {
      data: results
        .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
        .map(({ title, opening_crawl }) => ({ 
          name: title, 
          opening_crawl,
          comment_counts: 0,
        })),
    },
    statusCode: 200,
  }
};

export const addComment = async (req) => {
  const { clientIp: ipAddress } = req;
  const { episodeId } = req.params;
  const { comment } = req.body;

  const newComment = await Comment.create({
    episodeId,
    comment,
    ipAddress,
  });

  return {
    payload: {
      message: 'Your comment has been saved',
      data: newComment,
    },
    statusCode: 201,
  }
}

export const getComments = async (req) => {
  const { episodeId } = req.params;
  const comments = await Comment.findAll({ 
    where: {
      episodeId,
    },
    order: [['createdAt', 'DESC']]
  });

  return {
    payload: {
      data: comments,
    },
    statusCode: 200,
  }
}
