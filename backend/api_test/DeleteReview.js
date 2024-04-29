const Review = require("../models/ReviewModel")

// @desc    Delete reviews
// @route   DELETE /api/users/:id
// @access  Private
exports.deleteReviewById = async (req, res, next) => {
    try {
        let review = await Review.findById(req.params.id);

        if (req.user.role !== "admin") {
            if (review && req.user.id === review.user.toString()) {
                await review.deleteOne();
                return res.status(200).json({
                    success: true,
                    data: {}
                })
            } else {
                return res.status(401).send({
                    success: false,
                    message: `This user ${req.user.id} is not authorized to delete this review`
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Cannot delete Review'
        });
    }
};