import orderBy from 'lodash.orderby';

import { 
  SwapiService,
  calculateCharactersTotalHeight,
} from '../utils';

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
