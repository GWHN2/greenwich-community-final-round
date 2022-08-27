require('dotenv').config();
const userModel = require('../models/user.model');
const { asyncWrapper } = require('../utils');
const { createCustomError } = require('../utils/custom-error');
const bcrypt = require('bcrypt');
const {
  formatRoles,
  getRoleID,
  getCodes,
} = require('../services/role.service');
const roleModel = require('../models/role.model');
const configs = require('../configs');
const jwt = require('jsonwebtoken');

const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await userModel.find({}).populate('roles');
  res.status(200).json({ status: 200, data: users });
});

const createUser = asyncWrapper(async (req, res) => {
  let { username, password, roles } = req.body;

  roles = !roles || roles === '' ? ['Student'] : roles;
  roles = !Array.isArray(roles) ? [roles] : roles;

  // check if user already exists
  const user = await userModel.findOne({ username });
  if (user) {
    return res.status(400).json({ status: 400, msg: 'User already exists' });
  }

  // encrypt password);
  const encryptedPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS)
  );
  req.body.password = encryptedPassword;

  // add roles
  roles = formatRoles(roles);

  if (roles) {
    const matchedRoles = await roleModel.find({
      code: { $in: getCodes(roles) },
    });

    roles = matchedRoles.length
      ? matchedRoles.map((role) => role._id)
      : await getRoleID(configs.roles.student);
  } else {
    const matchRole = await getRoleID(configs.roles.student);
    roles = [matchRole._id];
  }

  req.body.roles = roles;

  // create new user
  const newUser = await userModel.create(req.body);

  // create token
  const token = jwt.sign({ _id: newUser._id }, configs.jwt.secret, {
    expiresIn: configs.jwt.expiresIn,
  });

  newUser.access_token = token;

  await newUser.save();

  res.status(200).json({
    status: 200,
    data: newUser,
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
