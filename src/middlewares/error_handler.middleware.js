const errorHandler = (err, req, res) => {
  return res
    .status(err.statusCode)
    .send({ status: err.statusCode, msg: err.message });
};

const notFound = (req, res) => {
  res.status(404).send({ status: 404, msg: 'Route does not exist' });
};

module.exports = {
  errorHandler,
  notFound,
};
