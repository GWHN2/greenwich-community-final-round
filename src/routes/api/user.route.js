const express = require('express');
const userRouter = express.Router();

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../../controllers/user.controller.js');
const verifyToken = require('../../middlewares/auth.middleware.js');

userRouter.get('/', verifyToken, getAllUsers);
userRouter.post('/', verifyToken, createUser);
userRouter.get('/:id', verifyToken, getUser);
userRouter.patch('/:id', verifyToken, updateUser);
userRouter.delete('/:id', verifyToken, deleteUser);

module.exports = userRouter;
