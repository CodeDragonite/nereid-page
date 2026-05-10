import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { caseStudies } from "@/lib/portfolio";
import { Breadcrumb } from "@/components/Breadcrumb";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    caseStudies.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return { title: "Case Study | Nereid Systems" };
  return {
    title: `${study.title} | Nereid Systems`,
    description: `${study.challenge.slice(0, 80)} — ${study.outcome.slice(0, 75)}`,
    openGraph: {
      title: `${study.title} | Nereid Systems`,
      description: `${study.challenge} ${study.outcome}`,
      url: `https://nereidsystems.com/${locale}/portfolio/${study.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const study = caseStudies.find((s) => s.slug === slug);
  const t = await getTranslations({ locale, namespace: "CaseStudy" });
  const tB = await getTranslations({ locale, namespace: "Breadcrumb" });

  if (!study) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "5rem 1.5rem" }}>
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1rem" }}>{t("notFoundTag")}</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "var(--text-primary)", marginBottom: "1rem" }}>{t("notFoundHeading")}</h1>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "2rem" }}>{t("notFoundBody")}</p>
          <Link href="/portfolio" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--accent)", color: "#05080f", padding: "12px 22px", borderRadius: "8px", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
            {t("notFoundCta")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", paddingTop: "68px" }}>
      <div style={{ position: "relative", overflow: "hidden", padding: "4rem 1.5rem 3rem", borderBottom: "1px solid var(--border)" }}>
        <div aria-hidden="true" className="hero-gradient" style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.5 }} />
        <div aria-hidden="true" className="grid-overlay" style={{ position: "absolute", inset: 0, zIndex: 1 }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "10%", right: "5%", width: "400px", height: "400px", borderRadius: "50%", background: `radial-gradient(circle, color-mix(in srgb, ${study.color} 8%, transparent) 0%, transparent 70%)`, zIndex: 1, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto" }}>
          <Breadcrumb items={[
            { label: tB("home"), href: "/" },
            { label: tB("portfolio"), href: "/portfolio" },
            { label: study.title },
          ]} />
          <div style={{ marginBottom: "1rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "20px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", background: `color-mix(in srgb, ${study.color} 15%, transparent)`, color: study.color }}>
              <Sparkles size={11} aria-hidden="true" /> {study.category} · {t("badgeLabel")}
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text-primary)", lineHeight: "1.1", letterSpacing: "-0.02em", marginBottom: "1rem", maxWidth: "800px" }}>{study.title}</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>{study.client} · {study.status === "completed" ? t("completed") : t("inProgress")}</p>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>
        <div style={{ background: `color-mix(in srgb, ${study.color} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${study.color} 30%, transparent)`, borderLeft: `3px solid ${study.color}`, borderRadius: "var(--radius-lg)", padding: "1.25rem 1.5rem", marginBottom: "2.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "1.25rem" }}>{t("outcomePrefix")}</span>
          <p style={{ color: study.color, fontWeight: 600, fontSize: "1rem", margin: 0 }}>{study.outcome}</p>
        </div>

        <div style={{ display: "grid", gap: "1.25rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.75rem", position: "relative", overflow: "hidden" }}>
              <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${study.color}, transparent)`, opacity: 0.6 }} />
              <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: study.color, marginBottom: "0.75rem" }}>{t("theChallenge")}</p>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.75", fontSize: "0.95rem" }}>{study.challenge}</p>
            </div>
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.75rem", position: "relative", overflow: "hidden" }}>
              <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, var(--accent), transparent)", opacity: 0.6 }} />
              <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.75rem" }}>{t("ourSolution")}</p>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.75", fontSize: "0.95rem" }}>{study.solution}</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.75rem" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem" }}>{t("techStack")}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {study.tech.map((item) => (
                  <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "20px", border: `1px solid color-mix(in srgb, ${study.color} 30%, transparent)`, background: `color-mix(in srgb, ${study.color} 10%, transparent)`, fontSize: "0.8rem", color: study.color }}>
                    <CheckCircle2 size={12} aria-hidden="true" /> {item}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ background: `color-mix(in srgb, ${study.color} 8%, var(--bg-card))`, border: `1px solid color-mix(in srgb, ${study.color} 25%, transparent)`, borderRadius: "var(--radius-lg)", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: study.color }}>{t("wantSimilar")}</p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: "1.7", flex: 1 }}>{t("wantSimilarBody")}</p>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", background: study.color, color: "#05080f", padding: "12px 20px", borderRadius: "8px", fontWeight: 600, fontSize: "0.875rem", textDecoration: "none", marginTop: "0.5rem" }}>
                {t("wantSimilarCta")} <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
