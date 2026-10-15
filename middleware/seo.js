// Search and AI-search tidying applied to every public page before it renders:
//  - titles fitted to 50–60 characters and descriptions to 140–160, using the page's own words and the site's own facts
//  - a BreadcrumbList (JSON-LD) built from the address for inner pages
// Pages still set their own title and description; this only adjusts the length.
const SECTION = { "travel-guide": "Travel Guide", blog: "Our Blog" };

function fitTitle(title, kind) {
  const t = String(title || "").trim();
  if (t.length >= 50 && t.length <= 60) return t;
  let main = t.replace(/\s*\|\s*XPITUDE.*$/, "").trim();
  if (main.length > 50 && main.includes(":")) main = main.split(":")[0].trim();      // "K2 Trek: The Walk That…" → "K2 Trek"
  const build = (main) => { const inPk = /pakistan/i.test(main) ? "" : " in Pakistan"; return [
    ...(kind === "blog" ? [`${main} | XPITUDE Blog`, `${main} | Travel Journal | XPITUDE`, `${main} | XPITUDE Travel Journal`, `${main} | XPITUDE Pakistan Travel Blog`] : []),
    ...(kind === "guide" ? [`${main} | XPITUDE Travel Guide`, `${main} | XPITUDE Pakistan Travel Guide`, `${main} | Pakistan Travel Guide | XPITUDE`] : []),
    `${main} | XPITUDE`, `${main} | XPITUDE Pakistan`, `${main}${inPk} | XPITUDE`, `${main}${inPk} | XPITUDE Travel`,
    `${main} | Pakistan Travel | XPITUDE`, `${main}${inPk} | Treks & Tours | XPITUDE`, `${main} | Pakistan Treks & Tours | XPITUDE`,
    `${main}${inPk} | Licensed Tour Operator | XPITUDE`, `${main} | Tours in Pakistan | XPITUDE`, `${main} | XPITUDE Pakistan Tours`,
  ]; };
  // the page name alone (before any " | ") is tried too, when the full name leaves no room
  const candidates = [...build(main), ...(main.includes(" | ") ? build(main.split(" | ")[0].trim()) : [])];
  const fit = candidates.find((c) => c.length >= 50 && c.length <= 60);
  if (fit) return fit;
  const under = candidates.filter((c) => c.length <= 60).sort((a, b) => b.length - a.length)[0];
  if (under) return under;
  // too long even on its own: shorten the main part at a word
  const room = 60 - " | XPITUDE".length;
  return main.slice(0, room + 1).replace(/\s+\S*$/, "").replace(/[,:;&\s-]+$/, "") + " | XPITUDE";
}

// Facts the site already states, used to round out a short description.
const EXTRAS = [
  " Planned and led by XPITUDE, a licensed tour operator in Gilgit-Baltistan.",
  " A licensed guide and trained crew on every departure.",
  " A planner replies within one working day.",
  " XPITUDE, licensed tour operator in Pakistan.",
  " Licensed tour operator in Pakistan.",
  " Planned and led end to end.",
  " By XPITUDE, Pakistan.",
  " Plan it with XPITUDE.",
  " With XPITUDE.",
];
function fitDescription(text) {
  let d = String(text || "").replace(/\s+/g, " ").trim();
  if (d.length > 160) {
    const sentences = d.match(/[^.!?]+[.!?]+/g) || [d];
    let out = "";
    for (const s of sentences) { if ((out + s).trim().length <= 160) out += s; else break; }
    out = out.trim();
    d = out.length >= 100 ? out : d.slice(0, 158).replace(/\s+\S*$/, "").replace(/[,;:\s]+$/, "") + "…";
  }
  for (const e of EXTRAS) {
    if (d.length >= 140) break;
    if ((d + e).length <= 160) d += e;
  }
  return d;
}

function breadcrumbs(site, path, title, categories) {
  const parts = path.split("/").filter(Boolean);
  if (!parts.length) return null;
  const name = String(title).replace(/\s*\|.*$/, "").trim();
  const items = [["Home", "/"]];
  if (parts.length === 1) items.push([name, path]);
  else {
    const cat = categories && categories[parts[0]];
    items.push([cat ? cat.label : SECTION[parts[0]] || parts[0], "/" + parts[0]]);
    items.push([name, path]);
  }
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map(([n, u], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: site.url + (u === "/" ? "/" : u) })),
  };
}

function seo(req, res, next) {
  const render = res.render.bind(res);
  res.render = (view, locals = {}, cb) => {
    const all = { ...res.locals, ...locals };
    // the h1 text before fitting, so breadcrumbs keep the page's own name
    const pageName = locals.breadcrumbName || String(all.title || "").replace(/\s*\|.*$/, "");
    locals.title = fitTitle(all.title, String(all.canonical || "").startsWith("/blog/") ? "blog" : String(all.canonical || "").startsWith("/travel-guide/") ? "guide" : "");
    locals.description = fitDescription(all.description);
    if (!all.noindex && res.statusCode < 400 && typeof all.canonical === "string" && all.canonical !== "/") {
      locals.breadcrumbLd = breadcrumbs(all.site, all.canonical, pageName, all.categories);
    }
    return render(view, locals, cb);
  };
  next();
}

module.exports = { seo, fitTitle, fitDescription };
