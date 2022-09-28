const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post(
  '/login',
  [
    check('correo', 'The email is neccesary').isEmail(),
    check('password', 'The password cannot be empty').not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  '/google',
  [check('id_token', 'id_token is neccesary').not().isEmpty(), validateFields],
  googleSignIn
);

module.exports = router;
