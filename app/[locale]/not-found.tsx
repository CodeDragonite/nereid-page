import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * Localized 404. Rendered inside app/[locale]/layout.tsx (navbar, footer,
 * theme), for `notFound()` calls in any locale route — including routes
 * switched off in lib/features.ts — and for unknown paths via [...rest].
 */
export default function LocaleNotFound() {
  const t = useTranslations("NotFound");
  return (
    <section
      aria-labelledby="not-found-heading"
      style={{
        minHeight: "70svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "var(--page-top) 1.5rem 4rem",
        textAlign: "center",
      }}
    >
      <p
        style={{
          color: "var(--accent-text)",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {t("tag")}
      </p>
      <h1 id="not-found-heading" className="page-title">
        {t("heading")}
      </h1>
      <p style={{ color: "var(--text-secondary)", maxWidth: "420px", lineHeight: 1.7 }}>{t("body")}</p>
      <Link href="/" className="btn-primary" style={{ marginTop: "0.5rem" }}>
        {t("cta")}
      </Link>
    </section>
  );
}
