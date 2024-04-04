const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable params merging

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
} = require("../middlewares/AuthMiddleware");

router.route("/")
    .get(protect, getMenus)
    .post(protect, authorize("owner"), createMenu);

router.route("/:id")
    .get(protect, getMenuById)
    .put(protect, authorize("admin", "owner"), updateMenuById)
    .delete(protect, authorize("admin", "owner"), deleteMenuById);

module.exports = router;