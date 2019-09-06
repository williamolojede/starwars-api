import Joi from '@hapi/joi';

export const validateRequest = schema => (req, _, next) => {
  const schemaEntries = Object.entries(schema);

  for (let i = 0; i < schemaEntries.length; i += 1) {
    const [key, val] = schemaEntries[i];
    if (req[key]) {
      const { error } = Joi.validate(req[key], val);

      if (error) {
        const { details } = error;
        const err = new Error(details[0].message);
        err.statusCode = 400;
        next(err);
        return;
      }
    }
  }

  next();
};

