"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

const projectConfig = [
  {
    id: "0",
    gradient: "linear-gradient(135deg, #00d2d2 0%, #3d7fff 100%)",
    emoji: "📊",
  },
  {
    id: "1",
    gradient: "linear-gradient(135deg, #34d399 0%, #059669 100%)",
    emoji: "🤖",
  },
  {
    id: "2",
    gradient: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
    emoji: "🏥",
  },
];

function ProjectCard({ project, index }: { project: typeof projectConfig[0]; index: number }) {
  const t = useTranslations("PortfolioPreview");
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const tags = [t(`tag${project.id}a`), t(`tag${project.id}b`)];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" as const }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        position: "relative",
        transition: "border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        borderColor: hovered ? "var(--border-hover)" : "var(--border)",
        boxShadow: hovered ? "var(--shadow-card-hover)" : "var(--shadow-card)",
      } as React.CSSProperties}
    >
      <div
        aria-hidden="true"
        style={{
          height: "180px",
          background: project.gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "3.5rem",
          position: "relative",
        }}
      >
        {project.emoji}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(5,8,15,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.22s ease",
          }}
        >
          <Link
            href="/portfolio"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "white",
              color: "#05080f",
              padding: "9px 18px",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            <ExternalLink size={14} />
            {t("viewProject")}
          </Link>
        </div>
      </div>

      <div style={{ padding: "1.5rem" }}>
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.4rem", fontWeight: "500" }}>
          {t(`project${project.id}Client`)}
        </p>
        <h3 style={{ fontSize: "1.05rem", fontWeight: "600", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
          {t(`project${project.id}Title`)}
        </h3>
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "1rem" }}>
          {t(`project${project.id}Result`)}
        </p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.72rem",
                fontWeight: "600",
                padding: "3px 8px",
                borderRadius: "4px",
                background: "var(--accent-dim)",
                color: "var(--accent)",
                letterSpacing: "0.03em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function PortfolioPreview() {
  const t = useTranslations("PortfolioPreview");
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section
      aria-labelledby="portfolio-preview-heading"
      style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}
    >
      <motion.div
        ref={headRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        style={{ textAlign: "center", marginBottom: "3rem" }}
      >
        <p style={{ fontSize: "0.75rem", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.75rem" }}>
          {t("eyebrow")}
        </p>
        <h2
          id="portfolio-preview-heading"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}
        >
          {t("heading")}
        </h2>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {projectConfig.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={headInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{ textAlign: "center", marginTop: "2.5rem" }}
      >
        <Link
          href="/portfolio"
          style={{ color: "var(--accent)", textDecoration: "none", fontSize: "0.9rem", fontWeight: "500", display: "inline-flex", alignItems: "center", gap: "6px", transition: "gap 0.2s ease" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = "10px"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = "6px"; }}
        >
          {t("viewAll")} →
        </Link>
      </motion.div>
    </section>
  );
}
