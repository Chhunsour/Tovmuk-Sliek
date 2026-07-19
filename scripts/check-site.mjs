import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const pages = readdirSync(root).filter((file) => extname(file) === ".html").sort();
const missing = new Set();

for (const page of pages) {
  const html = readFileSync(resolve(root, page), "utf8");
  for (const match of html.matchAll(/(?:src|href)=["']([^"'#?]+)["']/g)) {
    const ref = match[1];
    if (/^(?:https?:|mailto:|tel:|javascript:|\/\/)/.test(ref)) continue;
    if (!existsSync(resolve(root, ref))) missing.add(`${page}: ${ref}`);
  }
}

const config = readFileSync(resolve(root, "assets/js/store-config.js"), "utf8");
const products = [...config.matchAll(/assets\/img\/khmer\/products\/[^"']+\.webp/g)].map((match) => match[0]);
for (const image of products) if (!existsSync(resolve(root, image))) missing.add(`config: ${image}`);

if (pages.length < 32) missing.add(`expected at least 32 HTML pages, found ${pages.length}`);
if (new Set(products).size !== 24) missing.add(`expected 24 configured product images, found ${new Set(products).size}`);

if (missing.size) {
  console.error("Site check failed:\n" + [...missing].map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log(`Site check passed: ${pages.length} pages, 24 products, and all direct page assets found.`);
