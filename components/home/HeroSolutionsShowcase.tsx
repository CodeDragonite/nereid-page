"use client";
import { useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { Globe, Bot, Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type TabId = "software" | "ai" | "infrastructure";

export function HeroSolutionsShowcase() {
  const t = useTranslations("HeroSolutions");
  const [activeTab, setActiveTab] = useState<TabId>("software");
  const reduced = useReducedMotion();

  // Gentle auto-cycle every 8s if user hasn't interacted
  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setActiveTab((curr) => {
        if (curr === "software") return "ai";
        if (curr === "ai") return "infrastructure";
        return "software";
      });
    }, 8000);
    return () => clearInterval(interval);
  }, [reduced]);

  const tabsConfig = [
    {
      id: "software" as const,
      label: t("tabSoftware"),
      icon: Globe,
      headline: t("softwareHeadline"),
      tagline: t("softwareTagline"),
      accentColor: "var(--accent)",
      metrics: [
        { label: t("metricPerformance"), value: "98+", detail: t("metricPerformanceDetail") },
        { label: t("metricArchitecture"), value: "Next.js", detail: t("metricArchitectureDetail") },
        { label: t("metricExperience"), value: "<100ms", detail: t("metricExperienceDetail") },
      ],
      deliverables: [t("softwareD1"), t("softwareD2"), t("softwareD3")],
    },
    {
      id: "ai" as const,
      label: t("tabAi"),
      icon: Bot,
      headline: t("aiHeadline"),
      tagline: t("aiTagline"),
      accentColor: "var(--accent2)",
      metrics: [
        { label: t("metricTimeSaved"), value: "80%", detail: t("metricTimeSavedDetail") },
        { label: t("metricIntegration"), value: "Custom", detail: t("metricIntegrationDetail") },
        { label: t("metricAccuracy"), value: "Enterprise", detail: t("metricAccuracyDetail") },
      ],
      deliverables: [t("aiD1"), t("aiD2"), t("aiD3")],
    },
    {
      id: "infrastructure" as const,
      label: t("tabInfra"),
      icon: Shield,
      headline: t("infraHeadline"),
      tagline: t("infraTagline"),
      accentColor: "#a78bfa",
      metrics: [
        { label: t("metricUptime"), value: "99.9%", detail: t("metricUptimeDetail") },
        { label: t("metricSecurity"), value: "24/7", detail: t("metricSecurityDetail") },
        { label: t("metricSupport"), value: "1 Vendor", detail: t("metricSupportDetail") },
      ],
      deliverables: [t("infraD1"), t("infraD2"), t("infraD3")],
    },
  ];

  const current = tabsConfig.find((tab) => tab.id === activeTab) || tabsConfig[0];
  const Icon = current.icon;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "540px",
        margin: "0 auto",
      }}
    >
      {/* Outer ambient blur aura */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-12px",
          borderRadius: "28px",
          background: `radial-gradient(circle at center, color-mix(in srgb, ${current.accentColor} 18%, transparent) 0%, transparent 70%)`,
          filter: "blur(24px)",
          pointerEvents: "none",
          transition: "background 0.5s ease",
          zIndex: 0,
        }}
      />

      {/* Main Glass Showcase Card */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          background: "linear-gradient(145deg, rgba(13,34,56,0.92) 0%, rgba(7,27,43,0.96) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.36), 0 0 20px rgba(0,210,210,0.06)",
          overflow: "hidden",
          transition: "border-color 0.3s ease",
        }}
      >
        {/* Top Accent Strip */}
        <div
          aria-hidden="true"
          style={{
            height: "2px",
            width: "100%",
            background: `linear-gradient(90deg, ${current.accentColor}, transparent)`,
            transition: "background 0.5s ease",
          }}
        />

        {/* Browser / App Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
            <span style={{ fontSize: "11px", color: "var(--text-muted)", marginLeft: "6px", fontFamily: "monospace" }}>
              {t("windowPath")}
            </span>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "2px 8px",
              borderRadius: "10px",
              background: "rgba(0,212,170,0.12)",
              fontSize: "10px",
              fontWeight: "600",
              color: "var(--accent)",
            }}
          >
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
            {t("productionReady")}
          </div>
        </div>

        {/* Tab Selector */}
        <div style={{ padding: "16px 18px 0" }}>
          <div
            role="tablist"
            aria-label="Nereid Systems Services"
            style={{
              display: "flex",
              gap: "6px",
              background: "rgba(0,0,0,0.3)",
              padding: "4px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {tabsConfig.map((tab) => {
              const isSelected = activeTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    padding: "8px 10px",
                    borderRadius: "7px",
                    border: "none",
                    background: isSelected ? "var(--bg-card-hover)" : "transparent",
                    color: isSelected ? "var(--text-primary)" : "var(--text-muted)",
                    fontSize: "0.8rem",
                    fontWeight: isSelected ? 600 : 500,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: isSelected ? "0 2px 8px rgba(0,0,0,0.3)" : "none",
                  }}
                >
                  <TabIcon size={14} style={{ color: isSelected ? tab.accentColor : "inherit" }} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Tab Content Display */}
        <div style={{ padding: "18px" }}>
          {/* Service Headline & Value Prop */}
          <div style={{ marginBottom: "1.25rem" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: "var(--text-primary)",
                marginBottom: "0.35rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "7px",
                  background: `color-mix(in srgb, ${current.accentColor} 15%, transparent)`,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={16} style={{ color: current.accentColor }} />
              </span>
              {current.headline}
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.55", margin: 0 }}>
              {current.tagline}
            </p>
          </div>

          {/* Tangible Metrics & Capabilities Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
              marginBottom: "1.25rem",
            }}
          >
            {current.metrics.map((m, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(0,0,0,0.22)",
                  padding: "12px 10px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                  {m.label}
                </div>
                <div style={{ fontSize: "1.15rem", fontWeight: "700", color: current.accentColor, fontFamily: "var(--font-sans)", lineHeight: 1.2 }}>
                  {m.value}
                </div>
                <div style={{ fontSize: "9px", color: "var(--text-secondary)", marginTop: "4px", lineHeight: 1.3 }}>
                  {m.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Deliverables Checklist */}
          <div
            style={{
              background: "rgba(4, 14, 24, 0.6)",
              borderRadius: "10px",
              padding: "12px 14px",
              border: "1px solid rgba(255,255,255,0.05)",
              marginBottom: "1.25rem",
            }}
          >
            <div style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
              {t("whatWeDeliver")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {current.deliverables.map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "var(--text-primary)" }}>
                  <CheckCircle2 size={13} style={{ color: current.accentColor }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Link to Services */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              {t("scopesNotice")}
            </span>
            <Link
              href="/services"
              style={{
                fontSize: "0.82rem",
                fontWeight: "600",
                color: current.accentColor,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                transition: "gap 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = "8px"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = "5px"; }}
            >
              {t("exploreServices")} <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
