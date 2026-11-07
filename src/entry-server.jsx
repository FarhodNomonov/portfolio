import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "node:stream";
import App from "./App";
import ru from "./lang/ru.json";
import en from "./lang/en.json";
import uz from "./lang/uz.json";

export const MESSAGES = { ru, en, uz };

/**
 * Used only at build time by scripts/prerender.js. Waits for every lazy
 * section (projects, services), so the HTML holds the whole page.
 */
export function render(locale) {
  return new Promise((resolve, reject) => {
    let html = "";
    const sink = new Writable({
      write(chunk, _enc, done) {
        html += chunk.toString();
        done();
      },
      final(done) {
        resolve(html);
        done();
      },
    });
    const { pipe } = renderToPipeableStream(
      <React.StrictMode>
        <App locale={locale} messages={MESSAGES[locale]} />
      </React.StrictMode>,
      { onAllReady: () => pipe(sink), onShellError: reject, onError: reject }
    );
  });
}
