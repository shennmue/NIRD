import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stopScroll, startScroll } from '../../hooks';

gsap.registerPlugin(ScrollTrigger);

interface Enemy {
  id: number;
  x: number;
  y: number;
  speed: number;
  alive: boolean;
}

interface Bullet {
  id: number;
  x: number;
  y: number;
}

export const ShooterGame = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const resistanceRef = useRef<HTMLImageElement>(null);
  const shipRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [shipX, setShipX] = useState(50);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [showResistance, setShowResistance] = useState(false);

  const bulletIdRef = useRef(0);
  const enemyIdRef = useRef(0);
  const gameLoopRef = useRef<number | null>(null);
  const spawnIntervalRef = useRef<number | null>(null);

  const GAME_HEIGHT = 500;
  const SHIP_Y = GAME_HEIGHT - 80;
  const ENEMY_SIZE = 60;
  const BULLET_SIZE = 10;
  const WIN_SCORE = 10;

  // Text fade in animation (from Transition)
  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 20%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Spawn enemies
  const spawnEnemy = useCallback(() => {
    if (gameOver) return;
    const newEnemy: Enemy = {
      id: enemyIdRef.current++,
      x: Math.random() * 80 + 10,
      y: -10,
      speed: 0.3 + Math.random() * 0.3,
      alive: true,
    };
    setEnemies(prev => [...prev, newEnemy]);
  }, [gameOver]);

  // Fire bullet
  const fire = useCallback(() => {
    if (!gameStarted || gameOver) return;
    const newBullet: Bullet = {
      id: bulletIdRef.current++,
      x: shipX,
      y: SHIP_Y,
    };
    setBullets(prev => [...prev, newBullet]);
  }, [gameStarted, gameOver, shipX]);

  // Handle mouse/touch movement
  const handleMove = useCallback((clientX: number) => {
    if (!gameRef.current || !gameStarted || gameOver) return;
    const rect = gameRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setShipX(Math.max(5, Math.min(95, x)));
  }, [gameStarted, gameOver]);

  // Handle keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;
      if (e.key === 'ArrowLeft') {
        setShipX(prev => Math.max(5, prev - 5));
      } else if (e.key === 'ArrowRight') {
        setShipX(prev => Math.min(95, prev + 5));
      } else if (e.key === ' ') {
        e.preventDefault();
        fire();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver, fire]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = () => {
      // Move bullets up
      setBullets(prev =>
        prev
          .map(b => ({ ...b, y: b.y - 8 }))
          .filter(b => b.y > 0)
      );

      // Move enemies down
      setEnemies(prev => {
        const updated = prev.map(e => ({
          ...e,
          y: e.alive ? e.y + e.speed : e.y,
        }));

        // Check if any enemy reached bottom
        const reachedBottom = updated.some(e => e.alive && e.y > GAME_HEIGHT - 50);
        if (reachedBottom) {
          setGameOver(true);
        }

        return updated.filter(e => e.y < GAME_HEIGHT + 50);
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameStarted, gameOver]);

  // Collision detection
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    bullets.forEach(bullet => {
      enemies.forEach(enemy => {
        if (!enemy.alive) return;

        const bulletCenterX = bullet.x;
        const bulletCenterY = (bullet.y / GAME_HEIGHT) * 100;
        const enemyCenterX = enemy.x;
        const enemyCenterY = (enemy.y / GAME_HEIGHT) * 100;

        const distance = Math.sqrt(
          Math.pow(bulletCenterX - enemyCenterX, 2) +
          Math.pow(bulletCenterY - enemyCenterY, 2)
        );

        if (distance < 8) {
          // Hit!
          setEnemies(prev =>
            prev.map(e => (e.id === enemy.id ? { ...e, alive: false } : e))
          );
          setBullets(prev => prev.filter(b => b.id !== bullet.id));
          setScore(prev => {
            const newScore = prev + 1;
            if (newScore >= WIN_SCORE) {
              setGameOver(true);
              setShowResistance(true);
            }
            return newScore;
          });
        }
      });
    });
  }, [bullets, enemies, gameStarted, gameOver]);

  // Spawn enemies periodically
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    spawnIntervalRef.current = window.setInterval(() => {
      spawnEnemy();
    }, 1500);

    return () => {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    };
  }, [gameStarted, gameOver, spawnEnemy]);

  // Disable scroll while game is active
  useEffect(() => {
    if (gameStarted && !gameOver) {
      stopScroll();
    } else if (!showResistance) {
      startScroll();
    }

    return () => {
      if (!showResistance) {
        startScroll();
      }
    };
  }, [gameStarted, gameOver, showResistance]);

  // Resistance slide-in animation and auto-hide
  useEffect(() => {
    if (showResistance && resistanceRef.current) {
      // Disable scroll
      stopScroll();

      gsap.fromTo(
        resistanceRef.current,
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }
      );

      // Hide resistance overlay after 3 seconds
      const timer = setTimeout(() => {
        setShowResistance(false);
        startScroll();
      }, 3000);

      return () => {
        clearTimeout(timer);
        startScroll();
      };
    }
  }, [showResistance]);

  // Start game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setEnemies([]);
    setBullets([]);
    setShowResistance(false);
    setShipX(50);
  };

  // Restart game
  const restartGame = () => {
    startGame();
  };

  return (
    <section
      ref={sectionRef}
      id="shooter-game"
      className="relative w-full overflow-hidden"
    >
      {/* Fullscreen Resistance Overlay - auto hides after 3s */}
      {showResistance && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-end bg-black/80 pointer-events-none">
          <h3 className="font-display text-[clamp(2rem,6vw,4rem)] text-village-leaf text-glow-green mb-4 text-center">
            VICTOIRE !
          </h3>
          <img
            ref={resistanceRef}
            src="/images/resistance.png"
            alt="La Resistance"
            className="w-full max-h-[70vh] object-contain object-bottom"
          />
        </div>
      )}

      {/* Single unified gradient from empire dark to sky blue */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom,
              var(--color-empire-bg) 0%,
              var(--color-empire-bg-secondary) 15%,
              var(--color-empire-bg-tertiary) 30%,
              #0a1525 45%,
              #0a2a4a 60%,
              #0a4a7a 75%,
              #1a6a9a 88%,
              #298fba 100%
            )
          `,
        }}
      />

      {/* Subtle grid fading out - from Transition */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          maskImage: 'linear-gradient(to bottom, white 0%, transparent 30%)',
          WebkitMaskImage: 'linear-gradient(to bottom, white 0%, transparent 30%)',
        }}
      />

      {/* Starfield overlay - fades out towards bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(0, 245, 255, 0.1) 0%, transparent 30%),
            radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 30%)
          `,
          maskImage: 'linear-gradient(to bottom, transparent 0%, white 20%, white 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 20%, white 60%, transparent 100%)',
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Transition Text - "La Résistance S'organise" */}
      <div className="relative z-10 min-h-screen w-full flex items-center justify-center">
        <div ref={textRef} className="text-center px-8 max-w-4xl">
          <h2 className="font-display text-[clamp(2rem,6vw,4rem)] text-text-light text-glow-cyan mb-6">
            LA RÉSISTANCE S'ORGANISE
          </h2>
          <p className="font-body text-lg text-text-light/70">
            Un autre numérique est possible...
          </p>
        </div>
      </div>

      {/* Game Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-12 px-6">
        {/* Title */}
        <h2 className="font-display text-[clamp(1.5rem,5vw,3rem)] text-text-light text-glow-cyan mb-4 text-center">
          DETRUISEZ L'EMPIRE
        </h2>
        <p className="font-body text-sm text-text-light/70 mb-6 text-center">
          Utilisez la souris ou les fleches pour bouger, cliquez ou appuyez sur espace pour tirer
        </p>

        {/* Score */}
        <div className="mb-4 flex items-center gap-4">
          <div className="px-4 py-2 bg-empire-cyan/20 rounded-lg border border-empire-cyan/40">
            <span className="font-body text-empire-cyan text-lg">
              Score: {score} / {WIN_SCORE}
            </span>
          </div>
        </div>

        {/* Game Container */}
        <div
          ref={gameRef}
          className="relative w-full max-w-2xl bg-black/50 rounded-xl border border-empire-cyan/30 overflow-hidden cursor-crosshair"
          style={{ height: GAME_HEIGHT }}
          onClick={fire}
          onMouseMove={(e) => handleMove(e.clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        >
          {/* Start Screen */}
          {!gameStarted && !showResistance && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startGame();
                }}
                className="px-8 py-4 bg-empire-cyan text-empire-bg font-display text-xl rounded-lg hover:bg-empire-cyan/80 transition-colors"
              >
                COMMENCER
              </button>
            </div>
          )}

          {/* Game Over Screen (lost) */}
          {gameOver && !showResistance && score < WIN_SCORE && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
              <h3 className="font-display text-3xl text-empire-red text-glow-red mb-4">
                GAME OVER
              </h3>
              <p className="font-body text-text-light/70 mb-6">Score: {score}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  restartGame();
                }}
                className="px-8 py-4 bg-empire-cyan text-empire-bg font-display text-xl rounded-lg hover:bg-empire-cyan/80 transition-colors"
              >
                REJOUER
              </button>
            </div>
          )}

          {/* Victory Screen (won - shows after resistance overlay) */}
          {gameOver && !showResistance && score >= WIN_SCORE && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
              <h3 className="font-display text-3xl text-village-leaf text-glow-green mb-4">
                VICTOIRE !
              </h3>
              <p className="font-body text-text-light/70 mb-6">Score: {score} / {WIN_SCORE}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  restartGame();
                }}
                className="px-8 py-4 bg-village-leaf text-white font-display text-xl rounded-lg hover:bg-village-green transition-colors"
              >
                REJOUER
              </button>
            </div>
          )}

          {/* Enemies (HeroRobot) */}
          {enemies.map(enemy => (
            <div
              key={enemy.id}
              className={`absolute transition-opacity duration-200 ${enemy.alive ? 'opacity-100' : 'opacity-0'}`}
              style={{
                left: `${enemy.x}%`,
                top: enemy.y,
                transform: 'translateX(-50%)',
              }}
            >
              {enemy.alive ? (
                <img
                  src="/images/HeroRobot.png"
                  alt="Enemy"
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255, 45, 45, 0.6))' }}
                />
              ) : (
                <img
                  src="/images/explod.gif"
                  alt="Explosion"
                  className="w-16 h-16 object-contain"
                />
              )}
            </div>
          ))}

          {/* Bullets */}
          {bullets.map(bullet => (
            <div
              key={bullet.id}
              className="absolute w-2 h-6 bg-empire-cyan rounded-full"
              style={{
                left: `${bullet.x}%`,
                top: bullet.y,
                transform: 'translateX(-50%)',
                boxShadow: '0 0 10px rgba(0, 245, 255, 0.8)',
              }}
            />
          ))}

          {/* Ship */}
          {gameStarted && !gameOver && (
            <img
              ref={shipRef}
              src="/images/ship.gif"
              alt="Ship"
              className="absolute w-16 h-16 object-contain"
              style={{
                left: `${shipX}%`,
                top: SHIP_Y,
                transform: 'translateX(-50%) rotate(-45deg)',
                filter: 'drop-shadow(0 0 10px rgba(0, 245, 255, 0.6))',
              }}
            />
          )}
        </div>

        {/* Instructions */}
        <p className="font-body text-xs text-text-light/50 mt-4 text-center">
          Eliminez {WIN_SCORE} robots pour reveler la resistance !
        </p>
      </div>
    </section>
  );
};
