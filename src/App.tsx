import { useState } from 'react';
import { Hero, EmpireIntro, Transition, VillageNIRD } from './views';

type AppState = 'intro' | 'scrollytelling';

function App() {
  const [appState, setAppState] = useState<AppState>('intro');

  const handleHeroComplete = () => {
    setAppState('scrollytelling');
  };

  if (appState === 'intro') {
    return <Hero onComplete={handleHeroComplete} />;
  }

  return (
    <main>
      <EmpireIntro />
      <Transition />
      <VillageNIRD />

      <footer className="min-h-[50vh] bg-village-bg flex items-center justify-center">
        <p className="font-body text-text-dark text-center">
          NIRD - Numérique Inclusif, Responsable et Durable
        </p>
      </footer>
    </main>
  );
}

export default App;
