const userModel = require('../models/user.model');
const { asyncWrapper } = require('../utils');
const { createCustomError } = require('../utils/custom-error');
const bcrypt = require('bcrypt');
const { formatRoles, getRoleID } = require('../services/role.service');

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
  res.status(200).json({
    status: 200,
    data: user,
  });
});

const getUser = asyncWrapper(async (req, res) => {
  // exclude password and access_token fields
  const { id: userID } = req.params;
  const user = await userModel.findOne(
    { _id: userID },
    { password: 0, access_token: 0 }
  );
  if (!user) {
    return res.status(404).json({
      status: 404,
      msg: 'User not found',
    });
  }
  res.status(200).json({
    status: 200,
    data: user,
  });
});

const updateUser = asyncWrapper(async (req, res) => {
  // TODO: hash password before saving
  // hide password and access_token fields
  const { id: userID } = req.params;
  req.body.roles = [await getRoleID(req.body.roles)] || [];
  const user = await userModel.findOneAndUpdate({ _id: userID }, req.body, {
    new: true,
  });

  if (!user) {
    return res.status(404).json({
      status: 404,
      msg: 'User not found',
    });
  }
  res.status(200).json({
    status: 200,
    data: user,
  });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
  const { id: userID } = req.params;
  const user = await userModel.findOneAndDelete(
    { _id: userID },
    { access_token: 0, password: 0 }
  );
  if (!user) {
    return res.status(404).json({
      status: 404,
      msg: 'User not found',
    });
  }
  res.status(200).json({
    status: 200,
    data: user,
  });
});

module.exports = { getAllUsers, createUser, getUser, updateUser, deleteUser };
