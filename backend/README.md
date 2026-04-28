# AGT E Motors - Backend API

Backend Node.js + Express pour le projet AGT E Motors

## 📋 Prérequis

- Node.js (v14.0.0 ou supérieur)
- npm ou yarn
- MongoDB (local ou cloud - MongoDB Atlas)

## 🚀 Installation

### 1. Cloner le repository

```bash
cd backend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Copier le fichier `.env.example` en `.env` et remplir les valeurs :

```bash
cp .env.example .env
```

Éditer le fichier `.env` :

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/agt-e-motors

# JWT (optionnel pour futures authentifications)
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@agtemotors.com

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:8080
```

### 4. Configuration MongoDB

#### Option A: MongoDB Local

```bash
# Assurez-vous que MongoDB est en cours d'exécution
# Sur Windows:
mongod

# Sur macOS/Linux:
brew services start mongodb-community
```

#### Option B: MongoDB Atlas (Cloud)

1. Allez sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créez un compte gratuit
3. Créez un cluster
4. Récupérez la chaîne de connexion
5. Remplacez `MONGODB_URI` dans `.env`

## 🏃 Lancement du serveur

### Mode développement (avec auto-reload)

```bash
npm run dev
```

### Mode production

```bash
npm start
```

Le serveur sera disponible sur `http://localhost:5000`

## 📚 Documentation des API

### 1. Produits

#### Récupérer tous les produits

```bash
GET /api/products
Query parameters:
- category: filter par catégorie
- page: numéro de page (défaut: 1)
- limit: nombre d'éléments par page (défaut: 10)
- search: recherche par nom
```

Exemple:
```bash
curl "http://localhost:5000/api/products?category=vehicules-electriques&page=1&limit=10"
```

#### Récupérer un produit

```bash
GET /api/products/:id
```

#### Créer un produit

```bash
POST /api/products
Content-Type: application/json

{
  "name": "Tesla Model 3",
  "description": "Véhicule électrique haute performance",
  "category": "vehicules-electriques",
  "price": 45000,
  "image": "images/cars/tesla-model-3.jpg",
  "stock": 10,
  "specifications": {
    "autonomie": "500km",
    "batterie": "75kWh"
  }
}
```

#### Mettre à jour un produit

```bash
PUT /api/products/:id
Content-Type: application/json

{
  "price": 42000,
  "stock": 8
}
```

#### Supprimer un produit

```bash
DELETE /api/products/:id
```

### 2. Commandes

#### Créer une commande

```bash
POST /api/orders
Content-Type: application/json

{
  "customer": {
    "name": "Jean Dupont",
    "email": "jean@example.com",
    "phone": "+33612345678",
    "address": "123 Rue de la Paix",
    "city": "Paris",
    "postalCode": "75001",
    "country": "France"
  },
  "items": [
    {
      "productId": "product_id_here",
      "name": "Tesla Model 3",
      "quantity": 1,
      "price": 45000,
      "total": 45000
    }
  ],
  "totalAmount": 45000,
  "paymentMethod": "credit-card",
  "notes": "Livraison rapide SVP"
}
```

#### Récupérer toutes les commandes

```bash
GET /api/orders
Query parameters:
- page: numéro de page
- limit: nombre de commandes par page
- status: filtre par statut (pending, confirmed, shipped, delivered, cancelled)
```

#### Récupérer les commandes d'un client

```bash
GET /api/orders/customer/:email
```

#### Récupérer une commande

```bash
GET /api/orders/:id
```

#### Mettre à jour le statut d'une commande

```bash
PUT /api/orders/:id
Content-Type: application/json

{
  "status": "shipped",
  "paymentStatus": "completed"
}
```

### 3. Contacts

#### Envoyer un message de contact

```bash
POST /api/contacts
Content-Type: application/json

{
  "name": "Marie Martin",
  "email": "marie@example.com",
  "phone": "+33612345678",
  "subject": "Demande de partenariat",
  "message": "Je suis intéressée par vos services...",
  "category": "partnership"
}
```

Categories disponibles: `support`, `sales`, `partnership`, `other`

#### Récupérer tous les messages

```bash
GET /api/contacts
Query parameters:
- page: numéro de page
- limit: nombre de messages par page
- status: filtre (new, read, replied, closed)
- category: filtre par catégorie
```

#### Récupérer un message

```bash
GET /api/contacts/:id
```

#### Répondre à un message

```bash
PUT /api/contacts/:id
Content-Type: application/json

{
  "reply": "Merci pour votre intérêt! Nous allons vous contacter très prochainement."
}
```

#### Supprimer un message

```bash
DELETE /api/contacts/:id
```

## 🔄 Intégration avec le Frontend

### Configuration CORS

Le backend accepte les requêtes depuis les origines configurées dans `.env` :

```javascript
// Frontend - exemple avec fetch
const API_URL = 'http://localhost:5000/api';

// Exemple: créer une commande
fetch(`${API_URL}/orders`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(orderData),
  credentials: 'include'
})
.then(res => res.json())
.then(data => console.log(data));
```

### Exemple avec Axios (optionnel)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Créer une commande
export const createOrder = (orderData) => {
  return api.post('/orders', orderData);
};

// Récupérer les produits
export const getProducts = (category) => {
  return api.get(`/products?category=${category}`);
};
```

## 📦 Structure du projet

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js       # Configuration MongoDB
│   │   └── email.js          # Configuration Nodemailer
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── contactController.js
│   ├── models/
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Contact.js
│   │   └── User.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── corsMiddleware.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── contactRoutes.js
│   │   └── healthRoutes.js
│   └── server.js             # Point d'entrée principal
├── .env.example              # Variables d'environnement (exemple)
├── .gitignore
├── package.json
└── package-lock.json
```

## 🔧 Configuration avancée

### Ajouter des validations personnalisées

```javascript
const { body, validationResult } = require('express-validator');

router.post('/contacts', [
  body('email').isEmail().withMessage('Email invalide'),
  body('phone').isMobilePhone().withMessage('Téléphone invalide'),
  body('message').isLength({ min: 10 }).withMessage('Message trop court'),
], contactController.createContact);
```

### Ajouter l'authentification JWT

```javascript
// À implémenter dans middleware/auth.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
```

## 📊 Monitoring et Logs

Le serveur enregistre automatiquement:
- Toutes les requêtes avec timestamp
- Les erreurs de base de données
- Les erreurs d'envoi d'email

Exemple de log:
```
[2025-04-25T10:30:15.123Z] POST /api/orders
[2025-04-25T10:30:15.500Z] ✓ MongoDB Connected: localhost
```

## 🐛 Dépannage

### MongoDB connection refused

```bash
# Vérifier que MongoDB est en cours d'exécution
mongo --version

# Redémarrer MongoDB
mongod
```

### Port déjà utilisé

```bash
# Changer le port dans .env
PORT=5001
```

### Email non envoyé

- Vérifier les identifiants Gmail dans .env
- Utiliser un mot de passe d'application (not user password)
- Activer "Less secure app access" si utilisant Gmail

## 🚀 Déploiement

### Sur Heroku

```bash
heroku create agt-e-motors-api
git push heroku main
```

### Sur Railway.app

Connecter le repository GitHub et configurer les variables d'environnement.

## 📝 Licence

ISC

## ✉️ Support

Pour des questions ou des problèmes, contacter l'équipe de développement.
