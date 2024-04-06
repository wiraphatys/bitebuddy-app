const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const RestaurantSchema = new Schema({
    name: { 
        type: String, 
        required: [true, "please fill a name."] 
    },
    img: { 
        type: String, 
        required: [true, "please fill an image."] 
    },
    description: { 
        type: String, 
        required: [true, "please fill a description."] 
    },
    tel: {
        type: String,
        required: [true, "please fill a tel"]
    },
    street: {
        type: String,
        required: [true, "please fill a street."]
    },
    locality: {
        type: String,
        required: [true, "please fill a locality"]
    },
    district: { 
        type: String, 
        required: [true, "please fill a district."] 
    },
    province: { 
        type: String, 
        required: [true, "please fill a province."] 
    },
    zipcode: { 
        type: String, 
        required: [true, "please fill a zipcode."] 
    },
    closeDate: {
        type: [Number], // Array of Numbers
        required: true,
        validate: {
            validator: function (arr) {
                return Array.isArray(arr) && arr.every(val => Number.isInteger(val) && val >= 0 && val <= 6);
            },
            message: "closeDate must be an array of numbers (0 - 6)."
        }
    },
    open: {
        type: String,
        required: [true, "please fill a open time."],
        validate: {
            validator: function (value) {
                return timePattern.test(value);
            },
            message: props => `${props.value} is not a valid time format (HH:MM).`
        }
    },
    close: {
        type: String,
        required: [true, "please fill a close time."],
        validate: {
            validator: function (value) {
                return timePattern.test(value);
            },
            message: props => `${props.value} is not a valid time format (HH:MM).`
        }
    },
    owner: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: { 
        type: Date,
        default: Date.now 
        },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
})

//Cascade delete menus when a restaurant is deleted
RestaurantSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        console.log(`Menus being removed for user ${this._id}`);
        await this.model('Menu').deleteMany({ restaurant: this._id });
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = model("Restaurant", RestaurantSchema)