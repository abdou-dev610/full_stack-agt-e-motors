const _isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const CONFIG = {
  // Backend Render — pour les routes générales (contacts, produits, commandes)
  BACKEND_URL: _isLocal ? 'http://localhost:5000' : 'https://api.agtemotors.com',
  API_URL:     _isLocal ? 'http://localhost:5000/api' : 'https://api.agtemotors.com/api',

  // Vercel Serverless Functions — pour les formulaires (newsletter et devis)
  // En production : URL relative → même domaine Vercel, pas de CORS, toujours disponible
  NEWSLETTER_URL: _isLocal ? 'http://localhost:5000/api/newsletter' : '/api/newsletter',
  DEVIS_URL:      _isLocal ? 'http://localhost:5000/api/devis'      : '/api/devis',
};
