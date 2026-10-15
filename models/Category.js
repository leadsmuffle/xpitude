const mongoose = require("mongoose");

// The copy and photo for each of the four Our Services pages (/trekking, /tours, /spiritual, /corporate).
const categorySchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, enum: ["trekking", "tours", "spiritual", "corporate"] },
    title: { type: String, required: true, trim: true },
    tagline: { type: String, trim: true, default: "" },
    intro: { type: String, trim: true, default: "" },
    image: { type: String, trim: true, default: "" },
    imageAlt: { type: String, trim: true, default: "" },
    infoTitle: { type: String, trim: true, default: "" },        // heading over the booking notes
    closingTitle: { type: String, trim: true, default: "" },     // the red band at the foot of the page
    closingText: { type: String, trim: true, default: "" },
    closingButton: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
