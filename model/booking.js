const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var workshopBooking = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    card: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});
var booking = mongoose.model('Booking', workshopBooking);

module.exports = booking;