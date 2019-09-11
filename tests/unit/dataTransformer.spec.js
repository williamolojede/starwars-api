import { DataTransformer } from '../../src/utils';

describe('Data Transformer',  () => {
  describe('Format Movie', () => {
    it('should return the correct movie format', () => {
      const commentsCountGroup = [
        { episodeId: 4, count: '1' },
      ];
      const rawMovie = {
        title: 'A New Hope',
        episode_id: 4,
        opening_crawl: 'It is a preiod of ...',
        release_date: '1977-05-25',
      }
      const movie = DataTransformer.formatMovie(commentsCountGroup)(rawMovie);
      expect(movie).toMatchObject({
        name: rawMovie.title,
        openingCrawl: rawMovie.opening_crawl,
        episodeId: rawMovie.episode_id,
        releaseDate: rawMovie.release_date,
        commentsCount: Number(commentsCountGroup[0].count),
      });
    });
  });
});


