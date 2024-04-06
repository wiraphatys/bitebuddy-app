const Menu = require("../models/MenuModel")
const Restaurant = require("../models/RestaurantModel")
const {
    uploadImageToS3,
    getImageUrl
} = require("../config/aws-s3");

// @desc    Get all menus
// @route   GET /api/v1/restaurants/:restaurantId/menus
// @access  Public
exports.getMenus = async (req, res, next) => {
    try {
        if (!req.params.restaurantId) {
            return res.status(400).json({
                success: false,
                message: "Reference Error"
            })
        }
        if (req.user.role === "owner") {

            const restaurant = await Restaurant.findById(req.params.restaurantId)

            // Ownership validation
            if (restaurant && restaurant.owner.toString() === req.user.id) {

                const menus = await Menu.find({ restaurant: req.params.restaurantId })

                for (const menu of menus) {
                    if (menu.img) {
                        menu.img = await getImageUrl(menu.img)
                    }
                }

                if (menus.length === 0) {
                    return res.status(200).json({
                        success: true,
                        count: 0,
                        message: "Your restaurant doesn't have any menu. Create one now!"
                    })
                }

                return res.status(200).send({
                    success: true,
                    count: menus.length,
                    data: menus
                })
            } else {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized to access this route."
                })
            }
        } else {

            const restaurant = await Restaurant.findById(req.params.restaurantId)

            if (!restaurant) {
                return res.status(404).json({
                    success: false,
                    message: `Not found restaurant ID of ${req.params.restaurantId}`
                })
            }

            const menus = await Menu.find({ restaurant: req.params.restaurantId })

            for (const menu of menus) {
                if (menu.img) {
                    menu.img = await getImageUrl(menu.img)
                }
            }

            if (menus.length === 0) {
                return res.status(200).json({
                    success: true,
                    count: 0,
                    message: "This restaurant not has any menu."
                })
            }

            return res.status(200).json({
                success: true,
                count: menus.length,
                data: menus
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// @desc    Get single menu
// @route   GET /api/v1/menus/:id
// @access  Public
exports.getMenuById = async (req, res, next) => {
    try {
        // find single massage in database by ID
        const menu = await Menu.findById(req.params.id);

        if (!menu) {
            return res.status(404).send({
                success: false,
                message: `Not found menu ID of ${req.params.id}`
            })
        }

        menu.img = await getImageUrl(menu.img)

        return res.status(200).send({
            success: true,
            data: menu
        })

    } catch (err) {
        // If the error is due to an invalid ObjectID format
        if (err.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: `Menu not found with ID of ${req.params.id}, invalid ID format`
            });
        }

        // For other types of errors, it's likely a server error
        res.status(500).json({
            success: false,
            message: `Error retrieving menu with ID of ${req.params.id}`
        });
    }
}

// @desc    Create new menu
// @route   POST /api/v1/restaurant/:restaurantId/menus
// @access  Private
exports.createMenu = async (req, res, next) => {
    try {
        // Parse restaurantId to req.body
        req.body.restaurant = req.params.restaurantId

        const restaurant = await Restaurant.findById(req.params.restaurantId)

        if (restaurant && restaurant.owner.toString() === req.user.id) {

            // validate file
            if (req.file) {
                req.body.img = await uploadImageToS3(req)
            }
            const menu = await Menu.create(req.body);

            return res.status(201).send({
                success: true,
                data: menu
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to access this route."
            })
        }
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
            message: 'Failed to create menu'
        });
    }
}

// @desc    Update menu by id
// @route   PUT /api/v1/menus/:id
// @access  Private
exports.updateMenuById = async (req, res, next) => {
    try {
        // Find before execute updating process
        let menu = await Menu.findById(req.params.id);

        if (req.user.role === "owner") {

            const restaurant = await Restaurant.findById(menu?.restaurant)

            // Ownership validation
            if (menu && restaurant.owner.toString() === req.user.id) {

                menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                    runValidators: true
                })

                return res.status(200).json({
                    success: true,
                    data: menu
                })
            } else {
                return res.status(401).json({
                    success: false,
                    message: `This user ${req.user.id} is not authorized to update this menu`
                })
            }
        } else if (req.user.role === "admin") {

            if (!menu) {
                return res.status(401).send({
                    success: false,
                    message: `This user ${req.user.id} is not authorized to update this menu`
                })
            }

            menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })

            return res.status(200).json({
                success: true,
                data: menu
            })
        }

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }
}

// @desc    Delete menu by id
// @route   DELETE /api/v1/menus/:id
// @access  Private
exports.deleteMenuById = async (req, res, next) => {
    try {
        // Find before execute deleting process
        let menu = await Menu.findById(req.params.id);

        if (req.user.role === "owner") {
            const restaurant = await Restaurant.findById(menu?.restaurant)

            // Ownership validation
            if (menu && restaurant.owner.toString() === req.user.id) {
                // Execute deleting process
                await menu.deleteOne();

                return res.status(200).send({
                    success: true,
                    data: {}
                })

            } else {
                return res.status(401).json({
                    success: false,
                    message: `This user ${req.user.id} is not authorized to delete this menu`
                })
            }
        } else if (req.user.role === "admin") {
            if (!menu) {
                return res.status(401).send({
                    success: false,
                    message: `This user ${req.user.id} is not authorized to delete this menu`
                })
            }

            // Execute deleting process
            await menu.deleteOne();

            return res.status(200).send({
                success: true,
                data: {}
            })
        }

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            success: false,
            message: "Cannot delete menu"
        })
    }
}