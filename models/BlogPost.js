const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  { src: { type: String, trim: true }, thumb: { type: String, trim: true }, alt: { type: String, trim: true } },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, trim: true, default: "" },
    body: { type: String, default: "" },                        // HTML
    coverImage: { type: String, trim: true, default: "" },
    coverAlt: { type: String, trim: true, default: "" },
    gallery: { type: [photoSchema], default: [] },              // "From the trail" photos after the article
    relatedTrip: { type: String, trim: true, default: "" },     // a trip's slug, or trekking / tours / spiritual / corporate
    order: { type: Number, default: 0 },
    publishedAt: { type: Date, default: null },                 // empty = draft
  },
  { timestamps: true }
);
blogSchema.virtual("published").get(function () { return !!this.publishedAt && this.publishedAt <= new Date(); });
blogSchema.virtual("url").get(function () { return "/blog/" + this.slug; });

module.exports = mongoose.model("BlogPost", blogSchema);
