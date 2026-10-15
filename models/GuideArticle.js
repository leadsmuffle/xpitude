const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ },
    number: { type: Number, required: true },
    title: { type: String, required: true, trim: true },
    summary: { type: String, trim: true, default: "" },         // intro line under the heading
    metaDescription: { type: String, trim: true, default: "" },
    image: { type: String, trim: true, default: "" },
    imageAlt: { type: String, trim: true, default: "" },        // describes the header photo
    body: { type: String, default: "" },                        // HTML
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);
guideSchema.virtual("url").get(function () { return "/travel-guide/" + this.slug; });

module.exports = mongoose.model("GuideArticle", guideSchema);
