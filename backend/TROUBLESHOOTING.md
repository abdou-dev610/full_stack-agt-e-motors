# 🔧 TROUBLESHOOTING - Formulaire de Devis non Fonctionnel

## ❌ Problème: "Form not found" ou redirection Formspree

Quand le client clique sur "Envoyer la Demande", il devrait voir un message de succès, pas "Form not found".

---

## ✅ CHECKLIST DE CONFIGURATION

### ÉTAPE 1: Vérifier le Backend

#### 1.1 Le backend doit être LANCÉ

Ouvrez un terminal et exécutez:
```bash
cd backend
npm run dev
```

Vous devez voir:
```
╔══════════════════════════════════════════════╗
║       AGT E Motors API Server Started        ║
╚══════════════════════════════════════════════╝

Server running on: http://localhost:5000
```

**Si vous voyez une erreur:**
- Vérifiez que vous êtes dans le dossier `backend`
- Vérifiez que `node_modules` existe (sinon: `npm install`)
- Vérifiez que MongoDB est en cours d'exécution

#### 1.2 MongoDB doit être en cours d'exécution

Ouvrez un autre terminal et exécutez:
```bash
mongod
```

Vous devez voir:
```
[initandlisten] Waiting for connections on port 27017
```

---

### ÉTAPE 2: Vérifier le fichier `.env`

Allez dans le dossier `backend` et ouvrez le fichier `.env`

Il doit contenir au minimum:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/agt-e-motors
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app
EMAIL_FROM=noreply@agtemotors.com
ADMIN_EMAIL=ndiayeabdoumamesaye1234@gmail.com
CORS_ORIGIN=http://localhost:3000,http://localhost:8080,file://
```

**Points importants:**
- ✅ `ADMIN_EMAIL` = ndiayeabdoumamesaye1234@gmail.com
- ✅ `PORT` = 5000
- ✅ `EMAIL_USER` et `EMAIL_PASS` = vos identifiants Gmail

---

### ÉTAPE 3: Tester l'API

Ouvrez un terminal (commande Windows) et testez:

```bash
# Test 1: Vérifier que le serveur répond
curl http://localhost:5000/api/health

# Réponse attendue:
# {"success":true,"message":"Server is running",...}
```

Si ça ne marche pas:
- ❌ Le backend n'est pas lancé
- ❌ Vous n'êtes pas sur le port 5000
- ❌ Il y a une erreur de configuration

---

### ÉTAPE 4: Tester le Formulaire

1. Ouvrez le fichier `devis.html`
2. Appuyez sur **F12** (Outils de développement)
3. Allez dans l'onglet **Console**
4. Remplissez le formulaire et envoyez
5. Regardez la console pour les messages

**Messages attendus dans la console:**
```
✅ Formulaire de devis chargé
🔗 API URL: http://localhost:5000/api
🔗 Connexion à: http://localhost:5000/api/quotes
📤 Envoi des données: {...}
✓ Réponse reçue. Status: 201
📨 Données reçues: {"success":true,...}
```

---

## 🐛 Erreurs Courantes

### ❌ Erreur: "Erreur de connexion au serveur"

**Cause:** Le backend n'est pas lancé

**Solution:**
```bash
cd backend
npm run dev
```

---

### ❌ Erreur: "CORS Error"

**Cause:** CORS mal configuré

**Solution:** Vérifiez dans `backend/.env`:
```env
CORS_ORIGIN=http://localhost:3000,http://localhost:8080,file://
```

Puis redémarrez le serveur

---

### ❌ Erreur: "MongoDB connection refused"

**Cause:** MongoDB n'est pas en cours d'exécution

**Solution:** Lancez MongoDB dans un autre terminal:
```bash
mongod
```

---

### ❌ Les emails ne sont pas envoyés

**Cause:** Identifiants Gmail incorrects

**Solution:**
1. Vérifiez `EMAIL_USER` et `EMAIL_PASS` dans `.env`
2. Utilisez un **mot de passe d'application Gmail**, pas votre mot de passe
3. Activez "Accès aux appareils moins sécurisés" (Gmail)

Pour créer un mot de passe d'application:
1. Allez sur: https://myaccount.google.com/apppasswords
2. Créez un nouveau mot de passe
3. Copiez-le dans `.env` comme `EMAIL_PASS`

---

## 📝 Guide Complet de Démarrage

### Jour 1: Installation

```bash
# 1. Aller dans le dossier backend
cd backend

# 2. Installer les dépendances
npm install

# 3. Créer le fichier .env
copy .env.example .env

# 4. Éditer .env avec vos valeurs
# Ouvrir le fichier .env dans un éditeur et remplir les valeurs
```

### Jour 2: Configuration

**Fichier: `backend/.env`**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agt-e-motors
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app
ADMIN_EMAIL=ndiayeabdoumamesaye1234@gmail.com
```

### Jour 3: Lancement

**Terminal 1: MongoDB**
```bash
mongod
```

**Terminal 2: Backend**
```bash
cd backend
npm run dev
```

**Terminal 3: Tester le formulaire**
```bash
# Ouvrir le fichier devis.html dans le navigateur
# file:///C:/Users/UNCHK/Documents/AGT E MOTORS/devis.html
```

---

## 🧪 Test Pas à Pas

### 1. Vérifier MongoDB
```bash
# Vérifier que MongoDB est en cours d'exécution
# Vous devez voir: "Waiting for connections on port 27017"
```

### 2. Vérifier le Backend
```bash
# Terminal 1
mongod

# Terminal 2
cd backend
npm run dev

# Vous devez voir le serveur démarrer
```

### 3. Tester l'API
```bash
# Terminal 3
curl http://localhost:5000/api/health

# Réponse:
{"success":true,"message":"Server is running"}
```

### 4. Tester le Formulaire
1. Ouvrez `devis.html` dans le navigateur
2. Ouvrez la console (F12)
3. Remplissez et envoyez
4. Attendez la réponse

---

## ✅ Confirmations

Quand tout fonctionne:

✅ **Console du navigateur:**
```
✅ Formulaire de devis chargé
✓ Réponse reçue. Status: 201
✅ Demande envoyée avec succès!
```

✅ **Email du client:** Reçoit une confirmation

✅ **Email admin:** (ndiayeabdoumamesaye1234@gmail.com) Reçoit l'alerte avec tous les détails

---

## 📞 Points d'Appel

Si ça ne marche toujours pas:

1. **Vérifiez les logs du backend** - Ouvrez le terminal où le backend tourne
2. **Ouvrez la console du navigateur** - F12 → Console
3. **Vérifiez le fichier `.env`** - Tous les paramètres sont-ils corrects?
4. **Redémarrez MongoDB** - `mongod`
5. **Redémarrez le Backend** - `npm run dev`

---

## 🚀 Résumé

| Étape | Commande | Vérification |
|-------|----------|--------------|
| 1 | `mongod` | Port 27017 réceptif |
| 2 | `cd backend && npm run dev` | Port 5000 actif |
| 3 | `curl http://localhost:5000/api/health` | Répond avec succès |
| 4 | Ouvrir `devis.html` | Formulaire affiche un message de succès |
| 5 | Envoyer le formulaire | Email reçu à ndiayeabdoumamesaye1234@gmail.com |

---

## ❓ Questions?

- Vérifiez que le serveur Express EST EN COURS D'EXÉCUTION
- Vérifiez que MongoDB EST EN COURS D'EXÉCUTION
- Vérifiez que le `.env` est CORRECTEMENT CONFIGURÉ
- Vérifiez la CONSOLE du navigateur pour les erreurs
