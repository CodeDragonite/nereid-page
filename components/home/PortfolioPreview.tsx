"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    id: "1",
    title: "Multi-Tenant SaaS Platform",
    client: "FinTech Startup",
    result: "Reduced onboarding time from 2 weeks to 4 hours with automated provisioning",
    tags: ["Web App", "API Integration"],
    gradient: "linear-gradient(135deg, #00d2d2 0%, #3d7fff 100%)",
    emoji: "📊",
  },
  {
    id: "2",
    title: "AI-Powered Operations Workflow",
    client: "Regional Logistics Co.",
    result: "Automated 68% of manual dispatch decisions, saving 30+ hours per week",
    tags: ["AI Automation", "Integration"],
    gradient: "linear-gradient(135deg, #34d399 0%, #059669 100%)",
    emoji: "🤖",
  },
  {
    id: "3",
    title: "SMB Network Modernization",
    client: "Healthcare Practice",
    result: "Zero unplanned downtime in 18 months post-deployment with proactive monitoring",
    tags: ["Network", "IT Management"],
    gradient: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
    emoji: "🏥",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

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
      {/* Thumbnail */}
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

        {/* Hover overlay */}
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
            href={`/portfolio`}
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
            View Portfolio
          </Link>
        </div>
      </div>

      <div style={{ padding: "1.5rem" }}>
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            marginBottom: "0.4rem",
            fontWeight: "500",
          }}
        >
          {project.client}
        </p>
        <h3
          style={{
            fontSize: "1.05rem",
            fontWeight: "600",
            color: "var(--text-primary)",
            marginBottom: "0.75rem",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
            lineHeight: "1.6",
            marginBottom: "1rem",
          }}
        >
          {project.result}
        </p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {project.tags.map((tag) => (
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
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section
      aria-labelledby="portfolio-heading"
      style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}
    >
      <motion.div
        ref={headRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        style={{ textAlign: "center", marginBottom: "3rem" }}
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
          Recent work
        </p>
        <h2
          id="portfolio-heading"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          Projects That Moved the Needle
        </h2>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
