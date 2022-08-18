const express = require('express');
const router = express.Router();

const {
  getAllCourses,
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/course');

router.route('/').get(getAllCourses).post(createCourse);
router.route('/:id').get(getCourse).patch(updateCourse).delete(deleteCourse);

module.exports = router;
