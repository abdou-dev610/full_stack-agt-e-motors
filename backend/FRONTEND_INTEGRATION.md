# Configuration CORS Frontend

Le backend est configuré pour accepter les requêtes du frontend. Voici comment intégrer votre frontend avec le backend Express.

## 1. Configuration des routes frontend

Mettez à jour votre `script.js` pour pointer vers l'API backend au lieu du localStorage:

### Exemple pour le panier

Fichier: `script.js`

```javascript
const API_URL = 'http://localhost:5000/api';

// Créer une commande depuis le panier
async function createOrderFromCart(customerInfo) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Récupérer les détails des produits
    const items = await Promise.all(
        cartItems.map(async (item) => {
            const product = await fetch(`${API_URL}/products?search=${item.name}`)
                .then(r => r.json())
                .then(data => data.data[0]);
            
            return {
                productId: product._id,
                name: product.name,
                quantity: item.quantity,
                price: product.price,
                total: product.price * item.quantity
            };
        })
    );
    
    const orderData = {
        customer: customerInfo,
        items: items,
        totalAmount: items.reduce((sum, item) => sum + item.total, 0),
        paymentMethod: 'credit-card'
    };
    
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('Commande créée:', result.data);
            localStorage.removeItem('cart'); // Vider le panier
            return result.data;
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// Récupérer les produits par catégorie
async function loadProductsByCategory(category) {
    try {
        const response = await fetch(`${API_URL}/products?category=${category}`);
        const data = await response.json();
        
        if (data.success) {
            displayProducts(data.data);
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// Afficher les produits
function displayProducts(products) {
    const container = document.getElementById('products-container');
    
    container.innerHTML = products.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span class="price">${product.price}€</span>
            <button onclick="addToCart('${product._id}', '${product.name}', ${product.price})">
                Ajouter au panier
            </button>
        </div>
    `).join('');
}

// Envoyer un message de contact
async function submitContactForm(formData) {
    try {
        const response = await fetch(`${API_URL}/contacts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Message envoyé avec succès!');
            document.getElementById('contact-form').reset();
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'envoi du message');
    }
}
```

## 2. Mise à jour du formulaire de contact

Fichier: `contact.html`

```html
<form id="contact-form" onsubmit="handleContactSubmit(event)">
    <input type="text" id="name" placeholder="Nom" required>
    <input type="email" id="email" placeholder="Email" required>
    <input type="tel" id="phone" placeholder="Téléphone" required>
    <input type="text" id="subject" placeholder="Sujet" required>
    <select id="category">
        <option value="other">Autre</option>
        <option value="support">Support</option>
        <option value="sales">Vente</option>
        <option value="partnership">Partenariat</option>
    </select>
    <textarea id="message" placeholder="Message" required></textarea>
    <button type="submit">Envoyer</button>
</form>

<script>
async function handleContactSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        category: document.getElementById('category').value,
        message: document.getElementById('message').value
    };
    
    await submitContactForm(formData);
}
</script>
```

## 3. Mise à jour du formulaire de commande

Fichier: `cart.html` (ou formulaire de checkout)

```html
<form id="order-form" onsubmit="handleOrderSubmit(event)">
    <h2>Informations client</h2>
    
    <input type="text" id="customer-name" placeholder="Nom complet" required>
    <input type="email" id="customer-email" placeholder="Email" required>
    <input type="tel" id="customer-phone" placeholder="Téléphone" required>
    <input type="text" id="customer-address" placeholder="Adresse" required>
    <input type="text" id="customer-city" placeholder="Ville" required>
    <input type="text" id="customer-postal" placeholder="Code postal" required>
    
    <h2>Méthode de paiement</h2>
    <select id="payment-method" required>
        <option value="credit-card">Carte de crédit</option>
        <option value="bank-transfer">Virement bancaire</option>
        <option value="check">Chèque</option>
    </select>
    
    <button type="submit">Confirmer la commande</button>
</form>

<script>
async function handleOrderSubmit(event) {
    event.preventDefault();
    
    const customerInfo = {
        name: document.getElementById('customer-name').value,
        email: document.getElementById('customer-email').value,
        phone: document.getElementById('customer-phone').value,
        address: document.getElementById('customer-address').value,
        city: document.getElementById('customer-city').value,
        postalCode: document.getElementById('customer-postal').value,
        country: 'France'
    };
    
    const paymentMethod = document.getElementById('payment-method').value;
    
    const order = await createOrderFromCart(customerInfo);
    
    if (order) {
        alert(`Commande créée: ${order.orderNumber}`);
        window.location.href = 'index.html';
    }
}
</script>
```

## 4. Fichier `.env` du frontend (optionnel)

Créez un fichier `.env` à la racine du projet frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

Puis utilisez-le:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

## 5. CORS en production

Lorsque vous déploierez, mettez à jour `.env` du backend:

```env
CORS_ORIGIN=https://votre-domaine.com,https://www.votre-domaine.com
```

## 6. Checklist d'intégration

- [ ] Backend Express lancé et fonctionnant
- [ ] API URL correctement configurée dans le frontend
- [ ] MongoDB connectée et accessible
- [ ] Fichier `.env` du backend rempli
- [ ] CORS configuré pour accepter le domaine du frontend
- [ ] Formulaires frontend pointant vers les endpoints API
- [ ] Gestion des erreurs implémentée
- [ ] Tests effectués sur les endpoints principaux

## 7. Tests d'intégration rapides

Ouvrez la console du navigateur et testez:

```javascript
// Test 1: Récupérer les produits
fetch('http://localhost:5000/api/products')
  .then(r => r.json())
  .then(d => console.log(d));

// Test 2: Créer un message de contact
fetch('http://localhost:5000/api/contacts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test',
    email: 'test@test.com',
    phone: '123456',
    subject: 'Test',
    message: 'Message de test',
    category: 'other'
  })
})
.then(r => r.json())
.then(d => console.log(d));
```

Tous les tests doivent retourner `"success": true`.
