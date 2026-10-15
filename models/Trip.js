const mongoose = require("mongoose");

const daySchema = new mongoose.Schema(
  // label is what the page prints beside the step ("Day 1", "9:00 AM", "Kumrat, Day 1"); without one it prints "Day N".
  { day: Number, label: { type: String, trim: true }, title: { type: String, trim: true }, description: { type: String, trim: true } },
  { _id: false }
);

const factSchema = new mongoose.Schema(
  { label: { type: String, trim: true }, value: { type: String, trim: true } },
  { _id: false }
);

const tripSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: ["trekking", "tours", "spiritual", "corporate"], index: true },
    season: { type: String, trim: true, default: "" },          // card badge, e.g. "Jun to Aug"
    altitude: { type: String, trim: true, default: "" },        // e.g. "5,150 M"
    mode: { type: String, trim: true, default: "" },            // e.g. "Road", "Air or road", "4 cities"
    grade: { type: String, trim: true, default: "" },           // e.g. "Grade IV", "Easy"
    region: { type: String, trim: true, default: "" },
    durationDays: { type: Number, min: 0 },
    durationLabel: { type: String, trim: true, default: "" },   // e.g. "21 days", "5 to 8 days", "3 nights"
    priceFromUSD: { type: Number, min: 0 },
    shortDescription: { type: String, trim: true, default: "" },
    tagline: { type: String, trim: true, default: "" },         // the line under the title
    overview: { type: String, trim: true, default: "" },        // further intro paragraphs, one per blank line
    factsTitle: { type: String, trim: true, default: "" },      // "Fast Facts" or "At a Glance"
    facts: { type: [factSchema], default: [] },
    itineraryTitle: { type: String, trim: true, default: "" },  // "Day by Day", "Sample Program", "The Day"
    highlightsTitle: { type: String, trim: true, default: "" }, // "Trip Highlights" or "What You Get"
    highlights: { type: [String], default: [] },
    services: { type: [String], default: [] },
    infoTitle: { type: String, trim: true, default: "" },       // "Important Information" or "Good to Know"
    info: { type: [String], default: [] },
    says: { type: String, trim: true, default: "" },            // the "XPITUDE Says" line
    ctaLabel: { type: String, trim: true, default: "" },        // enquiry button text
    ctaNote: { type: String, trim: true, default: "" },         // the line beside the button
    fullItinerary: { type: [daySchema], default: [] },
    includes: { type: [String], default: [] },
    excludes: { type: [String], default: [] },
    images: { type: [String], default: [] },                    // paths under /assets or /uploads
    imageAlt: { type: String, trim: true, default: "" },
    imagePosition: { type: String, trim: true, default: "" },  // focus point of the card photo, e.g. "center top" or "center 30%"
    imageNote: { type: String, trim: true, default: "" },       // "Photograph needed" caption shown while there is no image
    featured: { type: Boolean, default: false },                // shown as a card on the homepage
    inMenu: { type: Boolean, default: true },                   // listed in the mega menu and the enquiry form
    highlightOrder: { type: Number, default: 0 },               // 1..5 = strip under "Three Ways to Travel With Us", 0 = none
    onCategoryPage: { type: Boolean, default: true },           // listed on its Our Services page
    legacySlugs: { type: [String], default: [] },               // earlier addresses that redirect here
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

tripSchema.virtual("image").get(function () { return this.images && this.images[0] ? this.images[0] : ""; });
tripSchema.virtual("spec").get(function () { return [this.altitude || this.mode, this.grade].filter(Boolean).join(" · "); });
tripSchema.virtual("price").get(function () {
  return typeof this.priceFromUSD === "number" ? "$" + this.priceFromUSD.toLocaleString("en-US") : "";
});
tripSchema.virtual("duration").get(function () {
  return this.durationLabel || (this.durationDays ? this.durationDays + " days" : "");
});
tripSchema.virtual("url").get(function () { return "/" + this.category + "/" + this.slug; });

module.exports = mongoose.model("Trip", tripSchema);
