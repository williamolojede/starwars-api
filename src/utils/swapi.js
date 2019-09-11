import axios from 'axios';

const SWAPI_FILMS_URL = 'https://swapi.co/api/films';

export class SwapiService {
  static async getMovies() {
    const { data: { results } } = await axios.get(SWAPI_FILMS_URL);
    return results
      .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
  }

  static async getEpisodeCharacters(episodeId) {
    let results;
    const { data: { characters } } = await axios
      .get(`${SWAPI_FILMS_URL}/${episodeId}`);
    results = (await Promise.all(
      characters
        .map(async (characterUrl) => await axios.get(characterUrl))
    )).map(({ data }) => data);

    return results;
  }
}
