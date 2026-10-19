/**
 * Single source of truth for outbound contact configuration.
 *
 * A placeholder here is not cosmetic: the booking CTA previously shipped a
 * literal `https://calendly.com/your-username/30min`, so every "book a call"
 * button on the site led to a calendar that does not exist. Missing or
 * placeholder configuration must therefore be *visible*, never silently live.
 */

export const CONTACT_EMAILS = {
  /** Public address shown to visitors (footer, error fallbacks). */
  hello: "hello@nereidsystems.com",
  /** Internal inbox that receives new-inquiry notifications. */
  notify: "nereidsystems@gmail.com",
  /** Verified Resend sender. Replies are routed to `hello` via Reply-To. */
  from: "Nereid Systems <noreply@nereidsystems.com>",
} as const;

/** Values that have historically been committed as placeholders. */
const PLACEHOLDER_FRAGMENTS = [
  "your-username",
  "yourusername",
  "example.com",
  "changeme",
  "placeholder",
];

export type BookingConfig = {
  /** Usable booking URL, or null when unconfigured or still a placeholder. */
  url: string | null;
  /** True when the env var is missing entirely. */
  missing: boolean;
  /** True when the env var is present but still contains a placeholder. */
  placeholder: boolean;
};

/**
 * Resolve the booking URL and report whether it is actually usable.
 *
 * Callers must handle `url === null` explicitly rather than falling back to a
 * generic https://calendly.com that looks like a working link but books nothing.
 */
export function getBookingConfig(): BookingConfig {
  const raw = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() ?? "";

  if (!raw) return { url: null, missing: true, placeholder: false };

  const lowered = raw.toLowerCase();
  if (PLACEHOLDER_FRAGMENTS.some((fragment) => lowered.includes(fragment))) {
    return { url: null, missing: false, placeholder: true };
  }

  return { url: raw, missing: false, placeholder: false };
}

/** True when the booking CTA can be rendered as a real link. */
export function isBookingConfigured(): boolean {
  return getBookingConfig().url !== null;
}

/** Whether GA4 is configured. Analytics is strictly opt-in (constraint C-007). */
export function getAnalyticsId(): string | null {
  const raw = process.env.NEXT_PUBLIC_GA_ID?.trim();
  return raw ? raw : null;
}
