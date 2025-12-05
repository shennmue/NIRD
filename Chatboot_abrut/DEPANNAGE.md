# 🔧 Guide de Dépannage - Professeur Absurde

## ⚡ Solution Rapide

1. **Ouvrez** [test-api.html](test-api.html) dans votre navigateur
2. **Cliquez** sur "Vérifier Config" → Vérifier que la clé est détectée
3. **Cliquez** sur "Tester l'API" → Vérifier que ça fonctionne
4. Si ça marche → Ouvrez [index.html](index.html) et amusez-vous !
5. Si ça ne marche pas → Lisez ci-dessous

## 🔴 Erreur "Erreur API"

### Causes Possibles

#### 1. Clé API Invalide ou Expirée
**Symptômes** : Erreur 401, "Authentication failed"

**Solution** :
```
1. Allez sur https://console.groq.com
2. Connectez-vous à votre compte
3. Allez dans "API Keys"
4. Supprimez l'ancienne clé
5. Créez une nouvelle clé ("Create API Key")
6. Copiez la NOUVELLE clé (commence par "gsk_")
7. Ouvrez config.js
8. Remplacez l'ancienne clé par la nouvelle
9. Sauvegardez
10. Rechargez la page (F5)
```

#### 2. Limite de Requêtes Atteinte
**Symptômes** : Erreur 429, "Rate limit exceeded"

**Solution Option A** (Attendre) :
```
Attendez 1 heure et réessayez
Groq réinitialise les limites toutes les heures
```

**Solution Option B** (Nouveau compte) :
```
1. Déconnectez-vous de console.groq.com
2. Créez un nouveau compte avec un autre email
3. Générez une nouvelle clé API
4. Mettez-la dans config.js
```

#### 3. Problème de Connexion
**Symptômes** : "Failed to fetch", "Network error"

**Solution** :
```
1. Vérifiez votre connexion Internet
2. Désactivez votre bloqueur de publicités
3. Désactivez votre VPN (si actif)
4. Essayez un autre navigateur
5. Si vous êtes sur un réseau d'entreprise/école :
   → Le firewall bloque peut-être l'API
   → Essayez avec votre connexion mobile
```

#### 4. Problème CORS
**Symptômes** : "CORS policy blocked", erreur dans la console

**Solution** :
```
Option A - Serveur local simple :
1. Installez Python (si pas déjà installé)
2. Ouvrez un terminal dans le dossier du projet
3. Lancez : python -m http.server 8000
4. Ouvrez : http://localhost:8000

Option B - Extension navigateur :
1. Installez "Allow CORS" sur Chrome/Firefox
2. Activez l'extension
3. Rechargez la page

Option C - Utilisez Firefox :
Firefox est généralement moins strict sur CORS
```

## 🔍 Diagnostic Étape par Étape

### Étape 1 : Vérifier la Clé API

Ouvrez [config.js](config.js) et vérifiez :

```javascript
const CONFIG = {
    GROQ_API_KEY: 'gsk_...'  // ← Doit commencer par "gsk_"
};
```

✅ **BON** : `'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'`
❌ **MAUVAIS** : `'VOTRE_CLE_API_ICI'`
❌ **MAUVAIS** : `''` (vide)
❌ **MAUVAIS** : `'sk_...'` (mauvais préfixe)

### Étape 2 : Tester avec test-api.html

1. Ouvrez [test-api.html](test-api.html)
2. Ouvrez la console du navigateur (F12)
3. Cliquez sur "Tester l'API"
4. Regardez le résultat

**Si ça marche** → Votre config est bonne !
**Si erreur** → Lisez le message d'erreur

### Étape 3 : Vérifier la Console Navigateur

Ouvrez la console (F12) et cherchez :

**Erreurs courantes** :
```
❌ "CONFIG is not defined" → config.js pas chargé
❌ "401 Unauthorized" → Clé API invalide
❌ "429 Too Many Requests" → Limite atteinte
❌ "Failed to fetch" → Problème réseau/CORS
```

## 🆘 Solutions Alternatives

### Option 1 : Nouvelle Clé API (Recommandé)

La clé peut expirer ou être révoquée. **Générez-en une nouvelle** :

1. https://console.groq.com
2. API Keys → Create API Key
3. Copiez la clé
4. Remplacez dans config.js
5. Rechargez (F5)

### Option 2 : Vérifier l'État de l'API

Vérifiez si Groq fonctionne :
- Allez sur https://status.groq.com
- Vérifiez qu'il n'y a pas de panne

### Option 3 : Compte Différent

Si votre compte a un problème :
1. Créez un nouveau compte Groq
2. Nouvelle clé API
3. Mettez dans config.js

## 📞 Messages d'Erreur Spécifiques

### "Erreur : Aucune clé API configurée"
```
→ Ouvrez config.js
→ Ajoutez votre clé Groq
→ Sauvegardez
→ Rechargez la page
```

### "🔐 Erreur d'authentification API"
```
→ Votre clé est invalide ou expirée
→ Générez une nouvelle clé
→ Remplacez dans config.js
```

### "⚠️ Limite API atteinte"
```
→ Vous avez trop de requêtes
→ Attendez 1 heure OU
→ Créez un nouveau compte
```

### "🌐 Erreur de connexion"
```
→ Vérifiez Internet
→ Désactivez bloqueur de pub
→ Essayez autre navigateur
→ Testez avec serveur local
```

## ✅ Checklist de Vérification

Avant de demander de l'aide, vérifiez :

- [ ] J'ai une clé API Groq valide
- [ ] La clé est dans config.js
- [ ] La clé commence par "gsk_"
- [ ] J'ai sauvegardé config.js
- [ ] J'ai rechargé la page (F5)
- [ ] Ma connexion Internet fonctionne
- [ ] Pas de bloqueur de pub actif
- [ ] J'ai testé avec test-api.html
- [ ] J'ai regardé la console (F12)
- [ ] L'API Groq n'est pas en panne

## 🎯 Test Final

Si tout semble bon mais ça ne marche toujours pas :

1. **Fermez** complètement le navigateur
2. **Rouvrez** le navigateur
3. **Ouvrez** test-api.html
4. **Cliquez** "Test Complet"
5. Si ✅ → Ouvrez index.html
6. Si ❌ → Nouvelle clé API

## 💡 Astuces

### Astuce 1 : Cache Navigateur
Parfois le navigateur garde l'ancien fichier en cache :
```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### Astuce 2 : Mode Incognito
Testez en mode navigation privée :
```
Ctrl + Shift + N (Chrome)
Ctrl + Shift + P (Firefox)
```

### Astuce 3 : Plusieurs Onglets
Ne laissez pas trop d'onglets ouverts avec le chatbot, ça consomme des requêtes API.

## 🆘 Toujours Pas Résolu ?

Si après TOUTES ces étapes ça ne marche toujours pas :

1. **Capturez** un screenshot de l'erreur
2. **Copiez** le message d'erreur complet
3. **Notez** ce que vous avez déjà essayé
4. **Vérifiez** que status.groq.com est vert

## 📊 Statistiques API Groq

**Limites gratuites** :
- 14,400 requêtes par jour
- 30 requêtes par minute
- Modèle Llama 3.1 70B inclus

**Si vous dépassez** :
- Créez un nouveau compte (gratuit)
- Ou attendez que ça se réinitialise

---

**90% des problèmes sont résolus en générant une nouvelle clé API !** 🔑
