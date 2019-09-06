import axios from 'axios';
import orderBy from 'lodash.orderby';

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

export const getCharacters = async (req) => {
  const { sort, order, filter } = req.query;
  const { episodeId } = req.params;

  let data;
  const { data: { characters } } = await axios
    .get(`https://swapi.co/api/films/${episodeId}`);
  data = (await Promise.all(
    characters
      .map(async (characterUrl) => await axios.get(characterUrl))
  )).map(({ data }) => data);

  if (sort) {
    data = orderBy(data, [sort], [order ? order : 'asc']);
  }

  if (filter) {
    data = data.filter(({ gender }) => gender === filter);
  }

  const totalHeight = data
    .reduce((acc, cur) =>  acc + Number(cur.height), 0);

  return {
    payload: {
      data,
      meta: {
        count: data.length,
        totalHeight: {
          cm: totalHeight,
        },
      },
    },
    statusCode: 200,
  }
}
