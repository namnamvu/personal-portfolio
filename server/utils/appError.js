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
