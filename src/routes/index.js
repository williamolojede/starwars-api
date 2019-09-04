import express from 'express';

const router = express.Router();

router.get('/', (_, res) => {
  res.send({ message: 'Welcome to the starwars movies api.' });
});

export default router;
