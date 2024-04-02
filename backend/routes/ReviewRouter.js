const express = require("express");
const router = express.Router({mergeParams: true});

const {getReviews, getReview, createReview, updateReview, deleteReview } = require('../controllers/reviews');

const {protect, authorize} = require('../middlewares/AuthMiddleware');

router.route('/').get(protect, getReviews).post(protect,authorize('admin','user'), createReview);

router.route('/:id').get(protect, getReview).put(protect,authorize('admin','user'), updateReview).delete(protect,authorize('admin','user'), deleteReview);

module.exports = router;