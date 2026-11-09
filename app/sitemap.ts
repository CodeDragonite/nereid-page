import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { caseStudies } from "@/lib/portfolio";
import { isEnabled } from "@/lib/features";
import { buildAlternates, localeUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // FR-029: no `lastModified` here. Stamping the build time on every URL is a
  // false freshness signal, and we hold no real per-URL modification date, so we
  // omit the field rather than emit one we cannot stand behind.
  const staticPaths = [
    "/",
    "/contact",
    "/services",
    ...(isEnabled("estimator") ? ["/estimator"] : []),
    ...(isEnabled("portfolio") ? ["/portfolio"] : []),
    "/upcoming",
    "/privacy/stoic-guard",
    "/privacy/stoic-guard/accessibility",
    "/privacy/night-game-athletics-command",
  ];

  const paths = [
    ...staticPaths,
    ...(isEnabled("portfolio") ? caseStudies.map((study) => `/portfolio/${study.slug}`) : []),
  ];

  const seen = new Set<string>();
  const pages: MetadataRoute.Sitemap = [];

  routing.locales.forEach((locale) => {
    paths.forEach((path) => {
      const url = localeUrl(locale, path);
      if (seen.has(url)) return;
      seen.add(url);

      pages.push({
        url,
        alternates: { languages: buildAlternates(locale, path)!.languages! },
      });
    });
  });

  return pages;
}
