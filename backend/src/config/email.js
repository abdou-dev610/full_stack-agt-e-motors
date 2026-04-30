const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

transporter.verify((error) => {
    if (error) {
        console.error('Email service error:', error.message);
    } else {
        console.log('✓ Email service ready (smtp.gmail.com:587)');
    }
});

module.exports = transporter;
