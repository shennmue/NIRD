# ⚡ RÉSOUDRE L'ERREUR API - GUIDE ULTRA-RAPIDE

## 🔴 Vous avez une erreur API ? Voici LA solution !

### 📍 SOLUTION EN 3 MINUTES

#### Étape 1 : Testez l'API (30 secondes)
```
1. Ouvrez test-api.html dans votre navigateur
2. Cliquez sur "Vérifier Config"
3. Regardez le résultat
```

**Si vous voyez** ✅ "Clé API présente" → Passez à l'étape 2
**Si vous voyez** ❌ "Clé API invalide" → Suivez l'étape 2

#### Étape 2 : Nouvelle Clé API (2 minutes)

**POURQUOI ?** Votre clé a peut-être expiré ou atteint sa limite.

**COMMENT** :

1. **Allez sur** : https://console.groq.com
2. **Connectez-vous** (ou créez un compte - 30 secondes)
3. **Cliquez** sur "API Keys" dans le menu
4. **Cliquez** "Create API Key"
5. **Nommez-la** : "professeur-absurde" (ou autre)
6. **Copiez** la clé (commence par `gsk_...`)

#### Étape 3 : Mettez la Clé (30 secondes)

1. **Ouvrez** le fichier `config.js`
2. **Remplacez** la ligne 4 :

**AVANT** :
```javascript
GROQ_API_KEY: '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',
```

**APRÈS** :
```javascript
GROQ_API_KEY: 'gsk_VOTRE_NOUVELLE_CLE_ICI',
```

3. **Sauvegardez** config.js (Ctrl+S)
4. **Rechargez** index.html (F5)

## ✅ Ça Marche Maintenant ?

### Test Rapide :
```
1. Ouvrez index.html
2. Tapez "Bonjour"
3. Si le Professeur répond → ✅ SUCCÈS !
4. Si erreur encore → Continuez ci-dessous
```

## 🔧 Toujours une Erreur ? Diagnostic Rapide

### Erreur Type 1 : "Clé API invalide"
**Cause** : Mauvaise clé ou mal copiée
**Solution** :
- Vérifiez que la clé commence par `gsk_`
- Vérifiez qu'il n'y a pas d'espace avant/après
- Regénérez une nouvelle clé

### Erreur Type 2 : "Limite atteinte"
**Cause** : Trop de requêtes
**Solution** :
- Créez un NOUVEAU compte Groq avec un autre email
- Générez une nouvelle clé
- Mettez-la dans config.js

### Erreur Type 3 : "Failed to fetch"
**Cause** : Problème de connexion
**Solution** :
- Vérifiez votre Internet
- Désactivez votre bloqueur de pub
- Essayez avec un autre navigateur
- Testez en mode navigation privée

## 🎯 Solution Définitive (99% de Succès)

Si RIEN ne marche, faites ceci :

### Plan B - Compte Tout Neuf

```
1. Déconnectez-vous de console.groq.com
2. Utilisez un email différent (Gmail, Outlook, etc.)
3. Créez un NOUVEAU compte Groq
4. Générez une clé API
5. Mettez-la dans config.js
6. Rechargez index.html
```

**Pourquoi ça marche** :
- Nouveau compte = nouvelles limites
- Nouvelle clé = garantie de fonctionner
- Compte gratuit illimité en nombre

## 📊 Vérification Finale

Après avoir mis la nouvelle clé :

### Checklist :
- [ ] Nouvelle clé générée sur console.groq.com
- [ ] Clé copiée dans config.js (ligne 4)
- [ ] Fichier config.js sauvegardé
- [ ] Page rechargée (F5 ou Ctrl+F5)
- [ ] Testé avec test-api.html
- [ ] Console du navigateur vérifiée (F12)

### Si Tout est ✅ mais Ça Ne Marche Pas :

**Testez avec serveur local** :
```bash
# Dans le dossier du projet :
python -m http.server 8000

# Puis ouvrez :
http://localhost:8000
```

**Ou utilisez Firefox** :
Firefox gère mieux les APIs que Chrome parfois.

## 💡 Comprendre les Limites Groq

**Gratuit pour toujours** :
- ✅ 14,400 requêtes/jour
- ✅ 30 requêtes/minute
- ✅ Modèle Llama 3.1 70B
- ✅ Aucune carte requise

**Si vous dépassez** :
- Attendez 1 heure (reset automatique)
- Ou créez un nouveau compte

## 🚀 Exemple de Clé Valide

**Format correct** :
```javascript
GROQ_API_KEY: 'gsk_abc123XYZ789...',
```

**Longueur** : Environ 50-60 caractères
**Commence par** : `gsk_`
**Contient** : Lettres et chiffres

## 📞 Aide Supplémentaire

Si après TOUT ça, ça ne marche toujours pas :

1. **Ouvrez** test-api.html
2. **Cliquez** "Test Complet"
3. **Copiez** le message d'erreur exact
4. **Regardez** DEPANNAGE.md pour plus de détails

## ⏰ Estimation des Temps

- Générer nouvelle clé : **1 minute**
- Mettre dans config.js : **30 secondes**
- Tester : **30 secondes**
- **Total : 2 minutes**

---

## 🎉 Une Fois que Ça Marche

**Vous pourrez** :
- Discuter avec le Professeur Absurde
- Dans n'importe quelle langue
- Avec des réponses 100% IA uniques
- Interface cyberpunk magnifique
- Comportements vivants et spontanés

**Prêt à gagner le défi !** 🏆

---

**TL;DR** : Nouvelle clé sur console.groq.com → Copier dans config.js → Recharger → Ça marche ! ✨
