const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Check email exists
    const user = await User.findOne({ correo });
    if (!user) {
      return res.status(400).json({
        msg: 'User / Password not correct - email',
      });
    }
    // Check if user is active
    if (!user.state) {
      return res.status(400).json({
        msg: 'User / Password not correct - state: false',
      });
    }
    // Check password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'User / Password not correct - password',
      });
    }
    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Something went wrong...',
    });
  }
};

module.exports = { login };
