// Imports all site content into MongoDB and creates the admin user from .env.
//
//   npm run seed            add anything that is missing, leave your edits alone
//   npm run seed -- --reset wipe trips, guide, testimonials, blog and destinations, then re-import
//
// Enquiries are never touched.
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const path = require("path");
const { pathToFileURL } = require("url");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const { Trip, GuideArticle, Testimonial, BlogPost, Destination, Admin } = require("../models");
const content = require("./data/content");
const importExperiences = require("./seed-experiences");
const importGuidePages = require("./seed-guide-pages");
const importBlogContent = require("./seed-blog-content");

const decode = (s) => s.replace(/&amp;/g, "&");

async function loadGuides() {
  const { GUIDES } = await import(pathToFileURL(path.join(__dirname, "data", "guide-content.mjs")).href);
  const slugs = GUIDES.map((g) => g.slug);
  return GUIDES.map((g, i) => ({
    slug: g.slug,
    number: i + 1,
    order: i + 1,
    title: decode(g.title),
    cardTitle: g.cardTitle || "",
    summary: g.intro,
    metaDescription: g.description,
    image: "/assets/" + g.image,
    // The static pages linked to each other as "slug.html"; the app uses /travel-guide/slug.
    body: g.body.trim().replace(/href="([a-z0-9-]+)\.html"/g, (m, s) => (slugs.includes(s) ? `href="/travel-guide/${s}"` : m)),
  }));
}

async function upsertAll(Model, docs, key, reset) {
  if (reset) await Model.deleteMany({});
  let added = 0;
  for (const doc of docs) {
    const res = await Model.updateOne({ [key]: doc[key] }, { $setOnInsert: doc }, { upsert: true, runValidators: true });
    if (res.upsertedCount) added++;
  }
  console.log(`${Model.modelName.padEnd(13)} ${added} added, ${docs.length - added} already present`);
}

(async () => {
  const reset = process.argv.includes("--reset");
  await connectDB();

  await upsertAll(Trip, content.trips, "slug", reset);
  await upsertAll(Destination, content.destinations, "name", reset);
  await upsertAll(GuideArticle, await loadGuides(), "slug", reset);
  await importGuidePages();
  await upsertAll(Testimonial, content.testimonials, "name", reset);
  await upsertAll(BlogPost, content.blogPosts, "slug", reset);
  await importExperiences();
  await importBlogContent();

  const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "";
  if (!email || !password) {
    console.log("Admin         skipped: set ADMIN_EMAIL and ADMIN_PASSWORD in .env, then run the seed again");
  } else if (password.length < 10) {
    console.log("Admin         skipped: ADMIN_PASSWORD must be at least 10 characters");
  } else {
    const passwordHash = await bcrypt.hash(password, 12);
    const existing = await Admin.findOne({ email });
    await Admin.updateOne({ email }, { $set: { passwordHash } }, { upsert: true });
    console.log(`Admin         ${existing ? "password updated for" : "created"} ${email}`);
  }

  await mongoose.disconnect();
  console.log("Seed complete.");
})().catch(async (err) => {
  console.error("Seed failed:", err.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
