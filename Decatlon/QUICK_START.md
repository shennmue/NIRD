# 🚀 Quick Start - Decathlon AI Sport Coach

## ⚡ Démarrage Ultra-Rapide (2 minutes)

### Étape 1: Configurez votre clé API Groq (30 secondes)

1. Allez sur **https://console.groq.com/**
2. Créez un compte gratuit (si nécessaire)
3. Copiez votre clé API
4. Ouvrez `config.js` et collez votre clé:

```javascript
const CONFIG = {
    GROQ_API_KEY: 'gsk_VOTRE_CLE_ICI',  // ← Collez votre clé ici
    // ...
};
```

**✅ Votre API est configurée déjà avec votre clé!**

### Étape 2: Testez l'application (30 secondes)

1. Double-cliquez sur `index.html`
2. Remplissez le questionnaire
3. Admirez la magie de l'IA! 🤖

**L'application fonctionne maintenant avec l'IA Groq!**

### Étape 3 (Optionnel): Ajoutez les images (1 minute)

Pour une expérience visuelle parfaite:

1. Créez le dossier `images/` à la racine
2. Téléchargez ou créez 16 images d'exercices
3. Nommez-les selon la liste ci-dessous

**📋 Liste des images requises:**
```
images/
├── burpees.png
├── jump-rope.png
├── mountain-climbers.png
├── high-knees.png
├── pompes.png
├── squats.png
├── planche.png
├── dips.png
├── course-a-pied.png
├── jumping-jacks.png
├── sprint-intervals.png
├── velo.png
├── yoga.png
├── etirements-jambes.png
├── pigeon-pose.png
└── cat-cow-stretch.png
```

**💡 Astuce:** Même sans images, l'app fonctionne avec des emojis stylés!

---

## 🎯 Ce que fait l'application

### Flux utilisateur:

```
1️⃣ Questionnaire (5 questions)
         ↓
2️⃣ IA Groq analyse le profil
         ↓
3️⃣ Génération de 4 exercices personnalisés
         ↓
4️⃣ Matching automatique avec images statiques
         ↓
5️⃣ Ajout des liens produits Decathlon
         ↓
6️⃣ Recommandation de 6-8 produits par IA
```

### Technologies utilisées:

- ✅ **Groq AI** (Mixtral-8x7b) - Intelligence artificielle ultra-rapide
- ✅ **HTML5 + CSS3** - Design moderne glassmorphism
- ✅ **JavaScript ES6+** - Logique client-side
- ✅ **Fetch API** - Communication avec Groq
- ✅ **Switch-case intelligent** - Mapping exercices/images

---

## 🔧 Fichiers Importants

| Fichier | Rôle | À modifier? |
|---------|------|-------------|
| `config.js` | Configuration API | ✅ **OUI** (clé API déjà ajoutée) |
| `index.html` | Structure de la page | ❌ Non |
| `styles.css` | Design moderne | ❌ Non (sauf personnalisation) |
| `script.js` | Logique IA + mapping | ❌ Non |
| `images/` | Images d'exercices | ✅ **OUI** (ajoutez les 16 PNG) |

---

## 🎨 Personnalisation Rapide

### Changer les couleurs Decathlon:

Éditez `styles.css` ligne 2-10:

```css
:root {
    --primary-blue: #0082c3;    /* ← Bleu principal */
    --accent-orange: #ff6b35;   /* ← Orange accent */
    --accent-green: #00d9a3;    /* ← Vert succès */
}
```

### Ajouter un nouvel exercice:

Éditez `script.js` ligne 10-91:

```javascript
const EXERCISE_DATABASE = {
    'mon-exercice': {
        image: 'mon-exercice.png',
        productLink: 'https://www.decathlon.fr/mon-produit',
        productName: 'Mon Produit'
    },
    // ...
};
```

Puis ajoutez le matching ligne 514-593:

```javascript
case /mon.*exercice|my.*exercise/i.test(normalizedName):
    return 'mon-exercice';
```

---

## 📚 Documentation Complète

- **README.md** - Documentation générale et fonctionnalités
- **IMAGES_GUIDE.md** - Guide complet des images et dimensions
- **QUICK_START.md** - Ce fichier (démarrage rapide)

---

## ⚠️ Résolution de Problèmes

### L'IA ne répond pas?

✅ **Solution:** Vérifiez votre clé API dans `config.js`
- Ouvrez la console (F12) pour voir les erreurs
- Vérifiez que la clé commence par `gsk_`

### Les images ne s'affichent pas?

✅ **Solution:** Vérifiez les noms de fichiers
- Les noms doivent être en **minuscules**
- Utilisez des **tirets** pour les espaces
- Extension en **.png** (minuscule)

### CORS Error?

✅ **Solution:**
- Ouvrez `index.html` directement dans le navigateur
- Ou utilisez un serveur local: `python -m http.server 8000`

---

## 🎉 C'est Prêt!

Votre application Decathlon AI Sport Coach est maintenant opérationnelle!

### Pour aller plus loin:

1. 📸 Ajoutez de vraies photos d'exercices professionnelles
2. 🎨 Personnalisez les couleurs selon votre charte
3. 🔗 Mettez à jour les liens Decathlon avec les vrais produits
4. 📱 Testez sur mobile et tablette
5. 🚀 Déployez sur un serveur web (Netlify, Vercel, etc.)

**Bon coaching sportif! 💪**

---

*Créé avec ❤️ pour Decathlon - Propulsé par Groq AI*
