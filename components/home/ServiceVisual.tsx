"use client";
import { motion, useReducedMotion } from "framer-motion";

interface ServiceVisualProps {
  type: "network" | "web" | "mobile" | "integration" | "ai" | "it";
  color: string;
}

export function ServiceVisual({ type, color }: ServiceVisualProps) {
  const reduced = useReducedMotion();

  if (type === "network") {
    return (
      <div style={{ height: "64px", width: "100%", position: "relative", marginBottom: "1.25rem", overflow: "hidden" }}>
        <svg width="100%" height="100%" viewBox="0 0 240 64" fill="none">
          {/* Grid lines */}
          <line x1="20" y1="32" x2="220" y2="32" stroke={color} strokeOpacity="0.2" strokeDasharray="3 3" />
          <path d="M 20 32 Q 80 10 140 32 T 220 32" stroke={color} strokeOpacity="0.3" fill="none" />
          <path d="M 20 32 Q 80 54 140 32 T 220 32" stroke={color} strokeOpacity="0.3" fill="none" />

          {/* Nodes */}
          {[20, 80, 140, 200].map((cx, i) => (
            <g key={i}>
              <circle cx={cx} cy="32" r="6" fill="#0d2238" stroke={color} strokeWidth="2" />
              <circle cx={cx} cy="32" r="2.5" fill={color} />
            </g>
          ))}

          {/* Traveling packet */}
          {!reduced && (
            <motion.circle
              r="3.5"
              fill={color}
              filter={`drop-shadow(0 0 6px ${color})`}
              animate={{
                cx: [20, 80, 140, 200],
                cy: [32, 16, 44, 32],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </svg>
      </div>
    );
  }

  if (type === "web") {
    return (
      <div style={{ height: "64px", width: "100%", position: "relative", marginBottom: "1.25rem" }}>
        <svg width="100%" height="100%" viewBox="0 0 240 64" fill="none">
          {/* Browser frame */}
          <rect x="10" y="6" width="220" height="52" rx="6" fill="rgba(0,0,0,0.25)" stroke={color} strokeOpacity="0.25" />
          {/* Header dots */}
          <circle cx="22" cy="14" r="2" fill="#ff5f56" />
          <circle cx="28" cy="14" r="2" fill="#ffbd2e" />
          <circle cx="34" cy="14" r="2" fill="#27c93f" />
          <rect x="44" y="11" width="80" height="6" rx="3" fill={color} fillOpacity="0.2" />

          {/* Content layout wires */}
          <rect x="20" y="24" width="60" height="26" rx="4" fill={color} fillOpacity="0.12" stroke={color} strokeOpacity="0.3" />
          <rect x="90" y="24" width="130" height="6" rx="3" fill="var(--text-muted)" fillOpacity="0.3" />
          <rect x="90" y="34" width="90" height="6" rx="3" fill="var(--text-muted)" fillOpacity="0.2" />
          <rect x="90" y="44" width="110" height="6" rx="3" fill={color} fillOpacity="0.4" />
        </svg>
      </div>
    );
  }

  if (type === "mobile") {
    return (
      <div style={{ height: "64px", width: "100%", position: "relative", marginBottom: "1.25rem" }}>
        <svg width="100%" height="100%" viewBox="0 0 240 64" fill="none">
          {/* Phone frame rotated/centered */}
          <rect x="85" y="4" width="70" height="56" rx="8" fill="rgba(0,0,0,0.3)" stroke={color} strokeOpacity="0.3" />
          <rect x="110" y="7" width="20" height="3" rx="1.5" fill={color} fillOpacity="0.4" />
          {/* Dynamic card inside phone */}
          <rect x="92" y="16" width="56" height="24" rx="4" fill={color} fillOpacity="0.15" />
          <circle cx="102" cy="28" r="4" fill={color} />
          <rect x="112" y="24" width="30" height="4" rx="2" fill={color} fillOpacity="0.6" />
          <rect x="112" y="30" width="20" height="3" rx="1.5" fill="var(--text-muted)" fillOpacity="0.4" />

          {/* Signal wave */}
          {!reduced && (
            <motion.circle
              cx="120"
              cy="52"
              r="3"
              fill={color}
              animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </svg>
      </div>
    );
  }

  if (type === "integration") {
    return (
      <div style={{ height: "64px", width: "100%", position: "relative", marginBottom: "1.25rem" }}>
        <svg width="100%" height="100%" viewBox="0 0 240 64" fill="none">
          {/* 3 Interlocking gears/nodes */}
          <circle cx="70" cy="32" r="18" stroke={color} strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="120" cy="32" r="18" stroke={color} strokeOpacity="0.5" strokeWidth="1.5" />
          <circle cx="170" cy="32" r="18" stroke={color} strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Connecting arrow lines */}
          <line x1="88" y1="32" x2="102" y2="32" stroke={color} strokeWidth="2" />
          <line x1="138" y1="32" x2="152" y2="32" stroke={color} strokeWidth="2" />

          {/* Rotating node pulse */}
          {!reduced && (
            <motion.circle
              cx="120"
              cy="32"
              r="6"
              fill={color}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </svg>
      </div>
    );
  }

  if (type === "ai") {
    return (
      <div style={{ height: "64px", width: "100%", position: "relative", marginBottom: "1.25rem" }}>
        <svg width="100%" height="100%" viewBox="0 0 240 64" fill="none">
          {/* Neural layers */}
          {/* Layer 1 */}
          <circle cx="50" cy="18" r="4" fill={color} fillOpacity="0.5" />
          <circle cx="50" cy="32" r="4" fill={color} fillOpacity="0.5" />
          <circle cx="50" cy="46" r="4" fill={color} fillOpacity="0.5" />

          {/* Layer 2 */}
          <circle cx="120" cy="14" r="5" fill={color} />
          <circle cx="120" cy="32" r="5" fill={color} />
          <circle cx="120" cy="50" r="5" fill={color} />

          {/* Layer 3 */}
          <circle cx="190" cy="24" r="4" fill={color} fillOpacity="0.7" />
          <circle cx="190" cy="40" r="4" fill={color} fillOpacity="0.7" />

          {/* Synapses */}
          <line x1="54" y1="18" x2="115" y2="14" stroke={color} strokeOpacity="0.25" />
          <line x1="54" y1="18" x2="115" y2="32" stroke={color} strokeOpacity="0.25" />
          <line x1="54" y1="32" x2="115" y2="32" stroke={color} strokeOpacity="0.4" />
          <line x1="54" y1="46" x2="115" y2="32" stroke={color} strokeOpacity="0.25" />
          <line x1="54" y1="46" x2="115" y2="50" stroke={color} strokeOpacity="0.25" />

          <line x1="125" y1="14" x2="186" y2="24" stroke={color} strokeOpacity="0.3" />
          <line x1="125" y1="32" x2="186" y2="24" stroke={color} strokeOpacity="0.4" />
          <line x1="125" y1="32" x2="186" y2="40" stroke={color} strokeOpacity="0.4" />
          <line x1="125" y1="50" x2="186" y2="40" stroke={color} strokeOpacity="0.3" />

          {/* Synaptic pulse traveling */}
          {!reduced && (
            <motion.circle
              r="2.5"
              fill="#ffffff"
              animate={{
                cx: [54, 120, 190],
                cy: [32, 32, 24],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </svg>
      </div>
    );
  }

  // IT & Security
  return (
    <div style={{ height: "64px", width: "100%", position: "relative", marginBottom: "1.25rem" }}>
      <svg width="100%" height="100%" viewBox="0 0 240 64" fill="none">
        {/* Rack units */}
        <rect x="40" y="8" width="160" height="14" rx="3" fill="rgba(0,0,0,0.3)" stroke={color} strokeOpacity="0.3" />
        <rect x="40" y="25" width="160" height="14" rx="3" fill="rgba(0,0,0,0.3)" stroke={color} strokeOpacity="0.3" />
        <rect x="40" y="42" width="160" height="14" rx="3" fill="rgba(0,0,0,0.3)" stroke={color} strokeOpacity="0.3" />

        {/* LED activity lights */}
        <circle cx="52" cy="15" r="2.5" fill="#27c93f" />
        <circle cx="60" cy="15" r="2.5" fill={color} />
        <circle cx="52" cy="32" r="2.5" fill="#27c93f" />
        <circle cx="60" cy="32" r="2.5" fill={color} />
        <circle cx="52" cy="49" r="2.5" fill="#27c93f" />
        <circle cx="60" cy="49" r="2.5" fill="#ffbd2e" />

        {/* Ventilator lines */}
        {[80, 95, 110, 125, 140, 155, 170, 185].map((x) => (
          <g key={x}>
            <line x1={x} y1="12" x2={x} y2="18" stroke="var(--text-muted)" strokeOpacity="0.3" />
            <line x1={x} y1="29" x2={x} y2="35" stroke="var(--text-muted)" strokeOpacity="0.3" />
            <line x1={x} y1="46" x2={x} y2="52" stroke="var(--text-muted)" strokeOpacity="0.3" />
          </g>
        ))}
      </svg>
    </div>
  );
}
