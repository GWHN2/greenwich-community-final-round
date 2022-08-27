const express = require('express');
const authRouter = require('./auth.route');
const courseRouter = require('./course.route');
const eventRouter = require('./event.route');
const userRouter = require('./user.route');
const adRouter = require('./ad.route');
const marketplaceRouter = require('./marketplace.route');
const roleRouter = require('./role.route');
const gradeRouter = require('./grade.route');

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/courses', courseRouter);
apiRouter.use('/events', eventRouter);
apiRouter.use('/ads', adRouter);
apiRouter.use('/marketplace', marketplaceRouter);
apiRouter.use('/roles', roleRouter);
apiRouter.use('/grades', gradeRouter);

module.exports = apiRouter;
