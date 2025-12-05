# 🚀 Guide d'Installation de l'API Groq

Ce guide vous explique comment obtenir et configurer votre clé API Groq **gratuitement** pour que le Professeur Absurde utilise l'IA !

## 📋 Pourquoi utiliser l'API ?

Sans API, le chatbot utilise des réponses prédéfinies aléatoires.
**Avec l'API**, chaque réponse est générée par une IA en rapport avec votre question = beaucoup plus drôle et impressionnant !

## 🔑 Étape 1: Créer un compte Groq (GRATUIT)

1. Allez sur [https://console.groq.com](https://console.groq.com)
2. Cliquez sur "Sign Up" (ou "Get Started")
3. Créez un compte avec:
   - Votre email
   - Ou connectez-vous avec Google/GitHub

**C'est 100% gratuit !** Groq offre:
- ✅ Jusqu'à 14,400 requêtes par jour
- ✅ Accès au modèle Llama 3.1 70B
- ✅ Réponses ultra-rapides (< 1 seconde)
- ✅ Aucune carte bancaire requise

## 🔐 Étape 2: Générer votre clé API

1. Une fois connecté, allez dans la section **"API Keys"** (dans le menu de gauche)
2. Cliquez sur **"Create API Key"**
3. Donnez un nom à votre clé, par exemple: "Professeur-Absurde"
4. Cliquez sur **"Submit"**
5. **IMPORTANT**: Copiez immédiatement votre clé API !
   - Elle commence par `gsk_...`
   - Vous ne pourrez plus la voir après avoir fermé la fenêtre
   - Si vous la perdez, créez-en simplement une nouvelle

## ⚙️ Étape 3: Configurer le projet

1. Ouvrez le fichier `config.js` dans un éditeur de texte
2. Remplacez `'VOTRE_CLE_API_ICI'` par votre vraie clé API

**Avant:**
```javascript
const CONFIG = {
    GROQ_API_KEY: 'VOTRE_CLE_API_ICI',
};
```

**Après:**
```javascript
const CONFIG = {
    GROQ_API_KEY: 'gsk_abc123def456...votre_cle_ici',
};
```

3. Sauvegardez le fichier

## 🎉 Étape 4: Tester

1. Ouvrez `index.html` dans votre navigateur
2. Posez une question au Professeur Absurde
3. Si l'API fonctionne, la réponse sera contextuelle et unique !

**Pour vérifier que l'API est active:**
- Ouvrez la Console du navigateur (F12)
- Si vous voyez "Clé API non configurée", c'est que la clé n'est pas correctement configurée
- Si vous ne voyez aucun message d'erreur et que les réponses sont variées, ça marche ! 🎉

## ❌ Dépannage

### La clé API ne fonctionne pas ?

1. **Vérifiez que vous avez bien copié TOUTE la clé** (elle fait environ 50 caractères)
2. **Vérifiez qu'il n'y a pas d'espaces** avant ou après la clé
3. **Vérifiez que vous avez sauvegardé le fichier** config.js
4. **Rechargez la page** avec Ctrl+F5 (ou Cmd+Shift+R sur Mac)

### Erreur "API Error: 401" ?

Votre clé API est invalide ou expirée. Créez-en une nouvelle sur console.groq.com

### Erreur "API Error: 429" ?

Vous avez dépassé la limite de requêtes (14,400/jour). Réessayez demain ou créez un nouveau compte.

### Le chatbot répond mais pas en rapport avec mes questions ?

L'API n'est probablement pas configurée. Le chatbot utilise alors les réponses prédéfinies.

## 🔒 Sécurité

**IMPORTANT**: Ne partagez JAMAIS votre clé API publiquement !

- ❌ Ne la commitez pas sur GitHub
- ❌ Ne la montrez pas dans des screenshots
- ❌ Ne la partagez pas dans des forums

Si votre clé est compromise:
1. Allez sur console.groq.com
2. Supprimez l'ancienne clé
3. Créez-en une nouvelle

## 🆓 Mode Sans API

Si vous ne voulez pas utiliser l'API, pas de problème !

- Laissez simplement `GROQ_API_KEY: ''` vide dans config.js
- Le chatbot fonctionnera quand même avec 80+ réponses prédéfinies
- C'est juste un peu moins drôle car les réponses ne sont pas en rapport avec vos questions

## 📊 Limites Gratuites

Avec le compte gratuit Groq:
- **14,400 requêtes/jour** = ~600 requêtes/heure
- **Largement suffisant** pour le défi et les tests
- Si vous dépassez, ça repasse à 0 le lendemain

## 💡 Astuces

1. **Pour les tests**: Créez plusieurs clés API pour avoir des backups
2. **Pour la démo**: L'API Groq est ultra-rapide, les réponses arrivent en moins d'1 seconde
3. **Pour le défi**: Mentionnez dans votre présentation que vous utilisez une vraie IA !

---

Besoin d'aide ? Consultez la [documentation officielle Groq](https://console.groq.com/docs)
