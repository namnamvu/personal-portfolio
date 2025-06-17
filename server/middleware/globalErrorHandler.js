import { AppError } from "../utils/appError";

export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    // PostgreSQL-specific error handling
    if (err.code) {
      switch (err.code) {
        case '23505': // Unique violation
          err.statusCode = 409;
          err.message = 'Duplicate entry detected';
          break;
        case '22P02': // Invalid text representation
          err.statusCode = 400;
          err.message = 'Invalid data type';
          break;
        case '23502': // Not null violation
          err.statusCode = 400;
          err.message = 'Missing required field';
          break;
      }
    }
  
    console.error('PostgreSQL ERROR:', {
      message: err.message,
      code: err.code,
      detail: err.detail, // PostgreSQL specific field
      // Stack trace only shown in development mode
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      // Smart syntax to only show some error in developement
      ...(process.env.NODE_ENV === 'development' && {
        error: { 
          code: err.code,
          detail: err.detail 
        }
      })
    });
  };