import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { ScopeEstimator } from "@/components/estimator/ScopeEstimator";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Estimator" });
  return buildPageMetadata({
    locale,
    path: "/estimator",
    title: t("metaTitle"),
    description: t("metaDesc"),
  });
}

export default async function EstimatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Estimator" });

  return (
    <section style={{ maxWidth: "900px", margin: "0 auto", padding: "8rem 1.5rem 5rem" }}>
      <p
        style={{
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: "0.75rem",
        }}
      >
        {t("eyebrow")}
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
          lineHeight: 1.15,
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
          marginBottom: "1rem",
          maxWidth: "760px",
        }}
      >
        {t("heading")}
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "1.05rem",
          lineHeight: 1.7,
          maxWidth: "640px",
          marginBottom: "1rem",
        }}
      >
        {t("subheading")}
      </p>
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "0.9rem",
          lineHeight: 1.7,
          maxWidth: "640px",
          marginBottom: "3rem",
        }}
      >
        {t("whyPublished")}
      </p>

      <ScopeEstimator />
    </section>
  );
}
