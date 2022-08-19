const express = require('express');
const userRouter = express.Router();

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../../controllers/user.controller.js');
const {
  verifyToken,
  verifyAdmin,
} = require('../../middlewares/auth.middleware.js');

userRouter.get('/', verifyToken, getAllUsers);
userRouter.post('/', verifyToken, verifyAdmin, createUser);
userRouter.get('/:id', verifyToken, getUser);
userRouter.patch('/:id', verifyToken, verifyAdmin, updateUser);
userRouter.delete('/:id', verifyToken, verifyAdmin, deleteUser);

module.exports = userRouter;
