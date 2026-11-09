/**
 * Motion tokens for framer-motion. Mirrors the CSS custom properties in
 * app/globals.css (--dur-*, --ease-*) — keep the two in sync.
 *
 * Rules:
 *  - Entrances: `fadeUp` / `fadeIn`, never longer than DUR.long.
 *  - Stagger: STAGGER per item, capped at MAX_STAGGER_ITEMS (use `staggerDelay`).
 *  - Hover/focus feedback lives in CSS classes (.btn-*, .card-interactive),
 *    not in framer `whileHover`, so keyboard focus gets the same treatment.
 *  - Do not put an entrance animation (which writes inline `transform`) on the
 *    same element as a `.card-interactive` / `.btn-*` class: the inline value
 *    overrides the :hover transform. Animate a wrapper instead.
 *  - Reduced motion is handled globally by <MotionProvider> (MotionConfig
 *    reducedMotion="user"): transform animations are skipped, opacity is kept.
 */

type Bezier = [number, number, number, number];

/** Durations in seconds (framer-motion units). */
export const DUR = {
  micro: 0.12,
  short: 0.2,
  medium: 0.3,
  long: 0.5,
} as const;

export const EASE: Record<"enter" | "exit" | "standard", Bezier> = {
  enter: [0.22, 1, 0.36, 1],
  exit: [0.4, 0, 1, 1],
  standard: [0.4, 0, 0.2, 1],
};

/** Seconds between staggered items. */
export const STAGGER = 0.08;
export const MAX_STAGGER_ITEMS = 5;

/** Reveal travel distance in px. */
export const REVEAL_DISTANCE = 16;

/**
 * Delay for item `index` in a staggered group. Pass `columns` for grids so each
 * row starts from zero instead of accumulating delay down the page.
 */
export function staggerDelay(index: number, columns?: number): number {
  const position = columns ? index % columns : index;
  return Math.min(position, MAX_STAGGER_ITEMS - 1) * STAGGER;
}

export const fadeUp = {
  hidden: { opacity: 0, y: REVEAL_DISTANCE },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DUR.long, ease: EASE.enter, delay },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: DUR.long, ease: EASE.enter, delay },
  }),
};

/** Parent variant that staggers `fadeUpChild` children. */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER, delayChildren: STAGGER },
  },
};

/** Child variant for use inside `staggerContainer` (no custom delay). */
export const fadeUpChild = {
  hidden: { opacity: 0, y: REVEAL_DISTANCE },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.long, ease: EASE.enter } },
};

/** Content swap (tabs, success states): quick exit, slightly longer enter. */
export const crossfade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: DUR.short, ease: EASE.enter } },
  exit: { opacity: 0, transition: { duration: DUR.micro, ease: EASE.exit } },
};

/** Panels / menus that open and close. */
export const panel = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0, transition: { duration: DUR.short, ease: EASE.enter } },
  exit: { opacity: 0, y: -8, transition: { duration: DUR.micro, ease: EASE.exit } },
};

/** Success / confirmation states. */
export const popIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1, transition: { duration: DUR.medium, ease: EASE.enter } },
};

/** Shared `viewport` options for whileInView / useInView reveals. */
export const VIEWPORT = { once: true, margin: "-60px" } as const;
