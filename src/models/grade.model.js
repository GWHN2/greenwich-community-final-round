const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
  },
  subjectCode: {
    type: String,
    required: true,
  },
  subjectStatus: {
    type: String,
    required: true,
    default: 0,
  },
  grade: {
    type: Number,
    required: true,
  },
  tokens: {
    type: Number,
    required: true,
  },
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Grade', gradeSchema);
