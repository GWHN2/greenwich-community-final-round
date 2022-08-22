require('dotenv').config();
const { mongooseConfig } = require('./mongoose.config.js');
const { ROLES } = require('./role.config.js');

const configs = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  mongoose: mongooseConfig,
  role: ROLES,
};
module.exports = { configs };
