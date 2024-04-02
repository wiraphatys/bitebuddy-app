const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ReservationSchema = new Schema({
    datetime: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    restaurant: {
        type: Schema.ObjectId,
        ref: "Restaurant",
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

ReservationSchema.virtual('date').get(function () {
    return this.datetime.toDateString();
});

ReservationSchema.virtual('time').get(function () {
    return this.datetime.toLocaleTimeString();
});

module.exports = model("Reservation", ReservationSchema)