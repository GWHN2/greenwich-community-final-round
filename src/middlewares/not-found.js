const notFound = (req, res) => {
  res.status(404).send({ status: 404, msg: 'Route does not exist' });
};

module.exports = notFound;
