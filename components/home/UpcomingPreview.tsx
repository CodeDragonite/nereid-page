"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { upcomingProjects } from "@/lib/upcoming";
import { fadeIn, fadeUp, staggerDelay, VIEWPORT } from "@/lib/motion";

export function UpcomingPreview() {
  const t = useTranslations("UpcomingPreview");
  const tUpcoming = useTranslations("Upcoming");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const state = inView ? "visible" : "hidden";

  return (
    <section
      ref={ref}
      aria-labelledby="upcoming-preview-heading"
      style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto", position: "relative" }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={state}
        style={{ textAlign: "center", marginBottom: "3.5rem" }}
      >
        <p style={{ fontSize: "0.75rem", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-text)", marginBottom: "0.75rem" }}>
          {t("eyebrow")}
        </p>
        <h2
          id="upcoming-preview-heading"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--text-primary)", letterSpacing: "-0.02em" }}
        >
          {t("heading")}
        </h2>
      </motion.div>

      {/* auto-fit + capped width: 2 projects sit centred side by side, 3 still fit one row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "1.5rem",
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        {upcomingProjects.map((project, i) => {
          const Icon = project.icon;
          const external = project.ctaUrl.startsWith("http");
          return (
            // Wrapper owns the entrance; the inner article owns the CSS hover lift.
            <motion.div
              key={project.key}
              variants={fadeUp}
              custom={staggerDelay(i)}
              initial="hidden"
              animate={state}
              style={{ display: "flex" }}
            >
              <article
                className="card card-interactive"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                {/* Static ambient tint */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle at 80% 20%, color-mix(in srgb, ${project.color} 10%, transparent) 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }}
                />

                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "var(--radius-md)",
                        background: `color-mix(in srgb, ${project.color} 15%, transparent)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={22} style={{ color: project.colorText }} aria-hidden="true" />
                    </div>

                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 10px",
                        borderRadius: "12px",
                        background: `color-mix(in srgb, ${project.color} 15%, transparent)`,
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        color: project.colorText,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: project.color,
                          display: "inline-block",
                        }}
                      />
                      {tUpcoming(project.phaseKey)}
                    </span>
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
                    {...(external ? { target: "_blank", rel: "noopener" } : {})}
                    className="link-arrow"
                    style={{ color: project.colorText, fontSize: "0.875rem" }}
                    aria-label={`${tUpcoming(project.ctaKey)} — ${tUpcoming(`${project.key}.title`)}`}
                  >
                    {tUpcoming(project.ctaKey)}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        variants={fadeIn}
        custom={staggerDelay(upcomingProjects.length)}
        initial="hidden"
        animate={state}
        style={{ textAlign: "center", marginTop: "3.5rem" }}
      >
        <Link href="/upcoming" className="btn-primary">
          {t("viewAll")}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  );
}
