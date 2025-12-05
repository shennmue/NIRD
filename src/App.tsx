import { Hero, EmpireIntro, SwordGame, ShooterGame, VillageNIRD } from './views';
import { useLenis, useScrollbarColor } from './hooks';
import { Chatbot } from './components/Chatbot';
import { Decathlon } from './components/Decathlon';

function App() {
  useLenis();
  useScrollbarColor();

  return (
    <main>
      <Hero />
      <EmpireIntro />
      <SwordGame />
      <ShooterGame />
      <VillageNIRD />

      <footer className="min-h-[50vh] bg-village-bg flex items-center justify-center">
        <p className="font-body text-text-dark text-center">
          NIRD - Numérique Inclusif, Responsable et Durable
        </p>
      </footer>

      {/* Chatbot flottant */}
      <Chatbot />

      {/* Decathlon popup */}
      <Decathlon />
    </main>
  );
}

export default App;
