const Restaurant = require("../models/RestaurantModel")
const Review = require('../models/ReviewModel')
const {
    uploadImageToS3,
    getImageUrl
} = require("../config/aws-s3");

// @desc    Get all restaurants
// @route   GET /api/v1/restaurants/
// @access  Public
exports.getRestaurants = async (req, res, next) => {
    try {
        // role : { user , admin }
        if (req.user.role !== "owner") {
            const restaurants = await Restaurant.find({})

            for (const restaurant of restaurants) {
                if (restaurant.img) {
                    restaurant.img = await getImageUrl(restaurant.img)
                }
            }

            for (let i = 0; i < restaurants.length; i++) {
                const avgRating = await Review.aggregate([
                    {
                        $match: { restaurant: restaurants[i]._id }
                    },
                    {
                        $group: {
                            _id: null,
                            averageRating: { $avg: "$rating" }
                        }
                    }
                ]);
                restaurants[i] = { ...restaurants[i]._doc, reservations: restaurants[i].reservations, averageRating: avgRating.length > 0 ? avgRating[0].averageRating.toFixed(1) : 'No Review' };
            }

            return res.status(200).send({
                success: true,
                count: restaurants.length,
                data: restaurants
            })
        // role : { owner }
        } else {
            const restaurant = await Restaurant.findOne({ owner: req.user.id });

            if (!restaurant) {
                return res.status(200).json({
                    success: true,
                    message: "You don't have any restaurants. Create one!"
                })
            }

            restaurant.img = await getImageUrl(restaurant.img)

            const avgRating = await Review.aggregate([
                {
                    $match: { restaurant: restaurant._id }
                },
                {
                    $group: {
                        _id: null,
                        averageRating: { $avg: "$rating" }
                    }
                }
            ]);

            const averageRating = avgRating.length > 0 ? avgRating[0].averageRating.toFixed(1) : 'No Review';
            restaurant.averageRating = averageRating;

            return res.status(200).json({
                success: true,
                data: { ...restaurant._doc, averageRating: averageRating }
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// @desc    Get single restaurant
// @route   GET /api/v1/restaurants/:id
// @access  Public
exports.getRestaurantByID = async (req, res, next) => {
    try {
        // find single massage in database by ID
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: `Not found restaurant ID of ${req.params.id}`
            })
        }

        restaurant.img = await getImageUrl(restaurant.img)

        const avgRating = await Review.aggregate([
            {
                $match: { restaurant: restaurant._id }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" }
                }
            }
        ]);

        const averageRating = avgRating.length > 0 ? avgRating[0].averageRating.toFixed(1) : 'No Review';
        restaurant.averageRating = averageRating;

        return res.status(200).json({
            success: true,
            data: { ...restaurant._doc, averageRating: averageRating }
        })

    } catch (err) {
        // If the error is due to an invalid ObjectID format
        if (err.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: `Restaurant not found with ID of ${req.params.id}, invalid ID format`
            });
        }

        // For other types of errors, it's likely a server error
        res.status(500).json({
            success: false,
            message: `Error retrieving restaurant with ID of ${req.params.id}`
        });
    }
}

// @desc    Create new restaurant
// @route   POST /api/v1/restaurants/
// @access  Private
exports.createRestaurant = async (req, res, next) => {
    try {
        req.body.owner = req.user.id;

        const existedRestaurant = await Restaurant.find({ owner: req.user.id })

        if (existedRestaurant.length !== 0) {
            return res.status(400).json({
                success: false,
                message: "You're already created restaurant."
            })
        }

        // validate file
        if (req.file) {
            req.body.img = await uploadImageToS3(req)
        }

        const restaurant = await Restaurant.create(req.body);
        
        res.status(201).send({
            success: true,
            data: restaurant
        })
    } catch (err) {
        // Handling validation errors
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages // Providing detailed info about what went wrong
            });
        }

        // For other types of errors, it's likely a server error
        res.status(500).json({
            success: false,
            message: 'Failed to create restaurant'
        });
    }
}

// @desc    Update restaurant by id
// @route   PUT /api/v1/restaurants/:id
// @access  Private
exports.updateRestaurantById = async (req, res, next) => {
    try {
        // Find before execute updating process
        let restaurant = await Restaurant.findById(req.params.id);

        if (req.user.role === "owner") {
            // Ownership validation
            if (restaurant && restaurant.owner.toString() === req.user.id) {
                // Execute updating process
                restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                    runValidators: true
                })

                res.status(200).send({
                    success: true,
                    data: restaurant
                })
            } else {
                return res.status(401).send({
                    success: false,
                    message: `This user ${req.user.id} is not authorized to access this restaurant`
                })
            }
        } else {
            if (!restaurant) {
                return res.status(404).send({
                    success: false,
                    message: `Not found restaurant ID of ${req.params.id}`
                })
            }
            // Execute updating process
            restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })

            res.status(200).send({
                success: true,
                data: restaurant
            })
        }

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }
}

// @desc    Delete restaurant by id
// @route   DELETE /api/v1/restaurants/:id
// @access  Private
exports.deleteRestaurantById = async (req, res, next) => {
    try {
        // Find before execute deleting process
        let restaurant = await Restaurant.findById(req.params.id);

        if (req.user.role === "owner") {
            // Ownership validation
            if (restaurant && restaurant.owner.toString() === req.user.id) {
                // Execute deleting process
                await restaurant.deleteOne();

                return res.status(200).send({
                    success: true,
                    data: {}
                })
            } else {
                return res.status(401).send({
                    success: false,
                    message: `This user ${req.user.id} is not authorized to access this restaurant`
                })
            }
        } else {

            if (!restaurant) {
                return res.status(404).json({
                    success: false,
                    message: `Not found restaurant ID of ${req.params.id}`
                })
            }

            // Execute deleting process
            await restaurant.deleteOne();

            return res.status(200).send({
                success: true,
                data: {}
            })
        }

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            success: false,
            message: "Cannot delete restaurant"
        })
    }
}