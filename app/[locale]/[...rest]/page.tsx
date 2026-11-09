import { notFound } from "next/navigation";

/**
 * Catch-all for unknown paths under a locale (e.g. /es/does-not-exist) so they
 * render the localized app/[locale]/not-found.tsx inside the locale layout,
 * instead of the root fallback which has no navbar, footer or translations.
 */
export default function CatchAllPage() {
  notFound();
}
