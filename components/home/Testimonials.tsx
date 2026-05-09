"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
    {
        quote: "Nereid Systems transformed our network infrastructure. What used to take weeks of downtime now runs smoothly 24/7. Their expertise in modern IT solutions is unmatched.",
        author: "Sarah Chen",
        role: "IT Director",
        company: "Metro Healthcare Group",
        avatar: "SC"
    },
    {
        quote: "The AI automation workflow they built saved us 30 hours per week. We went from reactive to proactive, and our team can finally focus on strategic growth.",
        author: "Marcus Rodriguez",
        role: "Operations Manager",
        company: "Swift Logistics",
        avatar: "MR"
    },
    {
        quote: "Their full-stack development approach delivered exactly what we needed: a scalable platform that grows with our business. Professional, reliable, and innovative.",
        author: "Emily Watson",
        role: "CEO",
        company: "FinTech Innovations",
        avatar: "EW"
    }
];

export function Testimonials() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            aria-label="Client testimonials"
            style={{
                padding: "6rem 1.5rem",
                background: "linear-gradient(135deg, var(--bg-surface) 0%, var(--background) 100%)",
            }}
        >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: "center", marginBottom: "4rem" }}
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
                        What our clients say
                    </p>
                    <h2
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                            color: "var(--text-primary)",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Trusted by Industry Leaders
                    </h2>
                </motion.div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "2rem",
                    }}
                >
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            style={{
                                background: "var(--bg-card)",
                                border: "1px solid var(--border)",
                                borderRadius: "var(--radius-lg)",
                                padding: "2rem",
                                position: "relative",
                            }}
                        >
                            <Quote
                                size={24}
                                style={{
                                    color: "var(--accent)",
                                    marginBottom: "1rem",
                                    opacity: 0.6,
                                }}
                            />
                            <blockquote
                                style={{
                                    fontSize: "1rem",
                                    lineHeight: "1.6",
                                    color: "var(--text-secondary)",
                                    marginBottom: "1.5rem",
                                    fontStyle: "italic",
                                }}
                            >
                                "{testimonial.quote}"
                            </blockquote>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        background: "var(--accent)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "white",
                                        fontWeight: "600",
                                        fontSize: "0.9rem",
                                        marginRight: "1rem",
                                    }}
                                >
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <p
                                        style={{
                                            fontWeight: "600",
                                            color: "var(--text-primary)",
                                            marginBottom: "0.25rem",
                                        }}
                                    >
                                        {testimonial.author}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: "0.875rem",
                                            color: "var(--text-muted)",
                                        }}
                                    >
                                        {testimonial.role}, {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    style={{
                        textAlign: "center",
                        color: "var(--text-muted)",
                        fontSize: "0.78rem",
                        marginTop: "3rem",
                    }}
                >
                    Placeholder testimonials — real client feedback coming soon
                </motion.p>
            </div>
        </section>
    );
}