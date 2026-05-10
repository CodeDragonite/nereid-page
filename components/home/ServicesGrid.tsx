"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Network, Globe, Smartphone, Layers, Bot, Server } from "lucide-react";
import { useTranslations } from "next-intl";

const serviceConfig = [
  { key: "network" as const, icon: Network, color: "var(--accent)" },
  { key: "web" as const, icon: Globe, color: "var(--accent2)" },
  { key: "mobile" as const, icon: Smartphone, color: "#a78bfa" },
  { key: "integration" as const, icon: Layers, color: "#fb923c" },
  { key: "ai" as const, icon: Bot, color: "#34d399" },
  { key: "it" as const, icon: Server, color: "#f472b6" },
];

function ServiceCard({ service, index }: { service: typeof serviceConfig[0]; index: number }) {
  const t = useTranslations("ServicesGrid");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const Icon = service.icon;

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
        cursor: "default",
        transition: "border-color 0.22s ease, box-shadow 0.22s ease",
        boxShadow: "var(--shadow-card)",
        position: "relative",
        overflow: "hidden",
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
          opacity: 0.6,
        }}
      />

      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "10px",
          background: `color-mix(in srgb, ${service.color} 15%, transparent)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.25rem",
        }}
      >
        <Icon
          size={22}
          style={{ color: service.color }}
          aria-hidden="true"
        />
      </div>

      <h3
        style={{
          fontSize: "1rem",
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
          lineHeight: "1.6",
          margin: 0,
        }}
      >
        {t(`${service.key}.outcome`)}
      </p>
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
      style={{
        padding: "6rem 1.5rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <motion.div
        ref={headRef}
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={headInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        style={{ textAlign: "center", marginBottom: "3.5rem" }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: "600",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
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
            letterSpacing: "-0.02em",
            marginBottom: "1rem",
          }}
        >
          {t("heading")}
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.05rem",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: "1.7",
          }}
        >
          {t("subheading")}
        </p>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {serviceConfig.map((service, i) => (
          <ServiceCard key={service.key} service={service} index={i} />
        ))}
      </div>

      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={headInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.4 }}
        style={{ textAlign: "center", marginTop: "2.5rem" }}
      >
        <Link
          href="/services"
          style={{
            color: "var(--accent)",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: "500",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            transition: "gap 0.2s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = "10px"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = "6px"; }}
        >
          {t("viewAll")}
        </Link>
      </motion.div>
    </section>
  );
}
