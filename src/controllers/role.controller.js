const roleModel = require('../models/role.model');
const { asyncWrapper } = require('../utils');

const getAllRoles = asyncWrapper(async (req, res) => {
  const roles = await roleModel.find({});
  res.status(200).json({ status: 200, data: roles });
});

module.exports = {
  getAllRoles,
};
