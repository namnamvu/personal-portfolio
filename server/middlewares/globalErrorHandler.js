import { AppError } from './AppError.js';

const handlePostgresError = (err) => {
  const pgErrorMap = {
    '23505': { statusCode: 409, message: 'Duplicate entry detected' },
    '22P02': { statusCode: 400, message: 'Invalid data type' },
    '23502': { statusCode: 400, message: 'Missing required field' },
    '23503': { statusCode: 400, message: 'Foreign key violation' },
    '23514': { statusCode: 400, message: 'Check constraint violation' },
    '42703': { statusCode: 400, message: 'Invalid column reference' }
  };

  if (pgErrorMap[err.code]) {
    return new AppError(pgErrorMap[err.code].message, pgErrorMap[err.code].statusCode);
  }
  return err;
};

export const globalErrorHandler = (err, req, res, next) => {
  // Handle PostgreSQL errors
  if (err.code) {
    err = handlePostgresError(err);
  }

  // Default handling for everything else
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Enhanced logging with request context
  console.error(`[${new Date().toISOString()}] ${err.statusCode} - ${err.message}`, {
    method: req.method,
    url: req.originalUrl,
    code: err.code,
    // Only log stack trace in development to hide sensitive info
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    // Database constraint details
    // Check if err.detail exist and add only if it exist
    ...(err.detail && { detail: err.detail })
  });

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(err.statusCode).json({
    status: err.status,
    message: err.isOperational ? err.message : 'Something went wrong',
    ...(isDevelopment && {
      error: {
        stack: err.stack,
        ...(err.code && { code: err.code }),
        ...(err.detail && { detail: err.detail })
      }
    })
  });
};