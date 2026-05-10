"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Rocket, Heart, Zap, Clock, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

const projects = [
  {
    key: "medrating" as const,
    category: "healthcare",
    color: "#34d399",
    icon: Heart,
    timeline: "Q3 2026",
    phaseKey: "inDevelopment" as const,
    ctaKey: "requestAccess" as const,
    ctaUrl: "/contact?project=medrating-panama",
    tech: ["Next.js", "TypeScript", "AI/ML", "PostgreSQL", "Mapbox"],
    featureCount: 5,
  },
  {
    key: "football" as const,
    category: "sports",
    color: "#fb923c",
    icon: Zap,
    timeline: "Q4 2026",
    phaseKey: "planningPhase" as const,
    ctaKey: "joinNetwork" as const,
    ctaUrl: "/contact?project=football-analyzer",
    tech: ["Python", "TensorFlow", "React", "D3.js", "AWS"],
    featureCount: 5,
  },
];

function UpcomingHero() {
  const t = useTranslations("Upcoming");
  const reduced = useReducedMotion();
  return (
    <section aria-labelledby="upcoming-heading" style={{ position: "relative", minHeight: "60vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: "68px" }}>
      <div aria-hidden="true" className="hero-gradient" style={{ position: "absolute", inset: 0, zIndex: 0 }} />
      <div aria-hidden="true" className="grid-overlay" style={{ position: "absolute", inset: 0, zIndex: 1 }} />
      <div aria-hidden="true" style={{ position: "absolute", top: "15%", left: "5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%)", zIndex: 1, pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: "10%", right: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(251,146,60,0.06) 0%, transparent 70%)", zIndex: 1, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "5rem 1.5rem 4rem", width: "100%" }}>
        <motion.div custom={0} initial={reduced ? "visible" : "hidden"} animate="visible" variants={fadeUp} style={{ marginBottom: "1.5rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase" as const, background: "var(--accent-dim)", color: "var(--accent)", border: "1px solid var(--border-hover)" }}>
            <Rocket size={11} aria-hidden="true" /> {t("heroTag")}
          </span>
        </motion.div>
        <motion.h1 id="upcoming-heading" custom={1} initial={reduced ? "visible" : "hidden"} animate="visible" variants={fadeUp} style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: "1.05", color: "var(--text-primary)", marginBottom: "1.5rem", maxWidth: "820px", letterSpacing: "-0.02em" }}>
          {t("heroHeadline")}{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>{t("heroHeadlineAccent")}</em>
        </motion.h1>
        <motion.p custom={2} initial={reduced ? "visible" : "hidden"} animate="visible" variants={fadeUp} style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: "1.7", marginBottom: "2.5rem" }}>
          {t("heroSubheadline")}
        </motion.p>
        <motion.div custom={3} initial={reduced ? "visible" : "hidden"} animate="visible" variants={fadeUp}>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--accent)", color: "#05080f", padding: "13px 24px", borderRadius: "9px", fontWeight: "600", fontSize: "0.95rem", textDecoration: "none", transition: "all 0.22s ease" }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 6px 24px var(--accent-glow)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
          >
            {t("heroCta")} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
      <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to bottom, transparent, var(--bg-base))", zIndex: 2 }} />
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const t = useTranslations("Upcoming");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const Icon = project.icon;

  return (
    <motion.article
      ref={ref}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" as const }}
      whileHover={reduced ? {} : { scale: 1.02, y: -2 }}
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.75rem", boxShadow: "var(--shadow-card)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border-hover)"; el.style.boxShadow = "var(--shadow-card-hover)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.boxShadow = "var(--shadow-card)"; }}
    >
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${project.color}, transparent)`, opacity: 0.6 }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: `color-mix(in srgb, ${project.color} 15%, transparent)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={22} style={{ color: project.color }} aria-hidden="true" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: "var(--text-muted)" }}>
            <Clock size={12} aria-hidden="true" /> {project.timeline}
          </span>
          <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "0.7rem", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase" as const, background: `color-mix(in srgb, ${project.color} 20%, transparent)`, color: project.color }}>
            {t(project.phaseKey)}
          </span>
        </div>
      </div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem", lineHeight: "1.3" }}>{t(`${project.key}.title`)}</h2>
      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "1.5rem" }}>{t(`${project.key}.desc`)}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {Array.from({ length: project.featureCount }, (_, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
            <CheckCircle size={14} style={{ color: project.color, flexShrink: 0, marginTop: "2px" }} aria-hidden="true" />
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.4" }}>{t(`${project.key}.f${i}`)}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1.5rem", marginTop: "auto" }}>
        {project.tech.map((tech) => (
          <span key={tech} style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "0.7rem", background: `color-mix(in srgb, ${project.color} 10%, transparent)`, color: "var(--text-secondary)" }}>{tech}</span>
        ))}
      </div>
      <Link href={project.ctaUrl} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: `color-mix(in srgb, ${project.color} 20%, transparent)`, color: project.color, padding: "12px 20px", borderRadius: "8px", fontWeight: "600", fontSize: "0.9rem", textDecoration: "none", border: `1px solid color-mix(in srgb, ${project.color} 40%, transparent)`, transition: "all 0.22s ease" }}
        onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = `color-mix(in srgb, ${project.color} 30%, transparent)`; el.style.transform = "translateY(-1px)"; }}
        onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = `color-mix(in srgb, ${project.color} 20%, transparent)`; el.style.transform = "translateY(0)"; }}
        aria-label={`${t(project.ctaKey)} — ${t(`${project.key}.title`)}`}
      >
        {t(project.ctaKey)} <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </motion.article>
  );
}

export default function UpcomingPage() {
  const t = useTranslations("Upcoming");
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <main>
      <UpcomingHero />
      <section aria-labelledby="projects-heading" style={{ padding: "4rem 1.5rem 6rem", maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div ref={headRef} initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }} animate={headInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.75rem" }}>{t("eyebrow")}</p>
          <h2 id="projects-heading" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{t("heading")}</h2>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: "1.5rem" }}>
          {projects.map((project, i) => <ProjectCard key={project.key} project={project} index={i} />)}
        </div>
      </section>
    </main>
  );
}
