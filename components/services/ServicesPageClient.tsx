"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Network, Globe, Smartphone, Layers, Bot, Server,
  ChevronDown, Clock, Code2, DollarSign, ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { AIChatWidget } from "./AIChatWidget";

const iconMap: Record<string, React.ElementType> = {
  Network, Globe, Smartphone, Layers, Bot, Server,
};

type Service = {
  id: string;
  icon: string;
  color: string;
  title: string;
  outcome: string;
  scope: string;
  timeline: string;
  stack: string;
  price: string;
  cta: string;
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const t = useTranslations("Services");
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = iconMap[service.icon] || Server;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.48, delay: index * 0.08, ease: "easeOut" as const }}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        boxShadow: "var(--shadow-card)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)";
      }}
    >
      {/* Top bar */}
      <div
        aria-hidden="true"
        style={{ height: "3px", background: `linear-gradient(90deg, ${service.color}, transparent)` }}
      />

      <div style={{ padding: "1.75rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "10px",
              background: `color-mix(in srgb, ${service.color} 15%, transparent)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={22} style={{ color: service.color }} aria-hidden="true" />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: "600", color: "var(--text-primary)", marginBottom: "0.4rem" }}>
              {service.title}
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
              {service.outcome}
            </p>
          </div>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setExpanded((p) => !p)}
          aria-expanded={expanded}
          aria-controls={`service-details-${service.id}`}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "none",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "9px 14px",
            color: "var(--text-secondary)",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: "500",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
            (e.currentTarget as HTMLElement).style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
          }}
        >
          {expanded ? t("collapseLabel") : t("expandLabel")}
          <ChevronDown
            size={16}
            aria-hidden="true"
            style={{
              transition: "transform 0.2s ease",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              id={`service-details-${service.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" as const }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ paddingTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                {[
                  { icon: ArrowRight, label: t("scopeLabel"), value: service.scope },
                  { icon: Clock, label: t("timelineLabel"), value: service.timeline },
                  { icon: Code2, label: t("stackLabel"), value: service.stack },
                  // { icon: DollarSign, label: t("priceLabel"), value: service.price },
                ].map(({ icon: DetailIcon, label, value }) => (
                  <div key={label} style={{ display: "flex", gap: "0.75rem" }}>
                    <DetailIcon size={15} style={{ color: service.color, flexShrink: 0, marginTop: "3px" }} aria-hidden="true" />
                    <div>
                      <span style={{ fontSize: "0.72rem", fontWeight: "600", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        {label}
                      </span>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "2px 0 0", lineHeight: "1.5" }}>
                        {value}
                      </p>
                    </div>
                  </div>
                ))}

                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "0.25rem",
                    background: service.color,
                    color: "#05080f",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    alignSelf: "flex-start",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                    (e.currentTarget as HTMLElement).style.opacity = "0.9";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                  }}
                >
                  {service.cta}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export function ServicesPageClient({ services }: { services: Service[] }) {
  const t = useTranslations("Services");
  return (
    <>
      {/* Page header */}
      <div
        style={{
          paddingTop: "120px",
          paddingBottom: "4rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" className="hero-gradient" style={{ position: "absolute", inset: 0 }} />
        <div aria-hidden="true" className="grid-overlay" style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "0.75rem",
            }}
          >
            {t("heroEyebrow")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
            }}
          >
            {t("heroHeading")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              maxWidth: "540px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}
          >
            {t("heroSubheading")}
          </motion.p>
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem 6rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {services.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          background: "var(--bg-surface)",
          borderTop: "1px solid var(--border)",
          padding: "4rem 1.5rem",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            color: "var(--text-primary)",
            marginBottom: "0.75rem",
          }}
        >
          {t("ctaHeading")}
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
          {t("ctaBody")}
        </p>
        <Link
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--accent)",
            color: "#05080f",
            padding: "13px 26px",
            borderRadius: "9px",
            fontWeight: "600",
            fontSize: "0.95rem",
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px var(--accent-glow)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          {t("ctaBtn")}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <AIChatWidget />
    </>
  );
}
