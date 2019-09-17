import { getCommentsCount } from './getCommentsCount';

export const DataTransformer = {
  formatMovie(commentsCountGroup) {
    return ({ 
      title, 
      opening_crawl, 
      episode_id, 
      release_date 
    }) => {
      return ({ 
        name: title, 
        openingCrawl: opening_crawl,
        episodeId: episode_id,
        releaseDate: release_date,
        commentsCount: getCommentsCount(commentsCountGroup, episode_id),
      })
    }
  },
  formatCharacter(character) {
    // some character's height are "unknown", converting to number would give null
    return { ...character, height: Number(character.height)}
  }
}
