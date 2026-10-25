/**
 * "Night Lab" design system. Colors are CSS variables (RGB channels) defined
 * in src/index.css for both themes, so every utility like `bg-surface` or
 * `text-muted/70` switches with the `dark` class on <html>.
 */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Unbounded Variable"', "system-ui", "sans-serif"],
        sans: ['"Manrope Variable"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono Variable"', "ui-monospace", "monospace"],
        // CRM mockups only; the font itself is loaded by the CRM chunk.
        crm: ['"Fraunces Variable"', "Georgia", "serif"],
      },
      colors: {
        bg: token("bg"),
        surface: token("surface"),
        "surface-2": token("surface-2"),
        ink: token("text"),
        muted: token("muted"),
        // Text-safe accent: lime on dark, deep olive on light (AA contrast).
        "accent-ink": token("accent-ink"),
        lime: "#C6FF3D",
        cyan: "#3DE0FF",
        night: "#0B0D12",
        // "Architect" — the CRM client's own brand, used only inside its
        // mockups and fixed in both site themes.
        crm: {
          bg: "#F6F3EC",
          card: "#FFFDF8",
          line: "#E5DFD2",
          ink: "#1B2433",
          muted: "#5B616C",
          navy: "#0F1B2D",
          brass: "#C9A24B",
          free: "#2F8F6B",
          hold: "#D49B2E",
          sold: "#B5523B",
          off: "#9AA1AC",
        },
      },
      borderColor: {
        line: "var(--line)",
      },
      borderRadius: {
        card: "20px",
        panel: "28px",
      },
      maxWidth: {
        site: "1200px",
      },
      backgroundImage: {
        accent: "linear-gradient(90deg, #C6FF3D 0%, #3DE0FF 100%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(198,255,61,.25), 0 0 32px -4px rgba(198,255,61,.35)",
        "glow-soft": "0 0 60px -20px var(--glow)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        pulseDot: {
          "0%": { transform: "scale(1)", opacity: ".7" },
          "100%": { transform: "scale(2.6)", opacity: "0" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "pulse-dot": "pulseDot 1.8s cubic-bezier(0,0,.2,1) infinite",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
