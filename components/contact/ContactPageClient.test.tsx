import { describe, test, expect, mock, beforeEach, afterEach } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";

// ---------------------------------------------------------------------------
// Module mocks — must be at top level, before the component import
// ---------------------------------------------------------------------------

mock.module("next/navigation", () => ({
  useSearchParams: () => ({
    get: mock(() => null),
  }),
}));

mock.module("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

mock.module("framer-motion", () => {
  const Passthrough = ({
    children,
    initial, animate, exit, transition, variants, custom,
    layout, layoutId, whileHover, whileTap, whileInView, whileFocus,
    onAnimationStart, onAnimationComplete, onHoverStart, onHoverEnd,
    onTap, onTapStart, onTapCancel,
    ...props
  }: any) => React.createElement("div", props, children);

  const P = ({
    children, initial, animate, exit, transition, variants, custom, ...props
  }: any) => React.createElement("p", props, children);

  const H1 = ({
    children, initial, animate, exit, transition, variants, custom, ...props
  }: any) => React.createElement("h1", props, children);

  return {
    motion: { div: Passthrough, p: P, h1: H1 },
    useAnimation: () => ({}),
    useInView: () => false,
  };
});

// ---------------------------------------------------------------------------
// Import AFTER mocks
// ---------------------------------------------------------------------------
import { ContactPageClient } from "./ContactPageClient";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Extract the text content of the first <style> tag from an HTML string. */
function extractStyleTag(html: string): string {
  const match = html.match(/<style>([\s\S]*?)<\/style>/);
  return match?.[1]?.trim() ?? "";
}

function render(): string {
  return renderToString(React.createElement(ContactPageClient));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("ContactPageClient — mobile responsiveness (Task 1.1)", () => {
  let html: string;

  beforeEach(() => {
    html = render();
  });

  afterEach(() => {
    // No cleanup needed for renderToString
  });

  // =========================================================================
  // 1. ID presence on correct elements
  // =========================================================================

  test('id="contact-layout" exists on the page grid container', () => {
    expect(html).toContain('id="contact-layout"');
    const divMatch = html.match(/<div[^>]*id="contact-layout"[^>]*>/);
    expect(divMatch).not.toBeNull();
  });

  test('id="contact-form-row" exists on the name/email field row', () => {
    expect(html).toContain('id="contact-form-row"');
    const formRowMatch = html.match(/<div[^>]*id="contact-form-row"[^>]*>/);
    expect(formRowMatch).not.toBeNull();
  });

  // =========================================================================
  // 2. Style block media-query rules
  // =========================================================================

  test("style block contains 768px media query collapsing #contact-layout to single column", () => {
    const css = extractStyleTag(html);
    expect(css).toContain("@media (max-width: 768px)");
    expect(css).toContain("#contact-layout");
    expect(css).toContain("grid-template-columns: 1fr !important");
  });

  test("style block contains 480px media query stacking #contact-form-row inputs", () => {
    const css = extractStyleTag(html);
    expect(css).toContain("@media (max-width: 480px)");
    expect(css).toContain("#contact-form-row");
    expect(css).toContain("grid-template-columns: 1fr !important");
  });

  test("both media queries are present in the same style block", () => {
    const css = extractStyleTag(html);
    const mediaQueries = css.match(/@media\s*\([^)]+\)\s*\{/g);
    expect(mediaQueries).not.toBeNull();
    expect(mediaQueries!.length).toBe(2);
    expect(mediaQueries![0]).toContain("768px");
    expect(mediaQueries![1]).toContain("480px");
  });

  // =========================================================================
  // 3. Default layout — regression checks
  // =========================================================================

  test("default grid layout is two-column (1.4fr 1fr) for contact-layout", () => {
    const layoutMatch = html.match(
      /<div[^>]*id="contact-layout"[^>]*style="[^"]*grid-template-columns[^"]*"/,
    );
    expect(layoutMatch).not.toBeNull();
    expect(layoutMatch![0]).toMatch(
      /grid-template-columns:\s*minmax\(0,\s*1\.4fr\)\s+minmax\(0,\s*1fr\)/,
    );
  });

  test("default form-row layout is two-column (1fr 1fr)", () => {
    const rowMatch = html.match(
      /<div[^>]*id="contact-form-row"[^>]*style="[^"]*grid-template-columns[^"]*"/,
    );
    expect(rowMatch).not.toBeNull();
    expect(rowMatch![0]).toMatch(/grid-template-columns:\s*1fr\s+1fr/);
  });

  // =========================================================================
  // 4. No regressions — all expected elements still render
  // =========================================================================

  test("renders form with all five input fields", () => {
    expect(html).toContain("<form");
    expect(html).toContain('name="name"');
    expect(html).toContain('name="email"');
    expect(html).toContain('name="company"');
    expect(html).toContain('name="service"');
    expect(html).toContain('name="message"');
  });

  test("renders sidebar with contact info", () => {
    expect(html).toContain("directContactHeading");
    expect(html).toContain("hello@nereidsystems.com");
    expect(html).toContain("responseTime");
  });

  test("renders submit button", () => {
    expect(html).toContain('type="submit"');
    expect(html).toContain("submitBtn");
  });

  test("renders page header with eyebrow, heading, and subheading", () => {
    expect(html).toContain("eyebrow");
    expect(html).toContain("heading");
    expect(html).toContain("subheading");
  });

  test("renders hero gradient and grid overlay", () => {
    expect(html).toContain("hero-gradient");
    expect(html).toContain("grid-overlay");
  });

  // =========================================================================
  // 5. Adversarial / edge-case tests
  // =========================================================================

  test("style block does not contain unexpected breakpoints", () => {
    const css = extractStyleTag(html);
    const breakpoints = css.match(/(max-width|min-width):\s*\d+px/g);
    expect(breakpoints).not.toBeNull();
    expect(breakpoints!.length).toBe(2);
    expect(breakpoints).toContain("max-width: 768px");
    expect(breakpoints).toContain("max-width: 480px");
  });

  test("no <style> tag leakage — style block is unique", () => {
    const styleTags = html.match(/<style>/g);
    expect(styleTags).not.toBeNull();
    expect(styleTags!.length).toBe(1);
  });

  test("!important flags are present on responsive overrides (override specificity)", () => {
    const css = extractStyleTag(html);
    const importantDeclarations = css.match(/!important/g);
    expect(importantDeclarations).not.toBeNull();
    expect(importantDeclarations!.length).toBe(2);
  });
});
