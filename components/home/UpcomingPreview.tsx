"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

const upcomingEmojis = ["🏥", "⚽"];

export function UpcomingPreview() {
  const t = useTranslations("UpcomingPreview");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="upcoming-preview-heading"
      style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        style={{ textAlign: "center", marginBottom: "3rem" }}
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
        {upcomingEmojis.map((emoji, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "2rem", position: "relative" }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{emoji}</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
              {t(`project${i}Title`)}
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "1rem" }}>
              {t(`project${i}Desc`)}
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                <Clock size={14} style={{ marginRight: "0.5rem" }} aria-hidden="true" />
                {t(`project${i}Timeline`)}
              </div>
              <Link
                href="/upcoming"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--accent)", textDecoration: "none", fontSize: "0.875rem", fontWeight: "500" }}
              >
                {t("viewAll")}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{ textAlign: "center", marginTop: "3rem" }}
      >
        <Link
          href="/upcoming"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--accent)", color: "#05080f", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "0.875rem" }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 6px 24px var(--accent-glow)"; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
        >
          {t("viewAll")}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  );
}
