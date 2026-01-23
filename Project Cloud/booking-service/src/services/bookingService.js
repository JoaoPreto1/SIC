const Booking = require('../models/booking');
const { getServiceById } = require('./getService');

class BookingService {
    async createBooking(data, token) {
        const booking = await Booking.create(data);

        const service = await getServiceById(booking.serviceId, token);

        return {
            ...booking.toObject(),
            service // 👈 “populate manual”
        };
    }

    async getBookings(filter, token) {
        const bookings = await Booking.find(filter);

        return Promise.all(
            bookings.map(async (booking) => {
                const service = await getServiceById(booking.serviceId, token);
                return {
                    ...booking.toObject(),
                    service
                };
            })
        );
    }

    async getBookingsByClient(clientId) {
        return await this.getBookings({ clientId });
    }

    async getBookingById(id) {
        return await Booking.findById(id).populate("serviceId");
    }

    async updateBookingStatus(id, status) {
        return await Booking.findByIdAndUpdate(id, { status }, { new: true }).populate("serviceId");
    }

    async deleteBooking(id) {
        return await Booking.findByIdAndDelete(id);
    }
}

module.exports = new BookingService();
