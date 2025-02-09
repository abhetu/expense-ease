const express = require('express');
const { signUp, login } = require('../controllers/authController');
const router = express.Router();

// Ensure this is the correct POST route
router.post('/signup', signUp);
router.post('/login', login);

module.exports = router;
