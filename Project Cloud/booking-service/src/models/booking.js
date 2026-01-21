const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    clientId: { type: String, required: true },
    providerId: { type: String, required: true },
    serviceId: { type: String, required: true },
    date: { type: Date, required: true },
    status: {
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED'],
        default: 'PENDING'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
