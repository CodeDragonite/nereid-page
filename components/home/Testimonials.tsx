"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";

const testimonialAvatars = ["SC", "MR", "EW"];

export function Testimonials() {
    const t = useTranslations("Testimonials");
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
                        {t("eyebrow")}
                    </p>
                    <h2
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                            color: "var(--text-primary)",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        {t("heading")}
                    </h2>
                </motion.div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "2rem",
                    }}
                >
                    {testimonialAvatars.map((avatar, i) => (
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
                                &ldquo;{t(`item${i}Quote`)}&rdquo;
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
                                    {avatar}
                                </div>
                                <div>
                                    <p
                                        style={{
                                            fontWeight: "600",
                                            color: "var(--text-primary)",
                                            marginBottom: "0.25rem",
                                        }}
                                    >
                                        {t(`item${i}Author`)}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: "0.875rem",
                                            color: "var(--text-muted)",
                                        }}
                                    >
                                        {t(`item${i}Role`)}, {t(`item${i}Company`)}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}