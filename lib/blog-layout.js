// Lays out a blog post for the post page. The text is not changed: it is split into four parts at heading breaks,
// with the lead paragraph, ids on the headings for "In this story", the XPITUDE Verdict as a pull quote and tips in a soft box.
// The post's chosen photos (post.articlePhotos, editable in admin) go in this order:
//   part 1 · one photo at the width of the text · part 2 · one large and two small photos · part 3
//   · one more photo at the width of the text · (the article and sidebar end here) · part 4
// With fewer than five photos the two small ones are left out first, then the full width one.
// Photos linked to the post that are not used in the article go to the "From the trail" gallery.
const SIZES = require("../scripts/data/blog-photo-sizes.json");

const esc = (v) => String(v == null ? "" : v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const strip = (html) => String(html).replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
// "/x/03-600.webp" and "/x/03.webp" are the same photo
const base = (src) => String(src || "").replace(/-(600|800|1200)\.webp$/, ".webp").split("?")[0];
const slugify = (t) => strip(t).toLowerCase().replace(/&amp;|&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "section";
const captionOf = (alt) => { const c = String(alt || "").includes(": ") ? alt.slice(alt.indexOf(": ") + 2) : String(alt || ""); return c ? c.charAt(0).toUpperCase() + c.slice(1).replace(/\.?$/, ".") : ""; };

// <img> with srcset from the 800 and 1200px copies saved next to the photo (see scripts/data/blog-photo-sizes.json)
function img(src, alt, { sizes = "100vw", eager = false, pos = "", cls = "" } = {}) {
  const s = base(src), info = SIZES[s];
  let set = "", wh = "";
  if (info) {
    const stem = s.replace(/\.(webp|jpg)$/, "");
    set = info.v.map((w) => `${stem}-${w}.webp ${w}w`).concat(`${s} ${info.w}w`).join(", ");
    wh = ` width="${info.w}" height="${info.h}"`;
  }
  return `<img src="${esc(info ? s : src)}"${set ? ` srcset="${esc(set)}" sizes="${sizes}"` : ""}${wh} alt="${esc(alt)}"${cls ? ` class="${cls}"` : ""}` +
    `${pos ? ` style="object-position:${esc(pos)}"` : ""}${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}>`;
}
const portrait = (src) => { const i = SIZES[base(src)]; return i ? i.h > i.w : false; };
const posOf = (src) => (portrait(src) ? "center 30%" : "center 45%");
// a photo that opens the lightbox
const zoom = (p, sizes, cls = "bp-zoom") => `<a class="${cls}" href="${esc(p.src)}" data-lb data-alt="${esc(p.caption || p.alt)}">${img(p.src, p.alt, { sizes, pos: posOf(p.src) })}</a>`;

// one photo at the width of the text column
const textPhoto = (p) => `<figure class="bp-fig bp-fig--text">${zoom(p, "(max-width: 760px) 100vw, 720px")}${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ""}</figure>`;
// one large photo and two small ones, with one caption under the block
const trioPhotos = (l, a, b) => `<figure class="bp-fig bp-trio"><div class="bp-trio__grid">${zoom(l, "(max-width: 640px) 100vw, 440px")}${zoom(a, "(max-width: 640px) 50vw, 290px")}${zoom(b, "(max-width: 640px) 50vw, 290px")}</div>` +
  `<figcaption>${esc([l, a, b].map((p) => p.caption).filter(Boolean).join(" · "))}</figcaption></figure>`;

// Splits the body into its top level blocks. Returns null when something does not fit, so the page can fall back to the plain body.
function blocks(html) {
  const re = /\s*(<(p|h2|h3|ul|ol|figure|blockquote|dl|div|table)\b[^>]*>[\s\S]*?<\/\2>)\s*/gy;
  const out = []; let m, at = 0;
  while ((m = re.exec(html))) { out.push({ tag: m[2], html: m[1] }); at = re.lastIndex; }
  return html.slice(at).trim() ? null : out;
}

function layoutPost(post, { banner } = {}) {
  const body = String(post.body || "");
  const list0 = blocks(body);
  const words = strip(body).split(" ").filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  const bannerBase = base(banner);

  // the chosen article photos, in order (never the banner, never twice)
  const used = new Set([bannerBase]);
  const chosen = (post.articlePhotos || []).map((p) => ({ src: base(p.src), alt: p.alt || "", caption: captionOf(p.alt) }))
    .filter((p) => p.src && !used.has(p.src) && used.add(p.src));
  const n = chosen.length;
  const slots = n >= 5 ? { text: chosen[0], large: chosen[1], small: [chosen[2], chosen[3]], full: chosen[4] }
    : n >= 3 ? { text: chosen[0], large: chosen[1], small: [], full: chosen[n - 1] }
    : { text: chosen[0], large: chosen[1], small: [], full: null };
  const inArticle = [slots.text, slots.large, ...slots.small, slots.full].filter(Boolean);
  inArticle.forEach((p) => used.add(p.src));
  // the gallery: the other photos linked to the post
  const gallery = [];
  const addG = (src, alt) => { const s = base(src); if (!s || used.has(s)) return; used.add(s); gallery.push({ src: s, alt: alt || "", caption: captionOf(alt) }); };
  (list0 || []).filter((b) => b.tag === "figure").forEach((b) => addG((b.html.match(/<img[^>]*\ssrc="([^"]+)"/) || [])[1], (b.html.match(/<img[^>]*\salt="([^"]*)"/) || [])[1]));
  (post.gallery || []).forEach((g) => addG(g.src, g.alt));

  if (!list0) return { parts: [body, "", "", ""], photos: {}, toc: [], gallery, minutes };

  // headings get ids for "In this story"
  const toc = [], ids = new Set();
  let list = list0.filter((b) => b.tag !== "figure").map((b) => {
    if (b.tag !== "h2") return b;
    const text = strip(b.html);
    let id = slugify(text); while (ids.has(id)) id += "-2"; ids.add(id);
    toc.push({ id, text });
    return { ...b, html: b.html.replace(/^<h2\b([^>]*)>/, `<h2 id="${id}"$1>`), h2: true };
  });
  // lead paragraph, pull quote, tip boxes
  const firstH2 = list.findIndex((b) => b.h2);
  const leadAt = list.findIndex((b, i) => b.tag === "p" && (firstH2 < 0 || i < firstH2));
  if (leadAt >= 0) list[leadAt] = { ...list[leadAt], html: list[leadAt].html.replace(/^<p\b([^>]*)>/, '<p class="bp-lead"$1>') };
  list = list.map((b) => {
    const m = b.tag === "p" && b.html.match(/^<p[^>]*>\s*<b>\s*The XPITUDE Verdict:?\s*<\/b>:?\s*([\s\S]*?)<\/p>$/i);
    return m ? { ...b, html: `<blockquote class="bp-quote"><p>${m[1].trim()}</p><cite>The XPITUDE Verdict</cite></blockquote>` } : b;
  });
  const out = [];
  for (let i = 0; i < list.length; i++) {
    const b = list[i];
    if (b.h2 && /good to know|before you go/i.test(strip(b.html))) {
      let j = i + 1; const inner = [b.html];
      while (j < list.length && !list[j].h2 && list[j].tag !== "blockquote") inner.push(list[j++].html);
      out.push({ tag: "div", html: `<div class="bp-tip">${inner.join("\n")}</div>`, h2: true });
      i = j - 1;
    } else out.push(b);
  }

  // four parts: the intro, then the rest split at the headings nearest to a third and two thirds of its words
  const introEnd = out.findIndex((b) => b.h2);
  const p1End = introEnd > 0 ? introEnd : Math.min(out.length, 1);
  const rest = out.slice(p1End);
  const len = rest.map((b) => strip(b.html).split(" ").length);
  const total = len.reduce((a, b) => a + b, 0) || 1;
  const starts = rest.map((b, i) => (i > 0 && b.h2 ? i : -1)).filter((i) => i > 0);
  const breaks = starts.length >= 2 ? starts : rest.map((b, i) => (i > 0 ? i : -1)).filter((i) => i > 0);
  const at = (share) => { let acc = 0, best = null, bestD = 1e9; rest.forEach((b, i) => { if (breaks.includes(i)) { const d = Math.abs(acc / total - share); if (d < bestD) { bestD = d; best = i; } } acc += len[i]; }); return best; };
  let c1 = at(1 / 3), c2 = at(2 / 3);
  if (c1 !== null && c2 !== null && c2 <= c1) c2 = breaks.find((i) => i > c1) ?? null;
  const html = (arr) => arr.map((b) => b.html).join("\n");
  const parts = [html(out.slice(0, p1End)),
    html(rest.slice(0, c1 ?? rest.length)),
    c1 !== null ? html(rest.slice(c1, c2 ?? rest.length)) : "",
    c1 !== null && c2 !== null ? html(rest.slice(c2)) : ""];

  const photos = {
    text: slots.text ? textPhoto(slots.text) : "",
    // with only one of the three, the large photo is shown at the width of the text
    trio: slots.large ? (slots.small.length === 2 ? trioPhotos(slots.large, slots.small[0], slots.small[1]) : textPhoto(slots.large)) : "",
    // the last photo: at the width of the text, like the first one, at the end of the article column
    full: slots.full ? textPhoto(slots.full) : "",
  };
  return { parts, photos, toc, gallery, minutes, chosen: { ...slots } };
}

// ---- Travel Guide pages: the same photo order inside the article column, with guide-only classes (gp-...) ----
// part 1 · photo at the width of the text · part 2 · one large and two small photos · part 3 · one more photo · part 4
// The text is not changed; the old photos in the guide text are replaced by guide.articlePhotos (editable in admin).
const gpText = (p) => `<figure class="gp-fig gp-fig--text">${zoom(p, "(max-width: 760px) 100vw, 720px", "gp-zoom")}${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ""}</figure>`;
const gpTrio = (l, a, b) => `<figure class="gp-fig gp-trio"><div class="gp-trio__grid">${zoom(l, "(max-width: 640px) 100vw, 450px", "gp-zoom")}${zoom(a, "(max-width: 640px) 50vw, 280px", "gp-zoom")}${zoom(b, "(max-width: 640px) 50vw, 280px", "gp-zoom")}</div>` +
  `<figcaption>${esc([l, a, b].map((p) => p.caption).filter(Boolean).join(" · "))}</figcaption></figure>`;

function layoutGuide(guide) {
  const body = String(guide.body || "");
  const list0 = blocks(body);
  const chosen = [];
  const seen = new Set([base(guide.image)]);
  (guide.articlePhotos || []).forEach((p) => { const s = base(p.src); if (s && !seen.has(s)) { seen.add(s); chosen.push({ src: s, alt: p.alt || "", caption: captionOf(p.alt) }); } });
  if (!list0 || !chosen.length) return body;
  const list = list0.filter((b) => b.tag !== "figure").map((b) => ({ ...b, h2: b.tag === "h2" }));
  // part 1 is the intro, or the first section when the guide starts with a heading
  const h2s = list.map((b, i) => (b.h2 ? i : -1)).filter((i) => i >= 0);
  const p1End = h2s.length && h2s[0] > 0 ? h2s[0] : (h2s[1] || list.length);
  const rest = list.slice(p1End);
  const len = rest.map((b) => strip(b.html).split(" ").length);
  const total = len.reduce((x, y) => x + y, 0) || 1;
  const breaks = rest.map((b, i) => (i > 0 && b.h2 ? i : -1)).filter((i) => i > 0);
  const at = (share, after) => { let acc = 0, best = null, bestD = 1e9; rest.forEach((b, i) => { if (breaks.includes(i) && (after == null || i > after)) { const d = Math.abs(acc / total - share); if (d < bestD) { bestD = d; best = i; } } acc += len[i]; }); return best; };
  const c1 = at(1 / 3), c2 = c1 == null ? null : at(2 / 3, c1);
  const html = (arr) => arr.map((b) => b.html).join("\n");
  const parts = [html(list.slice(0, p1End)), html(rest.slice(0, c1 ?? rest.length)), c1 != null ? html(rest.slice(c1, c2 ?? rest.length)) : "", c1 != null && c2 != null ? html(rest.slice(c2)) : ""];
  // with fewer photos the last one is left out first, then the two small ones
  const n = chosen.length;
  const text = chosen[0], large = chosen[1];
  const small = n >= 4 ? [chosen[2], chosen[3]] : [];
  const last = parts[3] ? (n >= 5 ? chosen[4] : n === 3 ? chosen[2] : null) : null;
  return [parts[0], gpText(text), parts[1], large ? (small.length ? gpTrio(large, small[0], small[1]) : gpText(large)) : "", parts[2], last ? gpText(last) : "", parts[3]].filter(Boolean).join("\n");
}

// The blog banner photo, by its real shape (scripts/data/blog-photo-sizes.json): a horizontal photo fills its half of the banner
// (object-fit: cover, with a focus point per banner in site.css); a vertical or square one is shown whole over a blurred copy of itself.
const bannerFit = (src) => { const i = SIZES[base(src)]; return i && i.w < i.h * 1.05 ? "contain" : "cover"; };

module.exports = { layoutPost, layoutGuide, img, base, captionOf, esc, bannerFit, SIZES };
