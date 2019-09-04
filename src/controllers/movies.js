import axios from 'axios';

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
