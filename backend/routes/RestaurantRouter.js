const express = require("express");
const router = express.Router();

const {
    getRestaurants,
} = require('../controllers/RestaurantController');

router.route("/").get(getRestaurants);

module.exports = router;