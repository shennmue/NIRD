import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Counting animation for stats
const CountUp = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * target));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export const EmpireIntro = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hero content fade in and slide up
      if (heroRef.current) {
        const heroElements = heroRef.current.querySelectorAll('.hero-animate');
        heroElements.forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              delay: i * 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: heroRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }

      // Cards - simple fade in and slide up
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.empire-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }

      // Scanline effect
      gsap.to('.scanline', {
        y: '100vh',
        duration: 3,
        repeat: -1,
        ease: 'none',
      });

      // Random flicker on grid
      const flickerGrid = () => {
        gsap.to('.grid-bg', {
          opacity: 0.1 + Math.random() * 0.15,
          duration: 0.05,
          onComplete: () => {
            gsap.to('.grid-bg', {
              opacity: 0.2,
              duration: 0.1,
              delay: Math.random() * 0.1,
            });
          },
        });
      };

      // Random grid flickers
      const flickerInterval = setInterval(() => {
        if (Math.random() < 0.3) flickerGrid();
      }, 500);

      return () => clearInterval(flickerInterval);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="empire-intro"
      className="relative w-full bg-empire-bg overflow-hidden"
    >
      {/* Animated grid background */}
      <div
        className="grid-bg absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 45, 45, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 45, 45, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Scanline effect */}
      <div className="scanline absolute left-0 w-full h-[2px] bg-empire-red/10 pointer-events-none z-20" />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-12 relative z-10"
      >
        <h2 className="hero-animate font-display text-[clamp(2.5rem,10vw,7rem)] text-empire-red text-glow-red mb-8 leading-tight">
          L'EMPIRE NUMÉRIQUE
        </h2>
        <p className="hero-animate font-body text-xl md:text-3xl text-text-muted-light leading-relaxed mb-6 font-medium max-w-3xl">
          Votre ordinateur fonctionne parfaitement...
          <br />
          <span className="text-empire-red">mais on vous dit qu'il est obsolète.</span>
        </p>
        <p className="hero-animate font-body text-base md:text-xl text-text-muted-light/60 leading-relaxed max-w-2xl">
          Cinq géants américains — Google, Amazon, Meta, Microsoft, Apple — contrôlent
          l'essentiel du numérique mondial.
        </p>

        {/* Scroll indicator */}
        <div className="hero-animate absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="font-body text-sm text-text-muted-light/40 uppercase tracking-widest">Découvrir</span>
          <div className="w-px h-12 bg-gradient-to-b from-empire-red/60 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Stats Section */}
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 md:px-12 relative z-10">
        <p className="font-display text-[clamp(4rem,18vw,12rem)] text-empire-red text-glow-red leading-none">
          <CountUp target={400} suffix="M" />
        </p>
        <p className="font-body text-lg md:text-2xl text-text-muted-light mt-6 text-center max-w-xl leading-relaxed">
          d'ordinateurs rendus artificiellement obsolètes
          par la fin du support de Windows 10
        </p>
      </div>

      {/* Cards Section */}
      <div ref={cardsRef} className="relative z-10">

        {/* Card 1 */}
        <div className="empire-card min-h-[60vh] flex items-center justify-center px-6 md:px-12 py-12">
          <div className="w-full max-w-xl text-center">
            <h3 className="font-display text-2xl md:text-4xl text-empire-red mb-6 leading-tight">
              Obsolescence Programmée
            </h3>
            <p className="font-body text-base md:text-lg text-text-muted-light leading-relaxed mb-4">
              <span className="text-text-light font-semibold">C'est quoi ?</span> C'est quand un produit est conçu pour
              devenir inutilisable après un certain temps, vous forçant à en acheter un nouveau.
            </p>
            <div className="w-12 h-px bg-empire-red/40 mx-auto my-6" />
            <p className="font-body text-base md:text-lg text-text-muted-light/70 leading-relaxed">
              Votre ordinateur ralentit ? Ce n'est pas lui qui vieillit mal — c'est Windows qui devient
              de plus en plus gourmand. Un PC de 10 ans peut encore très bien fonctionner
              <span className="text-empire-red font-medium"> avec le bon système.</span>
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="empire-card min-h-[60vh] flex items-center justify-center px-6 md:px-12 py-12">
          <div className="w-full max-w-xl text-center">
            <h3 className="font-display text-2xl md:text-4xl text-empire-red mb-6 leading-tight">
              Vos Données, Leur Trésor
            </h3>
            <p className="font-body text-base md:text-lg text-text-muted-light leading-relaxed mb-4">
              <span className="text-text-light font-semibold">C'est quoi ?</span> Chaque clic, chaque recherche,
              chaque document est collecté et analysé. Ces données valent de l'or pour la publicité ciblée.
            </p>
            <div className="w-12 h-px bg-empire-red/40 mx-auto my-6" />
            <p className="font-body text-base md:text-lg text-text-muted-light/70 leading-relaxed">
              Vous n'êtes plus le client, <span className="text-empire-red font-medium">vous êtes le produit</span>.
              Vos habitudes, vos préférences, votre vie privée sont monétisées sans votre contrôle réel.
            </p>
          </div>
        </div>

        {/* Card 3 - with stat */}
        <div className="empire-card min-h-[60vh] flex items-center justify-center px-6 md:px-12 py-12">
          <div className="w-full max-w-xl text-center">
            <h3 className="font-display text-2xl md:text-4xl text-empire-red mb-4 leading-tight">
              Désastre Écologique
            </h3>
            <p className="font-display text-[clamp(3rem,12vw,8rem)] text-empire-red text-glow-red leading-none my-4">
              <CountUp target={75} suffix="%" />
            </p>
            <p className="font-body text-base md:text-lg text-text-muted-light leading-relaxed mb-4">
              de l'impact environnemental du numérique vient de la <em>fabrication</em> des appareils,
              pas de leur utilisation.
            </p>
            <div className="w-12 h-px bg-empire-red/40 mx-auto my-6" />
            <p className="font-body text-base md:text-lg text-text-muted-light/70 leading-relaxed">
              Jeter un ordinateur qui marche, c'est gaspiller les métaux rares,
              l'eau, l'énergie. Et créer un déchet électronique souvent non recyclé.
            </p>
          </div>
        </div>

        {/* Card 4 - with stat */}
        <div className="empire-card min-h-[60vh] flex items-center justify-center px-6 md:px-12 py-12">
          <div className="w-full max-w-xl text-center">
            <h3 className="font-display text-2xl md:text-4xl text-empire-red mb-4 leading-tight">
              La Facture Salée
            </h3>
            <p className="font-display text-[clamp(3rem,12vw,8rem)] text-empire-red text-glow-red leading-none my-4">
              <CountUp target={8} suffix="M€" />
            </p>
            <p className="font-body text-base md:text-lg text-text-muted-light leading-relaxed mb-4">
              C'est ce que Microsoft a voulu faire payer à la Gendarmerie en 2002
              juste pour une mise à jour Windows.
            </p>
            <div className="w-12 h-px bg-empire-red/40 mx-auto my-6" />
            <p className="font-body text-base md:text-lg text-text-muted-light/70 leading-relaxed">
              Écoles, mairies, hôpitaux... Nos services publics paient des fortunes en licences
              à des entreprises américaines, alors que des alternatives gratuites existent.
            </p>
          </div>
        </div>

        {/* Card 5 */}
        <div className="empire-card min-h-[60vh] flex items-center justify-center px-6 md:px-12 py-12">
          <div className="w-full max-w-xl text-center">
            <h3 className="font-display text-2xl md:text-4xl text-empire-red mb-6 leading-tight">
              Qui Décide Vraiment ?
            </h3>
            <p className="font-body text-base md:text-lg text-text-muted-light leading-relaxed mb-4">
              Quand Microsoft décide d'arrêter Windows 10, avez-vous votre mot à dire ?
              Quand Google change ses conditions, pouvez-vous refuser ?
            </p>
            <div className="w-12 h-px bg-empire-red/40 mx-auto my-6" />
            <p className="font-body text-base md:text-lg text-text-muted-light/70 leading-relaxed">
              Notre dépendance à ces géants est un risque pour notre souveraineté.
              <span className="text-empire-red font-medium"> Des décisions prises en Californie impactent
              nos écoles, nos administrations, notre quotidien.</span>
            </p>
          </div>
        </div>

        {/* Card 6 */}
        <div className="empire-card min-h-[60vh] flex items-center justify-center px-6 md:px-12 py-12">
          <div className="w-full max-w-xl text-center">
            <h3 className="font-display text-2xl md:text-4xl text-empire-red mb-6 leading-tight">
              Les Oubliés du Numérique
            </h3>
            <p className="font-body text-base md:text-lg text-text-muted-light leading-relaxed mb-4">
              Quand il faut racheter un PC tous les 5 ans, les familles modestes décrochent.
              Les enfants sans ordinateur à la maison sont pénalisés dans leurs études.
            </p>
            <div className="w-12 h-px bg-empire-red/40 mx-auto my-6" />
            <p className="font-body text-base md:text-lg text-text-muted-light/70 leading-relaxed">
              L'obsolescence programmée n'est pas qu'un problème technique —
              <span className="text-empire-red font-medium"> c'est un facteur d'inégalité sociale</span> qui creuse
              la fracture numérique.
            </p>
          </div>
        </div>

      </div>

      {/* Call to Action */}
      <div className="min-h-[40vh] flex items-center justify-center px-6 md:px-12 relative z-10">
        <p className="font-display text-[clamp(1.5rem,5vw,3.5rem)] text-empire-red text-glow-red leading-tight text-center max-w-3xl">
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
