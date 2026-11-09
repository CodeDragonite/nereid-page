"use client";
import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

type Theme = "dark" | "light";
const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "dark", toggle: () => {} });

/*
 * The source of truth is the `light` class on <html>, which the pre-paint
 * script in app/[locale]/layout.tsx sets from localStorage before hydration.
 * useSyncExternalStore renders the server snapshot ("dark") during hydration,
 * then switches to the real value, so there is no hydration mismatch and no
 * second write of the class.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("light") ? "light" : "dark";

const getServerSnapshot = (): Theme => "dark";

/**
 * Swap the theme with every transition suspended for one frame, so all
 * colours change at once instead of each element easing at its own speed.
 */
function applyThemeWithoutTransitions(next: Theme) {
  const style = document.createElement("style");
  style.textContent = "*,*::before,*::after{transition:none!important}";
  document.head.appendChild(style);

  document.documentElement.classList.toggle("light", next === "light");

  // Force a style recalc so the new colours are committed with transitions off.
  void window.getComputedStyle(document.body).backgroundColor;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => style.remove());
  });
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("ns-theme", next);
    } catch {
      // Storage unavailable (private mode): the theme still applies for this page view.
    }
    applyThemeWithoutTransitions(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
