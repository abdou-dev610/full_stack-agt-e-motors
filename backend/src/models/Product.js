const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Veuillez fournir un nom de produit'],
            trim: true,
        },
        description: {
            type: String,
            required: true,
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
            required: true,
        },
        price: {
            type: Number,
            required: [true, 'Veuillez fournir un prix'],
        },
        image: {
            type: String,
            default: null,
        },
        stock: {
            type: Number,
            default: 0,
        },
        specifications: {
            type: Map,
            of: String,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        reviews: [
            {
                user: String,
                comment: String,
                rating: Number,
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
