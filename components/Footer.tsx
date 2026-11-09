"use client";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { isEnabled } from "@/lib/features";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const year = new Date().getFullYear();
  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: "1px solid var(--border)",
        padding: "3rem 1.5rem 2rem",
        marginTop: "4rem",
        backgroundColor: "var(--bg-surface)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            marginBottom: "2.5rem",
          }}
        >
          <div>
            <Image
              src="/nereid-logo.png"
              alt="Nereid Systems"
              width={140}
              height={46}
              style={{ width: "140px", height: "auto", objectFit: "contain", marginBottom: "0.75rem" }}
            />
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: "1.6" }}>
              {t("description")}
            </p>
          </div>

          <nav aria-label={t("navLabel")}>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "0.75rem",
              }}
            >
              {t("pagesHeading")}
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { href: "/", label: tNav("home") },
                { href: "/services", label: tNav("services") },
                { href: "/upcoming", label: tNav("upcoming") },
                ...(isEnabled("estimator") ? [{ href: "/estimator", label: tNav("estimator") }] : []),
                { href: "/contact", label: tNav("contact") },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-link"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "0.75rem",
              }}
            >
              {t("contactHeading")}
            </p>
            <a
              href="mailto:hello@nereidsystems.com"
              style={{
                color: "var(--accent-text)",
                textDecoration: "none",
                fontSize: "0.875rem",
              }}
            >
              hello@nereidsystems.com
            </a>
            <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginTop: "0.5rem" }}>
              {t("responseTime")}
            </p>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            {t("copyright", { year })}
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            {t("builtWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}
