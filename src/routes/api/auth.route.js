const express = require('express');
const authRouter = express.Router();

const { signup, login, logout, checkTokenExpired } = require('../../controllers/auth.controller');
const { verifyToken } = require('../../middlewares/auth.middleware');

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/verifyToken', verifyToken, checkTokenExpired);

module.exports = authRouter;
