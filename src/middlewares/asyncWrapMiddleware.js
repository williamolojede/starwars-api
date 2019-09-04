export const asyncWrapMiddleware = fn => (req, res, next) => {
  fn(req, res)
    .then(({ statusCode, payload }) => {
      res.status(statusCode).send(payload);
    })
    .catch(next);
};

