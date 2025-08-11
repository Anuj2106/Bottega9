// routes/dashboard.js
const express = require('express');
const router = express.Router();
const  {verifyToken, restrictTo } = require('../middleware/authmiddleware');


router.get("/admin-dashboard", verifyToken, restrictTo(1), (req, res) => {
  res.json({ message: "Admin access granted." });
});

module.exports = router;
