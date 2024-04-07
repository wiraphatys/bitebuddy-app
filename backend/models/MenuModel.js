const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MenuSchema = new Schema({
    name: {
        type: String,
        required: [true, "please fill a name."]
    },
    img: {
        type: String,
        required: [true, "please fill an image"]
    },
    description: {
        type: String,
        required: [true, "please fill a description."]
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

module.exports = model("Menu", MenuSchema)