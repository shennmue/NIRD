import { useRef } from 'react';

export const VillageNIRD = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="village-nird"
      className="relative min-h-screen w-full bg-village-bg flex items-center justify-center overflow-hidden"
    >
      {/* Organic pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, var(--color-village-leaf) 1px, transparent 1px),
                           radial-gradient(circle at 80% 30%, var(--color-village-green) 1px, transparent 1px),
                           radial-gradient(circle at 50% 80%, var(--color-village-sky) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 text-center px-8 max-w-4xl">
        <h2 className="font-display text-[clamp(2rem,8vw,6rem)] text-village-green text-glow-green mb-6">
          LE VILLAGE NIRD
        </h2>
        <p className="font-body text-lg md:text-xl text-text-muted-dark leading-relaxed mb-8">
          Numérique Inclusif, Responsable et Durable. Un écosystème où la technologie sert l'humain et la planète.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-village-bg-secondary rounded-lg">
            <h3 className="font-display text-2xl text-village-green mb-2">Inclusif</h3>
            <p className="font-body text-sm text-text-dark">Accessible à tous, sans discrimination</p>
          </div>
          <div className="p-6 bg-village-bg-secondary rounded-lg">
            <h3 className="font-display text-2xl text-village-sky mb-2">Responsable</h3>
            <p className="font-body text-sm text-text-dark">Éthique et respectueux des données</p>
          </div>
          <div className="p-6 bg-village-bg-secondary rounded-lg">
            <h3 className="font-display text-2xl text-village-sun mb-2">Durable</h3>
            <p className="font-body text-sm text-text-dark">Sobre et éco-conçu</p>
          </div>
        </div>
      </div>
    </section>
  );
};
