PROJECT: nereidsystems.com - Marketing & Lead Generation Site
STACK: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
DEPLOY: Cloudflare (via OpenNext)
GOAL: Convert visitors into consultation bookings for a dev shop offering: network infra, web/apps/mobile dev, systems integration, AI automation, IT management.

=== CORE PAGES ===
1. / (Home)
   - Hero: "We Build What's Next" + subhead + dual CTAs (Consultation / View Work)
   - Value props grid (6 services with icons)
   - Social proof: "Trusted by" logos (placeholder)
   - Mini-portfolio preview (3 projects with hover reveal)
   - Final CTA section + email capture

2. /services
   - 6 service cards, each with:
     • Icon + title + 1-sentence outcome
     • Expandable details (accordion or modal)
     • "Get a quote" CTA per service
   - Services: 
     a) Network Installation & Configuration
     b) Web Application Development
     c) Mobile App Development (iOS/Android)
     d) Systems Integration (legacy + modern)
     e) AI Automation Workflows
     f) IT Management for SMBs (mail, infra, security)

3. /portfolio
   - Grid of 3-4 projects (even if WIP: label "Case Study Coming Soon")
   - Each card: Thumbnail, client type, challenge, result (metric if possible)
   - Click → case study page (problem → solution → tech stack → outcome)
   - Add real case study pages for each project so link clicks do not dead-end

4. /upcoming
   - Showcase upcoming products like MedRating Panama and Football Analyzer & Scout
   - Each card: overview, timeline, tech stack, "Notify Me When Live" CTA
   - Add newsletter/signup capture for project updates

5. /about
   - Team intro (photos optional), philosophy, differentiators
   - "Why Nereid?" section: reliability, communication, outcome-focused
   - Tech stack badges (Next.js, React, Python, DO, Railway, Fly.io, etc.)
   - Add subtle nautical/"sea nymph" styling to avoid generic AI page look

5. /contact
   - Calendly embed (free tier) for 15-min discovery calls
   - Simple form (name, email, company, service interest, message)
   - Direct email: hello@nereidsystems.com
   - Response time promise: "We reply within 24 business hours"

6. Legal: /privacy, /terms, cookie consent banner (use react-cookie-consent)

=== DESIGN SYSTEM ===
- Theme: Oceanic/Nautical inspired by "Nereid" (sea nymph) - deep blues, flowing waves, exploration motifs. Differentiate from generic AI pages with marine aesthetics, reliability focus, and subtle depth effects.
- Colors: 
  --background: #0a1929 (deep sea dark) / #f0f8ff (light ocean)
  --foreground: #f8fafc (dark) / #0f172a (light)
  --accent: #006994 (deep sea blue) / #00d4aa (teal wave)
  --muted: #64748b (storm cloud)
  --surface: #1e293b (abyss) / #e2e8f0 (foam)
- Typography: Geist Sans with "Wave" variant for headings (subtle text-shadow for depth), fallback system stack
- Spacing: 8px baseline grid with "tidal" rhythm (multiples of 16px for flow)
- Breakpoints: mobile-first, max-width container at 1200px with "wave" curves
- Dark/light mode toggle (persist via localStorage) - represent as "surface/deep dive"
- Unique Elements: Wave animations, floating particles, 3D card transforms for "submerged" effect, progress "depth meter" on scroll

=== ANIMATIONS (Framer Motion) ===
✅ DO:
- Hero text: fade + slide up on load (stagger children)
- Service cards: subtle scale + shadow on hover
- Scroll-triggered fade-ins for sections (threshold 0.1)
- Button hover: background shift + slight lift (translateY -2px)
- Loading: skeleton screens for dynamic content
- Respect prefers-reduced-motion media query

❌ DON'T:
- Auto-playing video backgrounds (performance + accessibility)
- Parallax scrolling on mobile
- Complex 3D transforms without fallback
- Animations that delay content visibility

=== PERFORMANCE & SEO ===
- next/image for all images (WebP + AVIF, lazy loading)
- next/font for zero-CLS typography
- Dynamic sitemap.xml + robots.txt (next-sitemap)
- Schema.org JSON-LD: LocalBusiness + Service + WebSite
- Open Graph tags per page (next/head or metadata API)
- Lighthouse target: Performance ≥95, Accessibility ≥95, SEO ≥100
- Preconnect to Cloudflare analytics, Calendly, form endpoint

=== ACCESSIBILITY (NON-NEGOTIABLE) ===
- Semantic HTML: <header>, <main>, <section>, <nav>, <footer>
- ARIA labels on interactive elements without visible text
- Keyboard navigation: visible focus rings, logical tab order
- Color contrast ≥ 4.5:1 for text (test with axe-core)
- Form inputs: associated labels, error messages with aria-live
- Skip-to-content link

=== CLOUDFLARE CONFIGURATION ===
Headers in open-next.config.ts:
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' https://assets.cloudflare.com https://analytics.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' https:; connect-src 'self' https://*.cloudflare.com https://*.nereidsystems.com;"
}

Redirects/Rewrites: Handled in open-next.config.ts or middleware.ts
Environment Variables: Set via wrangler secrets or wrangler.jsonc vars

=== ENVIRONMENT VARIABLES (Cloudflare Dashboard or wrangler) ===
NEXT_PUBLIC_SITE_URL=https://nereidsystems.com
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/nereidsystems/15min
CONTACT_FORM_ENDPOINT=https://your-backend.com/webhook
ANALYTICS_ID=your_plausible_or_umami_id
RESEND_API_KEY=your_resend_key (for email)

=== FORM HANDLING (No Backend Required) ===
Option A (Simplest): Use Formspree / Web3Forms free tier
Option B (More control): Serverless function at /api/contact with:
- Rate limiting (upstash/ratelimit or simple IP check)
- Sanitization (DOMPurify server-side)
- Email via Resend (free 100/day) or SendGrid

=== ANALYTICS & TRACKING ===
- Cloudflare Web Analytics (free) or Plausible.io (privacy-friendly, $9/mo) OR Umami (self-hosted free)
- Track: page views, CTA clicks, form submissions, Calendly bookings
- Cloudflare Speed Insights + Web Analytics (free, enable in dashboard)

=== LAUNCH CHECKLIST ===
[ ] Run next build && next start locally, test all links/forms
[ ] Lighthouse audit (desktop + mobile), fix any <90 scores
[ ] axe-core accessibility scan, fix critical issues
[ ] Test dark/light mode toggle persistence
[ ] Verify mobile responsiveness (320px → 1440px)
[ ] Submit sitemap to Google Search Console + Bing Webmaster Tools
[ ] Set up custom domain + HTTPS on Cloudflare
[ ] Enable password protection on preview deployments (Cloudflare setting)
[ ] Create /404 and /500 custom pages (branded, helpful)

=== POST-LAUNCH ===
- Monitor Cloudflare Analytics for 404s, slow pages
- Set up cron job (Vercel or Railway) to ping /api/health hourly
- Backup strategy: GitHub repo + Vercel project export monthly




Plan to Automate the Dev Shop (with AI Agent)
Goal: Agent that answers questions, generates quotes, prospects MVPs + demos.

Architecture
Frontend chat – Intercom-like widget with LLM (GPT-4o or Claude 3.5 Sonnet)

Backend agent – LangChain + RAG over past project specs, hourly rates, component library costs

Quote engine – User describes idea → agent extracts features, estimates complexity (S/M/L), multiplies by base rate → outputs PDF quote

MVP generation – Agent calls an internal template generator (Phoenix + LiveView boilerplate with CRUD) + Tailwind UI blocks → deploys preview to preview.yourdevshop.com/project-slug

Demo generation – Agent uses Playwright to record a 30s Loom-style video of the generated preview → sends link

Prospect flow
Prospect submits idea (text + optional Figma link)

Agent replies within 2 minutes with:

Feasibility score (1–10)

Ballpark price (3 tiers: Basic MVP / Pro / Enterprise)

Link to an auto-generated clickable prototype (using v0.dev or similar + your templates)

Option to “Generate full demo video” – then runs Playwright + ElevenLabs voiceover

Tools to implement
n8n or Airflow (you already know it) – orchestrate quote → template → deploy → video

Supabase / PostgreSQL – store quotes, sessions, generated previews

Tavily API – research competitor MVPs for prospect

Replicate / Fal.ai – generate placeholder UI images if needed




