const Review = require("../models/ReviewModel")

// @desc    Get all reviews
// @route   GET /api/v1/reviews/
// @access  Private
exports.getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({})

        return res.status(200).send({
            success: true,
            data: reviews
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}