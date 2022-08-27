const jwt = require('jsonwebtoken');
const configs = require('../configs');
const roleModel = require('../models/role.model');
const userModel = require('../models/user.model');
const { extractJwtFromRequest } = require('../services/auth.service');
const { asyncWrapper } = require('../utils');

const verifyToken = asyncWrapper(async (req, res, next) => {
  const token = extractJwtFromRequest(req);

  if (!token) {
    return res.status(403).send({
      status: 403,
      msg: 'A token is required for authentication',
    });
  }

  const decoded = jwt.verify(token, configs.jwt.secret);
  req.user = decoded;
  return next();
});

const verifyAdmin = asyncWrapper(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);

  if (!user) {
    return res.status(403).send({
      status: 403,
      msg: 'You are not authorized to perform this action',
    });
  }
  const roles = await roleModel.find({
    _id: { $in: user.roles },
  });

  if (!roles.some((role) => role.code === configs.roles.admin)) {
    return res.status(403).send({
      status: 403,
      msg: 'You are not authorized to perform this action',
    });
  }

  return next();
});

const verifyEmployer = asyncWrapper(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  if (!user) {
    return res.status(403).send({
      status: 403,
      msg: 'You are not authorized to perform this action',
    });
  }
  const roles = await roleModel.find({
    _id: { $in: user.roles },
  });

  if (
    !roles.some((role) => role.code === configs.roles.employer) &&
    !roles.some((role) => role.code === configs.roles.admin)
  ) {
    return res.status(403).send({
      status: 403,
      msg: 'You are not authorized to perform this action',
    });
  }

  return next();
});

const verifySameUser = asyncWrapper(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  if (!user) {
    return res.status(403).send({
      status: 403,
      msg: 'You are not authorized to perform this action',
    });
  }
  const roles = await roleModel.find({
    _id: { $in: user.roles },
  });

  if (roles.some((role) => role.code === configs.roles.admin)) return next();

  req.user._id === req.body.studentID
    ? next()
    : res.status(403).send({
        status: 403,
        msg: 'You are not authorized to perform this action',
      });
});

module.exports = { verifyToken, verifyAdmin, verifyEmployer, verifySameUser };
