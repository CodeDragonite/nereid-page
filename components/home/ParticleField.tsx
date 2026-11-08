"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
  duration: number;
  delay: number;
}

export function ParticleField() {
  const reduced = useReducedMotion();
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  useEffect(() => {
    const generated: FloatingParticle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: 0.15 + Math.random() * 0.4,
      size: 1 + Math.random() * 2.5,
      duration: 8 + Math.random() * 16,
      delay: Math.random() * -20,
    }));
    setParticles(generated);
  }, []);

  if (reduced || particles.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "var(--accent)",
          }}
          animate={{
            y: [-12, 12, -8, 12, -12],
            x: [-6, 8, -4, 6, -6],
            opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.6, p.opacity, p.opacity * 0.4],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
