const jwt = require("jsonwebtoken");

// ✅ Token Verification Middleware
exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { user_id, role_id }
    req.session.user = decoded; // Save to session
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Role-Based Access Middleware
exports.restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.session.user;

    if (!user || !allowedRoles.includes(user.role_id)) {
      return res.status(403).json({ message: "Forbidden - Access denied" });
    }

    next();
  };
};
