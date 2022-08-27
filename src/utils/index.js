const createCustomError = require('./custom_error');

const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(500).json({
        status: 500,
        msg: error.message,
      });
      next(error);
    }
  };
};

module.exports = { asyncWrapper, createCustomError };
