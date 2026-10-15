// Everything that was hard-coded in the static site's HTML, with the wording kept as it was.
// Itineraries, includes and excludes are left empty on purpose: the static site had none.
// Add them in the admin panel.

const trips = [
  /* ---------- trekking expeditions (homepage cards, in this order) ---------- */
  { slug: "k2-base-camp-concordia", title: "K2 Base Camp and Concordia", category: "trekking", season: "Jun to Aug",
    altitude: "5,150 M", grade: "Grade IV", region: "Baltistan", durationDays: 21, priceFromUSD: 4950,
    shortDescription: "Up the Baltoro to the amphitheatre where four eight thousanders stand in a single view, with the option of the Gondogoro La crossing on the way out.",
    images: ["/assets/exp-k2.jpg"], imageAlt: "K2 from the Godwin-Austen Glacier", featured: true, highlightOrder: 1, order: 1 },
  { slug: "nanga-parbat-base-camp-fairy-meadows", title: "Nanga Parbat Base Camp and Fairy Meadows", category: "trekking", season: "May to Oct",
    altitude: "4,200 M", grade: "Grade II", region: "Diamer", durationDays: 9, priceFromUSD: 1650,
    shortDescription: "Forest camp to Beyal and on to the Raikot face of the ninth highest mountain on earth. The gentlest way into serious altitude.",
    images: ["/assets/exp-nanga.jpg"], imageAlt: "Moonlight on Nanga Parbat from Fairy Meadows", featured: true, highlightOrder: 2, order: 2 },
  { slug: "haramosh-base-camp-kutwal-lake", title: "Haramosh Base Camp and Kutwal Lake", category: "trekking", season: "Jun to Sep",
    altitude: "3,900 M", grade: "Grade III", region: "Gilgit-Baltistan", durationDays: 11, priceFromUSD: 2100,
    shortDescription: "Up from Sassi through Kutwal village to the lake under the Haramosh wall, one of the least walked classics in the range.",
    images: ["/assets/exp-haramosh.jpg"], imageAlt: "Snow slopes below the Haramosh range", featured: true, highlightOrder: 3, order: 3 },
  { slug: "rush-lake-rush-pari-peak", title: "Rush Lake and Rush Pari Peak", category: "trekking", season: "Jul to Sep",
    altitude: "5,098 M", grade: "Grade IV", region: "Gilgit-Baltistan", durationDays: 14, priceFromUSD: 2850,
    shortDescription: "Over the Barpu Glacier to one of the highest alpine lakes on earth, then the walk up summit above it for the Spantik and Malubiting panorama.",
    images: ["/assets/exp-rush.jpg"], imageAlt: "High camp under the stars in the Karakoram", featured: true, highlightOrder: 5, order: 4 },
  { slug: "nangma-valley-expedition", title: "Nangma Valley Expedition", category: "trekking", season: "Jun to Sep",
    altitude: "4,300 M", grade: "Grade III", region: "Baltistan", durationDays: 12, priceFromUSD: 2450,
    shortDescription: "The Yosemite of Pakistan. Granite towers above Kanday, walked at a pace that leaves time to sit and look at them.",
    images: ["/assets/exp-nangma.jpg"], imageAlt: "Granite walls above the trail in Baltistan", featured: true, order: 5 },
  { slug: "rakaposhi-base-camp", title: "Rakaposhi Base Camp", category: "trekking", season: "May to Oct",
    altitude: "3,500 M", grade: "Grade II", region: "Hunza", durationDays: 7, priceFromUSD: 1250,
    shortDescription: "Two days up from Minapin through the meadow at Hapakun to Tagaphari, camped directly under the north face. The best short trek in Hunza.",
    images: [], imageNote: "Rakaposhi from Minapin", featured: true, highlightOrder: 4, order: 6 },

  /* ---------- tours: the three destination cards on the homepage ---------- */
  { slug: "hunza", title: "Hunza", category: "tours", season: "All year", mode: "Air or road", grade: "Easy", region: "Hunza",
    durationLabel: "5 to 8 days", priceFromUSD: 980,
    shortDescription: "Baltit and Altit forts, Attabad, the Passu Cones and the Hussaini bridge, reached by air through Gilgit or up the Karakoram Highway. Come in October, when the poplars turn.",
    images: ["/assets/tour-air-hunza.jpg"], imageAlt: "Snow peaks above the Hunza valley", featured: true, inMenu: false, order: 1 },
  { slug: "skardu", title: "Skardu", category: "tours", season: "All year", mode: "Air or road", grade: "Easy", region: "Skardu",
    durationLabel: "5 to 8 days", priceFromUSD: 1020,
    shortDescription: "Fly the Nanga Parbat corridor or drive the Indus gorge into Baltistan. Shangrila, Shigar Fort, Khaplu Palace, the Katpana cold desert and a day on the Deosai plateau if the pass is open.",
    images: ["/assets/tour-air-skardu.jpg"], imageAlt: "The Karakoram seen from the air", featured: true, inMenu: false, order: 2 },
  { slug: "chitral-kalash", title: "Chitral & Kalash", category: "tours", season: "May to Sep", mode: "Road", grade: "Moderate", region: "Chitral",
    durationLabel: "7 to 8 days", priceFromUSD: 890,
    shortDescription: "Over the Lowari tunnel into the Hindu Kush for Chitral Fort and Garam Chashma, then the three Kalash valleys with a local host. Time it to Chilam Joshi or Uchal if you want the festival rather than the quiet.",
    images: ["/assets/tour-kalash.jpg"], imageAlt: "Children in a village in the Kalash valleys", featured: true, inMenu: false, order: 3 },

  /* ---------- tours: the individual trips in the mega menu and the form ---------- */
  { slug: "hunza-autumn-trip", title: "Hunza Autumn Trip", category: "tours", season: "October", mode: "Road", grade: "Easy", region: "Hunza",
    durationDays: 7, priceFromUSD: 1150,
    shortDescription: "October, when the poplars turn. Attabad, Passu, Khunjerab and two nights at Duikar for the Rakaposhi sunrise.",
    images: ["/assets/tour-autumn.jpg"], imageAlt: "The Hunza valley in autumn", highlightOrder: 1, order: 11 },
  { slug: "five-day-air-safari-skardu", title: "Five Day Air Safari to Skardu", category: "tours", season: "All year", mode: "Air", grade: "Easy", region: "Skardu",
    durationDays: 5, priceFromUSD: 1290,
    shortDescription: "Fly the Nanga Parbat corridor, then Shangrila, Shigar Fort, the Katpana cold desert and Manthal's carved Buddha.",
    images: ["/assets/tour-air-skardu.jpg"], imageAlt: "The Karakoram seen from the air", highlightOrder: 2, order: 12 },
  { slug: "five-day-air-safari-hunza-valley", title: "Five Day Air Safari to Hunza Valley", category: "tours", season: "All year", mode: "Air", grade: "Easy", region: "Hunza",
    durationDays: 5, priceFromUSD: 1340,
    shortDescription: "Fly to Gilgit and drive up the valley the same afternoon. Baltit and Altit forts, Attabad, the Passu Cones and the Hussaini bridge.",
    images: ["/assets/tour-air-hunza.jpg"], imageAlt: "Snow peaks above the Hunza valley", order: 13 },
  { slug: "road-trip-hunza-valley", title: "Road Trip to Hunza Valley", category: "tours", season: "Apr to Oct", mode: "Road", grade: "Easy", region: "Hunza",
    durationDays: 8, priceFromUSD: 980,
    shortDescription: "The Karakoram Highway from Islamabad at a civilised pace, with nights at Naran, Chilas and four in upper Hunza.",
    images: ["/assets/tour-road-hunza.jpg"], imageAlt: "The Karakoram Highway above the Hunza river", highlightOrder: 4, order: 14 },
  { slug: "road-trip-skardu", title: "Road Trip to Skardu", category: "tours", season: "Apr to Oct", mode: "Road", grade: "Easy", region: "Skardu",
    durationDays: 8, priceFromUSD: 1020,
    shortDescription: "Up the Indus gorge into Baltistan. Shigar, Khaplu Palace, Upper Kachura and a day on the Deosai plateau if the pass is open.",
    images: ["/assets/tour-road-skardu.jpg"], imageAlt: "The road up the Indus gorge toward Skardu", order: 15 },
  { slug: "road-trip-chitral", title: "Road Trip to Chitral", category: "tours", season: "May to Sep", mode: "Road", grade: "Moderate", region: "Chitral",
    durationDays: 7, priceFromUSD: 890,
    shortDescription: "Over the Lowari tunnel into the Hindu Kush. Chitral Fort, Garam Chashma and a day up toward Shandur if the season allows.",
    images: ["/assets/tour-road-chitral.jpg"], imageAlt: "Forest and valley on the road to Chitral", order: 16 },
  { slug: "chitral-kalash-cultural-trip", title: "Chitral and Kalash Cultural Trip", category: "tours", season: "May to Sep", mode: "Road", grade: "Moderate", region: "Chitral",
    durationDays: 8, priceFromUSD: 1180,
    shortDescription: "The three Kalash valleys with a local host, timed to Chilam Joshi or Uchal if you want the festival rather than the quiet.",
    images: ["/assets/tour-kalash.jpg"], imageAlt: "Children in a village in the Kalash valleys", highlightOrder: 3, order: 17 },
  { slug: "cholistan-desert-safari", title: "Cholistan Desert Safari", category: "tours", season: "Nov to Feb", mode: "Four wheel drive", grade: "Easy", region: "Cholistan",
    durationDays: 4, priceFromUSD: 760,
    shortDescription: "Derawar Fort, the Abbasi tombs and two nights under canvas in the dunes. Run in winter, when the desert is worth being in.",
    images: [], imageNote: "Derawar Fort, Cholistan", highlightOrder: 5, order: 18 },

  /* ---------- religious and spiritual journeys ---------- */
  { slug: "shrines-of-the-south", title: "Shrines of the South", category: "spiritual", season: "Oct to Mar", mode: "4 cities", grade: "Easy", region: "Punjab",
    durationDays: 8, priceFromUSD: 1390,
    shortDescription: "Follow the Sufi road from Lahore to Uch Sharif, in the order the Chishti and Suhrawardi orders travelled it. Data Darbar, Baba Farid at Pakpattan and the great tombs of Multan, timed to put you at a working shrine on a Thursday evening.",
    images: [], imageNote: "Shah Rukn e Alam, Multan", featured: true, highlightOrder: 2, order: 1 },
  { slug: "the-gandhara-trail", title: "The Gandhara Trail", category: "spiritual", season: "Sep to Apr", mode: "7 sites", grade: "Easy", region: "Gandhara",
    durationDays: 6, priceFromUSD: 1120,
    shortDescription: "Two thousand years of Buddhist Gandhara, from the stupas of Taxila to the hillside monastery at Takht i Bahi and the rock carvings of Swat. The trail ends at the Kargah Buddha above Gilgit, for those continuing up the Karakoram Highway.",
    images: [], imageNote: "Takht i Bahi monastery", featured: true, highlightOrder: 3, order: 2 },
  { slug: "stillness-at-altitude", title: "Stillness at Altitude", category: "spiritual", season: "May to Sep", mode: "Max 12 guests", grade: "Gentle", region: "Hunza",
    durationDays: 7, priceFromUSD: 1780,
    shortDescription: "A yoga and silence retreat at 2,400 metres in upper Hunza, followed by four nights under canvas on the Deosai plateau. Mornings begin with practice facing Rakaposhi, and there is no signal from the third day onward.",
    images: [], imageNote: "Morning practice, Hunza terrace", featured: true, highlightOrder: 1, order: 3 },

  /* ---------- corporate retreats ---------- */
  { slug: "hunza-leadership-retreat", title: "Hunza Leadership Retreat", category: "corporate", region: "Hunza", durationLabel: "3 nights",
    shortDescription: "Hunza, arrival, altitude, and a working day at Eagle's Nest",
    images: ["/assets/tour-air-hunza.jpg"], imageAlt: "Snow peaks above the Hunza valley", featured: true, order: 1 },
  { slug: "deosai-canvas-camp", title: "Deosai Canvas Camp", category: "corporate", region: "Baltistan", durationLabel: "4 nights",
    shortDescription: "Deosai, canvas camp, no signal, one objective",
    images: ["/assets/camp.jpg"], imageAlt: "Expedition camp under the stars at Goro II, Masherbrum behind", featured: true, order: 2 },
  { slug: "fairy-meadows-team-programme", title: "Fairy Meadows Team Programme", category: "corporate", region: "Diamer", durationLabel: "6 nights",
    shortDescription: "Fairy Meadows, trek, summit viewpoint, closing dinner",
    images: ["/assets/cat-spirit.jpg"], imageAlt: "Still water and pines at Fairy Meadows under moonlight", featured: true, order: 3 },
];

const destinations = [
  { name: "Hunza Valley", region: "Gilgit-Baltistan", altitude: "2,438 M", season: "Apr to Oct", link: "/trips/hunza", order: 1 },
  { name: "Skardu", region: "Baltistan", altitude: "2,228 M", season: "All year", link: "/trips/skardu", order: 2 },
  { name: "Fairy Meadows", region: "Diamer", altitude: "3,300 M", season: "May to Oct", link: "/trips/nanga-parbat-base-camp-fairy-meadows", order: 3 },
  { name: "Kalash Valleys", region: "Chitral", altitude: "1,900 M", season: "May to Sep", link: "/trips/chitral-kalash", order: 4 },
  { name: "Deosai Plains", region: "Baltistan", altitude: "4,114 M", season: "Jun to Sep", link: "/trips/skardu", order: 5 },
];

const testimonials = [
  { quote: "They talked me out of the itinerary I asked for and into the one I actually wanted. Twenty one days later I understood why.",
    name: "Sara Nadeem", trip: "Concordia and Gondogoro La", city: "Dubai", order: 1 },
  { quote: "I have walked with outfitters on four continents. The camp XPITUDE set at 4,600 metres was better run than most lodges I have paid for.",
    name: "Henrik Vogel", trip: "Rush Lake and Rush Pari", city: "Zürich", order: 2 },
  { quote: "Two of us, one guide, and a cook who found fresh apricots at nine thousand feet. Nothing about it felt arranged, and all of it was.",
    name: "Ayesha and Bilal Rehman", trip: "Hunza and Fairy Meadows", city: "London", order: 3 },
];

// The four "Past Expeditions and Unforgettable Memories" items. Imported as drafts (no publishedAt, no body yet).
const blogPosts = [
  { slug: "twenty-one-days-to-concordia", title: "Twenty one days to Concordia",
    excerpt: "Six guests, fourteen days on ice, and a weather window that held just long enough for the Gondogoro La.",
    coverImage: "/assets/arc-1.jpg", coverAlt: "K2 from the Godwin-Austen Glacier", order: 1 },
  { slug: "a-full-moon-over-masherbrum", title: "A full moon over Masherbrum",
    excerpt: "A night at 4,300 metres, and why we now carry insulated sleeping tents on every Baltoro departure.",
    coverImage: "/assets/arc-2.jpg", coverAlt: "Camp under the stars at Goro II", order: 2 },
  { slug: "kutwal-lake-out-of-season", title: "Kutwal Lake, out of season",
    excerpt: "We ran Haramosh three weeks later than usual. Notes on what changed and why the late window may be better.",
    coverImage: "/assets/arc-3.jpg", coverAlt: "Snow slopes below the Haramosh range", order: 3 },
  { slug: "the-people-who-carry-the-expedition", title: "The people who carry the expedition",
    excerpt: "The Balti crew who walk every Baltoro departure, how loads are set and why we cap weight below the limit.",
    coverImage: "/assets/arc-4.jpg", coverAlt: "A porter and pack horse on the Baltoro trail", order: 4 },
];

// The travel journal articles are long, so they live in their own file. They are imported as published posts.
module.exports = { trips, destinations, testimonials, blogPosts: [...blogPosts, ...require("./journal-posts")] };
