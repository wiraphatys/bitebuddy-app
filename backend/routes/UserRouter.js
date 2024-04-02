const express = require("express");
const router = express.Router();

const {
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById
} = require('../controllers/UserController');

const {
    protect,
    authorize
} = require('../middlewares/authMiddleware');


router.route("/").get(protect, authorize("admin"), getUsers);

router.route("/:id")
    .get(protect, authorize("admin"), getUserById)
    .put(protect, updateUserById)
    .delete(protect, deleteUserById);

module.exports = router;