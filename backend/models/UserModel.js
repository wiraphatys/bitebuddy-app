const mongoose = require('mongoose');
const { Schema , model } = mongoose;

const UserSchema = new Schema({
    username: { 
        type: String, 
        unique: true, 
        required: [true, "please fill a name."]
    },
    email: {
        type: String, 
        unique: true, 
        required: [true, "please fill an email."],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email'
        ]
    },
    password: { 
        type: String, 
        required: [true, "please fill a password."],
        minlength: 8,
        select: false
    },
    firstName: { 
        type: String, 
        required: [true, "please fill a firstname."]
    },
    lastName: { 
        type: String, 
        required: [true, "please fill a lastname."]
    },
    tel: { 
        type: String, 
        required: [true, "please fill a telephone number."]
    },
    role: {
        type: String,
        enum: ['user', 'owner', 'admin'],
        default: 'user'
    },
    createdAt: { 
        type: Date, default: Date.now 
    },
    updatedAt: { 
        type: Date, default: Date.now 
    }
});


//Cascade delete reservations when a user is deleted
UserSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        console.log(`Reservations being removed for user ${this._id}`);
        await this.model('Reservation').deleteMany({ user: this._id });
        next();
    } catch (error) {
        next(error);
    }
});

//Cascade delete reviews when a user is deleted
UserSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        console.log(`Reviews being removed for user ${this._id}`);
        await this.model('Review').deleteMany({ user: this._id });
        next();
    } catch (error) {
        next(error);
    }
});

//Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    // Now we hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

//Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = model("User", UserSchema)