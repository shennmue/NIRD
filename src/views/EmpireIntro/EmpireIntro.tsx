import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EmpireIntro = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Fade in hero content
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      }

      // Animate cards on scroll
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.empire-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'top 60%',
                scrub: 1,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="empire-intro"
      className="relative w-full bg-empire-bg"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 45, 45, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 45, 45, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Hero Section - Full screen */}
      <div
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 relative z-10"
      >
        <h2 className="font-display text-[clamp(2.5rem,10vw,7rem)] text-empire-red text-glow-red mb-8 leading-tight">
          L'EMPIRE NUMÉRIQUE
        </h2>
        <p className="font-body text-xl md:text-3xl text-text-muted-light leading-relaxed mb-6 font-medium max-w-3xl">
          Votre ordinateur fonctionne parfaitement...
          <br />
          <span className="text-empire-red">mais on vous dit qu'il est obsolète.</span>
        </p>
        <p className="font-body text-base md:text-xl text-text-muted-light/60 leading-relaxed max-w-2xl">
          Cinq géants américains — Google, Amazon, Meta, Microsoft, Apple — contrôlent
          l'essentiel du numérique mondial.
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
          <span className="font-body text-sm text-text-muted-light/40 uppercase tracking-widest">Découvrir</span>
          <svg className="w-5 h-5 text-empire-red/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Stats Section - Full screen */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 relative z-10">
        <p className="font-display text-[clamp(4rem,20vw,14rem)] text-empire-red text-glow-red leading-none">
          400M
        </p>
        <p className="font-body text-lg md:text-2xl text-text-muted-light mt-8 text-center max-w-xl leading-relaxed">
          d'ordinateurs rendus artificiellement obsolètes
          par la fin du support de Windows 10
        </p>
      </div>

      {/* Cards Section - Each card gets nearly full screen */}
      <div ref={cardsRef} className="relative z-10">

        {/* Card 1 */}
        <div className="empire-card min-h-screen flex items-center justify-center px-6 md:px-12 py-24">
          <div className="w-full max-w-xl text-center">
            <h3 className="font-display text-3xl md:text-5xl text-empire-red mb-8 leading-tight">
              Obsolescence Programmée
            </h3>
            <p className="font-body text-base md:text-lg text-text-muted-light leading-relaxed mb-6">
              <span className="text-text-light font-semibold">C'est quoi ?</span> C'est quand un produit est conçu pour
              devenir inutilisable après un certain temps, vous forçant à en acheter un nouveau.
            </p>
            <div className="w-16 h-px bg-empire-red/30 mx-auto my-8" />
            <p className="font-body text-base md:text-lg text-text-muted-light/70 leading-relaxed">
              Votre ordinateur ralentit ? Ce n'est pas lui qui vieillit mal — c'est Windows qui devient
              de plus en plus gourmand. Un PC de 10 ans peut encore très bien fonctionner...
              <span className="text-empire-red font-medium"> avec le bon système.</span>
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="empire-card min-h-screen flex items-center justify-center px-6 md:px-12 py-24">
          <div className="w-full max-w-xl text-center">
            <h3 className="font-display text-3xl md:text-5xl text-empire-red mb-8 leading-tight">
              Vos Données, Leur Trésor
            </h3>
            <p className="font-body text-base md:text-lg text-text-muted-light leading-relaxed mb-6">
              <span className="text-text-light font-semibold">C'est quoi ?</span> Chaque clic, chaque recherche,
              chaque document est collecté et analysé. Ces données valent de l'or pour la publicité ciblée.
            </p>
            <div className="w-16 h-px bg-empire-red/30 mx-auto my-8" />
            <p className="font-body text-base md:text-lg text-text-muted-light/70 leading-relaxed">
              Vous n'êtes plus le client, <span className="text-empire-red font-medium">vous êtes le produit</span>.
              Vos habitudes, vos préférences, votre vie privée sont monétisées sans votre contrôle réel.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="empire-card min-h-screen flex items-center justify-center px-6 md:px-12 py-24">
          <div className="w-full max-w-xl text-center">
            <h3 className="font-display text-3xl md:text-5xl text-empire-red mb-8 leading-tight">
              Désastre Écologique
            </h3>
            <p className="font-display text-[clamp(4rem,15vw,10rem)] text-empire-red text-glow-red leading-none my-8">
              75%
            </p>
            <p className="font-body text-base md:text-lg text-text-muted-light leading-relaxed mb-6">
              de l'impact environnemental du numérique vient de la <em>fabrication</em> des appareils,
              pas de leur utilisation.
            </p>
            <div className="w-16 h-px bg-empire-red/30 mx-auto my-8" />
            <p className="font-body text-base md:text-lg text-text-muted-light/70 leading-relaxed">
              Jeter un ordinateur qui marche, c'est gaspiller les métaux rares,
              l'eau, l'énergie de sa fabrication. Et créer un déchet électronique souvent non recyclé.
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="empire-card min-h-screen flex items-center justify-center px-6 md:px-12 py-24">
          <div className="w-full max-w-xl text-center">
            <h3 className="font-display text-3xl md:text-5xl text-empire-red mb-8 leading-tight">
              La Facture Salée
            </h3>
            <p className="font-display text-[clamp(4rem,15vw,10rem)] text-empire-red text-glow-red leading-none my-8">
              8M€
            </p>
            <p className="font-body text-base md:text-lg text-text-muted-light leading-relaxed mb-6">
              C'est ce que Microsoft a voulu faire payer à la Gendarmerie en 2002
              juste pour une mise à jour Windows.
            </p>
            <div className="w-16 h-px bg-empire-red/30 mx-auto my-8" />
            <p className="font-body text-base md:text-lg text-text-muted-light/70 leading-relaxed">
              Écoles, mairies, hôpitaux... Nos services publics paient des fortunes en licences
              à des entreprises américaines, alors que des alternatives gratuites existent.
            </p>
          </div>
        </div>

        {/* Card 5 */}
        <div className="empire-card min-h-screen flex items-center justify-center px-6 md:px-12 py-24">
          <div className="w-full max-w-xl text-center">
            <h3 className="font-display text-3xl md:text-5xl text-empire-red mb-8 leading-tight">
              Qui Décide Vraiment ?
            </h3>
            <p className="font-body text-base md:text-lg text-text-muted-light leading-relaxed mb-6">
              Quand Microsoft décide d'arrêter Windows 10, avez-vous votre mot à dire ?
              Quand Google change ses conditions, pouvez-vous refuser ?
            </p>
            <div className="w-16 h-px bg-empire-red/30 mx-auto my-8" />
            <p className="font-body text-base md:text-lg text-text-muted-light/70 leading-relaxed">
              Notre dépendance à ces géants est un risque pour notre souveraineté.
              <span className="text-empire-red font-medium"> Des décisions prises en Californie impactent
              nos écoles, nos administrations, notre quotidien.</span>
            </p>
          </div>
        </div>

        {/* Card 6 */}
        <div className="empire-card min-h-screen flex items-center justify-center px-6 md:px-12 py-24">
          <div className="w-full max-w-xl text-center">
            <h3 className="font-display text-3xl md:text-5xl text-empire-red mb-8 leading-tight">
              Les Oubliés du Numérique
            </h3>
            <p className="font-body text-base md:text-lg text-text-muted-light leading-relaxed mb-6">
              Quand il faut racheter un PC tous les 5 ans, les familles modestes décrochent.
              Les enfants sans ordinateur à la maison sont pénalisés dans leurs études.
            </p>
            <div className="w-16 h-px bg-empire-red/30 mx-auto my-8" />
            <p className="font-body text-base md:text-lg text-text-muted-light/70 leading-relaxed">
              L'obsolescence programmée n'est pas qu'un problème technique —
              <span className="text-empire-red font-medium"> c'est un facteur d'inégalité sociale</span> qui creuse
              la fracture numérique.
            </p>
          </div>
        </div>

      </div>

      {/* Call to Action - Full screen */}
      <div className="min-h-screen flex items-center justify-center px-6 md:px-12 relative z-10">
        <p className="font-display text-[clamp(1.5rem,5vw,4rem)] text-empire-red text-glow-red leading-tight text-center max-w-3xl">
          Et si on reprenait le contrôle ?
        </p>
      </div>

      {/* Vignette overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, var(--color-empire-bg) 100%)',
        }}
      />
    </section>
  );
};
