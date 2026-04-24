const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { registerUser, loginUser, getMe } = require('../controllers/auth.controller');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', authMiddleware, getMe);

module.exports = router;
