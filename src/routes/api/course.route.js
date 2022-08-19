const express = require('express');
const courseRouter = express.Router();

const {
  getAllCourses,
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
} = require('../../controllers/course.controller.js');
const verifyToken = require('../../middlewares/auth.middleware.js');

courseRouter.get('/', verifyToken, getAllCourses);
courseRouter.post('/', verifyToken, createCourse);
courseRouter.get('/:id', verifyToken, getCourse);
courseRouter.patch('/:id', verifyToken, updateCourse);
courseRouter.delete('/:id', verifyToken, deleteCourse);

module.exports = courseRouter;
