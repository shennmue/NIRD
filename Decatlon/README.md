# Decathlon AI Sport Coach - Application Web

Application web interactive **propulsée par l'IA Groq** sponsorisée par Decathlon qui aide les utilisateurs à découvrir leur profil sportif, obtenir des recommandations d'exercices personnalisés par intelligence artificielle et trouver les produits Decathlon adaptés.

## ✨ Fonctionnalités

### 1. 🤖 Intelligence Artificielle Groq
- **Analyse personnalisée** du profil utilisateur en temps réel
- **Génération dynamique** d'exercices adaptés à chaque profil
- **Insights AI** sur vos objectifs et habitudes sportives
- **Recommandations produits** intelligentes basées sur vos exercices

### 2. 📋 Questionnaire Sportif (QCM)
- 5 questions pour déterminer le profil utilisateur:
  - Fréquence d'entraînement par semaine
  - Durée des séances
  - Niveau sportif
  - Objectifs (perte de poids, prise de muscle, cardio, souplesse)
  - Lieu d'entraînement préféré

### 3. 💪 Recommandations d'Exercices
- **4 exercices personnalisés** générés par l'IA
- **Images statiques** automatiquement associées (16 exercices disponibles)
- **Liens directs** vers les produits Decathlon nécessaires
- Instructions détaillées pour chaque exercice
- Informations sur la durée et le niveau
- **Bouton d'achat** sur chaque exercice

### 4. 🛒 Produits Decathlon Intelligents
- Suggestions de 6-8 produits basées sur vos exercices
- Prix, descriptions et évaluations générés par IA
- Liens directs vers Decathlon.fr
- Badge "Recommandé" sur les produits prioritaires

## 🎨 Design Moderne

- **Glassmorphism** - Effet de verre dépoli moderne
- **Animations fluides** - Transitions et effets visuels
- **Particules animées** - Fond dynamique et interactif
- **Design responsive** - Fonctionne sur mobile, tablette et desktop
- **Barre de progression** - Visualisation de l'avancement
- **Loading AI** - Animations pendant le traitement IA
- **Dégradés colorés** - Palette Decathlon moderne

## 📁 Structure du Projet

```
Decatlon/
├── index.html          # Page principale avec structure moderne
├── styles.css          # Styles ultra-modernes avec animations
├── script.js           # Logique IA + Mapping exercices
├── config.js           # Configuration API Groq (⚠️ AJOUTEZ VOTRE CLÉ ICI)
├── README.md           # Ce fichier
├── IMAGES_GUIDE.md     # Guide complet des images
├── images/             # Images des exercices (16 exercices)
│   ├── burpees.png
│   ├── jump-rope.png
│   ├── mountain-climbers.png
│   ├── high-knees.png
│   ├── pompes.png
│   ├── squats.png
│   ├── planche.png
│   ├── dips.png
│   ├── course-a-pied.png
│   ├── jumping-jacks.png
│   ├── sprint-intervals.png
│   ├── velo.png
│   ├── yoga.png
│   ├── etirements-jambes.png
│   ├── pigeon-pose.png
│   ├── cat-cow-stretch.png
│   └── products/       # Images des produits (optionnel)
```

## 🚀 Installation et Configuration

### 1. Configuration de l'API Groq (IMPORTANT!)

**Vous DEVEZ ajouter votre clé API Groq pour que l'IA fonctionne:**

1. Obtenez une clé API gratuite sur: **https://console.groq.com/**
2. Ouvrez le fichier `config.js`
3. Remplacez `YOUR_GROQ_API_KEY_HERE` par votre vraie clé API

```javascript
const CONFIG = {
    GROQ_API_KEY: 'gsk_VotreCléAPIIci...', // ← METTEZ VOTRE CLÉ ICI
    GROQ_API_URL: 'https://api.groq.com/openai/v1/chat/completions',
    MODEL: 'mixtral-8x7b-32768'
};
```

### 2. Ajout des Images

📖 **Consultez [IMAGES_GUIDE.md](IMAGES_GUIDE.md) pour le guide complet des images**

Liste des 16 images d'exercices à placer dans `/images/`:
- ✅ burpees.png
- ✅ jump-rope.png
- ✅ mountain-climbers.png
- ✅ high-knees.png
- ✅ pompes.png
- ✅ squats.png
- ✅ planche.png
- ✅ dips.png
- ✅ course-a-pied.png
- ✅ jumping-jacks.png
- ✅ sprint-intervals.png
- ✅ velo.png
- ✅ yoga.png
- ✅ etirements-jambes.png
- ✅ pigeon-pose.png
- ✅ cat-cow-stretch.png

**Note:** L'application fonctionne sans images (emojis en fallback), mais les images sont fortement recommandées pour une meilleure expérience!

### 3. Lancement

Ouvrez simplement `index.html` dans votre navigateur moderne (Chrome, Firefox, Safari, Edge).

Aucun serveur web n'est requis pour la version de base!

## 🤖 Comment ça Marche?

### Système de Mapping Intelligent

L'IA Groq génère des noms d'exercices en français. Notre système utilise un **switch-case intelligent** pour:

1. **Analyser** le nom généré par l'IA (ex: "Pompes", "Push-ups", "Presse")
2. **Matcher** automatiquement avec l'exercice correspondant
3. **Charger** l'image statique appropriée
4. **Ajouter** le lien produit Decathlon spécifique

**Exemple:**
```
IA génère: "Push-ups pour pectoraux"
    ↓
Système matche: "pompes"
    ↓
Charge: pompes.png
    ↓
Lien: https://www.decathlon.fr/p/supports-pompes/...
```

### Images de Produits (optionnel)

- `tapis-yoga.png` - Tapis de yoga
- `halteres.png` - Haltères
- `corde-sauter.png` - Corde à sauter
- `chaussures-running.png` - Chaussures de running
- `chaussures-training.png` - Chaussures de training
- `montre-cardio.png` - Montre cardio GPS
- `gourde.png` - Gourde de sport
- `tenue-sport.png` - Tenue de sport
- `barre-traction.png` - Barre de traction
- `bandes.png` - Bandes élastiques
- `proteine.png` - Protéines
- `bloc-yoga.png` - Bloc de yoga
- `sangle-yoga.png` - Sangle de yoga
- `vetement-yoga.png` - Vêtements de yoga
- `velo.png` - Vélo
- `casque.png` - Casque de vélo
- `genouilleres.png` - Genouillères
- `gants.png` - Gants de musculation
- `ab-wheel.png` - Roue abdominale
- `casquette.png` - Casquette de sport
- `short.png` - Short de running
- `cuissard.png` - Cuissard de vélo
- `coussin.png` - Coussin de méditation

## Comment Ajouter les Images

### Option 1: Captures PNG
1. Trouvez des images d'exercices et de produits Decathlon
2. Sauvegardez-les au format PNG
3. Nommez-les selon la liste ci-dessus
4. Placez-les dans les dossiers appropriés

### Option 2: Photos/Screenshots
- Vous pouvez utiliser des captures d'écran d'exercices
- Photos de produits du site Decathlon
- Illustrations dessinées
- Photos personnelles d'exercices

### Option 3: Placeholder
Si vous n'avez pas d'images maintenant, l'application affichera des emojis par défaut (📸 pour exercices, 🏃 pour produits).

## Installation et Lancement

1. Ouvrez simplement `index.html` dans votre navigateur
2. Pas besoin de serveur web pour la version de base
3. Pour un développement avancé, vous pouvez utiliser:
   ```bash
   # Avec Python
   python -m http.server 8000

   # Avec Node.js
   npx http-server
   ```

## Utilisation

1. **Remplir le questionnaire** - Répondez aux 5 questions sur vos habitudes sportives
2. **Voir les exercices** - Découvrez les exercices recommandés avec illustrations
3. **Découvrir les produits** - Cliquez sur "Découvrir les produits adaptés" pour voir les recommandations Decathlon
4. **Recommencer** - Utilisez le bouton "Recommencer" pour refaire le questionnaire

## Personnalisation

### Ajouter de Nouveaux Exercices
Modifiez l'objet `exercisesDatabase` dans `script.js`:

```javascript
'weight-loss': [
    {
        name: 'Nom de l\'exercice',
        description: 'Description',
        duration: 'Durée',
        level: 'beginner|intermediate|advanced',
        image: 'nom-image.png',
        category: 'Cardio|Force|Souplesse',
        relatedProducts: ['produit-1', 'produit-2']
    }
]
```

### Ajouter de Nouveaux Produits
Modifiez l'objet `productsDatabase` dans `script.js`:

```javascript
'id-produit': {
    name: 'Nom du produit',
    price: '29.99€',
    description: 'Description',
    rating: 4.5,
    image: 'image.png',
    link: 'https://www.decathlon.fr/...'
}
```

## Technologies Utilisées

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript Vanilla (ES6+)
- Design responsive

## Compatibilité

- Chrome, Firefox, Safari, Edge (versions récentes)
- Mobile, Tablette, Desktop
- Responsive design adaptatif

## Améliorations Futures Possibles

- [ ] Intégration API Decathlon pour produits réels
- [ ] Sauvegarde du profil utilisateur (localStorage)
- [ ] Vidéos d'exercices au lieu d'images statiques
- [ ] Plan d'entraînement personnalisé sur plusieurs semaines
- [ ] Suivi de progression
- [ ] Partage sur réseaux sociaux
- [ ] Version multilingue

## Licence

Application créée pour Decathlon - Tous droits réservés

## Contact

Pour toute question ou suggestion, contactez l'équipe de développement.

---

**Note:** Cette application est un prototype. Les liens vers les produits Decathlon sont des exemples et doivent être mis à jour avec les vraies URLs des produits.
