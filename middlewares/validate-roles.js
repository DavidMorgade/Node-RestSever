const { request, response } = require('express');

// delete only for admins
const isAdminRole = (req = request, res = response, next) => {
  // Checks JWT is validated first
  if (!req.user) {
    return res.status(500).json({
      msg: 'Trying to verify role without checking JWT',
    });
  }
  const { role, nombre } = req.user;
  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${nombre} is not an admin - can't do this`,
    });
  }
  next();
};
const hasRole = (...roles) => {
  return (req, res = response, next) => {
    // Checks JWT is validated first
    if (!req.user) {
      return res.status(500).json({
        msg: 'Trying to verify role without checking JWT',
      });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `The service requieres any of this roles ${roles}`,
      });
    }
    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
