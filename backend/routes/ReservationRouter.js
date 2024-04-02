const express = require("express");
const router = express.Router();

const {
    getReservations,
} = require('../controllers/ReservationController');

router.route("/").get(getReservations);

module.exports = router;