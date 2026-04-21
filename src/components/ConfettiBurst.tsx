import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  velocity: number;
  color: string;
  size: number;
  rotate: number;
}

interface Props {
  trigger: number; // change to fire
  origin?: { x: number; y: number };
}

const COLORS = [
  "hsl(var(--accent))",
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(38 80% 70%)",
  "hsl(150 30% 55%)",
];

const ConfettiBurst = ({ trigger, origin }: Props) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!trigger) return;
    const ox = origin?.x ?? window.innerWidth / 2;
    const oy = origin?.y ?? window.innerHeight / 3;
    const next: Particle[] = Array.from({ length: 80 }).map((_, i) => ({
      id: trigger * 1000 + i,
      x: ox,
      y: oy,
      angle: Math.random() * Math.PI * 2,
      velocity: 200 + Math.random() * 350,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 8,
      rotate: Math.random() * 720 - 360,
    }));
    setParticles(next);
    const t = setTimeout(() => setParticles([]), 2000);
    return () => clearTimeout(t);
  }, [trigger, origin?.x, origin?.y]);

  if (!particles.length) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden">
      {particles.map((p) => {
        const dx = Math.cos(p.angle) * p.velocity;
        const dy = Math.sin(p.angle) * p.velocity - 200;
        return (
          <span
            key={p.id}
            className="absolute block animate-confetti-burst"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size * 0.4,
              background: p.color,
              borderRadius: "2px",
              ['--dx' as string]: `${dx}px`,
              ['--dy' as string]: `${dy}px`,
              ['--rot' as string]: `${p.rotate}deg`,
            }}
          />
        );
      })}
    </div>
  );
};

export default ConfettiBurst;
