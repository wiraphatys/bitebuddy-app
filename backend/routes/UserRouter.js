const express = require("express");
const router = express.Router();

const {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
} = require('../controllers/UserController');

const {
    protect,
    authorize
} = require('../middlewares/AuthMiddleware');


router.route("/").get(protect, authorize("admin"), getUsers);

router.route("/:id")
    .get(protect, authorize("admin"), getUserById)
    .put(protect, updateUserById)
    .delete(protect, deleteUserById);

router.route("/:role").post(createUser);

module.exports = router;