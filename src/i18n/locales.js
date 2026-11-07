// One page per language: "/" is Russian, "/uz/" and "/en/" are the others.
// The path decides the language, so search engines index every version.
export const LOCALES = ["ru", "en", "uz"];
export const DEFAULT_LOCALE = "ru";

export const pathFor = (locale) => (locale === DEFAULT_LOCALE ? "/" : `/${locale}/`);

export function localeFromPath(pathname = "/") {
  const first = pathname.split("/")[1];
  return LOCALES.includes(first) ? first : DEFAULT_LOCALE;
}

// Each dictionary is its own chunk: a visitor downloads only their language.
export const loadMessages = (locale) => import(`../lang/${locale}.json`).then((m) => m.default);
