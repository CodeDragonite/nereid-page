"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const STAR_COUNT = 45;
const LINE_COUNT = 8;
const MAX_DPR = 2;
const GLOW_SPRITE_SIZE = 32;

/** Pre-render the glowing data-node once so frames use drawImage instead of shadowBlur. */
function createGlowSprite(dpr: number): HTMLCanvasElement | null {
  const sprite = document.createElement("canvas");
  const px = Math.round(GLOW_SPRITE_SIZE * dpr);
  sprite.width = px;
  sprite.height = px;
  const g = sprite.getContext("2d");
  if (!g) return null;
  const c = px / 2;
  const glow = g.createRadialGradient(c, c, 0, c, c, c);
  glow.addColorStop(0, "rgba(0, 212, 170, 0.9)");
  glow.addColorStop(0.18, "rgba(0, 212, 170, 0.75)");
  glow.addColorStop(0.45, "rgba(0, 212, 170, 0.18)");
  glow.addColorStop(1, "rgba(0, 212, 170, 0)");
  g.fillStyle = glow;
  g.fillRect(0, 0, px, px);
  g.beginPath();
  g.arc(c, c, 2.4 * dpr, 0, Math.PI * 2);
  g.fillStyle = "rgba(0, 212, 170, 0.85)";
  g.fill();
  return sprite;
}

/**
 * CosmicWaveCanvas — cosmic starfield with flowing oceanic wave currents.
 * The loop only runs while the canvas is on screen and the tab is visible.
 * With reduced motion a single static frame is drawn.
 */
export function CosmicWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId = 0;
    let running = false;
    let inView = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let glowSprite: HTMLCanvasElement | null = null;

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      height = parent?.clientHeight || window.innerHeight;
      const nextDpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      if (nextDpr !== dpr || !glowSprite) glowSprite = createGlowSprite(nextDpr);
      dpr = nextDpr;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Galaxy stars
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      baseAlpha: Math.random() * 0.6 + 0.2,
      color:
        Math.random() > 0.4
          ? "rgba(0, 212, 170,"
          : Math.random() > 0.5
            ? "rgba(61, 127, 255,"
            : "rgba(255, 255, 255,",
    }));

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let s = 0; s < STAR_COUNT; s++) {
        const star = stars[s];
        const currentAlpha = star.baseAlpha + Math.sin(time * 3 + s) * 0.25;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color} ${Math.max(0.1, Math.min(1, currentAlpha))})`;
        ctx.fill();
      }

      for (let i = 0; i < LINE_COUNT; i++) {
        const progress = i / (LINE_COUNT - 1);
        const baseY = height * 0.2 + progress * (height * 0.6);

        ctx.beginPath();
        ctx.moveTo(0, baseY);
        const step = 26;
        for (let x = 0; x <= width + step; x += step) {
          const wave1 = Math.sin(x * 0.0022 + time + i * 0.45) * 32;
          const wave2 = Math.cos(x * 0.0042 - time * 0.8 + i * 0.3) * 16;
          const wave3 = Math.sin(x * 0.001 + time * 1.2) * 10;
          ctx.lineTo(x, baseY + wave1 + wave2 + wave3);
        }

        const alpha = 0.07 + progress * 0.06;
        ctx.strokeStyle =
          i % 2 === 0 ? `rgba(0, 212, 170, ${alpha})` : `rgba(61, 127, 255, ${alpha * 0.85})`;
        ctx.lineWidth = i % 2 === 0 ? 1.6 : 1.1;
        ctx.stroke();

        // Glowing data nodes travelling along the streams
        if (i % 2 === 0 && glowSprite) {
          const packetProgress = (time * 0.45 + i * 0.25) % 1;
          const px = packetProgress * width;
          const py =
            baseY +
            Math.sin(px * 0.0022 + time + i * 0.45) * 32 +
            Math.cos(px * 0.0042 - time * 0.8 + i * 0.3) * 16 +
            Math.sin(px * 0.001 + time * 1.2) * 10;
          const half = GLOW_SPRITE_SIZE / 2;
          ctx.drawImage(glowSprite, px - half, py - half, GLOW_SPRITE_SIZE, GLOW_SPRITE_SIZE);
        }
      }
    };

    const frame = () => {
      time += 0.007;
      draw();
      animId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      animId = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(animId);
    };
    const sync = () => {
      if (inView && !document.hidden) start();
      else stop();
    };

    const handleResize = () => {
      resize();
      if (!running) draw();
    };
    window.addEventListener("resize", handleResize);

    // Reduced motion: one static frame, no loop.
    draw();
    if (reduced) {
      return () => window.removeEventListener("resize", handleResize);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0 },
    );
    observer.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", handleResize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.85,
      }}
    />
  );
}
