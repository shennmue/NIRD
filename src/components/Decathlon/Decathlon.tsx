import { useState } from 'react';
import './Decathlon.css';

interface Exercise {
  name: string;
  description: string;
  duration: string;
  level: string;
  category: string;
  image: string;
  productLink: string;
  productName: string;
}

// Exercise to image mapping database
const EXERCISE_IMAGE_MAP: Record<string, { image: string; productLink: string; productName: string }> = {
  'burpees': {
    image: '/images/decathlon/muscle-burpees.jpg',
    productLink: 'https://www.decathlon.fr/p/tapis-de-fitness/_/R-p-105311',
    productName: 'Tapis de Fitness'
  },
  'jump rope': {
    image: '/images/decathlon/Jump_Rope.gif',
    productLink: 'https://www.decathlon.fr/p/corde-a-sauter/_/R-p-2184',
    productName: 'Corde à Sauter'
  },
  'corde à sauter': {
    image: '/images/decathlon/Jump_Rope.gif',
    productLink: 'https://www.decathlon.fr/p/corde-a-sauter/_/R-p-2184',
    productName: 'Corde à Sauter'
  },
  'mountain climbers': {
    image: '/images/decathlon/mountain_climber.gif',
    productLink: 'https://www.decathlon.fr/p/tapis-de-yoga/_/R-p-301551',
    productName: 'Tapis de Yoga'
  },
  'high knees': {
    image: '/images/decathlon/high_knee.jpeg',
    productLink: 'https://www.decathlon.fr/p/chaussures-fitness-cardio-training/_/R-p-300799',
    productName: 'Chaussures Fitness'
  },
  'pompes': {
    image: '/images/decathlon/pompe.gif',
    productLink: 'https://www.decathlon.fr/p/supports-pompes/_/R-p-301845',
    productName: 'Supports Pompes'
  },
  'squats': {
    image: '/images/decathlon/squat.gif',
    productLink: 'https://www.decathlon.fr/p/halteres/_/R-p-1656',
    productName: 'Haltères'
  },
  'planche': {
    image: '/images/decathlon/planche.gif',
    productLink: 'https://www.decathlon.fr/p/tapis-de-fitness/_/R-p-105311',
    productName: 'Tapis de Fitness'
  },
  'dips': {
    image: '/images/decathlon/dips.gif',
    productLink: 'https://www.decathlon.fr/p/barres-de-traction/_/R-p-2317',
    productName: 'Barres Parallèles'
  },
  'course à pied': {
    image: '/images/decathlon/course.gif',
    productLink: 'https://www.decathlon.fr/p/chaussures-running/_/R-p-105307',
    productName: 'Chaussures Running'
  },
  'jumping jacks': {
    image: '/images/decathlon/jumping_jack.gif',
    productLink: 'https://www.decathlon.fr/p/tenue-fitness-cardio/_/R-p-300800',
    productName: 'Tenue Fitness'
  },
  'sprint intervals': {
    image: '/images/decathlon/sprint_intervals.gif',
    productLink: 'https://www.decathlon.fr/p/chaussures-athletisme/_/R-p-2239',
    productName: 'Chaussures Sprint'
  },
  'vélo': {
    image: '/images/decathlon/velo.gif',
    productLink: 'https://www.decathlon.fr/p/velos/_/R-p-105251',
    productName: 'Vélo'
  },
  'yoga': {
    image: '/images/decathlon/yoga.jpeg',
    productLink: 'https://www.decathlon.fr/p/tapis-de-yoga/_/R-p-301551',
    productName: 'Tapis de Yoga'
  },
  'étirements jambes': {
    image: '/images/decathlon/ischio-jambiers.jpeg',
    productLink: 'https://www.decathlon.fr/p/sangle-de-yoga/_/R-p-301553',
    productName: 'Sangle de Yoga'
  },
  'cat-cow stretch': {
    image: '/images/decathlon/cat-cow-stretch.jpeg',
    productLink: 'https://www.decathlon.fr/p/tapis-de-yoga/_/R-p-301551',
    productName: 'Tapis de Yoga'
  }
};

// Function to match exercise name to image
const getExerciseImageData = (exerciseName: string) => {
  const nameLower = exerciseName.toLowerCase().trim();

  // Try exact match first
  if (EXERCISE_IMAGE_MAP[nameLower]) {
    return EXERCISE_IMAGE_MAP[nameLower];
  }

  // Try partial matches
  for (const [key, value] of Object.entries(EXERCISE_IMAGE_MAP)) {
    if (nameLower.includes(key) || key.includes(nameLower)) {
      return value;
    }
  }

  // Default fallback
  return {
    image: '/images/decathlon/muscle-burpees.jpg',
    productLink: 'https://www.decathlon.fr',
    productName: 'Équipement Sportif'
  };
};

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  rating: number;
  image: string;
  link: string;
  badge?: string;
}

export const Decathlon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<'intro' | 'qcm' | 'exercises' | 'products'>('intro');
  const [userProfile, setUserProfile] = useState({
    frequency: '',
    duration: '',
    level: '',
    goal: '',
    location: ''
  });
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState('');

  const API_KEY = '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';
  const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
  const GROQ_MODEL = 'mixtral-8x7b-32768';

  const handleStartQuiz = () => {
    setCurrentStep('qcm');
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const profile = {
      frequency: formData.get('frequency') as string,
      duration: formData.get('duration') as string,
      level: formData.get('level') as string,
      goal: formData.get('goal') as string,
      location: formData.get('location') as string
    };

    setUserProfile(profile);
    setCurrentStep('exercises');
    await generateExercises(profile);
  };

  const generateExercises = async (profile: typeof userProfile) => {
    console.log('🏋️ Starting exercise generation for profile:', profile);
    setIsLoading(true);

    // Créer un seed unique basé sur le profil pour avoir des résultats différents
    const profileSeed = `${profile.frequency}-${profile.duration}-${profile.level}-${profile.goal}-${profile.location}`;
    const timestamp = Date.now();

    const prompt = `
Tu es un coach sportif Decathlon expert. Analyse ce profil UNIQUE et propose des exercices PERSONNALISÉS et DIFFÉRENTS à chaque fois.

Profil utilisateur (ID: ${profileSeed}-${timestamp}):
- Fréquence: ${profile.frequency} fois par semaine
- Durée: ${profile.duration} minutes
- Niveau: ${translateLevel(profile.level)}
- Objectif: ${translateGoal(profile.goal)}
- Lieu: ${translateLocation(profile.location)}

IMPORTANT:
- Varie tes recommandations selon le profil (ne propose PAS toujours les mêmes exercices)
- Si l'objectif est "Perte de poids" → privilégie les exercices CARDIO intenses (burpees, jumping jacks, mountain climbers, corde à sauter)
- Si l'objectif est "Prise de muscle" → privilégie les exercices de FORCE (pompes, squats, dips, tractions)
- Si l'objectif est "Améliorer cardio" → privilégie COURSE, VÉLO, sprint intervals, high knees
- Si l'objectif est "Souplesse" → privilégie YOGA, étirements jambes, cat-cow stretch
- Si débutant → exercices simples et progressifs
- Si expert → exercices complexes et intensifs
- Si "À la maison" → exercices au poids du corps
- Si "En salle" → exercices avec matériel

Recommande EXACTEMENT 4 exercices ADAPTÉS au profil et donne un insight personnalisé.

Format JSON:
{
    "insight": "Analyse personnalisée du profil en 2-3 phrases courtes",
    "exercises": [
        {
            "name": "Nom de l'exercice",
            "description": "Description détaillée et motivante",
            "duration": "X séries de Y répétitions OU X minutes",
            "level": "beginner|intermediate|advanced",
            "category": "Cardio|Force|Souplesse|Mixte"
        }
    ]
}

Réponds UNIQUEMENT avec le JSON, sans markdown.`;

    try {
      console.log('🔄 Calling Groq API...');
      const response = await fetch(GROQ_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: 'You are a professional sports coach for Decathlon. Respond in French.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (response.ok) {
        console.log('✅ API response OK');
        const data = await response.json();
        const cleanResponse = data.choices[0].message.content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        console.log('📄 AI Response:', cleanResponse);
        const aiData = JSON.parse(cleanResponse);

        console.log('📊 Parsed AI data:', aiData);
        setAiInsight(aiData.insight);

        const exercisesWithImages = aiData.exercises.map((ex: Exercise) => {
          const imageData = getExerciseImageData(ex.name);
          return {
            ...ex,
            image: imageData.image,
            productLink: imageData.productLink,
            productName: imageData.productName
          };
        });

        console.log('💪 Setting exercises:', exercisesWithImages);
        setExercises(exercisesWithImages);
      } else {
        console.error('❌ API response not OK:', response.status);
        throw new Error(`API error: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Error generating exercises:', error);
      // Fallback exercises adaptés au profil
      console.log('🔄 Using fallback exercises for profile:', profile);

      let fallbackExercises: Array<{
        name: string;
        description: string;
        duration: string;
        level: string;
        category: string;
      }> = [];
      let insight = "Excellent profil sportif ! Voici des exercices adaptés à vos objectifs.";

      // Adapter les exercices selon l'objectif
      if (profile.goal === 'weight-loss') {
        insight = "Pour la perte de poids, privilégiez les exercices cardio intensifs qui brûlent un maximum de calories !";
        fallbackExercises = [
          {
            name: 'Burpees',
            description: 'Exercice complet haute intensité qui combine squat, planche et saut. Brûle énormément de calories.',
            duration: '3 séries de 12 répétitions',
            level: profile.level,
            category: 'Cardio'
          },
          {
            name: 'Jumping Jacks',
            description: 'Excellent pour augmenter rapidement le rythme cardiaque et brûler des calories.',
            duration: '4 séries de 30 secondes',
            level: profile.level,
            category: 'Cardio'
          },
          {
            name: 'Mountain Climbers',
            description: 'Exercice cardio intense qui sollicite tout le corps et booste le métabolisme.',
            duration: '3 séries de 20 répétitions',
            level: profile.level,
            category: 'Cardio'
          },
          {
            name: 'Corde à sauter',
            description: 'Classique du cardio, parfait pour brûler des calories rapidement.',
            duration: '4 séries de 1 minute',
            level: profile.level,
            category: 'Cardio'
          }
        ];
      } else if (profile.goal === 'muscle-gain') {
        insight = "Pour la prise de muscle, concentrez-vous sur des exercices de force avec une charge progressive !";
        fallbackExercises = [
          {
            name: 'Pompes',
            description: 'Exercice fondamental pour développer les pectoraux, triceps et épaules.',
            duration: '4 séries de 12-15 répétitions',
            level: profile.level,
            category: 'Force'
          },
          {
            name: 'Squats',
            description: 'Le roi des exercices pour les jambes et les fessiers. Développe la masse musculaire globale.',
            duration: '4 séries de 12 répétitions',
            level: profile.level,
            category: 'Force'
          },
          {
            name: 'Dips',
            description: 'Excellent pour les triceps et les pectoraux. Renforce le haut du corps.',
            duration: '3 séries de 10 répétitions',
            level: profile.level,
            category: 'Force'
          },
          {
            name: 'Planche',
            description: 'Renforce la ceinture abdominale et stabilise le core pour mieux soulever.',
            duration: '3 séries de 45-60 secondes',
            level: profile.level,
            category: 'Force'
          }
        ];
      } else if (profile.goal === 'cardio') {
        insight = "Pour améliorer votre cardio, variez les exercices d'endurance et de fractionné !";
        fallbackExercises = [
          {
            name: 'Course à pied',
            description: 'Base de l\'entraînement cardio. Améliorez votre endurance progressivement.',
            duration: '3 séries de 5 minutes',
            level: profile.level,
            category: 'Cardio'
          },
          {
            name: 'Sprint intervals',
            description: 'Alternez sprints et récupération pour booster votre capacité cardio-vasculaire.',
            duration: '8 séries de 30s sprint + 30s repos',
            level: profile.level,
            category: 'Cardio'
          },
          {
            name: 'High Knees',
            description: 'Montées de genoux rapides pour améliorer la fréquence cardiaque et l\'agilité.',
            duration: '4 séries de 30 secondes',
            level: profile.level,
            category: 'Cardio'
          },
          {
            name: 'Vélo',
            description: 'Excellent pour le cardio avec peu d\'impact sur les articulations.',
            duration: '20-30 minutes',
            level: profile.level,
            category: 'Cardio'
          }
        ];
      } else if (profile.goal === 'flexibility') {
        insight = "Pour la souplesse et le bien-être, privilégiez les étirements et les postures de yoga !";
        fallbackExercises = [
          {
            name: 'Yoga',
            description: 'Séance complète pour améliorer souplesse, équilibre et relaxation.',
            duration: '20-30 minutes',
            level: profile.level,
            category: 'Souplesse'
          },
          {
            name: 'Étirements jambes',
            description: 'Étirements des ischio-jambiers pour gagner en flexibilité.',
            duration: '3 séries de 30 secondes par jambe',
            level: profile.level,
            category: 'Souplesse'
          },
          {
            name: 'Cat-Cow Stretch',
            description: 'Étirement du dos et de la colonne vertébrale, idéal pour la mobilité.',
            duration: '3 séries de 10 répétitions',
            level: profile.level,
            category: 'Souplesse'
          },
          {
            name: 'Planche',
            description: 'Renforce le core tout en travaillant la stabilité et l\'équilibre.',
            duration: '3 séries de 30-45 secondes',
            level: profile.level,
            category: 'Force'
          }
        ];
      }

      setAiInsight(insight);

      const fallbackWithImages = fallbackExercises.map(ex => {
        const imageData = getExerciseImageData(ex.name);
        return {
          ...ex,
          image: imageData.image,
          productLink: imageData.productLink,
          productName: imageData.productName
        };
      });

      console.log('💪 Setting fallback exercises:', fallbackWithImages);
      setExercises(fallbackWithImages);
    }

    setIsLoading(false);
    console.log('✅ Exercise generation complete');
  };

  const handleShowProducts = () => {
    setCurrentStep('products');
    generateProducts();
  };

  const generateProducts = () => {
    setProducts([
      {
        id: '1',
        name: 'Tapis de Yoga Premium',
        price: '29.99€',
        description: 'Antidérapant et confortable',
        rating: 4.5,
        image: '/images/decathlon/products/tapis-yoga.png',
        link: 'https://www.decathlon.fr/p/tapis-de-yoga/_/R-p-301551',
        badge: 'Recommandé'
      },
      {
        id: '2',
        name: 'Haltères Ajustables',
        price: '49.99€',
        description: 'De 2kg à 10kg',
        rating: 4.8,
        image: '/images/decathlon/products/halteres.png',
        link: 'https://www.decathlon.fr/p/halteres/_/R-p-1656'
      },
      {
        id: '3',
        name: 'Chaussures Running',
        price: '79.99€',
        description: 'Amorti optimal pour running',
        rating: 4.7,
        image: '/images/decathlon/products/chaussures-running.png',
        link: 'https://www.decathlon.fr'
      },
      {
        id: '4',
        name: 'Gourde Sport Isotherme',
        price: '19.99€',
        description: 'Garde l\'eau fraîche',
        rating: 4.6,
        image: '/images/decathlon/products/gourde.png',
        link: 'https://www.decathlon.fr'
      },
      {
        id: '5',
        name: 'Bandes Élastiques',
        price: '24.99€',
        description: 'Résistances multiples',
        rating: 4.5,
        image: '/images/decathlon/products/bandes.png',
        link: 'https://www.decathlon.fr'
      },
      {
        id: '6',
        name: 'Montre Cardio GPS',
        price: '129.99€',
        description: 'Suivi complet activité',
        rating: 4.8,
        image: '/images/decathlon/products/montre.png',
        link: 'https://www.decathlon.fr',
        badge: 'Top Choix'
      }
    ]);
  };

  const handleRestart = () => {
    setCurrentStep('intro');
    setUserProfile({ frequency: '', duration: '', level: '', goal: '', location: '' });
    setExercises([]);
    setProducts([]);
    setAiInsight('');
  };

  const translateLevel = (level: string) => {
    const translations: Record<string, string> = {
      'beginner': 'Débutant',
      'intermediate': 'Intermédiaire',
      'advanced': 'Avancé',
      'expert': 'Expert'
    };
    return translations[level] || level;
  };

  const translateGoal = (goal: string) => {
    const translations: Record<string, string> = {
      'weight-loss': 'Perte de poids',
      'muscle-gain': 'Prise de muscle',
      'cardio': 'Améliorer le cardio',
      'flexibility': 'Souplesse & bien-être'
    };
    return translations[goal] || goal;
  };

  const translateLocation = (location: string) => {
    const translations: Record<string, string> = {
      'home': 'À la maison',
      'gym': 'En salle de sport',
      'outdoor': 'En extérieur',
      'mixed': 'Mixte'
    };
    return translations[location] || location;
  };

  const generateStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < fullStars; i++) stars += '★';
    if (hasHalfStar) stars += '☆';
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) stars += '☆';

    return stars;
  };

  return (
    <>
      {isOpen && (
        <div className="decathlon-overlay" onClick={() => setIsOpen(false)}>
          <div className="decathlon-modal" onClick={(e) => e.stopPropagation()}>
            <button className="decathlon-close" onClick={() => setIsOpen(false)}>✕</button>

            <div className="decathlon-content-wrapper">
              <div className="decathlon-header">
                <h1>DECATHLON</h1>
                <p>Votre coach sportif personnel propulsé par l'IA</p>
              </div>

            {/* Intro Screen */}
            {currentStep === 'intro' && (
              <div className="decathlon-intro">
                <div className="intro-content">
                  <div className="intro-emoji">😅</div>
                  <h2>J'espère que tu m'en veux pas...</h2>
                  <p className="intro-text">
                    Je bosse chez Decathlon maintenant. Au fait, t'as 2-3 minutes ?
                  </p>
                  <p className="intro-text-bold">
                    On va parler de sport ! 💪
                  </p>
                  <button className="btn-primary" onClick={handleStartQuiz}>
                    C'est parti !
                  </button>
                </div>
              </div>
            )}

            {/* QCM Screen */}
            {currentStep === 'qcm' && (
              <div className="decathlon-qcm">
                <h2>Découvrez votre profil sportif</h2>
                <p className="subtitle">L'IA analysera vos réponses</p>

                <form onSubmit={handleFormSubmit}>
                  <div className="question">
                    <label>1. Combien de fois faites-vous du sport par semaine ?</label>
                    <div className="options">
                      <label className="radio-option">
                        <input type="radio" name="frequency" value="0-1" required />
                        <span>0-1 fois</span>
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="frequency" value="2-3" />
                        <span>2-3 fois</span>
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="frequency" value="4-5" />
                        <span>4-5 fois</span>
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="frequency" value="6+" />
                        <span>6+ fois</span>
                      </label>
                    </div>
                  </div>

                  <div className="question">
                    <label>2. Durée de vos séances ?</label>
                    <div className="options">
                      <label className="radio-option">
                        <input type="radio" name="duration" value="15-30" required />
                        <span>15-30 min</span>
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="duration" value="30-45" />
                        <span>30-45 min</span>
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="duration" value="45-60" />
                        <span>45-60 min</span>
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="duration" value="60+" />
                        <span>+1 heure</span>
                      </label>
                    </div>
                  </div>

                  <div className="question">
                    <label>3. Votre niveau sportif ?</label>
                    <div className="options">
                      <label className="radio-option">
                        <input type="radio" name="level" value="beginner" required />
                        <span>Débutant</span>
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="level" value="intermediate" />
                        <span>Intermédiaire</span>
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="level" value="advanced" />
                        <span>Avancé</span>
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="level" value="expert" />
                        <span>Expert</span>
                      </label>
                    </div>
                  </div>

                  <div className="question">
                    <label>4. Vos objectifs ?</label>
                    <div className="options">
                      <label className="radio-option">
                        <input type="radio" name="goal" value="weight-loss" required />
                        <span>Perte de poids</span>
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="goal" value="muscle-gain" />
                        <span>Prise de muscle</span>
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="goal" value="cardio" />
                        <span>Améliorer cardio</span>
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="goal" value="flexibility" />
                        <span>Souplesse</span>
                      </label>
                    </div>
                  </div>

                  <div className="question">
                    <label>5. Lieu d'entraînement ?</label>
                    <div className="options">
                      <label className="radio-option">
                        <input type="radio" name="location" value="home" required />
                        <span>Maison</span>
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="location" value="gym" />
                        <span>Salle de sport</span>
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="location" value="outdoor" />
                        <span>Extérieur</span>
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="location" value="mixed" />
                        <span>Mixte</span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary">Voir mes exercices</button>
                </form>
              </div>
            )}

            {/* Exercises Screen */}
            {currentStep === 'exercises' && (
              <div className="decathlon-exercises">
                {isLoading ? (
                  <div className="ai-loading">
                    <div className="ai-loader"></div>
                    <h3>L'IA analyse votre profil...</h3>
                  </div>
                ) : (
                  <>
                    <div className="ai-insight">
                      <h4>Analyse IA de votre profil</h4>
                      <p>{aiInsight}</p>
                    </div>

                    <h2>Exercices recommandés</h2>
                    {console.log('🎨 Rendering exercises, count:', exercises.length, 'exercises:', exercises)}
                    {exercises.length === 0 && (
                      <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                        ⚠️ Aucun exercice à afficher. Données: {JSON.stringify(exercises)}
                      </div>
                    )}
                    <div className="exercises-grid">
                      {exercises.map((ex, i) => (
                        <div key={i} className="exercise-card">
                          <div className="exercise-image">
                            {ex.image ? (
                              <img src={ex.image} alt={ex.name} onError={(e) => { e.currentTarget.style.display = 'none'; const parent = e.currentTarget.parentElement; if (parent) parent.innerHTML = '<span style="font-size: 4em;">💪</span>'; }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <span>💪</span>
                            )}
                          </div>
                          <div className="exercise-content">
                            <h3>{ex.name}</h3>
                            <span className="exercise-tag">{ex.category}</span>
                            <p>{ex.description}</p>
                            <div className="exercise-meta">
                              <span><strong>⏱</strong> {ex.duration}</span>
                              <span><strong>📊</strong> {translateLevel(ex.level)}</span>
                            </div>
                            <a href={ex.productLink} target="_blank" rel="noopener noreferrer" className="exercise-product-link">
                              🛒 {ex.productName}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="btn-primary" onClick={handleShowProducts}>
                      Découvrir les produits
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Products Screen */}
            {currentStep === 'products' && (
              <div className="decathlon-products">
                <h2>Produits Decathlon recommandés</h2>
                <div className="products-grid">
                  {products.map(product => (
                    <div key={product.id} className="product-card">
                      {product.badge && <div className="product-badge">{product.badge}</div>}
                      <div className="product-image">
                        {product.image ? (
                          <img src={product.image} alt={product.name} onError={(e) => { e.currentTarget.style.display = 'none'; const parent = e.currentTarget.parentElement; if (parent) parent.innerHTML = '<span style="font-size: 3em;">🏃</span>'; }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span>🏃</span>
                        )}
                      </div>
                      <div className="product-info">
                        <h3>{product.name}</h3>
                        <div className="product-rating">
                          <span className="stars">{generateStars(product.rating)}</span>
                          <span className="rating-text">({product.rating})</span>
                        </div>
                        <p className="description">{product.description}</p>
                        <p className="price">{product.price}</p>
                        <a href={product.link} target="_blank" rel="noopener noreferrer" className="product-link">
                          Voir sur Decathlon
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn-secondary" onClick={handleRestart}>
                  Recommencer
                </button>
              </div>
            )}
            </div>
          </div>
        </div>
      )}

      {/* Hidden trigger - will be controlled by parent */}
      <div style={{ display: 'none' }} id="decathlon-trigger" onClick={() => setIsOpen(true)}></div>
    </>
  );
};
