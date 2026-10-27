// Loads what the header, mega menu, drawer and footer need on every page.
// Cached briefly in memory; the admin panel clears it after any change.
const { Trip, GuideArticle, BlogPost } = require("../models");
const footerNames = require("../config/footer-names");
const fs = require("fs");
const path = require("path");

// Header Our Blog menu: the small 400px copy of a blog card photo (/assets/blog-cards/<name>-400.webp) when it exists
const PUBLIC = path.join(__dirname, "..", "public");
function thumb(src) {
  const m = /^(\/assets\/blog-cards\/.+)-\d+\.webp$/.exec(src || "");
  return m && fs.existsSync(path.join(PUBLIC, m[1] + "-400.webp")) ? m[1] + "-400.webp" : src;
}

// The Travel Guide dropdown in the header and the Travel Guide column in the footer: the guides shown, in this order,
// each with its Google icon name, short label and description.
const GUIDE_MENU = [
  ["pakistan-at-a-glance", "public", "Pakistan at a Glance", "Key facts for a first visit, from regions to local currency."],
  ["is-pakistan-safe-to-travel", "verified_user", "Safety in Pakistan", "An honest answer on safety, region by region, before you go."],
  ["pakistan-visa-guide", "id_card", "Pakistan Visa Guide", "How the online visa works and when trekking permits apply."],
  ["best-time-to-visit-pakistan", "calendar_month", "Best Time to Visit", "Choose your region first, and the right month will follow."],
  ["trekking-trip-difficulty-grades", "landscape", "Trek Difficulty Grades", "What each grade means and which trek suits your fitness."],
  ["packing-equipment-checklist", "backpack", "Packing Checklist", "What to pack, and the gear that matters above the snow line."],
  ["recommended-flights-airlines", "flight", "Flights & Airlines", "Reaching Islamabad, then onward flights to the mountains."],
  ["flight-cancellations-travel-disruptions", "thunderstorm", "Flight Disruptions", "Plan for mountain weather so a delay never ruins the trip."],
  ["travel-insurance-guide", "health_and_safety", "Travel Insurance", "What your policy must cover for treks in the Karakoram."],
];

let cache = null;
let cachedAt = 0;
const TTL = 60 * 1000;

async function build() {
  const [trips, guides, posts, cards] = await Promise.all([
    Trip.find({ published: true, inMenu: true }).sort({ order: 1, title: 1 }).select("slug title category"),
    GuideArticle.find().sort({ order: 1, number: 1 }).select("slug title number"),
    BlogPost.find({ publishedAt: { $ne: null, $lte: new Date() } }).sort({ publishedAt: -1 }).select("slug title cardTitle cardImage cardImagePosition coverImage"), // footer and header menu: newest first
    // footer Our Services: exactly the cards each category page shows (the same query as pages.category)
    Trip.find({ published: true, onCategoryPage: { $ne: false } }).sort({ order: 1, title: 1 }).select("slug title category"),
  ]);
  const by = (c) => trips.filter((t) => t.category === c);
  const guideMenu = GUIDE_MENU.map(([slug, symbol, label, text]) => ({ g: guides.find((x) => x.slug === slug), symbol, label, text })).filter((i) => i.g);
  return { trekking: by("trekking"), tours: by("tours"), spiritual: by("spiritual"), corporate: by("corporate"), guides, guideMenu, posts, footerNames,
    cards: ["trekking", "tours", "spiritual", "corporate"].flatMap((c) => cards.filter((t) => t.category === c)),
    // header Our Blog menu: the 6 newest posts, each with its card photo and short name
    blogMenu: posts.slice(0, 6).map((p) => ({ url: p.url, title: p.title, label: footerNames[p.url] || p.cardTitle || p.title,
      img: thumb(p.cardImage || p.coverImage), pos: p.cardImagePosition || "" })) };
}

async function load(req, res, next) {
  try {
    if (!cache || Date.now() - cachedAt > TTL) {
      cache = await build();
      cachedAt = Date.now();
    }
    res.locals.nav = cache;
    next();
  } catch (err) {
    next(err);
  }
}

function clear() {
  cache = null;
}

module.exports = { load, clear };
