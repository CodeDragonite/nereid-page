/**
 * Typed analytics events.
 *
 * Strictly opt-in (constraint C-007): when NEXT_PUBLIC_GA_ID is unset this is a
 * complete no-op, so no request ever leaves the browser. Every call is safe from
 * server components, from tests, and before the GA script has loaded.
 */

export type AnalyticsEventName =
  | "estimator_started"
  | "estimator_completed"
  | "email_captured"
  | "email_capture_failed"
  | "booking_click"
  | "service_cta_click"
  | "blog_to_service_click";

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type GtagFn = (command: "event", name: string, params?: Record<string, unknown>) => void;

function getGtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  if (!process.env.NEXT_PUBLIC_GA_ID) return null;

  const candidate = (window as unknown as { gtag?: unknown }).gtag;
  return typeof candidate === "function" ? (candidate as GtagFn) : null;
}

/**
 * Record an event. Silently does nothing when analytics is unconfigured or the
 * tag has not loaded yet — a missing analytics call must never break a user flow.
 */
export function trackEvent(name: AnalyticsEventName, params?: AnalyticsParams): void {
  const gtag = getGtag();
  if (!gtag) return;

  try {
    gtag("event", name, params);
  } catch {
    // Analytics is never allowed to surface an error to the visitor.
  }
}
