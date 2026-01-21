const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
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

// Database Sync and Server Start
const startServer = async () => {
    const maxRetries = 20;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            await sequelize.authenticate();
            logger.info('Database connection established successfully.');
            await sequelize.sync();
            logger.info('Database synced.');

            app.listen(PORT, () => logger.info(`Auth Service running on port ${PORT}`));
            return;
        } catch (err) {
            retries++;
            logger.error(`DB Connection Failed (Attempt ${retries}/${maxRetries}): ${err.message}`);
            await new Promise(res => setTimeout(res, 5000));
        }
    }
    logger.error('Could not connect to database after multiple attempts. Exiting.');
    process.exit(1);
};

startServer();
