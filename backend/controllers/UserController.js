const User = require("../models/UserModel")
const {
    uploadImageToS3,
    getImageUrl
} = require("../config/aws-s3");

// @desc    Get all users
// @route   GET /api/v1/users/
// @access  Private
exports.getUsers = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(401).send({
                success: false,
                message: `This user ID of ${req.user.id} not authorized to access this route`
            })
        }
        const users = await User.find({});

        for (const user of users) {
            if (user.img) {
                user.img = await getImageUrl(user.img)
            }
        }

        return res.status(200).send({
            success: true,
            data: users
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }
}



// @desc    Get single user
// @route   GET /api/v1/users/:id
// @access  Private
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        user.img = await getImageUrl(user.img)

        if (!user) {
            return res.status(404).send({
                success: false,
                message: `Not found user ID of ${req.params.id}`
            })
        }

        res.status(200).send({
            success: true,
            data: user
        })

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }
}

// @desc    Register user
// @route   POST /api/v1/users/:role
// @access  Public
exports.createUser = (async (req, res, next) => {
    try {
        const { email , password , firstName , lastName , tel } = req.body;
        const role = req.params.role

        if (role !== "user" && role !== "owner" && role !== "admin") {
            return res.status(400).json({
                success: false,
                message: "invalid role"
            })
        }
        let img = ''
        // validate file
        if (req.file) {
            img = await uploadImageToS3(req)
        }

        const user = await User.create({ email, password, firstName, lastName, tel, role , img })

        // Create token
        const token = user.getSignedJwtToken()

        return res.status(200).json({
            success: true,
            token
        })

    } catch (e) {
        console.log(e.stack)
        return res.status(400).send({
            success: false,
            message: e.message
        })
    }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
exports.updateUserById = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);

        // role : { user , owner }
        if (req.user.role !== "admin") {
            if (req.body.role) {
                return res.status(400).send({
                    success: false,
                    message: `This user ID of ${req.params.id} not allow to edit role`
                })
            }
            if (user && req.user.id === user._id.toString()) {
                user.set(req.body);
                await user.save();

                user = user.toObject();
                delete user.password;

                return res.status(200).send({
                    success: true,
                    data: user
                })
            } else {
                return res.status(401).send({
                    success: false,
                    message: `This user ID of ${req.user.id} not authorized to update this user`
                })
            }
        } else {
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: `Not found user ID of ${req.params.id}`
                })
            }

            user.set(req.body);
            await user.save();

            user = user.toObject();
            delete user.password;

            return res.status(200).send({
                success: true,
                data: user
            })
        }

    } catch (err) {
        console.log(err.message);
        // Handling validation errors
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages // Providing detailed info about what went wrong
            });
        }

        res.status(500).send({
            success: false,
            message: "Cannot update user"
        })
    }
}

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
exports.deleteUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        // role : { user , owner }
        if (req.user.role !== "admin") {
            if (user && req.user.id === user._id.toString()) {
                await user.deleteOne();
                return res.status(200).send({
                    success: true,
                    data: {}
                })
            } else {
                return res.status(401).send({
                    success: false,
                    message: `This user ID of ${req.user.id} is not authorized to delete this user`
                })
            }
        } else {
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: `Not found user ID of ${req.params.id}`
                })
            }

            await user.deleteOne();

            return res.status(200).send({
                success: true,
                data: {}
            })
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            success: false,
            message: "Cannot delete user"
        })
    }
}

