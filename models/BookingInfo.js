const mongoose = require("mongoose");

// The "Good to Know Before You Book" notes shown at the foot of every Our Services page.
const bookingInfoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookingInfo", bookingInfoSchema);
