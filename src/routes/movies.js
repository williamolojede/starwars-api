import express from 'express';
import requestIp from 'request-ip';

import { 
  getMovies, 
  addComment, 
  getComments,
  getCharacters,
} from '../controllers';
import { asyncWrapMiddleware, validateRequest } from '../middlewares';
import { 
  addCommentSchema, 
  getCommentsSchema,
  getCharactersSchema,
} from './schema';

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

moviesRouter.get(
  '/:episodeId/characters', 
  validateRequest(getCharactersSchema),
  asyncWrapMiddleware(getCharacters)
);

export default moviesRouter;
