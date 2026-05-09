"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setStatus("loading");

    try {
      // Replace with your actual form endpoint
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tag: "lead_magnet" }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      // Log to server-side in production
      setStatus("error");
    }
  };

  return (
    <section
      ref={ref}
      aria-labelledby="lead-heading"
      style={{
        padding: "5rem 1.5rem",
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "12px",
            background: "var(--accent-dim)",
            border: "1px solid var(--border-hover)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}
        >
          <Mail size={24} style={{ color: "var(--accent)" }} aria-hidden="true" />
        </div>

        <h2
          id="lead-heading"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            color: "var(--text-primary)",
            marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          Ready to simplify your tech?
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1rem",
            lineHeight: "1.7",
            marginBottom: "2rem",
          }}
        >
          Get our free{" "}
          <strong style={{ color: "var(--text-primary)" }}>IT Audit Checklist</strong>
          —a practical guide to finding the gaps in your infrastructure before they find you.
        </p>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "16px 24px",
              background: "rgba(52,211,153,0.1)",
              border: "1px solid rgba(52,211,153,0.3)",
              borderRadius: "10px",
              color: "#34d399",
              fontWeight: "500",
            }}
            role="alert"
          >
            <CheckCircle size={20} aria-hidden="true" />
            Sent! Check your inbox for the checklist.
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            aria-label="IT Audit Checklist signup"
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <label htmlFor="lead-email" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
              Email address
            </label>
            <input
              id="lead-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              aria-required="true"
              aria-describedby="lead-desc"
              style={{
                flex: "1 1 220px",
                maxWidth: "320px",
                padding: "12px 16px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "9px",
                color: "var(--text-primary)",
                fontSize: "0.9rem",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; }}
              onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              aria-busy={status === "loading"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "var(--accent)",
                color: "#05080f",
                padding: "12px 20px",
                borderRadius: "9px",
                fontWeight: "600",
                fontSize: "0.9rem",
                border: "none",
                cursor: status === "loading" ? "wait" : "pointer",
                transition: "all 0.2s ease",
                opacity: status === "loading" ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (status !== "loading") {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px var(--accent-glow)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {status === "loading" ? "Sending…" : (
                <>
                  Send me the checklist
                  <ArrowRight size={15} aria-hidden="true" />
                </>
              )}
            </button>

            {status === "error" && (
              <p
                id="lead-desc"
                role="alert"
                style={{ color: "#f87171", fontSize: "0.85rem", width: "100%", textAlign: "center" }}
              >
                Something went wrong. Try emailing us directly at hello@nereidsystems.com
              </p>
            )}
          </form>
        )}

        <p
          id="lead-desc"
          style={{
            color: "var(--text-muted)",
            fontSize: "0.78rem",
            marginTop: "1rem",
          }}
        >
          No spam. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
}
