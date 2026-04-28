const Quote = require('../models/Quote');
const transporter = require('../config/email');

const categoryMap = {
    borne: 'bornes-recharge',
    vehicule: 'vehicules-electriques',
    photovoltaique: 'photovoltaique',
    ee: 'ee',
    ems: 'ems',
    bess: 'bess',
    agrivoltaisme: 'agrivoltaisme',
    retrofit: 'retrofit',
    isolation: 'isolation-thermique',
};

exports.soumettreDevis = async (req, res) => {
    try {
        const { nomComplet, email, telephone, adresse, serviceType, type, message } = req.body;

        if (!nomComplet || !email || !telephone || !adresse || !serviceType || !type || !message) {
            return res.status(400).json({ success: false, message: 'Tous les champs sont obligatoires.' });
        }

        const category = categoryMap[serviceType] || 'bornes-recharge';

        const count = await Quote.countDocuments();
        const quoteNumber = `DEV-${Date.now()}-${count + 1}`;

        const quote = new Quote({
            quoteNumber,
            customer: { name: nomComplet, email, phone: telephone, address: adresse },
            subject: type,
            description: message,
            category,
        });

        await quote.save();

        // Email à l'admin
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.ADMIN_EMAIL,
            subject: `📋 Nouvelle demande de devis - ${quote.quoteNumber}`,
            html: `
                <h2 style="color:#2d6a4f;">Nouvelle Demande de Devis - AGT E MOTORS</h2>
                <hr>
                <h3>Informations Client</h3>
                <p><strong>Nom :</strong> ${nomComplet}</p>
                <p><strong>Email :</strong> ${email}</p>
                <p><strong>Téléphone :</strong> ${telephone}</p>
                <p><strong>Adresse :</strong> ${adresse}</p>
                <hr>
                <h3>Détails de la Demande</h3>
                <p><strong>N° Devis :</strong> ${quote.quoteNumber}</p>
                <p><strong>Service/Produit :</strong> ${serviceType}</p>
                <p><strong>Type :</strong> ${type}</p>
                <p><strong>Message :</strong></p>
                <p style="background:#f4f4f4;padding:10px;border-radius:5px;">${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p style="color:#888;font-size:12px;">Reçu le ${new Date().toLocaleString('fr-FR')}</p>
            `,
        });

        // Email de confirmation au client
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: `✅ Votre demande de devis a bien été reçue - AGT E MOTORS`,
                html: `
                    <h2 style="color:#2d6a4f;">Demande de Devis Confirmée</h2>
                    <p>Bonjour <strong>${nomComplet}</strong>,</p>
                    <p>Nous avons bien reçu votre demande de devis (N° <strong>${quote.quoteNumber}</strong>).</p>
                    <p>Notre équipe vous contactera très prochainement.</p>
                    <br>
                    <p>Cordialement,<br><strong>AGT E MOTORS</strong></p>
                `,
            });
        } catch (_) {}

        res.status(201).json({ success: true, message: 'Demande de devis envoyée avec succès !', quoteNumber: quote.quoteNumber });
    } catch (error) {
        console.error('Erreur devis:', error.message);
        res.status(500).json({ success: false, message: 'Erreur serveur. Veuillez réessayer.' });
    }
};
