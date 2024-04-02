const Reservation = require("../models/ReservationModel")

// @desc    Get all reservations
// @route   GET /api/v1/reservations/
// @access  Private
exports.getReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find({})

        return res.status(200).send({
            success: true,
            data: reservations
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}