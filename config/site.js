// Site-wide settings read from .env and injected into every template as `site`.
// Nothing here is hard-coded contact information: change .env, not this file.

const env = (k, d = "") => (process.env[k] || d).trim();

function build() {
  const phone = env("PHONE");
  const whatsapp = env("WHATSAPP");
  // WHATSAPP may be a full link or just a number.
  const waDigits = whatsapp.replace(/[^\d]/g, "");
  const whatsappUrl = /^https?:\/\//.test(whatsapp) ? whatsapp : waDigits ? "https://wa.me/" + waDigits : "";
  const whatsappText = /^https?:\/\//.test(whatsapp) ? phone : whatsapp;
  // The chat link used by the WhatsApp buttons: the number's digits, with an opening message filled in.
  const whatsappChat = waDigits ? "https://wa.me/" + waDigits + "?text=Hi%20XPITUDE%2C%20I'd%20like%20to%20plan%20a%20trip." : "";

  return {
    name: "XPITUDE",
    tagline: "experience altitude",
    url: env("SITE_URL", "http://localhost:" + env("PORT", "3000")).replace(/\/+$/, ""),
    phone,
    phoneHref: phone ? "tel:" + phone.replace(/[^\d+]/g, "") : "",
    whatsappUrl,
    whatsappText: whatsappText || phone,
    whatsappChat,
    email: env("CONTACT_EMAIL"),
    // The office address is part of the site copy, not a setting.
    address: { street: "336 G3 Johar Town, Floor 1", city: "Lahore", country: "Pakistan", countryCode: "PK" },
    social: {
      instagram: env("INSTAGRAM_URL"),
      tiktok: env("TIKTOK_URL"),
      youtube: env("YOUTUBE_URL"),
      facebook: env("FACEBOOK_URL"),
    },
    // The social icons in the header and footer. An icon is hidden when its link is empty.
    follow: {
      linkedin: env("SOCIAL_LINKEDIN"),
      facebook: env("SOCIAL_FACEBOOK"),
      instagram: env("SOCIAL_INSTAGRAM"),
      x: env("SOCIAL_X"),
    },
    facts: [
      "Licensed tour operator, Gilgit-Baltistan",
      "Licensed guide and trained crew on every departure",
      "A planner replies within one working day",
    ],
  };
}

const CATEGORIES = {
  trekking: {
    key: "trekking", path: "/trekking", label: "Trekking Expeditions", n: "01",
    sub: "Routes worth the year you'll spend thinking about them.",
    blurb: "Base camps, high passes and glacier routes, fully supported.",
    image: "cat-trek.jpg", imageAlt: "A porter and pack horse on the Baltoro trail",
    enquire: "Enquire about an expedition",
    description: "Fully supported trekking expeditions in Pakistan: K2 Base Camp and Concordia, Nanga Parbat, Haramosh, Rush Lake, Nangma Valley and Rakaposhi.",
  },
  tours: {
    key: "tours", path: "/tours", label: "Tours and Sightseeing", n: "02",
    sub: "The north in five days, or the country in two weeks.",
    blurb: "Air safaris and road journeys through the north and the south.",
    image: "cat-tours.jpg", imageAlt: "Looking out over the Hunza valley from a high viewpoint",
    enquire: "Enquire about a tour",
    description: "Guided tours and sightseeing in Pakistan: air safaris and road journeys to Hunza, Skardu, Chitral and the Kalash valleys, and the Cholistan desert.",
  },
  spiritual: {
    key: "spiritual", path: "/spiritual", label: "Religious and Spiritual Journeys", n: "03",
    menuLabel: "Spiritual Trips and Yoga Retreats",
    sub: "Routes that were walked long before they were itineraries.",
    blurb: "Shrines, Buddhist heritage and silence at altitude.",
    image: "cat-spirit.jpg", imageAlt: "Still water and pines at Fairy Meadows under moonlight",
    enquire: "Enquire about a journey",
    description: "Religious and spiritual journeys in Pakistan: the Sufi shrines of the south, the Buddhist Gandhara trail and a yoga and silence retreat in Hunza.",
  },
  corporate: {
    key: "corporate", path: "/corporate", label: "Corporate Retreats", n: "04",
    menuLabel: "Corporate and Team Retreats",
    sub: "Take the leadership team above three thousand metres.",
    blurb: "Leadership retreats and team programmes in the mountains.",
    image: "camp.jpg", imageAlt: "Expedition camp under the stars at Goro II, Masherbrum behind",
    enquire: "Request a proposal",
    description: "Corporate and team retreats in northern Pakistan: Hunza, Deosai and Fairy Meadows programmes for leadership teams.",
  },
};

// Travel type labels shown in the enquiry form, in the order the form lists them.
const TRAVEL_TYPES = [
  { value: "trekking", label: "Trekking Expeditions" },
  { value: "tours", label: "Tours and Sightseeing" },
  { value: "corporate", label: "Team Building Activities", custom: "Custom corporate programme" },
  { value: "spiritual", label: "Religious Trips", custom: "Custom pilgrimage" },
];
const GROUP_SIZES = ["1 to 2", "3 to 6", "7 to 12", "13 to 25", "25 or more"];
const ENQUIRY_STATUSES = ["new", "contacted", "booked", "closed"];

module.exports = { build, CATEGORIES, TRAVEL_TYPES, GROUP_SIZES, ENQUIRY_STATUSES };
