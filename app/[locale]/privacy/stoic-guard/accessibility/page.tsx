import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { CSSProperties } from "react";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return buildPageMetadata({
    locale,
    path: "/privacy/stoic-guard/accessibility",
    title: t("accessibilityMetaTitle"),
    description: t("accessibilityMetaDescription"),
  });
}

// Shared look for the app-store privacy pages (kept in sync across
// /privacy/stoic-guard, /privacy/stoic-guard/accessibility and
// /privacy/night-game-athletics-command).
const container: CSSProperties = { maxWidth: "860px", margin: "0 auto", padding: "var(--page-top) 1.5rem 4rem" };
const eyebrow: CSSProperties = { color: "var(--accent-text)", textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.12em", fontWeight: 600, marginBottom: "0.75rem" };
const title: CSSProperties = { fontSize: "clamp(2rem, 4vw, 2.75rem)" };
const body: CSSProperties = { color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "70ch", display: "flex", flexDirection: "column", gap: "1.5rem" };
const strong: CSSProperties = { color: "var(--text-primary)" };
const enterCss = `@keyframes privacy-enter{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}.privacy-enter{animation:privacy-enter var(--dur-long) var(--ease-enter) both}@media (prefers-reduced-motion: reduce){.privacy-enter{animation:none}}`;

export default async function AccessibilityValidationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tCrumb = await getTranslations({ locale, namespace: "Breadcrumb" });
  const tPrivacy = await getTranslations({ locale, namespace: "Privacy" });

  return (
    <div style={container}>
      <style>{enterCss}</style>
      <Breadcrumb
        items={[
          { label: tCrumb("home"), href: "/" },
          { label: tPrivacy("stoicGuardMetaTitle"), href: "/privacy/stoic-guard" },
          { label: tPrivacy("accessibilityMetaTitle") },
        ]}
      />
      <article>
        <header className="privacy-enter" style={{ marginBottom: "2.5rem" }}>
          <p style={eyebrow}>Google Play Validation</p>
          <h1 className="page-title" style={title}>Accessibility Service Demonstration</h1>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "70ch", marginTop: "1rem" }}>
            This video demonstrates how Stoic Guard uses the Accessibility Service to detect the foreground application and enforce user-defined time limits.
          </p>
        </header>

        <div style={{ overflow: "hidden", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", background: "#000", boxShadow: "var(--shadow-card)" }}>
          <video
            src="/accesibility-video.webm"
            controls
            style={{ display: "block", width: "100%", aspectRatio: "16 / 9" }}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <section className="card" style={{ ...body, gap: "1rem", marginTop: "2rem", fontSize: "0.95rem" }}>
          <p>
            <strong style={strong}>App Name:</strong> Stoic Guard
          </p>
          <p>
            <strong style={strong}>Purpose:</strong> This demonstration is provided for the Google Play review team to verify compliance with Accessibility Service policies.
          </p>
        </section>
      </article>
    </div>
  );
}
