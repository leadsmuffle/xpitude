// Responsive check for the XPITUDE site (dev only). Text size limits apply on mobile widths, where the rules ask for them.
// Opens every page at eight widths in headless Chrome, saves a
// screenshot of each to ./responsive-check, and reports layout problems:
//   - horizontal scroll (document wider than the window) and the elements that stick out
//   - text smaller than 12px, and body text smaller than 16px on mobile
//   - tap targets (links, buttons, icons, form controls) smaller than 44px on mobile
//   - form fields with a font smaller than 16px on mobile (iPhone zooms into those)
//   - images that are stretched or squashed
// It also records the position of every element at 1440px, so a later run can confirm the desktop layout is unchanged:
//   node scripts/responsive-check.mjs baseline     save the 1440px layout
//   node scripts/responsive-check.mjs              check every width, compare 1440px with the baseline
//   node scripts/responsive-check.mjs --no-shots   the same without screenshots
// Needs Google Chrome or Microsoft Edge installed, and the site running on http://localhost:3000.
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const APP = path.resolve(import.meta.dirname, "..");
const OUT = path.join(APP, "responsive-check");
const BASE = process.env.SITE_URL_CHECK || "http://localhost:3000";
const args = process.argv.slice(2);
const baselineMode = args.includes("baseline");
const shots = !args.includes("--no-shots") && !baselineMode;
const only = (args.find((a) => a.startsWith("--only=")) || "").slice(7);
const WIDTHS = baselineMode ? [1440] : [1920, 1440, 1280, 1024, 768, 430, 390, 360];
const MOBILE = 767;

const PAGES = [
  ["home", "/"], ["about", "/about"], ["contact", "/contact"], ["testimonials", "/testimonials"], ["privacy", "/privacy"], ["terms", "/terms"], ["404", "/no-such-page"],
  ["blog", "/blog"], ["blog-post", "/blog/k2-base-camp-gondogoro-la-trek"], ["blog-post-short", "/blog/twenty-one-days-to-concordia"],
  ["guide-index", "/travel-guide"], ["guide-glance", "/travel-guide/pakistan-at-a-glance"], ["guide-seasons", "/travel-guide/best-time-to-visit-pakistan"],
  ["guide-grades", "/travel-guide/trekking-trip-difficulty-grades"], ["guide-medical", "/travel-guide/recommended-medical-kit"],
  ["trekking", "/trekking"], ["tours", "/tours"], ["spiritual", "/spiritual"], ["corporate", "/corporate"],
  ["trip-k2", "/trekking/k2-base-camp-gondogoro-la"], ["trip-yoga", "/spiritual/yoga-mindfulness-retreats"], ["trip-team", "/corporate/team-building-corporate-retreats"],
  ["trip-older", "/tours/hunza-autumn-trip"],
  ["admin-login", "/admin/login"], ["admin-dashboard", "/admin", true], ["admin-enquiries", "/admin/enquiries", true], ["admin-trips", "/admin/trips", true],
  ["admin-trip-edit", "/admin/trips/new", true],
].filter(([name]) => !only || only.split(",").includes(name));

// ---- headless Chrome over the DevTools protocol ----
const CHROME = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find((p) => fs.existsSync(p));
if (!CHROME) { console.error("Chrome or Edge not found."); process.exit(1); }
const PORT = 9400 + Math.floor(Math.random() * 400);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "xpitude-check-"));
const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, "--hide-scrollbars", "--no-first-run", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let wsUrl;
for (let i = 0; i < 60 && !wsUrl; i++) { try { wsUrl = (await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()).find((t) => t.type === "page")?.webSocketDebuggerUrl; } catch {} if (!wsUrl) await sleep(250); }
const ws = new WebSocket(wsUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise((r) => { pending.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result?.value;

// Signs in to the admin with ADMIN_EMAIL / ADMIN_PASSWORD from .env, for the admin pages.
async function adminCookie() {
  const env = Object.fromEntries(fs.readFileSync(path.join(APP, ".env"), "utf8").split(/\r?\n/).filter((l) => /^[A-Z_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1)]));
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) return null;
  const res = await fetch(BASE + "/admin/login", { method: "POST", redirect: "manual", headers: { "Content-Type": "application/x-www-form-urlencoded", Origin: BASE },
    body: new URLSearchParams({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD }) });
  const set = res.headers.get("set-cookie") || "";
  const m = set.match(/^([^=]+)=([^;]+)/);
  return m ? { name: m[1], value: m[2] } : null;
}

// Runs in the page: collects problems and, at 1440px, the layout of every element.
const PROBE = (mobile, layout) => `(() => {
  const W = document.documentElement.clientWidth, out = { overflow: Math.max(document.documentElement.scrollWidth, innerWidth) - W, wide: [], small: [], body: [], taps: [], fields: [], squashed: [], layout: null };
  const visible = (e) => { const s = getComputedStyle(e); if (s.visibility === "hidden" || s.display === "none" || +s.opacity === 0) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const name = (e) => e.tagName.toLowerCase() + (e.id ? "#" + e.id : "") + (typeof e.className === "string" && e.className.trim() ? "." + e.className.trim().split(/\\s+/).slice(0, 2).join(".") : "");
  const inDrawer = (e) => !!e.closest(".drawer:not(.is-open), .mega, .dd, .bsearch:not([open]) form, [hidden], .hp");
  const all = [...document.querySelectorAll("body *")];
  for (const e of all) {
    if (inDrawer(e) || !visible(e)) continue;
    const r = e.getBoundingClientRect();
    // sticks out of the window (ignoring things inside a box that scrolls sideways or clips)
    if (r.right > W + 1 || r.left < -1) {
      let p = e.parentElement, clipped = false;
      while (p && p !== document.body) { const o = getComputedStyle(p).overflowX; if (o === "auto" || o === "scroll" || o === "hidden" || o === "clip") { clipped = true; break; } p = p.parentElement; }
      if (!clipped && !["SECTION", "MAIN", "BODY"].includes(e.tagName)) out.wide.push(name(e) + " " + Math.round(r.left) + "→" + Math.round(r.right));
    }
    const own = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (own) {
      const fs = parseFloat(getComputedStyle(e).fontSize);
      if (${mobile} && fs < 11.5) out.small.push(name(e) + " " + fs.toFixed(1) + "px «" + e.textContent.trim().slice(0, 30) + "»");
      if (${mobile} && e.matches("main p, main li, main dd, main td, footer p") && !e.closest(".data, .eyebrow, .gsrc, .crumbs, .card__foot") && fs < 15.5)
        out.body.push(name(e) + " " + fs.toFixed(1) + "px «" + e.textContent.trim().slice(0, 30) + "»");
    }
    if (${mobile} && e.matches("a, button, summary, input, select, textarea, [role=button]")) {
      // links inside running text are exempt; everything that is a control or stands alone needs 44px
      const inline = e.tagName === "A" && e.closest("p, li:not(.drawer li), dd, td, figcaption") && !e.matches(".btn, .tlink, .mpill, .ico, .sico");
      // an invisible ::after layer that sticks out (inset:-6px and so on) enlarges the tap area
      const af = getComputedStyle(e, "::after"); let tw = r.width, th = r.height;
      if (af.content !== "none" && af.position === "absolute") { const neg = (v) => Math.min(0, parseFloat(v) || 0); tw -= neg(af.left) + neg(af.right); th -= neg(af.top) + neg(af.bottom); }
      const lab = e.matches("input[type=checkbox], input[type=radio]") && e.id && document.querySelector("label[for=" + JSON.stringify(e.id) + "]");
      if (lab) { const lr = lab.getBoundingClientRect(); tw = Math.max(tw, lr.width); th = Math.max(th, lr.height); }
      if (!inline && (tw < 43.5 || th < 43.5)) out.taps.push(name(e) + " " + Math.round(tw) + "×" + Math.round(th));
    }
    if (${mobile} && e.matches("input:not([type=checkbox]):not([type=radio]):not([type=hidden]), select, textarea") && parseFloat(getComputedStyle(e).fontSize) < 16)
      out.fields.push(name(e) + " " + getComputedStyle(e).fontSize);
    if (e.tagName === "IMG" && e.naturalWidth && !["cover", "contain"].includes(getComputedStyle(e).objectFit)) {
      const want = e.naturalWidth / e.naturalHeight, got = r.width / r.height;
      if (Math.abs(want - got) / want > 0.03) out.squashed.push(name(e) + " " + e.getAttribute("src"));
    }
  }
  if (${layout}) out.layout = all.filter((e) => !inDrawer(e) && visible(e)).map((e) => { const r = e.getBoundingClientRect(); return name(e) + "@" + [r.left, r.top + scrollY, r.width, r.height].map(Math.round).join(","); });
  return JSON.stringify(out);
})()`;

const report = [];
try {
  await send("Page.enable"); await send("Network.enable"); await send("Network.setCacheDisabled", { cacheDisabled: true });
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });   // steady screenshots
  const cookie = await adminCookie();
  if (cookie) await send("Network.setCookie", { ...cookie, url: BASE, path: "/" });
  if (shots) fs.mkdirSync(OUT, { recursive: true });
  const baselineFile = path.join(OUT, "layout-1440.json");
  const baseline = !baselineMode && fs.existsSync(baselineFile) ? JSON.parse(fs.readFileSync(baselineFile, "utf8")) : null;
  const layouts = {};
  for (const w of WIDTHS) {
    const mobile = w <= MOBILE;
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: mobile ? 800 : 900, deviceScaleFactor: 1, mobile });
    await send("Emulation.setTouchEmulationEnabled", { enabled: mobile });
    for (const [name, url, admin] of PAGES) {
      if (admin && !cookie) continue;
      await send("Page.navigate", { url: BASE + url }); await sleep(900);
      await evaluate("document.fonts.ready.then(() => 1)");
      // scroll through so lazy images load and reveal animations finish
      await evaluate(`(async () => { document.documentElement.style.scrollBehavior = "auto"; document.querySelectorAll(".rv").forEach((e) => e.classList.add("is-in"));
        for (let y = 0; y < document.documentElement.scrollHeight; y += 800) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } scrollTo(0, 0); return 1; })()`);
      await sleep(400);
      const r = JSON.parse(await evaluate(PROBE(mobile, w === 1440)));
      if (w === 1440) layouts[name] = r.layout;
      const issues = [];
      if (r.overflow > 0) issues.push(`horizontal scroll ${r.overflow}px: ${[...new Set(r.wide)].slice(0, 4).join(", ")}`);
      if (r.small.length) issues.push(`text under 12px (${r.small.length}): ${[...new Set(r.small)].slice(0, 3).join(" | ")}`);
      if (r.body.length) issues.push(`body text under 16px (${r.body.length}): ${[...new Set(r.body)].slice(0, 3).join(" | ")}`);
      if (r.taps.length) issues.push(`tap targets under 44px (${r.taps.length}): ${[...new Set(r.taps)].slice(0, 4).join(", ")}`);
      if (r.fields.length) issues.push(`form fields under 16px (${r.fields.length}): ${[...new Set(r.fields)].slice(0, 2).join(", ")}`);
      if (r.squashed.length) issues.push(`stretched images: ${r.squashed.slice(0, 3).join(", ")}`);
      if (w === 1440 && baseline && baseline[name]) {
        baseline[name] = baseline[name].filter((x) => !x.includes("@-9999,"));   // off-screen items (the hidden spam-trap field) are not layout
        const before = new Set(baseline[name]), after = new Set(r.layout);
        const moved = r.layout.filter((x) => !before.has(x)).length + baseline[name].filter((x) => !after.has(x)).length;
        if (moved) issues.push(`1440px layout differs from baseline in ${moved} element positions: new: ${r.layout.filter((x) => !before.has(x)).slice(0, 3).join(" | ") || "none"}; gone: ${baseline[name].filter((x) => !after.has(x)).slice(0, 3).join(" | ") || "none"}`);
      }
      report.push({ page: name, width: w, issues });
      console.log(`${String(w).padStart(4)} ${name.padEnd(17)} ${issues.length ? "✗ " + issues.join("\n" + " ".repeat(24) + "✗ ") : "✓"}`);
      if (shots) {
        const h = Math.min(await evaluate("document.documentElement.scrollHeight"), 14000);
        await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile });
        await sleep(500);
        const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 70 });
        fs.writeFileSync(path.join(OUT, `${name}-${w}.jpg`), Buffer.from(shot.data, "base64"));
        await send("Emulation.setDeviceMetricsOverride", { width: w, height: mobile ? 800 : 900, deviceScaleFactor: 1, mobile });
      }
    }
  }
  if (baselineMode) { fs.mkdirSync(OUT, { recursive: true }); fs.writeFileSync(baselineFile, JSON.stringify(layouts)); console.log("baseline saved:", baselineFile); }
  else fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 1));
  const failing = report.filter((r) => r.issues.length);
  console.log(`\n${report.length} page views checked, ${failing.length} with problems.`);
  process.exitCode = failing.length ? 1 : 0;
} finally { ws.close(); chrome.kill(); }
