const express = require('express');

const router = express.Router();

const { register, login, profile, logout } = require('../controllers/authController');

router.post('/login', login);

router.post('/register', register);

router.get('/logout', logout);

router.get('/profile', profile);

module.exports = router;
