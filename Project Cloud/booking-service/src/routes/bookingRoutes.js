const express = require('express');
const bookingController = require('../controllers/bookingController');
const router = express.Router();

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.get('/:id', bookingController.getBookingById);
router.patch('/:id/status', bookingController.updateBookingStatus);

module.exports = router;
