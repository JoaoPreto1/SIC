const UserProfile = require('../models/userProfile');

class UserProfileService {
  async getProfile(userId) {
    return await UserProfile.findOne({ userId });
  }

  async getAllProfiles() {
    return await UserProfile.find();
  }

  async createProfile(data) {
    const exists = await UserProfile.findOne({ userId: data.userId });
    if (exists) {
      throw new Error("Profile already exists");
    }

    const profile = new UserProfile({
      ...data,
      skills: [],
      rating: 0
    });

    return await profile.save();
  }

  async updateProfile(userId, data) {
    return await UserProfile.findOneAndUpdate(
      { userId },
      data,
      { new: true }
    );
  }

  async addSkills(userId, skillsToAdd) {
    // Atualiza o array de skills sem duplicados
    const profile = await UserProfile.findOne({ userId });
    if (!profile) throw new Error("Perfil não encontrado");

    // Adiciona novas skills que ainda não existem
    const updatedSkills = Array.from(new Set([...profile.skills, ...skillsToAdd]));
    profile.skills = updatedSkills;

    return await profile.save();
  }
}

module.exports = new UserProfileService();
