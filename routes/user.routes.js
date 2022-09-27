const { Router } = require('express');
const { check } = require('express-validator');

const {
  validateFields,
  validateJWT,
  isAdminRole,
  hasRole,
} = require('../middlewares');

const {
  isValidRole,
  emailExists,
  userIdExists,
} = require('../helpers/db-validators');

const {
  usersGet,
  usersPut,
  usersPost,
  usersPatch,
  usersDelete,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', usersGet);
router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userIdExists),
    check('role').custom(isValidRole),
    validateFields,
  ],
  usersPut
);
router.post(
  '/',
  [
    // Name check
    check('nombre', 'The name is obligatory').not().isEmpty(),
    // Password validator
    check('password', 'The password must be more than 6 characters').isLength({
      min: 6,
    }),
    // Express email validator + custom from helpers
    check('correo', "The email isn't valid").isEmail(),
    check('correo').custom(emailExists),
    // Checks if role exists, then it checks it is valid on DB - helpers
    check('role').custom(isValidRole),
    validateFields,
  ],
  usersPost
);
router.delete(
  '/:id',
  [
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userIdExists),
    validateFields,
  ],
  usersDelete
);
router.patch('/', usersPatch);

module.exports = router;
