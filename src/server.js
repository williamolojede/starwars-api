import express from 'express';
import bodyPaser from 'body-parser';

import logger, { httpLogger } from './config/logger';
import router from './routes';

const app = express();

const { PORT = 4200 } = process.env;

app.use(httpLogger);
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: false }));

// API ROUTES
app.use('/api', router);

// catch 404 and forward to error handler
app.use((_, __, next) => {
  const err = new Error('Not Found');
  err.statusCode = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(
  ({ message, statusCode = 500, stack }, _, res, __) => {
    if (statusCode === 500) logger.info(stack);

    res.status(statusCode)
      .send({
        message: statusCode === 500 ? 'Internal server error' : message,
        status: 'fail',
      });
  },
);

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
