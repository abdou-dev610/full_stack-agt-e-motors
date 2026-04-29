const transporter = require('../config/email');

exports.subscribe = async (req, res) => {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ success: false, message: 'Adresse e-mail invalide.' });
    }

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: 'contact@agtemotors.com',
            subject: 'Nouvelle inscription à la newsletter',
            html: `
                <h2>Nouvelle inscription newsletter</h2>
                <p>Un visiteur vient de s'inscrire à la newsletter AGT E MOTORS.</p>
                <p><strong>Email :</strong> ${email}</p>
                <hr>
                <p><em>AGT E MOTORS – Notification automatique</em></p>
            `,
        });
    } catch (emailError) {
        console.error('Newsletter email error:', emailError.message);
    }

    res.json({ success: true, message: 'Inscription confirmée.' });
};
