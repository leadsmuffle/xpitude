// Loads what the header, mega menu, drawer and footer need on every page.
// Cached briefly in memory; the admin panel clears it after any change.
const { Trip, GuideArticle } = require("../models");

let cache = null;
let cachedAt = 0;
const TTL = 60 * 1000;

async function build() {
  const [trips, guides] = await Promise.all([
    Trip.find({ published: true, inMenu: true }).sort({ order: 1, title: 1 }).select("slug title category"),
    GuideArticle.find().sort({ order: 1, number: 1 }).select("slug title number"),
  ]);
  const by = (c) => trips.filter((t) => t.category === c);
  return { trekking: by("trekking"), tours: by("tours"), spiritual: by("spiritual"), corporate: by("corporate"), guides };
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
