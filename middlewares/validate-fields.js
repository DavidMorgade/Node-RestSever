const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
  // Validate email Express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

module.exports = {
  validateFields,
};
