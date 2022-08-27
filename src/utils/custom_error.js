const createCustomError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return res;
};

module.exports = createCustomError;
