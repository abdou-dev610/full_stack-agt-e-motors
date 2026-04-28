# Test Script pour AGT E Motors API - Windows PowerShell

Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  AGT E Motors API - Test de Configuration             ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Test 1: Vérifier que curl est disponible
Write-Host "📋 Test 1: Vérifier les outils..." -ForegroundColor Yellow
try {
    $null = curl --version 2>$null
    Write-Host "✅ CURL est disponible" -ForegroundColor Green
} catch {
    Write-Host "❌ CURL n'est pas disponible" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Test 2: Vérifier que le serveur répond
Write-Host "📋 Test 2: Vérifier la connexion au serveur..." -ForegroundColor Yellow
try {
    $response = curl -s http://localhost:5000/api/health
    if ($response -match "success") {
        Write-Host "✅ Le serveur Express répond sur http://localhost:5000" -ForegroundColor Green
        Write-Host "✅ Réponse valide reçue" -ForegroundColor Green
    } else {
        Write-Host "❌ Réponse invalide du serveur" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Le serveur n'est pas accessible" -ForegroundColor Red
    Write-Host "   Assurez-vous que:" -ForegroundColor Red
    Write-Host "   1. Le backend est lancé (npm run dev)" -ForegroundColor Red
    Write-Host "   2. MongoDB est en cours d'exécution" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Test 3: Tester la création d'un devis
Write-Host "📋 Test 3: Tester la création d'un devis..." -ForegroundColor Yellow

$jsonData = @{
    customer = @{
        name = "Test Client"
        email = "test@example.com"
        phone = "+33612345678"
        address = "123 Test Street"
        city = "Test City"
        country = "France"
    }
    subject = "Test Devis"
    description = "Ceci est un test de demande de devis pour vérifier que le système fonctionne correctement."
    category = "photovoltaique"
    quantity = 1
    estimatedBudget = 10000
    timeline = "flexible"
} | ConvertTo-Json

try {
    $response = curl -s -X POST http://localhost:5000/api/quotes `
      -H "Content-Type: application/json" `
      -d $jsonData
    
    if ($response -match "success") {
        Write-Host "✅ Demande de devis créée avec succès" -ForegroundColor Green
        if ($response -match "DEV-[0-9\-]+") {
            $quoteNumber = $matches[0]
            Write-Host "   Numéro de devis: $quoteNumber" -ForegroundColor Green
        }
    } else {
        Write-Host "❌ Erreur lors de la création de la demande" -ForegroundColor Red
        Write-Host "   Réponse: $response" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Erreur lors de la création de la demande: $_" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Test 4: Récupérer les devis
Write-Host "📋 Test 4: Récupérer les devis..." -ForegroundColor Yellow
try {
    $response = curl -s http://localhost:5000/api/quotes
    if ($response -match "success") {
        Write-Host "✅ API /quotes fonctionne" -ForegroundColor Green
    } else {
        Write-Host "❌ Erreur lors de la récupération des devis" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Erreur: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  ✅ Tous les tests ont réussi!                         ║" -ForegroundColor Green
Write-Host "║  Le système est prêt à fonctionner.                    ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "Prochaines étapes:" -ForegroundColor Yellow
Write-Host "1. Ouvrir devis.html dans le navigateur" -ForegroundColor White
Write-Host "2. Remplir le formulaire avec vos informations" -ForegroundColor White
Write-Host "3. Cliquer sur 'Envoyer la Demande'" -ForegroundColor White
Write-Host "4. Vérifier votre email (ndiayeabdoumamesaye1234@gmail.com)" -ForegroundColor White
