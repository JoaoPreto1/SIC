const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://user:pass@auth-db:5432/authdb', {
    dialect: 'postgres',
    logging: false
});

module.exports = sequelize;
