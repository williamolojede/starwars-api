import axios from 'axios';

const SWAPI_FILMS_URL = 'https://swapi.co/api/films';

export class SwapiService {
  static async getMovies() {
    const { data: { results } } = await axios.get(SWAPI_FILMS_URL);
    return results
      .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
  }

  static async getCharacters(charactersUrls) {
    const getCharactersRequest = charactersUrls
      .map(async (characterUrl) => await axios.get(characterUrl));
    const results = await Promise.all(getCharactersRequest);
    return results.map(({ data }) => data);
  }

  static async getEpisodeCharacters(episodeId) {
    const { data: { characters: charactersUrls } } = await axios
      .get(`${SWAPI_FILMS_URL}/${episodeId}`);
    const characters = await SwapiService.getCharacters(charactersUrls);
    return characters;
  }
}
