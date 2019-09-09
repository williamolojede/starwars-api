import models from '../models';
import { SwapiService } from '../utils';

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

