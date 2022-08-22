require('dotenv').config();
const mongooseConfig = require('./mongoose.config');
const ROLES = require('./role.config');

const configs = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  mongoose: mongooseConfig,
  roles: ROLES,
};

module.exports = configs;
