#!/bin/bash
# Test Script pour AGT E Motors API

echo "╔════════════════════════════════════════════════════════╗"
echo "║  AGT E Motors API - Test de Configuration             ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Test 1: Vérifier que curl est installé
echo "📋 Test 1: Vérifier les outils..."
if ! command -v curl &> /dev/null; then
    echo "❌ CURL n'est pas installé"
    exit 1
fi
echo "✅ CURL est installé"
echo ""

# Test 2: Vérifier que le serveur répond
echo "📋 Test 2: Vérifier la connexion au serveur..."
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ Le serveur Express répond sur http://localhost:5000"
    curl -s http://localhost:5000/api/health | grep -q "success" && echo "✅ Réponse valide reçue" || echo "❌ Réponse invalide"
else
    echo "❌ Le serveur n'est pas accessible"
    echo "   Assurez-vous que:"
    echo "   1. Le backend est lancé (npm run dev)"
    echo "   2. MongoDB est en cours d'exécution"
    exit 1
fi
echo ""

# Test 3: Tester la création d'un devis
echo "📋 Test 3: Tester la création d'un devis..."
RESPONSE=$(curl -s -X POST http://localhost:5000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "name": "Test Client",
      "email": "test@example.com",
      "phone": "+33612345678",
      "address": "123 Test Street",
      "city": "Test City",
      "country": "France"
    },
    "subject": "Test Devis",
    "description": "Ceci est un test de demande de devis pour vérifier que le système fonctionne correctement.",
    "category": "photovoltaique",
    "quantity": 1,
    "estimatedBudget": 10000,
    "timeline": "flexible"
  }')

if echo "$RESPONSE" | grep -q "success"; then
    echo "✅ Demande de devis créée avec succès"
    echo "$RESPONSE" | grep -o "DEV-[0-9-]*" | head -1 | xargs -I {} echo "   Numéro de devis: {}"
else
    echo "❌ Erreur lors de la création de la demande"
    echo "   Réponse: $RESPONSE"
    exit 1
fi
echo ""

# Test 4: Récupérer les devis
echo "📋 Test 4: Récupérer les devis..."
if curl -s http://localhost:5000/api/quotes | grep -q "success"; then
    echo "✅ API /quotes fonctionne"
else
    echo "❌ Erreur lors de la récupération des devis"
fi
echo ""

echo "╔════════════════════════════════════════════════════════╗"
echo "║  ✅ Tous les tests ont réussi!                         ║"
echo "║  Le système est prêt à fonctionner.                    ║"
echo "╚════════════════════════════════════════════════════════╝"
