const bookingService = require('../services/bookingService');

class BookingController {
    async createBooking(req, res) {
        try {
            const booking = await bookingService.createBooking(
                {
                    clientId: req.user.id,        // vem do token
                    serviceId: req.body.serviceId,
                    date: req.body.date
                },
                req.headers.authorization
            );

            res.status(201).json(booking);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getMyBookings(req, res) {
        try {
            const clientId = req.user.id;
            const bookings = await bookingService.getBookingsByClient(clientId);
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getBookingById(req, res) {
        try {
            const bookingId = req.params.id;
            const booking = await bookingService.getBookingById(bookingId);
            if (!booking) {
                return res.status(404).json({ error: 'Reserva não encontrada' });
            }
            res.json(booking);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async updateBookingStatus(req, res) {
        try {
            const bookingId = req.params.id;
            const { status } = req.body;
            const updatedBooking = await bookingService.updateBookingStatus(bookingId, status);
            if (!updatedBooking) {
                return res.status(404).json({ error: 'Reserva não encontrada' });
            }
            res.json(updatedBooking);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteBooking(req, res) {
        try {
            const bookingId = req.params.id;
            const deletedBooking = await bookingService.deleteBooking(bookingId);
            if (!deletedBooking) {
                return res.status(404).json({ error: 'Reserva não encontrada' });
            }
            res.json({ message: 'Reserva deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = new BookingController();
