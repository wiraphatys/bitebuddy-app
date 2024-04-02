const Menu = require("../models/MenuModel")

// @desc    Get all menus
// @route   GET /api/v1/menus/
// @access  Private
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