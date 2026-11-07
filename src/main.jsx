import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/unbounded";
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";
import App from "./App";
import { loadMessages, localeFromPath } from "./i18n/locales";
import "./index.css";
import "./sections.css";

// The HTML is already prerendered for this language (scripts/prerender.js),
// so the page is readable before this runs; React only attaches to it.
const locale = localeFromPath(window.location.pathname);
const root = document.getElementById("root");

loadMessages(locale).then((messages) => {
  const app = (
    <React.StrictMode>
      <App locale={locale} messages={messages} />
    </React.StrictMode>
  );
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
});
