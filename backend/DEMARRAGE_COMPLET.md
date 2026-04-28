# 🚀 GUIDE COMPLET - DÉMARRER LE SYSTÈME DE DEVIS

## 📋 Avant de Commencer

Assurez-vous d'avoir:
- ✅ Node.js installé (`node --version`)
- ✅ npm installé (`npm --version`)
- ✅ MongoDB installé (XAMPP ou MongoDB Community)

---

## 🎯 ÉTAPES DE DÉMARRAGE RAPIDE

### ÉTAPE 1: Configurer MongoDB

**Windows avec MongoDB Community:**
```bash
# Le service MongoDB devrait démarrer automatiquement
# Vérifiez dans Services que "MongoDB" est en cours d'exécution
```

**Windows avec XAMPP:**
```bash
# Lancez XAMPP et cliquez sur "Start" pour MySQL/Apache
```

### ÉTAPE 2: Configurer le Backend

Ouvrez un terminal PowerShell et exécutez:

```bash
# 1. Aller dans le dossier backend
cd "C:\Users\UNCHK\Documents\AGT E MOTORS\backend"

# 2. Créer le fichier .env s'il n'existe pas
copy .env.example .env

# 3. Éditer le fichier .env
# Ouvrez le fichier .env avec Notepad ou VSCode et configurez:
```

**Configuration Minimale dans `.env`:**
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

### ÉTAPE 3: Lancer le Serveur

**Terminal 1: MongoDB**
```bash
mongod
```

Attendez de voir:
```
[initandlisten] Waiting for connections on port 27017
```

**Terminal 2: Backend Express**
```bash
cd "C:\Users\UNCHK\Documents\AGT E MOTORS\backend"
npm run dev
```

Attendez de voir:
```
╔══════════════════════════════════════════════╗
║       AGT E Motors API Server Started        ║
╚══════════════════════════════════════════════╝

Server running on: http://localhost:5000
```

### ÉTAPE 4: Tester le Système

Ouvrez un **Terminal 3** (PowerShell) et exécutez:

```bash
cd "C:\Users\UNCHK\Documents\AGT E MOTORS\backend"
.\test-api.ps1
```

Vous devez voir:
```
✅ CURL est disponible
✅ Le serveur Express répond sur http://localhost:5000
✅ Demande de devis créée avec succès
✅ API /quotes fonctionne
✅ Tous les tests ont réussi!
```

### ÉTAPE 5: Tester le Formulaire

1. Ouvrez le fichier: `C:\Users\UNCHK\Documents\AGT E MOTORS\devis.html`
2. Remplissez le formulaire avec des informations de test
3. Cliquez sur "✓ Envoyer la Demande"
4. Vous devez voir: "✅ Demande envoyée avec succès!"

---

## 📧 Vérifier les Emails

### Email du Client

Le formulaire doit envoyer un email de confirmation à:
- **Adresse:** L'email rentré dans le formulaire
- **Sujet:** "Confirmation de votre demande de devis"
- **Contenu:** Numéro de devis + confirmation de réception

### Email de l'Admin

Un email doit être reçu à:
- **Adresse:** ndiayeabdoumamesaye1234@gmail.com
- **Sujet:** "📋 Nouvelle demande de devis - DEV-xxx"
- **Contenu:** Tous les détails du devis + informations du client

---

## 🔍 Vérifier les Erreurs

### Ouvrir la Console du Navigateur

1. Ouvrez le formulaire `devis.html`
2. Appuyez sur **F12**
3. Allez dans l'onglet **Console**
4. Remplissez et envoyez le formulaire

**Regardez pour les messages:**
```
✅ Formulaire de devis chargé
🔗 API URL: http://localhost:5000/api
📤 Envoi des données: {...}
✓ Réponse reçue. Status: 201
📨 Données reçues: {"success":true,...}
```

### Messages d'Erreur Courants

#### "Erreur de connexion au serveur"
- ❌ Le backend n'est pas lancé
- ✅ Solution: Lancez `npm run dev` dans le terminal

#### "CORS Error"
- ❌ CORS n'est pas bien configuré
- ✅ Solution: Vérifiez que `CORS_ORIGIN` inclut `file://`

#### "MongoDB connection refused"
- ❌ MongoDB n'est pas en cours d'exécution
- ✅ Solution: Lancez `mongod` dans un terminal

---

## 📁 Structure des Fichiers

```
AGT E MOTORS/
├── backend/
│   ├── .env                    ← Configuration (à créer/modifier)
│   ├── src/
│   │   ├── server.js           ← Point d'entrée
│   │   ├── models/
│   │   │   └── Quote.js        ← Modèle devis
│   │   ├── controllers/
│   │   │   └── quoteController.js
│   │   └── routes/
│   │       └── quoteRoutes.js
│   ├── package.json
│   ├── test-api.ps1            ← Script de test
│   ├── TROUBLESHOOTING.md      ← Guide de dépannage
│   └── README.md
│
├── devis.html                  ← Formulaire à ouvrir dans le navigateur
└── [autres fichiers]
```

---

## 💾 Configuration Détaillée du `.env`

### Pour Gmail avec mot de passe d'application:

1. Allez sur: https://myaccount.google.com/apppasswords
2. Sélectionnez "Mail" et "Windows Computer"
3. Google vous génère un mot de passe (16 caractères)
4. Copiez ce mot de passe dans `.env`:

```env
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

### Pour d'autres fournisseurs email:

Consultez la documentation de votre fournisseur pour les paramètres SMTP.

---

## 🧪 Test Complet

### Test 1: Vérifier MongoDB
```bash
mongod
# Attendez: [initandlisten] Waiting for connections on port 27017
```

### Test 2: Vérifier le Backend
```bash
cd backend
npm run dev
# Attendez: Server running on: http://localhost:5000
```

### Test 3: Vérifier l'API
```bash
# Dans PowerShell:
curl http://localhost:5000/api/health
# Doit répondre: {"success":true,"message":"Server is running"}
```

### Test 4: Tester le Formulaire
1. Ouvrez `devis.html` dans le navigateur
2. Remplissez le formulaire
3. Cliquez "Envoyer la Demande"
4. Vous devez voir un message de succès

### Test 5: Vérifier les Emails
1. L'email du client doit recevoir une confirmation
2. ndiayeabdoumamesaye1234@gmail.com doit recevoir une alerte

---

## 🚨 Problèmes et Solutions

| Problème | Cause | Solution |
|----------|-------|----------|
| "Erreur de connexion" | Backend non lancé | Lancez `npm run dev` |
| "MongoDB refused" | MongoDB non lancé | Lancez `mongod` |
| "Form not found" | Ancien formulaire Formspree | Utilisez le nouveau `devis.html` |
| Pas d'email reçu | Gmail non configuré | Activez mot de passe app |
| CORS Error | CORS mal configuré | Vérifiez le `.env` |

---

## ✅ Checklist Finale

- [ ] MongoDB est en cours d'exécution
- [ ] Backend Express est en cours d'exécution
- [ ] Fichier `.env` est correctement configuré
- [ ] Test API réussit (`.\test-api.ps1`)
- [ ] Formulaire `devis.html` affiche un message de succès
- [ ] Email de confirmation reçu
- [ ] Email d'alerte reçu à ndiayeabdoumamesaye1234@gmail.com

---

## 🎓 Points Importants

✨ Les **3 services** DOIVENT être en cours d'exécution:
1. **MongoDB** - Base de données
2. **Express Backend** - API
3. **Navigateur** - Formulaire HTML

✨ Le fichier `.env` DOIT être dans le dossier `backend/`

✨ Les emails NÉCESSITENT une configuration Gmail valide

✨ Les erreurs apparaissent dans la **Console du navigateur** (F12)

---

## 📞 Besoin d'Aide?

Consultez les fichiers:
- `TROUBLESHOOTING.md` - Guide de dépannage
- `README.md` - Documentation générale
- `QUOTES_GUIDE.md` - Documentation des devis
- `DEVIS_CONFIG.md` - Configuration des devis

Ou ouvrez la console du navigateur (F12) pour voir les erreurs détaillées.

---

**Vous êtes prêt! 🚀**

Lancez tous les services et testez le formulaire de devis.
