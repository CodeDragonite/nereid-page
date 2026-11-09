"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Rocket, Clock, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { fadeUp, staggerDelay, STAGGER, VIEWPORT } from "@/lib/motion";
import { upcomingProjects, type UpcomingProject } from "@/lib/upcoming";

function UpcomingHero() {
  const t = useTranslations("Upcoming");
  return (
    <section aria-labelledby="upcoming-heading" style={{ position: "relative", minHeight: "60vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: "68px" }}>
      <div aria-hidden="true" className="hero-gradient" style={{ position: "absolute", inset: 0, zIndex: 0 }} />
      <div aria-hidden="true" className="grid-overlay" style={{ position: "absolute", inset: 0, zIndex: 1 }} />
      {/* Ambient glows: the -dim tokens are ~12% alpha; opacity 0.5 keeps them at the previous ~6% */}
      <div aria-hidden="true" style={{ position: "absolute", top: "15%", left: "5%", width: "min(500px, 45vw)", height: "min(500px, 45vw)", borderRadius: "50%", background: "radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)", opacity: 0.5, zIndex: 1, pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: "10%", right: "10%", width: "min(400px, 35vw)", height: "min(400px, 35vw)", borderRadius: "50%", background: "radial-gradient(circle, var(--accent2-dim) 0%, transparent 70%)", opacity: 0.5, zIndex: 1, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "5rem 1.5rem 4rem", width: "100%" }}>
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} style={{ marginBottom: "1.5rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase" as const, background: "var(--accent-dim)", color: "var(--accent-text)", border: "1px solid var(--border-hover)" }}>
            <Rocket size={11} aria-hidden="true" /> {t("heroTag")}
          </span>
        </motion.div>
        <motion.h1 id="upcoming-heading" custom={STAGGER} initial="hidden" animate="visible" variants={fadeUp} style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-hero)", lineHeight: "1.05", color: "var(--text-primary)", marginBottom: "1.5rem", maxWidth: "820px", letterSpacing: "-0.025em" }}>
          {t("heroHeadline")}{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent-text)" }}>{t("heroHeadlineAccent")}</em>
        </motion.h1>
        <motion.p custom={STAGGER * 2} initial="hidden" animate="visible" variants={fadeUp} style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "var(--text-secondary)", maxWidth: "560px", lineHeight: "1.7", marginBottom: "2.5rem" }}>
          {t("heroSubheadline")}
        </motion.p>
        {/* Entrance on the wrapper; .btn-primary owns the hover transform */}
        <motion.div custom={STAGGER * 3} initial="hidden" animate="visible" variants={fadeUp}>
          <Link href="/contact" className="btn-primary">
            {t("heroCta")} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
      <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to bottom, transparent, var(--bg-base))", zIndex: 2 }} />
    </section>
  );
}

function ProjectCard({ project, index }: { project: UpcomingProject; index: number }) {
  const t = useTranslations("Upcoming");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const Icon = project.icon;
  const external = project.ctaUrl.startsWith("http");

  return (
    // Wrapper carries the entrance; the inner .card-interactive owns hover/focus.
    <motion.div
      ref={ref}
      custom={staggerDelay(index, 2)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      style={{ display: "flex" }}
    >
      <article
        className="card card-interactive"
        style={{ padding: "1.75rem", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", width: "100%" }}
      >
        <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${project.color}, transparent)`, opacity: 0.6 }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "var(--radius-md)", background: `color-mix(in srgb, ${project.color} 15%, transparent)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={22} style={{ color: project.colorText }} aria-hidden="true" />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: "var(--text-muted)" }}>
              <Clock size={12} aria-hidden="true" /> {project.timeline}
            </span>
            <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "0.7rem", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase" as const, background: `color-mix(in srgb, ${project.color} 20%, transparent)`, color: project.colorText }}>
              {t(project.phaseKey)}
            </span>
          </div>
        </div>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.75rem", lineHeight: "1.3" }}>{t(`${project.key}.title`)}</h3>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "1.5rem" }}>{t(`${project.key}.desc`)}</p>
        <ul role="list" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1.5rem", listStyle: "none", padding: 0 }}>
          {Array.from({ length: project.featureCount }, (_, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
              <CheckCircle size={14} style={{ color: project.colorText, flexShrink: 0, marginTop: "2px" }} aria-hidden="true" />
              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.4" }}>{t(`${project.key}.f${i}`)}</span>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1.5rem", marginTop: "auto" }}>
          {project.tech.map((tech) => (
            <span key={tech} style={{ padding: "2px 8px", borderRadius: "var(--radius-sm)", fontSize: "0.7rem", background: `color-mix(in srgb, ${project.color} 10%, transparent)`, color: "var(--text-secondary)" }}>{tech}</span>
          ))}
        </div>
        <Link
          href={project.ctaUrl}
          {...(external ? { target: "_blank", rel: "noopener" } : {})}
          className="link-arrow"
          style={{ color: project.colorText, alignSelf: "flex-start" }}
          aria-label={`${t(project.ctaKey)} — ${t(`${project.key}.title`)}`}
        >
          {t(project.ctaKey)} <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </article>
    </motion.div>
  );
}

export default function UpcomingPage() {
  const t = useTranslations("Upcoming");
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, VIEWPORT);

  // The layout already renders <main id="main-content">, so no nested <main> here.
  return (
    <>
      <UpcomingHero />
      <section aria-labelledby="projects-heading" style={{ padding: "4rem 1.5rem 6rem", maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div ref={headRef} initial="hidden" animate={headInView ? "visible" : "hidden"} variants={fadeUp} style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-text)", marginBottom: "0.75rem" }}>{t("eyebrow")}</p>
          <h2 id="projects-heading" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{t("heading")}</h2>
        </motion.div>
        {/* auto-fit (not auto-fill) so two projects share the row instead of leaving an empty third track */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(380px, 100%), 1fr))", gap: "1.5rem", maxWidth: "1040px", margin: "0 auto" }}>
          {upcomingProjects.map((project, i) => <ProjectCard key={project.key} project={project} index={i} />)}
        </div>
      </section>
    </>
  );
}
