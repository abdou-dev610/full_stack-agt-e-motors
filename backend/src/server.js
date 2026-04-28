require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const healthRoutes = require('./routes/healthRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const devisRoutes = require('./routes/devisRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/devis', devisRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'AGT E Motors API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            products: '/api/products',
            orders: '/api/orders',
            contacts: '/api/contacts',
            quotes: '/api/quotes',
        },
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
    ╔══════════════════════════════════════════════╗
    ║       AGT E Motors API Server Started        ║
    ╚══════════════════════════════════════════════╝
    
    Server running on: http://localhost:${PORT}
    Environment: ${process.env.NODE_ENV || 'development'}
    Database: ${process.env.MONGODB_URI || 'Not configured'}
    
    Available endpoints:
    - GET  /
    - GET  /api/health
    - GET  /api/products
    - POST /api/products
    - GET  /api/orders
    - POST /api/orders
    - GET  /api/contacts
    - POST /api/contacts
    - GET  /api/quotes
    - POST /api/quotes
    `);
});
