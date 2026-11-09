"use client";
import { MotionConfig } from "framer-motion";

/**
 * App-wide framer-motion config. `reducedMotion="user"` makes every motion
 * component honour prefers-reduced-motion: transform/layout animations are
 * skipped while opacity fades still run.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
