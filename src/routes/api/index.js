const express = require('express');
const authRouter = require('./auth.route.js');
const courseRouter = require('./course.route.js');
const eventRouter = require('./event.route.js');
const userRouter = require('./user.route.js');
const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/courses', courseRouter);
apiRouter.use('/events', eventRouter);

module.exports = apiRouter;
