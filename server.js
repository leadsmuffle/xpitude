require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");

const connectDB = require("./config/db");
const siteConfig = require("./config/site");
const nav = require("./middleware/nav");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();
const isProd = process.env.NODE_ENV === "production";
const ASSET_VERSION = require("./package.json").version + "-" + Date.now().toString(36);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("trust proxy", 1); // Render and Railway sit behind one proxy; needed for correct client IPs in rate limits
app.disable("x-powered-by");
app.locals.icon = require("./config/icons");

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        objectSrc: ["'none'"],
        ...(isProd ? { upgradeInsecureRequests: [] } : {}),
      },
    },
    crossOriginEmbedderPolicy: false,
    // The default (no-referrer) makes browsers send "Origin: null" on form posts, which the admin same-origin check would refuse.
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    hsts: isProd,
  })
);
app.use(compression());

// Static files. Asset URLs carry ?v=, so they can be cached for a long time.
app.use("/assets", express.static(path.join(__dirname, "public", "assets"), { maxAge: "30d", immutable: isProd }));
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads"), { maxAge: "7d" }));
app.use(express.static(path.join(__dirname, "public"), { maxAge: "1h", index: false }));

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "200kb" }));

// Values every template can use.
app.use((req, res, next) => {
  res.locals.site = siteConfig.build();
  res.locals.categories = siteConfig.CATEGORIES;
  res.locals.travelTypes = siteConfig.TRAVEL_TYPES;
  res.locals.groupSizes = siteConfig.GROUP_SIZES;
  res.locals.v = ASSET_VERSION;
  res.locals.path = req.path;
  res.locals.year = new Date().getFullYear();
  // Defaults for the <head> partial; pages override what they need.
  res.locals.title = "XPITUDE | Experience Altitude";
  res.locals.description = "Trekking expeditions, guided tours and spiritual journeys across Pakistan. Planned, booked and led end to end.";
  res.locals.ogImage = "/assets/hero.jpg";
  res.locals.ogType = "website";
  res.locals.jsonLd = null;
  res.locals.noindex = false;
  res.locals.active = "";
  next();
});

app.use("/api", require("./routes/api"));
app.use("/admin", require("./routes/admin"));
app.use("/", nav.load, require("./middleware/seo").seo, require("./routes/pages"));

app.use(nav.load, notFound);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3000;
connectDB()
  .then(() => {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
      console.warn("WARNING: JWT_SECRET is missing or shorter than 32 characters. Admin login is disabled until it is set.");
    }
    app.listen(PORT, () => console.log(`XPITUDE running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Could not start:", err.message);
    process.exit(1);
  });

module.exports = app;
