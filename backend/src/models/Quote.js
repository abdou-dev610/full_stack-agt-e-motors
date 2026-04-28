const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
    {
        quoteNumber: {
            type: String,
            unique: true,
            required: true,
        },
        customer: {
            name: {
                type: String,
                required: [true, 'Veuillez fournir votre nom'],
            },
            email: {
                type: String,
                required: [true, 'Veuillez fournir votre email'],
                match: [
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    'Veuillez fournir un email valide',
                ],
            },
            phone: {
                type: String,
                required: [true, 'Veuillez fournir votre numéro de téléphone'],
            },
            company: String,
            address: String,
            city: String,
            postalCode: String,
            country: String,
        },
        subject: {
            type: String,
            required: [true, 'Veuillez spécifier le sujet du devis'],
        },
        description: {
            type: String,
            required: [true, 'Veuillez fournir une description détaillée'],
        },
        category: {
            type: String,
            enum: [
                'vehicules-electriques',
                'bornes-recharge',
                'photovoltaique',
                'ee',
                'ems',
                'bess',
                'agrivoltaisme',
                'retrofit',
                'isolation-thermique',
            ],
            required: [true, 'Veuillez sélectionner une catégorie'],
        },
        quantity: {
            type: Number,
            default: 1,
        },
        estimatedBudget: Number,
        timeline: {
            type: String,
            enum: ['urgent', '1-2-semaines', '1-mois', 'flexible'],
            default: 'flexible',
        },
        notes: String,
        status: {
            type: String,
            enum: ['received', 'in-progress', 'sent', 'closed'],
            default: 'received',
        },
        quoteFile: String,
        quoteAmount: Number,
        validUntil: Date,
        sentAt: Date,
    },
    { timestamps: true }
);

// Generate quote number before saving
quoteSchema.pre('save', async function (next) {
    if (!this.quoteNumber) {
        const count = await this.constructor.countDocuments();
        this.quoteNumber = `DEV-${Date.now()}-${count + 1}`;
    }
    next();
});

module.exports = mongoose.model('Quote', quoteSchema);
