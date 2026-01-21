const Booking = require('../models/booking');

class BookingService {
    async createBooking(data) {
        const booking = new Booking(data);
        return await booking.save();
    }

    async getBookings(filters) {
        return await Booking.find(filters);
    }

    async getBookingById(id) {
        return await Booking.findById(id);
    }

    async updateBookingStatus(id, status) {
        return await Booking.findByIdAndUpdate(id, { status }, { new: true });
    }
}

module.exports = new BookingService();
