## 🎯 DEMANDES DE DEVIS - Guide d'intégration

### 📋 Fonctionnalité

Quand un client soumet une demande de devis:
1. ✅ Devis enregistré en base de données
2. ✅ Email de confirmation envoyé au client
3. ✅ Email de notification envoyé à **ndiayeabdoumamesaye1234@gmail.com** (l'admin)
4. ✅ Vous pouvez répondre avec un devis détaillé et un montant

---

## 📡 API Endpoints

### Créer une demande de devis
```bash
POST /api/quotes
Content-Type: application/json

{
  "customer": {
    "name": "Jean Dupont",
    "email": "jean@example.com",
    "phone": "+33612345678",
    "company": "Entreprise XYZ",
    "address": "123 Rue de la Paix",
    "city": "Paris",
    "postalCode": "75001",
    "country": "France"
  },
  "subject": "Demande d'installation de panneaux solaires",
  "description": "Je souhaite installer des panneaux solaires sur ma maison. J'ai une toiture de 100m² et consomme environ 5000kWh par an.",
  "category": "photovoltaique",
  "quantity": 1,
  "estimatedBudget": 15000,
  "timeline": "1-mois",
  "notes": "Préférence pour une installation rapide"
}
```

**Réponse:**
```json
{
  "success": true,
  "message": "Demande de devis envoyée avec succès",
  "data": {
    "_id": "...",
    "quoteNumber": "DEV-1714046400000-1",
    "customer": { ... },
    "status": "received",
    "createdAt": "2025-04-25T10:00:00Z"
  }
}
```

---

### Récupérer toutes les demandes de devis
```bash
GET /api/quotes
# Avec filtres:
GET /api/quotes?status=received&category=photovoltaique&page=1&limit=10
```

---

### Récupérer une demande spécifique
```bash
GET /api/quotes/{quote_id}
```

---

### Envoyer un devis au client
```bash
PUT /api/quotes/{quote_id}/send
Content-Type: application/json

{
  "quoteAmount": 14500,
  "validUntil": "2025-05-25",
  "message": "Bonjour,\n\nVoici le devis pour votre demande d'installation solaire.\n\nNous proposons un système de 6kWc avec 16 panneaux et une batterie de 48kWh.\nLa pose sera effectuée en 2 jours ouvrables.\n\nN'hésitez pas à nous contacter si vous avez des questions.\n\nCordialement"
}
```

---

### Mettre à jour le statut d'une demande
```bash
PUT /api/quotes/{quote_id}
Content-Type: application/json

{
  "status": "in-progress"
}
```

Status disponibles: `received`, `in-progress`, `sent`, `closed`

---

### Récupérer les devis d'un client
```bash
GET /api/quotes/customer/{email}
```

---

### Supprimer une demande
```bash
DELETE /api/quotes/{quote_id}
```

---

## 🛠️ Intégration Frontend

### Formulaire HTML

```html
<!DOCTYPE html>
<html>
<head>
    <title>Demande de Devis</title>
    <style>
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input, textarea, select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>

<h2>📋 Demander un Devis</h2>

<form id="quoteForm">
    <h3>Vos informations</h3>
    
    <div class="form-group">
        <label for="name">Nom complet *</label>
        <input type="text" id="name" name="name" required>
    </div>
    
    <div class="form-group">
        <label for="email">Email *</label>
        <input type="email" id="email" name="email" required>
    </div>
    
    <div class="form-group">
        <label for="phone">Téléphone *</label>
        <input type="tel" id="phone" name="phone" required>
    </div>
    
    <div class="form-group">
        <label for="company">Entreprise (optionnel)</label>
        <input type="text" id="company" name="company">
    </div>
    
    <div class="form-group">
        <label for="address">Adresse (optionnel)</label>
        <input type="text" id="address" name="address">
    </div>
    
    <div class="form-group">
        <label for="city">Ville (optionnel)</label>
        <input type="text" id="city" name="city">
    </div>
    
    <h3>Votre demande</h3>
    
    <div class="form-group">
        <label for="category">Catégorie *</label>
        <select id="category" name="category" required>
            <option value="">-- Sélectionner une catégorie --</option>
            <option value="vehicules-electriques">Véhicules électriques</option>
            <option value="bornes-recharge">Bornes de recharge</option>
            <option value="photovoltaique">Photovoltaïque</option>
            <option value="ee">Efficacité énergétique</option>
            <option value="ems">Gestion de l'énergie</option>
            <option value="bess">Batterie de stockage</option>
            <option value="agrivoltaisme">Agrivoltaïsme</option>
            <option value="retrofit">Retrofit</option>
            <option value="isolation-thermique">Isolation thermique</option>
        </select>
    </div>
    
    <div class="form-group">
        <label for="subject">Sujet *</label>
        <input type="text" id="subject" name="subject" placeholder="Ex: Installation de panneaux solaires" required>
    </div>
    
    <div class="form-group">
        <label for="description">Description détaillée *</label>
        <textarea id="description" name="description" rows="6" placeholder="Décrivez votre projet en détail..." required></textarea>
    </div>
    
    <div class="form-group">
        <label for="quantity">Quantité</label>
        <input type="number" id="quantity" name="quantity" min="1" value="1">
    </div>
    
    <div class="form-group">
        <label for="budget">Budget estimé (€)</label>
        <input type="number" id="budget" name="budget" min="0" placeholder="Ex: 15000">
    </div>
    
    <div class="form-group">
        <label for="timeline">Délai souhaité</label>
        <select id="timeline" name="timeline">
            <option value="flexible">Flexible</option>
            <option value="urgent">Urgent (dans les 7 jours)</option>
            <option value="1-2-semaines">1-2 semaines</option>
            <option value="1-mois">1 mois</option>
        </select>
    </div>
    
    <div class="form-group">
        <label for="notes">Notes supplémentaires</label>
        <textarea id="notes" name="notes" rows="3" placeholder="Informations additionnelles..."></textarea>
    </div>
    
    <button type="submit">Envoyer la demande de devis</button>
</form>

<script>
const API_URL = 'http://localhost:5000/api';

document.getElementById('quoteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        customer: {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            country: 'France'
        },
        subject: document.getElementById('subject').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        quantity: parseInt(document.getElementById('quantity').value),
        estimatedBudget: document.getElementById('budget').value ? 
            parseInt(document.getElementById('budget').value) : null,
        timeline: document.getElementById('timeline').value,
        notes: document.getElementById('notes').value
    };
    
    try {
        const response = await fetch(`${API_URL}/quotes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert(`✅ Demande de devis envoyée avec succès!\n\nNuméro de devis: ${data.data.quoteNumber}\n\nVous recevrez bientôt un email avec notre réponse.`);
            document.getElementById('quoteForm').reset();
        } else {
            alert(`❌ Erreur: ${data.message}`);
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('❌ Erreur lors de l\'envoi du formulaire');
    }
});
</script>

</body>
</html>
```

---

## 📧 Emails reçus

### 1️⃣ Email au client (confirmation)
```
Sujet: Confirmation de votre demande de devis - [Sujet]

Bonjour [Nom],

Merci d'avoir soumis une demande de devis. Nous avons bien reçu votre demande 
et nos équipes vont l'examiner attentivement.

Numéro de devis: DEV-1714046400000-1
Sujet: [Sujet]
Catégorie: [Catégorie]
Budget estimé: [Budget]€

Nous vous recontacterons très prochainement avec un devis détaillé.

Cordialement,
AGT E Motors
```

### 2️⃣ Email à l'admin (ndiayeabdoumamesaye1234@gmail.com)
```
Sujet: 📋 Nouvelle demande de devis - DEV-1714046400000-1

Nouvelle Demande de Devis

Informations Client:
- Nom: [Nom]
- Email: [Email]
- Téléphone: [Téléphone]
- Entreprise: [Entreprise]

Détails de la Demande:
- Numéro: DEV-1714046400000-1
- Sujet: [Sujet]
- Catégorie: [Catégorie]
- Description: [Description complète]
- Quantité: [Quantité]
- Budget: [Budget]€
- Délai: [Délai]

[Bouton: Voir le devis]
```

---

## 🔄 Workflow complet

```
1. Client remplit le formulaire et soumet
   ↓
2. Devis créé en base de données (statut: "received")
   ↓
3. Email de confirmation envoyé au client
   ↓
4. Email d'alerte envoyé à: ndiayeabdoumamesaye1234@gmail.com
   ↓
5. Admin clique sur "Voir le devis" et remplit les détails
   ↓
6. Admin clique sur "Envoyer un devis" (statut: "sent")
   ↓
7. Devis envoyé par email au client avec le montant et la date limite
   ↓
8. Client reçoit le devis et peut répondre
   ↓
9. Admin met à jour le statut (in-progress, closed, etc.)
```

---

## 💾 Données stockées

Chaque demande de devis contient:
- ✅ Informations du client (nom, email, téléphone, adresse)
- ✅ Détails du projet
- ✅ Catégorie et urgence
- ✅ Budget estimé
- ✅ Numéro unique (DEV-xxx)
- ✅ Statut et dates
- ✅ Devis réponse (montant, date limite)

---

## 🎓 Points importants

✨ **Configuration email**: Assurez-vous que `ADMIN_EMAIL` est défini dans `.env`

✨ **Notifications**: L'admin recevra toutes les nouvelles demandes

✨ **Validation**: Tous les champs requis sont validés

✨ **Suivi**: Chaque devis a un numéro unique et un statut

✨ **Emails automatiques**: Confirmations et notifications envoyées automatiquement
