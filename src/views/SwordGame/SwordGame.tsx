import { useRef, useState, useEffect, Suspense, useCallback, forwardRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center, OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stopScroll, startScroll } from '../../hooks';

gsap.registerPlugin(ScrollTrigger);

// 2D Sword component that follows mouse in screen space
const Sword2D = ({
  mousePos,
  rotation,
}: {
  mousePos: { x: number; y: number };
  rotation: number;
}) => {
  const { scene } = useGLTF('/3d/sword.glb');
  const swordRef = useRef<THREE.Group>(null);

  // Clone the scene
  const clonedScene = scene.clone();
  clonedScene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  useFrame(() => {
    if (!swordRef.current) return;
    // Direct position update - sword follows mouse exactly
    swordRef.current.position.x = mousePos.x;
    swordRef.current.position.y = mousePos.y;
    swordRef.current.rotation.z = rotation;
  });

  return (
    <group ref={swordRef} position={[0, 0, 0]}>
      <Center>
        <primitive object={clonedScene} scale={0.5} rotation={[0, 0, -Math.PI / 4]} />
      </Center>
    </group>
  );
};

// Game scene with orthographic camera for 2D-like rendering
const GameScene = ({
  mousePos,
  rotation,
}: {
  mousePos: { x: number; y: number };
  rotation: number;
}) => {
  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-3, 2, 2]} intensity={0.8} color="#ff6666" />

      <Suspense fallback={null}>
        <Sword2D mousePos={mousePos} rotation={rotation} />
      </Suspense>
    </>
  );
};

// Instruction dialog component
const InstructionDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-empire-bg border-2 border-empire-red rounded-lg p-8 max-w-md mx-4">
        <h3 className="font-display text-2xl md:text-3xl text-empire-red mb-4 text-center">
          REPRENDS LE CONTROLE !
        </h3>
        <div className="space-y-4 font-body text-text-muted-light">
          <p className="text-center">
            Un robot de l'Empire Numerique approche...
          </p>
          <div className="bg-black/40 rounded-lg p-4 space-y-2">
            <p className="flex items-center gap-2">
              <span className="text-empire-red">1.</span> Clique et maintiens pour saisir l'epee
            </p>
            <p className="flex items-center gap-2">
              <span className="text-empire-red">2.</span> Deplace la souris rapidement pour frapper
            </p>
            <p className="flex items-center gap-2">
              <span className="text-empire-red">3.</span> Frappe le robot 3 fois pour le detruire !
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-empire-red text-text-light font-display text-lg rounded-lg
                     hover:bg-empire-red/80 transition-colors cursor-pointer"
        >
          COMMENCER
        </button>
      </div>
    </div>
  );
};

// Victory screen
const VictoryScreen = ({ isOpen }: { isOpen: boolean }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-none">
      <div className="text-center">
        <h3 className="font-display text-4xl md:text-6xl text-village-leaf text-glow-green mb-4 animate-bounce">
          VICTOIRE !
        </h3>
        <p className="font-body text-xl text-text-light">
          L'Empire a ete vaincu. Bienvenue au Village NIRD !
        </p>
      </div>
    </div>
  );
};

// Robot using the HeroRobot image - with forwardRef for hit detection
const RobotImage = forwardRef<HTMLDivElement, { isHit: boolean; hitCount: number }>(
  ({ isHit, hitCount }, ref) => {
    const [shakeClass, setShakeClass] = useState('');

    useEffect(() => {
      if (hitCount > 0 && !isHit) {
        setShakeClass('animate-shake');
        const timer = setTimeout(() => setShakeClass(''), 300);
        return () => clearTimeout(timer);
      }
    }, [hitCount, isHit]);

    if (isHit) {
      return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative animate-explode">
            {/* Explosion fragments */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-6 h-6 bg-empire-red rounded"
                style={{
                  animation: `explode-fragment 0.8s ease-out forwards`,
                  animationDelay: `${i * 0.03}s`,
                  transform: `rotate(${i * 30}deg) translateY(-20px)`,
                }}
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform ${shakeClass}`}
        style={{
          filter: `hue-rotate(${hitCount * 30}deg) brightness(${1 + hitCount * 0.2})`,
        }}
      >
        <img
          src="/images/HeroRobot.png"
          alt="Robot de l'Empire"
          className="w-48 h-auto md:w-64 lg:w-80 object-contain drop-shadow-[0_0_30px_rgba(255,45,45,0.6)]"
          style={{
            animation: 'float 3s ease-in-out infinite',
          }}
        />
        {/* Health bar */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-2 bg-black/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-empire-red transition-all duration-300"
            style={{ width: `${((3 - hitCount) / 3) * 100}%` }}
          />
        </div>
      </div>
    );
  }
);

// Main component
export const SwordGame = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [hitCount, setHitCount] = useState(0);
  const [victory, setVictory] = useState(false);

  // Mouse position for sword (in Three.js coordinates)
  const [mousePos, setMousePos] = useState({ x: 0, y: -2 });
  const [swordRotation, setSwordRotation] = useState(0);

  // Track velocity for hit detection
  const lastMousePos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastHitTime = useRef(0);
  const hasTriggered = useRef(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          setIsInView(true);
          if (hasTriggered.current) return;
          hasTriggered.current = true;
          setIsVisible(true);
        },
        onEnterBack: () => {
          setIsInView(true);
          if (hasTriggered.current) return;
          hasTriggered.current = true;
          setIsVisible(true);
        },
        onLeave: () => setIsInView(false),
        onLeaveBack: () => setIsInView(false),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate container when it becomes visible
  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { x: '100vw', rotation: 360, scale: 0.3 },
      {
        x: 0,
        rotation: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        onComplete: () => setShowInstructions(true),
      }
    );
  }, [isVisible]);

  // Disable scroll while game is active (from instructions to victory) AND in view
  useEffect(() => {
    if (isInView && (showInstructions || (gameStarted && !victory))) {
      stopScroll();
    } else {
      startScroll();
    }

    return () => {
      startScroll();
    };
  }, [showInstructions, gameStarted, victory, isInView]);

  // Mouse/touch tracking for sword
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!gameAreaRef.current || !gameStarted || victory) return;

    const rect = gameAreaRef.current.getBoundingClientRect();
    // Convert screen coords to Three.js orthographic coords (-5 to 5 range roughly)
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 8;

    // Calculate velocity
    velocity.current.x = x - lastMousePos.current.x;
    velocity.current.y = y - lastMousePos.current.y;

    // Calculate rotation based on movement direction
    const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
    if (speed > 0.1) {
      const angle = Math.atan2(velocity.current.y, velocity.current.x);
      setSwordRotation(angle + Math.PI / 4);
    }

    lastMousePos.current = { x, y };
    setMousePos({ x, y });

    // Check for hit with robot
    checkHit(e.clientX, e.clientY, speed);
  }, [gameStarted, victory]);

  const checkHit = useCallback((screenX: number, screenY: number, speed: number) => {
    if (!robotRef.current || hitCount >= 3) return;

    const now = Date.now();
    if (now - lastHitTime.current < 500) return; // Cooldown between hits

    const robotRect = robotRef.current.getBoundingClientRect();
    const robotCenterX = robotRect.left + robotRect.width / 2;
    const robotCenterY = robotRect.top + robotRect.height / 2;

    // Check if sword is near robot and moving fast enough
    const distance = Math.sqrt(
      (screenX - robotCenterX) ** 2 +
      (screenY - robotCenterY) ** 2
    );

    const hitRadius = Math.max(robotRect.width, robotRect.height) * 0.6;

    if (distance < hitRadius && speed > 0.3) {
      lastHitTime.current = now;
      setHitCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 3) {
          setTimeout(() => setVictory(true), 800);
        }
        return newCount;
      });
    }
  }, [hitCount]);

  const handleStartGame = () => {
    setShowInstructions(false);
    setGameStarted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-empire-bg overflow-hidden flex items-center justify-center"
    >
      {/* Background effects */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 45, 45, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 45, 45, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shake {
          0%, 100% { transform: translate(-50%, -50%) translateX(0); }
          25% { transform: translate(-50%, -50%) translateX(-10px); }
          75% { transform: translate(-50%, -50%) translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        @keyframes explode-fragment {
          0% { opacity: 1; transform: rotate(var(--rotation, 0deg)) translateY(-20px) scale(1); }
          100% { opacity: 0; transform: rotate(var(--rotation, 0deg)) translateY(-100px) scale(0); }
        }
        .animate-explode {
          animation: explode 0.5s ease-out forwards;
        }
        @keyframes explode {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(2); }
        }
      `}</style>

      {isVisible && (
        <div
          ref={containerRef}
          className="absolute inset-0"
          style={{ transform: 'translateX(100vw)' }}
        >
          {/* Full screen game container */}
          <div
            ref={gameAreaRef}
            className="absolute inset-0 overflow-hidden bg-gradient-to-b from-gray-900 to-black cursor-none"
            onPointerMove={handlePointerMove}
          >
            {gameStarted && (
              <>
                {/* 3D Canvas for sword - renders in 2D orthographic view */}
                <Canvas style={{ width: '100%', height: '100%' }}>
                  <GameScene mousePos={mousePos} rotation={swordRotation} />
                </Canvas>

                {/* Robot image overlay */}
                {hitCount < 3 && (
                  <RobotImage
                    ref={robotRef}
                    isHit={hitCount >= 3}
                    hitCount={hitCount}
                  />
                )}
              </>
            )}

            {/* Pre-game state */}
            {!gameStarted && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-display text-2xl text-empire-red animate-pulse">
                    PREPARATION...
                  </p>
                </div>
              </div>
            )}

            {/* Victory overlay */}
            <VictoryScreen isOpen={victory} />

            {/* Hit counter UI */}
            {gameStarted && hitCount < 3 && !victory && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-2 rounded-lg">
                <p className="font-body text-text-light text-sm">
                  Coups : {hitCount} / 3
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Instruction dialog */}
      <InstructionDialog isOpen={showInstructions} onClose={handleStartGame} />
    </section>
  );
};

// Preload the sword model
useGLTF.preload('/3d/sword.glb');
