const bookingService = require('../services/bookingService');

class BookingController {
    async createBooking(req, res) {
        try {
            const booking = await bookingService.createBooking(req.body);
            res.status(201).json(booking);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getBookings(req, res) {
        try {
            const { clientId, providerId } = req.query;
            const filter = {};
            if (clientId) filter.clientId = clientId;
            if (providerId) filter.providerId = providerId;

            const bookings = await bookingService.getBookings(filter);
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getBookingById(req, res) {
        try {
            const booking = await bookingService.getBookingById(req.params.id);
            if (!booking) return res.status(404).json({ error: 'Booking not found' });
            res.json(booking);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateBookingStatus(req, res) {
        try {
            const { status } = req.body;
            const booking = await bookingService.updateBookingStatus(req.params.id, status);
            if (!booking) return res.status(404).json({ error: 'Booking not found' });
            res.json(booking);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new BookingController();
