"use client";
import { motion, useReducedMotion } from "framer-motion";

interface SplitTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  delay?: number;
  stagger?: number;
  /** If true, splits by word instead of character */
  byWord?: boolean;
}

/**
 * Animates text in by splitting into words (or chars) and staggering their entrance.
 * Respects prefers-reduced-motion — falls back to a simple fade-in.
 */
export function SplitText({
  text,
  as: Tag = "span",
  className,
  style,
  id,
  delay = 0,
  stagger = 0.025,
  byWord = true,
}: SplitTextProps) {
  const reduced = useReducedMotion();
  const tokens = byWord ? text.split(" ") : text.split("");

  if (reduced) {
    return (
      <motion.span
        className={className}
        style={style}
        id={id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
      >
        {text}
      </motion.span>
    );
  }

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
      style={{ display: "inline", ...style }}
      id={id}
      aria-label={text}
    >
      {tokens.map((token, i) => (
        <motion.span
          key={i}
          variants={item}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          aria-hidden="true"
        >
          {token}{byWord && i < tokens.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
