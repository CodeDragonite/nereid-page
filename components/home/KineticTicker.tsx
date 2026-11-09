"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export function KineticTicker() {
  const t = useTranslations("KineticTicker");
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Not `once`: the loop pauses whenever the ticker scrolls out of view.
  const inView = useInView(ref);
  const moving = inView && !reduced;

  const tags = [
    t("tag0"),
    t("tag1"),
    t("tag2"),
    t("tag3"),
    t("tag4"),
    t("tag5"),
    t("tag6"),
    t("tag7"),
  ];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        padding: "18px 0",
        background:
          "linear-gradient(90deg, color-mix(in srgb, var(--bg-base) 90%, transparent) 0%, color-mix(in srgb, var(--bg-surface) 90%, transparent) 50%, color-mix(in srgb, var(--bg-base) 90%, transparent) 100%)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "0 0 24px rgba(0, 212, 170, 0.05)",
      }}
    >
      {/* Edge gradient masks */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "120px",
          background: "linear-gradient(to right, var(--bg-base), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "120px",
          background: "linear-gradient(to left, var(--bg-base), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <motion.div
        style={{
          display: "flex",
          gap: "2.5rem",
          width: "max-content",
        }}
        animate={moving ? { x: ["0%", "-50%"] } : { x: "0%" }}
        transition={moving ? { duration: 32, repeat: Infinity, ease: "linear" } : { duration: 0 }}
      >
        {/* Double array for infinite seamless loop */}
        {[...tags, ...tags].map((tag, idx) => (
          <div
            key={idx}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1.25rem",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans), monospace",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "0.18em",
                color: idx % 2 === 0 ? "var(--text-primary)" : "var(--accent-text)",
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "var(--accent2)",
                boxShadow: "0 0 8px var(--accent2)",
                display: "inline-block",
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
