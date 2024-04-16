const Review = require("../models/ReviewModel")
const Restaurant = require('../models/RestaurantModel')

// @desc    Get all reviews
// @route   GET /api/v1/reviews || GET /api/v1/restaurants/:restaurantId/reviews
// @access  Private
exports.getReviews = async (req, res, next) => {
    try {
        if (req.user.role === "owner") {
            const restaurant = await Restaurant.findById(req.params.restaurantId)

            // Ownership validation: restaurant owner
            if (restaurant && restaurant.owner.toString() === req.user.id) {
                const reviews = await Review.find({ restaurant: restaurant._id.toString() }).populate({
                    path: "user",
                    select: "email img"
                })

                if (reviews.length === 0) {
                    return res.status(200).json({
                        success: true,
                        count: 0,
                        message: "Your restaurant don't have any review."
                    })
                }

                for (const review of reviews) {
                    if (review.user.img) {
                        review.user.img = await getImageUrl(review.user.img)
                    }
                }

                return res.status(200).json({
                    success: true,
                    count: reviews.length,
                    data: reviews
                })
            } else {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized to get this review"
                })
            }
        } else if (req.user.role === "user") {
            if (!req.params.restaurantId) {
                const reviews = await Review.find({ user: req.user.id }).populate({
                    path: "restaurant",
                    select: "name tel img"
                })

                if (reviews.length === 0) {
                    return res.status(200).json({
                        success: true,
                        count: 0,
                        message: "You don't have any review, make a new one !"
                    })
                }

                for (const review of reviews) {
                    if (review.restaurant.img) {
                        review.restaurant.img = await getImageUrl(review.restaurant.img)
                    }
                }

                return res.status(200).json({
                    success: true,
                    count: reviews.length,
                    data: reviews
                })
            } else {
                const restaurant = await Restaurant.findById(req.params.restaurantId)

                if (!restaurant) {
                    return res.status(404).json({
                        success: false,
                        message: "Not found this restaurant"
                    })
                }

                const reviews = await Review.find({ restaurant: restaurant._id.toString() }).populate({
                    path: "user",
                    select: "email img"
                })

                if (reviews.length === 0) {
                    return res.status(200).json({
                        success: true,
                        count: 0,
                        message: "Your restaurant don't have any review."
                    })
                }

                for (const review of reviews) {
                    if (review.user.img) {
                        review.user.img = await getImageUrl(review.user.img)
                    }
                }

                return res.status(200).json({
                    success: true,
                    count: reviews.length,
                    data: reviews
                })
            }
        } else {
            if (!req.params.restaurantId) {
                const reviews = await Review.find({}).populate({
                    path: "user",
                    select: "email img"
                }).populate({
                    path: "restaurant",
                    select: "name tel img"
                })

                if (!reviews) {
                    return res.status(404).json({
                        success: false,
                        message: `Not found review ID of ${req.params.id}`
                    })
                }

                for (const review of reviews) {
                    if (review.user.img) {
                        review.user.img = await getImageUrl(review.user.img)
                    }
                    if (review.restaurant.img) {
                        review.restaurant.img = await getImageUrl(review.restaurant.img)
                    }
                }

                return res.status(200).json({
                    success: true,
                    count: reviews.length,
                    data: reviews
                })
            } else {
                const reviews = await Review.find({ restaurant: req.params.restaurantId }).populate({
                    path: "user",
                    select: "email"
                }).populate({
                    path: "restaurant",
                    select: "name tel"
                })

                if (!reviews) {
                    return res.status(404).json({
                        success: false,
                        message: `Not found review ID of ${req.params.id}`
                    })
                }

                return res.status(200).json({
                    success: true,
                    count: reviews.length,
                    data: reviews
                })
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Cannot find Review'
        });
    }
};

// @desc    Get single reviews
// @route   GET /api/v1/reviews/:id
// @access  Private
exports.getReviewById = async (req, res, next) => {
    try {
        if (req.user.role === "user") {
            const review = await Review.findById(req.params.id).populate({
                path: "restaurant",
                select: "name tel"
            });

            if (review && review.user.toString() === req.user.id) {
                if (review.restaurant.img) {
                    review.restaurant.img = await getImageUrl(review.restaurant.img)
                }
                return res.status(200).send({
                    success: true,
                    data: review
                })
            } else {
                return res.status(401).send({
                    success: false,
                    message: `This user ${req.user.id} is not authorized to access this review`
                })
            }
        } else if (req.user.role === "owner") {
            const review = await Review.findById(req.params.id).populate({
                path: "user",
                select: "email"
            });

            const restaurant = await Restaurant.findById(review.restaurant)

            if (restaurant && restaurant.owner.toString() === req.user.id) {
                if (review.user.img) {
                    review.user.img = await getImageUrl(review.user.img)
                }
                return res.status(200).send({
                    success: true,
                    data: review
                })
            } else {
                return res.status(401).send({
                    success: false,
                    message: `This user ${req.user.id} is not authorized to access this review`
                })
            }
        } else {
            const review = await Review.findById(req.params.id).populate({
                path: "user",
                select: "email"
            }).populate({
                path: "restaurant",
                select: "name tel"
            })

            if (!review) {
                return res.status(404).json({
                    success: false,
                    message: `Not found review ID of ${req.params.id}`
                })
            }

            if (review.user.img) {
                review.user.img = await getImageUrl(review.user.img)
            }

            if (review.restaurant.img) {
                review.restaurant.img = await getImageUrl(review.restaurant.img)
            }

            return res.status(200).json({
                success: true,
                data: review
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Cannot find Review' });
    }
};

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
            return res.status(400).json({
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

// @desc    Update reviews
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReviewById = async (req, res, next) => {
    try {
        let review = await Review.findById(req.params.id);

        // role: user
        if (req.user.role !== "admin") {
            if (review && req.user.id === review.user.toString()) {
                review = await Review.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                    runValidators: true
                })
                return res.status(200).send({
                    success: true,
                    data: review
                })
            } else {
                return res.status(401).send({
                    success: false,
                    message: `This user ${req.user.id} is not authorized to update this review`
                })
            }
        } else {
            if (!review) {
                return res.status(404).send({
                    success: false,
                    message: `Not found review ID of ${req.params.id}`
                })
            }

            review = await Review.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })

            return res.status(200).send({
                success: true,
                data: review
            })

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Cannot update Review'
        });
    }
};

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
        } else {
            if (!review) {
                return res.status(404).send({
                    success: false,
                    message: `Not found review ID of ${req.params.id}`
                })
            }

            await review.deleteOne();

            return res.status(200).sjon({
                success: true,
                data: {}
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Cannot delete Review'
        });
    }
};
