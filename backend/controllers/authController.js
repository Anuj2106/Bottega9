const bcrypt = require('bcrypt');
const User = require('../model/userModel');

// Register Controller
exports.register = async (req, res) => {
  const { user_name, user_email, user_pass, role_id } = req.body;

  if (!user_name || !user_email || !user_pass) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  User.findByEmail(user_email, async (err, result) => {
    if (err) {
      console.error('🔴 MySQL INSERT Error:', err.sqlMessage || err.message);
      return res.status(500).json({ message: 'Database error.', error: err.sqlMessage || err.message });
    }

    if (result.length > 0) return res.status(409).json({ message: 'Email already exists.' });

    const hashedPassword = await bcrypt.hash(user_pass, 10);

    const userData = {
      user_name,
      user_email,
      user_pass: hashedPassword,
      role_id: role_id || 3 // default role as 'user'
    };

    User.register(userData, (err, result) => {
      if (err) return res.status(500).json({ message: 'Registration failed.' });
      res.status(201).json({ message: 'User registered successfully.' });
    });
  });
};

// Login Controller (Session-based)
exports.login = (req, res) => {
  const { user_email, user_pass } = req.body;
  

  if (!user_email || !user_pass) {
    return res.status(400).json({ message: "All fields are required." });
  }

  User.findUserByEmail(user_email, (err, user) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: "Database error." });
    }

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    bcrypt.compare(user_pass, user.user_pass, (err, isMatch) => {
      if (err) {
        console.error("Password compare error:", err);
        return res.status(500).json({ message: "Error verifying password." });
      }

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password." });
      }

      // ✅ Create session
      req.session.user = {
        user_id: user.user_id,
        user_name: user.user_name,
        role_id: user.role_id
      };

      res.status(200).json({
        message: "Login successful.",
        user: req.session.user
      });
    });
  });
};

// Logout Controller
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed." });
    res.clearCookie('connect.sid'); // default session cookie name
    res.status(200).json({ message: "Logged out successfully." });
  });
};
