"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  xRange: number;
  yRange: number;
}

const ORB_COLORS = [
  "rgba(0,210,210,0.07)",
  "rgba(0,212,170,0.06)",
  "rgba(61,127,255,0.06)",
  "rgba(0,210,210,0.05)",
  "rgba(167,139,250,0.05)",
];

export function AnimatedOrbs() {
  const reduced = useReducedMotion();
  const [orbs, setOrbs] = useState<Orb[]>([]);

  useEffect(() => {
    const generated: Orb[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 180 + Math.random() * 320,
      color: ORB_COLORS[i % ORB_COLORS.length],
      duration: 14 + Math.random() * 18,
      delay: Math.random() * -20,
      xRange: 6 + Math.random() * 10,
      yRange: 6 + Math.random() * 10,
    }));
    setOrbs(generated);
  }, []);

  if (reduced || orbs.length === 0) return null;

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
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          style={{
            position: "absolute",
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            x: [`-${orb.xRange}%`, `${orb.xRange}%`, `${orb.xRange / 2}%`, `-${orb.xRange}%`],
            y: [`-${orb.yRange}%`, `${orb.yRange / 2}%`, `${orb.yRange}%`, `-${orb.yRange}%`],
            scale: [1, 1.12, 0.94, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.33, 0.66, 1],
          }}
        />
      ))}
    </div>
  );
}
