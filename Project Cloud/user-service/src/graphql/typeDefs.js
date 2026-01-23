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
      getProfile: UserProfile   # Sem argumentos, sempre retorna o perfil logado
      getAllProfiles: [UserProfile]
  }

  type Mutation {
      createProfile(name: String!, bio: String): UserProfile
      updateProfile(name: String, bio: String): UserProfile
      addSkills(skills: [String!]!): UserProfile
  }
`;

module.exports = typeDefs;
