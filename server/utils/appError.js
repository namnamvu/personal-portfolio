// Custom error classes
export class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      // Custom code
      this.statusCode = statusCode;
      // Assign certain response to 4 and 5 error, easier for JSON format
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
// Predefine some common errors
export const errors = {
  VALIDATION_ERROR: (message) => new AppError(message, 400),
  UNAUTHORIZED: (message = 'Unauthorized access') => new AppError(message, 401),
  FORBIDDEN: (message = 'Access forbidden') => new AppError(message, 403),
  NOT_FOUND: (message = 'Resource not found') => new AppError(message, 404),
  CONFLICT: (message = 'Resource conflict') => new AppError(message, 409),
  INTERNAL_ERROR: (message = 'Internal server error') => new AppError(message, 500)
};