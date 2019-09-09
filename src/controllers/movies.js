import orderBy from 'lodash.orderby';

import models from '../models';
import { 
  SwapiService,
  calculateCharactersTotalHeight,
} from '../utils';

const { Comment } = models;

export const getMovies = async () => {
  const movies = await SwapiService.getMovies();
  const episodeIds = movies.map(({ episode_id }) => episode_id);
  
  const commentsCountGroup = await Comment.count({ 
    where: { episodeId: episodeIds },
    group: ['episodeId'],
  });

  return {
    payload: {
      data: movies
        .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
        .map(({ title, opening_crawl, episode_id, release_date }) => {
          const commentsCount = commentsCountGroup
            .find(({ episodeId }) => episodeId === episode_id) 

          return ({ 
            name: title, 
            openingCrawl: opening_crawl,
            episodeId: episode_id,
            releaseDate: release_date,
            commentCounts:  commentsCount ? Number(commentsCount.count) : 0,
         })
      }),
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

  const characters = await SwapiService.getEpisodeCharacters(episodeId)

  if (sort) {
    characters = orderBy(data, [sort], [order ? order : 'asc']);
  }

  if (filter) {
    characters = data.filter(({ gender }) => gender === filter);
  }

  return {
    payload: {
      data: characters,
      meta: {
        count: characters.length,
        totalHeight: calculateCharactersTotalHeight(characters),
      },
    },
    statusCode: 200,
  }
}
