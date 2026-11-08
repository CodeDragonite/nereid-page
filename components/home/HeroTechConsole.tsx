"use client";
import { motion, useReducedMotion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { Terminal, Shield, Cpu, Activity, Zap, CheckCircle2, Server } from "lucide-react";

export function HeroTechConsole() {
  const reduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState<"telemetry" | "mesh" | "ai">("telemetry");
  const [logs, setLogs] = useState<string[]>([
    "[SYS] Quantum mesh initialized",
    "[NET] Low-latency edge route: 11ms",
    "[SEC] Zero-trust perimeter active",
    "[AI] Realtime inference pipeline ready",
  ]);

  // Periodic log stream
  useEffect(() => {
    if (reduced) return;
    const sampleLogs = [
      "[AI] Context stream dispatched // 1.4M tok/s",
      "[NET] CDN cache hit ratio 99.4%",
      "[SEC] mTLS handshake verified: panama-edge-01",
      "[SYS] Memory pool allocated: 0.04% pressure",
      "[AI] Vector embedding indexed in 1.2ms",
      "[NET] Auto-scaled node cluster: +3 pods",
    ];

    let i = 0;
    const interval = setInterval(() => {
      setLogs((prev) => [...prev.slice(1), sampleLogs[i % sampleLogs.length]]);
      i++;
    }, 2800);

    return () => clearInterval(interval);
  }, [reduced]);

  // Mouse tilt for the whole console
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotX.set(-((e.clientY - cy) / (rect.height / 2)) * 6);
    rotY.set(((e.clientX - cx) / (rect.width / 2)) * 6);
  };

  const handleMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "540px",
        margin: "0 auto",
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer Glow Halo */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-20px",
          borderRadius: "32px",
          background:
            "radial-gradient(ellipse at center, rgba(0,212,170,0.18) 0%, rgba(61,127,255,0.14) 40%, transparent 70%)",
          filter: "blur(24px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
        animate={reduced ? {} : { opacity: [0.6, 0.9, 0.6], scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Console Box */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 2,
          background: "linear-gradient(145deg, rgba(13,34,56,0.92) 0%, rgba(7,27,43,0.95) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0, 210, 210, 0.25)",
          borderRadius: "20px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.45), 0 0 30px rgba(0,210,210,0.12)",
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
          overflow: "hidden",
        }}
        initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Animated Cyber Accent Top Beam */}
        <div
          aria-hidden="true"
          style={{
            height: "2px",
            width: "100%",
            background: "linear-gradient(90deg, transparent, #00d4aa 30%, #3d7fff 70%, transparent)",
            boxShadow: "0 0 10px #00d4aa",
          }}
        />

        {/* Top Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 18px",
            borderBottom: "1px solid rgba(0, 210, 210, 0.12)",
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
            <span
              style={{
                fontSize: "11px",
                fontFamily: "monospace",
                color: "var(--text-muted)",
                marginLeft: "8px",
                letterSpacing: "0.06em",
              }}
            >
              NEREID_SYS // CORE_v26
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#00d4aa",
                boxShadow: "0 0 8px #00d4aa",
              }}
            />
            <span style={{ fontSize: "10px", fontWeight: "700", color: "#00d4aa", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              LIVE
            </span>
          </div>
        </div>

        {/* Console Interactive Body */}
        <div style={{ padding: "20px" }}>
          {/* Navigation Pill Switcher */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "18px",
              background: "rgba(0,0,0,0.3)",
              padding: "4px",
              borderRadius: "10px",
              border: "1px solid rgba(0,210,210,0.08)",
            }}
          >
            {(["telemetry", "mesh", "ai"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: "6px 12px",
                  borderRadius: "7px",
                  border: "none",
                  background: activeTab === tab ? "rgba(0,212,170,0.18)" : "transparent",
                  color: activeTab === tab ? "#00d4aa" : "var(--text-muted)",
                  fontSize: "11px",
                  fontWeight: "600",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                {tab === "telemetry" && <Activity size={12} />}
                {tab === "mesh" && <Server size={12} />}
                {tab === "ai" && <Zap size={12} />}
                {tab}
              </button>
            ))}
          </div>

          {/* Holographic Concentric Orb Visual */}
          <div
            style={{
              position: "relative",
              height: "170px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
              overflow: "hidden",
              borderRadius: "14px",
              background: "radial-gradient(circle at center, rgba(0,212,170,0.08) 0%, rgba(7,27,43,0.4) 70%)",
              border: "1px solid rgba(0, 210, 210, 0.1)",
            }}
          >
            {/* SVG Orbit Graphic */}
            <svg
              width="240"
              height="240"
              viewBox="0 0 240 240"
              style={{ position: "absolute", inset: "-35px auto auto calc(50% - 120px)" }}
            >
              {/* Outer Ring */}
              <motion.circle
                cx="120"
                cy="120"
                r="88"
                fill="none"
                stroke="rgba(0, 212, 170, 0.22)"
                strokeWidth="1"
                strokeDasharray="6 8"
                animate={reduced ? {} : { rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "120px 120px" }}
              />

              {/* Middle Ring */}
              <motion.circle
                cx="120"
                cy="120"
                r="64"
                fill="none"
                stroke="rgba(61, 127, 255, 0.28)"
                strokeWidth="1.5"
                strokeDasharray="14 10"
                animate={reduced ? {} : { rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "120px 120px" }}
              />

              {/* Inner Pulsing Ring */}
              <motion.circle
                cx="120"
                cy="120"
                r="40"
                fill="none"
                stroke="rgba(0, 212, 170, 0.45)"
                strokeWidth="2"
                animate={reduced ? {} : { scale: [1, 1.12, 1], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "120px 120px" }}
              />
            </svg>

            {/* Center Core Badge */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <motion.div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #00d4aa 0%, #3d7fff 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 25px rgba(0, 212, 170, 0.6)",
                  marginBottom: "8px",
                }}
                animate={reduced ? {} : { scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Cpu size={24} color="#05080f" />
              </motion.div>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#e8eef8", letterSpacing: "0.04em" }}>
                NEURAL ORCHESTRATION
              </span>
              <span style={{ fontSize: "10px", color: "var(--accent)", fontFamily: "monospace" }}>
                11ms AVG RESPONSE
              </span>
            </div>

            {/* Live Waveform Indicator in Corner */}
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "12px",
                display: "flex",
                alignItems: "flex-end",
                gap: "3px",
                height: "16px",
              }}
            >
              {[12, 22, 16, 26, 18, 30, 20].map((h, idx) => (
                <motion.span
                  key={idx}
                  style={{
                    width: "3px",
                    background: "var(--accent)",
                    borderRadius: "2px",
                  }}
                  animate={
                    reduced
                      ? { height: `${h * 0.4}px` }
                      : { height: [`${h * 0.3}px`, `${h * 0.55}px`, `${h * 0.25}px`] }
                  }
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: idx * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Metric Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                background: "rgba(0,0,0,0.25)",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid rgba(0,210,210,0.08)",
              }}
            >
              <div style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase" }}>
                Uptime
              </div>
              <div style={{ fontSize: "17px", fontWeight: "700", color: "#00d4aa", fontFamily: "monospace" }}>
                99.99%
              </div>
            </div>

            <div
              style={{
                background: "rgba(0,0,0,0.25)",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid rgba(61,127,255,0.08)",
              }}
            >
              <div style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase" }}>
                Latency
              </div>
              <div style={{ fontSize: "17px", fontWeight: "700", color: "#3d7fff", fontFamily: "monospace" }}>
                11ms
              </div>
            </div>

            <div
              style={{
                background: "rgba(0,0,0,0.25)",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid rgba(167,139,250,0.08)",
              }}
            >
              <div style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase" }}>
                Security
              </div>
              <div style={{ fontSize: "17px", fontWeight: "700", color: "#a78bfa", fontFamily: "monospace" }}>
                L4/L7 mTLS
              </div>
            </div>
          </div>

          {/* Terminal Realtime Output Feed */}
          <div
            style={{
              background: "rgba(4, 14, 24, 0.85)",
              borderRadius: "10px",
              padding: "12px 14px",
              fontFamily: "monospace",
              fontSize: "11px",
              border: "1px solid rgba(0,210,210,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "6px",
                color: "var(--text-muted)",
                fontSize: "10px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                paddingBottom: "4px",
              }}
            >
              <Terminal size={11} color="var(--accent)" />
              <span>STREAM // EXECUTION_LOGS</span>
            </div>
            {logs.map((log, idx) => (
              <motion.div
                key={idx + log}
                initial={reduced ? {} : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  color: idx === logs.length - 1 ? "#00d4aa" : "var(--text-secondary)",
                  lineHeight: "1.6",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {log}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating Orbital Badge 1 (Top Right) */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-24px",
          right: "-18px",
          zIndex: 3,
          background: "rgba(13,34,56,0.92)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(0, 212, 170, 0.4)",
          borderRadius: "14px",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4), 0 0 16px rgba(0,212,170,0.2)",
        }}
        animate={reduced ? {} : { y: [-6, 6, -6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            background: "rgba(0,212,170,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Zap size={14} color="#00d4aa" />
        </div>
        <div>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#e8eef8" }}>
            AI Automation
          </div>
          <div style={{ fontSize: "9px", color: "#00d4aa", fontFamily: "monospace" }}>
            4.2x Velocity
          </div>
        </div>
      </motion.div>

      {/* Floating Orbital Badge 2 (Bottom Left) */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-24px",
          left: "-18px",
          zIndex: 3,
          background: "rgba(13,34,56,0.92)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(61, 127, 255, 0.4)",
          borderRadius: "14px",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4), 0 0 16px rgba(61,127,255,0.2)",
        }}
        animate={reduced ? {} : { y: [6, -6, 6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            background: "rgba(61,127,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Shield size={14} color="#3d7fff" />
        </div>
        <div>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#e8eef8" }}>
            Zero-Trust Network
          </div>
          <div style={{ fontSize: "9px", color: "#3d7fff", fontFamily: "monospace" }}>
            Enterprise Hardened
          </div>
        </div>
      </motion.div>
    </div>
  );
}
