const express = require('express');
const roleRouter = express.Router();

const { getAllRoles } = require('../../controllers/role.controller');
const {
  verifyToken,
  verifyAdmin,
} = require('../../middlewares/auth.middleware');

roleRouter.get('/', verifyToken, verifyAdmin, getAllRoles);

module.exports = roleRouter;
