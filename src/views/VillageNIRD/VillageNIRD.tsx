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
      className="relative min-h-[500vh] w-full overflow-hidden"
      style={{ backgroundColor: '#298fba' }}
    >
      {/* Parallax background image */}
      <img
        ref={bgRef}
        src="/images/greencity.jpg"
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover object-center"
        style={{ objectFit: 'cover', minHeight: '100%' }}
      />

      {/* Gradient overlay for depth and readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/20" />

      {/* Animated light rays */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-village-leaf/30 via-transparent to-transparent animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-village-sky/30 via-transparent to-transparent animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-village-sun/30 via-transparent to-transparent animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* Content - sticky while scrolling */}
      <div className="sticky top-0 min-h-screen flex items-center justify-center py-16 md:py-20">
        <div className="relative z-10 text-center px-6 md:px-10 lg:px-12 max-w-7xl w-full">
          <div className="mb-12 animate-fade-in">
            <h2 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] text-text-light text-glow-green mb-8 md:mb-10 tracking-wide relative">
              <span className="relative inline-block">
                LE VILLAGE NIRD
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-village-leaf to-transparent opacity-60"></div>
              </span>
            </h2>
            <p className="font-body text-xl md:text-2xl lg:text-3xl text-text-light leading-relaxed mb-6 drop-shadow-lg font-medium max-w-5xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              La solution existe. Elle est gratuite, écologique et déjà utilisée par des millions de personnes.
            </p>
          </div>
          <p className="font-body text-base md:text-lg lg:text-xl text-text-light/90 leading-loose mb-64 drop-shadow-lg max-w-4xl mx-auto">
            <span className="text-village-leaf font-semibold">Linux</span>, c'est un système d'exploitation
            alternatif à Windows — libre, gratuit et beaucoup plus léger. Résultat ? Un ordinateur de 10 ans
            retrouve sa jeunesse. Plus besoin de jeter, plus besoin de racheter. Et vos données restent les vôtres.
          </p>

          {/* C'est quoi NIRD */}
          <div className="mb-64 p-10 md:p-12 bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-lg rounded-3xl border-2 border-village-green/50 shadow-2xl hover:shadow-village-green/20 transition-all duration-500 group relative overflow-hidden">
            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full" style={{ transition: 'transform 1s ease-in-out' }}></div>

            <h3 className="font-display text-3xl md:text-4xl text-text-light mb-6 tracking-wide relative">
              <span className="bg-gradient-to-r from-village-leaf via-village-sky to-village-sun bg-clip-text text-transparent">
                NIRD, c'est quoi ?
              </span>
            </h3>
            <p className="font-body text-base md:text-lg text-text-light/90 leading-loose max-w-4xl mx-auto relative">
              Un mouvement né dans les écoles françaises pour adopter Linux et les logiciels libres.
              Des enseignants, des élèves, des collectivités qui refusent le gaspillage imposé
              et reprennent le contrôle de leur informatique. NIRD signifie
              <span className="text-village-leaf font-bold px-2 py-1 bg-village-leaf/10 rounded-md mx-1">Numérique Inclusif</span>,
              <span className="text-village-sky font-bold px-2 py-1 bg-village-sky/10 rounded-md mx-1">Responsable</span> et
              <span className="text-village-sun font-bold px-2 py-1 bg-village-sun/10 rounded-md mx-1">Durable</span>.
            </p>
          </div>

          {/* Les 3 piliers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 lg:gap-24 mb-64">
            <div className="group p-8 bg-gradient-to-br from-village-leaf/5 via-black/30 to-black/40 backdrop-blur-md rounded-3xl border-2 border-village-leaf/40 hover:border-village-leaf hover:from-village-leaf/10 transition-all duration-500 hover:shadow-[0_0_40px_rgba(76,175,80,0.3)] hover:scale-[1.08] cursor-pointer relative overflow-hidden">
              {/* Icon background glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-village-leaf/20 rounded-full blur-3xl group-hover:bg-village-leaf/30 transition-all duration-500"></div>

              <div className="relative">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-village-leaf/20 to-village-leaf/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-village-leaf" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-village-leaf mb-5 tracking-wide group-hover:text-white transition-colors duration-300">Inclusif</h3>
              <p className="font-body text-sm md:text-base text-text-light/85 leading-loose mb-4">
                <span className="text-text-light font-semibold text-base">Le principe :</span> Le numérique pour tous,
                pas seulement pour ceux qui peuvent se payer le dernier modèle.
              </p>
              <p className="font-body text-sm md:text-base text-text-light/75 leading-loose group-hover:text-text-light/90 transition-colors duration-300">
                <span className="text-text-light font-semibold text-base">En pratique :</span> Les vieux PC reconditionnés
                sont donnés aux familles qui en ont besoin. Les élèves de tous niveaux participent au projet,
                chacun selon ses talents.
              </p>
              </div>
            </div>
            <div className="group p-8 bg-gradient-to-br from-village-sky/5 via-black/30 to-black/40 backdrop-blur-md rounded-3xl border-2 border-village-sky/40 hover:border-village-sky hover:from-village-sky/10 transition-all duration-500 hover:shadow-[0_0_40px_rgba(3,169,244,0.3)] hover:scale-[1.08] cursor-pointer relative overflow-hidden">
              {/* Icon background glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-village-sky/20 rounded-full blur-3xl group-hover:bg-village-sky/30 transition-all duration-500"></div>

              <div className="relative">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-village-sky/20 to-village-sky/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-village-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-village-sky mb-5 tracking-wide group-hover:text-white transition-colors duration-300">Responsable</h3>
              <p className="font-body text-sm md:text-base text-text-light/85 leading-loose mb-4">
                <span className="text-text-light font-semibold text-base">Le principe :</span> Reprendre le contrôle
                sur nos outils et nos données. Comprendre ce qu'on utilise.
              </p>
              <p className="font-body text-sm md:text-base text-text-light/75 leading-loose group-hover:text-text-light/90 transition-colors duration-300">
                <span className="text-text-light font-semibold text-base">En pratique :</span> Avec Linux, pas de
                collecte de données cachée. Les élèves apprennent à protéger leur vie privée et développent
                un vrai esprit critique face au numérique.
              </p>
              </div>
            </div>
            <div className="group p-8 bg-gradient-to-br from-village-sun/5 via-black/30 to-black/40 backdrop-blur-md rounded-3xl border-2 border-village-sun/40 hover:border-village-sun hover:from-village-sun/10 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,179,0,0.3)] hover:scale-[1.08] cursor-pointer relative overflow-hidden">
              {/* Icon background glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-village-sun/20 rounded-full blur-3xl group-hover:bg-village-sun/30 transition-all duration-500"></div>

              <div className="relative">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-village-sun/20 to-village-sun/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-village-sun" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-village-sun mb-5 tracking-wide group-hover:text-white transition-colors duration-300">Durable</h3>
              <p className="font-body text-sm md:text-base text-text-light/85 leading-loose mb-4">
                <span className="text-text-light font-semibold text-base">Le principe :</span> Arrêter de jeter
                ce qui fonctionne encore. Faire durer au lieu de gaspiller.
              </p>
              <p className="font-body text-sm md:text-base text-text-light/75 leading-loose group-hover:text-text-light/90 transition-colors duration-300">
                <span className="text-text-light font-semibold text-base">En pratique :</span> Un PC sous Linux
                peut durer 15 ans au lieu de 5. Chaque machine sauvée, c'est moins de pollution
                et moins d'argent dépensé.
              </p>
              </div>
            </div>
          </div>

          {/* Comment ça marche */}
          <h3 className="font-display text-3xl md:text-4xl text-text-light mb-20 drop-shadow-lg tracking-wide">
            Comment rejoindre le mouvement ?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 lg:gap-24 text-left mb-64">
            {/* Step 1 */}
            <div className="group p-8 bg-gradient-to-br from-village-leaf/5 via-black/30 to-black/40 backdrop-blur-md rounded-3xl border-2 border-village-leaf/40 hover:border-village-leaf hover:from-village-leaf/10 transition-all duration-500 hover:shadow-[0_0_40px_rgba(76,175,80,0.3)] hover:scale-[1.08] cursor-pointer relative overflow-hidden">
              {/* Icon background glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-village-leaf/20 rounded-full blur-3xl group-hover:bg-village-leaf/30 transition-all duration-500"></div>

              <div className="relative">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-village-leaf/20 to-village-leaf/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-village-leaf" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-display text-2xl md:text-3xl text-village-leaf mb-4 tracking-wide group-hover:text-white transition-colors duration-300">1. On se lance</h4>
                <p className="font-body text-sm md:text-base text-text-light/85 leading-loose">
                  Un prof motivé lève la main et devient le contact NIRD de l'école. Il rejoint
                  la communauté sur Tchap (la messagerie sécurisée de l'État) pour échanger avec
                  d'autres établissements déjà engagés.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group p-8 bg-gradient-to-br from-village-sky/5 via-black/30 to-black/40 backdrop-blur-md rounded-3xl border-2 border-village-sky/40 hover:border-village-sky hover:from-village-sky/10 transition-all duration-500 hover:shadow-[0_0_40px_rgba(33,150,243,0.3)] hover:scale-[1.08] cursor-pointer relative overflow-hidden">
              {/* Icon background glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-village-sky/20 rounded-full blur-3xl group-hover:bg-village-sky/30 transition-all duration-500"></div>

              <div className="relative">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-village-sky/20 to-village-sky/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-village-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="font-display text-2xl md:text-3xl text-village-sky mb-4 tracking-wide group-hover:text-white transition-colors duration-300">2. On teste</h4>
                <p className="font-body text-sm md:text-base text-text-light/85 leading-loose">
                  Quelques ordinateurs passent sous Linux. Les élèves peuvent même créer un club
                  pour apprendre à réparer et reconditionner les vieilles machines. C'est concret,
                  c'est formateur, et ça marche !
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group p-8 bg-gradient-to-br from-village-sun/5 via-black/30 to-black/40 backdrop-blur-md rounded-3xl border-2 border-village-sun/40 hover:border-village-sun hover:from-village-sun/10 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,193,7,0.3)] hover:scale-[1.08] cursor-pointer relative overflow-hidden">
              {/* Icon background glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-village-sun/20 rounded-full blur-3xl group-hover:bg-village-sun/30 transition-all duration-500"></div>

              <div className="relative">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-village-sun/20 to-village-sun/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-village-sun" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="font-display text-2xl md:text-3xl text-village-sun mb-4 tracking-wide group-hover:text-white transition-colors duration-300">3. On généralise</h4>
                <p className="font-body text-sm md:text-base text-text-light/85 leading-loose">
                  Ça fonctionne ? On étend à tout l'établissement, en partenariat avec la mairie,
                  le département ou la région. Le projet s'inscrit officiellement dans la vie de l'école.
                </p>
              </div>
            </div>
          </div>

          {/* Preuves que ça marche */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-24 text-left mb-56">
            {/* Card 1 */}
            <div className="group p-8 md:p-10 bg-gradient-to-br from-village-leaf/5 via-black/30 to-black/40 backdrop-blur-lg rounded-3xl border-2 border-village-leaf/40 hover:border-village-leaf hover:from-village-leaf/10 transition-all duration-500 hover:shadow-[0_0_40px_rgba(76,175,80,0.3)] hover:scale-[1.06] cursor-pointer relative overflow-hidden">
              {/* Icon background glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-village-leaf/20 rounded-full blur-3xl group-hover:bg-village-leaf/30 transition-all duration-500"></div>

              <div className="relative">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-village-leaf/20 to-village-leaf/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-village-leaf" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-village-leaf mb-6 tracking-wide group-hover:text-white transition-colors duration-300">Les élèves au cœur du projet</h3>
                <p className="font-body text-sm md:text-base text-text-light/85 leading-loose mb-5">
                  Imaginez : des collégiens et lycéens qui démontent des PC, diagnostiquent les pannes,
                  changent les pièces défectueuses et installent Linux. Ils apprennent la technique,
                  le travail en équipe, et la satisfaction de donner une seconde vie aux objets.
                </p>
                <p className="font-body text-sm md:text-base text-text-light/75 leading-loose">
                  Ces ordinateurs réparés sont ensuite donnés aux familles qui en ont besoin
                  ou aux écoles voisines. C'est de l'écologie concrète ET de la solidarité.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group p-8 md:p-10 bg-gradient-to-br from-village-sky/5 via-black/30 to-black/40 backdrop-blur-lg rounded-3xl border-2 border-village-sky/40 hover:border-village-sky hover:from-village-sky/10 transition-all duration-500 hover:shadow-[0_0_40px_rgba(33,150,243,0.3)] hover:scale-[1.06] cursor-pointer relative overflow-hidden">
              {/* Icon background glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-village-sky/20 rounded-full blur-3xl group-hover:bg-village-sky/30 transition-all duration-500"></div>

              <div className="relative">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-village-sky/20 to-village-sky/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-village-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-village-sky mb-6 tracking-wide group-hover:text-white transition-colors duration-300">Ça marche déjà !</h3>
                <p className="font-body text-sm md:text-base text-text-light/85 leading-loose mb-5">
                  <span className="text-text-light font-semibold text-base">La Gendarmerie Nationale :</span> 100 000
                  ordinateurs sous Linux depuis 2002. 20 ans de retour d'expérience positif.
                  "C'est un non-sujet pour nous aujourd'hui !"
                </p>
                <p className="font-body text-sm md:text-base text-text-light/75 leading-loose">
                  <span className="text-text-light font-semibold text-base">La ville d'Échirolles :</span> 2 millions
                  d'euros économisés sur un mandat. Lyon, Grenoble, Strasbourg, Blois suivent le mouvement.
                </p>
              </div>
            </div>
          </div>

          {/* Soutien officiel */}
          <div className="group p-10 md:p-12 bg-gradient-to-br from-text-light/5 via-black/30 to-black/40 backdrop-blur-lg rounded-3xl border-2 border-text-light/30 hover:border-text-light/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] mb-56 relative overflow-hidden">
            {/* Icon background glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-text-light/10 rounded-full blur-3xl group-hover:bg-text-light/20 transition-all duration-500"></div>

            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-text-light/20 to-text-light/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-text-light mb-6 tracking-wide text-center">Ce n'est pas une initiative isolée</h3>
              <p className="font-body text-sm md:text-base text-text-light/85 leading-loose text-center max-w-4xl mx-auto">
                L'Éducation Nationale recommande l'usage des logiciels libres. La loi AGEC impose 50% de
                réemploi pour le matériel public. L'ADEME, la Commission européenne et l'UNESCO soutiennent
                cette démarche. NIRD s'inscrit dans un mouvement de fond, pas dans une lubie de geeks.
              </p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="group p-10 md:p-12 bg-gradient-to-r from-village-leaf/10 via-village-sky/5 to-village-leaf/10 backdrop-blur-lg rounded-3xl border-2 border-village-leaf/40 hover:border-village-leaf/60 transition-all duration-500 hover:shadow-[0_0_40px_rgba(76,175,80,0.2)] relative overflow-hidden mb-64">
            {/* Quote icon background */}
            <div className="absolute top-4 left-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
              <svg className="w-20 h-20 text-village-leaf" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <div className="relative">
              <p className="font-body text-lg md:text-xl text-text-light leading-loose drop-shadow-lg max-w-4xl mx-auto font-medium italic text-center">
                "On n'est pas perdus, tout fonctionne pareil. Et mon travail est exactement le même qu'avant."
              </p>
              <p className="font-body text-sm md:text-base text-text-light/70 mt-6 text-center">— Témoignage d'une utilisatrice à Échirolles</p>
            </div>
          </div>

          {/* Footer Section */}
          <div className="relative mt-32 pt-20 pb-12 text-center">
            {/* Decorative divider */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-village-leaf to-transparent opacity-60"></div>

            <div className="space-y-8">
              {/* Call to action */}
              <h3 className="font-display text-2xl md:text-4xl text-village-leaf mb-6 tracking-wide">
                Rejoignez le Mouvement NIRD
              </h3>

              <p className="font-body text-base md:text-lg text-text-light/85 leading-relaxed max-w-3xl mx-auto mb-10">
                Ensemble, construisons un numérique plus juste, plus écologique et plus souverain.
              </p>

              {/* Contact/Links Section */}
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                <a href="#" className="group px-6 py-3 bg-village-leaf/10 hover:bg-village-leaf/20 border-2 border-village-leaf/40 hover:border-village-leaf rounded-xl transition-all duration-300 hover:scale-105">
                  <span className="font-body text-sm md:text-base text-text-light group-hover:text-village-leaf transition-colors">
                    Nous Contacter
                  </span>
                </a>
                <a href="#" className="group px-6 py-3 bg-village-sky/10 hover:bg-village-sky/20 border-2 border-village-sky/40 hover:border-village-sky rounded-xl transition-all duration-300 hover:scale-105">
                  <span className="font-body text-sm md:text-base text-text-light group-hover:text-village-sky transition-colors">
                    Documentation
                  </span>
                </a>
                <a href="#" className="group px-6 py-3 bg-village-sun/10 hover:bg-village-sun/20 border-2 border-village-sun/40 hover:border-village-sun rounded-xl transition-all duration-300 hover:scale-105">
                  <span className="font-body text-sm md:text-base text-text-light group-hover:text-village-sun transition-colors">
                    Communauté
                  </span>
                </a>
              </div>

              {/* Footer info */}
              <div className="pt-8 border-t border-text-light/10">
                <p className="font-body text-sm text-text-light/60">
                  NIRD - Numérique Inclusif, Responsable et Durable
                </p>
                <p className="font-body text-xs text-text-light/40 mt-2">
                  Un mouvement pour reprendre le contrôle de notre informatique
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Image Section */}
          <div className="relative mt-80 w-full">
            <img
              src="/images/gene.png"
              alt="Gene"
              className="w-full h-auto object-cover rounded-2xl"
            />
            {/* Clickable area in the center */}
            <button
              onClick={() => {
                const trigger = document.getElementById('decathlon-trigger');
                if (trigger) trigger.click();
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-transparent hover:bg-white/10 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-white/30 hover:scale-110"
              aria-label="Ouvrir Decathlon"
              title="Cliquez ici pour découvrir Decathlon"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
