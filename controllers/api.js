const { body, query, validationResult } = require("express-validator");
const { Trip, Enquiry } = require("../models");
const { TRAVEL_TYPES, GROUP_SIZES } = require("../config/site");
const { sendEnquiryEmails } = require("../config/mailer");

const CATEGORY_KEYS = TRAVEL_TYPES.map((t) => t.value);

/* GET /api/trips?category=trekking */
exports.tripsRules = [query("category").optional().isIn(CATEGORY_KEYS).withMessage("Unknown category")];

exports.listTrips = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ ok: false, error: errors.array()[0].msg });

    const filter = { published: true, inMenu: true };
    if (req.query.category) filter.category = req.query.category;
    const trips = await Trip.find(filter).sort({ category: 1, order: 1, title: 1 }).select("slug title category");
    const type = TRAVEL_TYPES.find((t) => t.value === req.query.category);
    res.set("Cache-Control", "public, max-age=60");
    res.json({
      ok: true,
      trips: trips.map((t) => ({ slug: t.slug, title: t.title, category: t.category, url: t.url })),
      custom: (type && type.custom) || null, // the "Custom pilgrimage" style option, where the form had one
    });
  } catch (err) {
    next(err);
  }
};

/* POST /api/enquiries */
exports.enquiryRules = [
  body("name").isString().trim().isLength({ min: 2, max: 100 }).withMessage("Please enter your name."),
  body("email").isString().trim().isLength({ max: 160 }).isEmail().withMessage("Please enter a valid email address."),
  body("phone").isString().trim().matches(/^[+()\d][\d\s().-]{5,38}$/).withMessage("Please enter a valid contact number."),
  body("country").optional({ values: "falsy" }).isString().trim().isLength({ max: 80 }).withMessage("Please choose a country."),
  body("groupSize").optional({ values: "falsy" }).isIn(GROUP_SIZES).withMessage("Please choose a group size."),
  body("travelType").optional({ values: "falsy" }).isIn(CATEGORY_KEYS).withMessage("Please choose a travel type."),
  body("destination").optional({ values: "falsy" }).isString().trim().isLength({ max: 140 }).withMessage("Please choose a destination."),
  body("message").optional({ values: "falsy" }).isString().trim().isLength({ max: 2000 }).withMessage("Your message is too long (2,000 characters at most)."),
  body("source").optional({ values: "falsy" }).isString().trim().isLength({ max: 200 }),
];

exports.createEnquiry = async (req, res, next) => {
  try {
    // Honeypot: real visitors never see or fill this field. Answer as if it worked and save nothing.
    if (typeof req.body.website === "string" && req.body.website.trim() !== "") {
      return res.status(201).json({ ok: true });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const list = errors.array({ onlyFirstError: true });
      return res.status(422).json({ ok: false, error: list[0].msg, fields: Object.fromEntries(list.map((e) => [e.path, e.msg])) });
    }

    const b = req.body;
    const enquiry = await Enquiry.create({
      name: b.name, country: b.country || "", groupSize: b.groupSize || "", travelType: b.travelType || "",
      destination: b.destination || "", email: b.email, phone: b.phone, message: b.message || "", source: b.source || "",
    });

    // Reply to the visitor straight away; the emails go out in the background.
    res.status(201).json({ ok: true });

    const type = TRAVEL_TYPES.find((t) => t.value === enquiry.travelType);
    sendEnquiryEmails(enquiry, res.locals.site, type ? type.label : "").catch((err) => console.error("[mail]", err.message));
  } catch (err) {
    next(err);
  }
};
