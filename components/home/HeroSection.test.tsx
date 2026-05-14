import { describe, test, expect, mock, beforeEach, afterEach } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";

// ---------------------------------------------------------------------------
// Module mocks — must be at top level, before the component import
// ---------------------------------------------------------------------------

mock.module("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

mock.module("next/link", () => ({
  default: ({ children, href, ...props }: any) =>
    React.createElement("a", { ...props, href }, children),
}));

mock.module("framer-motion", () => {
  const PassthroughDiv = ({
    children, initial, animate, exit, transition, variants, custom,
    layout, layoutId, whileHover, whileTap, whileInView, whileFocus,
    onAnimationStart, onAnimationComplete, onHoverStart, onHoverEnd,
    onTap, onTapStart, onTapCancel, ...props
  }: any) => React.createElement("div", props, children);

  const PassthroughP = ({
    children, initial, animate, exit, transition, variants, custom, ...props
  }: any) => React.createElement("p", props, children);

  const PassthroughH1 = ({
    children, initial, animate, exit, transition, variants, custom, ...props
  }: any) => React.createElement("h1", props, children);

  const PassthroughSpan = ({
    children, initial, animate, exit, transition, variants, custom, ...props
  }: any) => React.createElement("span", props, children);

  return {
    motion: { div: PassthroughDiv, p: PassthroughP, h1: PassthroughH1, span: PassthroughSpan },
    useReducedMotion: () => false,
    useAnimation: () => ({}),
    useInView: () => false,
  };
});

// ---------------------------------------------------------------------------
// Import AFTER mocks
// ---------------------------------------------------------------------------
import { HeroSection } from "./HeroSection";

function render(): string {
  return renderToString(React.createElement(HeroSection));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("HeroSection — gradient circle responsive sizing (Task 2.1)", () => {
  let html: string;

  beforeEach(() => {
    html = render();
  });

  // =========================================================================
  // 1. Gradient circle dimensions
  // =========================================================================

  test("first gradient circle (top-left) has min(500px, 45vw)", () => {
    expect(html).toContain("min(500px, 45vw)");
  });

  test("second gradient circle (bottom-right) has min(400px, 35vw)", () => {
    expect(html).toContain("min(400px, 35vw)");
  });

  test("both gradient circles use width=height (same min() for both dimensions)", () => {
    // Find all divs with min() sizing and verify symmetry
    const minSizing = html.match(/width:\s*min\(\d+px,\s*[\d.]+vw\)/g);
    expect(minSizing).not.toBeNull();
    expect(minSizing!.length).toBe(2);

    const heightSizing = html.match(/height:\s*min\(\d+px,\s*[\d.]+vw\)/g);
    expect(heightSizing).not.toBeNull();
    expect(heightSizing!.length).toBe(2);
  });

  test("first circle uses specific values: width=min(500px,45vw) height=min(500px,45vw)", () => {
    // Check that the 500px/45vw pair appears for both width and height
    const circle1Alt = /width:\s*min\(500px,\s*45vw\)[^<]*height:\s*min\(500px,\s*45vw\)/;
    expect(html).toMatch(circle1Alt);
  });

  test("second circle uses specific values: width=min(400px,35vw) height=min(400px,35vw)", () => {
    const circle2Alt = /width:\s*min\(400px,\s*35vw\)[^<]*height:\s*min\(400px,\s*35vw\)/;
    expect(html).toMatch(circle2Alt);
  });

  // =========================================================================
  // 2. Circle visual properties
  // =========================================================================

  test("gradient circles have border-radius: 50%", () => {
    const circleDivs = html.match(/border-radius:\s*50%/g);
    expect(circleDivs).not.toBeNull();
    expect(circleDivs!.length).toBe(2);
  });

  test("gradient circles have pointer-events: none", () => {
    const pointerNone = html.match(/pointer-events:\s*none/g);
    expect(pointerNone).not.toBeNull();
    expect(pointerNone!.length).toBe(2);
  });

  test("gradient circles have position: absolute", () => {
    const absPosition = html.match(/position:\s*absolute/g);
    expect(absPosition).not.toBeNull();
    expect(absPosition!.length).toBeGreaterThanOrEqual(2);
  });

  test("gradient circles use radial-gradient background", () => {
    expect(html).toContain("radial-gradient(circle, rgba(0,210,210,0.06)");
    expect(html).toContain("radial-gradient(circle, rgba(61,127,255,0.06)");
  });

  // =========================================================================
  // 3. Hero section renders key elements
  // =========================================================================

  test("hero heading renders", () => {
    expect(html).toContain("id=\"hero-heading\"");
  });

  test("primary CTA button renders", () => {
    expect(html).toContain("ctaPrimary");
  });

  test("secondary CTA button renders", () => {
    expect(html).toContain("ctaSecondary");
  });

  test("stats section renders with stat values", () => {
    expect(html).toContain("stat2Value");
    expect(html).toContain("stat3Value");
  });

  test("tag/badge renders", () => {
    expect(html).toContain("tag");
  });

  // =========================================================================
  // 4. Edge cases — no unexpected sizing
  // =========================================================================

  test("no hardcoded circle sizes of 500px or 400px without min()", () => {
    // All circle sizing should use min()
    const hardcoded500 = html.match(/width:\s*500px(?!;.*min)/);
    const hardcoded400 = html.match(/width:\s*400px(?!;.*min)/);
    const hardcoded500h = html.match(/height:\s*500px(?!;.*min)/);
    const hardcoded400h = html.match(/height:\s*400px(?!;.*min)/);
    // If min() is used, width/height will be declared BEFORE the px value
    // e.g. "width: min(500px, 45vw)" — so width:500px might match.
    // Actually, "width: min(500px" contains "500px" but it's part of min()
    // So just check there's no bare "width: 500px" without "min(" before it
    expect(hardcoded500).toBeNull();
    expect(hardcoded400).toBeNull();
    expect(hardcoded500h).toBeNull();
    expect(hardcoded400h).toBeNull();
  });

  test("section has role region and aria-labelledby", () => {
    expect(html).toContain("aria-labelledby=\"hero-heading\"");
  });

  test("bottom gradient fade overlay renders", () => {
    // Linear gradient overlay at the bottom
    expect(html).toContain("linear-gradient(to bottom, transparent, var(--bg-base))");
  });
});
