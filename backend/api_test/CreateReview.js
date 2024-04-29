const Review = require("../models/ReviewModel")
const Restaurant = require('../models/RestaurantModel')

// @desc    Create reviews
// @route   PUT /api/v1/restaurants/:restaurantId/reviews
// @access  Private
exports.createReview = async (req, res, next) => {
    try {
        // parse { user , restaurant } to req.body
        req.body.restaurant = req.params.restaurantId;
        req.body.user = req.user.id;

        const restaurant = await Restaurant.findById(req.params.restaurantId);

        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: `Not found restaurant ID of ${req.params.restaurantId}`
            })
        }

        const existingReviews = await Review.find({
            user: req.user.id,
            restaurant: req.params.restaurantId
        });

        if (existingReviews.length !== 0) {
            return res.status(400).send({
                success: false,
                message: `You've already written the review for this restaurant.`
            })
        }

        const review = await Review.create(req.body);

        res.status(200).json({
            success: true,
            data: review
        });

    } catch (err) {
        console.log(err);

        if (req.body.rating < 0 || req.body.rating > 5) {
            return res.status(400).send({
                success: false,
                message: `rating value can only between 0-5`
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Cannot create Review'
        });
    }
};