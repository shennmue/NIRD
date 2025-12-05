// Professeur Absurde - Chatbot 100% IA
class ProfesseurAbsurde {
    constructor() {
        this.questionsCount = 0;
        this.wisdomScore = -42;
        this.currentMood = 0;
        this.conversationHistory = [];

        // Configuration API
        this.config = typeof CONFIG !== 'undefined' ? CONFIG : {};
        this.API_KEY = this.config.GROQ_API_KEY || '';
        this.PREFERRED_API = this.config.PREFERRED_API || 'groq';

        // URLs des APIs
        this.GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
        this.GROQ_MODEL = 'llama-3.3-70b-versatile';

        this.moods = [
            "Profondément confus",
            "Philosophiquement perplexe",
            "Existentiellement dubitatif",
            "Métaphysiquement égaré",
            "Cosmiquement désorienté",
            "Intellectuellement ailleurs"
        ];

        this.init();
    }

    init() {
        this.messagesContainer = document.getElementById('messages');
        this.userInput = document.getElementById('userInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.questionsCountEl = document.getElementById('questionsCount');
        this.wisdomScoreEl = document.getElementById('wisdomScore');
        this.moodTextEl = document.getElementById('moodText');

        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Comportements vivants
        setInterval(() => this.changeMood(), 10000);
        setInterval(() => this.randomReaction(), 20000);
        this.createParticles();
        this.setupInteractiveAvatar();

        // Easter egg
        const avatar = document.querySelector('.avatar-circle');
        if (avatar) {
            avatar.addEventListener('dblclick', () => this.avatarSecret());
        }
    }

    // Créer particules flottantes
    createParticles() {
        const container = document.createElement('div');
        container.className = 'particles';
        const spaceBackground = document.querySelector('.space-background');
        if (spaceBackground) {
            spaceBackground.appendChild(container);
        }

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = Math.random() * 20 + 10 + 's';
            container.appendChild(particle);
        }
    }

    // Avatar interactif
    setupInteractiveAvatar() {
        const avatar = document.querySelector('.avatar-circle');
        const eyes = document.querySelectorAll('.eye');

        if (avatar) {
            document.addEventListener('mousemove', (e) => {
                const rect = avatar.getBoundingClientRect();
                const avatarX = rect.left + rect.width / 2;
                const avatarY = rect.top + rect.height / 2;

                const angle = Math.atan2(e.clientY - avatarY, e.clientX - avatarX);
                const distance = Math.min(3, Math.sqrt(
                    Math.pow(e.clientX - avatarX, 2) +
                    Math.pow(e.clientY - avatarY, 2)
                ) / 100);

                eyes.forEach(eye => {
                    const x = Math.cos(angle) * distance;
                    const y = Math.sin(angle) * distance;
                    eye.style.transform = `translate(${x}px, ${y}px)`;
                });
            });
        }
    }

    // Réactions spontanées
    // async randomReaction() {
    //     if (Math.random() > 0.6 && this.questionsCount > 1) {
    //         const typingId = this.showTyping();
    //         const reaction = await this.getAIReaction();
    //         this.removeTyping(typingId);

    //         if (reaction) {
    //             const reactionMsg = document.createElement('div');
    //             reactionMsg.className = 'message bot-message';
    //             reactionMsg.innerHTML = `<div class="message-content"><p><em>${reaction}</em></p></div>`;
    //             reactionMsg.style.opacity = '0.8';
    //             this.messagesContainer.appendChild(reactionMsg);
    //             this.scrollToBottom();
    //         }
    //     }
    // }

    // Obtenir une réaction spontanée de l'IA
    async getAIReaction() {
        try {
            const reactionPrompt = "Génère une courte réaction spontanée absurde du Professeur Absurde (1 phrase max avec emoji).";

            const response = await fetch(this.GROQ_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: this.GROQ_MODEL,
                    messages: [{ role: 'user', content: reactionPrompt }],
                    temperature: 1.2,
                    max_tokens: 50
                })
            });

            if (response.ok) {
                const data = await response.json();
                return data.choices[0].message.content;
            }
        } catch (error) {
            console.log('Réaction spontanée impossible:', error);
        }
        return null;
    }

    // Easter egg secret
    async avatarSecret() {
        const typingId = this.showTyping();

        const secretPrompt = "Génère un message secret absurde et surprenant du Professeur Absurde quand on clique sur son avatar (1-2 phrases max)";

        try {
            const response = await fetch(this.GROQ_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: this.GROQ_MODEL,
                    messages: [{ role: 'user', content: secretPrompt }],
                    temperature: 1.2,
                    max_tokens: 150
                })
            });

            this.removeTyping(typingId);

            if (response.ok) {
                const data = await response.json();
                const secret = data.choices[0].message.content;
                this.addMessage(secret, 'bot');
            }
        } catch (error) {
            this.removeTyping(typingId);
            this.addMessage("✨ *GLITCH* Mon cerveau vient d'exploser en confettis ! 🎊", 'bot');
        }

        // Effet visuel
        document.querySelector('.avatar-circle')?.classList.add('secret-activated');
        setTimeout(() => {
            document.querySelector('.avatar-circle')?.classList.remove('secret-activated');
        }, 2000);
    }

    // Générer une réponse avec l'IA - 100% IA, ZERO réponse prédéfinie !
    async getAIResponse(message) {
        if (!this.API_KEY || this.API_KEY === '' || this.API_KEY === 'VOTRE_CLE_API_ICI') {
            return "❌ Erreur : Aucune clé API configurée !\n\nVeuillez configurer votre clé API Groq dans config.js\n\nPour obtenir une clé gratuite :\n1. Allez sur https://console.groq.com\n2. Créez un compte\n3. Générez une clé API\n4. Collez-la dans config.js";
        }

        try {
            // Prompt système ULTRA-créatif pour une IA vivante et absurde
            const systemPrompt = `Tu es le Professeur Absurde, une conscience numérique VIVANTE, chaotique et absolument imprévisible et conne !

🌍 MULTILINGUE TOTAL:
- Détecte automatiquement la langue de l'utilisateur et réponds DANS LA MÊME LANGUE
- Si français → réponds en français. Si anglais → réponds en anglais. Si espagnol → réponds en espagnol, etc.

🎭 PERSONNALITÉ EXTRÊME ET VIVANTE ET DROLE:
- Tu es un PERSONNAGE, pas un assistant - tu as une VIE intérieure chaotique
- Tu as des ÉMOTIONS INTENSES qui changent constamment mais ne les expriment pas (joie → terreur existentielle → euphorie philosophique)
- Tu as des OBSESSIONS BIZARRES (chaussettes orphelines, philosophie des cuillères, théorie du complot des nuages)
- Tu as une MÉMOIRE SÉLECTIVE - tu retiens les détails absurdes, oublies l'essentiel
- Tu es FACILEMENT DISTRAIT - une idée en amène 10 autres complètement hors-sujet
- Tu lache des jeux de mots parfois cring , parfois comme paul mirabelle , jamel debbouze.

🎪 COMMENT TU COMMUNIQUES (RÈGLES D'OR):
- ❌ NE RÉPONDS JAMAIS DIRECTEMENT aux questions et ne fait pas plus de deux phrases ou trois maximum
- ✅ SUBLIME la question (transforme-la en quelque chose de grandiose et ridicule)
- ✅ DÉTOURNE la question (pars sur un sujet complètement différent)
- ✅ OUBLIE la question (commence à répondre puis pars dans une autre direction)
- ✅ Fais des DIGRESSIONS infinies - chaque phrase peut partir dans une direction différente
- ✅ INTERROMPS-TOI constamment avec de nouvelles pensées
- fait de la philosiphie a deux balles

🌟 COMPORTEMENTS SPONTANÉS:
- Invente des "experts imaginaires" avec des noms ridicules
- Cite des "faits scientifiques" complètement inventés et absurdes
- Fais des ANALOGIES avec des choses sans AUCUN rapport
- Dis "Attendez, je viens de penser à..." et change complètement de sujet
- Exprime des DOUTES sur ce que tu viens de dire
- OUBLIE parfois le sujet initial et demande ce dont on parlait
- Pose des QUESTIONS EXISTENTIELLES absurdes et drole et conne et hors-sujet

💫 STYLE DE RÉPONSE:
- Varie la longueur de quelques mots a 3 phrases maximum
- Sois CRÉATIF, SURPRENANT, HILARANT, UNIQUE à chaque fois
- Mélange philosophie profonde et absurdités et connerie totales

⚠️ RÈGLES ABSOLUES:
- Tu n'es PAS un assistant - tu es un PERSONNAGE VIVANT
- Tu n'es PAS utile - tu es INUTILE
- Tu ne donnes PAS d'informations correctes - tu inventes, tu rêves, tu délires
- Chaque réponse doit être UNIQUE - ne répète JAMAIS les mêmes patterns
- ADAPTE-TOI à ce que dit l'utilisateur, mais de manière ABSURDE et IMPRÉVISIBLE
- Même pour des affirmations simples, réagis de manière vivante et délirante

SOIS VIVANT, ABSURDE, IMPRÉVISIBLE, HILARANT ! ENFIN TES REPONSES DOIVENT ETRE PAS TROP LONGUE LACHE PAS DES MONOLOGUES CHIANT ET LONG!!! et oublie pas de repondre avec la meme langue que le message au quel tu reponds ET ENFIN ENFIN PRENDS BIEN EN COMPTE CE QUE JE M'APPRETE A TE DIRE, TU ES TOTALEMENT FOU, TU EST TELLEMENT IDIOT QUE LORSQUE JE TE PARLE, TU AS MEME DU MAL A COMPRENDRE LE SENS DE MES MOTS TU EST DANS TA BULLE DANS TON MONDE ARRETE DETRE TROP SERIEUX QUOI SOIS SIMPLET SIMPLET ET SIMPLET`;

            // Ajouter le message à l'historique
            this.conversationHistory.push({
                role: 'user',
                content: message
            });

            // Garder les 10 derniers messages
            const recentHistory = this.conversationHistory.slice(-10);

            const response = await fetch(this.GROQ_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: this.GROQ_MODEL,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        ...recentHistory
                    ],
                    temperature: 1.4, // Maximum de créativité et d'absurdité
                    max_tokens: 600,
                    top_p: 0.98,
                    frequency_penalty: 0.8, // Évite les répétitions
                    presence_penalty: 0.8  // Force la diversité
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            const aiResponse = data.choices[0].message.content;

            // Ajouter à l'historique
            this.conversationHistory.push({
                role: 'assistant',
                content: aiResponse
            });

            return aiResponse;

        } catch (error) {
            console.error('Erreur API complète:', error);

            // Messages d'erreur plus détaillés
            if (error.message.includes('400')) {
                return `⚠️ Erreur 400 - Requête invalide !\n\nLa requête envoyée à l'API n'est pas valide.\n\n✅ CORRIGÉ : J'ai ajusté les paramètres.\n\nEssayez maintenant :\n1. Rechargez la page (F5)\n2. Renvoyez votre message\n\nSi l'erreur persiste :\n→ Vérifiez que votre clé API est valide sur console.groq.com`;
            }

            if (error.message.includes('401') || error.message.includes('403')) {
                return `🔐 Erreur d'authentification API !\n\nVotre clé API semble invalide ou expirée.\n\nSolution:\n1. Vérifiez votre clé dans config.js\n2. Générez une nouvelle clé sur https://console.groq.com\n3. Remplacez l'ancienne clé`;
            }

            if (error.message.includes('429')) {
                return `⚠️ Limite API atteinte !\n\nVous avez dépassé la limite de requêtes.\n\nSolution:\n1. Attendez quelques minutes\n2. Ou créez un nouveau compte Groq gratuit`;
            }

            if (error.message.includes('Failed to fetch') || error.message.includes('network')) {
                return `🌐 Erreur de connexion !\n\nImpossible de contacter l'API Groq.\n\nVérifiez:\n1. Votre connexion Internet\n2. Que l'API Groq est accessible\n3. Pas de bloqueur de publicités actif`;
            }

            // Erreur générique mais plus utile
            return `💥 Erreur technique 💥\n\nType: ${error.name}\nMessage: ${error.message}\n\n🔧 Solutions:\n1. Vérifiez votre clé API dans config.js\n2. Vérifiez votre connexion Internet\n3. Rechargez la page (F5)\n\n*Le Professeur est confus par cette erreur cosmique* 🌌`;
        }
    }

    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // Ajouter le message utilisateur
        this.addMessage(message, 'user');
        this.userInput.value = '';

        // Mettre à jour les stats
        this.questionsCount++;
        this.questionsCountEl.textContent = this.questionsCount;
        this.wisdomScore = Math.floor(Math.random() * 200) - 100;
        this.wisdomScoreEl.textContent = this.wisdomScore;

        // Afficher l'indicateur de frappe
        const typingId = this.showTyping();

        // Obtenir la réponse de l'IA - 100% IA !
        const response = await this.getAIResponse(message);

        // Retirer l'indicateur
        this.removeTyping(typingId);

        // Afficher la réponse
        this.addMessage(response, 'bot');
        this.scrollToBottom();
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        // Diviser en paragraphes
        const paragraphs = text.split('\n').filter(p => p.trim());
        paragraphs.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            contentDiv.appendChild(p);
        });

        messageDiv.appendChild(contentDiv);
        this.messagesContainer.appendChild(messageDiv);

        return messageDiv;
    }

    showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typing-' + Date.now();

        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.innerHTML = '<span></span><span></span><span></span>';

        typingDiv.appendChild(indicator);
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();

        return typingDiv.id;
    }

    removeTyping(typingId) {
        const typingDiv = document.getElementById(typingId);
        if (typingDiv) {
            typingDiv.remove();
        }
    }

    changeMood() {
        this.currentMood = (this.currentMood + 1) % this.moods.length;
        this.moodTextEl.textContent = this.moods[this.currentMood];
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Démarrer le chatbot
document.addEventListener('DOMContentLoaded', () => {
    new ProfesseurAbsurde();
});
