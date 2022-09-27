const { response, request } = require('express');
const User = require('../models/user.model.js');
const bcryptjs = require('bcryptjs');

const usersPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...rest } = req.body;

  //TODO validate with data base
  if (password) {
    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }
  const user = await User.findOneAndUpdate(id, rest, { new: true });

  res.json({
    msg: 'put API - Controlador',
    user,
  });
};
const usersGet = async (req = request, res = response) => {
  // Pagination params
  const { limit = 5, from = 0 } = req.query;
  // User is not deleted!
  const query = { state: true };
  // awaits both at the same time - less time
  const [totalUsers, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({
    totalUsers,
    users,
  });
};
const usersPost = async (req = request, res = response) => {
  const { nombre, correo, password, role } = req.body;
  const user = new User({ nombre, correo, password, role });
  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  // Save to db
  await user.save();
  res.json({
    msg: 'post API - Controlador',
    user,
  });
};
const usersDelete = async (req, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json(user);
};
const usersPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - Controlador',
  });
};

module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersPatch,
  usersDelete,
};
