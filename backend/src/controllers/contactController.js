const Contact = require('../models/Contact');
const transporter = require('../config/email');

// Create contact message
exports.createContact = async (req, res) => {
    try {
        const { name, email, phone, subject, message, category } = req.body;

        const contact = new Contact({
            name,
            email,
            phone,
            subject,
            message,
            category,
        });

        await contact.save();

        // Send email notification
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: `Confirmation de votre message - ${subject}`,
                html: `
                    <h2>Merci de nous avoir contacté</h2>
                    <p>Bonjour ${name},</p>
                    <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
                    <hr>
                    <p><strong>Votre message:</strong></p>
                    <p>${message}</p>
                    <hr>
                    <p>Cordialement,<br>AGT E Motors</p>
                `,
            });
        } catch (emailError) {
            console.log('Email not sent:', emailError.message);
        }

        res.status(201).json({
            success: true,
            message: 'Message envoyé avec succès',
            data: contact,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
    try {
        const { page = 1, limit = 20, status, category } = req.query;

        let query = {};

        if (status) query.status = status;
        if (category) query.category = category;

        const contacts = await Contact.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Contact.countDocuments(query);

        res.json({
            success: true,
            data: contacts,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                currentPage: page,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get single contact
exports.getContactById = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await Contact.findByIdAndUpdate(
            id,
            { status: 'read' },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Message non trouvé',
            });
        }

        res.json({
            success: true,
            data: contact,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Reply to contact message
exports.replyContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { reply } = req.body;

        const contact = await Contact.findByIdAndUpdate(
            id,
            {
                reply,
                status: 'replied',
                repliedAt: new Date(),
            },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Message non trouvé',
            });
        }

        // Send reply email
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: contact.email,
                subject: `Réponse à votre message - ${contact.subject}`,
                html: `
                    <h2>Réponse à votre message</h2>
                    <p>Bonjour ${contact.name},</p>
                    <p>${reply}</p>
                    <hr>
                    <p>Cordialement,<br>AGT E Motors</p>
                `,
            });
        } catch (emailError) {
            console.log('Reply email not sent:', emailError.message);
        }

        res.json({
            success: true,
            message: 'Réponse envoyée',
            data: contact,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete contact
exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Message non trouvé',
            });
        }

        res.json({
            success: true,
            message: 'Message supprimé',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
