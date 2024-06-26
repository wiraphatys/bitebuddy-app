const express = require('express');
const router = express.Router();

const {
    login,
    getMe,
    logout
} = require('../controllers/AuthController');

const { protect } = require("../middlewares/AuthMiddleware");

router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', logout);

module.exports = router;