export const DataTransformer = {
  formatMovie(commentsCountGroup) {
    return ({ 
      title, 
      opening_crawl, 
      episode_id, 
      release_date 
    }) => {
      const commentsCount = commentsCountGroup
        .find(({ episodeId }) => episodeId === episode_id) 

      return ({ 
        name: title, 
        openingCrawl: opening_crawl,
        episodeId: episode_id,
        releaseDate: release_date,
        commentsCount:  commentsCount ? Number(commentsCount.count) : 0,
      })
    }
  },
  formatCharacter(character) {
    // some character's height are "unknown", converting to number would give null
    return { ...character, height: Number(character.height)}
  }
}
