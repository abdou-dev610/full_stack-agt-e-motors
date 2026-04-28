const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Veuillez fournir votre nom'],
            trim: true,
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
        subject: {
            type: String,
            required: [true, 'Veuillez fournir un sujet'],
        },
        message: {
            type: String,
            required: [true, 'Veuillez fournir un message'],
        },
        category: {
            type: String,
            enum: ['support', 'sales', 'partnership', 'other'],
            default: 'other',
        },
        status: {
            type: String,
            enum: ['new', 'read', 'replied', 'closed'],
            default: 'new',
        },
        reply: String,
        repliedAt: Date,
    },
    { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
