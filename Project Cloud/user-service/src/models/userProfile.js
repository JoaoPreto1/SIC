const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Link to Auth Service ID
    name: String,
    bio: String,
    skills: [String],
    rating: Number
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);
