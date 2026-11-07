import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

/**
 * Dark is the default theme; a saved "light" choice wins. The inline script
 * in index.html sets the "dark" class on <html> before first paint. The
 * prerendered HTML can't know the visitor's choice, so the state starts
 * empty (rendered as dark) and is read from <html> after mount; nothing is
 * written back until then.
 */
export default function useDarkMode() {
  const [isDark, setIsDark] = useState(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (isDark === null) return;
    document.documentElement.classList.toggle("dark", isDark);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isDark ? "#0B0D12" : "#F6F5F1");
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    } catch {}
  }, [isDark]);

  return [isDark ?? true, () => setIsDark((prev) => !(prev ?? true))];
}
