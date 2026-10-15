const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    quote: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    trip: { type: String, trim: true, default: "" },
    city: { type: String, trim: true, default: "" },
    image: { type: String, trim: true, default: "" },           // optional portrait; a neutral avatar is shown without one
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);
testimonialSchema.virtual("cite").get(function () { return [this.trip, this.city].filter(Boolean).join(" · "); });

module.exports = mongoose.model("Testimonial", testimonialSchema);
