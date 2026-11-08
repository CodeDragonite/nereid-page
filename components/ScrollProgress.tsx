"use client";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * Thin teal progress bar fixed at the top of the page that fills as the user scrolls.
 * Hidden for users who prefer reduced motion.
 */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "linear-gradient(90deg, var(--accent), var(--accent2))",
        transformOrigin: "0%",
        scaleX,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}
