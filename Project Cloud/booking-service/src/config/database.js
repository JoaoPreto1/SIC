const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://booking-db:27017/bookingdb');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('DB Connection Error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
