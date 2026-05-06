const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
    }

    const { nomComplet, email, telephone, adresse, serviceType, type, message } = req.body || {};

    console.log('[devis] body reçu:', { nomComplet, email, telephone, serviceType });

    if (!nomComplet || !email || !message) {
        return res.status(400).json({ success: false, message: 'Champs obligatoires manquants.' });
    }

    // Email admin — fire-and-forget, ne bloque pas la réponse
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL || 'contact@agtemotors.com',
            subject: `📋 Nouvelle demande de devis : ${serviceType || 'Contact'} - AGT E MOTORS`,
            html: `
                <h2 style="color:#2d6a4f;">Nouvelle Demande de Devis - AGT E MOTORS</h2>
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
                <p style="color:#888;font-size:12px;">Reçu le ${new Date().toLocaleString('fr-FR')}</p>
                <p><em>AGT E MOTORS – Notification automatique</em></p>
            `,
        }).catch(err => console.error('[devis] Email admin erreur:', err.message));

        // Email de confirmation client — fire-and-forget
        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: '✅ Votre demande de devis a bien été reçue - AGT E MOTORS',
            html: `
                <h2 style="color:#2d6a4f;">Demande de Devis Confirmée</h2>
                <p>Bonjour <strong>${nomComplet}</strong>,</p>
                <p>Nous avons bien reçu votre demande de devis.</p>
                <p>Notre équipe vous contactera très prochainement.</p>
                <br>
                <p>Cordialement,<br><strong>AGT E MOTORS</strong></p>
            `,
        }).catch(err => console.error('[devis] Email client erreur:', err.message));
    } else {
        console.warn('[devis] EMAIL_USER/EMAIL_PASS non configurés — devis reçu mais email non envoyé pour:', email);
    }

    return res.status(200).json({
        success: true,
        message: 'Votre demande de devis a été envoyée avec succès',
    });
};
