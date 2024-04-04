const express = require("express");
const router = express.Router();
const reservationRouter = require("./ReservationRouter");
const menuRouter = require("./MenuRouter");

const {
    getRestaurants,
    getRestaurantByID,
    createRestaurant,
    updateRestaurantById,
    deleteRestaurantById
} = require('../controllers/RestaurantController');

const {
    protect,
    authorize
} = require("../middlewares/AuthMiddleware");

router.route("/")
    .get(protect, getRestaurants)
    .post(protect, authorize("owner"), createRestaurant);

router.route("/:id")
    .get(protect, authorize("user", "admin"), getRestaurantByID)
    .put(protect, authorize("owner", "admin"), updateRestaurantById)
    .delete(protect, authorize("owner", "admin"), deleteRestaurantById);

// re-Routing to reservation router
router.use("/:restaurantId/reservations", reservationRouter);
router.use("/:restaurantId/menus", menuRouter);

module.exports = router;