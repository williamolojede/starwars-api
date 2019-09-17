export const getMovieEpisodeIds = (movies) => {
    return movies.map(({ episode_id }) => episode_id)
}