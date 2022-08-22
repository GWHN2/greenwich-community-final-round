const express = require('express');
const courseRouter = express.Router();

const {
  getAllCourses,
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
} = require('../../controllers/course.controller');
const {
  verifyToken,
  verifyAdmin,
} = require('../../middlewares/auth.middleware');

courseRouter.get('/', verifyToken, getAllCourses);
courseRouter.post('/', verifyToken, verifyAdmin, createCourse);
courseRouter.get('/:id', verifyToken, getCourse);
courseRouter.patch('/:id', verifyToken, verifyAdmin, updateCourse);
courseRouter.delete('/:id', verifyToken, verifyAdmin, deleteCourse);

module.exports = courseRouter;
