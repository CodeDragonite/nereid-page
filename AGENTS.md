<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
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