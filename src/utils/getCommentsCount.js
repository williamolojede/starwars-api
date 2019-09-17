export const getCommentsCount = (countGroup, episodeId) => {
    const commentsCount = countGroup.find((item) => item.episodeId === episodeId);
    return commentsCount ? Number(commentsCount.count) : 0
}