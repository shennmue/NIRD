import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EmpireIntro = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Fade in content as user scrolls into section
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="empire-intro"
      className="relative min-h-screen w-full bg-empire-bg flex items-center justify-center overflow-hidden"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 45, 45, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 45, 45, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div ref={contentRef} className="relative z-10 text-center px-8 max-w-6xl py-12">
        <h2 className="font-display text-[clamp(2rem,8vw,6rem)] text-empire-red text-glow-red mb-6">
          L'EMPIRE NUMÉRIQUE
        </h2>
        <p className="font-body text-xl md:text-2xl text-text-muted-light leading-relaxed mb-4 font-medium">
          Votre ordinateur fonctionne parfaitement... mais on vous dit qu'il est obsolète.
        </p>
        <p className="font-body text-base md:text-lg text-text-muted-light/80 leading-relaxed mb-8 max-w-4xl mx-auto">
          Cinq géants américains — Google, Amazon, Meta, Microsoft, Apple (les "GAFAM") — contrôlent
          l'essentiel du numérique mondial. Leurs décisions affectent des milliards d'utilisateurs.
          Aujourd'hui, Microsoft arrête les mises à jour de Windows 10, forçant le remplacement
          de plus de <span className="text-empire-red font-semibold">400 millions d'ordinateurs</span> encore fonctionnels.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
          <div className="p-6 bg-black/50 backdrop-blur-sm rounded-lg border border-empire-red/30">
            <h3 className="font-display text-xl text-empire-red mb-3">Obsolescence Programmée</h3>
            <p className="font-body text-sm text-text-muted-light leading-relaxed mb-3">
              <span className="text-text-light font-medium">C'est quoi ?</span> C'est quand un produit est conçu pour
              devenir inutilisable après un certain temps, vous forçant à en acheter un nouveau.
            </p>
            <p className="font-body text-sm text-text-muted-light leading-relaxed">
              <span className="text-text-light font-medium">Le piège :</span> Votre ordinateur ralentit ? Ce n'est pas
              lui qui vieillit mal — c'est Windows qui devient de plus en plus gourmand à chaque mise à jour.
              Un PC de 10 ans peut encore très bien fonctionner... avec le bon système.
            </p>
          </div>
          <div className="p-6 bg-black/50 backdrop-blur-sm rounded-lg border border-empire-red/30">
            <h3 className="font-display text-xl text-empire-red mb-3">Vos Données, Leur Trésor</h3>
            <p className="font-body text-sm text-text-muted-light leading-relaxed mb-3">
              <span className="text-text-light font-medium">C'est quoi ?</span> Chaque clic, chaque recherche,
              chaque document est collecté et analysé. Ces données valent de l'or pour la publicité ciblée.
            </p>
            <p className="font-body text-sm text-text-muted-light leading-relaxed">
              <span className="text-text-light font-medium">Le problème :</span> Vous n'êtes plus le client,
              vous êtes le produit. Vos habitudes, vos préférences, votre vie privée sont monétisées
              sans votre contrôle réel.
            </p>
          </div>
          <div className="p-6 bg-black/50 backdrop-blur-sm rounded-lg border border-empire-red/30">
            <h3 className="font-display text-xl text-empire-red mb-3">Désastre Écologique</h3>
            <p className="font-body text-sm text-text-muted-light leading-relaxed mb-3">
              <span className="text-text-light font-medium">Le chiffre choc :</span> 75% de l'impact environnemental
              du numérique vient de la <em>fabrication</em> des appareils, pas de leur utilisation.
            </p>
            <p className="font-body text-sm text-text-muted-light leading-relaxed">
              <span className="text-text-light font-medium">La réalité :</span> Jeter un ordinateur qui marche
              pour en acheter un neuf, c'est gaspiller les métaux rares, l'eau, l'énergie de sa fabrication.
              Et créer un déchet électronique souvent non recyclé.
            </p>
          </div>
          <div className="p-6 bg-black/50 backdrop-blur-sm rounded-lg border border-empire-red/30">
            <h3 className="font-display text-xl text-empire-red mb-3">La Facture Salée</h3>
            <p className="font-body text-sm text-text-muted-light leading-relaxed mb-3">
              <span className="text-text-light font-medium">Exemple concret :</span> En 2002, Microsoft a voulu
              faire payer 8 millions d'euros à la Gendarmerie juste pour une mise à jour Windows.
            </p>
            <p className="font-body text-sm text-text-muted-light leading-relaxed">
              <span className="text-text-light font-medium">Aujourd'hui :</span> Écoles, mairies, hôpitaux...
              Nos services publics paient des fortunes en licences logicielles à des entreprises américaines,
              alors que des alternatives gratuites existent.
            </p>
          </div>
          <div className="p-6 bg-black/50 backdrop-blur-sm rounded-lg border border-empire-red/30">
            <h3 className="font-display text-xl text-empire-red mb-3">Qui Décide Vraiment ?</h3>
            <p className="font-body text-sm text-text-muted-light leading-relaxed mb-3">
              <span className="text-text-light font-medium">La question :</span> Quand Microsoft décide d'arrêter
              Windows 10, avez-vous votre mot à dire ? Quand Google change ses conditions, pouvez-vous refuser ?
            </p>
            <p className="font-body text-sm text-text-muted-light leading-relaxed">
              <span className="text-text-light font-medium">L'enjeu :</span> Notre dépendance à ces géants
              est un risque pour notre souveraineté. Des décisions prises en Californie impactent
              nos écoles, nos administrations, notre quotidien.
            </p>
          </div>
          <div className="p-6 bg-black/50 backdrop-blur-sm rounded-lg border border-empire-red/30">
            <h3 className="font-display text-xl text-empire-red mb-3">Les Oubliés du Numérique</h3>
            <p className="font-body text-sm text-text-muted-light leading-relaxed mb-3">
              <span className="text-text-light font-medium">Le constat :</span> Quand il faut racheter un PC
              tous les 5 ans, les familles modestes décrochent. Les enfants sans ordinateur à la maison
              sont pénalisés dans leurs études.
            </p>
            <p className="font-body text-sm text-text-muted-light leading-relaxed">
              <span className="text-text-light font-medium">L'injustice :</span> L'obsolescence programmée
              n'est pas qu'un problème technique — c'est un facteur d'inégalité sociale qui creuse
              la fracture numérique.
            </p>
          </div>
        </div>

        <p className="font-body text-lg text-empire-red/90 leading-relaxed mt-10 max-w-3xl mx-auto font-medium">
          Et si on reprenait le contrôle ?
        </p>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, var(--color-empire-bg) 100%)',
        }}
      />
    </section>
  );
};
