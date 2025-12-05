# 🔄 Exercise Mapping System - Technical Documentation

## Overview

This document explains how the intelligent exercise mapping system works to connect AI-generated exercise names with static images and Decathlon product links.

## Architecture Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER COMPLETES QCM                          │
│  (Frequency, Duration, Level, Goal, Location)                   │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                   GROQ AI PROCESSING                            │
│  Model: mixtral-8x7b-32768                                      │
│  Analyzes profile and generates 4 custom exercises              │
│                                                                 │
│  Output Example:                                                │
│  {                                                              │
│    "name": "Pompes avec variations",                           │
│    "description": "Exercice pour pectoraux...",                │
│    "duration": "4 séries de 12 répétitions",                   │
│    "level": "intermediate",                                    │
│    "category": "Force"                                         │
│  }                                                              │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│               EXERCISE NAME MATCHING                            │
│  Function: matchExerciseName(aiExerciseName)                   │
│                                                                 │
│  Step 1: Normalize                                             │
│    "Pompes avec variations" → "pompes avec variations"         │
│                                                                 │
│  Step 2: Direct Match Check                                    │
│    Check if exists in EXERCISE_DATABASE                        │
│                                                                 │
│  Step 3: Fuzzy Matching (Switch-Case)                         │
│    case /pompe|push.*up|presse/i.test(name):                  │
│        return 'pompes';                                        │
│                                                                 │
│  Result: "pompes"                                              │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│               RETRIEVE EXERCISE DATA                            │
│  Function: getExerciseData(exerciseName)                       │
│                                                                 │
│  Lookup in EXERCISE_DATABASE['pompes']:                        │
│  {                                                              │
│    image: 'pompes.png',                                        │
│    productLink: 'https://www.decathlon.fr/p/supports-pompes',│
│    productName: 'Supports Pompes'                             │
│  }                                                              │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│               CREATE EXERCISE CARD                              │
│  Function: createExerciseCard(exercise, index)                 │
│                                                                 │
│  ┌─────────────────────────────────────┐                      │
│  │  [Image: pompes.png]                │                      │
│  │                                      │                      │
│  │  Pompes avec variations              │                      │
│  │  [TAG: Force]                        │                      │
│  │                                      │                      │
│  │  Exercice pour pectoraux...         │                      │
│  │                                      │                      │
│  │  ⏱ 4 séries de 12 rép.  📊 Inter.  │                      │
│  │                                      │                      │
│  │  [🛒 Supports Pompes] ←─────────────┼─── LINK TO PRODUCT  │
│  └─────────────────────────────────────┘                      │
└─────────────────────────────────────────────────────────────────┘
```

## Exercise Database Structure

```javascript
const EXERCISE_DATABASE = {
    'exercise-key': {
        image: 'filename.png',        // Static image file
        productLink: 'https://...',   // Decathlon product URL
        productName: 'Product Name'    // Display name for button
    }
}
```

### Example Entry:

```javascript
'burpees': {
    image: 'burpees.png',
    productLink: 'https://www.decathlon.fr/p/tapis-de-fitness/_/R-p-105311',
    productName: 'Tapis de Fitness'
}
```

## Matching Algorithm

### Level 1: Direct Match

```javascript
const normalizedName = aiExerciseName.toLowerCase().trim();

if (EXERCISE_DATABASE[normalizedName]) {
    return normalizedName;  // Exact match found
}
```

### Level 2: Fuzzy Matching (Switch-Case)

```javascript
switch (true) {
    case /burpee/i.test(normalizedName):
        return 'burpees';

    case /pompe|push.*up|presse/i.test(normalizedName):
        return 'pompes';

    // ... more cases
}
```

### Pattern Matching Examples:

| AI Generated Name | Regex Pattern | Matched Key | Image |
|------------------|---------------|-------------|-------|
| "Burpees complets" | `/burpee/i` | `burpees` | `burpees.png` |
| "Push-ups classiques" | `/pompe\|push.*up/i` | `pompes` | `pompes.png` |
| "Corde à sauter" | `/corde.*sauter\|jump.*rope/i` | `jump rope` | `jump-rope.png` |
| "Running en extérieur" | `/course\|running\|jogging/i` | `course à pied` | `course-a-pied.png` |
| "Squats profonds" | `/squat\|flexion/i` | `squats` | `squats.png` |

## Supported Exercises & Variations

### 1. **Burpees**
- **Key:** `burpees`
- **Matches:** burpee, burpees
- **Image:** `burpees.png`
- **Product:** Tapis de Fitness
- **Link:** [Decathlon](https://www.decathlon.fr/p/tapis-de-fitness/_/R-p-105311)

### 2. **Jump Rope**
- **Key:** `jump rope`
- **Matches:** corde à sauter, jump rope, saut à la corde
- **Image:** `jump-rope.png`
- **Product:** Corde à Sauter
- **Link:** [Decathlon](https://www.decathlon.fr/p/corde-a-sauter/_/R-p-2184)

### 3. **Mountain Climbers**
- **Key:** `mountain climbers`
- **Matches:** mountain climber, grimpeur, escalade
- **Image:** `mountain-climbers.png`
- **Product:** Tapis de Yoga
- **Link:** [Decathlon](https://www.decathlon.fr/p/tapis-de-yoga/_/R-p-301551)

### 4. **High Knees**
- **Key:** `high knees`
- **Matches:** high knee, genou haut, montée de genou
- **Image:** `high-knees.png`
- **Product:** Chaussures Fitness
- **Link:** [Decathlon](https://www.decathlon.fr/p/chaussures-fitness-cardio-training/_/R-p-300799)

### 5. **Pompes (Push-ups)**
- **Key:** `pompes`
- **Matches:** pompe, push-up, push up, presse
- **Image:** `pompes.png`
- **Product:** Supports Pompes
- **Link:** [Decathlon](https://www.decathlon.fr/p/supports-pompes/_/R-p-301845)

### 6. **Squats**
- **Key:** `squats`
- **Matches:** squat, flexion
- **Image:** `squats.png`
- **Product:** Haltères
- **Link:** [Decathlon](https://www.decathlon.fr/p/halteres/_/R-p-1656)

### 7. **Planche (Plank)**
- **Key:** `planche`
- **Matches:** planche, plank, gainage
- **Image:** `planche.png`
- **Product:** Tapis de Fitness
- **Link:** [Decathlon](https://www.decathlon.fr/p/tapis-de-fitness/_/R-p-105311)

### 8. **Dips**
- **Key:** `dips`
- **Matches:** dips, répulsion
- **Image:** `dips.png`
- **Product:** Barres Parallèles
- **Link:** [Decathlon](https://www.decathlon.fr/p/barres-de-traction/_/R-p-2317)

### 9. **Course à Pied (Running)**
- **Key:** `course à pied`
- **Matches:** course, running, jogging, courir
- **Image:** `course-a-pied.png`
- **Product:** Chaussures Running
- **Link:** [Decathlon](https://www.decathlon.fr/p/chaussures-running/_/R-p-105307)

### 10. **Jumping Jacks**
- **Key:** `jumping jacks`
- **Matches:** jumping jack, saut écart
- **Image:** `jumping-jacks.png`
- **Product:** Tenue Fitness
- **Link:** [Decathlon](https://www.decathlon.fr/p/tenue-fitness-cardio/_/R-p-300800)

### 11. **Sprint Intervals**
- **Key:** `sprint intervals`
- **Matches:** sprint, interval, fractionné
- **Image:** `sprint-intervals.png`
- **Product:** Chaussures Sprint
- **Link:** [Decathlon](https://www.decathlon.fr/p/chaussures-athletisme/_/R-p-2239)

### 12. **Vélo (Cycling)**
- **Key:** `vélo`
- **Matches:** vélo, velo, cyclisme, cycling, bike
- **Image:** `velo.png`
- **Product:** Vélo
- **Link:** [Decathlon](https://www.decathlon.fr/p/velos/_/R-p-105251)

### 13. **Yoga**
- **Key:** `yoga`
- **Matches:** yoga, salutation au soleil, sun salutation
- **Image:** `yoga.png`
- **Product:** Tapis de Yoga
- **Link:** [Decathlon](https://www.decathlon.fr/p/tapis-de-yoga/_/R-p-301551)

### 14. **Étirements Jambes**
- **Key:** `étirements jambes`
- **Matches:** étirement jambe, stretch leg, hamstring, ischio
- **Image:** `etirements-jambes.png`
- **Product:** Sangle de Yoga
- **Link:** [Decathlon](https://www.decathlon.fr/p/sangle-de-yoga/_/R-p-301553)

### 15. **Pigeon Pose**
- **Key:** `pigeon pose`
- **Matches:** pigeon, posture du pigeon
- **Image:** `pigeon-pose.png`
- **Product:** Bloc de Yoga
- **Link:** [Decathlon](https://www.decathlon.fr/p/bloc-de-yoga/_/R-p-301552)

### 16. **Cat-Cow Stretch**
- **Key:** `cat-cow stretch`
- **Matches:** cat cow, chat vache
- **Image:** `cat-cow-stretch.png`
- **Product:** Tapis de Yoga
- **Link:** [Decathlon](https://www.decathlon.fr/p/tapis-de-yoga/_/R-p-301551)

## Fallback Mechanism

If no match is found:

```javascript
// Default fallback
return {
    matchedName: exerciseName,
    image: 'default-exercise.png',
    productLink: 'https://www.decathlon.fr',
    productName: 'Équipement Sportif'
};
```

Additionally, if image file doesn't exist:
- HTML `onerror` attribute displays emoji: 💪
- Application continues to work normally

## Adding New Exercises

### Step 1: Add to Database

```javascript
const EXERCISE_DATABASE = {
    // ... existing exercises
    'my-new-exercise': {
        image: 'my-new-exercise.png',
        productLink: 'https://www.decathlon.fr/p/my-product/_/R-p-12345',
        productName: 'My Product Name'
    }
};
```

### Step 2: Add Matching Pattern

```javascript
function matchExerciseName(aiExerciseName) {
    // ...
    switch (true) {
        // ... existing cases

        case /my.*exercise|mon.*exercice/i.test(normalizedName):
            return 'my-new-exercise';

        // ...
    }
}
```

### Step 3: Add Image File

Place `my-new-exercise.png` in `/images/` directory.

## Performance Considerations

- **O(1)** lookup for exact matches
- **O(n)** fuzzy matching with regex (n = number of patterns)
- **Cached:** Exercise data is retrieved once per AI response
- **Lazy loading:** Images loaded on demand by browser

## Error Handling

```javascript
try {
    const aiData = JSON.parse(cleanResponse);
    selectedExercises = aiData.exercises.map((exercise) => {
        const exerciseData = getExerciseData(exercise.name);
        // ...
    });
} catch (error) {
    console.error('Error:', error);
    // Falls back to predefined exercises
    generateFallbackExercises();
}
```

## Testing the System

### Console Testing:

```javascript
// Open browser console (F12)
console.log(matchExerciseName("Push-ups"));        // → "pompes"
console.log(matchExerciseName("Course à pied"));   // → "course à pied"
console.log(matchExerciseName("Burpee complet"));  // → "burpees"

console.log(getExerciseData("Pompes classiques"));
// → { matchedName: "pompes", image: "pompes.png", ... }
```

## Regex Patterns Reference

| Pattern | Meaning | Example |
|---------|---------|---------|
| `/burpee/i` | Case-insensitive "burpee" | Burpee, BURPEE, burpee |
| `/pompe\|push.*up/i` | "pompe" OR "push" + anything + "up" | pompe, push-up, push up |
| `/.*sauter/i` | Anything ending with "sauter" | corde à sauter |
| `/course\|running/i` | "course" OR "running" | course, running |

## Benefits of This System

✅ **Flexible:** Handles multiple AI name variations
✅ **Maintainable:** Easy to add new exercises
✅ **Robust:** Fallback for unrecognized exercises
✅ **Fast:** Efficient matching algorithm
✅ **User-friendly:** Automatic product linking
✅ **Scalable:** Can support 100+ exercises

---

*Last Updated: 2025*
