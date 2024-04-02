const express = require("express");
const router = express.Router();
const reservationRouter = require("./ReservationRouter");

const {
    getRestaurants,
    getRestaurantByID,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
} = require('../controllers/RestaurantController');

const {
    protect,
    authorize
} = require("../middlewares/authMiddleware");

router.route("/")
    .get(getRestaurants)
    .post(protect, authorize("admin", "owner"), createRestaurant);

router.route("/:id")
    .get(getRestaurantByID)
    .put(protect, authorize("admin", "owner"), updateRestaurant)
    .delete(protect, authorize("admin", "owner"), deleteRestaurant);

// re-Routing to reservation router
router.use("/:restaurantId/reservations", reservationRouter);

module.exports = router;