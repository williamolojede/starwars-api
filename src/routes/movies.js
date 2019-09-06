import express from 'express';
import requestIp from 'request-ip';

import { getMovies, addComment } from '../controllers';
import { asyncWrapMiddleware, validateRequest } from '../middlewares';
import { addCommentSchema } from './schema';

const moviesRouter = express.Router();

moviesRouter.get('/', asyncWrapMiddleware(getMovies));

moviesRouter.post(
  '/:episodeId/comments', 
  requestIp.mw(),
  validateRequest(addCommentSchema),
  asyncWrapMiddleware(addComment)
);

export default moviesRouter;
