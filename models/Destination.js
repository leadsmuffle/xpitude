const mongoose = require("mongoose");

// The "Signature Destinations" index on the homepage.
const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    region: { type: String, trim: true, default: "" },
    altitude: { type: String, trim: true, default: "" },
    season: { type: String, trim: true, default: "" },
    link: { type: String, trim: true, default: "/contact" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Destination", destinationSchema);
