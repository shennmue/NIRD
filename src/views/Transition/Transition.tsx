import { useRef } from 'react';

export const Transition = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="transition"
      className="relative min-h-[200vh] w-full overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, var(--color-empire-bg) 0%, var(--color-empire-bg-tertiary) 30%, var(--color-village-bg-tertiary) 70%, var(--color-village-bg) 100%)',
      }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="text-center px-8 max-w-4xl">
          <h2 className="font-display text-[clamp(2rem,6vw,4rem)] text-text-light mb-6">
            LA RÉSISTANCE S'ORGANISE
          </h2>
          <p className="font-body text-lg text-text-muted-light">
            Un autre numérique est possible...
          </p>
        </div>
      </div>
    </section>
  );
};
