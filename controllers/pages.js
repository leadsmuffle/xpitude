const { Trip, Category, BookingInfo, GuideArticle, Testimonial, BlogPost, Destination } = require("../models");
const { CATEGORIES } = require("../config/site");
const { layoutPost, layoutGuide, img: blogImg, esc: blogEsc, bannerFit } = require("../lib/blog-layout");
const BLOG_TAGS = require("../config/blog-tags");

const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next);
const publishedPosts = () => ({ publishedAt: { $ne: null, $lte: new Date() } });
const abs = (site, p) => (/^https?:\/\//.test(p) ? p : site.url + p);

exports.home = wrap(async (req, res) => {
  const site = res.locals.site;
  const [trips, testimonials, posts, destinations] = await Promise.all([
    Trip.find({ published: true }).sort({ order: 1, title: 1 }),
    Testimonial.find({ published: true }).sort({ order: 1 }),
    BlogPost.find().sort({ order: 1, createdAt: 1 }).limit(4),
    Destination.find().sort({ order: 1 }),
  ]);
  const featured = (c) => trips.filter((t) => t.category === c && t.featured);
  const strips = (c) => trips.filter((t) => t.category === c && t.highlightOrder > 0).sort((a, b) => a.highlightOrder - b.highlightOrder).slice(0, 5);

  res.render("index", {
    active: "home",
    canonical: "/",
    title: "XPITUDE | Trekking Expeditions & Tours in Pakistan",
    description: "Trekking expeditions, guided tours and spiritual journeys across Pakistan, from K2 Base Camp to Hunza, planned and led end to end by a licensed tour operator.",
    featured: { trekking: featured("trekking"), tours: featured("tours"), spiritual: featured("spiritual"), corporate: featured("corporate") },
    strips: { trekking: strips("trekking"), tours: strips("tours"), spiritual: strips("spiritual") },
    testimonials, posts, destinations,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: site.name,
      url: site.url + "/",
      image: abs(site, "/assets/hero.jpg"),
      description: res.locals.description,
      ...(site.phone ? { telephone: site.phone } : {}),
      ...(site.email ? { email: site.email } : {}),
      address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: site.address.city, addressCountry: site.address.countryCode },
      areaServed: { "@type": "Country", name: "Pakistan" },
      sameAs: Object.values(site.social).filter(Boolean),
    },
  });
});

exports.category = (key) => wrap(async (req, res) => {
  const cat = CATEGORIES[key];
  const [page, trips, info] = await Promise.all([
    Category.findOne({ key }),
    Trip.find({ published: true, category: key, onCategoryPage: { $ne: false } }).sort({ order: 1, title: 1 }),
    BookingInfo.find().sort({ order: 1 }),
  ]);
  res.render("trips-list", {
    photoImg: blogImg, bannerFit,
    active: "services",
    canonical: cat.path,
    title: `${(page && page.title) || cat.label} in Pakistan | XPITUDE`,
    description: (page && page.intro) || cat.description,
    ogImage: (page && page.image) || "/assets/" + cat.image,
    cat, page, trips, info,
  });
});

// /trips/slug was the address before each trip moved under its category.
exports.tripRedirect = wrap(async (req, res, next) => {
  const slug = String(req.params.slug).toLowerCase();
  const trip = await Trip.findOne({ published: true, $or: [{ slug }, { legacySlugs: slug }] });
  if (!trip) return next();
  res.redirect(301, trip.url);
});

exports.trip = wrap(async (req, res, next) => {
  const slug = String(req.params.slug).toLowerCase();
  const trip = await Trip.findOne({ slug, published: true });
  if (!trip) {
    const moved = await Trip.findOne({ legacySlugs: slug, published: true });
    return moved ? res.redirect(301, moved.url) : next();
  }
  if (trip.category !== req.params.category) return res.redirect(301, trip.url);
  const page = await Category.findOne({ key: trip.category });
  const site = res.locals.site;
  const cat = CATEGORIES[trip.category];
  const longTitle = `${trip.title} | ${cat.label} | XPITUDE`;
  // Very short card copy (the corporate options) is too thin for a search result on its own.
  const description = trip.shortDescription.length >= 70
    ? trip.shortDescription
    : `${trip.title}${trip.duration ? ", " + trip.duration : ""}. ${trip.shortDescription}. ${cat.label} in Pakistan with XPITUDE.`;
  // The next trips on the same Our Services page, wrapping round at the end of the list.
  const siblings = await Trip.find({ published: true, category: trip.category, onCategoryPage: { $ne: false }, _id: { $ne: trip._id } }).sort({ order: 1, title: 1 });
  const after = siblings.findIndex((t) => t.order > trip.order);
  const related = after < 0 ? siblings : [...siblings.slice(after), ...siblings.slice(0, after)];

  res.render("trip", {
    photoImg: blogImg, photoEsc: blogEsc, bannerFit,
    active: "services",
    canonical: trip.url,
    title: longTitle.length <= 70 ? longTitle : `${trip.title} | XPITUDE`,
    description,
    ogImage: trip.image || "/assets/" + cat.image,
    trip, cat, page, related: related.slice(0, 3),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: trip.title,
      description,
      url: site.url + trip.url,
      ...(trip.image ? { image: abs(site, trip.image) } : {}),
      touristType: cat.label,
      ...(trip.fullItinerary.length
        ? { itinerary: { "@type": "ItemList", itemListElement: trip.fullItinerary.map((d, i) => ({ "@type": "ListItem", position: i + 1, name: d.title, description: d.description })) } }
        : {}),
      ...(typeof trip.priceFromUSD === "number"
        ? { offers: { "@type": "Offer", price: trip.priceFromUSD, priceCurrency: "USD", url: site.url + trip.url, availability: "https://schema.org/InStock" } }
        : {}),
      provider: { "@type": "TravelAgency", name: site.name, url: site.url + "/" },
    },
  });
});

exports.guideIndex = wrap(async (req, res) => {
  const guides = await GuideArticle.find().sort({ order: 1, number: 1 });
  res.render("guide-index", {
    active: "guide",
    canonical: "/travel-guide",
    title: "Pakistan Travel Guide: Visas, Seasons, Treks | XPITUDE",
    description: "The XPITUDE travel guide to Pakistan: safety, visas, seasons, trek grades, packing, flights, insurance and medical preparation.",
    ogImage: "/assets/camp.jpg",
    guides,
    blogHelpers: { img: blogImg, esc: blogEsc, bannerFit },
  });
});

exports.guideArticle = wrap(async (req, res, next) => {
  const guides = await GuideArticle.find().sort({ order: 1, number: 1 });
  const i = guides.findIndex((g) => g.slug === req.params.slug);
  if (i < 0) return next();
  const guide = guides[i];
  res.render("guide-article", {
    active: "guide",
    canonical: guide.url,
    title: `${guide.title} | XPITUDE Travel Guide`,
    description: guide.metaDescription || guide.summary,
    ogImage: guide.image || "/assets/camp.jpg",
    ogType: "article",
    guide, guides, index: i, prev: guides[i - 1], next: guides[i + 1],
    // the guide text with its photos in order (lib/blog-layout.js)
    guideHtml: layoutGuide(guide),
    blogHelpers: { img: blogImg, esc: blogEsc, bannerFit },
    jsonLd: {
      "@context": "https://schema.org", "@type": "Article",
      headline: guide.title, description: guide.metaDescription || guide.summary,
      ...(guide.image ? { image: abs(res.locals.site, guide.image) } : {}),
      datePublished: guide.createdAt.toISOString(), dateModified: guide.updatedAt.toISOString(),
      author: { "@type": "Organization", name: res.locals.site.name, url: res.locals.site.url + "/" },
      publisher: { "@type": "Organization", name: res.locals.site.name, url: res.locals.site.url + "/" },
      mainEntityOfPage: res.locals.site.url + guide.url,
    },
  });
});

exports.blogIndex = wrap(async (req, res) => {
  // The Search button on the page sends ?q=. It matches the words anywhere in a post's title, summary or text.
  const q = String(req.query.q || "").trim().slice(0, 60);
  const match = q ? new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") : null;
  const posts = await BlogPost.find({ ...publishedPosts(), ...(match ? { $or: [{ title: match }, { excerpt: match }, { body: match }] } : {}) }).sort({ publishedAt: -1 });
  res.render("blog-index", {
    q,
    active: "blog",
    canonical: "/blog",
    title: "Our Blog | Past Expeditions and Memories | XPITUDE",
    description: "Stories and notes from XPITUDE expeditions in the Karakoram, the Himalaya and the Hindu Kush.",
    ogImage: "/assets/arc-1.jpg",
    posts,
  });
});

exports.blogPost = wrap(async (req, res, next) => {
  const post = await BlogPost.findOne({ slug: req.params.slug, ...publishedPosts() });
  if (!post) return next();
  const site = res.locals.site;
  // The trip card at the end of the post: the named trip, or its service page when the post names a category.
  let related = null, trip = null;
  if (post.relatedTrip) {
    trip = await Trip.findOne({ slug: post.relatedTrip, published: true });
    if (trip) related = { url: trip.url, title: trip.title, tagline: trip.tagline, image: trip.image, imageAlt: trip.imageAlt, label: "Plan this trip" };
    // the same photo as the post's banner would show twice on the page: use the service page photo instead
    if (trip && trip.image === post.coverImage) { const page = await Category.findOne({ key: trip.category }); related.image = (page && page.image) || "/assets/" + CATEGORIES[trip.category].image; related.imageAlt = (page && page.imageAlt) || CATEGORIES[trip.category].imageAlt; }
    else if (CATEGORIES[post.relatedTrip]) {
      const page = await Category.findOne({ key: post.relatedTrip });
      related = { url: CATEGORIES[post.relatedTrip].path, title: (page && page.title) || CATEGORIES[post.relatedTrip].label, tagline: page && page.tagline,
        image: (page && page.image) || "/assets/" + CATEGORIES[post.relatedTrip].image, imageAlt: page && page.imageAlt, label: "Explore our trips" };
    }
  }
  // the banner photo, and the body laid out with the post's own photos (see lib/blog-layout.js)
  const banner = post.bannerImage || post.coverImage;
  const layout = layoutPost(post, { banner });
  res.render("blog-post", {
    related, trip, banner, layout, tag: BLOG_TAGS[post.slug] || "Journal",
    blogHelpers: { img: blogImg, esc: blogEsc, bannerFit },
    active: "blog",
    canonical: post.url,
    title: `${post.title} | XPITUDE`,
    description: post.excerpt,
    ogImage: post.coverImage || "/assets/arc-1.jpg",
    ogType: "article",
    post,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt.toISOString(),
      dateModified: post.updatedAt.toISOString(),
      ...(banner ? { image: abs(site, banner) } : {}),
      author: { "@type": "Organization", name: site.name },
      publisher: { "@type": "Organization", name: site.name },
      mainEntityOfPage: site.url + post.url,
    },
  });
});

exports.testimonials = wrap(async (req, res) => {
  const testimonials = await Testimonial.find({ published: true }).sort({ order: 1 });
  res.render("testimonials", {
    active: "testimonials",
    canonical: "/testimonials",
    title: "Client Testimonials | XPITUDE Treks & Tours in Pakistan",
    description: "What travellers say about trekking and touring Pakistan with XPITUDE.",
    testimonials,
  });
});

exports.about = wrap(async (req, res) => {
  res.render("about", {
    active: "about",
    canonical: "/about",
    title: "About XPITUDE | Licensed Tour Operator in Pakistan",
    description: "XPITUDE is a licensed tour operator planning and leading trekking expeditions, tours and spiritual journeys across Pakistan, end to end.",
    ogImage: "/assets/camp.jpg",
  });
});

exports.contact = wrap(async (req, res) => {
  res.render("contact", {
    active: "contact",
    canonical: "/contact",
    title: "Contact XPITUDE | Plan Your Trek or Tour in Pakistan",
    description: "Contact XPITUDE to plan a trekking expedition, tour or retreat in Pakistan. Call, message on WhatsApp, email or send an enquiry.",
    ogImage: "/assets/camp.jpg",
  });
});

exports.legal = (which) => (req, res) => {
  const privacy = which === "privacy";
  res.render("legal", {
    canonical: privacy ? "/privacy-policy" : "/terms-of-service",
    title: privacy ? "Privacy Policy | XPITUDE Licensed Tour Operator, Pakistan" : "Terms of Service | XPITUDE Tour Operator, Pakistan",
    description: privacy
      ? "How XPITUDE collects, uses and protects the information you send through this website."
      : "The terms that apply to using the XPITUDE website, enquiries, bookings and travel with XPITUDE.",
    which,
  });
};

exports.sitemap = wrap(async (req, res) => {
  const site = res.locals.site;
  const [trips, guides, posts] = await Promise.all([
    Trip.find({ published: true }).select("slug category updatedAt"),
    GuideArticle.find().select("slug updatedAt"),
    BlogPost.find(publishedPosts()).select("slug updatedAt"),
  ]);
  const urls = [
    ["/", null, "1.0"], ["/trekking", null, "0.9"], ["/tours", null, "0.9"], ["/spiritual", null, "0.9"], ["/corporate", null, "0.8"],
    ["/travel-guide", null, "0.8"], ["/about", null, "0.6"], ["/blog", null, "0.6"], ["/testimonials", null, "0.6"],
    ["/contact", null, "0.7"], ["/privacy-policy", null, "0.2"], ["/terms-of-service", null, "0.2"],
    ...trips.map((t) => [t.url, t.updatedAt, "0.8"]),
    ...guides.map((g) => ["/travel-guide/" + g.slug, g.updatedAt, "0.7"]),
    ...posts.map((p) => ["/blog/" + p.slug, p.updatedAt, "0.5"]),
  ];
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map(([loc, mod, pri]) =>
      `  <url><loc>${site.url}${loc}</loc>${mod ? `<lastmod>${mod.toISOString().slice(0, 10)}</lastmod>` : ""}<priority>${pri}</priority></url>`
    ).join("\n") +
    "\n</urlset>\n";
  res.type("application/xml").send(xml);
});

exports.robots = (req, res) => {
  // AI search and answer engines are welcome on the public pages; the admin and the API are off limits to everyone.
  const ai = ["GPTBot", "OAI-SearchBot", "PerplexityBot", "Google-Extended", "ClaudeBot"];
  res.type("text/plain").send(
    ["User-agent: *", "Disallow: /admin", "Disallow: /api/", "",
      ...ai.flatMap((bot) => [`User-agent: ${bot}`, "Allow: /", "Disallow: /admin", "Disallow: /api/", ""]),
      `Sitemap: ${res.locals.site.url}/sitemap.xml`, ""].join("\n")
  );
};

// A plain summary of XPITUDE and its main pages for AI assistants (see llmstxt.org).
exports.llms = wrap(async (req, res) => {
  const site = res.locals.site;
  const [pages, trips, guides, posts] = await Promise.all([
    Category.find().sort({ order: 1 }),
    Trip.find({ published: true, onCategoryPage: { $ne: false } }).sort({ category: 1, order: 1 }),
    GuideArticle.find().sort({ order: 1, number: 1 }),
    BlogPost.find(publishedPosts()).sort({ publishedAt: -1 }),
  ]);
  const line = (title, url, note) => `- [${title}](${site.url}${url})${note ? ": " + note : ""}`;
  const out = [
    "# XPITUDE", "",
    `> ${res.locals.description}`, "",
    `XPITUDE (${site.tagline}) is a licensed tour operator in Gilgit-Baltistan, Pakistan, with an office at ${site.address.street}, ${site.address.city}. It plans and leads trekking expeditions, tours and sightseeing, spiritual and cultural retreats, and corporate programmes across Pakistan. A licensed guide and trained crew go on every departure, and a planner replies to enquiries within one working day.`, "",
    "## Main pages", line("Home", "/"), line("About us", "/about"), line("Contact and enquiries", "/contact"), line("Travel Guide", "/travel-guide"), line("Blog", "/blog"), "",
    "## Services", ...pages.map((p) => line(p.title, "/" + p.key, [p.tagline, p.intro].filter(Boolean).join(". "))), "",
    ...pages.flatMap((p) => [`## ${p.title}`, ...trips.filter((t) => t.category === p.key).map((t) => line(t.title, t.url, [t.tagline, t.durationLabel].filter(Boolean).join(", "))), ""]),
    "## Travel Guide", ...guides.map((g) => line(g.title, g.url, g.summary)), "",
    "## Blog", ...posts.map((p) => line(p.title, p.url, p.excerpt)), "",
  ];
  res.type("text/plain; charset=utf-8").send(out.join("\n"));
});
