# 🚀 Démarrage Rapide - AGT E Motors Backend

## ⚡ 5 Minutes pour avoir un serveur opérationnel

### Étape 1: Installer les dépendances
```bash
cd backend
npm install
```

### Étape 2: Configurer l'environnement
```bash
copy .env.example .env
```

**Éditer `.env`** (remplacer les valeurs):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agt-e-motors
CORS_ORIGIN=http://localhost:3000,http://localhost:8080
```

### Étape 3: Lancer MongoDB
**Windows:**
```bash
mongod
```

**macOS/Linux:**
```bash
brew services start mongodb-community
```

### Étape 4: Démarrer le serveur
```bash
npm run dev
```

Vous verrez:
```
╔══════════════════════════════════════════════╗
║       AGT E Motors API Server Started        ║
╚══════════════════════════════════════════════╝

Server running on: http://localhost:5000
```

### Étape 5: Charger les données de test
```bash
node seed.js
```

✅ **C'est prêt!** L'API est opérationnelle sur `http://localhost:5000`

---

## 🧪 Tester l'API

### Test 1: Vérifier l'état du serveur
```bash
curl http://localhost:5000/api/health
```

Réponse attendue:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-04-25T10:00:00.000Z"
}
```

### Test 2: Récupérer les produits
```bash
curl http://localhost:5000/api/products
```

### Test 3: Créer un message de contact
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "123456",
    "subject": "Test Message",
    "message": "This is a test message",
    "category": "support"
  }'
```

---

## 📁 Structure des dossiers

```
backend/
├── src/
│   ├── server.js           ← Point d'entrée
│   ├── models/             ← Schémas MongoDB
│   ├── controllers/        ← Logique métier
│   ├── routes/             ← Endpoints API
│   └── config/             ← Configuration
├── package.json
├── .env                    ← Variables d'environnement
├── seed.js                 ← Données de test
└── README.md
```

---

## 🔧 Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lancer avec hot-reload |
| `npm start` | Lancer en production |
| `node seed.js` | Charger les données de test |

---

## 📝 API Endpoints

### 🛍️ Produits
- `GET /api/products` - Tous les produits
- `POST /api/products` - Créer un produit
- `GET /api/products/:id` - Un produit
- `PUT /api/products/:id` - Modifier
- `DELETE /api/products/:id` - Supprimer

### 📦 Commandes
- `GET /api/orders` - Toutes les commandes
- `POST /api/orders` - Créer une commande
- `GET /api/orders/:id` - Une commande
- `PUT /api/orders/:id` - Mettre à jour

### 📧 Contacts
- `GET /api/contacts` - Tous les messages
- `POST /api/contacts` - Envoyer un message
- `GET /api/contacts/:id` - Un message
- `PUT /api/contacts/:id` - Répondre

---

## 🐛 Troubleshooting

### ❌ "Port 5000 already in use"
```bash
# Changer le port dans .env
PORT=5001
```

### ❌ "MongoDB connection refused"
```bash
# Assurez-vous que MongoDB est lancé
mongod
```

### ❌ "Cannot find module 'express'"
```bash
npm install
```

---

## 📖 Documentation complète

- Voir `README.md` pour la documentation complète
- Voir `API_EXAMPLES.md` pour des exemples de requêtes
- Voir `FRONTEND_INTEGRATION.md` pour intégrer le frontend

---

## 🌐 Connexion du Frontend

Mettez à jour votre `script.js`:

```javascript
const API_URL = 'http://localhost:5000/api';

// Exemple: récupérer les produits
fetch(`${API_URL}/products`)
  .then(res => res.json())
  .then(data => console.log(data.data));
```

---

## ✨ Prochaines étapes

1. ✅ Backend opérationnel
2. 🔄 Connecter le frontend
3. 🔐 Ajouter l'authentification
4. 💾 Configurer une base de données production
5. 🚀 Déployer

---

## 💡 Tips

- **Développement**: Utilisez `npm run dev` pour le hot-reload
- **MongoDB Local**: Utilisez MongoDB Compass pour visualiser les données
- **POSTMAN**: Importez les exemples d'API pour tester facilement
- **Logs**: Regardez la console pour voir les requêtes en temps réel

---

## 🆘 Besoin d'aide?

1. Vérifiez que MongoDB est en cours d'exécution
2. Vérifiez que le port 5000 n'est pas utilisé
3. Vérifiez les logs du serveur
4. Consultez la documentation complète dans README.md

---

**Bon développement! 🚀**
