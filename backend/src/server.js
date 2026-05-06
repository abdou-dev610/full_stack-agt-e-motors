require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

const healthRoutes = require('./routes/healthRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const devisRoutes = require('./routes/devisRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

const app = express();

connectDB();

const allowedOrigins = [
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:5501',
    'http://127.0.0.1:5501',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://agtemotors.com',
    'https://www.agtemotors.com',
    'http://agtemotors.com',
    'http://www.agtemotors.com',
    'https://api.agtemotors.com',
    'https://full-stack-agt-e-motors.vercel.app',
    /\.vercel\.app$/,
];

if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

const corsOptions = {
    origin: (origin, callback) => {
        // Autorise les requêtes sans origin (Postman, curl, server-to-server)
        if (!origin) return callback(null, true);
        const allowed = allowedOrigins.some(o =>
            o instanceof RegExp ? o.test(origin) : o === origin
        );
        if (allowed) {
            callback(null, true);
        } else {
            console.warn(`[CORS] Bloqué: ${origin}`);
            callback(new Error(`CORS: origine non autorisée: ${origin}`));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Content-Type'],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logger de requêtes
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} — origin: ${req.headers.origin || 'direct'}`);
    next();
});

// Routes API
app.use('/api/health', healthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/devis', devisRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Route racine
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'AGT E Motors API',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        routes: [
            'GET  /api/health',
            'POST /api/newsletter',
            'GET  /api/newsletter',
            'POST /api/devis',
            'POST /api/contacts',
            'POST /api/quotes',
            'GET  /api/products',
            'GET  /api/orders',
        ],
    });
});

// Handler 404 — route introuvable
app.use((req, res) => {
    console.warn(`[404] Route non trouvée: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        success: false,
        message: `Route non trouvée : ${req.method} ${req.originalUrl}`,
    });
});

// Handler d'erreur global
app.use((err, req, res, next) => {
    console.error(`[500] Erreur serveur sur ${req.method} ${req.originalUrl}:`, err.message);
    res.status(err.status || 500).json({
        success: false,
        message: 'Erreur interne du serveur',
        ...(process.env.NODE_ENV !== 'production' && { error: err.message }),
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════╗
║       AGT E Motors API Server Started        ║
╚══════════════════════════════════════════════╝
  Port      : ${PORT}
  Env       : ${process.env.NODE_ENV || 'development'}
  Frontend  : ${process.env.FRONTEND_URL || 'non configuré'}

  Routes actives:
  - GET  /api/health
  - POST /api/newsletter
  - POST /api/devis
  - POST /api/contacts
  - POST /api/quotes
    `);
});
