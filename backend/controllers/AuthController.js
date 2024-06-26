// auth controller

// import User model
const { getImageUrl } = require('../config/aws-s3')
const User = require('../models/UserModel')

// define function for send token response
const sendTokenResponse = ((user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken()

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        options.secure = true
    }

    res.status(statusCode).cookie('token', token, options).send({
        success: true,
        token,
        role: user.role
    })
})

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = (async (req, res, next) => {
    try {
        const { email, password } = req.body

        // validation email and password cannot be empty string
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                msg: "Please provide an email and password."
            })
        }

        // check for user
        const user = await User.findOne({ email }).select('+password');

        // if user not found
        if (!user) {
            return res.status(400).send({
                success: false,
                msg: "Invalid credentials"
            })
        }

        // defind isMatch
        const isMatch = await user.matchPassword(password);

        // if password is not match
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid credentials"
            })
        }

        sendTokenResponse(user, 200, res)
    } catch (e) {
        return res.status(401).send({
            success: false,
            msg: e.message
        })
    }

})

// @desc    Get current Logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = (async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)

        if (user.img !== "") {
            user.img = await getImageUrl(user.img)
        }

        return res.status(200).send({
            success: true,
            data: user
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }
})

// @desc    Logout user
// @route   GET /api/v1/auth/logout
// @access  Public
exports.logout = (async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })

    return res.status(200).send({
        success: true,
        data: {}
    })
})