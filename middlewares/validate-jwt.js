const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');
  // Check if has a valid JWT on headers
  if (!token) {
    return res.status(401).json({
      msg: 'Need JWT on petition',
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    // User corresponds to uid??
    const user = await User.findById(uid);
    if (!user) {
      return res.status(401).json({
        msg: "Not a valid Token - User doesn't exist on db",
      });
    }
    // Verify uid has state deleted
    if (!user.state) {
      return res.status(401).json({
        msg: 'Not a valid Token - User has deleted state',
      });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Not valid Token',
    });
  }
};

module.exports = {
  validateJWT,
};
