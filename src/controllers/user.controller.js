const User = require('../models/user.model.js');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({});
  res
    .status(200)
    .json({ status: 'success', data: { users, nbHits: users.length } });
});

const createUser = asyncWrapper(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ user });
});

const getUser = asyncWrapper(async (req, res) => {
  const { id: userID } = req.params;
  const user = await User.findOne({ _id: userID });
  if (!user) {
    return next(createCustomError('User not found', 404));
  }
  res.status(200).json({ user });
});

const updateUser = asyncWrapper(async (req, res) => {
  const { id: userID } = req.params;
  const user = await User.findOneAndUpdate({ _id: userID }, req.body, {
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
  const user = await User.findOneAndDelete({ _id: userID });
  if (!user) {
    return next(createCustomError('User not found', 404));
  }
  res.status(200).json({ user });
});

module.exports = { getAllUsers, createUser, getUser, updateUser, deleteUser };
