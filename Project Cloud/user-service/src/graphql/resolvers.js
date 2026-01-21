const userProfileService = require('../services/userProfileService');

const resolvers = {
    Query: {
        getProfile: async (_, { userId }) => await userProfileService.getProfile(userId),
        getAllProfiles: async () => await userProfileService.getAllProfiles(),
    },
    Mutation: {
        createProfile: async (_, { userId, name, bio }) => {
            return await userProfileService.createProfile({ userId, name, bio });
        },
        updateProfile: async (_, { userId, name, bio }) => {
            return await userProfileService.updateProfile(userId, { name, bio });
        }
    }
};

module.exports = resolvers;
