/**
 * Wraps async route handlers to automatically catch errors
 * @param {Function} fn Async route handler function
 * @returns {Function} Wrapped middleware function
 */
export const catchAsync = (fn) => {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  };
  
  export default catchAsync;