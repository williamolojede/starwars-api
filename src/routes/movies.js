import express from 'express';
import requestIp from 'request-ip';

import { getMovies, addComment, getComments } from '../controllers';
import { asyncWrapMiddleware, validateRequest } from '../middlewares';
import { addCommentSchema, getCommentsSchema } from './schema';

const moviesRouter = express.Router();

moviesRouter.get('/', asyncWrapMiddleware(getMovies));

moviesRouter.get(
  '/:episodeId/comments', 
  validateRequest(getCommentsSchema),
  asyncWrapMiddleware(getComments)
);
moviesRouter.post(
  '/:episodeId/comments', 
  requestIp.mw(),
  validateRequest(addCommentSchema),
  asyncWrapMiddleware(addComment)
);

export default moviesRouter;
