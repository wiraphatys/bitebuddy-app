const express = require("express");
const router = express.Router();

const {
    getUsers,
    getUserByID,
    updateUser,
    deleteUser
} = require('../controllers/UserController');

const {
    protect,
    authorize
} = require('../middlewares/authMiddleware');


router.route("/").get(protect, authorize("admin"), getUsers);

router.route("/:id")
    .get(protect, authorize("admin"), getUserByID)
    .put(protect, updateUser)
    .delete(protect, deleteUser);

module.exports = router;