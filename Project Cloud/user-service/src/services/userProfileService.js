const UserProfile = require('../models/userProfile');

class UserProfileService {
    async getProfile(userId) {
        return await UserProfile.findOne({ userId });
    }

    async getAllProfiles() {
        return await UserProfile.find();
    }

    async createProfile(data) {
        const { userId, name, bio } = data;
        const profile = new UserProfile({ userId, name, bio, skills: [], rating: 0 });
        return await profile.save();
    }

    async updateProfile(userId, data) {
        return await UserProfile.findOneAndUpdate({ userId }, data, { new: true });
    }
}

module.exports = new UserProfileService();
