import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const SITE_URL = "https://nereidsystems.com";

/**
 * Single source of the brand suffix appended to child-route titles.
 * A segment that defines `title` as a bare string resets the stashed template to
 * null for its descendants, so any route-group layout with children that set
 * their own title must re-declare this template.
 */
export const TITLE_TEMPLATE = "%s | Nereid Systems";

export function localeUrl(locale: string, path: string): string {
  return `${SITE_URL}/${locale}${path === "/" ? "" : path}`;
}

export type LanguageAlternates = {
  es: string;
  en: string;
  "x-default": string;
};

export function buildAlternates(
  locale: string,
  path: string,
): { canonical: string; languages: LanguageAlternates } {
  return {
    canonical: localeUrl(locale, path),
    languages: {
      es: localeUrl("es", path),
      en: localeUrl("en", path),
      // x-default points at the default-locale URL directly — never a redirecting URL
      "x-default": localeUrl(routing.defaultLocale, path),
    },
  };
}

export function buildPageMetadata(opts: {
  locale: string;
  /** Locale-relative path, e.g. "/", "/services", "/portfolio/[slug]" */
  path: string;
  /** Bare localized title (the layout template appends the brand), or an absolute title object */
  title: Metadata["title"];
  description: string;
}): Metadata {
  const canonical = localeUrl(opts.locale, opts.path);

  return {
    title: opts.title,
    description: opts.description,
    alternates: buildAlternates(opts.locale, opts.path),
    openGraph: {
      title: typeof opts.title === "string" ? opts.title : undefined,
      description: opts.description,
      url: canonical,
      siteName: "Nereid Systems",
      type: "website",
      locale: opts.locale === "es" ? "es_PA" : "en_US",
      alternateLocale: opts.locale === "es" ? ["en_US"] : ["es_PA"],
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Nereid Systems",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: typeof opts.title === "string" ? opts.title : undefined,
      description: opts.description,
      images: ["/og-image.png"],
    },
  };
}
