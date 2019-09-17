import models from '../models';

const { Comment } = models;

export const getCommentsCountGroup = async (episodeIds) => {
    return (await Comment.count({ 
        where: { episodeId: episodeIds },
        group: ['episodeId'],
    }));
}