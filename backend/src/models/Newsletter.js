const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email requis'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Email invalide'],
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Newsletter', newsletterSchema);
