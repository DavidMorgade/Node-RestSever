const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
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

module.exports = router;
