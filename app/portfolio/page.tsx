"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Target, ExternalLink } from "lucide-react";
import { caseStudies } from "@/lib/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

function PortfolioHero() {
  const reduced = useReducedMotion();
  return (
    <section
      aria-labelledby="portfolio-heading"
      style={{
        position: "relative",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "68px",
      }}
    >
      <div aria-hidden="true" className="hero-gradient" style={{ position: "absolute", inset: 0, zIndex: 0 }} />
      <div aria-hidden="true" className="grid-overlay" style={{ position: "absolute", inset: 0, zIndex: 1 }} />
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: "15%", left: "5%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,210,210,0.06) 0%, transparent 70%)",
          zIndex: 1, pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute", bottom: "10%", right: "10%",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(61,127,255,0.06) 0%, transparent 70%)",
          zIndex: 1, pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "5rem 1.5rem 4rem", width: "100%" }}>
        <motion.div custom={0} initial={reduced ? "visible" : "hidden"} animate="visible" variants={fadeUp} style={{ marginBottom: "1.5rem" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "5px 12px", borderRadius: "20px", fontSize: "11px",
            fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase" as const,
            background: "var(--accent-dim)", color: "var(--accent)", border: "1px solid var(--border-hover)",
          }}>
            <Target size={11} aria-hidden="true" />
            Featured Work
          </span>
        </motion.div>
        <motion.h1
          id="portfolio-heading"
          custom={1}
          initial={reduced ? "visible" : "hidden"}
          animate="visible"
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: "1.05",
            color: "var(--text-primary)",
            marginBottom: "1.5rem",
            maxWidth: "820px",
            letterSpacing: "-0.02em",
          }}
        >
          Projects That Define Our{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Expertise</em>
        </motion.h1>
        <motion.p
          custom={2}
          initial={reduced ? "visible" : "hidden"}
          animate="visible"
          variants={fadeUp}
          style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: "1.7", marginBottom: "2.5rem" }}
        >
          Case studies showcasing our approach to solving complex challenges for real clients.
        </motion.p>
        <motion.div custom={3} initial={reduced ? "visible" : "hidden"} animate="visible" variants={fadeUp}>
          <Link
            href="/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "var(--accent)", color: "#05080f",
              padding: "13px 24px", borderRadius: "9px",
              fontWeight: "600", fontSize: "0.95rem", textDecoration: "none",
              transition: "all 0.22s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 6px 24px var(--accent-glow)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
          >
            Start Your Project
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
      <div
        aria-hidden="true"
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "120px", background: "linear-gradient(to bottom, transparent, var(--bg-base))",
          zIndex: 2,
        }}
      />
    </section>
  );
}

function CaseStudyCard({ study, index }: { study: typeof caseStudies[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  return (
    <motion.article
      ref={ref}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" as const }}
      whileHover={reduced ? {} : { scale: 1.02, y: -2 }}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "1.75rem",
        boxShadow: "var(--shadow-card)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border-hover)";
        el.style.boxShadow = "var(--shadow-card-hover)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border)";
        el.style.boxShadow = "var(--shadow-card)";
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${study.color}, transparent)`,
          opacity: 0.6,
        }}
      />

      <div style={{ marginBottom: "1rem" }}>
        <span style={{
          display: "inline-block",
          padding: "3px 10px",
          borderRadius: "20px",
          fontSize: "0.7rem",
          fontWeight: "600",
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          background: `color-mix(in srgb, ${study.color} 15%, transparent)`,
          color: study.color,
        }}>
          {study.category}
        </span>
      </div>

      <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem", lineHeight: "1.3" }}>
        {study.title}
      </h3>
      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
        {study.client}
      </p>

      <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "0.75rem" }}>
        <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>Challenge: </strong>
        {study.challenge.length > 120 ? study.challenge.slice(0, 120) + "…" : study.challenge}
      </p>

      <p style={{ fontSize: "0.875rem", color: study.color, lineHeight: "1.6", marginBottom: "1rem", fontWeight: 500 }}>
        ↑ {study.outcome}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1.25rem", marginTop: "auto" }}>
        {study.tech.map((t) => (
          <span
            key={t}
            style={{
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "0.7rem",
              background: `color-mix(in srgb, ${study.color} 10%, transparent)`,
              color: "var(--text-secondary)",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <Link
        href={`/portfolio/${study.slug}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: study.color,
          textDecoration: "none",
          fontSize: "0.875rem",
          fontWeight: 600,
          transition: "gap 0.2s ease",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = "10px"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = "6px"; }}
        aria-label={`View case study: ${study.title}`}
      >
        View Case Study
        <ExternalLink size={14} aria-hidden="true" />
      </Link>
    </motion.article>
  );
}

function CaseStudiesGrid() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="case-studies-heading"
      style={{ padding: "4rem 1.5rem 6rem", maxWidth: "1200px", margin: "0 auto" }}
    >
      <motion.div
        ref={headRef}
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={headInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: "3rem" }}
      >
        <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.75rem" }}>
          Case Studies
        </p>
        <h2 id="case-studies-heading" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
          Real Outcomes for Real Clients
        </h2>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
        {caseStudies.map((study, i) => (
          <CaseStudyCard key={study.id} study={study} index={i} />
        ))}
      </div>
    </section>
  );
}

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioHero />
      <CaseStudiesGrid />
    </main>
  );
}
