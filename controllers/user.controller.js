const { response, request } = require('express');

const usersPut = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    msg: 'put API - Controlador',
    id,
  });
};
const usersGet = (req = request, res = response) => {
  const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
  res.json({
    msg: 'get API - Controlador',
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};
const usersPost = (req = request, res = response) => {
  const { nombre, edad } = req.body;
  res.json({
    msg: 'post API - Controlador',
    nombre,
    edad,
  });
};
const usersDelete = (req, res = response) => {
  res.json({
    msg: 'delete API - Controlador',
  });
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
