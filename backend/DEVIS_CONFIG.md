# 📋 Configuration des Devis - Guide Complet

## ✅ Ce qui a été créé

1. ✅ **Modèle Quote** - Schéma de base de données pour les devis
2. ✅ **Controller Quote** - Logique pour gérer les devis
3. ✅ **Routes Quote** - API endpoints pour les devis
4. ✅ **Validation** - Validation des données de devis
5. ✅ **Formulaire HTML** - Page `devis.html` prête à l'emploi
6. ✅ **Emails automatiques** - Notifications au client ET à l'admin

---

## 🔧 Configuration Requise

### 1. Mettre à jour le `.env`

```env
# Email pour recevoir les demandes de devis
ADMIN_EMAIL=ndiayeabdoumamesaye1234@gmail.com
ADMIN_URL=http://localhost:3000

# Assurez-vous que ces paramètres sont configurés:
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app
EMAIL_FROM=noreply@agtemotors.com
```

### 2. Installer les dépendances (si pas déjà fait)

```bash
cd backend
npm install
```

### 3. Démarrer le serveur

```bash
npm run dev
```

---

## 📱 Utiliser le Formulaire

### Option 1: Fichier HTML autonome

J'ai créé un fichier `devis.html` à la racine du projet.

Ouvrez simplement: `file:///path/to/AGT E MOTORS/devis.html`

**Ou** hébergez-le sur votre serveur web.

### Option 2: Intégrer dans votre site existant

Copiez le contenu du formulaire dans votre page HTML.

### Option 3: Utiliser dans un panel d'administration

Vous pouvez afficher le formulaire dans un formulaire modal ou une section.

---

## 📡 API Endpoint pour le Devis

### Créer un devis

```bash
POST http://localhost:5000/api/quotes
```

**Corps de la requête:**
```json
{
  "customer": {
    "name": "Jean Dupont",
    "email": "jean@example.com",
    "phone": "+33612345678",
    "company": "ACME Inc",
    "address": "123 Rue de la Paix",
    "city": "Paris",
    "country": "France"
  },
  "subject": "Installation de panneaux solaires",
  "description": "Je souhaite installer des panneaux solaires sur ma maison...",
  "category": "photovoltaique",
  "quantity": 1,
  "estimatedBudget": 15000,
  "timeline": "1-mois",
  "notes": "Urgent avant l'été"
}
```

---

## 📧 Flux d'Emails

### Quand un client envoie une demande:

#### 1️⃣ Email au CLIENT (confirmation)
```
Sujet: Confirmation de votre demande de devis - [Sujet]

Bonjour [Nom],

Merci d'avoir soumis une demande de devis. Nous avons bien reçu 
votre demande et nos équipes vont l'examiner attentivement.

Numéro de devis: DEV-1714046400000-1
Sujet: [Sujet]
...

Nous vous recontacterons très prochainement.
```

#### 2️⃣ Email à l'ADMIN (ndiayeabdoumamesaye1234@gmail.com)
```
Sujet: 📋 Nouvelle demande de devis - DEV-1714046400000-1

Nouvelle Demande de Devis

Informations Client:
- Nom: Jean Dupont
- Email: jean@example.com
- Téléphone: +33612345678

Détails:
- Sujet: Installation de panneaux solaires
- Catégorie: Photovoltaïque
- Budget: 15000€
- Délai: 1 mois

[Lien pour voir le devis]
```

---

## 👨‍💼 Comment Répondre aux Demandes

### 1. Admin reçoit l'email

L'admin reçoit un email à **ndiayeabdoumamesaye1234@gmail.com** quand un client demande un devis.

### 2. Consulter les demandes

```bash
# Récupérer toutes les demandes
curl http://localhost:5000/api/quotes

# Filtrer par statut
curl http://localhost:5000/api/quotes?status=received
```

### 3. Envoyer un devis au client

```bash
curl -X PUT http://localhost:5000/api/quotes/{quote_id}/send \
  -H "Content-Type: application/json" \
  -d '{
    "quoteAmount": 14500,
    "validUntil": "2025-05-25",
    "message": "Bonjour,\n\nVoici notre offre pour votre projet..."
  }'
```

**Résultat:**
- ✅ Statut passe de `received` à `sent`
- ✅ Email du devis envoyé automatiquement au client
- ✅ Montant et date limite enregistrés

---

## 🎯 Statuts des Devis

| Statut | Signification |
|--------|---------------|
| `received` | Demande reçue, en attente de traitement |
| `in-progress` | En cours de traitement |
| `sent` | Devis envoyé au client |
| `closed` | Devis clôturé (accepté ou refusé) |

### Changer le statut

```bash
curl -X PUT http://localhost:5000/api/quotes/{quote_id} \
  -H "Content-Type: application/json" \
  -d '{"status": "in-progress"}'
```

---

## 📊 Récupérer les Données

### Tous les devis

```bash
GET http://localhost:5000/api/quotes
```

### Devis spécifique

```bash
GET http://localhost:5000/api/quotes/{quote_id}
```

### Devis d'un client

```bash
GET http://localhost:5000/api/quotes/customer/jean@example.com
```

### Filtrer par statut

```bash
GET http://localhost:5000/api/quotes?status=received&limit=10
```

---

## 🌐 Intégrer le Formulaire sur Votre Site

### Exemple 1: Dans votre `shop.html`

```html
<section id="quote-section">
    <h2>Demander un Devis</h2>
    <iframe src="devis.html" style="width: 100%; height: 800px; border: none;"></iframe>
</section>
```

### Exemple 2: Bouton qui ouvre le formulaire

```html
<button onclick="window.open('devis.html', 'devis', 'width=1000,height=1200')">
    Demander un Devis
</button>
```

### Exemple 3: Formulaire embarqué avec JavaScript

```javascript
const API_URL = 'http://localhost:5000/api';

async function submitQuoteForm(formData) {
    const response = await fetch(`${API_URL}/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    
    return response.json();
}
```

---

## 🔒 Sécurité

✅ **Validation des données** - Tous les champs sont validés

✅ **Sanitization** - Les données sont nettoyées avant stockage

✅ **CORS** - Configuré pour accepter uniquement vos domaines

✅ **Email sécurisé** - Pas de données sensibles dans les logs

---

## 🧪 Test Rapide

### 1. Ouvrir le formulaire

```
file:///C:/Users/UNCHK/Documents/AGT E MOTORS/devis.html
```

### 2. Remplir et soumettre

- Remplir tous les champs requis
- Cliquer sur "Envoyer la demande de devis"

### 3. Vérifier l'email

- Vous recevrez un email à: **ndiayeabdoumamesaye1234@gmail.com**
- Le client reçoit une confirmation

### 4. Répondre au devis

Via l'API:
```bash
curl -X PUT http://localhost:5000/api/quotes/{quote_id}/send \
  -H "Content-Type: application/json" \
  -d '{
    "quoteAmount": 15000,
    "validUntil": "2025-05-25",
    "message": "Devis pour votre projet"
  }'
```

Le client recevra le devis par email! 📧

---

## 🎓 Points Importants

### Email du propriétaire
L'email **ndiayeabdoumamesaye1234@gmail.com** reçoit:
- ✉️ Toutes les nouvelles demandes de devis
- ✉️ Alertes en temps réel

### Numéro unique
Chaque devis a un numéro unique: `DEV-TIMESTAMP-COUNT`
- Exemple: `DEV-1714046400000-1`

### Validation côté client
Le formulaire HTML vérifie les données avant envoi

### Validation côté serveur
Le backend revérifie tout pour la sécurité

### Emails automatiques
- ✅ Confirmation au client
- ✅ Notification à l'admin
- ✅ Envoi du devis au client (via API)

---

## 🚀 Checklist de Configuration

- [ ] `.env` mis à jour avec `ADMIN_EMAIL`
- [ ] Backend lancé (`npm run dev`)
- [ ] MongoDB en cours d'exécution
- [ ] `devis.html` accessible
- [ ] Test du formulaire effectué
- [ ] Email de test reçu
- [ ] Réponse au devis testée

---

## 📝 Fichiers Modifiés

| Fichier | Changement |
|---------|-----------|
| `src/models/Quote.js` | ✅ Nouveau modèle |
| `src/controllers/quoteController.js` | ✅ Nouveau contrôleur |
| `src/routes/quoteRoutes.js` | ✅ Nouvelles routes |
| `src/middleware/validation.js` | ✅ Validation ajoutée |
| `src/server.js` | ✅ Routes importées |
| `.env.example` | ✅ `ADMIN_EMAIL` ajouté |
| `devis.html` | ✅ Nouveau formulaire |

---

## 💬 Variables Disponibles dans `.env`

```env
# Existant
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agt-e-motors
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@agtemotors.com

# Nouveau
ADMIN_EMAIL=ndiayeabdoumamesaye1234@gmail.com
ADMIN_URL=http://localhost:3000
```

---

## 🔧 Troubleshooting

### ❌ "Emails not sending"
- Vérifier `EMAIL_USER` et `EMAIL_PASS` dans `.env`
- Vérifier que Gmail autorise les applications tierces
- Vérifier les logs du serveur

### ❌ "Form not submitting"
- Vérifier que l'API est en cours d'exécution
- Vérifier la console du navigateur pour les erreurs
- Vérifier CORS dans le backend

### ❌ "Quote not appearing in database"
- Vérifier que MongoDB est en cours d'exécution
- Vérifier les logs du backend

---

## 📞 Support

Consultez:
- `QUOTES_GUIDE.md` - Guide détaillé des devis
- `README.md` - Documentation générale
- `API_EXAMPLES.md` - Exemples d'API
