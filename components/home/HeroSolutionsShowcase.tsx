"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, useEffect, useId, useRef, type KeyboardEvent } from "react";
import { Globe, Bot, Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { crossfade } from "@/lib/motion";

type TabId = "software" | "ai" | "infrastructure";

const TAB_ORDER: TabId[] = ["software", "ai", "infrastructure"];
const AUTO_CYCLE_MS = 8000;
const AUTO_CYCLE_START_MS = 1000;

export function HeroSolutionsShowcase() {
  const t = useTranslations("HeroSolutions");
  const [activeTab, setActiveTab] = useState<TabId>("software");
  const reduced = useReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({
    software: null,
    ai: null,
    infrastructure: null,
  });

  // Auto-cycle state: starts ~1s after mount, pauses while the pointer is over
  // the card or focus is inside it, and stops for good once the user picks a tab.
  const [cycleReady, setCycleReady] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [userTookControl, setUserTookControl] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setCycleReady(true), AUTO_CYCLE_START_MS);
    return () => clearTimeout(timeout);
  }, []);

  const cycling = cycleReady && !reduced && !hovered && !focusWithin && !userTookControl;

  useEffect(() => {
    if (!cycling) return;
    const interval = setInterval(() => {
      setActiveTab((curr) => TAB_ORDER[(TAB_ORDER.indexOf(curr) + 1) % TAB_ORDER.length]);
    }, AUTO_CYCLE_MS);
    return () => clearInterval(interval);
  }, [cycling]);

  const selectTab = (id: TabId, moveFocus: boolean) => {
    setUserTookControl(true);
    setActiveTab(id);
    if (moveFocus) tabRefs.current[id]?.focus();
  };

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const index = TAB_ORDER.indexOf(activeTab);
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (index + 1) % TAB_ORDER.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + TAB_ORDER.length) % TAB_ORDER.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TAB_ORDER.length - 1;
    if (next === null) return;
    e.preventDefault();
    selectTab(TAB_ORDER[next], true);
  };

  const tabId = (id: TabId) => `${baseId}-tab-${id}`;
  const panelId = `${baseId}-panel`;

  const tabsConfig = [
    {
      id: "software" as const,
      label: t("tabSoftware"),
      icon: Globe,
      headline: t("softwareHeadline"),
      tagline: t("softwareTagline"),
      accentColor: "var(--accent)",
      accentText: "var(--accent-text)",
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
      accentText: "var(--accent2-text)",
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
      // No purple token exists yet; same hue for fill and text.
      accentColor: "#a78bfa",
      accentText: "#a78bfa",
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
          transition: "background var(--dur-medium) var(--ease-standard)",
          zIndex: 0,
        }}
      />

      {/* Main Glass Showcase Card */}
      <div
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setFocusWithin(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false);
        }}
        style={{
          position: "relative",
          zIndex: 2,
          background:
            "linear-gradient(145deg, color-mix(in srgb, var(--bg-surface) 92%, transparent) 0%, color-mix(in srgb, var(--bg-base) 96%, transparent) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.36), 0 0 20px rgba(0,210,210,0.06)",
          overflow: "hidden",
        }}
      >
        {/* Top Accent Strip */}
        <div
          aria-hidden="true"
          style={{
            height: "2px",
            width: "100%",
            background: `linear-gradient(90deg, ${current.accentColor}, transparent)`,
            transition: "background var(--dur-medium) var(--ease-standard)",
          }}
        />

        {/* Browser / App Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 18px",
            borderBottom: "1px solid var(--border)",
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span aria-hidden="true" style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
            <span aria-hidden="true" style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
            <span aria-hidden="true" style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
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
              background: "var(--accent-dim)",
              fontSize: "10px",
              fontWeight: "600",
              color: "var(--accent-text)",
            }}
          >
            <span aria-hidden="true" style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
            {t("productionReady")}
          </div>
        </div>

        {/* Tab Selector */}
        <div style={{ padding: "16px 18px 0" }}>
          <div
            role="tablist"
            aria-label={t("tablistLabel")}
            style={{
              display: "flex",
              gap: "6px",
              background: "rgba(0,0,0,0.3)",
              padding: "4px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
            }}
          >
            {tabsConfig.map((tab) => {
              const isSelected = activeTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[tab.id] = el;
                  }}
                  id={tabId(tab.id)}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={panelId}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => selectTab(tab.id, false)}
                  onKeyDown={handleTabKeyDown}
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
                    transition:
                      "color var(--dur-micro) var(--ease-standard), background-color var(--dur-micro) var(--ease-standard)",
                    boxShadow: isSelected ? "0 2px 8px rgba(0,0,0,0.3)" : "none",
                  }}
                >
                  <TabIcon size={14} aria-hidden="true" style={{ color: isSelected ? tab.accentText : "inherit" }} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Tab Content Display */}
        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={tabId(activeTab)}
          style={{ padding: "18px" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              variants={crossfade}
              initial="initial"
              animate="animate"
              exit="exit"
            >
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
                    aria-hidden="true"
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
                    <Icon size={16} style={{ color: current.accentText }} />
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
                      border: "1px solid var(--border)",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                      {m.label}
                    </div>
                    <div style={{ fontSize: "1.15rem", fontWeight: "700", color: current.accentText, fontFamily: "var(--font-sans)", lineHeight: 1.2 }}>
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
                  background: "color-mix(in srgb, var(--bg-base) 60%, transparent)",
                  borderRadius: "10px",
                  padding: "12px 14px",
                  border: "1px solid var(--border)",
                  marginBottom: "1.25rem",
                }}
              >
                <div style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
                  {t("whatWeDeliver")}
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: "6px", listStyle: "none", margin: 0, padding: 0 }}>
                  {current.deliverables.map((item, idx) => (
                    <li key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "var(--text-primary)" }}>
                      <CheckCircle2 size={13} aria-hidden="true" style={{ color: current.accentText, flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action Link to Services (outside the crossfade: it doesn't change per tab) */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
              {t("scopesNotice")}
            </span>
            <Link href="/services" className="link-arrow" style={{ fontSize: "0.82rem" }}>
              {t("exploreServices")} <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
