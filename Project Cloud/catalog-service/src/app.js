const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Database Connection
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://user:pass@catalog-db:5432/catalogdb', {
    dialect: 'postgres',
    logging: false
});

// Service Model
const ServiceItem = sequelize.define('ServiceItem', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    category: DataTypes.STRING,
    provider_id: DataTypes.STRING
});

// Routes
app.get('/health', (req, res) => res.json({ status: 'UP', service: 'Catalog Service' }));

app.post('/services', async (req, res) => {
    try {
        const service = await ServiceItem.create(req.body);
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/services', async (req, res) => {
    try {
        const { skip = 0, limit = 10 } = req.query;
        const services = await ServiceItem.findAll({ offset: skip, limit: limit });
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/services/:id', async (req, res) => {
    try {
        const service = await ServiceItem.findByPk(req.params.id);
        if (!service) return res.status(404).json({ error: 'Service not found' });
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Sync DB and Start
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Catalog Service running on port ${PORT}`));
}).catch(err => console.error('DB Connection Error:', err));
