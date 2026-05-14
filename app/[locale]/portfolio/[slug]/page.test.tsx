import { describe, test, expect, mock, beforeEach, afterEach } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";

// ---------------------------------------------------------------------------
// Module mocks — must be at top level, before the component import
// ---------------------------------------------------------------------------

mock.module("next-intl/server", () => ({
  getTranslations: async () => (key: string) => key,
  setRequestLocale: () => {},
}));

mock.module("next/link", () => ({
  default: ({ children, href, ...props }: any) =>
    React.createElement("a", { ...props, href }, children),
}));

mock.module("@/lib/portfolio", () => ({
  caseStudies: [
    {
      id: "test-1",
      title: "Test Case Study Project",
      client: "Test Client Corp",
      challenge: "A challenging project that required innovative solutions to complex technical problems.",
      solution: "We built a comprehensive solution using modern technologies and best practices.",
      outcome: "60% improvement in operational efficiency",
      tech: ["React", "TypeScript", "Node.js"],
      status: "completed" as const,
      slug: "test-project",
      category: "Development",
      color: "#34d399",
    },
  ],
}));

mock.module("@/i18n/routing", () => ({
  routing: { locales: ["en", "es"] },
}));

mock.module("@/components/Breadcrumb", () => ({
  Breadcrumb: () => null,
}));

// ---------------------------------------------------------------------------
// Import AFTER mocks
// ---------------------------------------------------------------------------
import CaseStudyPage from "./page";

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("CaseStudyPage — gradient circle responsive sizing (Task 2.1)", () => {
  // =========================================================================
  // 1. Gradient circle dimension (single circle, smaller size)
  // =========================================================================

  test("gradient circle has min(400px, 35vw) for width", async () => {
    const element = await CaseStudyPage({
      params: Promise.resolve({ slug: "test-project", locale: "en" }),
    });
    const html = renderToString(element);
    expect(html).toContain("min(400px, 35vw)");
  });

  test("gradient circle has min(400px, 35vw) for height (symmetric)", async () => {
    const element = await CaseStudyPage({
      params: Promise.resolve({ slug: "test-project", locale: "en" }),
    });
    // Same value used for both width and height
    const html = renderToString(element);
    expect(html).toMatch(/width:\s*min\(400px,\s*35vw\)[^<]*height:\s*min\(400px,\s*35vw\)/);
  });

  test("gradient circle has border-radius: 50% and pointer-events: none", async () => {
    const element = await CaseStudyPage({
      params: Promise.resolve({ slug: "test-project", locale: "en" }),
    });
    const html = renderToString(element);
    expect(html).toMatch(/border-radius:\s*50%/);
    expect(html).toMatch(/pointer-events:\s*none/);
  });

  test("gradient circle uses color-mix with study.color in radial-gradient", async () => {
    const element = await CaseStudyPage({
      params: Promise.resolve({ slug: "test-project", locale: "en" }),
    });
    const html = renderToString(element);
    // The gradient uses color-mix with the project's color
    expect(html).toMatch(/radial-gradient\(circle,\s*color-mix\(in srgb,\s*#34d399/);
  });

  // =========================================================================
  // 2. Case study content renders
  // =========================================================================

  test("renders case study title", async () => {
    const element = await CaseStudyPage({
      params: Promise.resolve({ slug: "test-project", locale: "en" }),
    });
    const html = renderToString(element);
    expect(html).toContain("Test Case Study Project");
  });

  test("renders client name and status", async () => {
    const element = await CaseStudyPage({
      params: Promise.resolve({ slug: "test-project", locale: "en" }),
    });
    const html = renderToString(element);
    expect(html).toContain("Test Client Corp");
    expect(html).toContain("completed");
  });

  test("renders challenge section", async () => {
    const element = await CaseStudyPage({
      params: Promise.resolve({ slug: "test-project", locale: "en" }),
    });
    const html = renderToString(element);
    expect(html).toContain("theChallenge");
    expect(html).toContain("A challenging project");
  });

  test("renders solution section", async () => {
    const element = await CaseStudyPage({
      params: Promise.resolve({ slug: "test-project", locale: "en" }),
    });
    const html = renderToString(element);
    expect(html).toContain("ourSolution");
    expect(html).toContain("comprehensive solution");
  });

  test("renders tech stack", async () => {
    const element = await CaseStudyPage({
      params: Promise.resolve({ slug: "test-project", locale: "en" }),
    });
    const html = renderToString(element);
    expect(html).toContain("React");
    expect(html).toContain("TypeScript");
    expect(html).toContain("Node.js");
  });

  test("renders CTA to contact page", async () => {
    const element = await CaseStudyPage({
      params: Promise.resolve({ slug: "test-project", locale: "en" }),
    });
    const html = renderToString(element);
    expect(html).toContain("wantSimilarCta");
    expect(html).toContain("/contact");
  });

  test("renders outcome banner", async () => {
    const element = await CaseStudyPage({
      params: Promise.resolve({ slug: "test-project", locale: "en" }),
    });
    const html = renderToString(element);
    expect(html).toContain("outcomePrefix");
    expect(html).toContain("60% improvement");
  });

  // =========================================================================
  // 3. Not-found state
  // =========================================================================

  test("renders not-found state when slug does not match", async () => {
    const element = await CaseStudyPage({
      params: Promise.resolve({ slug: "nonexistent-slug", locale: "en" }),
    });
    const html = renderToString(element);
    expect(html).toContain("notFoundHeading");
    expect(html).toContain("notFoundBody");
    expect(html).toContain("notFoundCta");
  });

  test("not-found page links back to /portfolio", async () => {
    const element = await CaseStudyPage({
      params: Promise.resolve({ slug: "nonexistent-slug", locale: "en" }),
    });
    const html = renderToString(element);
    expect(html).toContain("/portfolio");
  });

  // =========================================================================
  // 4. Edge cases — no hardcoded sizes without min()
  // =========================================================================

  test("no bare 400px width without min() for the gradient circle", async () => {
    const element = await CaseStudyPage({
      params: Promise.resolve({ slug: "test-project", locale: "en" }),
    });
    const html = renderToString(element);
    const hard400 = html.match(/(?<!min\()width:\s*400px(?![^;]*min)/);
    const hard400h = html.match(/(?<!min\()height:\s*400px(?![^;]*min)/);
    expect(hard400).toBeNull();
    expect(hard400h).toBeNull();
  });
});
