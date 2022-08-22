const jwt = require('jsonwebtoken');
const { configs } = require('../configs');
const roleModel = require('../models/role.model');
const userModel = require('../models/user.model');
const { extractJwtFromRequest } = require('../services/auth.service.js');

const verifyToken = (req, res, next) => {
  const token = extractJwtFromRequest(req);

  if (!token) {
    return res.status(403).send({
      status: 403,
      msg: 'A token is required for authentication',
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({
      code: 401,
      msg: 'Invalid Token',
    });
  }
  return next();
};

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).send({
        status: 404,
        msg: 'User not found',
      });
    }
    const roles = await roleModel.find({
      _id: { $in: user.roles },
    });

    if (!roles.some((role) => role.code === 'admin')) {
      return res.status(403).send({
        status: 403,
        msg: 'You are not authorized to perform this action',
      });
    }

    return next();
  } catch (err) {
    return res.status(401).send({
      code: 401,
      msg: 'Invalid Token',
    });
  }
};

const verifyCompany = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).send({
        status: 404,
        msg: 'User not found',
      });
    }
    const roles = await roleModel.find({
      _id: { $in: user.roles },
    });

    if (!roles.some((role) => role.code === 'company')) {
      return res.status(403).send({
        status: 403,
        msg: 'You are not authorized to perform this action',
      });
    }

    return next();
  } catch (err) {
    return res.status(401).send({
      code: 401,
      msg: 'Invalid Token',
    });
  }
};

module.exports = { verifyToken, verifyAdmin, verifyCompany };
