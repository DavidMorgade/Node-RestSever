const Role = require('../models/rol.model');
const User = require('../models/user.model');

// Verify valid role
const isValidRole = async (role = '') => {
  const existeRole = await Role.findOne({ role });
  if (!existeRole) {
    throw new Error(`The rol ${role} is not registered on the database`);
  }
};
// Verify email exist
const emailExists = async (correo = '') => {
  const emailExists = await User.findOne({ correo });
  if (emailExists) {
    throw new Error(`This email: ${correo} is already registered`);
  }
};
const userIdExists = async (id = '') => {
  const userIdExists = await User.findById(id);
  if (!userIdExists) {
    throw new Error(`El id no existe ${id}`);
  }
};

module.exports = { isValidRole, emailExists, userIdExists };
