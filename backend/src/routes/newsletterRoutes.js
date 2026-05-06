const express = require('express');
const router = express.Router();
const { subscribe, getAll } = require('../controllers/newsletterController');

router.post('/', subscribe);
router.get('/', getAll);

module.exports = router;
