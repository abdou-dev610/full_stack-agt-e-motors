# AGT E Motors API - Exemples de requêtes

## Variables utiles
```
API_URL = http://localhost:5000/api
```

## 1. PRODUITS

### Récupérer tous les produits
```bash
curl -X GET "http://localhost:5000/api/products"
```

### Récupérer les produits d'une catégorie
```bash
curl -X GET "http://localhost:5000/api/products?category=vehicules-electriques&limit=5"
```

### Rechercher des produits
```bash
curl -X GET "http://localhost:5000/api/products?search=Tesla"
```

### Récupérer un produit spécifique
```bash
curl -X GET "http://localhost:5000/api/products/{product_id}"
```

### Créer un produit
```bash
curl -X POST "http://localhost:5000/api/products" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tesla Model S",
    "description": "Berline électrique de luxe",
    "category": "vehicules-electriques",
    "price": 85000,
    "image": "/images/cars/tesla-model-s.jpg",
    "stock": 5,
    "specifications": {
      "autonomie": "650km",
      "batterie": "100kWh",
      "puissance": "450kW"
    }
  }'
```

### Mettre à jour un produit
```bash
curl -X PUT "http://localhost:5000/api/products/{product_id}" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 82000,
    "stock": 4
  }'
```

### Supprimer un produit
```bash
curl -X DELETE "http://localhost:5000/api/products/{product_id}"
```

---

## 2. COMMANDES

### Créer une commande
```bash
curl -X POST "http://localhost:5000/api/orders" \
  -H "Content-Type: application/json" \
  -d '{
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
        "productId": "{product_id}",
        "name": "Tesla Model 3",
        "quantity": 1,
        "price": 45000,
        "total": 45000
      }
    ],
    "totalAmount": 45000,
    "paymentMethod": "credit-card",
    "notes": "Livraison prioritaire"
  }'
```

### Récupérer toutes les commandes
```bash
curl -X GET "http://localhost:5000/api/orders"
```

### Récupérer les commandes avec pagination
```bash
curl -X GET "http://localhost:5000/api/orders?page=1&limit=10"
```

### Récupérer les commandes par statut
```bash
curl -X GET "http://localhost:5000/api/orders?status=pending"
```

### Récupérer une commande spécifique
```bash
curl -X GET "http://localhost:5000/api/orders/{order_id}"
```

### Récupérer les commandes d'un client
```bash
curl -X GET "http://localhost:5000/api/orders/customer/jean@example.com"
```

### Mettre à jour le statut d'une commande
```bash
curl -X PUT "http://localhost:5000/api/orders/{order_id}" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "shipped",
    "paymentStatus": "completed"
  }'
```

### Supprimer une commande
```bash
curl -X DELETE "http://localhost:5000/api/orders/{order_id}"
```

---

## 3. CONTACTS

### Envoyer un message de contact
```bash
curl -X POST "http://localhost:5000/api/contacts" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Marie Martin",
    "email": "marie@example.com",
    "phone": "+33698765432",
    "subject": "Demande de partenariat",
    "message": "Je suis intéressée par vos services de panneaux solaires pour mon entreprise.",
    "category": "partnership"
  }'
```

### Récupérer tous les messages
```bash
curl -X GET "http://localhost:5000/api/contacts"
```

### Filtrer par statut
```bash
curl -X GET "http://localhost:5000/api/contacts?status=new"
```

### Filtrer par catégorie
```bash
curl -X GET "http://localhost:5000/api/contacts?category=sales"
```

### Récupérer un message spécifique
```bash
curl -X GET "http://localhost:5000/api/contacts/{contact_id}"
```

### Répondre à un message
```bash
curl -X PUT "http://localhost:5000/api/contacts/{contact_id}" \
  -H "Content-Type: application/json" \
  -d '{
    "reply": "Merci pour votre intérêt! Notre équipe commerciale vous contactera très bientôt."
  }'
```

### Supprimer un message
```bash
curl -X DELETE "http://localhost:5000/api/contacts/{contact_id}"
```

---

## 4. HEALTH CHECK

### Vérifier l'état du serveur
```bash
curl -X GET "http://localhost:5000/api/health"
```

---

## Utilisation avec JavaScript (Fetch API)

### Récupérer les produits
```javascript
const API_URL = 'http://localhost:5000/api';

async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    console.log('Produits:', data.data);
  } catch (error) {
    console.error('Erreur:', error);
  }
}

getProducts();
```

### Créer une commande
```javascript
async function createOrder(orderData) {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });
    
    const data = await response.json();
    console.log('Commande créée:', data.data);
    return data.data;
  } catch (error) {
    console.error('Erreur:', error);
  }
}
```

### Envoyer un message de contact
```javascript
async function sendContactMessage(message) {
  try {
    const response = await fetch(`${API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    });
    
    const data = await response.json();
    console.log('Message envoyé:', data);
  } catch (error) {
    console.error('Erreur:', error);
  }
}
```

---

## Utilisation avec Postman

1. Importer les collections
2. Configurer la variable `base_url` : `http://localhost:5000/api`
3. Tester chaque endpoint

---

## Codes de réponse HTTP

| Code | Signification |
|------|---------------|
| 200  | OK - Requête réussie |
| 201  | Created - Ressource créée |
| 400  | Bad Request - Erreur de syntaxe |
| 404  | Not Found - Ressource non trouvée |
| 500  | Server Error - Erreur serveur |

---

## Format de réponse standard

### Succès
```json
{
  "success": true,
  "message": "Message de succès",
  "data": { }
}
```

### Erreur
```json
{
  "success": false,
  "message": "Message d'erreur"
}
```
