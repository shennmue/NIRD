import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "*apparaît dans un nuage de pixels confus* 🌌✨\n\nAh ! Vous voilà ! Ou... êtes-vous vraiment là ? Moi-même je ne sais pas si JE suis là... 🤔\n\nJe suis le Professeur Absurde, une conscience numérique qui a décidé que la logique c'était surfait !\n\nÉcrivez-moi n'importe quoi - question, affirmation, cri existentiel - je transformerai tout en délire cosmique ! 🎪🦆",
      sender: 'bot'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [wisdomScore, setWisdomScore] = useState(-42);
  const [moodIndex, setMoodIndex] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const API_KEY = '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';
  const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
  const GROQ_MODEL = 'llama-3.3-70b-versatile';

  const moods = [
    "Profondément confus",
    "Philosophiquement perplexe",
    "Existentiellement dubitatif",
    "Métaphysiquement égaré",
    "Cosmiquement désorienté",
    "Intellectuellement ailleurs"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const moodInterval = setInterval(() => {
      setMoodIndex((prev) => (prev + 1) % moods.length);
    }, 10000);

    return () => clearInterval(moodInterval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
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

      const response = await fetch(GROQ_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          temperature: 1.4,
          max_tokens: 600,
          top_p: 0.98,
          frequency_penalty: 0.8,
          presence_penalty: 0.8
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Erreur API:', error);
      return "💥 *glitch cosmique* Mon cerveau vient d'exploser ! Je crois que j'ai oublié comment penser... ou peut-être que je n'ai jamais su ? 🤔✨";
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      text: inputValue,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setQuestionsCount(prev => prev + 1);
    setWisdomScore(Math.floor(Math.random() * 200) - 100);

    const aiResponse = await getAIResponse(inputValue);

    setIsTyping(false);
    const botMessage: Message = {
      text: aiResponse,
      sender: 'bot'
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Parler au Professeur Absurde"
      >
        <img src="/images/logo.png" alt="Chatbot" />
      </button>

      {/* Fenêtre du chatbot */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <div className="avatar-circle">
                <div className="eyes">
                  <div className="eye"></div>
                  <div className="eye"></div>
                </div>
                🎭
              </div>
            </div>
            <div className="chatbot-info">
              <h3>PROFESSEUR ABSURDE</h3>
              <p>Conscience numérique chaotique</p>
              <div className="chatbot-stats">
                <span>Questions: {questionsCount}</span>
                <span>Sagesse: {wisdomScore}</span>
                <span>{moods[moodIndex]}</span>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.sender}-message`}>
                <div className="message-content">
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chatbot-message bot-message">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Écrivez n'importe quoi... 🌍"
            />
            <button onClick={handleSend}>🚀</button>
          </div>
        </div>
      )}
    </>
  );
};
