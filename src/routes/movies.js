import express from 'express';

import { getMovies } from '../controllers';
import { asyncWrapMiddleware } from '../middlewares';

const moviesRouter = express.Router();

moviesRouter.get('/', asyncWrapMiddleware(getMovies));

export default moviesRouter;
