"use client";
import { useMemo, useRef, useState } from "react";
import { Calculator, Lock, ArrowRight, CheckCircle } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  SERVICE_IDS,
  QUESTIONS,
  estimate,
  driverShare,
  type ServiceId,
} from "@/lib/estimator";
import { CONTACT_EMAILS, getBookingConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "loading" | "unlocked" | "error";

export function ScopeEstimator() {
  const t = useTranslations("Estimator");
  const tServices = useTranslations("Services");
  const locale = useLocale();

  const [serviceId, setServiceId] = useState<ServiceId>("network");
  const [answers, setAnswers] = useState<Partial<Record<string, string>>>({});
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const renderedAt = useRef(Date.now());
  const startedTracked = useRef(false);

  const questions = QUESTIONS[serviceId];
  const result = useMemo(() => estimate(serviceId, answers), [serviceId, answers]);
  const shares = useMemo(() => driverShare(result), [result]);

  const currency = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  const booking = getBookingConfig();
  const answeredCount = questions.filter((q) => answers[q.id]).length;

  function selectService(id: ServiceId) {
    setServiceId(id);
    setAnswers({});
    setStatus("idle");
    if (!startedTracked.current) {
      startedTracked.current = true;
      trackEvent("estimator_started", { service: id, locale });
    }
  }

  function selectOption(questionId: string, optionId: string) {
    if (!startedTracked.current) {
      startedTracked.current = true;
      trackEvent("estimator_started", { service: serviceId, locale });
    }
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: optionId };
      if (questions.every((q) => next[q.id])) {
        trackEvent("estimator_completed", { service: serviceId, locale });
      }
      return next;
    });
  }

  async function handleUnlock(e: React.FormEvent) {
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
          source: "estimator",
          service: serviceId,
          hp: "",
          elapsedMs: Date.now() - renderedAt.current,
        }),
      });
      const payload = (await res.json().catch(() => ({ ok: false }))) as { ok?: boolean };

      if (res.ok && payload.ok) {
        trackEvent("email_captured", { source: "estimator", service: serviceId, locale });
        setStatus("unlocked");
      } else {
        trackEvent("email_capture_failed", { source: "estimator", service: serviceId, locale });
        setStatus("error");
      }
    } catch {
      trackEvent("email_capture_failed", { source: "estimator", service: serviceId, locale, reason: "network" });
      setStatus("error");
    }
  }

  return (
    <div style={{ maxWidth: "780px", margin: "0 auto" }}>
      {/* ---------- Step 1: service ---------- */}
      <fieldset style={{ border: "none", padding: 0, margin: "0 0 2rem" }}>
        <legend
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: "0.75rem",
          }}
        >
          {t("serviceLabel")}
        </legend>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.6rem" }}>
          {SERVICE_IDS.map((id) => {
            const active = id === serviceId;
            return (
              <button
                key={id}
                type="button"
                onClick={() => selectService(id)}
                aria-pressed={active}
                style={{
                  textAlign: "left",
                  padding: "0.75rem 1rem",
                  borderRadius: "9px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  background: active ? "var(--accent-dim)" : "var(--bg-card)",
                  border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                  color: active ? "var(--accent)" : "var(--text-secondary)",
                  transition: "all 0.18s ease",
                }}
              >
                {tServices(`${id}.title`)}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* ---------- Step 2: scope drivers ---------- */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
        {questions.map((question, index) => (
          <fieldset key={question.id} style={{ border: "none", padding: 0, margin: 0 }}>
            <legend
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem",
                color: "var(--text-primary)",
                marginBottom: "0.75rem",
                display: "flex",
                alignItems: "baseline",
                gap: "0.5rem",
              }}
            >
              <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                {index + 1}.
              </span>
              {t(`questions.${serviceId}.${question.id}.label`)}
            </legend>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem" }}>
              {question.options.map((option) => {
                const checked = answers[question.id] === option.id;
                const optionLabel = t(`questions.${serviceId}.${question.id}.options.${option.id}`);
                return (
                  <label
                    key={option.id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.6rem",
                      padding: "0.7rem 0.9rem",
                      borderRadius: "9px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      lineHeight: 1.4,
                      background: checked ? "var(--accent-dim)" : "var(--bg-card)",
                      border: `1px solid ${checked ? "var(--accent)" : "var(--border)"}`,
                      color: checked ? "var(--text-primary)" : "var(--text-secondary)",
                    }}
                  >
                    <input
                      type="radio"
                      name={`${serviceId}-${question.id}`}
                      value={option.id}
                      checked={checked}
                      onChange={() => selectOption(question.id, option.id)}
                      style={{ marginTop: "2px", accentColor: "var(--accent)" }}
                    />
                    <span>{optionLabel}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      {/* ---------- Result: value is shown BEFORE any ask ---------- */}
      <div
        style={{
          marginTop: "2.5rem",
          padding: "1.75rem",
          borderRadius: "12px",
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
        }}
      >
        <h2
          id="estimator-result-heading"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            color: "var(--text-primary)",
            marginBottom: "0.35rem",
          }}
        >
          {t("resultsHeading")}
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: "1.25rem" }}>
          {answeredCount < questions.length ? t("partialNotice") : t("completeNotice")}
        </p>

        <p
          aria-live="polite"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            color: "var(--accent)",
            lineHeight: 1.1,
            marginBottom: "0.5rem",
          }}
        >
          {currency.format(result.low)} – {currency.format(result.high)}
          {result.cadence === "monthly" && (
            <span style={{ fontSize: "1rem", color: "var(--text-muted)" }}> {t("perMonth")}</span>
          )}
        </p>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
          {t("indicative")}
        </p>

        <h3
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: "0.6rem",
          }}
        >
          {t("driversHeading")}
        </h3>
        {shares.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{t("driversEmpty")}</p>
        ) : (
          <ul style={{ listStyle: "none", margin: "0 0 1.5rem", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {shares.slice(0, 3).map((driver) => (
              <li key={driver.questionId} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.85rem" }}>
                <span style={{ color: "var(--text-secondary)", flex: "1 1 auto" }}>
                  {t(`questions.${serviceId}.${driver.questionId}.label`)}
                </span>
                <span
                  aria-hidden="true"
                  style={{ width: "90px", height: "5px", borderRadius: "3px", background: "var(--border)", overflow: "hidden", flex: "0 0 auto" }}
                >
                  <span style={{ display: "block", height: "100%", width: `${driver.share}%`, background: "var(--accent)" }} />
                </span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", width: "38px", textAlign: "right", flex: "0 0 auto" }}>
                  {driver.share}%
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* ---------- Gate: unlock the itemised breakdown ---------- */}
        {status === "unlocked" ? (
          <div role="status" style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#34d399",
                fontSize: "0.9rem",
                fontWeight: 500,
                marginBottom: "1rem",
              }}
            >
              <CheckCircle size={18} aria-hidden="true" />
              {t("unlocked")}
            </p>

            <h3
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "0.75rem",
              }}
            >
              {t("breakdownHeading")}
            </h3>
            <ul style={{ listStyle: "none", margin: "0 0 1.5rem", padding: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {questions.map((question) => {
                const chosen = answers[question.id];
                return (
                  <li key={question.id} style={{ display: "flex", justifyContent: "space-between", gap: "1rem", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                    <span>{t(`questions.${serviceId}.${question.id}.label`)}</span>
                    <span style={{ color: "var(--text-primary)", textAlign: "right" }}>
                      {chosen ? t(`questions.${serviceId}.${question.id}.options.${chosen}`) : t("notAnswered")}
                    </span>
                  </li>
                );
              })}
            </ul>

            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              {t("ctaHeading")}
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              {t("ctaBody")}
            </p>
            {booking.url ? (
              <a
                href={booking.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("booking_click", { placement: "estimator-result", service: serviceId, locale })}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "var(--accent)",
                  color: "#05080f",
                  padding: "12px 22px",
                  borderRadius: "9px",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                }}
              >
                {t("ctaBooking")}
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            ) : (
              <Link
                href="/contact"
                onClick={() => trackEvent("service_cta_click", { placement: "estimator-result", service: serviceId, locale })}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "var(--accent)",
                  color: "#05080f",
                  padding: "12px 22px",
                  borderRadius: "9px",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                }}
              >
                {t("ctaContact")}
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            )}
          </div>
        ) : (
          <form onSubmit={handleUnlock} style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
            <p style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-primary)", fontSize: "0.9rem", fontWeight: 500, marginBottom: "0.35rem" }}>
              <Lock size={16} aria-hidden="true" />
              {t("unlockHeading")}
            </p>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1rem" }}>
              {t("unlockBody")}
            </p>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <label htmlFor="estimator-email" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
                {t("emailLabel")}
              </label>
              <input
                id="estimator-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                aria-describedby="estimator-error"
                style={{
                  flex: "1 1 240px",
                  maxWidth: "340px",
                  padding: "12px 16px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "9px",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
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
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  border: "none",
                  cursor: status === "loading" ? "wait" : "pointer",
                  opacity: status === "loading" ? 0.7 : 1,
                }}
              >
                {status === "loading" ? t("unlocking") : t("unlockCta")}
              </button>
            </div>

            <p id="estimator-error" role="alert" style={{ color: "#f87171", fontSize: "0.82rem", marginTop: "0.75rem" }}>
              {status === "error" ? (
                <>
                  {t("unlockError")}{" "}
                  <a href={`mailto:${CONTACT_EMAILS.hello}`} style={{ color: "var(--accent)", textDecoration: "underline" }}>
                    {CONTACT_EMAILS.hello}
                  </a>
                </>
              ) : null}
            </p>
          </form>
        )}

        <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "6px" }}>
          <Calculator size={13} aria-hidden="true" />
          {t("disclaimer")}
        </p>
      </div>
    </div>
  );
}
