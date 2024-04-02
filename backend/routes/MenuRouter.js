const express = require("express");
const router = express.Router();

const {
    getMenus,
    getMenuById,
    createMenu,
    updateMenuById,
    deleteMenuById
} = require('../controllers/MenuController');

const {
    protect,
    authorize
} = require("../middlewares/authMiddleware");

router.route("/")
    .get(getMenus)
    .post(protect, authorize("admin", "owner"), createRestaurant);

router.route("/:id")
    .get(getMenuById)
    .put(protect, authorize("admin", "owner"), updateMenuById)
    .delete(protect, authorize("admin", "owner"), deleteMenuById);

module.exports = router;