// Imports the Travel Guide photos and article text (scripts/data/guide-pages.js) into MongoDB.
//
//   npm run seed:guides
//
// Updates the nine guides by their address. Running this again overwrites admin edits to their photo and text.
const path = require("path");
const { GuideArticle } = require("../models");
const pages = require("./data/guide-pages");

async function importGuidePages(log = console.log) {
  let updated = 0;
  for (const [slug, page] of Object.entries(pages)) {
    const res = await GuideArticle.updateOne({ slug }, { $set: page }, { runValidators: true });
    updated += res.matchedCount;
  }
  log(`Guide pages   ${updated} of ${Object.keys(pages).length} updated`);
}

module.exports = importGuidePages;

if (require.main === module) {
  require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
  const mongoose = require("mongoose");
  const connectDB = require("../config/db");
  connectDB()
    .then(() => importGuidePages())
    .then(() => mongoose.disconnect())
    .catch(async (err) => { console.error("Import failed:", err.message); await mongoose.disconnect().catch(() => {}); process.exit(1); });
}
