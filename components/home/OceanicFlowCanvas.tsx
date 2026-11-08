"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * OceanicFlowCanvas — Bathymetric topographic currents representing "Nereid Systems"
 * Highly optimized, zero-DOM-overhead HTML5 canvas with smooth undulating currents
 * and gentle bioluminescent data particles.
 */
export function OceanicFlowCanvas() {
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
    window.addEventListener("resize", handleResize, { passive: true });

    // Stream lines configuration
    const LINE_COUNT = 7;
    let time = 0;

    // Lightweight ambient particles (drawn directly on canvas, zero DOM elements)
    const PARTICLE_COUNT = 18;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.006;

      // 1. Draw smooth oceanic currents
      for (let i = 0; i < LINE_COUNT; i++) {
        const progress = i / (LINE_COUNT - 1);
        const baseY = height * 0.22 + progress * (height * 0.6);

        ctx.beginPath();
        ctx.moveTo(0, baseY);

        const step = 28;
        for (let x = 0; x <= width + step; x += step) {
          const wave1 = Math.sin(x * 0.0022 + time + i * 0.5) * 32;
          const wave2 = Math.cos(x * 0.0045 - time * 0.7 + i * 0.35) * 16;
          ctx.lineTo(x, baseY + wave1 + wave2);
        }

        const alpha = 0.08 + progress * 0.06;
        ctx.strokeStyle =
          i % 2 === 0
            ? `rgba(0, 212, 170, ${alpha})`
            : `rgba(61, 127, 255, ${alpha * 0.85})`;

        ctx.lineWidth = i % 2 === 0 ? 1.5 : 1;
        ctx.stroke();

        // Single traveling packet per alternate line
        if (i % 2 === 0) {
          const packetProgress = (time * 0.5 + i * 0.25) % 1;
          const px = packetProgress * width;
          const py =
            baseY +
            Math.sin(px * 0.0022 + time + i * 0.5) * 32 +
            Math.cos(px * 0.0045 - time * 0.7 + i * 0.35) * 16;

          ctx.beginPath();
          ctx.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0, 212, 170, 0.75)";
          ctx.fill();
        }
      }

      // 2. Draw ambient particles
      for (let j = 0; j < PARTICLE_COUNT; j++) {
        const p = particles[j];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 170, ${p.alpha})`;
        ctx.fill();
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
