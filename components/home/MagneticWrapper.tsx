"use client";
import { motion, useReducedMotion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useCallback } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  href?: string;
  onClick?: () => void;
  as?: "a" | "button" | "div";
  className?: string;
  strength?: number;
  [key: string]: unknown;
}

/**
 * Wraps any child with a subtle magnetic hover attraction effect.
 * Degrades gracefully for reduced-motion users (no movement, just hover state).
 */
export function MagneticWrapper({
  children,
  style,
  strength = 0.35,
  ...rest
}: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    },
    [reduced, strength, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ display: "inline-flex", ...style, x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
