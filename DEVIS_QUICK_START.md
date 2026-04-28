# ⚡ DÉMARRAGE EN 5 MINUTES

## 🎯 Ce que vous avez

✅ Backend Express complet
✅ Formule de devis fonctionnelle
✅ Emails automatiques configurés
✅ Base de données MongoDB

---

## 🚀 POUR COMMENCER

### Terminal 1: MongoDB
```bash
mongod
```

Attendez: `Waiting for connections on port 27017`

### Terminal 2: Backend
```bash
cd backend
npm run dev
```

Attendez: `Server running on: http://localhost:5000`

### Navigateur: Formulaire
```
Ouvrez: C:\Users\UNCHK\Documents\AGT E MOTORS\devis.html
```

---

## ✅ CONFIGURER L'EMAIL

**C'est important!** Sans cette config, les emails ne seront pas envoyés.

1. **Créer `.env` dans le dossier `backend`**
   ```bash
   copy .env.example .env
   ```

2. **Configurer Gmail:**
   - Allez sur: https://myaccount.google.com/apppasswords
   - Générez un mot de passe d'application
   - Copiez-le dans le fichier `.env`:
   ```env
   EMAIL_USER=votre_email@gmail.com
   EMAIL_PASS=votre_mot_de_passe_app_16_chars
   ```

3. **Admin Email (IMPORTANT):**
   ```env
   ADMIN_EMAIL=ndiayeabdoumamesaye1234@gmail.com
   ```

4. **Redémarrez le backend**

---

## 🧪 TESTER

1. Ouvrez le formulaire `devis.html`
2. Appuyez sur **F12** (Console)
3. Remplissez le formulaire
4. Cliquez "Envoyer la Demande"

**Vous devez voir:**
- ✅ Message de succès dans le navigateur
- ✅ Email de confirmation au client
- ✅ Email d'alerte à ndiayeabdoumamesaye1234@gmail.com

---

## 🔧 PROBLÈMES?

### "Erreur de connexion"
→ Vérifiez que le backend tourne (`npm run dev`)

### "MongoDB connection refused"  
→ Vérifiez que MongoDB tourne (`mongod`)

### "Pas d'emails reçus"
→ Vérifiez la configuration Gmail dans `.env`

### Ouvrez la console (F12) pour voir les erreurs détaillées

---

## 📚 Documentation

- `DEMARRAGE_COMPLET.md` - Guide détaillé
- `TROUBLESHOOTING.md` - Dépannage complet
- `QUOTES_GUIDE.md` - API des devis
- `README.md` - Documentation générale

---

## ✨ C'est Prêt!

Quand les **3 services** tournent:
1. ✅ MongoDB
2. ✅ Backend (`npm run dev`)
3. ✅ Formulaire ouvert

Vous pouvez envoyer des demandes de devis!

**Bon fonctionnement! 🎉**
