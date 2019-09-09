import models from '../models';

const { Comment } = models;

export const getComments = async (req) => {
  const { episodeId } = req.params;
  const comments = await Comment.findAll({ 
    where: {
      episodeId,
    },
    order: [['createdAt', 'DESC']]
  });

  return {
    payload: {
      data: comments,
    },
    statusCode: 200,
  }
}
