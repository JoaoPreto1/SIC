const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const logger = require('./config/logger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  logger.info('Health check requested');
  res.json({ status: 'UP', service: 'Auth Service' });
});

app.use('/', authRoutes);

// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () =>
    logger.info(`Auth Service running on port ${PORT}`)
  );
};

startServer();
