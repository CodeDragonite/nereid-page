/**
 * Bounded in-memory sliding-window rate limiter.
 *
 * Deliberately minimal. It stops casual form abuse on a single server instance
 * and nothing more: state is per-process and resets on cold start. That tradeoff
 * is accepted rather than hidden — see FR-003. Swap in shared storage only when
 * abuse is actually observed.
 */

export type RateLimitOptions = {
  /** Max requests permitted inside the window. */
  limit?: number;
  /** Window length in milliseconds. */
  windowMs?: number;
  /** Injectable clock, so tests do not depend on wall time. */
  now?: number;
};

export type RateLimitResult = {
  allowed: boolean;
  /** Requests still available in the current window. */
  remaining: number;
  /** Milliseconds until the oldest hit leaves the window. Zero when allowed. */
  retryAfterMs: number;
};

const buckets = new Map<string, number[]>();

const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_MS = 10 * 60 * 1000;

export function checkRateLimit(key: string, options: RateLimitOptions = {}): RateLimitResult {
  const limit = options.limit ?? DEFAULT_LIMIT;
  const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS;
  const now = options.now ?? Date.now();

  const cutoff = now - windowMs;
  const recent = (buckets.get(key) ?? []).filter((ts) => ts > cutoff);

  if (recent.length >= limit) {
    const oldest = recent[0];
    buckets.set(key, recent);
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: Math.max(0, oldest + windowMs - now),
    };
  }

  recent.push(now);
  buckets.set(key, recent);

  return {
    allowed: true,
    remaining: Math.max(0, limit - recent.length),
    retryAfterMs: 0,
  };
}

/** Clear all buckets. Test-only helper. */
export function resetRateLimits(): void {
  buckets.clear();
}

/**
 * Best-effort client identifier from proxy headers.
 *
 * Cloudflare sets `cf-connecting-ip`; other proxies use `x-forwarded-for`.
 * An unresolvable client shares the `"unknown"` bucket, which is acceptable
 * because the limiter is abuse friction, not a security control.
 */
export function clientKeyFromHeaders(headers: Headers): string {
  const cf = headers.get("cf-connecting-ip");
  if (cf) return cf.trim();

  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0];
    if (first) return first.trim();
  }

  return headers.get("x-real-ip")?.trim() || "unknown";
}
