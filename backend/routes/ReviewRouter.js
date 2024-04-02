const express = require("express");
const router = express.Router({ mergeParams: true });

const {
    getReviews,
    getReviewById,
    createReview,
    updateReviewById,
    deleteReviewById
} = require('../controllers/ReviewController');

const { protect, authorize } = require('../middlewares/AuthMiddleware');

router.route('/')
    .get(protect, getReviews)
    .post(protect, authorize('admin', 'user'), createReview);

router.route('/:id')
    .get(protect, getReviewById)
    .put(protect, authorize('admin', 'user'), updateReviewById)
    .delete(protect, authorize('admin', 'user'), deleteReviewById);

module.exports = router;