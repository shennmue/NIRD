# Guide des Images - Decathlon AI Sport Coach

## 📁 Structure des Dossiers

```
Decatlon/
├── images/
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
│   ├── default-exercise.png (optionnel)
│   └── products/
│       └── (images des produits)
```

## 🎯 Images d'Exercices Requises

### Cardio & Perte de Poids

| Fichier | Description | Dimensions recommandées |
|---------|-------------|------------------------|
| `burpees.png` | Illustration du burpee complet | 800x600px |
| `jump-rope.png` | Personne faisant de la corde à sauter | 800x600px |
| `mountain-climbers.png` | Position mountain climbers | 800x600px |
| `high-knees.png` | Course avec genoux hauts | 800x600px |
| `jumping-jacks.png` | Jumping jacks en action | 800x600px |
| `sprint-intervals.png` | Sprint ou course rapide | 800x600px |
| `course-a-pied.png` | Course à pied classique | 800x600px |

### Force & Musculation

| Fichier | Description | Dimensions recommandées |
|---------|-------------|------------------------|
| `pompes.png` | Position de pompes correcte | 800x600px |
| `squats.png` | Squat avec bonne posture | 800x600px |
| `planche.png` | Position de planche/gainage | 800x600px |
| `dips.png` | Exercice de dips | 800x600px |

### Souplesse & Yoga

| Fichier | Description | Dimensions recommandées |
|---------|-------------|------------------------|
| `yoga.png` | Posture de yoga (salutation au soleil) | 800x600px |
| `etirements-jambes.png` | Étirement des ischio-jambiers | 800x600px |
| `pigeon-pose.png` | Posture du pigeon (yoga) | 800x600px |
| `cat-cow-stretch.png` | Chat-vache (yoga) | 800x600px |

### Cardio Vélo

| Fichier | Description | Dimensions recommandées |
|---------|-------------|------------------------|
| `velo.png` | Personne sur un vélo | 800x600px |

### Image par Défaut

| Fichier | Description | Dimensions recommandées |
|---------|-------------|------------------------|
| `default-exercise.png` | Image générique si pas de correspondance | 800x600px |

## 🔗 Liens Produits Decathlon Associés

Chaque exercice est automatiquement lié à un produit Decathlon spécifique:

| Exercice | Produit Recommandé | Lien |
|----------|-------------------|------|
| Burpees | Tapis de Fitness | https://www.decathlon.fr/p/tapis-de-fitness/_/R-p-105311 |
| Jump Rope | Corde à Sauter | https://www.decathlon.fr/p/corde-a-sauter/_/R-p-2184 |
| Mountain Climbers | Tapis de Yoga | https://www.decathlon.fr/p/tapis-de-yoga/_/R-p-301551 |
| High Knees | Chaussures Fitness | https://www.decathlon.fr/p/chaussures-fitness-cardio-training/_/R-p-300799 |
| Pompes | Supports Pompes | https://www.decathlon.fr/p/supports-pompes/_/R-p-301845 |
| Squats | Haltères | https://www.decathlon.fr/p/halteres/_/R-p-1656 |
| Planche | Tapis de Fitness | https://www.decathlon.fr/p/tapis-de-fitness/_/R-p-105311 |
| Dips | Barres Parallèles | https://www.decathlon.fr/p/barres-de-traction/_/R-p-2317 |
| Course à Pied | Chaussures Running | https://www.decathlon.fr/p/chaussures-running/_/R-p-105307 |
| Jumping Jacks | Tenue Fitness | https://www.decathlon.fr/p/tenue-fitness-cardio/_/R-p-300800 |
| Sprint Intervals | Chaussures Sprint | https://www.decathlon.fr/p/chaussures-athletisme/_/R-p-2239 |
| Vélo | Vélo | https://www.decathlon.fr/p/velos/_/R-p-105251 |
| Yoga | Tapis de Yoga | https://www.decathlon.fr/p/tapis-de-yoga/_/R-p-301551 |
| Étirements Jambes | Sangle de Yoga | https://www.decathlon.fr/p/sangle-de-yoga/_/R-p-301553 |
| Pigeon Pose | Bloc de Yoga | https://www.decathlon.fr/p/bloc-de-yoga/_/R-p-301552 |
| Cat-Cow Stretch | Tapis de Yoga | https://www.decathlon.fr/p/tapis-de-yoga/_/R-p-301551 |

## 🤖 Comment ça fonctionne ?

### 1. Reconnaissance Intelligente des Noms

L'IA peut générer différentes variantes de noms d'exercices. Le système utilise un **switch-case intelligent** pour faire correspondre automatiquement:

**Exemples de correspondances:**
- "Push-ups" → `pompes.png`
- "Running" → `course-a-pied.png`
- "Cycling" → `velo.png`
- "Sun Salutation" → `yoga.png`
- "Hamstring Stretch" → `etirements-jambes.png`

### 2. Affichage Automatique

Quand l'IA recommande un exercice:
1. ✅ Le nom est analysé et normalisé
2. ✅ L'image correspondante est trouvée dans `/images/`
3. ✅ Le lien produit Decathlon est ajouté automatiquement
4. ✅ Un bouton "🛒 [Produit]" apparaît sur la carte

### 3. Gestion des Erreurs

Si une image n'est pas trouvée:
- 🎯 Un émoji 💪 s'affiche à la place
- 🎯 L'application continue de fonctionner normalement
- 🎯 Le lien produit reste accessible

## 📝 Comment Ajouter vos Images

### Option 1: Télécharger depuis le site Decathlon
```bash
# Exemples d'images à chercher:
- Photos d'exercices depuis le blog Decathlon
- Illustrations des fiches exercices
- Captures d'écran des vidéos YouTube Decathlon
```

### Option 2: Créer vos propres images
```bash
# Utilisez:
- Canva (templates fitness gratuits)
- Figma (design personnalisé)
- Photos personnelles (haute qualité)
- Illustrations vectorielles
```

### Option 3: Images libres de droits
```bash
# Sites recommandés:
- Pexels (https://www.pexels.com/search/fitness/)
- Unsplash (https://unsplash.com/s/photos/exercise)
- Pixabay (https://pixabay.com/images/search/workout/)
```

## 🎨 Spécifications Techniques

### Format
- ✅ **Format recommandé:** PNG (transparent ou fond uni)
- ✅ **Alternatif:** JPG (si pas besoin de transparence)

### Dimensions
- ✅ **Largeur:** 800px minimum
- ✅ **Hauteur:** 600px minimum
- ✅ **Ratio:** 4:3 ou 16:9
- ✅ **Poids:** < 500KB par image

### Qualité
- ✅ Haute résolution (72-150 DPI)
- ✅ Bonne luminosité
- ✅ Contraste élevé
- ✅ Sujet bien cadré et centré

## 🚀 Test Rapide

Pour tester si vos images fonctionnent:

1. Placez vos images PNG dans `/images/`
2. Ouvrez `index.html` dans votre navigateur
3. Complétez le questionnaire
4. Vérifiez que les images s'affichent correctement
5. Cliquez sur les boutons "🛒 [Produit]" pour vérifier les liens

## 💡 Astuces Pro

### Pour de meilleures images:
1. **Utilisez un fond neutre** (blanc ou dégradé bleu Decathlon)
2. **Montrez la position complète** de l'exercice
3. **Ajoutez des flèches ou annotations** si nécessaire
4. **Optimisez la taille** avec TinyPNG ou Squoosh
5. **Testez sur mobile** pour vérifier la lisibilité

### Naming des fichiers:
- ✅ Utilisez des **tirets** pour les espaces: `course-a-pied.png`
- ✅ Tout en **minuscules**
- ✅ **Pas d'accents** dans les noms de fichiers (sauf si spécifié)
- ✅ **Extension en minuscules:** `.png` ou `.jpg`

## 🔄 Mise à Jour des Liens Produits

Pour modifier les liens Decathlon dans le code, éditez `script.js`:

```javascript
const EXERCISE_DATABASE = {
    'burpees': {
        image: 'burpees.png',
        productLink: 'VOTRE_NOUVEAU_LIEN',  // ← Modifiez ici
        productName: 'Votre Produit'
    },
    // ...
};
```

## 📞 Support

Si vous avez des questions:
1. Consultez la console du navigateur (F12) pour voir les erreurs
2. Vérifiez que les noms de fichiers correspondent exactement
3. Assurez-vous que les images sont dans le bon dossier

---

**Note:** L'application fonctionnera même sans images, grâce au système de fallback avec emojis. Mais les images rendent l'expérience beaucoup plus professionnelle et engageante! 💪
