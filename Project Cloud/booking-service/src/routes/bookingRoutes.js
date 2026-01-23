const express = require('express');
const bookingController = require('../controllers/bookingController');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); 

router.post('/', authMiddleware, bookingController.createBooking);
router.get('/my', authMiddleware, bookingController.getMyBookings);
router.get('/:id', authMiddleware, bookingController.getBookingById);
router.patch('/:id/status', authMiddleware, bookingController.updateBookingStatus);
router.delete('/:id', authMiddleware, bookingController.deleteBooking);

module.exports = router;
