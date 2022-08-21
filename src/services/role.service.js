const roleModel = require('../models/role.model');

const createRolesIfNotExist = async (roles) => {
  try {
    const existingRoles = await roleModel.find({
      code: { $in: roles.map((role) => role.toUpperCase()) },
    });

    console.log(existingRoles);
    if (existingRoles.length >= roles.length) {
      return existingRoles;
    }
    const newRoles = await roleModel.insertMany(
      roles.map((role) => ({
        name: role,
        code: role.toUpperCase(),
      }))
    );
    return newRoles;
  } catch (err) {
    console.log('err', err);
    return res.status(500).json({ status: 500, msg: 'Server error' });
  }
};

module.exports = { createRolesIfNotExist };
