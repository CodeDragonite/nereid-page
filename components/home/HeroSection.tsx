"use client";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeIn, fadeUp, staggerDelay } from "@/lib/motion";
import { AnimatedCounter } from "./AnimatedCounter";
import { CosmicWaveCanvas } from "./CosmicWaveCanvas";
import { HeroSolutionsShowcase } from "./HeroSolutionsShowcase";

export function HeroSection() {
  const t = useTranslations("Hero");
  // Each child gets an explicit, capped delay (staggerDelay) so the showcase
  // in the right column enters in the last slot instead of popping in at 0ms.
  const container = { hidden: {}, visible: {} };

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
        initial="hidden"
        animate="visible"
      >
        <div className="hero-grid-container">
          {/* Left Column: Messaging & Action */}
          <div>
            {/* Badge */}
            <motion.div variants={fadeUp} custom={staggerDelay(0)} style={{ marginBottom: "1.5rem" }}>
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
                  color: "var(--accent-text)",
                  border: "1px solid var(--border-hover)",
                  cursor: "default",
                  boxShadow: "0 0 16px var(--accent-dim)",
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
              custom={staggerDelay(1)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--fs-hero)",
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
                  color: "var(--accent-text)",
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
              custom={staggerDelay(2)}
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
              custom={staggerDelay(3)}
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Link href="/contact" className="btn-primary">
                <span>{t("ctaPrimary")}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>

              <Link href="/services" className="btn-secondary">
                {t("ctaSecondary")}
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeIn}
              custom={staggerDelay(4)}
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
          <motion.div
            className="hero-console-container"
            variants={fadeUp}
            custom={staggerDelay(5)}
          >
            <HeroSolutionsShowcase />
          </motion.div>
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
