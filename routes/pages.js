const router = require("express").Router();
const pages = require("../controllers/pages");

/* 301s from the old static site URLs */
router.get("/index.html", (req, res) => res.redirect(301, "/"));
router.get("/contact.html", (req, res) => res.redirect(301, "/contact"));
router.get("/travel-guide/index.html", (req, res) => res.redirect(301, "/travel-guide"));
router.get("/travel-guide/:slug.html", (req, res) => res.redirect(301, "/travel-guide/" + encodeURIComponent(req.params.slug)));
/* trailing slash */
router.get(/^\/(.+)\/$/, (req, res) => res.redirect(301, "/" + req.params[0]));

router.get("/", pages.home);
router.get("/trekking", pages.category("trekking"));
router.get("/tours", pages.category("tours"));
router.get("/spiritual", pages.category("spiritual"));
router.get("/corporate", pages.category("corporate"));
router.get("/:category(trekking|tours|spiritual|corporate)/:slug", pages.trip);
router.get("/trips/:slug", pages.tripRedirect);   // the earlier trip addresses

router.get("/travel-guide", pages.guideIndex);
router.get("/travel-guide/:slug", pages.guideArticle);

router.get("/about", pages.about);
router.get("/blog", pages.blogIndex);
router.get("/blog/:slug", pages.blogPost);
router.get("/testimonials", pages.testimonials);
router.get("/contact", pages.contact);
router.get("/privacy-policy", pages.legal("privacy"));
router.get("/terms-of-service", pages.legal("terms"));
// The old addresses of the two pages
router.get("/privacy", (req, res) => res.redirect(301, "/privacy-policy"));
router.get("/terms", (req, res) => res.redirect(301, "/terms-of-service"));

router.get("/sitemap.xml", pages.sitemap);
router.get("/robots.txt", pages.robots);
router.get("/llms.txt", pages.llms);

module.exports = router;
