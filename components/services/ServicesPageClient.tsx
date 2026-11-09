"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  Network, Globe, Smartphone, Layers, Bot, Server,
  ChevronDown, Clock, Code2, ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { AIChatWidget } from "./AIChatWidget";
import { EASE, VIEWPORT, fadeUp, staggerDelay } from "@/lib/motion";

const iconMap: Record<string, React.ElementType> = {
  Network, Globe, Smartphone, Layers, Bot, Server,
};

/** Grid columns at desktop width (auto-fill, minmax(320px) in a 1200px container). */
const GRID_COLUMNS = 3;

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
  const Icon = iconMap[service.icon] || Server;

  return (
    // Entrance lives on the wrapper so .card-interactive keeps its :hover transform.
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      custom={staggerDelay(index, GRID_COLUMNS)}
      variants={fadeUp}
    >
      <article
        className="card card-interactive"
        style={{ position: "relative", overflow: "hidden", height: "100%" }}
      >
        {/* Top bar */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(90deg, ${service.color}, transparent)`,
          }}
        />

        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "var(--radius-md)",
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

        {/* Toggle — hover/focus colours in the scoped <style> below */}
        <button
          type="button"
          className="service-toggle"
          onClick={() => setExpanded((p) => !p)}
          aria-expanded={expanded}
          aria-controls={`service-details-${service.id}`}
        >
          {expanded ? t("collapseLabel") : t("expandLabel")}
          <ChevronDown
            size={16}
            aria-hidden="true"
            style={{
              transition: "transform var(--dur-short) var(--ease-standard)",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={`service-details-${service.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0 }}
              transition={{ duration: 0.25, ease: EASE.enter }}
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
                  className="btn-primary btn-sm"
                  style={{ marginTop: "0.25rem", alignSelf: "flex-start" }}
                >
                  {service.cta}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </motion.div>
  );
}

export function ServicesPageClient({ services }: { services: Service[] }) {
  const t = useTranslations("Services");
  return (
    <>
      {/* Page header */}
      <div
        style={{
          paddingTop: "var(--page-top)",
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
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent-text)",
              marginBottom: "0.75rem",
            }}
          >
            {t("heroEyebrow")}
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.08}
            variants={fadeUp}
            className="page-title"
            style={{ marginBottom: "1rem" }}
          >
            {t("heroHeading")}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.16}
            variants={fadeUp}
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
          gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))",
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
        <Link href="/contact" className="btn-primary">
          {t("ctaBtn")}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <AIChatWidget />

      <style>{`
        .service-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: none;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 9px 14px;
          color: var(--text-secondary);
          cursor: pointer;
          font: inherit;
          font-size: 0.85rem;
          font-weight: 500;
          transition:
            border-color var(--dur-micro) var(--ease-standard),
            color var(--dur-micro) var(--ease-standard);
        }
        .service-toggle:hover,
        .service-toggle:focus-visible {
          border-color: var(--border-hover);
          color: var(--accent-text);
        }
      `}</style>
    </>
  );
}
