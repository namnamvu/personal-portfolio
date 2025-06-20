/**
 * Wraps async route handlers to automatically catch errors, prevent app crash
 * @param {Function} fn Async route handler function
 * @returns {Function} Wrapped middleware function
 */
export const catchAsync = (fn) => {
    // Take the async function as input
    // The inner function (req, res, next) => ... is what Express actually calls when a request arrives.
    // .catch will forward to globalERrorHandler if there is an error instead of crash
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  };
  
  export default catchAsync;