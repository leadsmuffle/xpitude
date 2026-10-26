const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ },
    number: { type: Number, required: true },
    title: { type: String, required: true, trim: true },
    cardTitle: { type: String, trim: true, default: "" },      // short one-line title for the card on /travel-guide
    summary: { type: String, trim: true, default: "" },         // intro line under the heading
    metaDescription: { type: String, trim: true, default: "" },
    image: { type: String, trim: true, default: "" },
    imageAlt: { type: String, trim: true, default: "" },        // describes the header photo
    body: { type: String, default: "" },                        // HTML
    articlePhotos: { type: [{ src: { type: String, trim: true }, thumb: { type: String, trim: true }, alt: { type: String, trim: true } }], default: [] }, // photos in the text, in order: text width, large, small, small, text width
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);
guideSchema.virtual("url").get(function () { return "/travel-guide/" + this.slug; });

module.exports = mongoose.model("GuideArticle", guideSchema);
