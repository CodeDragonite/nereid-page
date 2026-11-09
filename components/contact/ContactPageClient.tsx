"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { fadeUp, popIn, staggerDelay } from "@/lib/motion";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(20),
});

type FormData = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormData, string>>;

function Field({
  label,
  id,
  error,
  required,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        htmlFor={id}
        style={{
          fontSize: "0.8rem",
          fontWeight: "600",
          color: error ? "var(--danger)" : "var(--text-secondary)",
          letterSpacing: "0.04em",
        }}
      >
        {label}{required && <span aria-hidden="true" style={{ color: "var(--accent-text)", marginLeft: "3px" }}>*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="field-error" style={{ display: "flex", alignItems: "center", gap: "4px", margin: 0 }}>
          <AlertCircle size={12} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

/** aria attributes for a field whose error is currently shown. */
const errorProps = (id: string, error?: string) => ({
  "aria-invalid": !!error,
  "aria-describedby": error ? `${id}-error` : undefined,
});

export function ContactPageClient() {
  const t = useTranslations("Contact");
  const searchParams = useSearchParams();

  const serviceOptions = [
    t("service0"), t("service1"), t("service2"), t("service3"),
    t("service4"), t("service5"), t("service6"),
  ];

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const service = searchParams.get("service");
    if (service) {
      const matched = serviceOptions.find((o) =>
        o.toLowerCase().includes(service.split(" ")[0].toLowerCase())
      );
      if (matched) setForm((p) => ({ ...p, service: matched }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const validate = (data: FormData): Errors => {
    const errs: Errors = {};
    if (!data.name || data.name.length < 2) errs.name = t("nameError");
    if (!data.email || !z.string().email().safeParse(data.email).success) errs.email = t("emailError");
    if (!data.service) errs.service = t("serviceError");
    if (!data.message || data.message.length < 20) errs.message = t("messageError");
    return errs;
  };

  const shownError = (name: keyof FormData): string | undefined =>
    touched[name] ? errors[name] : undefined;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (touched[name as keyof FormData]) {
      setErrors(validate({ ...form, [name]: value }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(form).map((k) => [k, true]));
    setTouched(allTouched as typeof touched);
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Page header */}
      <div
        style={{
          paddingTop: "var(--page-top)",
          paddingBottom: "3rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" className="hero-gradient" style={{ position: "absolute", inset: 0 }} />
        <div aria-hidden="true" className="grid-overlay" style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            style={{ fontSize: "0.75rem", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-text)", marginBottom: "0.6rem" }}
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.08}
            variants={fadeUp}
            className="page-title"
            style={{ marginBottom: "0.75rem" }}
          >
            {t("heading")}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.16}
            variants={fadeUp}
            style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "480px", margin: "0 auto", lineHeight: "1.7" }}
          >
            {t("subheading")}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div
        id="contact-layout"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 1.5rem 6rem",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
          gap: "3rem",
          alignItems: "start",
        }}
      >
        {/* Form */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={staggerDelay(0)}
          variants={fadeUp}
          className="card"
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.4rem",
              color: "var(--text-primary)",
              marginBottom: "1.75rem",
            }}
          >
            {t("formHeading")}
          </h2>

          {status === "success" ? (
            <motion.div
              initial={popIn.initial}
              animate={popIn.animate}
              style={{
                padding: "2rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
              role="status"
              aria-live="polite"
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "color-mix(in srgb, var(--success) 15%, transparent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircle size={28} style={{ color: "var(--success)" }} aria-hidden="true" />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--text-primary)" }}>
                {t("messageSentHeading")}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.6" }}>
                {t("messageSentBody")}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-label={t("formHeading")}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <div id="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <Field label={t("nameLabel")} id="name" error={shownError("name")} required>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="name"
                      aria-required="true"
                      {...errorProps("name", shownError("name"))}
                      className="field"
                    />
                  </Field>
                  <Field label={t("emailLabel")} id="email" error={shownError("email")} required>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="email"
                      aria-required="true"
                      {...errorProps("email", shownError("email"))}
                      className="field"
                    />
                  </Field>
                </div>

                <Field label={t("companyLabel")} id="company">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="organization"
                    className="field"
                  />
                </Field>

                <Field label={t("serviceLabel")} id="service" error={shownError("service")} required>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    {...errorProps("service", shownError("service"))}
                    className="field"
                    style={{ cursor: "pointer" }}
                  >
                    <option value="">{t("selectService")}</option>
                    {serviceOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>

                <Field label={t("messageLabel")} id="message" error={shownError("message")} required>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    placeholder={t("messagePlaceholder")}
                    aria-required="true"
                    {...errorProps("message", shownError("message"))}
                    className="field"
                    style={{ resize: "vertical", minHeight: "120px" }}
                  />
                </Field>

                {status === "error" && (
                  <p role="alert" className="field-error" style={{ fontSize: "0.85rem", display: "flex", gap: "6px", alignItems: "center", margin: 0 }}>
                    <AlertCircle size={14} aria-hidden="true" />
                    {t("errorMsg")}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-busy={status === "loading"}
                  className="btn-primary"
                  style={{
                    alignSelf: "flex-start",
                    cursor: status === "loading" ? "wait" : undefined,
                  }}
                >
                  {status === "loading" ? t("submitting") : t("submitBtn")}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* TODO: Transform this to different component */}
          {/* Calendly card */}
          {/* <motion.div
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "1.75rem",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.2rem",
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
              }}
            >
              {t("bookCallHeading")}
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: "1.6", marginBottom: "1.25rem" }}>
              {t("bookCallBody")}
            </p>
            <a
              href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("bookCallHeading")}
              style={{
                display: "block",
                background: "var(--accent-dim)",
                border: "1px solid var(--border-hover)",
                borderRadius: "8px",
                padding: "0.75rem",
                textAlign: "center",
                color: "var(--accent)",
                fontWeight: "600",
                fontSize: "0.9rem",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--border-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent-dim)";
              }}
            >
              {t("bookCallBtn")}
            </a>
            <p
              style={{
                fontSize: "0.72rem",
                color: "var(--text-muted)",
                textAlign: "center",
                marginTop: "0.5rem",
              }}
            >
              Set NEXT_PUBLIC_CALENDLY_URL in .env.local
            </p>
          </motion.div> */}

          {/* Direct contact */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={staggerDelay(1)}
            variants={fadeUp}
            className="card"
            style={{ padding: "1.75rem" }}
          >
            <h3
              style={{
                fontSize: "0.9rem",
                fontWeight: "600",
                color: "var(--text-primary)",
                marginBottom: "1rem",
              }}
            >
              {t("directContactHeading")}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a
                href="mailto:hello@nereidsystems.com"
                className="text-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "0.875rem",
                }}
              >
                <Mail size={16} style={{ color: "var(--accent)" }} aria-hidden="true" />
                hello@nereidsystems.com
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-muted)", fontSize: "0.875rem" }}>
                <Clock size={16} style={{ color: "var(--accent)" }} aria-hidden="true" />
                {t("responseTime")}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 768px) {
          #contact-layout {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          #contact-form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
