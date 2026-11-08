"use client";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import { Network, Globe, Smartphone, Layers, Bot, Server, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ServiceVisual } from "./ServiceVisual";

const serviceConfig = [
  { key: "network" as const, icon: Network, color: "var(--accent)" },
  { key: "web" as const, icon: Globe, color: "var(--accent2)" },
  { key: "mobile" as const, icon: Smartphone, color: "#a78bfa" },
  { key: "integration" as const, icon: Layers, color: "#fb923c" },
  { key: "ai" as const, icon: Bot, color: "#34d399" },
  { key: "it" as const, icon: Server, color: "#f472b6" },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof serviceConfig)[0];
  index: number;
}) {
  const t = useTranslations("ServicesGrid");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const Icon = service.icon;

  return (
    <motion.article
      ref={ref}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "2rem",
        cursor: "default",
        boxShadow: "var(--shadow-card)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-4px)";
        el.style.borderColor = "var(--border-hover)";
        el.style.boxShadow = "var(--shadow-card-hover)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.borderColor = "var(--border)";
        el.style.boxShadow = "var(--shadow-card)";
      }}
    >
      {/* Top accent line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${service.color}, transparent)`,
          opacity: 0.7,
        }}
      />

      {/* Top Header Row inside Card */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: `color-mix(in srgb, ${service.color} 15%, transparent)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={22} style={{ color: service.color }} aria-hidden="true" />
          </div>

          <span
            style={{
              fontFamily: "monospace",
              fontSize: "12px",
              fontWeight: "700",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
            }}
          >
            0{index + 1}
          </span>
        </div>

        {/* Animated Visual Micro-Scene */}
        <ServiceVisual type={service.key} color={service.color} />

        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            color: "var(--text-primary)",
            marginBottom: "0.6rem",
            lineHeight: "1.3",
          }}
        >
          {t(`${service.key}.title`)}
        </h3>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
            lineHeight: "1.65",
            margin: 0,
          }}
        >
          {t(`${service.key}.outcome`)}
        </p>
      </div>

      {/* Explore link */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: "1.5rem",
          paddingTop: "1rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <span
          style={{
            fontSize: "0.78rem",
            fontWeight: "600",
            color: service.color,
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {t("explore")} <ArrowUpRight size={13} aria-hidden="true" />
        </span>
      </div>
    </motion.article>
  );
}

export function ServicesGrid() {
  const t = useTranslations("ServicesGrid");
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="services-heading"
      style={{ padding: "6rem 1.5rem", maxWidth: "1240px", margin: "0 auto", position: "relative" }}
    >
      {/* Section header */}
      <motion.div
        ref={headRef}
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={headInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ textAlign: "center", marginBottom: "3.5rem", position: "relative", zIndex: 1 }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: "700",
            textTransform: "uppercase",
            color: "var(--accent)",
            letterSpacing: "0.12em",
            marginBottom: "0.75rem",
          }}
        >
          {t("eyebrow")}
        </p>
        <h2
          id="services-heading"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "var(--text-primary)",
            letterSpacing: "-0.025em",
            marginBottom: "1rem",
          }}
        >
          {t("heading")}
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.05rem",
            maxWidth: "540px",
            margin: "0 auto",
            lineHeight: "1.7",
          }}
        >
          {t("subheading")}
        </p>
      </motion.div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {serviceConfig.map((service, i) => (
          <ServiceCard key={service.key} service={service} index={i} />
        ))}
      </div>

      {/* CTA link */}
      <div style={{ textAlign: "center", marginTop: "3rem", position: "relative", zIndex: 1 }}>
        <Link
          href="/services"
          style={{
            color: "var(--accent)",
            textDecoration: "none",
            fontSize: "0.92rem",
            fontWeight: "600",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            borderRadius: "10px",
            border: "1px solid var(--border)",
            background: "rgba(13, 34, 56, 0.4)",
            backdropFilter: "blur(10px)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "var(--accent)";
            el.style.background = "var(--accent-dim)";
            el.style.gap = "12px";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "var(--border)";
            el.style.background = "rgba(13, 34, 56, 0.4)";
            el.style.gap = "8px";
          }}
        >
          {t("viewAll")} <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
