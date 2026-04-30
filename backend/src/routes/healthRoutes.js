const express = require('express');
const router = express.Router();

// Health check route
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});

module.exports = router;
