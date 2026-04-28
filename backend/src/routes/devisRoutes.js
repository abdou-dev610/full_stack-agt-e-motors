const express = require('express');
const router = express.Router();
const { soumettreDevis } = require('../controllers/devisController');

router.post('/', soumettreDevis);

module.exports = router;
