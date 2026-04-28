const { body, validationResult } = require('express-validator');

// Validation pour les produits
exports.validateProduct = [
    body('name')
        .trim()
        .notEmpty().withMessage('Le nom du produit est requis')
        .isLength({ min: 3 }).withMessage('Le nom doit contenir au moins 3 caractères'),
    
    body('description')
        .trim()
        .notEmpty().withMessage('La description est requise')
        .isLength({ min: 10 }).withMessage('La description doit contenir au moins 10 caractères'),
    
    body('price')
        .notEmpty().withMessage('Le prix est requis')
        .isFloat({ min: 0 }).withMessage('Le prix doit être un nombre positif'),
    
    body('category')
        .notEmpty().withMessage('La catégorie est requise')
        .isIn([
            'vehicules-electriques',
            'bornes-recharge',
            'photovoltaique',
            'ee',
            'ems',
            'bess',
            'agrivoltaisme',
            'retrofit',
            'isolation-thermique'
        ]).withMessage('Catégorie invalide'),
    
    body('stock')
        .optional()
        .isInt({ min: 0 }).withMessage('Le stock doit être un nombre positif'),
];

// Validation pour les commandes
exports.validateOrder = [
    body('customer.name')
        .trim()
        .notEmpty().withMessage('Le nom du client est requis'),
    
    body('customer.email')
        .trim()
        .notEmpty().withMessage('L\'email est requis')
        .isEmail().withMessage('Email invalide'),
    
    body('customer.phone')
        .trim()
        .notEmpty().withMessage('Le téléphone est requis')
        .matches(/^[\d\s\-\+\(\)]+$/).withMessage('Numéro de téléphone invalide'),
    
    body('customer.address')
        .trim()
        .notEmpty().withMessage('L\'adresse est requise'),
    
    body('customer.city')
        .trim()
        .notEmpty().withMessage('La ville est requise'),
    
    body('customer.postalCode')
        .trim()
        .notEmpty().withMessage('Le code postal est requis'),
    
    body('items')
        .isArray({ min: 1 }).withMessage('Au moins un article est requis'),
    
    body('totalAmount')
        .isFloat({ min: 0 }).withMessage('Le montant total doit être valide'),
    
    body('paymentMethod')
        .notEmpty().withMessage('La méthode de paiement est requise')
        .isIn(['credit-card', 'bank-transfer', 'check']).withMessage('Méthode de paiement invalide'),
];

// Validation pour les contacts
exports.validateContact = [
    body('name')
        .trim()
        .notEmpty().withMessage('Le nom est requis')
        .isLength({ min: 2 }).withMessage('Le nom doit contenir au moins 2 caractères'),
    
    body('email')
        .trim()
        .notEmpty().withMessage('L\'email est requis')
        .isEmail().withMessage('Email invalide'),
    
    body('phone')
        .trim()
        .notEmpty().withMessage('Le téléphone est requis')
        .matches(/^[\d\s\-\+\(\)]+$/).withMessage('Numéro de téléphone invalide'),
    
    body('subject')
        .trim()
        .notEmpty().withMessage('Le sujet est requis')
        .isLength({ min: 3 }).withMessage('Le sujet doit contenir au moins 3 caractères'),
    
    body('message')
        .trim()
        .notEmpty().withMessage('Le message est requis')
        .isLength({ min: 10 }).withMessage('Le message doit contenir au moins 10 caractères'),
    
    body('category')
        .optional()
        .isIn(['support', 'sales', 'partnership', 'other']).withMessage('Catégorie invalide'),
];

// Validation pour les devis
exports.validateQuote = [
    body('customer.name')
        .trim()
        .notEmpty().withMessage('Le nom est requis')
        .isLength({ min: 2 }).withMessage('Le nom doit contenir au moins 2 caractères'),
    
    body('customer.email')
        .trim()
        .notEmpty().withMessage('L\'email est requis')
        .isEmail().withMessage('Email invalide'),
    
    body('customer.phone')
        .trim()
        .notEmpty().withMessage('Le téléphone est requis')
        .matches(/^[\d\s\-\+\(\)]+$/).withMessage('Numéro de téléphone invalide'),
    
    body('subject')
        .trim()
        .notEmpty().withMessage('Le sujet est requis')
        .isLength({ min: 3 }).withMessage('Le sujet doit contenir au moins 3 caractères'),
    
    body('description')
        .trim()
        .notEmpty().withMessage('La description est requise')
        .isLength({ min: 10 }).withMessage('La description doit contenir au moins 10 caractères'),
    
    body('category')
        .notEmpty().withMessage('La catégorie est requise')
        .isIn([
            'vehicules-electriques',
            'bornes-recharge',
            'photovoltaique',
            'ee',
            'ems',
            'bess',
            'agrivoltaisme',
            'retrofit',
            'isolation-thermique'
        ]).withMessage('Catégorie invalide'),
    
    body('timeline')
        .optional()
        .isIn(['urgent', '1-2-semaines', '1-mois', 'flexible']).withMessage('Délai invalide'),
];

// Middleware pour gérer les erreurs de validation
exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Erreurs de validation',
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }
    
    next();
};
