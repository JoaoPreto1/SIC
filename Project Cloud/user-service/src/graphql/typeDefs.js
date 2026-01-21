const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type UserProfile {
    id: ID!
    userId: String!
    name: String
    bio: String
    skills: [String]
    rating: Float
  }

  type Query {
    getProfile(userId: String!): UserProfile
    getAllProfiles: [UserProfile]
  }

  type Mutation {
    createProfile(userId: String!, name: String!, bio: String): UserProfile
    updateProfile(userId: String!, name: String, bio: String): UserProfile
  }
`;

module.exports = typeDefs;
