"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Placeholder logo data — replace with real SVGs/images
const logos = [
  { name: "TechCorp", abbr: "TC" },
  { name: "BuildFast", abbr: "BF" },
  { name: "DataFlow", abbr: "DF" },
  { name: "CloudBase", abbr: "CB" },
  { name: "NexusLabs", abbr: "NL" },
  { name: "Pinnacle", abbr: "PI" },
];

export function SocialProof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="Companies that trust Nereid Systems"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "3.5rem 1.5rem",
        backgroundColor: "var(--bg-surface)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: "center",
            fontSize: "0.75rem",
            fontWeight: "600",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: "2rem",
          }}
        >
          Trusted by forward-thinking teams
        </motion.p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          {logos.map(({ name, abbr }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              title={name}
              style={{
                width: "100px",
                height: "42px",
                borderRadius: "8px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                filter: "grayscale(1)",
                opacity: 0.5,
                transition: "all 0.25s ease",
                cursor: "default",
                fontFamily: "var(--font-display)",
                fontSize: "0.9rem",
                color: "var(--text-muted)",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.filter = "grayscale(0)";
                el.style.opacity = "1";
                el.style.borderColor = "var(--border-hover)";
                el.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.filter = "grayscale(1)";
                el.style.opacity = "0.5";
                el.style.borderColor = "var(--border)";
                el.style.color = "var(--text-muted)";
              }}
            >
              {abbr}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.78rem",
            marginTop: "1.5rem",
          }}
        >
          Placeholder logos — real client logos coming soon
        </motion.p>
      </div>
    </section>
  );
}
