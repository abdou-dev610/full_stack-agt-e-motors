const Quote = require('../models/Quote');
const transporter = require('../config/email');

// Create quote request
exports.createQuote = async (req, res) => {
    try {
        const {
            customer,
            subject,
            description,
            category,
            quantity,
            estimatedBudget,
            timeline,
            notes,
        } = req.body;

        const quote = new Quote({
            customer,
            subject,
            description,
            category,
            quantity,
            estimatedBudget,
            timeline,
            notes,
        });

        await quote.save();

        // Send confirmation email to client
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: customer.email,
                subject: `Confirmation de votre demande de devis - ${subject}`,
                html: `
                    <h2>Demande de devis reçue</h2>
                    <p>Bonjour ${customer.name},</p>
                    <p>Merci d'avoir soumis une demande de devis. Nous avons bien reçu votre demande et nos équipes vont l'examiner attentivement.</p>
                    <hr>
                    <p><strong>Numéro de devis:</strong> ${quote.quoteNumber}</p>
                    <p><strong>Sujet:</strong> ${subject}</p>
                    <p><strong>Catégorie:</strong> ${category}</p>
                    <p><strong>Délai souhaité:</strong> ${timeline}</p>
                    ${estimatedBudget ? `<p><strong>Budget estimé:</strong> ${estimatedBudget}€</p>` : ''}
                    <hr>
                    <p>Nous vous recontacterons très prochainement avec un devis détaillé.</p>
                    <p>Cordialement,<br>AGT E Motors</p>
                `,
            });
        } catch (emailError) {
            console.log('Confirmation email not sent to client:', emailError.message);
        }

        // Send notification email to admin with all details
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: process.env.ADMIN_EMAIL,
                subject: `📋 Nouvelle demande de devis - ${quote.quoteNumber}`,
                html: `
                    <h2>Nouvelle Demande de Devis</h2>
                    <hr>
                    <h3>📞 Informations Client</h3>
                    <p><strong>Nom:</strong> ${customer.name}</p>
                    <p><strong>Email:</strong> ${customer.email}</p>
                    <p><strong>Téléphone:</strong> ${customer.phone}</p>
                    ${customer.company ? `<p><strong>Entreprise:</strong> ${customer.company}</p>` : ''}
                    ${customer.address ? `<p><strong>Adresse:</strong> ${customer.address}, ${customer.city} ${customer.postalCode}</p>` : ''}
                    <hr>
                    <h3>📝 Détails de la Demande</h3>
                    <p><strong>Numéro de devis:</strong> ${quote.quoteNumber}</p>
                    <p><strong>Sujet:</strong> ${subject}</p>
                    <p><strong>Catégorie:</strong> ${category}</p>
                    <p><strong>Description:</strong></p>
                    <p>${description.replace(/\n/g, '<br>')}</p>
                    <p><strong>Quantité:</strong> ${quantity}</p>
                    <p><strong>Budget estimé:</strong> ${estimatedBudget ? estimatedBudget + '€' : 'Non spécifié'}</p>
                    <p><strong>Délai souhaité:</strong> ${timeline}</p>
                    ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
                    <hr>
                    <p><strong>Date/Heure:</strong> ${new Date().toLocaleString('fr-FR')}</p>
                    <hr>
                    <p>
                        <a href="${process.env.ADMIN_URL || 'http://localhost:5000'}/admin/quotes/${quote._id}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                            Voir le devis
                        </a>
                    </p>
                `,
            });
        } catch (emailError) {
            console.log('Notification email not sent to admin:', emailError.message);
        }

        res.status(201).json({
            success: true,
            message: 'Demande de devis envoyée avec succès',
            data: quote,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all quotes
exports.getAllQuotes = async (req, res) => {
    try {
        const { page = 1, limit = 20, status, category } = req.query;

        let query = {};

        if (status) query.status = status;
        if (category) query.category = category;

        const quotes = await Quote.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Quote.countDocuments(query);

        res.json({
            success: true,
            data: quotes,
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

// Get single quote
exports.getQuoteById = async (req, res) => {
    try {
        const { id } = req.params;

        const quote = await Quote.findById(id);

        if (!quote) {
            return res.status(404).json({
                success: false,
                message: 'Devis non trouvé',
            });
        }

        res.json({
            success: true,
            data: quote,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Send quote to customer
exports.sendQuote = async (req, res) => {
    try {
        const { id } = req.params;
        const { quoteAmount, validUntil, message } = req.body;

        const quote = await Quote.findByIdAndUpdate(
            id,
            {
                quoteAmount,
                validUntil,
                status: 'sent',
                sentAt: new Date(),
            },
            { new: true }
        );

        if (!quote) {
            return res.status(404).json({
                success: false,
                message: 'Devis non trouvé',
            });
        }

        // Send quote email to customer
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: quote.customer.email,
                subject: `Votre devis - ${quote.quoteNumber}`,
                html: `
                    <h2>Votre Devis</h2>
                    <p>Bonjour ${quote.customer.name},</p>
                    <p>Veuillez trouver ci-dessous le devis pour votre demande:</p>
                    <hr>
                    <p><strong>Numéro de devis:</strong> ${quote.quoteNumber}</p>
                    <p><strong>Sujet:</strong> ${quote.subject}</p>
                    <p><strong>Montant:</strong> <strong style="color: #2196F3; font-size: 1.2em;">${quoteAmount}€</strong></p>
                    <p><strong>Valide jusqu'au:</strong> ${new Date(validUntil).toLocaleDateString('fr-FR')}</p>
                    <hr>
                    <p><strong>Détails:</strong></p>
                    <p>${quote.description.replace(/\n/g, '<br>')}</p>
                    <hr>
                    ${message ? `<p>${message.replace(/\n/g, '<br>')}</p><hr>` : ''}
                    <p>Pour accepter ce devis ou si vous avez des questions, n'hésitez pas à nous contacter.</p>
                    <p>Cordialement,<br>AGT E Motors</p>
                `,
            });
        } catch (emailError) {
            console.log('Quote email not sent:', emailError.message);
        }

        res.json({
            success: true,
            message: 'Devis envoyé au client',
            data: quote,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Update quote status
exports.updateQuoteStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const quote = await Quote.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!quote) {
            return res.status(404).json({
                success: false,
                message: 'Devis non trouvé',
            });
        }

        res.json({
            success: true,
            message: 'Statut du devis mis à jour',
            data: quote,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get quotes by customer email
exports.getQuotesByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        const quotes = await Quote.find({ 'customer.email': email }).sort({
            createdAt: -1,
        });

        res.json({
            success: true,
            data: quotes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete quote
exports.deleteQuote = async (req, res) => {
    try {
        const { id } = req.params;

        const quote = await Quote.findByIdAndDelete(id);

        if (!quote) {
            return res.status(404).json({
                success: false,
                message: 'Devis non trouvé',
            });
        }

        res.json({
            success: true,
            message: 'Devis supprimé',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
