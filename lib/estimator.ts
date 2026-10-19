/**
 * Scope & Price Estimator — logic only.
 *
 * Honesty constraints (D-003 / SC-012):
 *  - This always returns a RANGE. There is no code path that produces a single
 *    figure, because a single figure reads as a binding quote.
 *  - The range is derived from the *published starting prices* already shown on
 *    the site, widened by the scope drivers the visitor selects.
 *  - Question and option copy lives in the `Estimator` message namespace; this
 *    module holds identifiers and weights only, so both locales share one model.
 */

export const SERVICE_IDS = ["network", "web", "mobile", "integration", "ai", "it"] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

/** Published starting prices, mirroring the `Services` message namespace. */
const BASE_PRICE: Record<ServiceId, number> = {
  network: 2500,
  web: 8000,
  mobile: 12000,
  integration: 4000,
  ai: 6000,
  it: 800,
};

/** `it` is a retainer; everything else is a one-time project. */
const CADENCE: Record<ServiceId, "one-time" | "monthly"> = {
  network: "one-time",
  web: "one-time",
  mobile: "one-time",
  integration: "one-time",
  ai: "one-time",
  it: "monthly",
};

/** Each unit of driver weight widens the upper bound by this fraction. */
const WIDEN_PER_WEIGHT = 0.18;

/** Ceilings keep the range believable instead of runaway. */
const MAX_MULTIPLIER: Record<"one-time" | "monthly", number> = {
  "one-time": 3.5,
  monthly: 2.5,
};

/** Applied when every selected option is the smallest one, so a range still exists. */
const MIN_SPREAD = 1.2;

export type EstimatorOption = {
  id: string;
  /** 0 = smallest scope, 2 = largest. Drives the upper bound only. */
  weight: number;
};

export type EstimatorQuestion = {
  id: string;
  options: EstimatorOption[];
};

const Q = (id: string, weights = [0, 1, 2]): EstimatorQuestion => ({
  id,
  options: weights.map((weight, index) => ({ id: `o${index}`, weight })),
});

/** Four scope drivers per service. Ids map to `Estimator.questions.<service>.<id>`. */
export const QUESTIONS: Record<ServiceId, EstimatorQuestion[]> = {
  network: [Q("size"), Q("sites"), Q("cabling"), Q("wifi")],
  web: [Q("features"), Q("users"), Q("integrations"), Q("timeline")],
  mobile: [Q("platforms"), Q("features"), Q("backend"), Q("timeline")],
  integration: [Q("systems"), Q("direction"), Q("volume"), Q("legacy")],
  ai: [Q("processes"), Q("documents"), Q("systems"), Q("monitoring")],
  it: [Q("seats"), Q("sites"), Q("hours"), Q("compliance")],
};

export type Estimate = {
  serviceId: ServiceId;
  currency: "USD";
  cadence: "one-time" | "monthly";
  /** Lower bound. Always the published starting price. */
  low: number;
  /** Upper bound. Always strictly greater than `low`. */
  high: number;
  /** Selected drivers, heaviest first — used to explain why the range is wide. */
  drivers: { questionId: string; optionId: string; weight: number }[];
  /**
   * Always true. Present so the UI cannot present a range as a quote without
   * having to explicitly ignore this flag.
   */
  indicative: true;
};

function roundNice(value: number): number {
  if (value >= 1000) return Math.round(value / 100) * 100;
  return Math.round(value / 50) * 50;
}

/**
 * Compute an indicative range.
 *
 * Unanswered questions are ignored rather than defaulted, so an incomplete form
 * still yields the narrowest honest range.
 */
export function estimate(
  serviceId: ServiceId,
  answers: Partial<Record<string, string>>,
): Estimate {
  const base = BASE_PRICE[serviceId];
  const cadence = CADENCE[serviceId];

  const drivers: Estimate["drivers"] = [];
  let totalWeight = 0;

  for (const question of QUESTIONS[serviceId]) {
    const chosen = answers[question.id];
    if (!chosen) continue;

    const option = question.options.find((o) => o.id === chosen);
    if (!option) continue;

    totalWeight += option.weight;
    if (option.weight > 0) {
      drivers.push({ questionId: question.id, optionId: option.id, weight: option.weight });
    }
  }

  const multiplier = Math.min(1 + totalWeight * WIDEN_PER_WEIGHT, MAX_MULTIPLIER[cadence]);

  const low = roundNice(base);
  const high = roundNice(base * Math.max(multiplier, MIN_SPREAD));

  drivers.sort((a, b) => b.weight - a.weight);

  return {
    serviceId,
    currency: "USD",
    cadence,
    low,
    high: Math.max(high, high === low ? roundNice(low * MIN_SPREAD) : high),
    drivers,
    indicative: true,
  };
}

export function isServiceId(value: string): value is ServiceId {
  return (SERVICE_IDS as readonly string[]).includes(value);
}

/** Percentages are cosmetic only; they explain drivers, they are not prices. */
export function driverShare(estimate: Estimate): { questionId: string; share: number }[] {
  const total = estimate.drivers.reduce((sum, d) => sum + d.weight, 0);
  if (total === 0) return [];
  return estimate.drivers.map((d) => ({ questionId: d.questionId, share: Math.round((d.weight / total) * 100) }));
}
