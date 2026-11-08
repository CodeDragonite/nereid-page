"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

export function KineticTicker() {
  const t = useTranslations("KineticTicker");
  const reduced = useReducedMotion();

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
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        padding: "18px 0",
        background: "linear-gradient(90deg, rgba(7,27,43,0.9) 0%, rgba(13,34,56,0.9) 50%, rgba(7,27,43,0.9) 100%)",
        borderTop: "1px solid rgba(0, 210, 210, 0.15)",
        borderBottom: "1px solid rgba(0, 210, 210, 0.15)",
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
        animate={reduced ? {} : { x: ["0%", "-50%"] }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear",
        }}
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
                color: idx % 2 === 0 ? "var(--text-primary)" : "var(--accent)",
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
