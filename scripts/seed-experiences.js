// Imports the four Our Services pages and their trips and programs (scripts/data/experiences.js) into MongoDB.
//
//   npm run seed:experiences
//
// A trip that already exists (under its new or its older address) is updated, never duplicated. Its homepage
// settings and price are left alone. Running this again overwrites admin edits to the same fields.
const path = require("path");
const { Trip, Category, BookingInfo } = require("../models");
const data = require("./data/experiences");

async function importExperiences(log = console.log) {
  const closing = { infoTitle: data.closing.infoTitle, closingTitle: data.closing.title, closingText: data.closing.text, closingButton: data.closing.button };
  for (const c of data.categories) {
    await Category.updateOne({ key: c.key }, { $set: { ...c, ...closing } }, { upsert: true, runValidators: true });
  }
  for (const b of data.bookingInfo) await BookingInfo.updateOne({ title: b.title }, { $set: b }, { upsert: true, runValidators: true });

  let added = 0, updated = 0;
  for (const { replaces, ...doc } of data.trips) {
    const trip = (await Trip.findOne({ slug: doc.slug })) || (replaces ? await Trip.findOne({ slug: replaces }) : null);
    if (trip) {
      const old = trip.slug;
      trip.set({ ...doc, onCategoryPage: true, inMenu: true });   // inMenu puts it in the enquiry form, which its own page pre-selects
      if (old !== doc.slug && !trip.legacySlugs.includes(old)) trip.legacySlugs.push(old);   // the old address keeps redirecting
      await trip.save();
      updated++;
    } else {
      await Trip.create({ ...doc, legacySlugs: replaces ? [replaces] : [] });
      added++;
    }
  }
  const hidden = await Trip.updateMany({ slug: { $in: data.notInFile } }, { $set: { onCategoryPage: false } });
  log(`Categories    ${data.categories.length} saved`);
  log(`Booking notes ${data.bookingInfo.length} saved`);
  log(`Experiences   ${added} added, ${updated} updated, ${hidden.matchedCount} older trips left off the category pages`);
}

module.exports = importExperiences;

if (require.main === module) {
  require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
  const mongoose = require("mongoose");
  const connectDB = require("../config/db");
  connectDB()
    .then(() => importExperiences())
    .then(() => mongoose.disconnect())
    .catch(async (err) => { console.error("Import failed:", err.message); await mongoose.disconnect().catch(() => {}); process.exit(1); });
}
