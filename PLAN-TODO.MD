# Plan: Professional Design Audit & Redesign for Portfolio/Upcoming Pages

## TL;DR
Portfolio and Upcoming pages lack the sophisticated design patterns established in Home/Services (hero sections, entrance animations, color-coded visual hierarchy, interactive micro-interactions). This creates a noticeable quality inconsistency that undermines professionalism. The redesign will unify these pages with established patterns while meeting SITE.MD accessibility/performance/SEO standards. Home and Services serve as reference implementations; Portfolio and Upcoming will replicate and adapt these proven patterns.

---

## Phase 1: Design Audit & Gap Analysis (Current Phase)

### Portfolio Page Audit

**Current State:**
- Basic grid layout (md:grid-cols-2 lg:grid-cols-3)
- Flat card design with minimal visual hierarchy
- No hero section with intro/value prop
- No entrance animations on page load
- Cards lack color coding, accent lines, or status indicators
- All cards treated identically regardless of project type

**SITE.MD Compliance Issues:**
- ❌ Missing hero section per SITE.MD spec: "Grid of 3-4 projects...Each card: Thumbnail, client type, challenge, result"
- ⚠️ No Lighthouse target validation (Performance ≥95, Accessibility ≥95, SEO ≥100)
- ⚠️ No Schema.org JSON-LD structured data for case studies
- ⚠️ No color contrast verification against 4.5:1 standard

**Accessibility Issues:**
- ❌ No animated hero with staggered entrance (prefers-reduced-motion not addressed)
- ❌ Focus indicators not explicitly styled on cards
- ❌ Semantic structure missing proper landmarks (no <section role="region" aria-labelledby>)
- ⚠️ Status badge positioning could confuse screen readers without aria-label

**SEO Issues:**
- ❌ No breadcrumb navigation (missing schema markup opportunity)
- ❌ Meta description generic, no schema for individual case studies
- ❌ No Open Graph per-case-study optimization
- ❌ No internal linking structure

**Visual Consistency Issues:**
- ❌ No hero section like Home/Services pages (Gap: HeroSection pattern not replicated)
- ❌ No top accent line on cards like ServicesGrid (Gap: color-coding visual system)
- ❌ No InView animation triggers (Gap: entrance animations missing)
- ❌ No hover micro-interactions (Gap: scale/shadow effects missing)

### Upcoming Page Audit

**Current State:**
- 2-column card layout (lg:grid-cols-2)
- Two projects with identical visual treatment
- No hero section or roadmap context
- Features presented as plain bullet list
- Timeline shown only in header (no visual timeline component)
- No visual differentiation by project domain (healthcare vs. sports)
- No phase/progress indicators

**SITE.MD Compliance Issues:**
- ❌ Missing hero per spec: "Showcase upcoming products...Add newsletter/signup capture"
- ❌ No "Notify Me When Live" CTA on every project card
- ⚠️ No timeline visualization (SITE.MD mentions "timeline" in brief structure)
- ⚠️ No Schema.org Event schema for project launch dates
- ⚠️ No Newsletter signup integration

**Accessibility Issues:**
- ❌ Timeline semantics missing (<time>, <ol> for phases)
- ❌ No animated entrance with staggered pattern
- ❌ Feature lists not semantic (<ul>, <li> not visible in excerpt but structure unclear)
- ⚠️ Domain-specific color schemes (healthcare/sports) not accessible without text alternatives

**SEO Issues:**
- ❌ No breadcrumb navigation
- ❌ No Schema.org Event schema with startDate
- ❌ No Open Graph per-project
- ❌ No WebPage schema mentioning products

**Visual Consistency Issues:**
- ❌ No hero section (Gap: HeroSection pattern not replicated)
- ❌ Projects lack visual differentiation (Gap: color-coding system not applied)
- ❌ No InView animation triggers
- ❌ Feature list styling inconsistent with Services pattern
- ❌ No phase/status visual indicators

---

## Phase 2: Design System Alignment

**Reference Implementations (Gold Standard):**

### HeroSection Pattern (from /components/home/HeroSection.tsx)
```
- fadeUp animation variant:
  * opacity 0 → 1
  * y: 24 → 0
  * duration: 0.55s
  * staggered delay: i * 0.12s
  * respects prefers-reduced-motion
- Background: gradient + grid overlay + glow orbs (radial gradients, 6% opacity at ±15% positions)
- Elements: tag (icon + text), headline (italic accent), subheadline, CTA
- Accessibility: aria-labelledby, aria-hidden on decorative elements
```

### ServicesGrid Pattern (from /components/home/ServicesGrid.tsx)
```
- Card animation trigger: useInView (once: true, margin: "-60px")
- Entrance: opacity 0→1, y: 20→0, 0.45s, staggered i * 0.07s
- Hover: scale 1.02x, translateY -2px, border/shadow transition 0.22s
- Visual hierarchy:
  * Top accent line: service-color gradient, opacity 0.6
  * Icon background: service-color at 15% opacity, 44x44px container
  * Title: 1rem, weight 600
  * Outcome: 0.875rem, secondary color, line-height 1.6
  * Padding: 1.75rem, radius: var(--radius-lg)
  * Shadows: var(--shadow-card) base, var(--shadow-card-hover) on hover
- Color System: 6 distinct colors for visual coding (teal, blue, purple, orange, green, pink)
```

**SITE.MD Design Requirements (Extract):**
- Oceanic/Nautical theme inspired by "Nereid" (sea nymph)
- Dark-first: --background #0a1929, --accent #006994 or #00d4aa
- Typography: Geist Sans (body), wave variant for headings
- Animations: ✅ DO fade+slide up on load, subtle scale+shadow on hover, scroll-triggered fade-ins
- Animation requirements: ✅ DO respect prefers-reduced-motion
- Wave animations, floating particles, 3D card transforms for "submerged" effect
- Lighthouse targets: Performance ≥95, Accessibility ≥95, SEO ≥100

---

## Phase 3: Redesign Implementation Plan

### PORTFOLIO PAGE REDESIGN

**Step 1: Hero Section** (Parallel with Step 2)
- Copy HeroSection.tsx pattern and adapt:
  * Hero tag: "Featured Work" or "Our Expertise in Action" (Zap or Target icon)
  * Headline: "Projects That Define Our Expertise" (animate with fadeUp)
  * Subheadline: "Case studies showcasing our approach to solving complex challenges" (fadeUp)
  * CTA: "Explore Case Studies" (button, fadeUp)
  * Background: gradient to-surface, grid overlay, glow orbs
- Duration: 0.55s stagger pattern, respects prefers-reduced-motion
- Accessibility: aria-labelledby="portfolio-heading", aria-hidden on decorative elements
- Files to modify: app/portfolio/page.tsx updated version with new Hero component or inline pattern

**Step 2: Redesign Case Study Cards** (Parallel with Step 1)
- Apply ServicesGrid animation/interaction pattern:
  * Entrance: InView trigger (once: true, margin: "-60px"), opacity/y 0.45s, staggered by index * 0.07s
  * Hover: scale 1.02x, -2px Y, border/shadow transition 0.22s
- Visual hierarchy per card:
  * Top accent line: project-type color (category-specific, see Step 3)
  * Client type badge: left-aligned (e.g., "SaaS", "Healthcare", "FinTech")
  * Project title: 1.25rem, weight 600
  * Challenge snippet: 0.875rem, secondary color (show first 100 chars)
  * Metrics/outcome: highlighted (e.g., "↑30% faster", "$2M saved", "50k+ users")
  * Tech stack: small tags with category color at 10% opacity
  * CTA: "View Case Study" button (right-aligned)
- Color coding by project category:
  * Infrastructure: #3d7fff (blue) - represents networks/reliability
  * Web/App Development: #00d4aa (teal) - represents flows/fluidity
  * Systems Integration: #a78bfa (purple) - represents complexity/depth
  * AI/Automation: #fb923c (orange) - represents innovation
  * Healthcare/IT: #34d399 (green) - represents growth/health
  * Other: #f472b6 (pink) - visual accent
- Files to modify: app/portfolio/page.tsx, lib/portfolio.ts (add category + color to data)

**Step 3: Add Breadcrumb Navigation**
- Structure: Home > Portfolio > [Project Name] (if on case study detail page)
- Semantic HTML: `<nav aria-label="Breadcrumb">` with proper schema
- Schema.org: BreadcrumbList JSON-LD with name, position, url per breadcrumb
- Implementation: Create reusable `<Breadcrumb>` component in components/Breadcrumb.tsx
- Files to create/modify: components/Breadcrumb.tsx (new), app/portfolio/page.tsx, app/portfolio/[slug]/page.tsx

**Step 4: Add Case Study Detail Page** (if not fully implemented)
- Route: `/portfolio/[slug]`
- Structure:
  * Breadcrumb (from Step 3)
  * Hero: project title, client name, year completed
  * Sections: Challenge (problem statement) → Solution (approach) → Tech Stack → Outcome (metrics)
  * Related projects: 2-3 other case studies (side-by-side cards with InView animations)
- Schema.org: CreativeWork schema with name, description, dateCreated, url, author, keywords
- Files to modify/create: app/portfolio/[slug]/page.tsx (create if missing), lib/portfolio.ts

**Step 5: Add Filter/Sort Controls** (Optional Enhancement)
- Filters: By industry/category, by tech stack, by year
- Semantic HTML: `<fieldset><legend>` for accessibility
- Keyboard support: Tab through filters, Arrow keys for selection (via Headless UI or custom)
- Visual: Smooth transition 0.2s on active state
- Files to modify: app/portfolio/page.tsx, potentially create components/FilterControls.tsx

**Step 6: SEO Optimization**
- Per case study page:
  * Meta title: "[Project Name] | Nereid Systems Case Study"
  * Meta description: Show challenge + outcome (max 160 chars)
  * Open Graph: og:title, og:description, og:image, og:url
  * No Index on preview/draft case studies
- Schema.org JSON-LD:
  ```
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Case Study: [Project]",
    "description": "[outcome focused]",
    "author": { "@type": "Organization", "name": "Nereid Systems" },
    "dateCreated": "2024-XX-XX",
    "dateModified": "2024-XX-XX",
    "url": "https://nereidsystems.com/portfolio/[slug]",
    "image": "...",
    "keywords": "[tech1, tech2, industry]"
  }
  ```
- Breadcrumb schema (BreadcrumbList)
- Files to modify: app/portfolio/page.tsx, app/portfolio/[slug]/page.tsx, lib/portfolio.ts

**Step 7: Performance & Accessibility Validation**
- Image optimization: Use next/image with loading="lazy", WebP/AVIF
- Font loading: Verify DM Serif Display + DM Sans are preloaded (check @font-face strategy)
- Lighthouse audit: Run `next build && next start`, test on localhost:3000
- axe-core scan: Check color contrast (4.5:1 for text), ARIA labels, focus indicators, semantic HTML
- Keyboard navigation: Tab through all cards, filters, links - ensure logical order, no traps
- Screen reader: Use NVDA/JAWS to verify heading hierarchy, landmark regions, link text meaning
- Files to validate: app/portfolio/page.tsx, app/portfolio/[slug]/page.tsx, app/globals.css

---

### UPCOMING PAGE REDESIGN

**Step 1: Hero Section** (Parallel with Step 2)
- Adapt HeroSection pattern for innovation/roadmap context:
  * Hero tag: "What's Next" or "Innovation Pipeline" (Rocket or Compass icon)
  * Headline: "What We're Building Next" (fadeUp)
  * Subheadline: "Exploring new frontiers in healthcare tech and sports analytics" (fadeUp)
  * CTA: "Join the Beta" or "Get Notified" (button, fadeUp)
  * Background: gradient to-surface, grid overlay, glow orbs
- Duration: 0.55s stagger pattern, respects prefers-reduced-motion
- Files to modify: app/upcoming/page.tsx

**Step 2: Visual Timeline Component** (New)
- Vertical timeline with project phases:
  * Phase containers staggered left/right for visual interest
  * Each phase shows quarter/year + project cards under that phase
  * Example: Q1 2025 (MedRating initial alpha) → Q2 2025 (Football Analyzer data collection) → Q3 2026 (MedRating full launch)
- Semantic HTML: `<ol>` for timeline (ordered list), `<article>` for each phase
- Animation: Staggered entrance from top with line drawing effect (optional)
- Accessibility: aria-current="false" on non-current phases, `<time datetime="2026-Q3">Q3 2026</time>`
- Files to create: components/Timeline.tsx (new), modify app/upcoming/page.tsx

**Step 3: Redesign Project Cards** (Parallel with Step 2)
- Domain-specific visual treatment:
  * **MedRating Panama** (Healthcare):
    - Top accent line: #34d399 (green) - health/growth theme
    - Icon: Heart or Plus sign (healthcare symbol) with green background at 15% opacity
    - Status badge: "In Development" (teal background)
    - Features styled as 2-column list with icons (appointment, records, telemedicine, compliance)
    - CTA: "Request Early Access" button
  * **Football Analyzer Scout** (Sports):
    - Top accent line: #fb923c (orange) - dynamic/athletic theme
    - Icon: Target or Zap icon with orange background at 15% opacity
    - Status badge: "Planning Phase" (orange background)
    - Features styled as 2-column list with sports icons (analytics, predictions, video, reports, optimization)
    - CTA: "Join Scout Network" button
- Apply ServicesGrid animation pattern:
  * Entrance: InView trigger, opacity/y 0.45s, staggered by index * 0.07s
  * Hover: scale 1.02x, -2px Y, border/shadow transition 0.22s
- Card layout: Title, description, feature list, tech stack, timeline, status, CTA
- Files to modify: app/upcoming/page.tsx, move hardcoded data to lib/upcoming.ts (new)

**Step 4: Add Newsletter/Waitlist Integration**
- Per-project "Notify Me" CTA button (step 3 already includes)
- Optional: Global newsletter signup at bottom of page
- Form handling: Route to api/contact/route.ts or use Formspree (per SITE.MD)
- Semantic HTML: `<form>`, `<input type="email">`, associated `<label>`
- Accessibility: Error messages with aria-live="polite", success toast notification
- Files to modify/create: app/upcoming/page.tsx, potentially lib/upcoming.ts

**Step 5: Add Phase/Status Indicators**
- Visual badges: "Planning Phase", "In Development", "Alpha Testing", "Beta", "Coming Q3 2026"
- Color coding: Phase color matches project color (MedRating: green, Football: orange)
- Optional: Progress bar showing estimated completion (0-100%)
- Animation: Subtle pulse effect on status badge (optional, respects motion preference)
- Files to modify: app/upcoming/page.tsx, lib/upcoming.ts

**Step 6: Data Structure Refactor**
- Move hardcoded data from component to lib/upcoming.ts:
  ```
  export const upcomingProjects = [
    {
      id: 'medrating-panama',
      title: 'MedRating Panama',
      slug: 'medrating-panama',
      description: '...',
      features: [...],
      tech: [...],
      timeline: 'Q3 2026',
      phase: 'In Development',
      status: 'active',
      category: 'healthcare',
      color: '#34d399',
      icon: 'Heart',
      ctaText: 'Request Early Access',
      ctaUrl: '/contact?project=medrating-panama'
    },
    // ... similar for Football Analyzer
  ];
  ```
- Files to create: lib/upcoming.ts (new)
- Files to modify: app/upcoming/page.tsx

**Step 7: SEO & Accessibility**
- Meta description: "Discover upcoming projects in medical technology and sports analytics—join the waitlist"
- Schema.org: WebPage schema with mentions of upcoming products + Event schema per project (if launch date known)
  ```
  {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "[Project Name]",
    "description": "...",
    "startDate": "2026-Q3",
    "url": "https://nereidsystems.com/upcoming"
  }
  ```
- Semantic HTML: Proper heading hierarchy, landmark regions (`<main>`, `<section>`), `<time>` tags for dates
- Accessibility: Focus indicators on all CTAs, keyboard navigation through projects, screen reader support for timeline order
- Files to modify: app/upcoming/page.tsx

---

## Phase 4: Logo Integration & Brand Identity

**Step 1: Navbar Logo Replacement**
- Replace generic "N" icon in components/Navbar.tsx with logo_sidename.svg
- Import SVG as React component:
  ```
  import { ReactComponent as LogoSidename } from '@/assets/logo_sidename.svg';
  ```
  OR use next/image for optimized delivery
- Sizing: ~160px width for horizontal layout (use clamp for responsiveness)
- Dark/light mode: Adapt colors via CSS filter or dual assets (dark + light versions)
- Spacing: Proper margins (16-24px) from nav links
- Accessibility: Logo should be wrapped in `<a href="/">` with aria-label="Nereid Systems Home"
- Files to modify: components/Navbar.tsx, potentially assets/logo_sidename.svg

**Step 2: Footer Logo**
- Place logo (icon or icon+name-below) in footer with company description
- Layout: Logo left, company info/links right (flex wrap on mobile)
- Files to modify: components/Footer.tsx (if exists, otherwise create)

**Step 3: Favicon & Social Share Images**
- Favicon: Use logo_icon.svg (convert to ICO via asset pipeline or use SVG directly with next/image)
- Open Graph image: Create 1200x630px version of logo with "Nereid Systems" text overlay
- Files to create/modify: public/favicon.ico or public/favicon.svg, public/og-image.png

**Step 4: Brand Usage Guide** (Documentation)
- Minimum sizes: 64px (icon only), 160px (icon + name)
- Clear space: 10% of logo height on all sides
- Color modes: Dark logo on light background, light logo on dark background
- Restrictions: No stretching, rotating, or color modifications
- Document: Create BRAND.md or add to SITE.MD

---

## Phase 5: Animation & Interaction Specifications

### Portfolio Page Animations
- Hero section: fadeUp variant (0.55s, i * 0.12s stagger)
- Case study cards:
  * Entrance: InView trigger (margin: -60px), opacity 0→1, y 20→0, 0.45s, staggered i * 0.07s
  * Hover (not reduced motion): scale 1.02x, -2px Y, border/shadow 0.22s transition
  * Focus: visible ring outline (var(--focus-ring) or similar)
- Filters (if added): Smooth opacity transition 0.2s on active state
- All animations respect prefers-reduced-motion (set initial to visible if motion reduced)

### Upcoming Page Animations
- Hero section: fadeUp variant (0.55s, i * 0.12s stagger)
- Timeline items: Staggered entrance (optional left/right alternating), 0.5s per item
- Project cards: InView trigger (margin: -60px), entrance animations, hover effects (same as Portfolio)
- Status badges: Optional subtle pulse animation (2s loop, respects motion preference)
- Phase indicator line: Optional smooth height animation as cards enter view

---

## Phase 6: Performance & Accessibility Validation

**Automated Checks:**
- Run Lighthouse audit after redesign: `npm run build && npm run start`
  * Performance target: ≥95
  * Accessibility target: ≥95
  * SEO target: ≥100
  * Best Practices target: ≥90
- axe-core scan (browser dev tools):
  * Color contrast: All text ≥4.5:1, UI components ≥3:1
  * ARIA labels on buttons, status badges, icon-only elements
  * Focus indicators visible and distinct
  * Semantic HTML validation
- TypeScript strict mode: No implicit any, all types explicit

**Manual Testing:**
- Keyboard navigation:
  * Tab through all interactive elements (cards, buttons, links, filters)
  * Verify logical tab order (left-to-right, top-to-bottom)
  * No keyboard traps (can always Tab out)
  * Arrow keys for filter selections (if implemented)
- Screen reader testing (NVDA, JAWS, VoiceOver):
  * Heading hierarchy: H1 (page title) → H2 (sections) → H3 (cards) - logical flow
  * Landmark regions announced: banner (navbar), main (content), contentinfo (footer)
  * Link text meaningful (avoid "Click here", describe destination)
  * Form labels associated with inputs
  * Error messages announced via aria-live="polite"
- Dark/light mode:
  * Toggle persists via localStorage (verify in Dev Tools)
  * All text readable in both modes (contrast OK)
  * No color-only meaning (supplement with text/icons)
- Mobile responsiveness:
  * Test at 320px, 480px, 768px, 1024px, 1440px breakpoints
  * Tap targets ≥48px (buttons, links, cards)
  * Readable text without horizontal scroll
  * Images scale proportionally

**Performance Metrics:**
- Lighthouse metrics to monitor:
  * LCP (Largest Contentful Paint): <2.5s
  * FID (First Input Delay): <100ms
  * CLS (Cumulative Layout Shift): <0.1
- Image optimization:
  * All images use next/image with WebP/AVIF
  * Lazy loading on portfolio/upcoming cards (loading="lazy")
  * Responsive sizes via srcSet (sizes="(max-width: 768px) 100vw, 50vw")
- Font optimization:
  * DM Serif Display + DM Sans preloaded (verify in network tab)
  * No font-loading FOUT/FLIT flashes
  * Display="swap" strategy (fallback fonts display immediately)

---

## Relevant Files

### To Create (New)
- components/Breadcrumb.tsx — Reusable breadcrumb with schema support
- components/Timeline.tsx — Visual timeline component for upcoming projects
- lib/upcoming.ts — Data structure for upcoming projects (move from hardcoded)
- BRAND.md — Brand usage guidelines (or add to SITE.MD)
- components/FilterControls.tsx — Optional filter UI for portfolio

### To Modify (Critical)
- app/portfolio/page.tsx — Add hero section, update card layout, add animations, add breadcrumb
- app/portfolio/[slug]/page.tsx — Ensure case study detail page has full design + schema
- app/upcoming/page.tsx — Add hero section, timeline component, domain-specific card styling, move data to lib
- components/Navbar.tsx — Replace "N" with actual logo (logo_sidename.svg)
- lib/portfolio.ts — Add category + color fields to case studies (if not present)
- app/globals.css — Validate animation keyframes, add any new CSS utilities for accent lines, icon backgrounds

### To Validate (No Changes Needed if Correct)
- app/globals.css — Verify focus-visible, prefers-reduced-motion, color variables
- components/Footer.tsx — Add logo (or create if missing)
- next.config.ts — Ensure SVG optimization + image handling
- tsconfig.json — Verify strict: true (TypeScript strictness)

---

## Verification Checklist

### Step 1: Hero Sections Complete
- [ ] Portfolio page hero renders with correct animation pattern (fadeUp, stagger)
- [ ] Upcoming page hero renders with correct animation pattern
- [ ] Both respect prefers-reduced-motion (inspect computed styles)
- [ ] Hero text is readable (color contrast ≥4.5:1)
- [ ] Lighthouse performance unaffected (<2s LCP)

### Step 2: Card Redesigns Complete
- [ ] Portfolio cards have top accent line (color-coded by project category)
- [ ] Upcoming cards have domain-specific styling (green for healthcare, orange for sports)
- [ ] All cards have InView animation (margin: -60px trigger, entrance animation)
- [ ] Hover effects work (scale 1.02x, -2px Y, border/shadow)
- [ ] Keyboard focus visible on all cards (ring outline)
- [ ] Color contrast verified (all text ≥4.5:1, UI ≥3:1)

### Step 3: Animations Respect Motion Preference
- [ ] Run in browser: Set prefers-reduced-motion to "reduce" (Dev Tools → Rendering)
- [ ] Hero section: Entrance animations still visible (initial state = visible, not hidden)
- [ ] Cards: No scale/translate on hover (stays at 1x, y=0)
- [ ] Pulse animations on badges (if added): Disabled in reduced motion mode

### Step 4: Breadcrumbs & Navigation
- [ ] Breadcrumb displays correctly on portfolio case study pages
- [ ] Breadcrumb schema valid (BreadcrumbList JSON-LD)
- [ ] Keyboard navigation through breadcrumbs (Tab + Enter)
- [ ] Screen reader announces breadcrumb path

### Step 5: SEO & Structured Data
- [ ] Meta titles/descriptions updated (no generic strings)
- [ ] Open Graph tags present on portfolio case study pages
- [ ] CreativeWork schema valid (JSON-LD validates in Schema.org validator)
- [ ] BreadcrumbList schema valid
- [ ] Event schema valid for upcoming projects (if launch dates included)

### Step 6: Logo Integration
- [ ] Logo displays in Navbar (logo_sidename.svg, ~160px width)
- [ ] Logo responsive (clamp sizing or media queries)
- [ ] Logo colors adapt to dark/light mode (no hardcoded colors)
- [ ] Logo accessibility: `aria-label="Nereid Systems Home"` on link
- [ ] Footer logo present (logo_icon.svg or icon+name-below)

### Step 7: Accessibility Audit Passed
- [ ] Lighthouse Accessibility score: ≥95
- [ ] axe-core scan: 0 critical/serious issues
- [ ] Color contrast verified: All text ≥4.5:1, UI ≥3:1 (use contrast checker tool)
- [ ] ARIA labels on all interactive elements (buttons, filters, badges)
- [ ] Keyboard navigation: Tab order logical, no traps, all elements reachable
- [ ] Screen reader: Heading hierarchy correct, landmarks announced, link text meaningful
- [ ] Focus indicators: Visible and distinct on all interactive elements

### Step 8: Performance Validation
- [ ] Lighthouse Performance score: ≥95
- [ ] LCP: <2.5s (measured on localhost)
- [ ] FID: <100ms
- [ ] CLS: <0.1
- [ ] Images optimized: All use next/image with WebP/AVIF, lazy loading applied
- [ ] Fonts: DM Sans + DM Serif Display preloaded, no FOUT/FLIT flashes

### Step 9: Manual Testing
- [ ] Portfolio page mobile (320px): Readable, tap targets ≥48px, no horizontal scroll
- [ ] Portfolio page desktop (1440px): Cards grid responsive, hero full-width, animations smooth
- [ ] Upcoming page mobile: Timeline readable, project cards stacked, CTAs accessible
- [ ] Upcoming page desktop: Timeline visual clear, projects side-by-side, animations smooth
- [ ] Dark mode toggle: Persists on reload, all text readable in both modes
- [ ] All links functional: No 404s, internal links work, external links open in new tab (if intended)

### Step 10: Code Quality
- [ ] No TypeScript errors (npm run type-check or tsc)
- [ ] No ESLint errors (npm run lint)
- [ ] No unused imports or variables
- [ ] Components properly typed (no any types)
- [ ] Framer Motion animations respect motion preferences throughout

---

## Decisions & Assumptions

### Design Pattern Approach
- **Decision**: Portfolio/Upcoming pages will replicate HeroSection + ServicesGrid patterns established in Home/Services pages
- **Rationale**: Proven to meet SITE.MD standards (animations, accessibility, SEO), ensures consistency, reduces decision paralysis
- **Alternative rejected**: Creating unique patterns for each page (too much inconsistency)

### Color Coding System
- **Decision**: Portfolio projects color-coded by category (Infrastructure→Blue, Web→Teal, Systems→Purple, AI→Orange, Healthcare→Green, Other→Pink)
- **Rationale**: Matches ServicesGrid 6-color system, creates instant visual recognition, SITE.MD emphasizes visual differentiation
- **Alternative rejected**: Single accent color (less visual hierarchy)

### Upcoming Projects Visual Differentiation
- **Decision**: MedRating (healthcare) uses green + medical icons; Football Analyzer (sports) uses orange + athletic icons
- **Rationale**: Domain-specific theming increases memorability, aligns with project purpose
- **Alternative rejected**: Identical styling (reduces context clarity)

### Logo Integration Point
- **Decision**: Logo_sidename.svg (icon + name beside) used in Navbar; logo_icon.svg in favicon; logo-name-below in footer
- **Rationale**: Navbar layout favors horizontal assets, footer allows vertical stacking, favicon needs compact icon
- **Files matched**: Three logo variants available, each optimal for specific context

### Hero Section Entrance Pattern
- **Decision**: All heroes use fadeUp (opacity + y translate, 0.55s, staggered i * 0.12s)
- **Rationale**: HeroSection.tsx reference implementation, proven to respect prefers-reduced-motion, SITE.MD compliant
- **Alternative rejected**: Different animations per page (breaks consistency goal)

### Timeline Component for Upcoming
- **Decision**: Vertical timeline with phases as separate rows (Phase 1 Q1 2025, Phase 2 Q2 2025, etc.)
- **Rationale**: SITE.MD brief mentions "timeline", projects in different phases, vertical timeline accessible on mobile
- **Alternative rejected**: Horizontal timeline (harder to implement responsive, less accessible)

### Content Structure Assumption
- **Assumption**: Portfolio case studies already mapped to categories (infrastructure, web, systems, AI, healthcare, other)
- **Action if false**: Add category field to lib/portfolio.ts data structure
- **Assumption**: Upcoming projects have confirmed launch quarters (Q3 2026, Q4 2026 per excerpt)
- **Action if false**: Use "Coming Soon" or "TBD" placeholders with option to notify

### Brand Asset Maturity
- **Assumption**: logo_sidename.svg exists and is production-ready (has been referenced in conversation)
- **Action if missing**: Use logo_icon.svg + "Nereid" text via Typography (temporary) or request final logo from designer

---

## Implementation Dependencies & Parallelization

### Can Run in Parallel:
- Step 1 (Portfolio Hero) ↔ Step 2 (Portfolio Cards) — Independent components, both modify app/portfolio/page.tsx but different sections
- Step 1 (Upcoming Hero) ↔ Step 2 (Upcoming Timeline) — Independent (hero is top section, timeline is lower)
- Step 3 (Portfolio Breadcrumb) ↔ All Portfolio Steps — Breadcrumb is component, doesn't block card/hero work
- Logo Integration (Step 4) ↔ All Page Redesigns — Logo is in Navbar, independent of page content
- Performance Validation (Phase 6) — Only after all redesign steps complete

### Blocking Dependencies:
- Portfolio Case Study Detail Page (Step 4) ← Portfolio Cards (Step 2) — Need to establish link structure first
- Data Refactor for Upcoming (Step 6) ← Card Redesign (Step 3) — Must understand final card fields before refactoring
- SEO Optimization (Step 6) ← Hero + Cards + Breadcrumbs complete — SEO requires all page content final
- Accessibility Validation (Step 7) ← Hero + Cards + Breadcrumbs + Logo — Audit entire page, not piecemeal

### Suggested Execution Order:
1. **Batch A (Parallel)**: Logo Integration (Phase 4) + Portfolio Hero (Step 1) + Upcoming Hero (Phase 3 Step 1)
2. **Batch B (Parallel)**: Portfolio Cards (Step 2) + Upcoming Timeline (Phase 3 Step 2) + Upcoming Card Redesign (Phase 3 Step 3)
3. **Sequential**: Portfolio Breadcrumb (Step 3) → Portfolio Case Study Detail (Step 4) → Data Refactor (Phase 3 Step 6)
4. **Sequential**: Portfolio SEO (Step 6) → Upcoming SEO (Phase 3 Step 7)
5. **Final**: Accessibility + Performance Validation (Phases 6) — Entire pages must be complete

---

## Success Metrics & Sign-Off Criteria

**Quality Metrics:**
- Lighthouse Performance: ≥95
- Lighthouse Accessibility: ≥95
- Lighthouse SEO: ≥100
- Lighthouse Best Practices: ≥90
- Color contrast: All text ≥4.5:1, UI ≥3:1 (verified via contrast checker)
- axe-core issues: 0 critical/serious
- TypeScript errors: 0
- ESLint errors: 0

**User Experience Metrics:**
- Portfolio hero entrance animation: Smooth, no jank (60 fps)
- Portfolio card hover: Scale works, no lag (60 fps)
- Upcoming timeline: Renders correctly on mobile (vertical), desktop (visual phases clear)
- Keyboard navigation: All elements reachable via Tab, logical order
- Screen reader: Heading hierarchy clear, landmarks announced, context provided

**Brand Consistency Metrics:**
- Logo displays in Navbar, Footer, and favicon (all formats)
- Color palette: All accent lines use defined project-category colors
- Typography: Headings use DM Serif Display, body uses DM Sans (or Geist Sans per config)
- Animations: All respect prefers-reduced-motion, use consistent Framer Motion patterns

**Deployment Readiness:**
- No dead links (internal links work, external links valid)
- Case study pages load correctly (no 404s)
- Forms functional (Calendly embeds, contact form submission works)
- Metadata present (meta titles/descriptions, OG tags, schema)
- No console errors in browser Dev Tools
- Works on modern browsers: Chrome, Firefox, Safari, Edge (latest 2 versions)

---

## Further Considerations

### 1. Case Study Data Population
**Question**: Are portfolio case studies fully populated in lib/portfolio.ts with challenge/solution/outcome/tech? Or are some marked "Case Study Coming Soon"?
**Recommendation**: Populate at least 2-3 complete case studies before launch to demonstrate thought leadership. If all are incomplete, consider marking as "Draft" or "In Review" to set expectations.

### 2. Newsletter/Waitlist Integration
**Question**: Should "Notify Me" CTAs on Upcoming projects route to email capture, or direct to Calendly/Contact page?
**Recommendation**: Email capture (simpler UX, builds audience). Route to api/contact with subject pre-filled as "Notify: [Project Name]". Provide confirmation email explaining timeline.

### 3. Filter Complexity for Portfolio
**Question**: Filter controls (by industry, tech, year) — is this essential for launch, or nice-to-have?
**Recommendation**: Nice-to-have for V1. Implement if portfolio grows >8 projects. For now, focus on color-coded cards + sorting by date. Add filters in V2.

### 4. Timeline Visualization Preference
**Question**: Upcoming projects — prefer vertical timeline with phases, or horizontal roadmap with icons?
**Recommendation**: Vertical (more accessible, mobile-friendly). Horizontal can be V2 enhancement once dataset grows.

### 5. Schema.org Completeness
**Question**: Should all portfolio case studies have full CreativeWork schema, or just upcoming projects Event schema?
**Recommendation**: Both. CreativeWork for case studies demonstrates expertise to search engines. Event schema for upcoming projects drives discoverability ("MedRating Panama" + launch date can show in search results).
