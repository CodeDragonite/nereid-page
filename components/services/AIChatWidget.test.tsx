import { describe, test, expect, mock, beforeEach, afterEach } from "bun:test";
import React from "react";
import { renderToString } from "react-dom/server";

mock.module("framer-motion", () => {
  const Passthrough = ({
    children, initial, animate, exit, transition, variants, custom,
    layout, layoutId, whileHover, whileTap, whileInView, whileFocus,
    onAnimationStart, onAnimationComplete, onHoverStart, onHoverEnd,
    onTap, onTapStart, onTapCancel,
    ...props
  }: any) => React.createElement("div", props, children);

  return {
    motion: { div: Passthrough, button: Passthrough },
    AnimatePresence: ({ children }: any) => children,
    useAnimation: () => ({}),
    useInView: () => false,
  };
});

import { AIChatWidget } from "./AIChatWidget";

describe("AIChatWidget — responsive sizing (Task 1.2)", () => {
  // =========================================================================
  // 1. Chat button (always rendered even when window is closed)
  // =========================================================================

  test("chat open button renders with correct aria-label", () => {
    const html = renderToString(React.createElement(AIChatWidget));
    expect(html).toContain("aria-label=\"Open AI chat assistant\"");
  });

  test("chat button has fixed positioning at bottom-right with z-index", () => {
    const html = renderToString(React.createElement(AIChatWidget));
    // CSS inline styles are serialized without space after colon
    expect(html).toContain("position:fixed");
    expect(html).toContain("bottom:24px");
    expect(html).toContain("right:24px");
    expect(html).toContain("z-index:1000");
  });

  test("chat button is 56x56px with border-radius 50%", () => {
    const html = renderToString(React.createElement(AIChatWidget));
    expect(html).toContain("width:56px");
    expect(html).toContain("height:56px");
    expect(html).toContain("border-radius:50%");
  });

  // =========================================================================
  // 2. Source-level verification of chat window CSS values
  //    (chat window is hidden by default — isOpen=false — so inline styles
  //    for width/height only exist in source code, not in SSR output)
  // =========================================================================

  test("source code sets chat window width to min(380px, calc(100vw - 32px))", () => {
    const fs = require("fs");
    const source = fs.readFileSync(
      "/Users/dragon/Documents/develop/nereid-page/components/services/AIChatWidget.tsx",
      "utf-8"
    );
    expect(source).toContain("min(380px, calc(100vw - 32px))");
  });

  test("source code sets chat window height to min(500px, calc(100vh - 120px))", () => {
    const fs = require("fs");
    const source = fs.readFileSync(
      "/Users/dragon/Documents/develop/nereid-page/components/services/AIChatWidget.tsx",
      "utf-8"
    );
    expect(source).toContain("min(500px, calc(100vh - 120px))");
  });

  test("both width and height min() appear in the same style object in source", () => {
    const fs = require("fs");
    const source = fs.readFileSync(
      "/Users/dragon/Documents/develop/nereid-page/components/services/AIChatWidget.tsx",
      "utf-8"
    );
    // The style object should contain both min() values
    expect(source).toContain("min(380px, calc(100vw - 32px))");
    expect(source).toContain("min(500px, calc(100vh - 120px))");
    // They should appear in sequence (width then height)
    const widthIdx = source.indexOf("min(380px, calc(100vw - 32px))");
    const heightIdx = source.indexOf("min(500px, calc(100vh - 120px))");
    expect(widthIdx).toBeGreaterThan(0);
    expect(heightIdx).toBeGreaterThan(widthIdx);
  });

  test("source uses min() function for both width and height", () => {
    const fs = require("fs");
    const source = fs.readFileSync(
      "/Users/dragon/Documents/develop/nereid-page/components/services/AIChatWidget.tsx",
      "utf-8"
    );
    // Verify the component uses the min() CSS function
    const minMatches = source.match(/min\(\d+px,\s*calc\(/g);
    expect(minMatches).not.toBeNull();
    expect(minMatches!.length).toBe(2); // one for width, one for height
  });

  // =========================================================================
  // 3. Content verification via source (since window is inside isOpen block)
  // =========================================================================

  test("source contains Nereid AI Assistant header", () => {
    const fs = require("fs");
    const source = fs.readFileSync(
      "/Users/dragon/Documents/develop/nereid-page/components/services/AIChatWidget.tsx",
      "utf-8"
    );
    expect(source).toContain("Nereid AI Assistant");
  });

  test("source contains close button aria-label", () => {
    const fs = require("fs");
    const source = fs.readFileSync(
      "/Users/dragon/Documents/develop/nereid-page/components/services/AIChatWidget.tsx",
      "utf-8"
    );
    expect(source).toContain('aria-label="Close chat"');
  });

  test("source contains send button aria-label", () => {
    const fs = require("fs");
    const source = fs.readFileSync(
      "/Users/dragon/Documents/develop/nereid-page/components/services/AIChatWidget.tsx",
      "utf-8"
    );
    expect(source).toContain('aria-label="Send message"');
  });

  test("source contains chat window positioning values", () => {
    const fs = require("fs");
    const source = fs.readFileSync(
      "/Users/dragon/Documents/develop/nereid-page/components/services/AIChatWidget.tsx",
      "utf-8"
    );
    expect(source).toContain("bottom: '88px'");
    expect(source).toContain("right: '24px'");
  });

  test("source contains initial assistant welcome message", () => {
    const fs = require("fs");
    const source = fs.readFileSync(
      "/Users/dragon/Documents/develop/nereid-page/components/services/AIChatWidget.tsx",
      "utf-8"
    );
    // The source has escaped single quotes: 'Hi! I\'m the Nereid AI assistant...'
    expect(source).toContain("I\\'m the Nereid AI assistant");
  });

  test("source contains placeholder text", () => {
    const fs = require("fs");
    const source = fs.readFileSync(
      "/Users/dragon/Documents/develop/nereid-page/components/services/AIChatWidget.tsx",
      "utf-8"
    );
    expect(source).toContain("Describe your project idea");
  });

  // =========================================================================
  // 4. Edge cases — not accidentally using hardcoded pixel sizes
  // =========================================================================

  test("source does not use a bare width: '380px' (should be wrapped in min())", () => {
    const fs = require("fs");
    const source = fs.readFileSync(
      "/Users/dragon/Documents/develop/nereid-page/components/services/AIChatWidget.tsx",
      "utf-8"
    );
    // Find width: '380px' but NOT followed by , calc (which would be inside min())
    const bareWidth = source.match(/width:\s*'380px'(?!,)/);
    expect(bareWidth).toBeNull();
  });

  test("source does not use a bare height: '500px' (should be wrapped in min())", () => {
    const fs = require("fs");
    const source = fs.readFileSync(
      "/Users/dragon/Documents/develop/nereid-page/components/services/AIChatWidget.tsx",
      "utf-8"
    );
    const bareHeight = source.match(/height:\s*'500px'(?!,)/);
    expect(bareHeight).toBeNull();
  });

  test("z-index: 1000 appears for both button and window in source", () => {
    const fs = require("fs");
    const source = fs.readFileSync(
      "/Users/dragon/Documents/develop/nereid-page/components/services/AIChatWidget.tsx",
      "utf-8"
    );
    const zIndexMatches = source.match(/zIndex:\s*1000/g);
    expect(zIndexMatches).not.toBeNull();
    expect(zIndexMatches!.length).toBe(2);
  });
});
