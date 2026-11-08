"use client";
import { useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { CONTACT_EMAILS } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

export function LeadMagnet() {
  const t = useTranslations("LeadMagnet");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const renderedAt = useRef(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          locale,
          source: "homepage",
          hp: "",
          elapsedMs: Date.now() - renderedAt.current,
        }),
      });

      const payload = (await res.json().catch(() => ({ ok: false }))) as { ok?: boolean };
      if (res.ok && payload.ok) {
        setStatus("success");
        trackEvent("email_captured", { source: "homepage", locale });
      } else {
        trackEvent("email_capture_failed", { source: "homepage", locale });
        setStatus("error");
      }
    } catch {
      trackEvent("email_capture_failed", { source: "homepage", locale, reason: "network" });
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
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background radial highlight */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(600px, 90vw)",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(0, 210, 210, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            background: "var(--accent-dim)",
            border: "1px solid var(--border-hover)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            boxShadow: "0 0 20px rgba(0, 210, 210, 0.1)",
          }}
          whileHover={reduced ? {} : { scale: 1.08, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
        >
          <Mail size={24} style={{ color: "var(--accent)" }} aria-hidden="true" />
        </motion.div>

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
          {t("heading")}
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1rem",
            lineHeight: "1.7",
            marginBottom: "2rem",
          }}
        >
          {t.rich("body", { strong: (chunks) => <strong style={{ color: "var(--text-primary)" }}>{chunks}</strong> })}
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
            {t("successMsg")}
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            aria-label={t("formLabel")}
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <label htmlFor="lead-email" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
              {t("emailLabel")}
            </label>
            <input
              id="lead-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("placeholder")}
              required
              aria-required="true"
              aria-describedby="lead-disclaimer"
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
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent)";
                e.target.style.boxShadow = "0 0 12px var(--accent-glow)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border)";
                e.target.style.boxShadow = "none";
              }}
            />
            <motion.button
              type="submit"
              disabled={status === "loading"}
              aria-busy={status === "loading"}
              whileHover={reduced || status === "loading" ? {} : { scale: 1.03 }}
              whileTap={reduced || status === "loading" ? {} : { scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "var(--accent)",
                color: "#05080f",
                padding: "12px 22px",
                borderRadius: "9px",
                fontWeight: "700",
                fontSize: "0.9rem",
                border: "none",
                cursor: status === "loading" ? "wait" : "pointer",
                transition: "box-shadow 0.2s ease",
                opacity: status === "loading" ? 0.7 : 1,
                boxShadow: "0 0 16px var(--accent-glow)",
              }}
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                  {t("submitting")}
                </>
              ) : (
                <>
                  {t("submit")}
                  <ArrowRight size={15} aria-hidden="true" />
                </>
              )}
            </motion.button>

            {status === "error" && (
              <p
                id="lead-error"
                role="alert"
                style={{ color: "#f87171", fontSize: "0.85rem", width: "100%", textAlign: "center" }}
              >
                {t("errorMsg")}{" "}
                <a
                  href={`mailto:${CONTACT_EMAILS.hello}`}
                  style={{ color: "var(--accent)", textDecoration: "underline" }}
                >
                  {CONTACT_EMAILS.hello}
                </a>
              </p>
            )}
          </form>
        )}

        <p
          id="lead-disclaimer"
          style={{
            color: "var(--text-muted)",
            fontSize: "0.78rem",
            marginTop: "1.25rem",
          }}
        >
          {t("disclaimer")}
        </p>
      </motion.div>
    </section>
  );
}
