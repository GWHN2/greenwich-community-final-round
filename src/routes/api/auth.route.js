const express = require('express');
const authRouter = express.Router();

const {
  signup,
  login,
  logout,
  requireSignin,
} = require('../../controllers/auth.controller');

authRouter.route('/signup').post(signup);
authRouter.route('/login').post(login);
authRouter.route('/logout').get(logout);
authRouter.route('/status').get(requireSignin);

module.exports = authRouter;
