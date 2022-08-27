const express = require('express');
const gradeRouter = express.Router();

const {
  getGrades,
  createGrade,
  getGrade,
  updateGrade,
  deleteGrade,
} = require('../../controllers/grade.controller');

const {
  verifyToken,
  verifyAdmin,
  verifySameUser,
} = require('../../middlewares/auth.middleware');

gradeRouter.post('/', verifyToken, verifyAdmin, createGrade);
gradeRouter.post('/all', verifyToken, verifySameUser, getGrades);
gradeRouter.post('/info/:id', verifyToken, verifySameUser, getGrade);
gradeRouter.patch('/:id', verifyToken, verifyAdmin, updateGrade);
gradeRouter.delete('/:id', verifyToken, verifyAdmin, deleteGrade);

module.exports = gradeRouter;
