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
        if (!origin) return callback(null, true);
        const allowed = allowedOrigins.some(o =>
            o instanceof RegExp ? o.test(origin) : o === origin
        );
        if (allowed) {
            callback(null, true);
        } else {
            console.warn(`CORS blocked: ${origin}`);
            callback(new Error(`CORS policy: origin ${origin} not allowed`));
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

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} — origin: ${req.headers.origin || 'direct'}`);
    next();
});

app.use('/api/health', healthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/devis', devisRoutes);
app.use('/api/newsletter', newsletterRoutes);

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'AGT E Motors API',
        version: '1.0.0',
        endpoints: [
            'GET  /api/health',
            'GET  /api/products',
            'POST /api/products',
            'GET  /api/orders',
            'POST /api/orders',
            'GET  /api/contacts',
            'POST /api/contacts',
            'GET  /api/quotes',
            'POST /api/quotes',
            'POST /api/newsletter',
        ],
    });
});

app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    const frontendUrl = process.env.FRONTEND_URL || 'non configuré';
    console.log(`
    ╔══════════════════════════════════════════════╗
    ║       AGT E Motors API Server Started        ║
    ╚══════════════════════════════════════════════╝

    Server    : http://localhost:${PORT}
    Env       : ${process.env.NODE_ENV || 'development'}
    Frontend  : ${frontendUrl}
    CORS dev  : http://127.0.0.1:5501, http://localhost:5501

    Routes actives:
    - GET  /api/health
    - POST /api/newsletter
    - POST /api/contacts
    - POST /api/quotes
    `);
});
