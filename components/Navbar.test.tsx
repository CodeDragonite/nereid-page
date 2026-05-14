import { describe, test, expect, mock, beforeEach, afterEach } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";

// ---------------------------------------------------------------------------
// Module mocks — must be at top level, before the component import
// ---------------------------------------------------------------------------

mock.module("next/navigation", () => ({
  usePathname: () => "/en",
}));

mock.module("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

mock.module("@/i18n/navigation", () => ({
  useRouter: () => ({ push: () => {} }),
}));

mock.module("./ThemeProvider", () => ({
  useTheme: () => ({ theme: "dark", toggle: () => {} }),
}));

mock.module("next/link", () => ({
  default: ({ children, href, ...props }: any) =>
    React.createElement("a", { ...props, href }, children),
}));

mock.module("next/image", () => ({
  default: (props: any) => React.createElement("img", props),
}));

mock.module("framer-motion", () => {
  const Passthrough = ({
    children, initial, animate, exit, transition, variants, custom,
    layout, layoutId, whileHover, whileTap, whileInView, whileFocus,
    onAnimationStart, onAnimationComplete, onHoverStart, onHoverEnd,
    onTap, onTapStart, onTapCancel,
    ...props
  }: any) => React.createElement("div", props, children);

  return {
    motion: { div: Passthrough },
    AnimatePresence: ({ children }: any) => children,
    useAnimation: () => ({}),
    useInView: () => false,
  };
});

// ---------------------------------------------------------------------------
// Import AFTER mocks
// ---------------------------------------------------------------------------
import { Navbar } from "./Navbar";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function extractStyleTag(html: string): string {
  const match = html.match(/<style>([\s\S]*?)<\/style>/);
  return match?.[1]?.trim() ?? "";
}

function render(): string {
  return renderToString(React.createElement(Navbar));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("Navbar — responsive styling (Task 2.2)", () => {
  let html: string;
  let css: string;

  beforeEach(() => {
    html = render();
    css = extractStyleTag(html);
  });

  // =========================================================================
  // 1. Logo sizing at <480px
  // =========================================================================

  test("style tag contains .nav-logo width: 120px media query at 480px", () => {
    expect(css).toContain("@media (max-width: 480px)");
    expect(css).toContain(".nav-logo");
    expect(css).toContain("width: 120px !important");
  });

  // =========================================================================
  // 2. Nav button touch targets at <768px
  // =========================================================================

  test("style tag contains .nav-btn min-width: 44px at 768px breakpoint", () => {
    expect(css).toContain("@media (max-width: 768px)");
    expect(css).toContain(".nav-btn");
    expect(css).toContain("min-width: 44px !important");
  });

  test("style tag contains .nav-btn min-height: 44px at 768px breakpoint", () => {
    expect(css).toContain("@media (max-width: 768px)");
    expect(css).toContain(".nav-btn");
    expect(css).toContain("min-height: 44px !important");
  });

  test(".nav-btn has both min-width and min-height in same rule", () => {
    const navBtnBlock = css.match(/\.nav-btn\s*\{[^}]*\}/);
    expect(navBtnBlock).not.toBeNull();
    expect(navBtnBlock![0]).toContain("min-width: 44px");
    expect(navBtnBlock![0]).toContain("min-height: 44px");
  });

  // =========================================================================
  // 3. Media query structure
  // =========================================================================

  test("all three media queries are present", () => {
    const mediaQueries = css.match(/@media\s*\([^)]+\)\s*\{/g);
    expect(mediaQueries).not.toBeNull();
    // Expected: max-width 480px, max-width 768px, min-width 769px
    expect(mediaQueries!.length).toBe(3);
  });

  test("480px breakpoint exists for logo scaling", () => {
    expect(css).toContain("max-width: 480px");
  });

  test("768px breakpoint exists for mobile menu and nav-btn sizing", () => {
    expect(css).toContain("max-width: 768px");
  });

  test("769px breakpoint exists for hiding mobile elements on desktop", () => {
    expect(css).toContain("min-width: 769px");
  });

  // =========================================================================
  // 4. Mobile visibility classes
  // =========================================================================

  test("hidden-mobile class has display:none at 768px", () => {
    const mediaStart = css.indexOf("@media (max-width: 768px)");
    expect(mediaStart).toBeGreaterThanOrEqual(0);
    const afterMedia = css.slice(mediaStart);
    expect(afterMedia).toContain(".hidden-mobile");
    expect(afterMedia).toContain("display: none !important");
  });

  test("show-mobile class has display:flex at 768px", () => {
    // Check that the 768px media query contains both classes
    const mediaStart = css.indexOf("@media (max-width: 768px)");
    expect(mediaStart).toBeGreaterThanOrEqual(0);
    const afterMedia = css.slice(mediaStart);
    expect(afterMedia).toContain(".show-mobile");
    expect(afterMedia).toContain("display: flex !important");
  });

  test("show-mobile has display:none at min-width 769px", () => {
    const mediaStart = css.indexOf("@media (min-width: 769px)");
    expect(mediaStart).toBeGreaterThanOrEqual(0);
    const afterMedia = css.slice(mediaStart);
    expect(afterMedia).toContain(".show-mobile");
    expect(afterMedia).toContain("display: none !important");
  });

  // =========================================================================
  // 5. Element presence — navbar renders expected content
  // =========================================================================

  test("logo image renders with nav-logo class", () => {
    expect(html).toContain("nereid-logo.png");
    expect(html).toContain("nav-logo");
  });

  test("nav links render (home, services, upcoming, contact)", () => {
    expect(html).toContain("home");
    expect(html).toContain("services");
    expect(html).toContain("upcoming");
    expect(html).toContain("contact");
  });

  test("language switch button renders", () => {
    expect(html).toContain("aria-label=\"switchLangLabel\"");
    expect(html).toContain("switchLang");
  });

  test("theme toggle button renders", () => {
    expect(html).toContain("aria-label=\"Switch to light mode\"");
  });

  test("hamburger menu button renders with aria-controls", () => {
    expect(html).toContain("aria-controls=\"mobile-menu\"");
    expect(html).toContain("aria-label=\"Open menu\"");
  });

  // =========================================================================
  // 6. Edge cases — no !important leakage
  // =========================================================================

  test("!important flags present only on responsive override rules", () => {
    const importantMatches = css.match(/!important/g);
    expect(importantMatches).not.toBeNull();
    // Expected: nav-logo width, hidden-mobile display, show-mobile display,
    // nav-btn min-width, nav-btn min-height, nav-btn display x2, nav-btn align-items, nav-btn justify-content,
    // show-mobile display (769px)
    // Total is in the range of 8-10 declarations
    expect(importantMatches!.length).toBeGreaterThanOrEqual(8);
    expect(importantMatches!.length).toBeLessThanOrEqual(12);
  });

  test("style block is unique — no duplicate style tags", () => {
    const styleTags = html.match(/<style>/g);
    expect(styleTags).not.toBeNull();
    expect(styleTags!.length).toBe(1);
  });
});
