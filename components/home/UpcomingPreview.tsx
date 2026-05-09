"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const upcomingProjects = [
    {
        title: "MedRating Panama",
        description: "AI-powered medical provider rating platform for Panama's healthcare system.",
        timeline: "Q3 2026",
        emoji: "🏥"
    },
    {
        title: "Football Analyzer & Scout",
        description: "AI-driven talent scouting platform for football with predictive analytics.",
        timeline: "Q4 2026",
        emoji: "⚽"
    }
];

export function UpcomingPreview() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            aria-labelledby="upcoming-heading"
            style={{ padding: "6rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
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
                    What's next
                </p>
                <h2
                    id="upcoming-heading"
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                        color: "var(--text-primary)",
                        letterSpacing: "-0.02em",
                    }}
                >
                    Upcoming Projects
                </h2>
            </motion.div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "1.5rem",
                }}
            >
                {upcomingProjects.map((project, i) => (
                    <motion.article
                        key={project.title}
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
                        style={{
                            background: "var(--bg-card)",
                            border: "1px solid var(--border)",
                            borderRadius: "var(--radius-lg)",
                            padding: "2rem",
                            position: "relative",
                        }}
                    >
                        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                            {project.emoji}
                        </div>
                        <h3
                            style={{
                                fontSize: "1.25rem",
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
                            {project.description}
                        </p>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "0.75rem",
                                    color: "var(--text-muted)",
                                }}
                            >
                                <Clock size={14} style={{ marginRight: "0.5rem" }} />
                                {project.timeline}
                            </div>
                            <Link
                                href="/upcoming"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    color: "var(--accent)",
                                    textDecoration: "none",
                                    fontSize: "0.875rem",
                                    fontWeight: "500",
                                }}
                            >
                                Learn More
                                <ArrowRight size={14} />
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
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "var(--accent)",
                        color: "var(--bg-primary)",
                        padding: "12px 24px",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontWeight: "600",
                        fontSize: "0.875rem",
                    }}
                >
                    View All Upcoming Projects
                    <ArrowRight size={16} />
                </Link>
            </motion.div>
        </section>
    );
}