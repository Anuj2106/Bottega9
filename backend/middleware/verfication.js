const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT from cookies or Authorization header.
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  const token = tokenFromHeader || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains user_id, role_id, etc.
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid Token' });
  }
};

/**
 * Middleware for role-based access control.
 * Usage: restrictTo(1) // allow only role_id 1
 */
const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role_id)) {
      return res.status(403).json({ message: 'Forbidden - Access denied' });
    }
    next();
  };
};

module.exports = {
  verifyToken,
  restrictTo,
};
