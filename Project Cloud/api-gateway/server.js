const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(morgan('dev'));
app.use(cors());

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'UP', service: 'API Gateway' });
});

// Proxy Routes
// Auth Service
app.use('/api/auth', createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL || 'http://auth-service:3000',
    changeOrigin: true,
    pathRewrite: {
        '^/api/auth': '',
    },
}));

// User Service
app.use('/api/users', createProxyMiddleware({
    target: process.env.USER_SERVICE_URL || 'http://user-service:3001',
    changeOrigin: true,
    pathRewrite: {
        '^/api/users': '',
    },
}));

// Catalog Service
app.use('/api/catalog', createProxyMiddleware({
    target: process.env.CATALOG_SERVICE_URL || 'http://catalog-service:8000',
    changeOrigin: true,
    pathRewrite: {
        '^/api/catalog': '',
    },
}));

// Booking Service
app.use('/api/bookings', createProxyMiddleware({
    target: process.env.BOOKING_SERVICE_URL || 'http://booking-service:3002',
    changeOrigin: true,
    pathRewrite: {
        '^/api/bookings': '',
    },
}));

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
