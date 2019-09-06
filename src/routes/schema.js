import Joi from '@hapi/joi';

export const addCommentSchema = {
  params: {
    episodeId: Joi.number().required(),
  },
  body: {
    comment: Joi.string().required().max(500).trim(),
  },
}
