import HttpError from "./HttpError.js";

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, "Помилка від Joi або іншої бібліотеки валідації"));
    }
    next();
  };

  return func;
};

export default validateBody;
