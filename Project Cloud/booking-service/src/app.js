const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Mongoose Model
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
const Booking = mongoose.model('Booking', BookingSchema);

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://booking-db:27017/bookingdb')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('DB Connection Error:', err));

// Routes
app.get('/health', (req, res) => res.json({ status: 'UP', service: 'Booking Service' }));

app.post('/bookings', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/bookings', async (req, res) => {
    try {
        const { clientId, providerId } = req.query;
        const filter = {};
        if (clientId) filter.clientId = clientId;
        if (providerId) filter.providerId = providerId;

        const bookings = await Booking.find(filter);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/bookings/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        res.json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Booking Service running on port ${PORT}`);
});
