const express = require("express");
const router = express.Router();

const {
    getReviews,
} = require('../controllers/ReviewController');

router.route("/").get(getReviews);

module.exports = router;