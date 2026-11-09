/**
 * Route-level feature flags.
 *
 * A disabled route returns 404 (via `notFound()`, which also emits
 * `noindex`) and is removed from navigation, footer and sitemap. The code is
 * kept so a route can be re-enabled by flipping its flag.
 */
export const FEATURES = {
  /** Scope & Price Estimator (/estimator). Off while the studio is starting out. */
  estimator: false,
  /** Case studies (/portfolio, /portfolio/[slug]). Off until real client work is publishable. */
  portfolio: false,
} as const;

export type FeatureName = keyof typeof FEATURES;

export function isEnabled(feature: FeatureName): boolean {
  return FEATURES[feature];
}
