const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifySession = require('../middleware/verfication');

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Protected route example


// Logout route (destroys session)
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // default session cookie name
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
