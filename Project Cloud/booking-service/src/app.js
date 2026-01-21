const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const bookingRoutes = require('./routes/bookingRoutes');
const logger = require('./config/logger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connect
connectDB();

// Routes
app.get('/health', (req, res) => {
    logger.info('Health check requested');
    res.json({ status: 'UP', service: 'Booking Service' });
});
app.use('/bookings', bookingRoutes);

app.listen(PORT, () => {
    logger.info(`Booking Service running on port ${PORT}`);
});
