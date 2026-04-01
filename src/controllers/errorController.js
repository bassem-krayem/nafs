const AppError = require('../utils/appError');

// 1. Handles Invalid Data Types (e.g., sending a string to an Integer column)
const handleCastErrorDB = (err) => {
  // In Sequelize, this is often a DatabaseError or specialized type
  const message = `Invalid input: ${err.message}`;
  return new AppError(message, 400);
};

// 2. Handles Unique Constraint (e.g., Email already exists)
const handleDuplicateFieldsDB = (err) => {
  // err.errors is an array in Sequelize for unique constraints
  const value = err.errors ? err.errors[0].value : '';
  const message = `Duplicate field value: "${value}". Please use another value!`;
  return new AppError(message, 400);
};

// 3. Handles Validation Errors (e.g., 'role' must be 'patient' or 'therapist')
const handleValidationErrorDB = (err) => {
  // Sequelize maps all validation errors into an 'errors' array
  const errors = err.errors.map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // Note: We create a new object but keep the specific Sequelize properties
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;

    // --- SEQUELIZE SPECIFIC CHECKS ---

    // Invalid Data Type / Database Errors
    if (error.name === 'SequelizeDatabaseError') {
      error = handleCastErrorDB(error);
    }

    // Unique Constraint (The 11000 equivalent)
    if (error.name === 'SequelizeUniqueConstraintError') {
      error = handleDuplicateFieldsDB(error);
    }

    // General Validation (NOT NULL, LEN, etc)
    if (error.name === 'SequelizeValidationError') {
      error = handleValidationErrorDB(error);
    }

    // JWT Errors
    if (error.name === 'JsonWebTokenError') {
      error = handleJWTError();
    }
    if (error.name === 'TokenExpiredError') {
      error = handleJWTExpiredError();
    }

    sendErrorProd(error, res);
  }
};
