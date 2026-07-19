import { spawn } from "node:child_process";
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const base = process.env.SITE_URL || "http://127.0.0.1:5175";
const chromePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const profile = `/tmp/sliek-browser-audit-${process.pid}`;
const port = 9333;
const pages = readdirSync(root).filter((file) => file.endsWith(".html") && (!process.env.AUDIT_PAGE || file === process.env.AUDIT_PAGE)).sort();
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 }
];
const auditDir = resolve(root, "audit-screenshots");
mkdirSync(auditDir, { recursive: true });

const chrome = spawn(chromePath, [
  "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"
], { stdio: "ignore" });

const delay = (ms) => new Promise((done) => setTimeout(done, ms));
let browser;

async function version() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try { return await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); } catch { await delay(100); }
  }
  throw new Error("Chrome DevTools endpoint did not start");
}

function connect(url) {
  const ws = new WebSocket(url);
  const pending = new Map();
  const listeners = new Map();
  let id = 0;
  ws.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.id && pending.has(message.id)) {
      const { resolve: done, reject } = pending.get(message.id);
      pending.delete(message.id);
      return message.error ? reject(new Error(message.error.message)) : done(message.result);
    }
    for (const listener of listeners.get(message.method) || []) listener(message.params);
  };
  return new Promise((done, reject) => {
    ws.onopen = () => done({
      send(method, params = {}) {
        const requestId = ++id;
        ws.send(JSON.stringify({ id: requestId, method, params }));
        return new Promise((resolve, reject) => pending.set(requestId, { resolve, reject }));
      },
      on(method, listener) {
        listeners.set(method, [...(listeners.get(method) || []), listener]);
      },
      close() { ws.close(); }
    });
    ws.onerror = reject;
  });
}

async function waitFor(client, method, timeout = 12000) {
  return new Promise((done, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timed out waiting for ${method}`)), timeout);
    client.on(method, (value) => { clearTimeout(timer); done(value); });
  });
}

async function openTarget(url) {
  return await (await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: "PUT" })).json();
}

const failures = [];
const latinByPage = [];
const representative = new Set(["index.html", "shop-grid-page.html", "shop-detalis-page.html", "checkout-page.html", "blog-page.html", "contact-page.html"]);

try {
  browser = await version();
  for (const viewport of viewports) {
    for (const page of pages) {
      const url = `${base}/${page}`;
      const target = await openTarget("about:blank");
      const client = await connect(target.webSocketDebuggerUrl);
      const errors = [];
      client.on("Runtime.exceptionThrown", ({ exceptionDetails }) => errors.push(exceptionDetails.exception?.description || exceptionDetails.text || "JavaScript exception"));
      client.on("Log.entryAdded", ({ entry }) => { if (entry.level === "error") errors.push(entry.text); });
      client.on("Network.loadingFailed", ({ errorText, canceled, type }) => { if (!canceled && type !== "Font") errors.push(`Network: ${errorText}`); });
      client.on("Network.responseReceived", ({ response, type }) => { if (response.status >= 400 && type !== "Font") errors.push(`${response.status}: ${response.url}`); });
      await Promise.all([
        client.send("Page.enable"), client.send("Runtime.enable"), client.send("Log.enable"), client.send("Network.enable"),
        client.send("Emulation.setDeviceMetricsOverride", { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.name === "mobile" })
      ]);
      const loaded = waitFor(client, "Page.loadEventFired");
      await client.send("Page.navigate", { url });
      await loaded;
      await delay(1100);
      const result = await client.send("Runtime.evaluate", {
        returnByValue: true,
        expression: `(() => {
          const broken = [...document.images].filter(img => img.complete && img.naturalWidth === 0).map(img => img.getAttribute('src'));
          const loader = document.querySelector('.loader');
          const menu = document.querySelector('.kh-menu-toggle');
          const search = document.querySelector('[data-toggle-search]');
          if (${viewport.name === "mobile"} && menu) menu.click();
          if (search) search.click();
          const productImageGaps = [...document.querySelectorAll('.product-wrapper:not(.product-wrapper-2)')].flatMap(wrapper => {
            const image = wrapper.querySelector('.product-img > img, .product-img a > img');
            const details = wrapper.querySelector('.product-detalis');
            const wrapperRect = wrapper.getBoundingClientRect();
            const detailsRect = details?.getBoundingClientRect();
            const imageRect = image?.getBoundingClientRect();
            const cardIsLaidOut = wrapperRect.width > 20 && wrapperRect.height > 20 && detailsRect?.width > 20 && detailsRect?.height > 20;
            return cardIsLaidOut && (!image || imageRect.width < 20 || imageRect.height < 20)
              ? [{ card: wrapper.className, src: image?.getAttribute('src') || null, imageWidth: Math.round(imageRect?.width || 0), imageHeight: Math.round(imageRect?.height || 0) }]
              : [];
          }).slice(0, 8);
          const state = {
            lang: document.documentElement.lang,
            title: document.title,
            header: !!document.querySelector('.kh-site-header'),
            footer: !!document.querySelector('.kh-site-footer'),
            config: !!window.MOLY_STORE,
            font: getComputedStyle(document.body).fontFamily,
            stickyHeader: getComputedStyle(document.querySelector('.kh-site-header')).position === 'sticky',
            squareProducts: [...document.querySelectorAll('.product-wrapper:not(.d-flex) .product-img > img')].every(img => Math.abs(img.getBoundingClientRect().width - img.getBoundingClientRect().height) < 2),
            loaderHidden: !loader || getComputedStyle(loader).display === 'none',
            popupRemoved: !document.getElementById('autopopup-option'),
            productImageGaps,
            overflow: document.documentElement.scrollWidth - innerWidth,
            offenders: [...document.querySelectorAll('body *')].filter(el => {
              const rect = el.getBoundingClientRect();
              return rect.right > innerWidth + 3 || rect.left < -3;
            }).slice(0, 8).map(el => ({ tag: el.tagName, class: el.className, left: Math.round(el.getBoundingClientRect().left), right: Math.round(el.getBoundingClientRect().right) })),
            broken,
            latin: [...new Set(document.body.innerText.split('\\n').map(text => text.trim()).filter(text => /[A-Za-z]{2}/.test(text) && !/^(?:SLIEK|Telegram|Facebook|USD|S|M|L|XL|XXL|One size)$/i.test(text)))].slice(0, 30),
            mobileMenu: !${viewport.name === "mobile"} || document.querySelector('.kh-main-nav')?.classList.contains('is-open'),
            searchOpen: document.querySelector('.kh-search-panel')?.classList.contains('is-open')
          };
          if (${viewport.name === "mobile"} && menu) menu.click();
          if (search) search.click();
          return state;
        })()`
      });
      const state = result.result.value;
      if (!state) throw new Error(result.exceptionDetails?.exception?.description || `Audit evaluation failed for ${page}`);
      if (process.env.AUDIT_TEXT && viewport.name === "desktop" && state.latin.length) latinByPage.push(`${page}: ${state.latin.join(" | ")}`);
      if (state.lang !== "km" || !state.header || !state.footer || !state.config || !state.font.includes("Kantumruy Pro") || !state.stickyHeader || !state.squareProducts || !state.loaderHidden || !state.popupRemoved || state.productImageGaps.length || state.overflow > 3 || state.broken.length || !state.mobileMenu || !state.searchOpen) {
        failures.push(`${viewport.name}/${page}: ${JSON.stringify(state)}`);
      }
      if (errors.length) failures.push(`${viewport.name}/${page}: ${errors.join(" | ")}`);
      if (representative.has(page)) {
        if (process.env.AUDIT_SELECTOR) {
          await client.send("Runtime.evaluate", { expression: `document.querySelector(${JSON.stringify(process.env.AUDIT_SELECTOR)})?.scrollIntoView({block:'start'})` });
          await delay(500);
          await client.send("Runtime.evaluate", { expression: `document.querySelector(${JSON.stringify(process.env.AUDIT_SELECTOR)})?.scrollIntoView({block:'start'})` });
          await delay(300);
        }
        const shot = await client.send("Page.captureScreenshot", { format: "jpeg", quality: 72, fromSurface: true });
        const suffix = process.env.AUDIT_SHOT_NAME ? `-${process.env.AUDIT_SHOT_NAME}` : "";
        writeFileSync(resolve(auditDir, `${viewport.name}-${page.replace(".html", "")}${suffix}.jpg`), Buffer.from(shot.data, "base64"));
      }
      client.close();
      await fetch(`http://127.0.0.1:${port}/json/close/${target.id}`);
    }
  }
} finally {
  chrome.kill("SIGTERM");
  await Promise.race([new Promise((done) => chrome.once("exit", done)), delay(1500)]);
  try { rmSync(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 }); } catch { /* Chrome will clean its temporary profile on exit. */ }
}

if (failures.length) {
  console.error(`Browser audit failed (${failures.length}):\n${failures.map((item) => `- ${item}`).join("\n")}`);
  process.exit(1);
}

if (latinByPage.length) console.log(`Visible Latin-script text:\n${latinByPage.map((item) => `- ${item}`).join("\n")}`);
console.log(`Browser audit passed: ${pages.length} pages at desktop, tablet, and mobile widths. Representative screenshots: ${auditDir}`);
