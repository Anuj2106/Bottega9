const express = require('express');
const router = express.Router();
const userController =require('../controllers/userController')

// API route for modal use
router.get('/users',userController.getAllUsers);
router.put('/users/status/:id', userController.toggleUserStatus);

module.exports=router;