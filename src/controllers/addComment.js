import models from '../models';

const { Comment } = models;

export const addComment = async (req) => {
  const { clientIp: ipAddress } = req;
  const { episodeId } = req.params;
  const { comment } = req.body;

  const newComment = await Comment.create({
    episodeId,
    comment,
    ipAddress,
  });

  return {
    payload: {
      message: 'Your comment has been saved',
      data: newComment,
    },
    statusCode: 201,
  }
}
