const Menu = require("../models/MenuModel")

// @desc    Get all menus
// @route   GET /api/v1/menus/
// @access  Public
exports.getMenus = async (req, res, next) => {
    try {
        const menus = await Menu.find({})

        return res.status(200).send({
            success: true,
            data: menus
        })
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
// @route   POST /api/v1/menus/
// @access  Private
exports.createMenu = async (req, res, next) => {
    try {
        const menu = await Menu.create(req.body);
        
        res.status(201).send({
            success: true,
            data: menu
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

        if (!menu) {
            return res.status(404).send({
                success: false,
                message: `Not found menu ID of ${req.params.id}`
            })
        }

        // Execute updating process
        menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).send({
            success: true,
            data: menu
        })

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

        if (!menu) {
            return res.status(404).send({
                success: false,
                message: `Not found menu ID of ${req.params.id}`  
            })
        }

        // Execute deleting process
        await menu.deleteOne();

        return res.status(200).send({
            success: true,
            data: {}
        })

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            success: false,
            message: "Cannot delete menu"
        })
    }
}