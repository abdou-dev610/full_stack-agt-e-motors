const Newsletter = require('../models/Newsletter');
const transporter = require('../config/email');

exports.subscribe = async (req, res) => {
    const { email } = req.body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ success: false, message: 'Adresse e-mail invalide.' });
    }

    try {
        const existing = await Newsletter.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.json({ success: true, message: 'Vous êtes déjà inscrit à notre newsletter.' });
        }

        await Newsletter.create({ email: email.toLowerCase() });

        transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.ADMIN_EMAIL || 'contact@agtemotors.com',
            subject: 'Nouvelle inscription à la newsletter',
            html: `
                <h2>Nouvelle inscription newsletter</h2>
                <p>Un visiteur vient de s'inscrire à la newsletter AGT E MOTORS.</p>
                <p><strong>Email :</strong> ${email}</p>
                <hr>
                <p><em>AGT E MOTORS – Notification automatique</em></p>
            `,
        }).catch(err => console.error('Email admin erreur:', err.message));

        transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Bienvenue dans la newsletter AGT E MOTORS',
            html: `
                <h2>Inscription confirmée !</h2>
                <p>Bonjour,</p>
                <p>Vous êtes maintenant inscrit(e) à la newsletter <strong>AGT E MOTORS</strong>.</p>
                <p>Vous recevrez nos dernières actualités, offres spéciales et nouveautés sur les véhicules électriques.</p>
                <hr>
                <p>Cordialement,<br><strong>L'équipe AGT E MOTORS</strong></p>
            `,
        }).catch(err => console.error('Email confirmation erreur:', err.message));

        res.status(201).json({ success: true, message: 'Inscription confirmée. Merci !' });

    } catch (error) {
        console.error('Newsletter subscribe error:', error.message);
        res.status(500).json({ success: false, message: 'Erreur serveur. Veuillez réessayer.' });
    }
};

exports.getAll = async (req, res) => {
    try {
        const subscribers = await Newsletter.find({ active: true }).sort({ createdAt: -1 });
        res.json({ success: true, count: subscribers.length, data: subscribers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
