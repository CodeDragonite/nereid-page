"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { panel } from "@/lib/motion";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const links = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
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

  // Escape closes the mobile menu and returns focus to the toggle button.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

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
        transition:
          "background-color var(--dur-short) var(--ease-standard), border-color var(--dur-short) var(--ease-standard), backdrop-filter var(--dur-short) var(--ease-standard)",
        backgroundColor: scrolled ? "color-mix(in srgb, var(--bg-base) 90%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav
        aria-label={t("mainNavLabel")}
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        {/* Logo */}
        <Link href="/" aria-label={t("homeLabel")} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image src="/nereid-logo.png" alt="Nereid Systems" width={160} height={52} priority className="nav-logo" style={{ height: "52px", width: "auto", objectFit: "contain" }} />
        </Link>

        {/* Desktop nav */}
        <ul role="list" style={{ display: "flex", alignItems: "center", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }} className="hidden-mobile nav-links">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className="text-link"
                style={{ fontSize: "0.9rem", fontWeight: "500", letterSpacing: "0.02em", position: "relative", paddingBottom: "2px" }}
              >
                {label}
                {isActive(href) && (
                  <span aria-hidden="true" style={{ position: "absolute", bottom: "-4px", left: 0, right: 0, height: "2px", background: "var(--accent)", borderRadius: "1px" }} />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Language picker */}
          <button
            type="button"
            onClick={switchLocale}
            aria-label={t("switchLangLabel")}
            className="nav-btn nav-icon-btn"
            style={{ padding: "5px 10px", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.08em" }}
          >
            {t("switchLang")}
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? t("switchToLight") : t("switchToDark")}
            className="nav-btn nav-icon-btn"
            style={{ padding: "7px", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {theme === "dark" ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
          </button>

          {/* CTA - desktop */}
          <Link href="/contact" className="hidden-mobile btn-primary btn-sm">
            {t("contact")}
          </Link>

          {/* Hamburger */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="show-mobile nav-icon-btn"
            style={{ color: "var(--text-primary)", padding: "7px", display: "none", alignItems: "center" }}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            variants={panel}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ backgroundColor: "var(--bg-surface)", borderBottom: "1px solid var(--border)", padding: "1rem 1.5rem 1.5rem" }}
          >
            <ul role="list" className="nav-links" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-link"
                    aria-current={isActive(href) ? "page" : undefined}
                    style={{ display: "block", padding: "0.75rem 0", fontSize: "1rem", fontWeight: "500", borderBottom: "1px solid var(--border)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li style={{ paddingTop: "1rem" }}>
                <Link href="/contact" className="btn-primary" style={{ width: "100%" }}>
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-links .text-link[aria-current="page"] { color: var(--accent-text); }
        .nav-icon-btn {
          background: none;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          transition: border-color var(--dur-micro) var(--ease-standard), color var(--dur-micro) var(--ease-standard);
        }
        .nav-icon-btn:hover,
        .nav-icon-btn:focus-visible { border-color: var(--accent); color: var(--accent-text); }
        @media (max-width: 480px) {
          .nav-logo { width: 120px !important; height: auto !important; }
        }
        @media (max-width: 768px) {
          .nav-logo { display: none !important; }
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .nav-btn { min-width: 44px !important; min-height: 44px !important; display: flex !important; align-items: center !important; justify-content: center !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
