const userProfileService = require('../services/userProfileService');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        getProfile: async (_, __, context) => {
            if (!context.user) throw new AuthenticationError("Não autenticado");
            return await userProfileService.getProfile(context.user.id);
        },

        getAllProfiles: async () => await userProfileService.getAllProfiles(),
    },

    Mutation: {
        createProfile: async (_, { name, bio }, context) => {
            if (!context.user) throw new AuthenticationError("Não autenticado");
            const userId = context.user.id;
            return await userProfileService.createProfile({ userId, name, bio });
        },

        updateProfile: async (_, { name, bio }, context) => {
            if (!context.user) throw new AuthenticationError("Não autenticado");
            return await userProfileService.updateProfile(context.user.id, { name, bio });
        },

        addSkills: async (_, { skills }, context) => {
            if (!context.user) throw new AuthenticationError("Não autenticado");
            return await userProfileService.addSkills(context.user.id, skills);
        }
    }
};

module.exports = resolvers;
