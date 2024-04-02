const Restaurant = require("../models/RestaurantModel")
const Review = require('../models/ReviewModel')

// @desc    Get all restaurants
// @route   GET /api/v1/restaurants/
// @access  Public
exports.getRestaurants = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find({})

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
        ])

        return res.status(200).send({
            success: true,
            data: restaurant,
            averageRating: avgRating.length > 0 ? avgRating[0].averageRating.toFixed(1) : 'No Review'
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
exports.updateRestaurant = async (req, res, next) => {
    try {
        // Find before execute updating process
        let restaurant = await Restaurant.findById(req.params.id);

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
exports.deleteRestaurant = async (req, res, next) => {
    try {
        // Find before execute deleting process
        let restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).send({
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

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            success: false,
            message: "Cannot delete restaurant"
        })
    }
}