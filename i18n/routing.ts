import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  // Disable next-intl's `Link:` HTTP header emission — the <head> hreflang
  // cluster (see lib/seo.ts buildAlternates) is the single source of truth,
  // so head tags and headers can never diverge.
  alternateLinks: false,
});
