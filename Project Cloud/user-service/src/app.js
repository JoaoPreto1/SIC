const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const connectDB = require('./config/database');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const logger = require('./config/logger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Database Connect
connectDB();

app.get('/health', (req, res) => {
  logger.info('Health check requested');
  res.json({ status: 'UP', service: 'User Service' });
});

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    logger.info(`User Service running on port ${PORT}`);
    logger.info(`GraphQL endpoint at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
