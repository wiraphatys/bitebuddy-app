const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable params merging

const {
    getReservations,
    getReservationByID,
    createReservation,
    updateReservation,
    deleteReservation
} = require("../controllers/ReservationController");

const {
    protect,
    authorize
} = require("../middlewares/AuthMiddleware");

router.route("/")
    .get(protect, getReservations)
    .post(protect, authorize("user"), createReservation);

router.route("/:id")
    .get(protect, getReservationByID)
    .put(protect, authorize("user", "admin"), updateReservation)
    .delete(protect, authorize("user", "admin"), deleteReservation);

module.exports = router;