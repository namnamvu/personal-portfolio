/**
 * Wraps async route handlers to automatically catch errors
 * @param {Function} fn Async route handler function
 * @returns {Function} Wrapped middleware function
 */
export const catchAsync = (fn) => {
    // Return the function but don't resolve the promise until request come in
    // Otherwise we risk running with undefined value
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  };
  
  export default catchAsync;