const router = require("express").Router();
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");
const api = require("../controllers/api");

// The API is for this site's own pages. Only SITE_URL may call it from a browser.
router.use(cors({ origin: (process.env.SITE_URL || "").replace(/\/+$/, "") || false, methods: ["GET", "POST"] }));

const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: (req, res) =>
    res.status(429).json({ ok: false, error: "You have sent several enquiries in a short time. Please wait a few minutes, or contact us directly." }),
});
const readLimiter = rateLimit({ windowMs: 60 * 1000, limit: 120, standardHeaders: "draft-7", legacyHeaders: false });

router.get("/trips", readLimiter, api.tripsRules, api.listTrips);
router.post("/enquiries", enquiryLimiter, api.enquiryRules, api.createEnquiry);

router.use((req, res) => res.status(404).json({ ok: false, error: "Not found" }));

module.exports = router;
