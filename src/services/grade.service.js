const configs = require('../configs');

const convertSubjectStatus = (status) => {
  return configs.subjectStatus[status];
};

const convertGradeToTokens = (grade) => {
  if (!grade) return 0;

  if (grade < 6.5) return 0;
  else if (grade < 8) return 10;
  else if (grade < 10) return 30;

  return 50;
};

module.exports = {
  convertSubjectStatus,
  convertGradeToTokens,
};
