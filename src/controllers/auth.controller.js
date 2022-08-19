const { config } = require('../configs');
const asyncWrapper = require('../middlewares/async');
const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = asyncWrapper(async (req, res) => {
  const { username, password, name, role } = req.body;

  // validate
  if (!(username && password && name && role)) {
    return res.status(400).json({
      status: 400,
      msg: 'All fields are required',
    });
  }

  try {
    // check if user already exists
    const user = await UserModel.findOne({ username });
    console.log('user', user);
    if (user) {
      return res.status(400).json({ status: 400, msg: 'User already exists' });
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);
    // create new user
    const newUser = await UserModel.create({
      name,
      username: username,
      password: encryptedPassword,
      role,
    });
    console.log('newUser', newUser);

    // create token
    const token = jwt.sign({ _id: newUser._id, username }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    user.access_token = token;
    console.log('user', user);

    res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ status: 500, msg: 'Server error' });
  }
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

  try {
    // check if user already exists
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ status: 400, msg: 'User already exists' });
    }

    // check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: 400,
        msg: 'Invalid password',
      });
    }

    // create token
    const token = jwt.sign({ _id: user._id, username }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    user.access_token = token;

    res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (err) {
    console.log('err', err);
    res.status(500).send({ status: 500, msg: 'Server error' });
  }
});

const logout = asyncWrapper(async (req, res) => {});

const requireSignin = asyncWrapper(async (req, res) => {});

module.exports = {
  signup,
  login,
  logout,
  requireSignin,
};
