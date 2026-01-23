const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: String,
    bio: String,
    skills: [String],
    rating: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserProfile', UserProfileSchema);
