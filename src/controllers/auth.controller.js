const configs = require('../configs');
const { asyncWrapper } = require('../utils');
const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const roleModel = require('../models/role.model');
const {
  formatRoles,
  getCodes,
  getNames,
  getRoleID,
} = require('../services/role.service');

const signup = asyncWrapper(async (req, res) => {
  // TODO: set default roles to STUDENT, ADMIN role will only able to be set by admin

  let { username, password, roles } = req.body;

  roles = !roles || roles === '' ? ['Student'] : roles;
  roles = !Array.isArray(roles) ? [roles] : roles;

  // check if user already exists
  const user = await UserModel.findOne({ username });
  if (user) {
    return res.status(400).json({ status: 400, msg: 'User already exists' });
  }

  // encrypt password
  const encryptedPassword = await bcrypt.hash(password, 10);
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
  const newUser = await UserModel.create(req.body);

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

const login = asyncWrapper(async (req, res) => {
  const { username, password } = req.body;

  // validate
  if (!(username && password)) {
    return res.status(400).json({
      status: 400,
      msg: 'All fields are required',
    });
  }

  // check if user already exists
  const user = await UserModel.findOne({ username }).populate('roles');
  if (!user) {
    return res.status(400).json({ status: 400, msg: 'Invalid username' });
  }

  // check if password is correct
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      status: 400,
      msg: 'Invalid password',
    });
  }

  // create token
  const token = jwt.sign({ _id: user._id, username }, configs.jwt.secret, {
    expiresIn: configs.jwt.expiresIn,
  });

  user.access_token = token;
  user.roles = getNames(user.roles);

  res.status(200).json({
    status: 200,
    data: user,
  });
});

const logout = asyncWrapper(async (req, res) => {
  // log out user by removing token
  const user = await UserModel.findById(req.user._id);
  user.access_token = '';
  await user.save();

  res.status(200).json({
    status: 200,
    msg: 'Logged out successfully',
  });
});

const checkTokenExpired = asyncWrapper(async (req, res) => {
  // check if token is expired
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    return res.status(400).json({ status: 400, msg: 'Invalid token' });
  }

  res.status(200).json({
    status: 200,
    msg: 'Token valid',
  });
});

module.exports = {
  signup,
  login,
  logout,
  checkTokenExpired,
};
