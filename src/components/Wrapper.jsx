import { useState, useEffect, createContext } from "react";
import { IntlProvider } from "react-intl";
import { loadMessages, pathFor } from "../i18n/locales";

export const Context = createContext();

const STORAGE_KEY = "lang";

/**
 * Locale and its messages come from the caller: the prerender passes them
 * for each page, the browser reads them from the URL (see main.jsx).
 * Switching language loads the other dictionary, then moves to its URL
 * without a reload; Back/Forward switch back.
 */
const Wrapper = ({ locale: initialLocale, messages: initialMessages, children }) => {
  const [{ locale, messages }, setState] = useState({ locale: initialLocale, messages: initialMessages });

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = messages["meta.title"];
  }, [locale, messages]);

  useEffect(() => {
    const onPop = () => {
      const code = window.location.pathname.split("/")[1] || "ru";
      switchTo(["en", "uz"].includes(code) ? code : "ru", false);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  });

  async function switchTo(newLocale, push = true) {
    if (newLocale === locale) return;
    const next = await loadMessages(newLocale);
    setState({ locale: newLocale, messages: next });
    if (push) history.pushState(null, "", pathFor(newLocale) + window.location.hash);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {}
  }

  return (
    <Context.Provider value={{ locale, selectLanguage: switchTo }}>
      <IntlProvider messages={messages} locale={locale}>
        {children}
      </IntlProvider>
    </Context.Provider>
  );
};

export default Wrapper;
