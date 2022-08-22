const roleModel = require('../models/role.model');

const createRolesIfNotExist = async (roles) => {
  try {
    const existingRoles = await roleModel.find({
      code: { $in: roles.map((role) => role.toUpperCase()) },
    });

    if (existingRoles.length >= roles.length) {
      return existingRoles;
    }
    const newRoles = await roleModel.insertMany(formatRoles(roles));
    return newRoles;
  } catch (err) {
    console.log('err', err);
    return res.status(500).json({ status: 500, msg: 'Server error' });
  }
};

const formatRoles = (roles) => {
  return roles.map((role) => {
    return {
      name: role.charAt(0).toUpperCase() + role.slice(1).toLowerCase(),
      code: role.toUpperCase(),
    };
  });
};

const getCodes = (roles) => {
  return roles.map((role) => role.code.toUpperCase());
};

const getNames = (roles) => {
  return roles.map(
    (role) =>
      role.name.charAt(0).toUpperCase() + role.name.slice(1).toLowerCase()
  );
};

module.exports = {
  createRolesIfNotExist,
  formatRoles,
  getCodes,
  getNames,
};
