import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { caseStudies } from "@/lib/portfolio";
import { buildAlternates, localeUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [];

  const add = (locale: string, path: string) => {
    pages.push({
      url: localeUrl(locale, path),
      lastModified: new Date(),
      alternates: { languages: buildAlternates(locale, path)!.languages! },
    });
  };

  routing.locales.forEach((locale) => {
    add(locale, "/");
    add(locale, "/contact");
    add(locale, "/services");
    add(locale, "/portfolio");
    add(locale, "/upcoming");
    add(locale, "/privacy/stoic-guard");
    add(locale, "/privacy/stoic-guard/accessibility");
    add(locale, "/privacy/night-game-athletics-command");

    caseStudies.forEach((study) => {
      add(locale, `/portfolio/${study.slug}`);
    });
  });

  return pages;
}
