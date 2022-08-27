const gradeModel = require('../models/grade.model');
const userModel = require('../models/user.model');
const {
  convertSubjectStatus,
  convertGradeToTokens,
} = require('../services/grade.service');
const { asyncWrapper } = require('../utils');

const createGrade = asyncWrapper(async (req, res) => {
  const { subjectCode, studentID, grade } = req.body;

  let gradeFound = await gradeModel.findOne({ subjectCode, studentID });

  if (gradeFound) {
    return res.status(400).json({
      message: 'Grade already exists',
    });
  }

  let student = await userModel.findById(studentID);

  if (!student) {
    return res.status(400).json({
      message: 'User not found',
    });
  }

  req.body.tokens = convertGradeToTokens(grade);

  gradeFound = await gradeModel.create(req.body);
  gradeFound.subjectStatus = convertSubjectStatus(gradeFound.subjectStatus);

  res.status(200).json({
    status: 200,
    data: gradeFound,
  });
});

const getGrades = asyncWrapper(async (req, res) => {
  const { studentID } = req.body;

  let grades = await gradeModel.find({ studentID }).lean();
  grades = grades.map((grade) => {
    grade.subjectStatus = convertSubjectStatus(grade.subjectStatus);
    return grade;
  });

  res.status(200).json({
    status: 200,
    data: grades,
  });
});

const getGrade = asyncWrapper(async (req, res) => {
  const { id: gradeID } = req.params;

  let grade = await gradeModel.findById(gradeID);

  if (!grade) {
    return res.status(404).json({
      status: 404,
      msg: 'Grade not found',
    });
  }

  grade.subjectStatus = convertSubjectStatus(grade.subjectStatus);

  res.status(200).json({
    status: 200,
    data: grade,
  });
});

const updateGrade = asyncWrapper(async (req, res) => {
  // TODO: check if new grade is not exists in the database

  const { id: gradeID } = req.params;
  req.body.grade && (req.body.tokens = convertGradeToTokens(req.body.grade));

  let grade = await gradeModel.findByIdAndUpdate(gradeID, req.body, {
    new: true,
    runValidators: true,
  });

  if (!grade) {
    return res.status(404).json({
      status: 404,
      msg: 'Grade not found',
    });
  }

  grade.subjectStatus = convertSubjectStatus(grade.subjectStatus);

  res.status(200).json({
    status: 200,
    data: grade,
  });
});

const deleteGrade = asyncWrapper(async (req, res) => {
  const { id: gradeID } = req.params;

  const grade = await gradeModel.findByIdAndDelete(gradeID);

  if (!grade) {
    return res.status(404).json({
      status: 404,
      msg: 'Grade not found',
    });
  }

  grade.subjectStatus = convertSubjectStatus(grade.subjectStatus);

  res.status(200).json({
    status: 200,
    data: grade,
  });
});

module.exports = {
  createGrade,
  getGrades,
  getGrade,
  updateGrade,
  deleteGrade,
};
