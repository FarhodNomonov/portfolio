// Checks that ru/en/uz have identical keys and that every message id used
// in src/ exists. Run: npm run check:i18n
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const LOCALES = ["ru", "en", "uz"];
const dicts = Object.fromEntries(
  LOCALES.map((l) => [l, JSON.parse(readFileSync(`src/lang/${l}.json`, "utf8"))])
);

let failed = false;
const fail = (msg) => {
  failed = true;
  console.error(`✗ ${msg}`);
};

const all = new Set(LOCALES.flatMap((l) => Object.keys(dicts[l])));
for (const l of LOCALES) {
  const missing = [...all].filter((k) => !(k in dicts[l]));
  if (missing.length) fail(`${l}.json is missing: ${missing.join(", ")}`);
  const empty = Object.entries(dicts[l]).filter(([, v]) => !String(v).trim());
  if (empty.length) fail(`${l}.json has empty values: ${empty.map(([k]) => k).join(", ")}`);
}

// Any string literal in a message namespace counts as a used id (covers JSX
// props, formatMessage calls, ternaries and the id constants components map).
const files = [];
const walk = (dir) =>
  readdirSync(dir).forEach((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(jsx?|tsx?)$/.test(p)) files.push(p);
  });
walk("src");

const used = new Set();
const NAMESPACES = new Set([...all].map((k) => k.split(".")[0]));
const re = /["']([a-z][\w-]*(?:\.[\w-]+)*)["']/g;
for (const f of files) {
  for (const m of readFileSync(f, "utf8").matchAll(re)) {
    const id = m[1];
    if (id === "name" ? all.has(id) : id.includes(".") && NAMESPACES.has(id.split(".")[0])) used.add(id);
  }
}
const unknown = [...used].filter((k) => !all.has(k));
if (unknown.length) fail(`ids used in code but not in json: ${unknown.join(", ")}`);
const unused = [...all].filter((k) => !used.has(k));
if (unused.length) console.warn(`! keys not referenced literally in code: ${unused.join(", ")}`);

if (failed) process.exit(1);
console.log(`✓ ${all.size} keys, identical in ${LOCALES.join("/")}; ${used.size} ids used in code all exist`);
