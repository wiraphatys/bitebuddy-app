const Restaurant = require("../models/RestaurantModel")

// @desc    Get all restaurants
// @route   GET /api/v1/restaurants/
// @access  Private
exports.getRestaurants = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find({})

        return res.status(200).send({
            success: true,
            data: restaurants
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}