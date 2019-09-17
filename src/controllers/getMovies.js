import { 
  SwapiService, 
  DataTransformer, 
  getMovieEpisodeIds,
  getCommentsCountGroup
} from '../utils';

export const getMovies = async () => {
  let movies = await SwapiService.getMovies();

  const episodeIds = getMovieEpisodeIds(movies);
  
  const commentsCountGroup = await getCommentsCountGroup(episodeIds);

  movies = movies.map(DataTransformer.formatMovie(commentsCountGroup));

  return {
    payload: {
      data: movies,
    },
    statusCode: 200,
  }
};

