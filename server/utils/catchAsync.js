/**
 * Wraps async route handlers to automatically catch errors
 * @param {Function} fn Async route handler function
 * @returns {Function} Wrapped middleware function
 */
export default (fn) => {
    return (req, res, next) => {
      // Catch both rejected promises and synchronous errors
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  };