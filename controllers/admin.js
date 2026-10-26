const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { Trip, Category, BookingInfo, Enquiry, GuideArticle, Testimonial, BlogPost, Admin } = require("../models");
const { TRAVEL_TYPES, ENQUIRY_STATUSES } = require("../config/site");
const auth = require("../middleware/auth");
const nav = require("../middleware/nav");

const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next);
const typeLabel = (v) => (TRAVEL_TYPES.find((t) => t.value === v) || {}).label || v || "";
const slugify = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/&/g, " and ")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const lines = (s) => String(s || "").split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
// Compared against when the email is unknown, so both cases take the same time.
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);

/* ------------------------------------------------------------------ */
/* Resources managed by the generic list/form screens                  */
/* ------------------------------------------------------------------ */
const RESOURCES = {
  trips: {
    model: Trip, singular: "trip", plural: "Trips", sort: { category: 1, order: 1 }, viewUrl: (d) => "/" + d.category + "/" + d.slug,
    columns: [["title", "Title"], ["category", "Category"], ["price", "From"], ["duration", "Duration"], ["featured", "Home card"], ["published", "Published"]],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "URL slug", type: "slug", help: "Lowercase words joined by hyphens. Leave empty to create it from the title. Changing it changes the page address." },
      { name: "category", label: "Category", type: "select", required: true, options: [["trekking", "Trekking Expeditions"], ["tours", "Tours and Sightseeing"], ["spiritual", "Religious and Spiritual Journeys"], ["corporate", "Corporate Retreats"]] },
      { name: "cardTitle", label: "Card title", type: "text", help: "A short version of the title for the cards, about 28 characters so it fits on one line. Leave empty to use the full title." },
      { name: "tagline", label: "Tagline", type: "text", help: "The line under the title." },
      { name: "shortDescription", label: "Short description", type: "textarea", rows: 4, help: "Shown on the card and as the first paragraph of the trip page." },
      { name: "overview", label: "More introduction", type: "textarea", rows: 4, help: "Further paragraphs under the short description. Leave an empty line between paragraphs." },
      { name: "factsTitle", label: "Facts heading", type: "text", help: 'For example "Fast Facts" or "At a Glance".' },
      { name: "facts", label: "Facts", type: "pairs", rows: 7, help: "One per line, as: Label | Value. For example: Duration | 21 Days, Islamabad to Islamabad" },
      { name: "season", label: "Season", type: "text", help: 'The badge on the photo, for example "Jun to Aug".' },
      { name: "altitude", label: "Altitude", type: "text", help: 'For example "5,150 M". Leave empty for tours.' },
      { name: "mode", label: "Travel style", type: "text", help: 'Shown when there is no altitude, for example "Road" or "Air or road".' },
      { name: "grade", label: "Grade or difficulty", type: "text", help: 'For example "Grade IV" or "Easy".' },
      { name: "region", label: "Region", type: "text" },
      { name: "durationDays", label: "Duration in days", type: "number" },
      { name: "durationLabel", label: "Duration text", type: "text", help: 'Optional. Overrides the number, for example "5 to 8 days" or "3 nights".' },
      { name: "priceFromUSD", label: "Price from, USD per person", type: "number", help: 'Leave empty to show "On request".' },
      { name: "itineraryTitle", label: "Itinerary heading", type: "text", help: 'For example "Day by Day", "Sample Program" or "The Day".' },
      { name: "fullItinerary", label: "Itinerary", type: "steps", rows: 12, help: "One step per line, as: Label | What happens. For example: Day 1 | Arrive in Islamabad. A line without a label is numbered Day 1, Day 2 and so on." },
      { name: "highlightsTitle", label: "Highlights heading", type: "text", help: 'For example "Trip Highlights" or "What You Get".' },
      { name: "highlights", label: "Highlights", type: "lines", rows: 5, help: "One item per line." },
      { name: "includes", label: "Included", type: "lines", rows: 5, help: "One item per line." },
      { name: "excludes", label: "Not included", type: "lines", rows: 5, help: "One item per line." },
      { name: "services", label: "Services", type: "lines", rows: 6, help: "One item per line. Used by the corporate programs." },
      { name: "infoTitle", label: "Notes heading", type: "text", help: 'For example "Important Information" or "Good to Know".' },
      { name: "info", label: "Notes", type: "lines", rows: 5, help: "One item per line." },
      { name: "says", label: "XPITUDE Says", type: "text", help: "The closing line shown as a quote." },
      { name: "ctaLabel", label: "Enquiry button text", type: "text", help: 'For example "Find My Retreat".' },
      { name: "ctaNote", label: "Line beside the button", type: "text" },
      { name: "images", label: "Photographs", type: "images", rows: 3, help: 'One path per line; the first is the main photo. Uploading a file puts it first. With no photo the card shows "Photograph needed".' },
      { name: "photos", label: "Trip page photos", type: "gallery", rows: 8, help: "Photos inside the trip page and its gallery, one per line, as: large photo | thumbnail | description. The first is shown wide after the introduction." },
      { name: "imageAlt", label: "Photo description", type: "text", help: "Read aloud by screen readers and used by search engines." },
      { name: "imagePosition", label: "Photo focus point", type: "text", help: 'Which part of the photo stays in view on the cards, e.g. "center top" for peaks or "center 30%" for people. Leave empty for the centre.' },
      { name: "imageNote", label: "Photograph needed caption", type: "text", help: "Shown on the placeholder while there is no photo." },
      { name: "featured", label: "Show as a card on the homepage", type: "checkbox" },
      { name: "inMenu", label: "List in the Our Services menu and the enquiry form", type: "checkbox" },
      { name: "onCategoryPage", label: "Show on its Our Services page", type: "checkbox" },
      { name: "highlightOrder", label: "Homepage strip position", type: "number", help: "1 to 5 places it in the strips under Three Ways to Travel With Us. 0 leaves it out." },
      { name: "order", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "checkbox" },
    ],
  },
  categories: {
    model: Category, singular: "service page", plural: "Service pages", sort: { order: 1 }, viewUrl: (d) => "/" + d.key,
    columns: [["title", "Title"], ["key", "Page"], ["tagline", "Tagline"]],
    fields: [
      { name: "key", label: "Page", type: "select", required: true, options: [["trekking", "/trekking"], ["tours", "/tours"], ["spiritual", "/spiritual"], ["corporate", "/corporate"]] },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "intro", label: "Introduction", type: "textarea", rows: 4 },
      { name: "image", label: "Header photo", type: "image" },
      { name: "imageAlt", label: "Photo description", type: "text" },
      { name: "infoTitle", label: "Booking notes heading", type: "text", help: "The heading over the notes at the foot of the page. The notes themselves are under Booking notes." },
      { name: "closingTitle", label: "Closing heading", type: "text", help: "The red band at the foot of the page." },
      { name: "closingText", label: "Closing line", type: "text" },
      { name: "closingButton", label: "Closing button text", type: "text" },
      { name: "order", label: "Sort order", type: "number" },
    ],
  },
  "booking-notes": {
    model: BookingInfo, singular: "booking note", plural: "Booking notes", sort: { order: 1 }, viewUrl: () => "/trekking",
    columns: [["title", "Title"], ["order", "Order"]],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "body", label: "Text", type: "textarea", rows: 4 },
      { name: "order", label: "Sort order", type: "number" },
    ],
  },
  testimonials: {
    model: Testimonial, singular: "testimonial", plural: "Testimonials", sort: { order: 1 }, viewUrl: () => "/testimonials",
    columns: [["name", "Name"], ["trip", "Trip"], ["city", "City"], ["published", "Published"]],
    fields: [
      { name: "quote", label: "Quote", type: "textarea", rows: 4, required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "trip", label: "Trip", type: "text" },
      { name: "city", label: "City", type: "text" },
      { name: "image", label: "Portrait", type: "image", help: "Optional. A neutral avatar is shown without one." },
      { name: "order", label: "Sort order", type: "number" },
      { name: "published", label: "Published", type: "checkbox" },
    ],
  },
  blog: {
    model: BlogPost, singular: "blog post", plural: "Blog posts", sort: { order: 1, createdAt: -1 }, viewUrl: (d) => (d.published ? "/blog/" + d.slug : ""),
    columns: [["title", "Title"], ["status", "Status"], ["order", "Order"]],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "URL slug", type: "slug", help: "Leave empty to create it from the title." },
      { name: "excerpt", label: "Excerpt", type: "textarea", rows: 3, help: "Shown on the homepage and the blog index." },
      { name: "body", label: "Body (HTML)", type: "html", rows: 18, help: "Use <h2>, <p>, <ul><li>, <a href> and <img src>." },
      { name: "coverImage", label: "Cover image", type: "image" },
      { name: "coverAlt", label: "Cover image description", type: "text" },
      { name: "bannerImage", label: "Post page banner photo", type: "image", help: "The photo at the top of the post page. Leave empty to use the cover image." },
      { name: "bannerFocus", label: "Banner photo focus point", type: "text", help: "Which part of the banner photo stays in view, for example: center 40% (lower numbers show more of the top). Empty = center 40%." },
      { name: "cardTitle", label: "Card title", type: "text", help: "A short title on one line for the cards on the blog page. Leave empty to use the full title." },
      { name: "cardImage", label: "Card photo", type: "image", help: "The photo on the blog page cards. Leave empty to use the cover image." },
      { name: "cardImagePosition", label: "Card photo focus point", type: "text", help: "Which part of the photo stays in view when it is cropped, for example: center 40% (higher numbers show more of the bottom)." },
      { name: "articlePhotos", label: "Article photos", type: "gallery", rows: 6, help: "The photos inside the article, one per line, as: large photo | thumbnail | description (the caption is the part after the colon). In this order: 1 at the width of the text, 2 large, 3 and 4 small (beside the large one), 5 full width. With 3 or 4 lines: 1 text width, 2 large, the last one full width. With 2: text width and large. Use only photos from this post's own folder." },
      { name: "gallery", label: "Gallery photos", type: "gallery", rows: 8, help: "The photos after the article, one per line, as: large photo | thumbnail | description. For example: /assets/journal/k2/05.webp | /assets/journal/k2/05-600.webp | Trekkers on the Baltoro Glacier" },
      { name: "relatedTrip", label: "Related trip", type: "text", help: 'The card at the end of the post: a trip address such as "k2-base-camp-gondogoro-la", or a service page: trekking, tours, spiritual or corporate.' },
      { name: "order", label: "Homepage position", type: "number", help: "The four lowest numbers appear on the homepage." },
      { name: "publishedAt", label: "Publish date", type: "date", help: "Leave empty to keep the post as a draft. A future date schedules it." },
    ],
  },
  guide: {
    model: GuideArticle, singular: "guide article", plural: "Guide articles", sort: { order: 1, number: 1 }, viewUrl: (d) => "/travel-guide/" + d.slug,
    columns: [["number", "No."], ["title", "Title"], ["slug", "Slug"]],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "cardTitle", label: "Card title", type: "text", help: "Short title on one line for the card on the Travel Guide page. Leave empty to use the full title." },
      { name: "slug", label: "URL slug", type: "slug", help: "Leave empty to create it from the title." },
      { name: "number", label: "Number", type: "number", required: true, help: "The 01 to 10 shown beside the title." },
      { name: "summary", label: "Summary", type: "textarea", rows: 2, help: "The line under the heading." },
      { name: "metaDescription", label: "Search description", type: "textarea", rows: 2 },
      { name: "image", label: "Header image", type: "image" },
      { name: "imageAlt", label: "Header image description", type: "text", help: "Read aloud by screen readers." },
      { name: "articlePhotos", label: "Article photos", type: "gallery", rows: 6, help: "The photos in the guide text, one per line, as: large photo | thumbnail | description (shown as the caption). In this order: 1 at the width of the text, 2 large, 3 and 4 small (beside the large one), 5 one more at the width of the text. They replace the photos written in the body." },
      { name: "body", label: "Body (HTML)", type: "html", rows: 24, help: 'Photos: <figure class="gfig"><img src="..." alt="..."><figcaption>...</figcaption></figure>. Add gfig--side to set one beside the text.' },
      { name: "order", label: "Sort order", type: "number" },
    ],
  },
};
exports.RESOURCES = RESOURCES;

function resource(req, res, next) {
  const r = RESOURCES[req.params.resource];
  if (!r) return next("route");
  req.resource = r;
  res.locals.resourceKey = req.params.resource;
  res.locals.resource = r;
  next();
}
exports.resource = resource;

/** Turns submitted form values into a document, field type by field type. */
function parseForm(r, body, file) {
  const doc = {};
  const uploaded = file ? "/uploads/" + file.filename : "";
  for (const f of r.fields) {
    const raw = body[f.name];
    switch (f.type) {
      case "checkbox": doc[f.name] = raw === "on" || raw === "true"; break;
      case "number": doc[f.name] = raw === "" || raw == null ? (f.required ? NaN : undefined) : Number(raw); break;
      case "lines": doc[f.name] = lines(raw); break;
      case "images": doc[f.name] = [...(uploaded ? [uploaded] : []), ...lines(raw)].filter((v, i, a) => a.indexOf(v) === i); break;
      case "image": doc[f.name] = uploaded || String(raw || "").trim(); break;
      case "gallery":
        doc[f.name] = lines(raw).map((line) => {
          const [src, thumb, ...alt] = line.split("|").map((x) => x.trim());
          return { src, thumb: thumb || src, alt: alt.join(" | ") };
        }).filter((p) => p.src);
        break;
      case "pairs":
        doc[f.name] = lines(raw).map((line) => {
          const cut = line.indexOf("|");
          return { label: (cut < 0 ? "" : line.slice(0, cut)).trim(), value: (cut < 0 ? line : line.slice(cut + 1)).trim() };
        });
        break;
      case "steps":
        doc[f.name] = lines(raw).map((line, i) => {
          const cut = line.indexOf("|");
          return { day: i + 1, label: (cut < 0 ? "" : line.slice(0, cut)).trim(), title: "", description: (cut < 0 ? line : line.slice(cut + 1)).trim() };
        });
        break;
      case "itinerary":
        doc[f.name] = lines(raw).map((line, i) => {
          const cut = line.indexOf("|");
          return { day: i + 1, title: (cut < 0 ? line : line.slice(0, cut)).trim(), description: cut < 0 ? "" : line.slice(cut + 1).trim() };
        });
        break;
      case "date": {
        const d = raw ? new Date(raw + "T00:00:00Z") : null;
        doc[f.name] = d && !isNaN(d) ? d : null;
        break;
      }
      case "slug": doc[f.name] = slugify(raw) || slugify(body.title); break;
      default: doc[f.name] = typeof raw === "string" ? raw.trim() : "";
    }
  }
  return doc;
}

/** The reverse: a document as the strings the form shows. */
function formValues(r, doc) {
  const out = {};
  for (const f of r.fields) {
    const v = doc ? doc[f.name] : undefined;
    switch (f.type) {
      case "checkbox": out[f.name] = doc ? !!v : f.name !== "featured"; break;
      case "lines": case "images": out[f.name] = (v || []).join("\n"); break;
      case "itinerary": out[f.name] = (v || []).map((d) => (d.description ? `${d.title} | ${d.description}` : d.title)).join("\n"); break;
      case "gallery": out[f.name] = (v || []).map((p) => [p.src, p.thumb, p.alt].join(" | ")).join("\n"); break;
      case "pairs": out[f.name] = (v || []).map((p) => (p.label ? `${p.label} | ${p.value}` : p.value)).join("\n"); break;
      case "steps": out[f.name] = (v || []).map((d) => { const l = d.label || d.title; return l ? `${l} | ${d.description || ""}` : d.description || ""; }).join("\n"); break;
      case "date": out[f.name] = v ? new Date(v).toISOString().slice(0, 10) : ""; break;
      default: out[f.name] = v == null || (typeof v === "number" && isNaN(v)) ? "" : String(v);
    }
  }
  return out;
}

const friendly = (err) => {
  if (err && err.code === 11000) return "That URL slug is already used by another item. Choose a different one.";
  if (err && err.name === "ValidationError") return Object.values(err.errors).map((e) => e.message).join(" ");
  if (err && err.name === "MulterError") return err.code === "LIMIT_FILE_SIZE" ? "That image is larger than 5 MB." : "The upload failed: " + err.message;
  return null;
};

/* ------------------------------------------------------------------ */
/* Login                                                               */
/* ------------------------------------------------------------------ */
exports.loginPage = (req, res) => {
  if (auth.currentAdmin(req)) return res.redirect("/admin");
  res.render("admin/login", { error: null, email: "", ready: !!auth.secret() });
};

exports.login = wrap(async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");
  const fail = (msg, status = 401) => res.status(status).render("admin/login", { error: msg, email, ready: !!auth.secret() });

  if (!auth.secret()) return fail("Admin login is disabled: set JWT_SECRET (32 characters or more) in .env and restart.", 503);
  const admin = email ? await Admin.findOne({ email }) : null;
  const ok = await bcrypt.compare(password, admin ? admin.passwordHash : DUMMY_HASH);
  if (!admin || !ok) return fail("That email and password do not match.");

  auth.setSession(res, admin);
  res.redirect("/admin");
});

exports.logout = (req, res) => {
  auth.clearSession(res);
  res.redirect("/admin/login");
};

/* ------------------------------------------------------------------ */
/* Dashboard                                                           */
/* ------------------------------------------------------------------ */
exports.dashboard = wrap(async (req, res) => {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const [total, week, month, byType, byStatus, recent, counts] = await Promise.all([
    Enquiry.countDocuments(),
    Enquiry.countDocuments({ createdAt: { $gte: weekAgo } }),
    Enquiry.countDocuments({ createdAt: { $gte: monthStart } }),
    Enquiry.aggregate([{ $group: { _id: "$travelType", n: { $sum: 1 } } }, { $sort: { n: -1 } }]),
    Enquiry.aggregate([{ $group: { _id: "$status", n: { $sum: 1 } } }]),
    Enquiry.find().sort({ createdAt: -1 }).limit(6),
    Promise.all([Trip.countDocuments(), Testimonial.countDocuments(), BlogPost.countDocuments(), GuideArticle.countDocuments()]),
  ]);
  const statusMap = Object.fromEntries(byStatus.map((s) => [s._id, s.n]));
  res.render("admin/dashboard", {
    section: "dashboard",
    stats: { total, week, month, isNew: statusMap.new || 0 },
    byType: byType.map((t) => ({ label: typeLabel(t._id) || "Not given", n: t.n })),
    byStatus: ENQUIRY_STATUSES.map((s) => ({ status: s, n: statusMap[s] || 0 })),
    maxType: Math.max(1, ...byType.map((t) => t.n)),
    recent, typeLabel,
    counts: { trips: counts[0], testimonials: counts[1], blog: counts[2], guide: counts[3] },
  });
});

/* ------------------------------------------------------------------ */
/* Enquiries                                                           */
/* ------------------------------------------------------------------ */
const statusFilter = (req) => (ENQUIRY_STATUSES.includes(req.query.status) ? { status: req.query.status } : {});

exports.enquiries = wrap(async (req, res) => {
  const filter = statusFilter(req);
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const per = 50;
  const [items, total] = await Promise.all([
    Enquiry.find(filter).sort({ createdAt: -1 }).skip((page - 1) * per).limit(per),
    Enquiry.countDocuments(filter),
  ]);
  res.render("admin/enquiries", {
    section: "enquiries", items, total, page, pages: Math.max(1, Math.ceil(total / per)),
    status: filter.status || "", statuses: ENQUIRY_STATUSES, typeLabel, saved: req.query.saved === "1",
  });
});

exports.enquiriesCsv = wrap(async (req, res) => {
  const items = await Enquiry.find(statusFilter(req)).sort({ createdAt: -1 });
  const cols = ["createdAt", "name", "country", "groupSize", "travelType", "destination", "email", "phone", "message", "status", "notes", "source"];
  const cell = (v) => {
    let s = v instanceof Date ? v.toISOString() : String(v == null ? "" : v);
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; // stop spreadsheets treating visitor text as a formula
    return '"' + s.replace(/"/g, '""') + '"';
  };
  const rows = [cols.join(",")].concat(items.map((e) => cols.map((c) => cell(c === "travelType" ? typeLabel(e[c]) : e[c])).join(",")));
  const name = `xpitude-enquiries${req.query.status ? "-" + statusFilter(req).status : ""}-${new Date().toISOString().slice(0, 10)}.csv`;
  res.set("Content-Type", "text/csv; charset=utf-8");
  res.set("Content-Disposition", `attachment; filename="${name}"`);
  res.send("﻿" + rows.join("\r\n") + "\r\n");
});

const validId = (id) => mongoose.isValidObjectId(id);

exports.enquiry = wrap(async (req, res, next) => {
  if (!validId(req.params.id)) return next();
  const item = await Enquiry.findById(req.params.id);
  if (!item) return next();
  res.render("admin/enquiry", { section: "enquiries", item, statuses: ENQUIRY_STATUSES, typeLabel, saved: req.query.saved === "1" });
});

exports.updateEnquiry = wrap(async (req, res, next) => {
  if (!validId(req.params.id)) return next();
  const update = {};
  if (ENQUIRY_STATUSES.includes(req.body.status)) update.status = req.body.status;
  if (typeof req.body.notes === "string") update.notes = req.body.notes.slice(0, 5000);
  const item = await Enquiry.findByIdAndUpdate(req.params.id, { $set: update }, { new: true, runValidators: true });
  if (!item) return next();
  // The table's quick status menu returns to the list; the detail page returns to itself.
  res.redirect(req.body.back === "list" ? "/admin/enquiries?saved=1" + (req.body.filter ? "&status=" + encodeURIComponent(req.body.filter) : "") : `/admin/enquiries/${item._id}?saved=1`);
});

exports.deleteEnquiry = wrap(async (req, res, next) => {
  if (!validId(req.params.id)) return next();
  await Enquiry.findByIdAndDelete(req.params.id);
  res.redirect("/admin/enquiries");
});

/* ------------------------------------------------------------------ */
/* Generic CRUD                                                        */
/* ------------------------------------------------------------------ */
exports.list = wrap(async (req, res) => {
  const r = req.resource;
  const items = await r.model.find().sort(r.sort);
  res.render("admin/list", { section: req.params.resource, items, saved: req.query.saved === "1", deleted: req.query.deleted === "1" });
});

exports.newForm = (req, res) => {
  res.render("admin/form", { section: req.params.resource, item: null, values: formValues(req.resource, null), error: null });
};

exports.editForm = wrap(async (req, res, next) => {
  if (!validId(req.params.id)) return next();
  const item = await req.resource.model.findById(req.params.id);
  if (!item) return next();
  res.render("admin/form", { section: req.params.resource, item, values: formValues(req.resource, item), error: null });
});

exports.save = wrap(async (req, res, next) => {
  const r = req.resource;
  const id = req.params.id;
  if (id && !validId(id)) return next();
  const data = parseForm(r, req.body, req.file);
  try {
    let item;
    if (id) {
      item = await r.model.findById(id);
      if (!item) return next();
      item.set(data);
      await item.save();
    } else {
      item = await r.model.create(data);
    }
    nav.clear();
    res.redirect(`/admin/${req.params.resource}?saved=1`);
  } catch (err) {
    const message = friendly(err);
    if (!message) throw err;
    const item = id ? await r.model.findById(id) : null;
    res.status(422).render("admin/form", { section: req.params.resource, item, values: formValues(r, data), error: message });
  }
});

exports.remove = wrap(async (req, res, next) => {
  if (!validId(req.params.id)) return next();
  await req.resource.model.findByIdAndDelete(req.params.id);
  nav.clear();
  res.redirect(`/admin/${req.params.resource}?deleted=1`);
});

exports.uploadError = (err, req, res, next) => {
  const message = friendly(err);
  if (!message || !req.resource) return next(err);
  res.status(422).render("admin/form", { section: req.params.resource, item: null, values: formValues(req.resource, null), error: message });
};
