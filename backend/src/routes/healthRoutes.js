const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    const dbState = mongoose.connection.readyState;
    const dbStatus = ['disconnected', 'connected', 'connecting', 'disconnecting'][dbState] || 'unknown';

    res.json({
        success: true,
        message: 'AGT E-MOTORS API is running',
        environment: process.env.NODE_ENV || 'development',
        database: dbStatus,
        timestamp: new Date().toISOString(),
    });
});

module.exports = router;
