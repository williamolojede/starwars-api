import express from 'express';

import moviesRouter from './movies';

const router = express.Router();

router.get('/', (_, res) => {
  res.send({ message: 'Welcome to the starwars movies api.' });
});

router.use('/movies', moviesRouter);

export default router;
