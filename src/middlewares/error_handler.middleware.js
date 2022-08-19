const { CustomAPIError } = require('../utils/custom-error');

const errorHandler = (err, req, res) => {
  if (err instanceof CustomAPIError) {
    return res
      .status(err.statusCode)
      .json({ status: err.statusCode, msg: err.message });
  }
  return res
    .status(err.statusCode)
    .json({ status: err.statusCode, msg: err.message });
};

module.exports = errorHandler;
