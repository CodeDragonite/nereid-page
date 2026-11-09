<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

=== DEV ENVIRONMENT (DOCKER COMPOSE) ===
The app runs ONLY in Docker. Never run `npm`, `npx`, `bun` or `next` on the host:
the host `node_modules` holds macOS binaries and is not what the app uses.

- Files: `compose.yaml` (service `web`, port 3000), `Dockerfile.dev` (Node 24 + bun),
  `docker/dev-entrypoint.sh` (runs `npm ci` only when `package-lock.json` changes).
- Volumes: the repo is bind-mounted at `/app` (edits hot-reload); `node_modules` and
  `.next` live in named volumes (`nereid-page_node_modules`, `nereid-page_next_cache`).
- `.env.local` is loaded automatically if present (never commit it).

| Task | Command |
| --- | --- |
| Start (hot reload, http://localhost:3000) | `docker compose up -d` |
| Logs | `docker compose logs -f web` |
| Tests (bun:test) | `docker compose exec -T web bun test` |
| Type check | `docker compose exec -T web npx tsc --noEmit` |
| Add a dependency | `docker compose exec web npm install <pkg>` (updates package-lock.json) |
| Rebuild image (Dockerfile.dev changed) | `docker compose up -d --build` |
| Stop | `docker compose down` |
| Reset deps/cache | `docker compose down -v && docker compose up -d` |

Before reporting work as done, run the type check and tests through `docker compose exec`.
In the browser, check `/es` and `/en` and both themes (dark default, `.light` class).

=== PROJECT CONVENTIONS ===
- Feature flags: `lib/features.ts`. Disabled routes call `notFound()` and are removed from
  nav, footer and `app/sitemap.ts` (currently: estimator, portfolio).
- Upcoming products: `lib/upcoming.ts` is the single source for `/upcoming` and the homepage
  preview; hide a product with `visible: false`.
- i18n: every user-visible string, including `aria-label`s, goes through next-intl with the
  same keys in `messages/en.json` and `messages/es.json` (es is the default locale).
- Design tokens and shared classes live in `app/globals.css`: `--accent-text`/`--accent2-text`
  for accent-coloured text, `--on-accent` for text on accent fills, `--danger`/`--success`;
  classes `.btn-primary`, `.btn-secondary`, `.card`, `.card-interactive`, `.link-arrow`,
  `.text-link`, `.field`, `.page-title`. No hover via `onMouseEnter` style mutation; hover and
  keyboard focus are handled together in CSS.
- Motion: tokens in `lib/motion.ts` (mirrors `--dur-*`/`--ease-*`). Entrances ≤ 500ms, stagger
  80ms capped at 5 items, never put a framer entrance on the same element as a
  `.card-interactive`/`.btn-*` class (animate a wrapper). Reduced motion is global via
  `components/MotionProvider.tsx`.
- Copy: Nereid is a new studio. No invented stats, client counts, testimonials or experience claims.
<!-- END:nextjs-agent-rules -->

=== PERFORMANCE & SEO ===
- next/image for all images (WebP + AVIF, lazy loading)
- next/font for zero-CLS typography
- Dynamic sitemap.xml + robots.txt (next-sitemap)
- Schema.org JSON-LD: LocalBusiness + Service + WebSite
- Open Graph tags per page (next/head or metadata API)
- Lighthouse target: Performance ≥95, Accessibility ≥95, SEO ≥100
- Preconnect to Vercel analytics, Calendly, form endpoint

=== ACCESSIBILITY (NON-NEGOTIABLE) ===
- Semantic HTML: <header>, <main>, <section>, <nav>, <footer>
- ARIA labels on interactive elements without visible text
- Keyboard navigation: visible focus rings, logical tab order
- Color contrast ≥ 4.5:1 for text (test with axe-core)
- Form inputs: associated labels, error messages with aria-live
- Skip-to-content link