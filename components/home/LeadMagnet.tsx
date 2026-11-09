"use client";
import { useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeUp, popIn, VIEWPORT } from "@/lib/motion";
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
  const inView = useInView(ref, VIEWPORT);
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
          background: "radial-gradient(ellipse, color-mix(in srgb, var(--accent) 5%, transparent) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          aria-hidden="true"
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
            boxShadow: "0 0 20px var(--accent-dim)",
          }}
        >
          <Mail size={24} style={{ color: "var(--accent-text)" }} aria-hidden="true" />
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
            variants={popIn}
            initial="initial"
            animate="animate"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "16px 24px",
              background: "color-mix(in srgb, var(--success) 10%, transparent)",
              border: "1px solid color-mix(in srgb, var(--success) 30%, transparent)",
              borderRadius: "var(--radius-md)",
              color: "var(--success)",
              fontWeight: "500",
            }}
            role="status"
            aria-live="polite"
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
              className="field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("placeholder")}
              required
              aria-required="true"
              aria-invalid={status === "error" ? true : undefined}
              aria-describedby={status === "error" ? "lead-error lead-disclaimer" : "lead-disclaimer"}
              style={{
                flex: "1 1 220px",
                maxWidth: "320px",
                width: "auto",
              }}
            />
            {/* whileTap lives on a wrapper so its inline transform never overrides
                the .btn-primary :hover/:focus-visible lift. */}
            <motion.div
              whileTap={reduced || status === "loading" ? undefined : { scale: 0.97 }}
              style={{ display: "inline-flex" }}
            >
              <button
                type="submit"
                disabled={status === "loading"}
                aria-busy={status === "loading"}
                className="btn-primary"
                style={{
                  padding: "12px 22px",
                  fontSize: "0.9rem",
                  cursor: status === "loading" ? "wait" : "pointer",
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
              </button>
            </motion.div>

            {status === "error" && (
              <p
                id="lead-error"
                role="alert"
                aria-live="assertive"
                className="field-error"
                style={{ fontSize: "0.85rem", width: "100%", textAlign: "center" }}
              >
                {t("errorMsg")}{" "}
                <a
                  href={`mailto:${CONTACT_EMAILS.hello}`}
                  style={{ color: "var(--accent-text)", textDecoration: "underline" }}
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
