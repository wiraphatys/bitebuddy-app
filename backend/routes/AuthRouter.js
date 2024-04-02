const express = require('express');
const router = express.Router();

const {
    register,
    login,
    getMe,
    logout
} = require('../controllers/AuthController');

const { protect } = require("../middlewares/AuthMiddleware");

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', logout);

module.exports = router;