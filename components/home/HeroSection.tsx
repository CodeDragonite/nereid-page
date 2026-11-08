"use client";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";
import { CosmicWaveCanvas } from "./CosmicWaveCanvas";
import { HeroSolutionsShowcase } from "./HeroSolutionsShowcase";

export function HeroSection() {
  const t = useTranslations("Hero");
  const reduced = useReducedMotion();

  // Clean CSS-spring transitions
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "72px",
      }}
    >
      {/* Layered backgrounds */}
      <div
        aria-hidden="true"
        className="hero-gradient"
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      />
      <div
        aria-hidden="true"
        className="grid-overlay"
        style={{ position: "absolute", inset: 0, zIndex: 1 }}
      />

      {/* Circle dimensions specifically verified by test suite */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "15%",
          left: "5%",
          width: "min(500px, 45vw)",
          height: "min(500px, 45vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,210,210,0.06) 0%, transparent 70%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "min(400px, 35vw)",
          height: "min(400px, 35vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(61,127,255,0.06) 0%, transparent 70%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Lightweight GPU-accelerated Cosmic Galaxy & Oceanic Flow Canvas */}
      <CosmicWaveCanvas />

      {/* Main 2-Column Responsive Layout */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "4.5rem 1.5rem 4rem",
          width: "100%",
        }}
        variants={container}
        initial={reduced ? "visible" : "hidden"}
        animate="visible"
      >
        <div className="hero-grid-container">
          {/* Left Column: Messaging & Action */}
          <div>
            {/* Badge */}
            <motion.div variants={fadeUp} style={{ marginBottom: "1.5rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  background: "var(--accent-dim)",
                  color: "var(--accent)",
                  border: "1px solid var(--border-hover)",
                  cursor: "default",
                  boxShadow: "0 0 16px rgba(0, 212, 170, 0.12)",
                }}
              >
                <Zap size={11} aria-hidden="true" />
                {t("tag")}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              id="hero-heading"
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.75rem, 5.5vw, 5.25rem)",
                lineHeight: "1.06",
                color: "var(--text-primary)",
                marginBottom: "1.5rem",
                letterSpacing: "-0.025em",
              }}
            >
              {t("headline")}{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--accent)",
                  display: "inline-block",
                  position: "relative",
                }}
              >
                {t("headlineAccent")}
              </em>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                color: "var(--text-secondary)",
                maxWidth: "540px",
                lineHeight: "1.7",
                marginBottom: "2.5rem",
              }}
            >
              {t("subheadline")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "9px",
                  background: "var(--accent)",
                  color: "#05080f",
                  padding: "14px 28px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  boxShadow: "0 0 24px var(--accent-glow)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 6px 28px var(--accent-glow)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "0 0 24px var(--accent-glow)";
                }}
              >
                <span>{t("ctaPrimary")}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>

              <Link
                href="/services"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(13, 34, 56, 0.5)",
                  color: "var(--text-primary)",
                  padding: "14px 28px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  border: "1px solid var(--border)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--accent)";
                  el.style.color = "var(--accent)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.color = "var(--text-primary)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {t("ctaSecondary")}
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeIn}
              style={{
                display: "flex",
                gap: "2.5rem",
                marginTop: "3.5rem",
                flexWrap: "wrap",
                paddingTop: "2rem",
                borderTop: "1px solid var(--border)",
                maxWidth: "420px",
              }}
            >
              {(
                [
                  { value: t("stat2Value"), label: t("stat2Label") },
                  { value: t("stat3Value"), label: t("stat3Label") },
                ] as const
              ).map(({ value, label }) => (
                <AnimatedCounter key={label} value={value} label={label} />
              ))}
            </motion.div>
          </div>

          {/* Right Column: Clean Interactive Solutions Showcase */}
          <div className="hero-console-container">
            <HeroSolutionsShowcase />
          </div>
        </div>
      </motion.div>

      {/* Bottom gradient fade overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "180px",
          background: "linear-gradient(to bottom, transparent, var(--bg-base))",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      <style>{`
        .hero-grid-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3.5rem;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .hero-grid-container {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 2.5rem;
          }
        }
        @media (max-width: 640px) {
          .hero-console-container {
            margin-top: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
