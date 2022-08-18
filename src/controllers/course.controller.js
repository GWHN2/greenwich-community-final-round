const Course = require('../models/course.model.js');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllCourses = asyncWrapper(async (req, res) => {
  const courses = await Course.find({});
  res
    .status(200)
    .json({ status: 'success', data: { courses, nbHits: courses.length } });
});

const createCourse = asyncWrapper(async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json({ course });
});

const getCourse = asyncWrapper(async (req, res) => {
  const { id: courseID } = req.params;
  const course = await Course.findOne({ _id: courseID });
  if (!course) {
    return next(createCustomError('Course not found', 404));
  }
  res.status(200).json({ course });
});

const updateCourse = asyncWrapper(async (req, res) => {
  const { id: courseID } = req.params;
  const course = await Course.findOneAndUpdate({ _id: courseID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    return next(createCustomError('Course not found', 404));
  }
  res.status(200).json({ course });
});

const deleteCourse = asyncWrapper(async (req, res) => {
  const { id: courseID } = req.params;
  const course = await Course.findOneAndDelete({ _id: courseID });
  if (!course) {
    return next(createCustomError('Course not found', 404));
  }
  res.status(200).json({ course });
});

module.exports = {
  getAllCourses,
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
};
