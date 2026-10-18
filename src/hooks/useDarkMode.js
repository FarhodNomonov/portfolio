import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

/**
 * Dark is the default theme; a saved "light" choice wins. Toggles the "dark"
 * class on <html> (the inline script in index.html applies it before first
 * paint), which flips the CSS variables in src/index.css.
 */
export default function useDarkMode() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isDark ? "#0B0D12" : "#F6F5F1");
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    } catch {}
  }, [isDark]);

  return [isDark, () => setIsDark((prev) => !prev)];
}
