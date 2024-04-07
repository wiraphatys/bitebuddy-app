const Reservation = require("../models/ReservationModel")
const Restaurant = require("../models/RestaurantModel")

// @desc    Get all reservations
// @route   GET /api/v1/reservations/ || GET /api/v1/restaurants/:restaurantId/reservations
// @access  Private
exports.getReservations = async (req, res, next) => {
    try {
        if (req.user.role === "owner") {
            const restaurant = await Restaurant.findById(req.params.restaurantId)

            // Ownership validation: restaurant owner
            if (restaurant && restaurant.owner.toString() === req.user.id) {
                const reservations = await Reservation.find({ restaurant: restaurant._id.toString() }).populate({
                    path: "user",
                    select: "email"
                })

                if (reservations.length === 0) {
                    return res.status(200).json({
                        success: true,
                        count: 0,
                        message: "Your restaurant don't have any reservation."
                    })
                }

                return res.status(200).json({
                    success: true,
                    count: reservations.length,
                    data: reservations
                })
            } else {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized to get this reservations"
                })
            }
        } else if (req.user.role === "user") {
            const reservations = await Reservation.find({ user: req.user.id }).populate({
                path: "restaurant",
                select: "name tel street locality district province zipcode"
            })

            if (reservations.length === 0) {
                return res.status(200).json({
                    success: true,
                    count: 0,
                    message: "You don't have any reservation, make a new one !"
                })
            }

            return res.status(200).json({
                success: true,
                count: reservations.length,
                data: reservations
            })
        } else {
            if (!req.params.restaurantId) {
                const reservations = await Reservation.find({}).populate({
                    path: "user",
                    select: "email"
                }).populate({
                    path: "restaurant",
                    select: "name tel street locality district province zipcode"
                })

                return res.status(200).json({
                    success: true,
                    count: reservations.length,
                    data: reservations
                })
            } else {
                // has params :restaurantId
                const reservations = await Reservation.find({ restaurant: req.params.restaurantId }).populate({
                    path: "user",
                    select: "email"
                }).populate({
                    path: "restaurant",
                    select: "name tel street locality district province zipcode"
                })

                return res.status(200).json({
                    success: true,
                    count: reservations.length,
                    data: reservations
                })
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "Cannot find reservation"
        })
    }
}

// @desc    Get single reservation
// @route   GET /api/v1/reservations/:id
// @access  Private
exports.getReservationByID = async (req, res, next) => {
    try {

        if (req.user.role === "user") {
            const reservation = await Reservation.findById(req.params.id).populate({
                path: "restaurant",
                select: "name tel street locality district province zipcode"
            });

            if (reservation && reservation.user.toString() === req.user.id) {
                return res.status(200).send({
                    success: true,
                    data: reservation
                })
            } else {
                return res.status(401).send({
                    success: false,
                    message: `This user ${req.user.id} is not authorized to access this reservation`
                })
            }
        } else if (req.user.role === "owner") {
            const reservation = await Reservation.findById(req.params.id).populate({
                path: "user",
                select: "email"
            });

            const restaurant = await Restaurant.findById(reservation.restaurant)

            if (restaurant && restaurant.owner.toString() === req.user.id) {
                return res.status(200).send({
                    success: true,
                    data: reservation
                })
            } else {
                return res.status(401).send({
                    success: false,
                    message: `This user ${req.user.id} is not authorized to access this reservation`
                })
            }
        } else {
            const reservation = await Reservation.findById(req.params.id).populate({
                path: "user",
                select: "email"
            }).populate({
                path: "restaurant",
                select: "name tel street locality district province zipcode"
            })

            if (!reservation) {
                return res.status(404).json({
                    success: false,
                    message: `Not found reservation ID of ${req.params.id}`
                })
            }

            return res.status(200).json({
                success: true,
                data: reservation
            })
        }

    } catch (err) {
        console.log(err.stack)
        return res.status(500).send({
            success: false,
            message: `Cannot find reservation`
        })
    }
}

// @desc    Add a new reservation
// @route   POST /api/v1/restaurants/:restaurantId/reservations
// @access  Private
exports.createReservation = async (req, res, next) => {
    try {
        // create new fields in req.body to prepare the payload for create new preservation
        req.body.restaurant = req.params.restaurantId;
        req.body.user = req.user.id;        // ownership validation

        
        const existedReservation = await Reservation.find({ user : req.user.id });

        if (existedReservation.length >= 3) {
            return res.status(400).send({
                success: false,
                message: `The user with ID ${req.user.id} has already made 3 reservations`
            })
        }

        const restaurant = await Restaurant.findById(req.params.restaurantId);

        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: `Not found restaurant ID of ${req.params.restaurantId}`
            })
        }

        const reservation = await Reservation.create(req.body);
        return res.status(201).send({
            success: true,
            data: reservation
        })

    } catch (err) {
        console.log(err.stack)
        return res.status(500).send({
            success: false,
            message: "Cannot create reservation"
        })
    }
}

// @desc    Update a reservation
// @route   PUT /api/v1/reservations/:id
// @access  Private
exports.updateReservation = async (req, res, next) => {
    try {
        let reservation = await Reservation.findById(req.params.id);

        if (req.user.role !== "admin") {
            if (reservation && req.user.id === reservation.user.toString()) {
                reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                    runValidators: true
                })
                return res.status(200).send({
                    success: true,
                    data: reservation
                })
            } else {
                return res.status(401).send({
                    success: false,
                    message: `This user ${req.user.id} is not authorized to update this reservation`
                })
            }
        } else {
            if (!reservation) {
                return res.status(404).send({
                    success: false,
                    message: `Not found reservation ID of ${req.params.id}`
                })
            }

            reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })

            return res.status(200).send({
                success: true,
                data: reservation
            })

        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Cannot update reservation"
        })
    }
}

// @desc    Delete a reservation
// @route   DELETE /api/v1/reservations/:id
// @access  Private
exports.deleteReservation = async (req, res, next) => {
    try {
        let reservation = await Reservation.findById(req.params.id);

        if (req.user.role !== "admin") {
            if (reservation && req.user.id === reservation.user.toString()) {
                await reservation.deleteOne();
                return res.status(200).send({
                    success: true,
                    data: {}
                })
            } else {
                return res.status(401).send({
                    success: false,
                    message: `This user ${req.user.id} is not authorized to delete this reservation`
                })
            }
        } else {
            if (!reservation) {
                return res.status(404).send({
                    success: false,
                    message: `Not found reservation ID of ${req.params.id}`
                })
            }

            await reservation.deleteOne();

            return res.status(200).send({
                success: true,
                data: {}
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "Cannot delete reservation"
        })
    }
}