const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mongoose Model
const UserProfileSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Link to Auth Service ID
    name: String,
    bio: String,
    skills: [String],
    rating: Number
});
const UserProfile = mongoose.model('UserProfile', UserProfileSchema);

// GraphQL Schema
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

// GraphQL Resolvers
const resolvers = {
    Query: {
        getProfile: async (_, { userId }) => await UserProfile.findOne({ userId }),
        getAllProfiles: async () => await UserProfile.find(),
    },
    Mutation: {
        createProfile: async (_, { userId, name, bio }) => {
            const profile = new UserProfile({ userId, name, bio, skills: [], rating: 0 });
            return await profile.save();
        },
        updateProfile: async (_, { userId, name, bio }) => {
            return await UserProfile.findOneAndUpdate({ userId }, { name, bio }, { new: true });
        }
    }
};

// Start Server
async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    await mongoose.connect(process.env.MONGO_URI || 'mongodb://user-db:27017/userdb');
    console.log('Connected to MongoDB');

    app.get('/health', (req, res) => res.json({ status: 'UP', service: 'User Service' }));

    app.listen(PORT, () => {
        console.log(`User Service running on port ${PORT}`);
        console.log(`GraphQL endpoint at http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();
