"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

const categoryEmoji: Record<string, string> = {
  healthcare: "🏥",
  sports: "🏈",
  wellbeing: "🛡️",
};

const projectConfig = [
  {
    key: "medrating",
    category: "healthcare",
    timeline: "2026",
    ctaKey: "visitSite",
    ctaUrl: "https://medpanama.com",
    badgeColor: "rgba(0, 210, 210, 0.15)",
    accentColor: "var(--accent)",
  },
  {
    key: "football",
    category: "sports",
    timeline: "Q4 2026",
    ctaKey: "joinNetwork",
    ctaUrl: "/contact?project=football-analyzer",
    badgeColor: "rgba(61, 127, 255, 0.15)",
    accentColor: "var(--accent2)",
  },
  {
    key: "stoic",
    category: "wellbeing",
    timeline: "Q3 2026",
    ctaKey: "requestAccess",
    ctaUrl: "/contact?project=stoic-guard",
    badgeColor: "rgba(167, 139, 250, 0.15)",
    accentColor: "#a78bfa",
  },
] as const;

export function UpcomingPreview() {
  const t = useTranslations("UpcomingPreview");
  const tUpcoming = useTranslations("Upcoming");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      aria-labelledby="upcoming-preview-heading"
      style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto", position: "relative" }}
    >
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ textAlign: "center", marginBottom: "3.5rem" }}
      >
        <p style={{ fontSize: "0.75rem", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.75rem" }}>
          {t("eyebrow")}
        </p>
        <h2
          id="upcoming-preview-heading"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}
        >
          {t("heading")}
        </h2>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {projectConfig.map((project, i) => {
          const isHovered = hoveredIdx === i;
          return (
            <motion.article
              key={project.key}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              whileHover={reduced ? {} : { y: -4, scale: 1.01 }}
              onHoverStart={() => setHoveredIdx(i)}
              onHoverEnd={() => setHoveredIdx(null)}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: isHovered ? "var(--shadow-card-hover)" : "var(--shadow-card)",
                borderColor: isHovered ? "var(--border-hover)" : "var(--border)",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                overflow: "hidden",
              }}
            >
              {/* Background ambient glow on hover */}
              <motion.div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(circle at 80% 20%, ${project.badgeColor} 0%, transparent 70%)`,
                  opacity: isHovered && !reduced ? 1 : 0.4,
                  pointerEvents: "none",
                  transition: "opacity 0.4s ease",
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <motion.div
                    style={{ fontSize: "2rem", display: "inline-block" }}
                    animate={isHovered && !reduced ? { rotate: [0, -10, 10, -5, 0], scale: 1.1 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {categoryEmoji[project.category] ?? "📱"}
                  </motion.div>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      background: project.badgeColor,
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      color: project.accentColor,
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: project.accentColor,
                        display: "inline-block",
                        boxShadow: `0 0 6px ${project.accentColor}`,
                      }}
                    />
                    {project.timeline}
                  </div>
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                  {tUpcoming(`${project.key}.title`)}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                  {tUpcoming(`${project.key}.desc`)}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1, paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  <Clock size={14} style={{ marginRight: "0.5rem" }} aria-hidden="true" />
                  {project.timeline}
                </div>
                <Link
                  href={project.ctaUrl}
                  {...(project.ctaUrl.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "var(--accent)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    transition: "gap 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = "10px"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = "6px"; }}
                >
                  {tUpcoming(project.ctaKey)}
                  <motion.span
                    animate={isHovered && !reduced ? { x: [0, 4, 0] } : {}}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    <ArrowRight size={14} aria-hidden="true" />
                  </motion.span>
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{ textAlign: "center", marginTop: "3.5rem" }}
      >
        <Link
          href="/upcoming"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--accent)",
            color: "#05080f",
            padding: "13px 26px",
            borderRadius: "9px",
            textDecoration: "none",
            fontWeight: "700",
            fontSize: "0.875rem",
            boxShadow: "0 0 20px var(--accent-glow)",
            transition: "transform 0.22s ease, box-shadow 0.22s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "translateY(-2px)";
            el.style.boxShadow = "0 8px 30px var(--accent-glow)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "translateY(0)";
            el.style.boxShadow = "0 0 20px var(--accent-glow)";
          }}
        >
          {t("viewAll")}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  );
}
