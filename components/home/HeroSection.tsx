"use client";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "68px",
      }}
    >
      {/* Background layers */}
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
      {/* Glow orbs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "15%",
          left: "5%",
          width: "500px",
          height: "500px",
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
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(61,127,255,0.06) 0%, transparent 70%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "5rem 1.5rem 4rem",
          width: "100%",
        }}
      >
        {/* Tag */}
        <motion.div
          custom={0}
          initial={reduced ? "visible" : "hidden"}
          animate="visible"
          variants={fadeUp}
          style={{ marginBottom: "1.5rem" }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 12px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: "var(--accent-dim)",
              color: "var(--accent)",
              border: "1px solid var(--border-hover)",
            }}
          >
            <Zap size={11} aria-hidden="true" />
            Full-Stack · AI · IT Management
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-heading"
          custom={1}
          initial={reduced ? "visible" : "hidden"}
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            lineHeight: "1.05",
            color: "var(--text-primary)",
            marginBottom: "1.5rem",
            maxWidth: "820px",
            letterSpacing: "-0.02em",
          }}
        >
          We Build{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "var(--accent)",
            }}
          >
            What&apos;s Next
          </em>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2}
          initial={reduced ? "visible" : "hidden"}
          animate="visible"
          variants={fadeUp}
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "var(--text-secondary)",
            maxWidth: "560px",
            lineHeight: "1.7",
            marginBottom: "2.5rem",
          }}
        >
          Full-stack development, AI automation, and IT management for companies
          that want to focus on their business—not their infrastructure.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          initial={reduced ? "visible" : "hidden"}
          animate="visible"
          variants={fadeUp}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
        >
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--accent)",
              color: "#05080f",
              padding: "13px 24px",
              borderRadius: "9px",
              fontWeight: "600",
              fontSize: "0.95rem",
              textDecoration: "none",
              transition: "all 0.22s ease",
              boxShadow: "0 0 0 rgba(0,210,210,0)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 6px 24px var(--accent-glow)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 0 0 rgba(0,210,210,0)";
            }}
          >
            Get a Free Consultation
            <ArrowRight size={16} aria-hidden="true" />
          </Link>

          <Link
            href="/services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              color: "var(--text-primary)",
              padding: "13px 24px",
              borderRadius: "9px",
              fontWeight: "500",
              fontSize: "0.95rem",
              textDecoration: "none",
              border: "1px solid var(--border)",
              transition: "all 0.22s ease",
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
            View Our Services
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          custom={4}
          initial={reduced ? "visible" : "hidden"}
          animate="visible"
          variants={fadeUp}
          style={{
            display: "flex",
            gap: "2.5rem",
            marginTop: "4rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "50+", label: "Projects delivered" },
            { value: "10+", label: "Years of experience" },
            { value: "24h", label: "Response time" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  color: "var(--accent)",
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {value}
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", letterSpacing: "0.03em" }}>
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to bottom, transparent, var(--bg-base))",
          zIndex: 2,
        }}
      />
    </section>
  );
}
