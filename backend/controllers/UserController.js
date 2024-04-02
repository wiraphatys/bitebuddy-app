const User = require("../models/UserModel")

// @desc    Get all users
// @route   GET /api/v1/users/
// @access  Private
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});

        return res.status(200).send({
            success: true,
            data: users
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }
}