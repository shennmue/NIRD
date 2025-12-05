// ==========================================
// DECATHLON AI SPORT COACH
// Powered by Groq AI
// ==========================================

// ==========================================
// EXERCISE DATABASE WITH IMAGES AND LINKS
// ==========================================

const EXERCISE_DATABASE = {
    'burpees': {
        image: 'muscle-burpees.jpg',
        productLink: 'https://www.decathlon.fr/p/tapis-de-fitness/_/R-p-105311',
        productName: 'Tapis de Fitness'
    },
    'jump rope': {
        image: 'Jump_Rope.gif',
        productLink: 'https://www.decathlon.fr/p/corde-a-sauter/_/R-p-2184',
        productName: 'Corde à Sauter'
    },
    'mountain climbers': {
        image: 'mountain_climber.gif',
        productLink: 'https://www.decathlon.fr/p/tapis-de-yoga/_/R-p-301551',
        productName: 'Tapis de Yoga'
    },
    'high knees': {
        image: 'high_knee.jpeg',
        productLink: 'https://www.decathlon.fr/p/chaussures-fitness-cardio-training/_/R-p-300799',
        productName: 'Chaussures Fitness'
    },
    'pompes': {
        image: 'pompe.gif',
        productLink: 'https://www.decathlon.fr/p/supports-pompes/_/R-p-301845',
        productName: 'Supports Pompes'
    },
    'squats': {
        image: 'squat.gif',
        productLink: 'https://www.decathlon.fr/p/halteres/_/R-p-1656',
        productName: 'Haltères'
    },
    'planche': {
        image: 'planche.gif',
        productLink: 'https://www.decathlon.fr/p/tapis-de-fitness/_/R-p-105311',
        productName: 'Tapis de Fitness'
    },
    'dips': {
        image: 'dips.gif',
        productLink: 'https://www.decathlon.fr/p/barres-de-traction/_/R-p-2317',
        productName: 'Barres Parallèles'
    },
    'course à pied': {
        image: 'course.gif',
        productLink: 'https://www.decathlon.fr/p/chaussures-running/_/R-p-105307',
        productName: 'Chaussures Running'
    },
    'jumping jacks': {
        image: 'jumping_jack.gif',
        productLink: 'https://www.decathlon.fr/p/tenue-fitness-cardio/_/R-p-300800',
        productName: 'Tenue Fitness'
    },
    'sprint intervals': {
        image: 'sprint_intervals.gif',
        productLink: 'https://www.decathlon.fr/p/chaussures-athletisme/_/R-p-2239',
        productName: 'Chaussures Sprint'
    },
    'vélo': {
        image: 'velo.gif',
        productLink: 'https://www.decathlon.fr/p/velos/_/R-p-105251',
        productName: 'Vélo'
    },
    'yoga': {
        image: 'yoga.jpeg',
        productLink: 'https://www.decathlon.fr/p/tapis-de-yoga/_/R-p-301551',
        productName: 'Tapis de Yoga'
    },
    'étirements jambes': {
        image: 'ischio-jambiers.jpeg',
        productLink: 'https://www.decathlon.fr/p/sangle-de-yoga/_/R-p-301553',
        productName: 'Sangle de Yoga'
    },
    'pigeon pose': {
        image: 'pigeon_pose.gift',
        productLink: 'https://www.decathlon.fr/p/bloc-de-yoga/_/R-p-301552',
        productName: 'Bloc de Yoga'
    },
    'cat-cow stretch': {
        image: 'cat-cow-stretch.jpeg',
        productLink: 'https://www.decathlon.fr/p/tapis-de-yoga/_/R-p-301551',
        productName: 'Tapis de Yoga'
    }
};

// Global variables
let userProfile = {};
let selectedExercises = [];
let recommendedProducts = [];
let aiInsight = '';

// DOM Elements
const qcmSection = document.getElementById('qcm-section');
const exercisesSection = document.getElementById('exercises-section');
const productsSection = document.getElementById('products-section');
const sportProfileForm = document.getElementById('sport-profile-form');
const exercisesContainer = document.getElementById('exercises-container');
const productsContainer = document.getElementById('products-container');
const seeProductsBtn = document.getElementById('see-products-btn');
const restartBtn = document.getElementById('restart-btn');
const progressContainer = document.getElementById('progress-container');
const progressFill = document.getElementById('progress-fill');

// Progress Steps
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');

// Loading states
const aiLoading = document.getElementById('ai-loading');
const aiInsightBox = document.getElementById('ai-insight');
const aiInsightText = document.getElementById('ai-insight-text');
const exercisesContent = document.getElementById('exercises-content');
const productsLoading = document.getElementById('products-loading');
const productsContent = document.getElementById('products-content');

// Event Listeners
sportProfileForm.addEventListener('submit', handleFormSubmit);
seeProductsBtn.addEventListener('click', handleShowProducts);
restartBtn.addEventListener('click', restartQuestionnaire);

// ==========================================
// GROQ AI INTEGRATION
// ==========================================

async function callGroqAI(prompt) {
    try {
        const response = await fetch(CONFIG.GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: CONFIG.MODEL,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a professional sports coach and fitness expert working for Decathlon. You provide personalized exercise recommendations and product suggestions based on user profiles. Always respond in French. Be encouraging and professional.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000
            })
        });

        if (!response.ok) {
            throw new Error(`Groq API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling Groq AI:', error);
        return null;
    }
}

// ==========================================
// FORM SUBMISSION HANDLER
// ==========================================

async function handleFormSubmit(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(sportProfileForm);
    userProfile = {
        frequency: formData.get('frequency'),
        duration: formData.get('duration'),
        level: formData.get('level'),
        goal: formData.get('goal'),
        location: formData.get('location')
    };

    // Show progress bar
    progressContainer.style.display = 'block';
    updateProgress(1);

    // Switch to exercises section
    showSection('exercises');

    // Generate AI-powered exercise recommendations
    await generateAIExerciseRecommendations();
}

// ==========================================
// AI EXERCISE GENERATION
// ==========================================

async function generateAIExerciseRecommendations() {
    // Show loading state
    aiLoading.style.display = 'flex';
    exercisesContent.style.display = 'none';
    aiInsightBox.style.display = 'none';

    // Create prompt for AI
    const prompt = `
Profil utilisateur Decathlon:
- Fréquence d'entraînement: ${userProfile.frequency} fois par semaine
- Durée des séances: ${userProfile.duration} minutes
- Niveau: ${translateLevel(userProfile.level)}
- Objectif: ${translateGoal(userProfile.goal)}
- Lieu d'entraînement: ${translateLocation(userProfile.location)}

Mission:
1. Analyse ce profil et fournis un insight personnalisé (2-3 phrases) sur le profil de l'utilisateur
2. Recommande EXACTEMENT 4 exercices adaptés à ce profil
3. Pour chaque exercice, fournis: nom, description détaillée (2 phrases), durée/répétitions, niveau de difficulté

Format de réponse STRICT (JSON):
{
    "insight": "Votre analyse personnalisée ici...",
    "exercises": [
        {
            "name": "Nom de l'exercice",
            "description": "Description détaillée de l'exercice et ses bénéfices",
            "duration": "3 séries de 12 répétitions",
            "level": "beginner|intermediate|advanced",
            "category": "Cardio|Force|Souplesse|Mixte"
        }
    ]
}

IMPORTANT: Réponds UNIQUEMENT avec le JSON, sans texte avant ou après.
`;

    try {
        const aiResponse = await callGroqAI(prompt);

        if (!aiResponse) {
            throw new Error('No response from AI');
        }

        // Parse AI response
        const cleanResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const aiData = JSON.parse(cleanResponse);

        // Store AI insight
        aiInsight = aiData.insight;

        // Convert AI exercises to our format with matched images and links
        selectedExercises = aiData.exercises.map((exercise) => {
            const exerciseData = getExerciseData(exercise.name);

            return {
                name: exercise.name,
                description: exercise.description,
                duration: exercise.duration,
                level: exercise.level,
                category: exercise.category,
                image: exerciseData.image,
                productLink: exerciseData.productLink,
                productName: exerciseData.productName,
                relatedProducts: getRelatedProducts(exercise.category, userProfile.goal)
            };
        });

        // Display results
        displayAIResults();

    } catch (error) {
        console.error('Error generating AI recommendations:', error);

        // Fallback to predefined exercises if AI fails
        generateFallbackExercises();
        displayAIResults();
    }
}

// ==========================================
// AI PRODUCT RECOMMENDATIONS
// ==========================================

async function handleShowProducts() {
    updateProgress(2);
    showSection('products');

    // Show loading
    productsLoading.style.display = 'flex';
    productsContent.style.display = 'none';

    await generateAIProductRecommendations();
}

async function generateAIProductRecommendations() {
    // Create prompt for product recommendations
    const exercisesList = selectedExercises.map(ex => ex.name).join(', ');

    const prompt = `
Utilisateur Decathlon avec les exercices suivants: ${exercisesList}
Objectif: ${translateGoal(userProfile.goal)}
Lieu: ${translateLocation(userProfile.location)}

Recommande 6-8 produits Decathlon essentiels pour ces exercices.
Pour chaque produit: nom, prix estimé, description courte, note sur 5.

Format JSON:
{
    "products": [
        {
            "name": "Nom du produit",
            "price": "XX.XX€",
            "description": "Description courte du produit",
            "rating": 4.5,
            "category": "catégorie"
        }
    ]
}

UNIQUEMENT le JSON, rien d'autre.
`;

    try {
        const aiResponse = await callGroqAI(prompt);

        if (aiResponse) {
            const cleanResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            const aiData = JSON.parse(cleanResponse);

            // Convert AI products to our format
            recommendedProducts = aiData.products.map((product, index) => ({
                id: `ai-product-${index}`,
                name: product.name,
                price: product.price,
                description: product.description,
                rating: product.rating || 4.5,
                image: `product-${index + 1}.png`,
                link: 'https://www.decathlon.fr',
                badge: index < 2 ? 'Recommandé' : null
            }));
        } else {
            throw new Error('No AI response');
        }
    } catch (error) {
        console.error('Error generating product recommendations:', error);

        // Fallback to related products from exercises
        const productIds = new Set();
        selectedExercises.forEach(exercise => {
            exercise.relatedProducts.forEach(id => productIds.add(id));
        });

        recommendedProducts = Array.from(productIds).slice(0, 8).map((id, index) => ({
            id: `fallback-${index}`,
            name: generateProductName(id),
            price: `${(Math.random() * 50 + 20).toFixed(2)}€`,
            description: generateProductDescription(id),
            rating: (Math.random() * 1 + 4).toFixed(1),
            image: `${id}.png`,
            link: 'https://www.decathlon.fr',
            badge: index === 0 ? 'Top Choix' : null
        }));
    }

    // Display products
    displayProducts();
    updateProgress(3);
}

// ==========================================
// DISPLAY FUNCTIONS
// ==========================================

function displayAIResults() {
    // Hide loading
    aiLoading.style.display = 'none';

    // Show AI insight
    aiInsightText.textContent = aiInsight;
    aiInsightBox.style.display = 'block';

    // Show exercises
    displayExercises();
    exercisesContent.style.display = 'block';

    updateProgress(1.5);
}

function displayExercises() {
    exercisesContainer.innerHTML = '';

    selectedExercises.forEach((exercise, index) => {
        const card = createExerciseCard(exercise, index);
        exercisesContainer.appendChild(card);
    });
}

function createExerciseCard(exercise, index) {
    const card = document.createElement('div');
    card.className = 'exercise-card';
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
        <div class="exercise-image">
            <img src="images/${exercise.image}" alt="${exercise.name}" onerror="this.parentElement.innerHTML='<span>💪</span>'">
        </div>
        <div class="exercise-content">
            <h3>${exercise.name}</h3>
            <span class="exercise-tag">${exercise.category}</span>
            <p>${exercise.description}</p>
            <div class="exercise-meta">
                <span><strong>⏱</strong> ${exercise.duration}</span>
                <span><strong>📊</strong> ${translateLevel(exercise.level)}</span>
            </div>
            <a href="${exercise.productLink}" target="_blank" class="exercise-product-link">
                🛒 ${exercise.productName}
            </a>
        </div>
    `;

    return card;
}

function displayProducts() {
    productsContainer.innerHTML = '';

    recommendedProducts.forEach((product, index) => {
        const card = createProductCard(product, index);
        productsContainer.appendChild(card);
    });

    // Hide loading, show content
    productsLoading.style.display = 'none';
    productsContent.style.display = 'block';
}

function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.1}s`;

    const stars = generateStars(parseFloat(product.rating));

    card.innerHTML = `
        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        <div class="product-image">
            <img src="images/products/${product.image}" alt="${product.name}" onerror="this.parentElement.innerHTML='<span style=\\'font-size: 3em;\\'>🏃</span>'">
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-rating">
                <span class="stars">${stars}</span>
                <span class="rating-text">(${product.rating})</span>
            </div>
            <p class="description">${product.description}</p>
            <p class="price">${product.price}</p>
            <a href="${product.link}" target="_blank" class="product-link">Voir sur Decathlon</a>
        </div>
    `;

    return card;
}

// ==========================================
// FALLBACK EXERCISES (if AI fails)
// ==========================================

function generateFallbackExercises() {
    const fallbackDB = {
        'weight-loss': [
            { name: 'Burpees', description: 'Exercice complet qui combine squat, planche et saut. Brûle énormément de calories et améliore votre condition physique globale.', duration: '3 séries de 10 répétitions', level: 'intermediate', category: 'Cardio' },
            { name: 'Jump Rope', description: 'La corde à sauter est un excellent exercice cardio qui améliore votre coordination et brûle rapidement des calories.', duration: '3 séries de 2 minutes', level: 'beginner', category: 'Cardio' },
            { name: 'Mountain Climbers', description: 'Exercice dynamique qui travaille le cardio et renforce les muscles abdominaux et les épaules simultanément.', duration: '4 séries de 30 secondes', level: 'intermediate', category: 'Mixte' },
            { name: 'High Knees', description: 'Course sur place avec genoux hauts, excellent pour élever le rythme cardiaque et travailler les jambes.', duration: '3 séries de 1 minute', level: 'beginner', category: 'Cardio' }
        ],
        'muscle-gain': [
            { name: 'Pompes', description: 'Exercice fondamental pour développer les pectoraux, triceps et épaules. Peut être adapté à tous les niveaux.', duration: '4 séries de 12-15 répétitions', level: 'beginner', category: 'Force' },
            { name: 'Squats', description: 'Le roi des exercices pour les jambes et les fessiers. Renforce également la ceinture abdominale et améliore la posture.', duration: '4 séries de 12 répétitions', level: 'beginner', category: 'Force' },
            { name: 'Planche', description: 'Renforce la ceinture abdominale et stabilise le corps. Exercice isométrique excellent pour le core.', duration: '3 séries de 45-60 secondes', level: 'beginner', category: 'Force' },
            { name: 'Dips', description: 'Excellent pour développer les triceps, pectoraux et épaules. Peut se faire sur une chaise à la maison.', duration: '4 séries de 10 répétitions', level: 'intermediate', category: 'Force' }
        ],
        'cardio': [
            { name: 'Course à pied', description: 'Exercice cardio classique qui améliore l\'endurance et la santé cardiovasculaire. Accessible partout.', duration: '30-45 minutes', level: 'beginner', category: 'Cardio' },
            { name: 'Jumping Jacks', description: 'Échauffement dynamique qui élève rapidement le rythme cardiaque et mobilise tout le corps.', duration: '3 séries de 50 répétitions', level: 'beginner', category: 'Cardio' },
            { name: 'Sprint Intervals', description: 'Alternance de sprints intenses et de récupération active. Maximise la dépense calorique et améliore la vitesse.', duration: '8x30s sprint / 90s repos', level: 'advanced', category: 'Cardio' },
            { name: 'Vélo', description: 'Exercice cardio à faible impact sur les articulations, excellent pour l\'endurance et la santé cardiovasculaire.', duration: '45-60 minutes', level: 'beginner', category: 'Cardio' }
        ],
        'flexibility': [
            { name: 'Yoga - Salutation au Soleil', description: 'Séquence fluide qui étire tout le corps, améliore la souplesse et apporte de la sérénité.', duration: '10-15 minutes', level: 'beginner', category: 'Souplesse' },
            { name: 'Étirements Ischio-jambiers', description: 'Améliore la flexibilité des jambes et du bas du dos. Réduit les tensions musculaires.', duration: '3 séries de 30 secondes', level: 'beginner', category: 'Souplesse' },
            { name: 'Pigeon Pose', description: 'Étirement profond des hanches et des fessiers. Excellent pour la mobilité et la récupération.', duration: '2 minutes par côté', level: 'intermediate', category: 'Souplesse' },
            { name: 'Cat-Cow Stretch', description: 'Mobilise la colonne vertébrale, améliore la posture et soulage les tensions du dos.', duration: '2-3 minutes', level: 'beginner', category: 'Souplesse' }
        ]
    };

    const goalExercises = fallbackDB[userProfile.goal] || fallbackDB['cardio'];
    selectedExercises = goalExercises.map((ex, i) => ({
        ...ex,
        image: `exercise-${i + 1}.png`,
        relatedProducts: getRelatedProducts(ex.category, userProfile.goal)
    }));

    aiInsight = generateFallbackInsight();
}

function generateFallbackInsight() {
    const insights = {
        'weight-loss': `Votre profil indique un objectif de perte de poids. Avec ${userProfile.frequency} séances par semaine, vous êtes sur la bonne voie ! Concentrez-vous sur des exercices cardio intenses et maintenez une régularité.`,
        'muscle-gain': `Excellent choix de viser la prise de muscle ! Votre fréquence d'entraînement de ${userProfile.frequency} fois par semaine est idéale. N'oubliez pas l'importance de la nutrition et du repos pour la croissance musculaire.`,
        'cardio': `Améliorer votre cardio est un objectif formidable pour votre santé ! Avec des séances de ${userProfile.duration} minutes, vous pourrez progresser rapidement. La régularité est la clé du succès.`,
        'flexibility': `La souplesse et le bien-être sont essentiels pour une vie saine. Vos séances de ${userProfile.duration} minutes sont parfaites pour ce type d'entraînement. La patience et la constance donneront d'excellents résultats.`
    };

    return insights[userProfile.goal] || "Vous avez un excellent profil sportif ! Continuez vos efforts et les résultats suivront.";
}

// ==========================================
// EXERCISE NAME MATCHING SYSTEM
// ==========================================

function matchExerciseName(aiExerciseName) {
    // Normalize the AI-generated name
    const normalizedName = aiExerciseName.toLowerCase().trim();

    // Direct match first
    if (EXERCISE_DATABASE[normalizedName]) {
        return normalizedName;
    }

    // Fuzzy matching with switch-case logic
    switch (true) {
        // Burpees variations
        case /burpee/i.test(normalizedName):
            return 'burpees';

        // Jump rope variations
        case /corde.*sauter|jump.*rope|saut.*corde/i.test(normalizedName):
            return 'jump rope';

        // Mountain climbers variations
        case /mountain.*climber|grimpeur|escalade/i.test(normalizedName):
            return 'mountain climbers';

        // High knees variations
        case /high.*knee|genou.*haut|montée.*genou/i.test(normalizedName):
            return 'high knees';

        // Pompes (push-ups) variations
        case /pompe|push.*up|presse/i.test(normalizedName):
            return 'pompes';

        // Squats variations
        case /squat|flexion/i.test(normalizedName):
            return 'squats';

        // Planche (plank) variations
        case /planche|plank|gainage/i.test(normalizedName):
            return 'planche';

        // Dips variations
        case /dips|répulsion/i.test(normalizedName):
            return 'dips';

        // Course à pied (running) variations
        case /course|running|jogging|courir/i.test(normalizedName):
            return 'course à pied';

        // Jumping jacks variations
        case /jumping.*jack|saut.*écart/i.test(normalizedName):
            return 'jumping jacks';

        // Sprint intervals variations
        case /sprint|interval|fractionné/i.test(normalizedName):
            return 'sprint intervals';

        // Vélo (cycling) variations
        case /vélo|velo|cyclisme|cycling|bike/i.test(normalizedName):
            return 'vélo';

        // Yoga variations
        case /yoga|salutation.*soleil|sun.*salutation/i.test(normalizedName):
            return 'yoga';

        // Étirements jambes variations
        case /étirement.*jambe|stretch.*leg|hamstring|ischio/i.test(normalizedName):
            return 'étirements jambes';

        // Pigeon pose variations
        case /pigeon|posture.*pigeon/i.test(normalizedName):
            return 'pigeon pose';

        // Cat-cow stretch variations
        case /cat.*cow|chat.*vache/i.test(normalizedName):
            return 'cat-cow stretch';

        // Default fallback
        default:
            console.warn(`No match found for exercise: ${aiExerciseName}`);
            return null;
    }
}

function getExerciseData(exerciseName) {
    const matchedName = matchExerciseName(exerciseName);

    if (matchedName && EXERCISE_DATABASE[matchedName]) {
        return {
            matchedName: matchedName,
            image: EXERCISE_DATABASE[matchedName].image,
            productLink: EXERCISE_DATABASE[matchedName].productLink,
            productName: EXERCISE_DATABASE[matchedName].productName
        };
    }

    // Fallback to generic data
    return {
        matchedName: exerciseName,
        image: 'default-exercise.png',
        productLink: 'https://www.decathlon.fr',
        productName: 'Équipement Sportif'
    };
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function getRelatedProducts(category, goal) {
    const productMap = {
        'Cardio': ['chaussures-running', 'montre-cardio', 'gourde', 'tenue-sport'],
        'Force': ['halteres', 'tapis-yoga', 'bande-resistance', 'gants'],
        'Souplesse': ['tapis-yoga', 'bloc-yoga', 'sangle-yoga', 'vetement-yoga'],
        'Mixte': ['tapis-yoga', 'chaussures-training', 'gourde', 'tenue-sport']
    };

    return productMap[category] || productMap['Mixte'];
}

function generateProductName(id) {
    const names = {
        'tapis-yoga': 'Tapis de Yoga Premium',
        'halteres': 'Set Haltères Ajustables',
        'chaussures-running': 'Chaussures Running Kiprun',
        'chaussures-training': 'Chaussures Training',
        'montre-cardio': 'Montre Cardio GPS',
        'gourde': 'Gourde Sport Isotherme',
        'tenue-sport': 'Ensemble Fitness',
        'bande-resistance': 'Bandes Élastiques',
        'gants': 'Gants Musculation',
        'bloc-yoga': 'Bloc Yoga Liège',
        'sangle-yoga': 'Sangle Yoga',
        'vetement-yoga': 'Tenue Yoga Confort'
    };
    return names[id] || 'Produit Decathlon';
}

function generateProductDescription(id) {
    const descriptions = {
        'tapis-yoga': 'Tapis antidérapant haute qualité pour tous vos exercices',
        'halteres': 'Haltères modulables pour musculation à domicile',
        'chaussures-running': 'Amorti optimal pour vos courses sur route',
        'chaussures-training': 'Polyvalentes pour tous types d\'entraînement',
        'montre-cardio': 'Suivi GPS et fréquence cardiaque',
        'gourde': 'Garde l\'eau fraîche pendant l\'effort',
        'tenue-sport': 'Respirante et confortable',
        'bande-resistance': 'Différentes résistances pour progresser',
        'gants': 'Protège vos mains pendant l\'effort',
        'bloc-yoga': 'Support stable pour vos postures',
        'sangle-yoga': 'Aide aux étirements profonds',
        'vetement-yoga': 'Liberté de mouvement maximale'
    };
    return descriptions[id] || 'Équipement sportif de qualité Decathlon';
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    if (hasHalfStar) {
        stars += '☆';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }

    return stars;
}

function translateLevel(level) {
    const translations = {
        'beginner': 'Débutant',
        'intermediate': 'Intermédiaire',
        'advanced': 'Avancé',
        'expert': 'Expert'
    };
    return translations[level] || level;
}

function translateGoal(goal) {
    const translations = {
        'weight-loss': 'Perte de poids',
        'muscle-gain': 'Prise de muscle',
        'cardio': 'Améliorer le cardio',
        'flexibility': 'Souplesse & bien-être'
    };
    return translations[goal] || goal;
}

function translateLocation(location) {
    const translations = {
        'home': 'À la maison',
        'gym': 'En salle de sport',
        'outdoor': 'En extérieur',
        'mixed': 'Mixte'
    };
    return translations[location] || location;
}

// ==========================================
// NAVIGATION & PROGRESS
// ==========================================

function showSection(sectionName) {
    qcmSection.classList.remove('active');
    exercisesSection.classList.remove('active');
    productsSection.classList.remove('active');

    if (sectionName === 'qcm') {
        qcmSection.classList.add('active');
    } else if (sectionName === 'exercises') {
        exercisesSection.classList.add('active');
    } else if (sectionName === 'products') {
        productsSection.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress(currentStep) {
    const steps = [step1, step2, step3];
    const progressPercentages = [0, 50, 100];

    steps.forEach((step, index) => {
        if (index + 1 < currentStep) {
            step.classList.remove('active');
            step.classList.add('completed');
        } else if (index + 1 === Math.floor(currentStep)) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });

    const progressIndex = Math.min(Math.floor(currentStep) - 1, 2);
    progressFill.style.width = `${progressPercentages[progressIndex]}%`;
}

function restartQuestionnaire() {
    userProfile = {};
    selectedExercises = [];
    recommendedProducts = [];
    aiInsight = '';

    sportProfileForm.reset();
    progressContainer.style.display = 'none';
    progressFill.style.width = '0%';

    showSection('qcm');

    step1.classList.remove('completed');
    step2.classList.remove('completed', 'active');
    step3.classList.remove('completed', 'active');
    step1.classList.add('active');
}

// ==========================================
// BACKGROUND PARTICLES ANIMATION
// ==========================================

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 100 + 50;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 15}s`;

        particlesContainer.appendChild(particle);
    }
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🏃 Decathlon AI Sport Coach initialized!');
    console.log('🤖 Powered by Groq AI');

    // Create background particles
    createParticles();

    // Check if API key is configured
    if (CONFIG.GROQ_API_KEY === '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') {
        console.warn('⚠️ Groq API key not configured. Please add your API key in config.js');
        console.warn('📝 Get your free API key at: https://console.groq.com/');
    }
});
