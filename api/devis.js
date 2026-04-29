const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Méthode non autorisée' });

    const { nomComplet, email, telephone, adresse, serviceType, type, message } = req.body;

    if (!nomComplet || !email || !message) {
        return res.status(400).json({ success: false, message: 'Champs obligatoires manquants.' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'contact@agtemotors.com',
            subject: `Nouvelle demande : ${serviceType || 'Contact'} - AGT E MOTORS`,
            html: `
                <h2>Nouvelle demande de contact / devis</h2>
                <table style="border-collapse:collapse;width:100%">
                    <tr><td style="padding:8px;border:1px solid #ddd"><strong>Nom complet</strong></td><td style="padding:8px;border:1px solid #ddd">${nomComplet}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd"><strong>Téléphone</strong></td><td style="padding:8px;border:1px solid #ddd">${telephone || '-'}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd"><strong>Adresse</strong></td><td style="padding:8px;border:1px solid #ddd">${adresse || '-'}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd"><strong>Service / Produit</strong></td><td style="padding:8px;border:1px solid #ddd">${serviceType || '-'}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd"><strong>Type (précision)</strong></td><td style="padding:8px;border:1px solid #ddd">${type || '-'}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd"><strong>Message</strong></td><td style="padding:8px;border:1px solid #ddd">${message}</td></tr>
                </table>
                <hr>
                <p><em>AGT E MOTORS – Notification automatique</em></p>
            `,
        });

        return res.status(200).json({ success: true, message: 'Demande envoyée avec succès. Nous vous contacterons prochainement.' });
    } catch (err) {
        console.error('Devis error:', err.message);
        return res.status(500).json({ success: false, message: 'Erreur serveur. Veuillez réessayer.' });
    }
};
