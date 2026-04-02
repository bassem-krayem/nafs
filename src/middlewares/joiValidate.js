const AppError = require('../utils/appError');

const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body, {
    abortEarly: false, // Show ALL errors, not just the first one
    allowUnknown: true, // Don't crash if extra fields are sent
    stripUnknown: true, // Remove fields that aren't in the schema
  });

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ');
    return next(new AppError(errorMessage, 400));
  }

  // Replace req.body with the "cleaned" version from Joi
  Object.assign(req, value);
  return next();
};

module.exports = validate;
