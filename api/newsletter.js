const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
    }

    const { email } = req.body || {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ success: false, message: 'Adresse e-mail invalide.' });
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
            subject: 'Nouvelle inscription à la newsletter - AGT E MOTORS',
            html: `
                <h2>Nouvelle inscription newsletter</h2>
                <p>Un visiteur vient de s'inscrire à la newsletter AGT E MOTORS.</p>
                <p><strong>Email :</strong> ${email}</p>
                <hr>
                <p><em>AGT E MOTORS – Notification automatique</em></p>
            `,
        }).catch(err => console.error('[newsletter] Email erreur:', err.message));
    } else {
        console.warn('[newsletter] EMAIL_USER/EMAIL_PASS non configurés — email non envoyé, inscription: ' + email);
    }

    return res.status(200).json({
        success: true,
        message: 'Inscription confirmée. Merci !',
    });
};
