const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        phone: String,
        address: String,
        city: String,
        postalCode: String,
        country: String,
        orderHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order',
            },
        ],
        preferences: {
            newsletter: {
                type: Boolean,
                default: false,
            },
            notifications: {
                type: Boolean,
                default: true,
            },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
