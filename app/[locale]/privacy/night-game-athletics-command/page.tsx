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
    path: "/privacy/night-game-athletics-command",
    title: t("nightGameMetaTitle"),
    description: t("nightGameMetaDescription"),
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

export default async function NightGameAthleticsCommandPrivacyPage({
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
      <Breadcrumb items={[{ label: tCrumb("home"), href: "/" }, { label: tPrivacy("nightGameMetaTitle") }]} />
      <article>
        <header className="privacy-enter" style={{ marginBottom: "2.5rem" }}>
          <p style={eyebrow}>Play Store Privacy Information</p>
          <h1 className="page-title" style={title}>Privacy Policy for Night Game Athletics Command</h1>
          <p style={date}>Effective Date: June 19, 2026 (Draft)</p>
        </header>

        <div style={body}>
          <p>
            Night Game Athletics Command ("we," "our," or "the App") is committed to protecting your privacy. This Privacy Policy explains our practices regarding the collection, use, and disclosure of information when you use our mobile application.
          </p>

          <section className="card">
            <h2 style={h2}>1. Zero Data Collection</h2>
            <p>We believe that your tactical practice plans and team data are yours alone.</p>
            <ul style={{ ...list, marginTop: "1rem" }}>
              <li>
                <strong style={strong}>No Personal Information:</strong> The App does not collect, require, or transmit any personally identifiable information (PII) such as your name, email address, phone number, or location.
              </li>
              <li>
                <strong style={strong}>No Usage Tracking:</strong> We do not use third-party analytics, tracking pixels, or any software designed to monitor your behavior or usage patterns within the App.
              </li>
            </ul>
          </section>

          <section className="card">
            <h2 style={h2}>2. Local Data Storage</h2>
            <p>All data created within the App—including practice schedules, drill details, and custom templates—is stored <strong style={strong}>locally and exclusively</strong> on your mobile device.</p>
            <ul style={{ ...list, marginTop: "1rem" }}>
              <li>
                <strong style={strong}>No Cloud Sync:</strong> We do not host servers or cloud storage for your data in this version of the App.
              </li>
              <li>
                <strong style={strong}>Data Deletion:</strong> If you delete the App or clear its storage cache via your device settings, all your saved practice plans and data will be permanently erased. We cannot recover this data for you as we never have access to it.
              </li>
            </ul>
          </section>

          <section className="card">
            <h2 style={h2}>3. Permissions and Their Use</h2>
            <p>To provide a professional-grade coaching experience, the App requires specific Android permissions:</p>
            <ul style={{ ...list, marginTop: "1rem" }}>
              <li>
                <strong style={strong}>POST_NOTIFICATIONS:</strong> Used solely to alert you when a practice period transitions or a timer ends.
              </li>
              <li>
                <strong style={strong}>FOREGROUND_SERVICE &amp; FOREGROUND_SERVICE_SPECIAL_USE:</strong> Required to ensure the practice timer remains accurate and continues to run if you navigate away from the App, lock your screen, or use other tactical tools during practice. This ensures you never lose track of time in a high-intensity environment.
              </li>
            </ul>
          </section>

          <section className="card">
            <h2 style={h2}>4. Third-Party Services</h2>
            <p>The App does not contain advertisements and does not share any information with third-party service providers.</p>
          </section>

          <section className="card">
            <h2 style={h2}>5. Children&apos;s Privacy</h2>
            <p>Our App is designed for use by sports coaches and athletic staff. It does not knowingly collect any information from children under the age of 13, in compliance with the Children&apos;s Online Privacy Protection Act (COPPA).</p>
          </section>

          <section className="card">
            <h2 style={h2}>6. Security</h2>
            <p>Since all data remains on your physical device, the security of your practice plans depends on the security measures (such as PIN, biometric lock, or encryption) you have enabled on your mobile device.</p>
          </section>

          <section className="card">
            <h2 style={h2}>7. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. Any changes will be reflected in a new version of the App and an updated "Effective Date" at the top of this policy. We encourage you to review this policy periodically.</p>
          </section>

          <section className="card">
            <h2 style={h2}>8. Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy, contact us at:{" "}
              <a
                style={link}
                href="mailto:hello@nereidsystems.com"
              >
                hello@nereidsystems.com
              </a>
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
