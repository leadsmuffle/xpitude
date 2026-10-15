const mongoose = require("mongoose");
const { ENQUIRY_STATUSES } = require("../config/site");

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    country: { type: String, trim: true, maxlength: 80, default: "" },
    groupSize: { type: String, trim: true, maxlength: 20, default: "" },
    travelType: { type: String, enum: ["trekking", "tours", "spiritual", "corporate", ""], default: "", index: true },
    destination: { type: String, trim: true, maxlength: 140, default: "" },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, required: true, trim: true, maxlength: 40 },
    message: { type: String, trim: true, maxlength: 2000, default: "" },
    status: { type: String, enum: ENQUIRY_STATUSES, default: "new", index: true },
    notes: { type: String, trim: true, maxlength: 5000, default: "" },
    source: { type: String, trim: true, maxlength: 200, default: "" }, // page the form was sent from
  },
  { timestamps: true }
);
enquirySchema.index({ createdAt: -1 });

module.exports = mongoose.model("Enquiry", enquirySchema);
