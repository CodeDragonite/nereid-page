import { Heart, Shield, Zap, type LucideIcon } from "lucide-react";

/**
 * Single source of truth for the products shown on /upcoming and in the
 * homepage UpcomingPreview, so both surfaces show the same colours, icons,
 * phases and links.
 *
 * Copy lives in the `Upcoming` message namespace under `<key>.*`.
 * Colours are CSS custom properties: use `color` for fills/tints and
 * `colorText` for text and icons (AA-safe in both themes).
 */
export type UpcomingProject = {
  key: "medrating" | "football" | "stoic";
  category: "healthcare" | "sports" | "wellbeing";
  icon: LucideIcon;
  color: string;
  colorText: string;
  timeline: string;
  phaseKey: "live" | "planningPhase" | "designPhase";
  ctaKey: "visitSite" | "joinNetwork" | "requestAccess";
  ctaUrl: string;
  tech: string[];
  featureCount: number;
  /** Hidden projects are not rendered anywhere (privacy pages are unaffected). */
  visible: boolean;
};

const allProjects: UpcomingProject[] = [
  {
    key: "medrating",
    category: "healthcare",
    icon: Heart,
    color: "var(--accent)",
    colorText: "var(--accent-text)",
    timeline: "2026",
    phaseKey: "live",
    ctaKey: "visitSite",
    ctaUrl: "https://medpanama.com",
    tech: ["Elixir", "Phoenix LiveView", "PostgreSQL", "Apache Airflow", "Fly.io"],
    featureCount: 5,
    visible: true,
  },
  {
    key: "football",
    category: "sports",
    icon: Zap,
    color: "var(--accent2)",
    colorText: "var(--accent2-text)",
    timeline: "Q4 2026",
    phaseKey: "planningPhase",
    ctaKey: "joinNetwork",
    ctaUrl: "/contact?project=football-analyzer",
    tech: ["Python", "TensorFlow", "React", "D3.js", "AWS"],
    featureCount: 5,
    visible: true,
  },
  {
    // Hidden: just starting. Privacy pages under /privacy/stoic-guard stay live
    // because the app store listing links to them.
    key: "stoic",
    category: "wellbeing",
    icon: Shield,
    color: "var(--accent2)",
    colorText: "var(--accent2-text)",
    timeline: "Q3 2026",
    phaseKey: "designPhase",
    ctaKey: "requestAccess",
    ctaUrl: "/contact?project=stoic-guard",
    tech: ["Android", "Kotlin", "Jetpack Compose", "Room", "Hilt"],
    featureCount: 5,
    visible: false,
  },
];

export const upcomingProjects = allProjects.filter((p) => p.visible);
