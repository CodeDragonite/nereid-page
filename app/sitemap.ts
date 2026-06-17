import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { caseStudies } from "@/lib/portfolio";

const baseUrl = "https://nereidsystems.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [];

  routing.locales.forEach((locale) => {
    pages.push({ url: `${baseUrl}/${locale}/`, lastModified: new Date() });
    pages.push({ url: `${baseUrl}/${locale}/contact`, lastModified: new Date() });
    pages.push({ url: `${baseUrl}/${locale}/services`, lastModified: new Date() });
    pages.push({ url: `${baseUrl}/${locale}/portfolio`, lastModified: new Date() });
    pages.push({ url: `${baseUrl}/${locale}/upcoming`, lastModified: new Date() });
    pages.push({ url: `${baseUrl}/${locale}/privacy/stoic-guard`, lastModified: new Date() });
    pages.push({ url: `${baseUrl}/${locale}/privacy/stoic-guard/accessibility`, lastModified: new Date() });

    caseStudies.forEach((study) => {
      pages.push({ url: `${baseUrl}/${locale}/portfolio/${study.slug}`, lastModified: new Date() });
    });
  });

  return pages;
}
