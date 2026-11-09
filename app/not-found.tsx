import Link from "next/link";
import "./globals.css";

/**
 * Root fallback 404, only reached for requests that never matched a locale
 * (the localized page is app/[locale]/not-found.tsx). The root layout passes
 * children through, so this page supplies its own <html>/<body>, and with no
 * locale known it shows both languages.
 */
export default function NotFound() {
  return (
    <html lang="es">
      <body>
        <main
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
          <p style={{ fontFamily: "var(--font-display)", fontSize: "5rem", color: "var(--accent-text)", lineHeight: 1 }}>
            404
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--text-primary)" }}>
            Página no encontrada <span lang="en">· Page not found</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: "420px", lineHeight: "1.6" }}>
            La página que buscas no existe o fue movida.{" "}
            <span lang="en">The page you&apos;re looking for doesn&apos;t exist or may have moved.</span>
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.5rem" }}>
            <Link href="/es" className="btn-primary">
              Volver al inicio
            </Link>
            <Link href="/en" className="btn-secondary" lang="en">
              Back to home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
