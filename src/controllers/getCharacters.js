import orderBy from 'lodash.orderby';

import { 
  SwapiService,
  calculateCharactersTotalHeight,
} from '../utils';

export const getCharacters = async (req) => {
  const { sort, order, filter } = req.query;
  const { episodeId } = req.params;

  let characters = await SwapiService.getEpisodeCharacters(episodeId)

  if (sort) {
    characters = orderBy(characters, [sort], [order ? order : 'asc']);
  }

  if (filter) {
    characters = characters.filter(({ gender }) => gender === filter);
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
