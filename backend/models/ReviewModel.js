const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ReviewSchema = new Schema({
    rating: {
        type: Number,
        required: [true, "please fill a rating."]
    },
    comment: {
        type: String,
    },
    img: {
        type: String,
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    restaurant: {
        type: Schema.ObjectId,
        ref: 'Restaurant',
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

module.exports = model("Review", ReviewSchema)