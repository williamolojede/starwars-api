import Joi from '@hapi/joi';

export const addCommentSchema = {
  params: {
    episodeId: Joi.number().min(1).max(7).required(),
  },
  body: {
    comment: Joi.string().required().max(500).trim(),
  },
}

export const getCommentsSchema = {
  params: {
    episodeId: Joi.number().min(1).max(7).required(),
  },
}
