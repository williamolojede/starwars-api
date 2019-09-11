import models from '../models';
import { SwapiService, formatMovie } from '../utils';

const { Comment } = models;

export const getMovies = async () => {
  let movies = await SwapiService.getMovies();

  const episodeIds = movies.map(({ episode_id }) => episode_id);
  
  const commentsCountGroup = await Comment.count({ 
    where: { episodeId: episodeIds },
    group: ['episodeId'],
  });

  movies = movies.map(formatMovie(commentsCountGroup));

  return {
    payload: {
      data: movies,
    },
    statusCode: 200,
  }
};

