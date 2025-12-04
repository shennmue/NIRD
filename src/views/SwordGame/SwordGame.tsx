import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Sword component that can be grabbed and swung
const Sword = ({
  onSwing,
}: {
  onSwing: (velocity: THREE.Vector3) => void;
}) => {
  const { scene } = useGLTF('/3d/sword.glb');
  const swordRef = useRef<THREE.Group>(null);
  const { gl } = useThree();

  const isDragging = useRef(false);
  const previousMousePos = useRef(new THREE.Vector2());
  const currentMousePos = useRef(new THREE.Vector2());
  const velocity = useRef(new THREE.Vector3());
  const targetRotation = useRef(new THREE.Euler(-0.3, 0, 0.5));
  const targetPosition = useRef(new THREE.Vector3(1, -1, 1));

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePos.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
      currentMousePos.current.copy(previousMousePos.current);
    };

    const handleMouseMove = (e: MouseEvent) => {
      currentMousePos.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );

      if (isDragging.current) {
        const deltaX = currentMousePos.current.x - previousMousePos.current.x;
        const deltaY = currentMousePos.current.y - previousMousePos.current.y;

        // Update velocity based on mouse movement
        velocity.current.set(deltaX * 50, deltaY * 50, 0);

        // Map mouse position to sword rotation and position
        targetRotation.current.set(
          -0.3 + currentMousePos.current.y * 1.2,
          currentMousePos.current.x * 1.5,
          0.5 - currentMousePos.current.x * 0.8
        );

        targetPosition.current.set(
          1 + currentMousePos.current.x * 1.5,
          -1 + currentMousePos.current.y * 1.2,
          1
        );

        previousMousePos.current.copy(currentMousePos.current);
      }
    };

    const handleMouseUp = () => {
      if (isDragging.current && velocity.current.length() > 2) {
        onSwing(velocity.current.clone());
      }
      isDragging.current = false;
      velocity.current.set(0, 0, 0);
    };

    const domElement = gl.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    domElement.addEventListener('mousemove', handleMouseMove);
    domElement.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('mouseleave', handleMouseUp);

    // Touch support
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      isDragging.current = true;
      previousMousePos.current.set(
        (touch.clientX / window.innerWidth) * 2 - 1,
        -(touch.clientY / window.innerHeight) * 2 + 1
      );
      currentMousePos.current.copy(previousMousePos.current);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      currentMousePos.current.set(
        (touch.clientX / window.innerWidth) * 2 - 1,
        -(touch.clientY / window.innerHeight) * 2 + 1
      );

      if (isDragging.current) {
        const deltaX = currentMousePos.current.x - previousMousePos.current.x;
        const deltaY = currentMousePos.current.y - previousMousePos.current.y;
        velocity.current.set(deltaX * 50, deltaY * 50, 0);

        targetRotation.current.set(
          -0.3 + currentMousePos.current.y * 1.2,
          currentMousePos.current.x * 1.5,
          0.5 - currentMousePos.current.x * 0.8
        );

        targetPosition.current.set(
          1 + currentMousePos.current.x * 1.5,
          -1 + currentMousePos.current.y * 1.2,
          1
        );

        previousMousePos.current.copy(currentMousePos.current);
      }
    };

    const handleTouchEnd = () => {
      if (isDragging.current && velocity.current.length() > 2) {
        onSwing(velocity.current.clone());
      }
      isDragging.current = false;
      velocity.current.set(0, 0, 0);
    };

    domElement.addEventListener('touchstart', handleTouchStart);
    domElement.addEventListener('touchmove', handleTouchMove);
    domElement.addEventListener('touchend', handleTouchEnd);

    return () => {
      domElement.removeEventListener('mousedown', handleMouseDown);
      domElement.removeEventListener('mousemove', handleMouseMove);
      domElement.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('mouseleave', handleMouseUp);
      domElement.removeEventListener('touchstart', handleTouchStart);
      domElement.removeEventListener('touchmove', handleTouchMove);
      domElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [gl, onSwing]);

  useFrame(() => {
    if (!swordRef.current) return;

    // Smooth interpolation for sword movement
    swordRef.current.rotation.x = THREE.MathUtils.lerp(
      swordRef.current.rotation.x,
      targetRotation.current.x,
      0.15
    );
    swordRef.current.rotation.y = THREE.MathUtils.lerp(
      swordRef.current.rotation.y,
      targetRotation.current.y,
      0.15
    );
    swordRef.current.rotation.z = THREE.MathUtils.lerp(
      swordRef.current.rotation.z,
      targetRotation.current.z,
      0.15
    );

    swordRef.current.position.x = THREE.MathUtils.lerp(
      swordRef.current.position.x,
      targetPosition.current.x,
      0.15
    );
    swordRef.current.position.y = THREE.MathUtils.lerp(
      swordRef.current.position.y,
      targetPosition.current.y,
      0.15
    );

    // Decay velocity when not dragging
    if (!isDragging.current) {
      velocity.current.multiplyScalar(0.95);
    }
  });

  // Clone the scene and set up materials
  const clonedScene = scene.clone();
  clonedScene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <group ref={swordRef} position={[1, -1, 1]} rotation={[-0.3, 0, 0.5]}>
      <Center>
        <primitive object={clonedScene} scale={1.5} />
      </Center>
    </group>
  );
};

// Main game scene
const GameScene = ({
  onHit,
  hitCount,
}: {
  onHit: () => void;
  hitCount: number;
}) => {
  const handleSwing = (velocity: THREE.Vector3) => {
    // Check if swing is powerful enough
    if (velocity.length() > 3 && hitCount < 3) {
      onHit();
    }
  };

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <pointLight position={[-3, 2, 2]} intensity={0.8} color="#ff6666" />
      <pointLight position={[3, -1, 3]} intensity={0.4} color="#ffffff" />

      <Suspense fallback={null}>
        <Sword onSwing={handleSwing} />
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

// Robot using the HeroRobot image
const RobotImage = ({
  isHit,
  hitCount,
}: {
  isHit: boolean;
  hitCount: number;
}) => {
  const robotRef = useRef<HTMLDivElement>(null);
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
      ref={robotRef}
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform ${shakeClass}`}
      style={{
        filter: `hue-rotate(${hitCount * 30}deg) brightness(${1 + hitCount * 0.2})`,
      }}
    >
      <img
        src="/images/HeroRobot.png"
        alt="Robot de l'Empire"
        className="w-32 h-auto md:w-40 object-contain drop-shadow-[0_0_20px_rgba(255,45,45,0.5)]"
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
};

// Main component
export const SwordGame = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [hitCount, setHitCount] = useState(0);
  const [victory, setVictory] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          setIsVisible(true);
          // Animate container flying in
          if (containerRef.current) {
            gsap.fromTo(
              containerRef.current,
              {
                x: '100vw',
                rotation: 360,
                scale: 0.3,
              },
              {
                x: 0,
                rotation: 0,
                scale: 1,
                duration: 1.2,
                ease: 'power3.out',
                onComplete: () => {
                  setShowInstructions(true);
                },
              }
            );
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleStartGame = () => {
    setShowInstructions(false);
    setGameStarted(true);
  };

  const handleHit = () => {
    setHitCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 3) {
        setTimeout(() => setVictory(true), 800);
      }
      return newCount;
    });
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
          className="relative w-full max-w-3xl aspect-[16/10] mx-4"
          style={{ transform: 'translateX(100vw)' }}
        >
          {/* Game container with border */}
          <div className="absolute inset-0 rounded-lg border-4 border-empire-red overflow-hidden bg-gradient-to-b from-gray-900 to-black">
            {gameStarted && (
              <>
                {/* 3D Canvas for sword */}
                <Canvas
                  camera={{ position: [0, 0, 5], fov: 45 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <GameScene onHit={handleHit} hitCount={hitCount} />
                </Canvas>

                {/* Robot image overlay */}
                {hitCount < 3 && (
                  <RobotImage isHit={hitCount >= 3} hitCount={hitCount} />
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

          {/* Decorative corners */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-empire-red" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-empire-red" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-empire-red" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-empire-red" />
        </div>
      )}

      {/* Instruction dialog */}
      <InstructionDialog isOpen={showInstructions} onClose={handleStartGame} />
    </section>
  );
};

// Preload the sword model
useGLTF.preload('/3d/sword.glb');
