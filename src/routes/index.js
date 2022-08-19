const express = require('express');
const apiRouter = require('./api');

const mainRouter = express.Router();

mainRouter.use('/api/v1', apiRouter);

module.exports = { mainRouter };
