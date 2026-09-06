import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

/**
 * Persists the user's light/dark choice to localStorage and falls back to
 * the OS preference on first visit. Toggles the "dark" class on <html>,
 * which is what every `dark:` Tailwind utility in the app reacts to.
 */
export default function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  return [isDark, () => setIsDark((prev) => !prev)];
}
