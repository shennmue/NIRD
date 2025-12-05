import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cityRef = useRef<HTMLImageElement>(null);
  const robotRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      tl.to(cityRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
      });

      tl.to(
        robotRef.current,
        {
          y: 0,
          opacity: 1,
          scale: 0.6,
          duration: 1,
        },
        '-=0.6'
      );

      tl.to(
        titleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        '-=0.5'
      );

      // Scroll-triggered fade out and parallax
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-empire-bg"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      <div
        ref={contentRef}
        className="relative w-full h-full flex flex-col items-center justify-center z-1"
      >
        <h1
          ref={titleRef}
          className="font-display text-[clamp(3rem,10vw,8rem)] font-black uppercase tracking-widest text-text-light text-glow-red absolute top-[10%] z-1 opacity-0 -translate-y-[100px]"
        >
          BIG TECH REVOLUTION
        </h1>

        <img
          ref={cityRef}
          src="/images/city.png"
          alt="Cyberpunk City"
          className="absolute bottom-0 left-0 w-full h-auto max-h-[45vh] object-cover object-bottom z-3 opacity-0 translate-y-full"
        />

        <img
          ref={robotRef}
          src="/images/HeroRobot.png"
          alt="Attack Robot"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full scale-50 w-[80%] max-w-[1200px] h-auto z-1 opacity-0 glow-red"
        />
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-5"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, var(--color-empire-bg) 100%)',
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-6 opacity-30"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.1) 0px,
            rgba(0, 0, 0, 0.1) 1px,
            transparent 1px,
            transparent 2px
          )`,
        }}
      />
    </section>
  );
};
