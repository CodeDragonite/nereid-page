"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: string; // e.g. "98%", "10+", "3x"
  label: string;
}

function parseNumber(raw: string): { num: number; suffix: string; prefix: string } {
  const match = raw.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return { num: 0, suffix: raw, prefix: "" };
  return { prefix: match[1] || "", num: parseFloat(match[2]), suffix: match[3] || "" };
}

export function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const reduced = useReducedMotion();
  const { num, prefix, suffix } = parseNumber(value);
  const [displayed, setDisplayed] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reduced) {
      setDisplayed(num);
      return;
    }
    if (!started) return;
    let startTime: number | null = null;
    const duration = 1600;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * num * 10) / 10);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, num, reduced]);

  return (
    <motion.div
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true, margin: "-40px" }}
    >
      <motion.p
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2.2rem",
          color: "var(--accent)",
          lineHeight: 1,
          marginBottom: "4px",
          letterSpacing: "-0.02em",
        }}
      >
        {prefix}{Number.isInteger(num) ? Math.round(displayed) : displayed.toFixed(1)}{suffix}
      </motion.p>
      <motion.p
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ color: "var(--text-muted)", fontSize: "0.8rem", letterSpacing: "0.03em" }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
}
