const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://user-db:27017/userdb');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('DB Connection Error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
