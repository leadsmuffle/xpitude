// Imports the full text, photos, listing summary and related trip of every blog post (scripts/data/blog-content.js).
//
//   npm run seed:blog
//
// Sets each post's text, cover, gallery photos, listing summary and related trip.
// Updates existing posts by their address (slug) and never creates new ones. Running it again overwrites admin edits
// to the same fields.
const path = require("path");
const { BlogPost } = require("../models");
const content = require("./data/blog-content");

async function importBlogContent(log = console.log) {
  let updated = 0;
  for (const [slug, data] of Object.entries(content)) {
    const res = await BlogPost.updateOne({ slug }, { $set: data }, { runValidators: true });
    updated += res.matchedCount;
  }
  log(`Blog content  ${updated} of ${Object.keys(content).length} posts updated`);
}

module.exports = importBlogContent;

if (require.main === module) {
  require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
  const mongoose = require("mongoose");
  const connectDB = require("../config/db");
  connectDB()
    .then(() => importBlogContent())
    .then(() => mongoose.disconnect())
    .catch(async (err) => { console.error("Import failed:", err.message); await mongoose.disconnect().catch(() => {}); process.exit(1); });
}
