# Guide de Déploiement — AGT E MOTORS

## Architecture

| Composant | Technologie | URL |
|-----------|-------------|-----|
| Frontend | HTML/CSS/JS statique | https://agtemotors.com (o2switch) |
| Backend | Node.js / Express | https://backend-agt-e-motors.onrender.com (Render) |
| Base de données | MongoDB | Atlas (configuré via MONGODB_URI) |

---

## Configuration automatique dev / prod

Le fichier `js/config.js` détecte automatiquement l'environnement :

```javascript
// En local (localhost) → pointe vers le backend local
// En production (agtemotors.com) → pointe vers Render
```

**Aucune modification manuelle** n'est nécessaire pour basculer entre dev et prod.

---

## Déploiement Frontend sur o2switch (cPanel)

1. Connectez-vous à votre cPanel o2switch
2. Ouvrez le **Gestionnaire de fichiers**
3. Naviguez vers `public_html/`
4. Uploadez tous les fichiers du frontend (HTML, CSS, JS, images) **sauf** le dossier `backend/`
5. Vérifiez que `js/config.js` est bien présent dans `public_html/js/`

> ⚠️ Ne pas uploader le dossier `backend/`, `node_modules/`, `.env`

---

## Déploiement Backend sur Render

1. Connectez-vous à [render.com](https://render.com)
2. Votre service `backend-agt-e-motors` se redéploie automatiquement à chaque push sur GitHub
3. Vérifiez les variables d'environnement dans **Settings → Environment**

### Variables d'environnement requises sur Render

| Variable | Description |
|----------|-------------|
| `PORT` | Port du serveur (Render le gère automatiquement) |
| `MONGODB_URI` | URI de connexion MongoDB Atlas |
| `EMAIL_USER` | Adresse Gmail utilisée pour envoyer les emails |
| `EMAIL_PASS` | Mot de passe d'application Gmail (16 caractères) |
| `EMAIL_FROM` | Adresse expéditeur (ex: noreply@agtemotors.com) |
| `ADMIN_EMAIL` | Email qui reçoit les notifications |
| `ADMIN_URL` | URL du backend en production |
| `NODE_ENV` | `production` |

---

## Fonctionnalités à tester après déploiement

- [ ] Formulaire devis (`form.html`) → email reçu à contact@agtemotors.com
- [ ] Inscription newsletter (toutes les pages) → email reçu
- [ ] Page contact (`contact.html`) → formulaire fonctionnel
- [ ] Ajout au panier (`cart.html`) → localStorage OK
- [ ] Affichage des produits (`shop.html`) → liste chargée

---

## Développement local

```bash
# 1. Lancer le backend
cd backend
npm install
npm run dev   # Démarre sur http://localhost:5000

# 2. Ouvrir le frontend
# Ouvrir index.html avec Live Server (VS Code) sur http://localhost:5500
```

Les formulaires appellent automatiquement `http://localhost:5000` en local.
