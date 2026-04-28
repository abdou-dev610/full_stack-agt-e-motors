const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');
const { validateQuote, handleValidationErrors } = require('../middleware/validation');

// Quote routes
router.post('/', validateQuote, handleValidationErrors, quoteController.createQuote);
router.get('/', quoteController.getAllQuotes);
router.get('/:id', quoteController.getQuoteById);
router.put('/:id/send', quoteController.sendQuote);
router.put('/:id', quoteController.updateQuoteStatus);
router.get('/customer/:email', quoteController.getQuotesByEmail);
router.delete('/:id', quoteController.deleteQuote);

module.exports = router;
