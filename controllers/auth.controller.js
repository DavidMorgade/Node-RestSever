const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google.verify');
const { DefaultTransporter } = require('google-auth-library');

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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { correo, nombre, img } = await googleVerify(id_token);

    // Check if user already has a normal account trying to log with google
    let user = await User.findOne({ correo });

    if (!user) {
      //Create user
      const data = {
        nombre,
        correo,
        password: '**',
        img,
        google: true,
      };
      user = new User(data);
      await user.save();
    }
    // Check if user in DB is deleted / banned
    if (!user.state) {
      return res.status(404).json({
        msg: 'User blocked, talk with an administrator',
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "The token couldn't be verified",
    });
  }
};

module.exports = { login, googleSignIn };
