import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <p style={{ fontFamily: "var(--font-display)", fontSize: "5rem", color: "var(--accent)", lineHeight: 1 }}>
        404
      </p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--text-primary)" }}>
        Page not found
      </h1>
      <p style={{ color: "var(--text-secondary)", maxWidth: "360px", lineHeight: "1.6" }}>
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "0.5rem",
          background: "var(--accent)",
          color: "#05080f",
          padding: "11px 22px",
          borderRadius: "8px",
          fontWeight: "600",
          textDecoration: "none",
        }}
      >
        Back to home
      </Link>
    </div>
  );
}
