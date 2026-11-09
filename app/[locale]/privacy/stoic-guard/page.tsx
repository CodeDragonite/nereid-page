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
    path: "/privacy/stoic-guard",
    title: t("stoicGuardMetaTitle"),
    description: t("stoicGuardMetaDescription"),
  });
}

// Shared look for the app-store privacy pages (kept in sync across
// /privacy/stoic-guard, /privacy/stoic-guard/accessibility and
// /privacy/night-game-athletics-command).
const container: CSSProperties = { maxWidth: "860px", margin: "0 auto", padding: "var(--page-top) 1.5rem 4rem" };
const eyebrow: CSSProperties = { color: "var(--accent-text)", textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.12em", fontWeight: 600, marginBottom: "0.75rem" };
const title: CSSProperties = { fontSize: "clamp(2rem, 4vw, 2.75rem)" };
const date: CSSProperties = { color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "1rem" };
const body: CSSProperties = { color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "70ch", display: "flex", flexDirection: "column", gap: "1.5rem" };
const h2: CSSProperties = { fontSize: "1.375rem", color: "var(--text-primary)", fontWeight: 600, marginBottom: "1rem" };
const list: CSSProperties = { listStyle: "disc", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" };
const strong: CSSProperties = { color: "var(--text-primary)" };
const link: CSSProperties = { color: "var(--accent-text)", textDecoration: "underline", textUnderlineOffset: "4px" };
const enterCss = `@keyframes privacy-enter{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}.privacy-enter{animation:privacy-enter var(--dur-long) var(--ease-enter) both}@media (prefers-reduced-motion: reduce){.privacy-enter{animation:none}}`;

export default async function StoicGuardPrivacyPage({
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
      <Breadcrumb items={[{ label: tCrumb("home"), href: "/" }, { label: tPrivacy("stoicGuardMetaTitle") }]} />
      <article>
        <header className="privacy-enter" style={{ marginBottom: "2.5rem" }}>
          <p style={eyebrow}>Play Store Privacy Information</p>
          <h1 className="page-title" style={title}>Privacy Policy for Stoic Guard</h1>
          <p style={date}>Last updated: June 13, 2026</p>
        </header>

        <div style={body}>
          <p>
            Stoic Guard does not collect, transmit, or share any personal data. All app usage data is processed entirely on your device and is never sent to any server or third party.
          </p>

          <section className="card">
            <h2 style={h2}>Permissions used</h2>
            <ul style={list}>
              <li>
                <strong style={strong}>Usage Access:</strong> to measure time spent in tracked apps. This data stays on your device.
              </li>
              <li>
                <strong style={strong}>Accessibility Service:</strong> to detect the foreground app and enforce time limits. No input is logged.
              </li>
              <li>
                <strong style={strong}>Post Notifications:</strong> to deliver the Daily Review reminder at your chosen time.
              </li>
              <li>
                <strong style={strong}>Schedule Exact Alarm:</strong> to fire the Daily Review notification at the correct time.
              </li>
            </ul>
          </section>

          <p>
            If you have questions, contact: <a style={link} href="mailto:hello@nereidsystems.com">hello@nereidsystems.com</a>
          </p>
        </div>
      </article>
    </div>
  );
}
