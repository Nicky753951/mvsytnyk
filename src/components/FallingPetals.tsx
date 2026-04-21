import { useMemo } from "react";

interface Petal {
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  rotate: number;
  opacity: number;
}

const FallingPetals = ({ count = 18 }: { count?: number }) => {
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        size: 10 + Math.random() * 16,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 12,
        drift: (Math.random() - 0.5) * 200,
        rotate: Math.random() * 360,
        opacity: 0.4 + Math.random() * 0.5,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-[5]">
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute -top-10 block animate-petal-fall"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ['--drift' as string]: `${p.drift}px`,
            ['--rotate' as string]: `${p.rotate}deg`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path
              d="M12 2C8 6 6 10 6 14c0 4 3 7 6 7s6-3 6-7c0-4-2-8-6-12z"
              fill="hsl(var(--secondary))"
              stroke="hsl(var(--accent))"
              strokeWidth="0.5"
              opacity="0.85"
            />
          </svg>
        </span>
      ))}
    </div>
  );
};

export default FallingPetals;
