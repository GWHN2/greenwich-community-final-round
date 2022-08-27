require('dotenv').config();
const mongooseConfig = require('./mongoose.config');
const ROLES = require('./role.config');
const SUBJECT_STATUS = require('./subject_status.config');

const configs = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  mongoose: mongooseConfig,
  roles: ROLES,
  subjectStatus: SUBJECT_STATUS,
};

module.exports = configs;
