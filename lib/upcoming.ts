export type UpcomingProject = {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
  tech: string[];
  timeline: string;
  phase: string;
  category: string;
  color: string;
  ctaText: string;
  ctaUrl: string;
};

export const upcomingProjects: UpcomingProject[] = [
  {
    id: "medrating-panama",
    title: "MedRating Panama",
    slug: "medrating-panama",
    description:
      "A comprehensive medical rating and review platform for healthcare providers in Panama. Features AI-powered sentiment analysis, patient feedback aggregation, and provider performance metrics.",
    features: [
      "Provider search and filtering",
      "AI-powered review analysis",
      "Patient satisfaction scoring",
      "Real-time availability checking",
      "Multi-language support (Spanish/English)",
    ],
    tech: ["Next.js", "TypeScript", "AI/ML", "PostgreSQL", "Mapbox"],
    timeline: "Q3 2026",
    phase: "In Development",
    category: "healthcare",
    color: "#34d399",
    ctaText: "Request Early Access",
    ctaUrl: "/contact?project=medrating-panama",
  },
  {
    id: "football-analyzer-scout",
    title: "Football Analyzer & Scout",
    slug: "football-analyzer-scout",
    description:
      "AI-driven football talent scouting platform that analyzes player performance data, provides predictive analytics, and helps scouts identify emerging talent.",
    features: [
      "Player performance tracking",
      "Predictive career trajectory modeling",
      "Video analysis with AI annotations",
      "Scouting report generation",
      "Team formation optimization",
    ],
    tech: ["Python", "TensorFlow", "React", "D3.js", "AWS"],
    timeline: "Q4 2026",
    phase: "Planning Phase",
    category: "sports",
    color: "#fb923c",
    ctaText: "Join Scout Network",
    ctaUrl: "/contact?project=football-analyzer",
  },
];
