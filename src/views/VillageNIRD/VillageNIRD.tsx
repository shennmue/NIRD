import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const VillageNIRD = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax scroll effect on background image
      gsap.fromTo(
        bgRef.current,
        { y: 0 },
        {
          y: -200,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="village-nird"
      className="relative min-h-[200vh] w-full overflow-hidden"
      style={{ backgroundColor: '#298fba' }}
    >
      {/* Parallax background image */}
      <img
        ref={bgRef}
        src="/images/greencity.jpg"
        alt=""
        className="absolute top-0 left-0 w-full h-auto min-h-[130%] object-cover object-top"
      />

      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Content - sticky while scrolling */}
      <div className="sticky top-0 min-h-screen flex items-center justify-center py-12">
        <div className="relative z-10 text-center px-8 max-w-6xl">
          <h2 className="font-display text-[clamp(2rem,8vw,6rem)] text-text-light text-glow-green mb-6">
            LE VILLAGE NIRD
          </h2>
          <p className="font-body text-xl md:text-2xl text-text-light leading-relaxed mb-4 drop-shadow-lg font-medium">
            La solution existe. Elle est gratuite, écologique et déjà utilisée par des millions de personnes.
          </p>
          <p className="font-body text-base md:text-lg text-text-light/90 leading-relaxed mb-8 drop-shadow-lg max-w-4xl mx-auto">
            <span className="text-village-leaf font-semibold">Linux</span>, c'est un système d'exploitation
            alternatif à Windows — libre, gratuit et beaucoup plus léger. Résultat ? Un ordinateur de 10 ans
            retrouve sa jeunesse. Plus besoin de jeter, plus besoin de racheter. Et vos données restent les vôtres.
          </p>

          {/* C'est quoi NIRD */}
          <div className="mb-10 p-6 bg-black/40 backdrop-blur-sm rounded-lg border border-village-green/30">
            <h3 className="font-display text-2xl text-text-light mb-4">NIRD, c'est quoi ?</h3>
            <p className="font-body text-sm text-text-light/80 leading-relaxed max-w-3xl mx-auto">
              Un mouvement né dans les écoles françaises pour adopter Linux et les logiciels libres.
              Des enseignants, des élèves, des collectivités qui refusent le gaspillage imposé
              et reprennent le contrôle de leur informatique. NIRD signifie
              <span className="text-village-leaf"> Numérique Inclusif</span>,
              <span className="text-village-sky"> Responsable</span> et
              <span className="text-village-sun"> Durable</span>.
            </p>
          </div>

          {/* Les 3 piliers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-black/40 backdrop-blur-sm rounded-lg border border-village-green/30">
              <h3 className="font-display text-2xl text-village-leaf mb-3">Inclusif</h3>
              <p className="font-body text-sm text-text-light/80 leading-relaxed mb-3">
                <span className="text-text-light font-medium">Le principe :</span> Le numérique pour tous,
                pas seulement pour ceux qui peuvent se payer le dernier modèle.
              </p>
              <p className="font-body text-sm text-text-light/80 leading-relaxed">
                <span className="text-text-light font-medium">En pratique :</span> Les vieux PC reconditionnés
                sont donnés aux familles qui en ont besoin. Les élèves de tous niveaux participent au projet,
                chacun selon ses talents.
              </p>
            </div>
            <div className="p-6 bg-black/40 backdrop-blur-sm rounded-lg border border-village-sky/30">
              <h3 className="font-display text-2xl text-village-sky mb-3">Responsable</h3>
              <p className="font-body text-sm text-text-light/80 leading-relaxed mb-3">
                <span className="text-text-light font-medium">Le principe :</span> Reprendre le contrôle
                sur nos outils et nos données. Comprendre ce qu'on utilise.
              </p>
              <p className="font-body text-sm text-text-light/80 leading-relaxed">
                <span className="text-text-light font-medium">En pratique :</span> Avec Linux, pas de
                collecte de données cachée. Les élèves apprennent à protéger leur vie privée et développent
                un vrai esprit critique face au numérique.
              </p>
            </div>
            <div className="p-6 bg-black/40 backdrop-blur-sm rounded-lg border border-village-sun/30">
              <h3 className="font-display text-2xl text-village-sun mb-3">Durable</h3>
              <p className="font-body text-sm text-text-light/80 leading-relaxed mb-3">
                <span className="text-text-light font-medium">Le principe :</span> Arrêter de jeter
                ce qui fonctionne encore. Faire durer au lieu de gaspiller.
              </p>
              <p className="font-body text-sm text-text-light/80 leading-relaxed">
                <span className="text-text-light font-medium">En pratique :</span> Un PC sous Linux
                peut durer 15 ans au lieu de 5. Chaque machine sauvée, c'est moins de pollution
                et moins d'argent dépensé.
              </p>
            </div>
          </div>

          {/* Comment ça marche */}
          <h3 className="font-display text-2xl text-text-light mt-10 mb-6 drop-shadow-lg">
            Comment rejoindre le mouvement ?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-5 bg-black/40 backdrop-blur-sm rounded-lg border border-village-leaf/30">
              <h4 className="font-display text-lg text-village-leaf mb-2">1. On se lance</h4>
              <p className="font-body text-sm text-text-light/80 leading-relaxed">
                Un prof motivé lève la main et devient le contact NIRD de l'école. Il rejoint
                la communauté sur Tchap (la messagerie sécurisée de l'État) pour échanger avec
                d'autres établissements déjà engagés.
              </p>
            </div>
            <div className="p-5 bg-black/40 backdrop-blur-sm rounded-lg border border-village-sky/30">
              <h4 className="font-display text-lg text-village-sky mb-2">2. On teste</h4>
              <p className="font-body text-sm text-text-light/80 leading-relaxed">
                Quelques ordinateurs passent sous Linux. Les élèves peuvent même créer un club
                pour apprendre à réparer et reconditionner les vieilles machines. C'est concret,
                c'est formateur, et ça marche !
              </p>
            </div>
            <div className="p-5 bg-black/40 backdrop-blur-sm rounded-lg border border-village-sun/30">
              <h4 className="font-display text-lg text-village-sun mb-2">3. On généralise</h4>
              <p className="font-body text-sm text-text-light/80 leading-relaxed">
                Ça fonctionne ? On étend à tout l'établissement, en partenariat avec la mairie,
                le département ou la région. Le projet s'inscrit officiellement dans la vie de l'école.
              </p>
            </div>
          </div>

          {/* Preuves que ça marche */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
            <div className="p-6 bg-black/40 backdrop-blur-sm rounded-lg border border-village-leaf/30">
              <h3 className="font-display text-xl text-village-leaf mb-3">Les élèves au cœur du projet</h3>
              <p className="font-body text-sm text-text-light/80 leading-relaxed mb-3">
                Imaginez : des collégiens et lycéens qui démontent des PC, diagnostiquent les pannes,
                changent les pièces défectueuses et installent Linux. Ils apprennent la technique,
                le travail en équipe, et la satisfaction de donner une seconde vie aux objets.
              </p>
              <p className="font-body text-sm text-text-light/80 leading-relaxed">
                Ces ordinateurs réparés sont ensuite donnés aux familles qui en ont besoin
                ou aux écoles voisines. C'est de l'écologie concrète ET de la solidarité.
              </p>
            </div>
            <div className="p-6 bg-black/40 backdrop-blur-sm rounded-lg border border-village-sky/30">
              <h3 className="font-display text-xl text-village-sky mb-3">Ça marche déjà !</h3>
              <p className="font-body text-sm text-text-light/80 leading-relaxed mb-3">
                <span className="text-text-light font-medium">La Gendarmerie Nationale :</span> 100 000
                ordinateurs sous Linux depuis 2002. 20 ans de retour d'expérience positif.
                "C'est un non-sujet pour nous aujourd'hui !"
              </p>
              <p className="font-body text-sm text-text-light/80 leading-relaxed">
                <span className="text-text-light font-medium">La ville d'Échirolles :</span> 2 millions
                d'euros économisés sur un mandat. Lyon, Grenoble, Strasbourg, Blois suivent le mouvement.
              </p>
            </div>
          </div>

          {/* Soutien officiel */}
          <div className="mt-8 p-6 bg-black/30 backdrop-blur-sm rounded-lg border border-text-light/20">
            <h3 className="font-display text-lg text-text-light mb-3">Ce n'est pas une initiative isolée</h3>
            <p className="font-body text-sm text-text-light/80 leading-relaxed">
              L'Éducation Nationale recommande l'usage des logiciels libres. La loi AGEC impose 50% de
              réemploi pour le matériel public. L'ADEME, la Commission européenne et l'UNESCO soutiennent
              cette démarche. NIRD s'inscrit dans un mouvement de fond, pas dans une lubie de geeks.
            </p>
          </div>

          <p className="font-body text-lg text-village-leaf leading-relaxed mt-10 drop-shadow-lg max-w-3xl mx-auto font-medium">
            "On n'est pas perdus, tout fonctionne pareil. Et mon travail est exactement le même qu'avant."
          </p>
          <p className="font-body text-sm text-text-light/60 mt-2">— Témoignage d'une utilisatrice à Échirolles</p>
        </div>
      </div>
    </section>
  );
};
