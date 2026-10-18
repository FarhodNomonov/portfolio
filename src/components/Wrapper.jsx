import { useState, useEffect, createContext } from "react";
import { IntlProvider } from "react-intl";
import Uzbek from "../lang/uz.json";
import Russian from "../lang/ru.json";
import English from "../lang/en.json";

export const Context = createContext();

const MESSAGES = { ru: Russian, en: English, uz: Uzbek };
const STORAGE_KEY = "lang";

// Maps a browser language tag ("ru-RU", "en-US", "uz-Latn-UZ") to one of
// our locales; anything unknown falls back to Russian.
function detectLocale(tag = "") {
  const code = tag.toLowerCase();
  if (code.startsWith("en")) return "en";
  if (code.startsWith("uz")) return "uz";
  return "ru";
}

// A saved choice wins over the browser language. localStorage can throw
// (private mode, blocked storage), so every access is guarded.
function initialLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (MESSAGES[saved]) return saved;
  } catch {}
  return detectLocale(navigator.language);
}

const Wrapper = (props) => {
  const [locale, setLocale] = useState(initialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = MESSAGES[locale]["meta.title"];
  }, [locale]);

  // Accepts a locale code or a change/click event whose target has a value.
  function selectLanguage(codeOrEvent) {
    const newLocale =
      typeof codeOrEvent === "string" ? codeOrEvent : codeOrEvent.target.value;
    if (!MESSAGES[newLocale]) return;
    setLocale(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {}
  }

  return (
    <Context.Provider value={{ locale, selectLanguage }}>
      <IntlProvider messages={MESSAGES[locale]} locale={locale}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};

export default Wrapper;
