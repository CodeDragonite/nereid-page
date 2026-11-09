"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import { Network, Globe, Smartphone, Layers, Bot, Server, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ServiceVisual } from "./ServiceVisual";
import { fadeUp, staggerDelay, VIEWPORT } from "@/lib/motion";

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
  const Icon = service.icon;
  const titleId = `service-card-${service.key}-title`;

  return (
    // Wrapper owns the entrance transform; the article owns the CSS hover/focus lift.
    <motion.div variants={fadeUp} custom={staggerDelay(index, 3)} style={{ display: "flex" }}>
      <article
        className="card card-interactive"
        aria-labelledby={titleId}
        style={{
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
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
              aria-hidden="true"
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
            id={titleId}
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

        {/* Explore link: a real link so keyboard users get the same card lift (focus-within) */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: "1.5rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Link
            href="/services"
            className="link-arrow"
            aria-describedby={titleId}
            style={{ fontSize: "0.78rem" }}
          >
            {t("explore")} <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </article>
    </motion.div>
  );
}

export function ServicesGrid() {
  const t = useTranslations("ServicesGrid");
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, VIEWPORT);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, VIEWPORT);

  return (
    <section
      aria-labelledby="services-heading"
      style={{ padding: "6rem 1.5rem", maxWidth: "1240px", margin: "0 auto", position: "relative" }}
    >
      {/* Section header */}
      <motion.div
        ref={headRef}
        variants={fadeUp}
        initial="hidden"
        animate={headInView ? "visible" : "hidden"}
        style={{ textAlign: "center", marginBottom: "3.5rem", position: "relative", zIndex: 1 }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: "700",
            textTransform: "uppercase",
            color: "var(--accent-text)",
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

      {/* Cards grid: one in-view trigger, per-card row-relative stagger */}
      <motion.div
        ref={gridRef}
        initial="hidden"
        animate={gridInView ? "visible" : "hidden"}
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
      </motion.div>

      {/* CTA link */}
      <div style={{ textAlign: "center", marginTop: "3rem", position: "relative", zIndex: 1 }}>
        <Link href="/services" className="btn-secondary">
          {t("viewAll")} <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
