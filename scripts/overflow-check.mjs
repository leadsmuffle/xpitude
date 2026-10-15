// Mobile width check (dev only): opens the main pages at 320, 375, 390, 425, 768 and 1024px in headless Chrome and
// confirms nothing is wider than the screen. Two tests per page, so the overflow-x safety net cannot hide a problem:
//   1. document.documentElement.scrollWidth === window.innerWidth
//   2. no visible element ends past the right edge of the screen (document.documentElement.clientWidth)
// Saves a screenshot of the first screen of each page to ./responsive-check.
//   node scripts/overflow-check.mjs        (the site must be running on http://localhost:3000)
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const APP = path.resolve(import.meta.dirname, "..");
const OUT = path.join(APP, "responsive-check");
const BASE = "http://localhost:3000";
const WIDTHS = [320, 375, 390, 425, 768, 1024];
const PAGES = [["home", "/"], ["trekking", "/trekking"], ["tours", "/tours"], ["spiritual", "/spiritual"], ["corporate", "/corporate"],
  ["trip-k2", "/trekking/k2-base-camp-gondogoro-la"], ["trip-team", "/corporate/team-building-corporate-retreats"],
  ["guide-index", "/travel-guide"], ["guide-visa", "/travel-guide/pakistan-visa-guide"], ["guide-seasons", "/travel-guide/best-time-to-visit-pakistan"],
  ["blog", "/blog"], ["blog-post", "/blog/k2-base-camp-gondogoro-la-trek"], ["about", "/about"], ["contact", "/contact"]];

const CHROME = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find((p) => fs.existsSync(p));
const PORT = 9800 + Math.floor(Math.random() * 100);
const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${fs.mkdtempSync(path.join(os.tmpdir(), "xp-overflow-"))}`, "--hide-scrollbars", "--no-first-run", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let u; for (let i = 0; i < 60 && !u; i++) { try { u = (await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()).find((t) => t.type === "page")?.webSocketDebuggerUrl; } catch {} if (!u) await sleep(250); }
const ws = new WebSocket(u); await new Promise((r) => (ws.onopen = r));
let id = 0; const P = new Map(); ws.onmessage = (e) => { const m = JSON.parse(e.data); if (P.has(m.id)) { P.get(m.id)(m.result); P.delete(m.id); } };
const send = (method, params = {}) => new Promise((r) => { P.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.value;

const table = {}; let failures = 0;
try {
  fs.mkdirSync(OUT, { recursive: true });
  await send("Page.enable"); await send("Network.enable"); await send("Network.setCacheDisabled", { cacheDisabled: true });
  for (const w of WIDTHS) {
    // mobile: true makes Chrome behave like a phone (viewport meta tag, touch); a page wider than the screen then shows
    // up as innerWidth growing past the device width, exactly like the white strip in DevTools.
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: 800, deviceScaleFactor: 1, mobile: w < 1024, screenWidth: w, screenHeight: 800 });
    for (const [name, url] of PAGES) {
      await send("Page.navigate", { url: BASE + url }); await sleep(1100);
      const r = JSON.parse(await ev(`JSON.stringify((() => {
        const cw = document.documentElement.clientWidth;
        const wide = [...document.querySelectorAll("body *")].filter((el) => { const b = el.getBoundingClientRect(); if (!(b.width > 0 && b.right > cw + 1) || el.closest(".hp")) return false;
          for (let p = el.parentElement; p && p !== document.body && p !== document.documentElement; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if (o !== "visible") return false; }
          return true; })
          .map((el) => el.tagName + "." + [...el.classList].join(".") + " right " + Math.round(el.getBoundingClientRect().right));
        return { inner: innerWidth, scroll: document.documentElement.scrollWidth, client: cw, wide };
      })())`));
      const pass = r.scroll === r.inner && r.inner === w && r.wide.length === 0;
      if (!pass) failures++;
      (table[name] ||= {})[w] = pass ? "pass" : `FAIL (innerWidth ${r.inner}, scrollWidth ${r.scroll}${r.wide.length ? ", " + r.wide.slice(0, 2).join("; ") : ""})`;
      const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 70 });
      fs.writeFileSync(path.join(OUT, `overflow-${name}-${w}.jpg`), Buffer.from(shot.data, "base64"));
    }
  }
  console.log("| Page | " + WIDTHS.join(" | ") + " |\n|---|" + WIDTHS.map(() => "---").join("|") + "|");
  for (const [name] of PAGES) console.log(`| ${name} | ` + WIDTHS.map((w) => table[name][w]).join(" | ") + " |");
  console.log(`\n${PAGES.length * WIDTHS.length} checks, ${failures} failed.`);
  process.exitCode = failures ? 1 : 0;
} finally { ws.close(); chrome.kill(); }
