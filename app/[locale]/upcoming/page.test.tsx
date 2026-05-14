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

  const PassthroughArticle = ({
    children, initial, animate, exit, transition, variants, custom,
    whileHover, ref, ...props
  }: any) => React.createElement("article", props, children);

  return {
    motion: {
      div: PassthroughDiv,
      p: PassthroughP,
      h1: PassthroughH1,
      span: PassthroughSpan,
      article: PassthroughArticle,
    },
    useReducedMotion: () => false,
    useInView: () => true,
    useAnimation: () => ({}),
  };
});

// ---------------------------------------------------------------------------
// Import AFTER mocks
// ---------------------------------------------------------------------------
import UpcomingPage from "./page";

function render(): string {
  return renderToString(React.createElement(UpcomingPage));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("UpcomingPage — gradient circle responsive sizing (Task 2.1)", () => {
  let html: string;

  beforeEach(() => {
    html = render();
  });

  // =========================================================================
  // 1. Gradient circle dimensions in UpcomingHero
  // =========================================================================

  test("first gradient circle (top-left) has min(500px, 45vw)", () => {
    expect(html).toContain("min(500px, 45vw)");
  });

  test("second gradient circle (bottom-right) has min(400px, 35vw)", () => {
    expect(html).toContain("min(400px, 35vw)");
  });

  test("both gradient circles present with symmetric width/height", () => {
    const widthMin = html.match(/width:\s*min\(\d+px,\s*[\d.]+vw\)/g);
    expect(widthMin).not.toBeNull();
    expect(widthMin!.length).toBe(2);

    const heightMin = html.match(/height:\s*min\(\d+px,\s*[\d.]+vw\)/g);
    expect(heightMin).not.toBeNull();
    expect(heightMin!.length).toBe(2);
  });

  test("first circle: width=min(500px,45vw) height=min(500px,45vw) together", () => {
    expect(html).toMatch(/width:\s*min\(500px,\s*45vw\)[^<]*height:\s*min\(500px,\s*45vw\)/);
  });

  test("second circle: width=min(400px,35vw) height=min(400px,35vw) together", () => {
    expect(html).toMatch(/width:\s*min\(400px,\s*35vw\)[^<]*height:\s*min\(400px,\s*35vw\)/);
  });

  // =========================================================================
  // 2. Circle visual properties
  // =========================================================================

  test("gradient circles have border-radius: 50% and pointer-events: none", () => {
    const circles = html.match(/border-radius:\s*50%/g);
    expect(circles).not.toBeNull();
    expect(circles!.length).toBe(2);

    const pointerNone = html.match(/pointer-events:\s*none/g);
    expect(pointerNone).not.toBeNull();
    expect(pointerNone!.length).toBe(2);
  });

  test("gradient circles use radial-gradient backgrounds", () => {
    expect(html).toContain("radial-gradient(circle, rgba(52,211,153,0.06)");
    expect(html).toContain("radial-gradient(circle, rgba(251,146,60,0.06)");
  });

  // =========================================================================
  // 3. Page renders expected content
  // =========================================================================

  test("upcoming heading renders", () => {
    expect(html).toContain("id=\"upcoming-heading\"");
  });

  test("CTA button renders", () => {
    expect(html).toContain("heroCta");
  });

  test("projects section heading renders", () => {
    expect(html).toContain("id=\"projects-heading\"");
  });

  test("project cards render with timeline info", () => {
    expect(html).toContain("Q3 2026");
    expect(html).toContain("Q4 2026");
  });

  test("project tech tags render", () => {
    expect(html).toContain("Next.js");
    expect(html).toContain("Python");
    expect(html).toContain("TensorFlow");
  });

  // =========================================================================
  // 4. Edge cases — no hardcoded sizes without min()
  // =========================================================================

  test("no bare 500px width without min() for circles", () => {
    const hard500 = html.match(/width:\s*500px(?![^;]*min)/);
    const hard500h = html.match(/height:\s*500px(?![^;]*min)/);
    expect(hard500).toBeNull();
    expect(hard500h).toBeNull();
  });

  test("no bare 400px width without min() for circles", () => {
    const hard400 = html.match(/width:\s*400px(?![^;]*min)/);
    const hard400h = html.match(/height:\s*400px(?![^;]*min)/);
    expect(hard400).toBeNull();
    expect(hard400h).toBeNull();
  });

  test("bottom gradient fade overlay renders", () => {
    expect(html).toContain("linear-gradient(to bottom, transparent, var(--bg-base))");
  });
});
