"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  const links = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/portfolio", label: t("portfolio") },
    { href: "/upcoming", label: t("upcoming") },
    { href: "/contact", label: t("contact") },
  ];

  // pathname includes locale prefix e.g. /es/portfolio → strip it
  const pathWithoutLocale = pathname.replace(/^\/(es|en)/, "") || "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const switchLocale = () => {
    const next = locale === "es" ? "en" : "es";
    router.push(pathWithoutLocale, { locale: next });
  };

  const isActive = (href: string) => pathWithoutLocale === href;

  return (
    <header
      role="banner"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        transition: "all 0.3s ease",
        backgroundColor: scrolled ? "color-mix(in srgb, var(--bg-base) 90%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav
        aria-label="Main navigation"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        {/* Logo */}
        <Link href="/" aria-label="Nereid Systems" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image src="/nereid-logo.png" alt="Nereid Systems" width={160} height={52} priority style={{ height: "52px", width: "auto", objectFit: "contain" }} />
        </Link>

        {/* Desktop nav */}
        <ul role="list" style={{ display: "flex", alignItems: "center", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }} className="hidden-mobile">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                style={{ color: isActive(href) ? "var(--accent)" : "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem", fontWeight: "500", letterSpacing: "0.02em", transition: "color var(--transition)", position: "relative", paddingBottom: "2px" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive(href) ? "var(--accent)" : "var(--text-secondary)")}
              >
                {label}
                {isActive(href) && (
                  <span style={{ position: "absolute", bottom: "-4px", left: 0, right: 0, height: "2px", background: "var(--accent)", borderRadius: "1px" }} />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Language picker */}
          <button
            onClick={switchLocale}
            aria-label={t("switchLangLabel")}
            style={{ background: "none", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--text-secondary)", cursor: "pointer", padding: "5px 10px", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.08em", transition: "all var(--transition)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
          >
            {t("switchLang")}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            style={{ background: "none", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--text-secondary)", cursor: "pointer", padding: "7px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all var(--transition)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* CTA - desktop */}
          <Link href="/contact" className="hidden-mobile"
            style={{ background: "var(--accent)", color: "#05080f", padding: "8px 18px", borderRadius: "8px", fontSize: "0.875rem", fontWeight: "600", textDecoration: "none", transition: "all var(--transition)", display: "inline-block" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px var(--accent-glow)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
          >
            {t("contact")}
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="show-mobile"
            style={{ background: "none", border: "1px solid var(--border)", borderRadius: "8px", color: "var(--text-primary)", cursor: "pointer", padding: "7px", display: "none", alignItems: "center" }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
            style={{ backgroundColor: "var(--bg-surface)", borderBottom: "1px solid var(--border)", padding: "1rem 1.5rem 1.5rem" }}
          >
            <ul role="list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} style={{ display: "block", padding: "0.75rem 0", color: isActive(href) ? "var(--accent)" : "var(--text-primary)", textDecoration: "none", fontSize: "1rem", fontWeight: "500", borderBottom: "1px solid var(--border)" }} aria-current={isActive(href) ? "page" : undefined}>
                    {label}
                  </Link>
                </li>
              ))}
              <li style={{ paddingTop: "1rem" }}>
                <Link href="/contact" style={{ display: "block", background: "var(--accent)", color: "#05080f", padding: "10px 20px", borderRadius: "8px", textAlign: "center", textDecoration: "none", fontWeight: "600" }}>
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
