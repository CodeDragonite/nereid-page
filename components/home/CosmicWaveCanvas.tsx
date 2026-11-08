"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * CosmicWaveCanvas — Combines cosmic galaxy starfield with smooth flowing oceanic wave currents.
 * Highly optimized, zero DOM elements, low memory overhead HTML5 canvas.
 */
export function CosmicWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // 1. Galaxy Stars (3 depth layers: distant, mid, near)
    const STAR_COUNT = 45;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.7 + 0.2,
      baseAlpha: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      color: Math.random() > 0.4 ? "rgba(0, 212, 170," : Math.random() > 0.5 ? "rgba(61, 127, 255," : "rgba(255, 255, 255,",
    }));

    // 2. Cosmic Wave Currents
    const LINE_COUNT = 8;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.007;

      // Draw Galaxy Stars with soft twinkle
      for (let s = 0; s < STAR_COUNT; s++) {
        const star = stars[s];
        const currentAlpha = star.baseAlpha + Math.sin(time * 3 + s) * 0.25;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color} ${Math.max(0.1, Math.min(1, currentAlpha))})`;
        ctx.fill();
      }

      // Draw Oceanic Flow Waves
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
          i % 2 === 0
            ? `rgba(0, 212, 170, ${alpha})`
            : `rgba(61, 127, 255, ${alpha * 0.85})`;

        ctx.lineWidth = i % 2 === 0 ? 1.6 : 1.1;
        ctx.stroke();

        // Glowing data nodes traveling along streams
        if (i % 2 === 0) {
          const packetProgress = (time * 0.45 + i * 0.25) % 1;
          const px = packetProgress * width;
          const py =
            baseY +
            Math.sin(px * 0.0022 + time + i * 0.45) * 32 +
            Math.cos(px * 0.0042 - time * 0.8 + i * 0.3) * 16 +
            Math.sin(px * 0.001 + time * 1.2) * 10;

          ctx.beginPath();
          ctx.arc(px, py, 2.4, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0, 212, 170, 0.85)";
          ctx.shadowColor = "rgba(0, 212, 170, 0.9)";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [reduced]);

  if (reduced) return null;

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
