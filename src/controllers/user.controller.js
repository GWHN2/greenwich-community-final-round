const userModel = require('../models/user.model');
const { asyncWrapper } = require('../utils');
const { createCustomError } = require('../utils/custom-error');
const bcrypt = require('bcrypt');

const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await userModel.find({});
  res
    .status(200)
    .json({ status: 'success', data: { users, nbHits: users.length } });
});

const createUser = asyncWrapper(async (req, res) => {
  // TODO: add default role for new user
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  req.body.password = hashedPassword;
  const user = await userModel.create(req.body);
  res.status(201).json({
    status: 200,
    data: user,
  });
});

const getUser = asyncWrapper(async (req, res) => {
  const { id: userID } = req.params;
  const user = await userModel.findOne({ _id: userID });
  if (!user) {
    return next(createCustomError('User not found', 404));
  }
  res.status(200).json({ user });
});

const updateUser = asyncWrapper(async (req, res) => {
  const { id: userID } = req.params;
  const user = await userModel.findOneAndUpdate({ _id: userID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(createCustomError('User not found', 404));
  }
  res.status(200).json({ user });
});

const deleteUser = asyncWrapper(async (req, res) => {
  const { id: userID } = req.params;
  const user = await userModel.findOneAndDelete({ _id: userID });
  if (!user) {
    return next(createCustomError('User not found', 404));
  }
  res.status(200).json({ user });
});

module.exports = { getAllUsers, createUser, getUser, updateUser, deleteUser };
