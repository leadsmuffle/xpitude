// The four service categories and their trips and programs, from XPITUDE_Experience_Pages_Brief.docx.
// Imported by "npm run seed:experiences" (and by "npm run seed"). The wording is the Word file's own.
// After the first import, edit this content in the admin panel; running the import again overwrites those edits.
module.exports = {
  "categories": [
    {
      "key": "trekking",
      "image": "/assets/cat-trek.jpg",
      "imageAlt": "A porter and pack horse on the Baltoro trail below the Trango Towers",
      "title": "Trekking Expeditions",
      "tagline": "Where the Road Ends",
      "intro": "Six expeditions into the greatest mountain landscape on Earth, from a week among the wildflowers of Fairy Meadows to three weeks on the Baltoro Glacier. Every itinerary is built with honest acclimatization and buffer days, because the mountains set the schedule, not us.",
      "order": 1
    },
    {
      "key": "tours",
      "image": "/assets/trip-tours-hero.jpg",
      "imageAlt": "The Karakoram seen from the window of the Skardu flight",
      "title": "Tours & Sightseeing",
      "tagline": "See Pakistan Properly",
      "intro": "Mountains, deserts and living cultures, without the hard climbing. Five journeys for people who want the views, the food and the stories, at a pace that leaves room to actually enjoy them.",
      "order": 2
    },
    {
      "key": "spiritual",
      "image": "/assets/cat-spirit.jpg",
      "imageAlt": "Still water and pines at Fairy Meadows under moonlight",
      "title": "Spiritual & Cultural Retreats",
      "tagline": "Travel That Means Something",
      "intro": "Shrines that have welcomed pilgrims for centuries, mountain retreats built for stillness, and the streets and kitchens of old Lahore. Five journeys into the soul of the country.",
      "order": 3
    },
    {
      "key": "corporate",
      "image": "/assets/camp.jpg",
      "imageAlt": "Expedition camp under the stars at Goro II, Masherbrum behind",
      "title": "Corporate & Enterprise Solutions",
      "tagline": "Extraordinary Places. Remarkable Results.",
      "intro": "Retreats, conferences, celebrations, CSR programs and productions, designed around your goals and delivered end to end by one team that knows the ground.",
      "order": 4
    }
  ],
  "trips": [
    {
      "slug": "k2-base-camp-gondogoro-la",
      "imagePosition": "center top",
      "replaces": "k2-base-camp-concordia",
      "title": "K2 Base Camp & Gondogoro La Trek",
      "category": "trekking",
      "tagline": "The Ultimate Karakoram Expedition",
      "shortDescription": "Four of the world's fourteen 8,000 m peaks. One glacier highway. A night crossing over a 5,585 m pass with crampons on your boots and K2 behind you.",
      "overview": "This is the trek mountaineers dream about, and it is not for first timers. We built in the acclimatization and buffer days most short itineraries skip, because standing at K2 Base Camp should feel like a triumph, not a race.",
      "factsTitle": "Fast Facts",
      "facts": [
        {
          "label": "Duration",
          "value": "21 Days, Islamabad to Islamabad"
        },
        {
          "label": "Grade",
          "value": "Extreme, with a technical pass crossing"
        },
        {
          "label": "Max Altitude",
          "value": "5,585 m at Gondogoro La"
        },
        {
          "label": "Best Season",
          "value": "Late June to August"
        },
        {
          "label": "Stay",
          "value": "Hotels in Islamabad and Skardu, expedition camping on trek"
        },
        {
          "label": "Departure",
          "value": "Islamabad, Lahore transfer on request"
        }
      ],
      "itineraryTitle": "Day by Day",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Day 1",
          "title": "",
          "description": "Arrive in Islamabad. Expedition briefing and full kit check."
        },
        {
          "day": 2,
          "label": "Day 2",
          "title": "",
          "description": "Fly to Skardu, about one hour, weather permitting. If flights are grounded we drive the Karakoram Highway and use the reserve days."
        },
        {
          "day": 3,
          "label": "Day 3",
          "title": "",
          "description": "Skardu. Final permit formalities, supplies and a gentle acclimatization walk."
        },
        {
          "day": 4,
          "label": "Day 4",
          "title": "",
          "description": "Jeep through the Braldu Valley to Askole, around 3,000 m. Six to seven hours of pure drama."
        },
        {
          "day": 5,
          "label": "Day 5",
          "title": "",
          "description": "Trek to Jhola. First taste of glacial rivers and big skies."
        },
        {
          "day": 6,
          "label": "Day 6",
          "title": "",
          "description": "Trek to Paiju, with your first look at the snout of the Baltoro Glacier and the Trango Towers."
        },
        {
          "day": 7,
          "label": "Day 7",
          "title": "",
          "description": "Rest and acclimatization at Paiju."
        },
        {
          "day": 8,
          "label": "Day 8",
          "title": "",
          "description": "Step onto the Baltoro Glacier and trek to Khoburtse."
        },
        {
          "day": 9,
          "label": "Day 9",
          "title": "",
          "description": "Trek to Urdukas, a grassy perch facing Trango and Cathedral Towers."
        },
        {
          "day": 10,
          "label": "Day 10",
          "title": "",
          "description": "Trek to Goro II, camping on the glacier itself."
        },
        {
          "day": 11,
          "label": "Day 11",
          "title": "",
          "description": "Reach Concordia, around 4,600 m, the throne room of the mountain gods."
        },
        {
          "day": 12,
          "label": "Day 12",
          "title": "",
          "description": "Walk via Broad Peak Base Camp to K2 Base Camp, around 5,000 m, and the Gilkey Memorial. Return to Concordia."
        },
        {
          "day": 13,
          "label": "Day 13",
          "title": "",
          "description": "Rest day at Concordia. Crampon and rope practice for the pass."
        },
        {
          "day": 14,
          "label": "Day 14",
          "title": "",
          "description": "Trek to Ali Camp at the foot of Gondogoro La."
        },
        {
          "day": 15,
          "label": "Day 15",
          "title": "",
          "description": "Midnight start. Cross Gondogoro La on fixed ropes with sunrise over K2, then descend to Khuspang."
        },
        {
          "day": 16,
          "label": "Day 16",
          "title": "",
          "description": "Descend through the Gondogoro Valley to Saicho."
        },
        {
          "day": 17,
          "label": "Day 17",
          "title": "",
          "description": "Final trek to Hushe village. Overnight in Hushe."
        },
        {
          "day": 18,
          "label": "Day 18",
          "title": "",
          "description": "Drive to Skardu. Hot showers have never felt this good."
        },
        {
          "day": 19,
          "label": "Day 19",
          "title": "",
          "description": "Fly to Islamabad, weather permitting."
        },
        {
          "day": 20,
          "label": "Day 20",
          "title": "",
          "description": "Reserve day for weather, flights or the pass."
        },
        {
          "day": 21,
          "label": "Day 21",
          "title": "",
          "description": "Departure from Islamabad."
        }
      ],
      "highlightsTitle": "Trip Highlights",
      "highlights": [
        "K2, Broad Peak, the Gasherbrums and Masherbrum in a single panorama",
        "Sunrise from Gondogoro La",
        "Camping at Concordia",
        "The full length of the Baltoro Glacier",
        "Exit through the green Hushe Valley"
      ],
      "includes": [
        "Expedition leader and local support crew",
        "Camping equipment and trekking meals",
        "Group transport and agreed expedition logistics",
        "Pass crossing support arranged with the expedition team"
      ],
      "excludes": [
        "Personal trekking and technical gear such as crampons and harness",
        "Travel and rescue insurance",
        "Emergency evacuation and rescue costs",
        "Personal expenses and unforeseen contingency costs"
      ],
      "services": [],
      "infoTitle": "Important Information",
      "info": [
        "Suitable only for fit, experienced trekkers with prior high altitude experience.",
        "Gondogoro La requires fixed rope support, a night start and appropriate equipment. The pass is crossed only when the team leader judges conditions safe. If not, the group returns along the Baltoro.",
        "Skardu flights are frequently delayed by weather. Reserve days exist for this reason.",
        "Permit requirements for the Central Karakoram and Gondogoro La are confirmed at booking."
      ],
      "says": "Your next big story begins where the road ends.",
      "ctaLabel": "Enquire About This Expedition",
      "ctaNote": "Small expedition teams. Tell us your experience and preferred dates.",
      "images": [
        "/assets/exp-k2.jpg"
      ],
      "imageAlt": "K2 from the Godwin-Austen Glacier",
      "order": 1,
      "durationLabel": "21 days",
      "durationDays": 21,
      "grade": "Extreme",
      "altitude": "5,585 M",
      "season": "Late June to August"
    },
    {
      "slug": "fairy-meadows-nanga-parbat-base-camp",
      "imagePosition": "center 40%",
      "replaces": "nanga-parbat-base-camp-fairy-meadows",
      "title": "Fairy Meadows & Nanga Parbat Base Camp",
      "category": "trekking",
      "tagline": "A Fairytale with an 8,000 m Backdrop",
      "shortDescription": "Wake up to Nanga Parbat filling your window. Sip chai on a wooden porch. Walk through pine forest to the foot of the ninth highest mountain on Earth.",
      "overview": "Fairy Meadows is the place that makes you forget your phone exists, and the jeep track getting there is half the story.",
      "factsTitle": "Fast Facts",
      "facts": [
        {
          "label": "Duration",
          "value": "6 Days, Islamabad to Islamabad"
        },
        {
          "label": "Grade",
          "value": "Moderate"
        },
        {
          "label": "Max Altitude",
          "value": "About 3,967 m on foot at Nanga Parbat Base Camp. Babusar Top, 4,173 m, by road"
        },
        {
          "label": "Best Season",
          "value": "Mid June to September"
        },
        {
          "label": "Stay",
          "value": "Hotels and wooden huts"
        },
        {
          "label": "Departure",
          "value": "Islamabad. Lahore guests connect the evening before"
        }
      ],
      "itineraryTitle": "Day by Day",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Day 1",
          "title": "",
          "description": "Drive from Islamabad via the Hazara Motorway into Kaghan Valley. Overnight in Naran."
        },
        {
          "day": 2,
          "label": "Day 2",
          "title": "",
          "description": "Cross Babusar Top to Raikot Bridge. Jeep the famous cliffside track to Tattu, then hike two to three hours to Fairy Meadows."
        },
        {
          "day": 3,
          "label": "Day 3",
          "title": "",
          "description": "Trek through Beyal Camp to Nanga Parbat Base Camp and back. A long, rewarding day of eight to ten hours."
        },
        {
          "day": 4,
          "label": "Day 4",
          "title": "",
          "description": "Slow day. Sunrise on the Raikot Face, Reflection Lake, forest walks and a sky full of stars."
        },
        {
          "day": 5,
          "label": "Day 5",
          "title": "",
          "description": "Hike down to Tattu, jeep to Raikot Bridge and drive to Chilas or Naran."
        },
        {
          "day": 6,
          "label": "Day 6",
          "title": "",
          "description": "Return to Islamabad. Lahore guests continue by road the same evening."
        }
      ],
      "highlightsTitle": "Trip Highlights",
      "highlights": [
        "The Raikot Face of Nanga Parbat",
        "One of Pakistan's most thrilling jeep tracks",
        "Wooden huts in alpine forest",
        "Beyal Camp and base camp viewpoints",
        "Mountain photography and stargazing"
      ],
      "includes": [
        "Group transport and local jeeps",
        "Accommodation as per itinerary",
        "Scheduled meals",
        "Trekking guide and group support"
      ],
      "excludes": [
        "Personal trekking gear",
        "Snacks and beverages",
        "Travel insurance and emergency evacuation",
        "Personal and unforeseen expenses"
      ],
      "services": [],
      "infoTitle": "Important Information",
      "info": [
        "The Babusar route usually opens in June and closes with the first snow. Outside that window we drive the Karakoram Highway via Besham, which adds travel time.",
        "The Raikot jeep track is narrow and exposed. Drivers are local specialists.",
        "Trail conditions to base camp are assessed daily by the guide."
      ],
      "says": "Less screen time. More mountain time.",
      "ctaLabel": "Plan My Fairy Meadows Trip",
      "ctaNote": "Group departures and private trips available.",
      "images": [
        "/assets/trip-fairy-meadows.jpg"
      ],
      "imageAlt": "A wooden hut beside a stream in the meadows at Fairy Meadows",
      "order": 2,
      "durationLabel": "6 days",
      "durationDays": 6,
      "grade": "Moderate",
      "altitude": "3,967 M",
      "season": "Mid June to September"
    },
    {
      "slug": "rakaposhi-base-camp",
      "imagePosition": "center 30%",
      "replaces": "",
      "title": "Rakaposhi Base Camp",
      "category": "trekking",
      "tagline": "Meet the Queen of Nagar",
      "shortDescription": "A glacier at your feet. A 7,788 m wall of ice above you. Wildflower meadows all around.",
      "overview": "Rakaposhi Base Camp is one of the Karakoram's most rewarding short treks, packing big mountain drama into just three days on foot.",
      "factsTitle": "Fast Facts",
      "facts": [
        {
          "label": "Duration",
          "value": "7 Days, Islamabad to Islamabad"
        },
        {
          "label": "Grade",
          "value": "Moderate"
        },
        {
          "label": "Max Altitude",
          "value": "About 3,500 m at Tagaphari"
        },
        {
          "label": "Best Season",
          "value": "June to September"
        },
        {
          "label": "Stay",
          "value": "Hotels and camping"
        },
        {
          "label": "Departure",
          "value": "Islamabad. Lahore guests connect the evening before"
        }
      ],
      "itineraryTitle": "Day by Day",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Day 1",
          "title": "",
          "description": "Drive Islamabad to Chilas via Babusar Top in season, or the Karakoram Highway."
        },
        {
          "day": 2,
          "label": "Day 2",
          "title": "",
          "description": "Continue to Minapin in Nagar, stopping where the Karakoram, Himalaya and Hindu Kush ranges meet."
        },
        {
          "day": 3,
          "label": "Day 3",
          "title": "",
          "description": "Trek from Minapin through apricot orchards and pine forest to Hapakun."
        },
        {
          "day": 4,
          "label": "Day 4",
          "title": "",
          "description": "Climb to Tagaphari meadow, Rakaposhi Base Camp. Afternoon by the Minapin Glacier."
        },
        {
          "day": 5,
          "label": "Day 5",
          "title": "",
          "description": "Sunrise on Rakaposhi and a ridge viewpoint walk. Descend to Minapin."
        },
        {
          "day": 6,
          "label": "Day 6",
          "title": "",
          "description": "Drive to Chilas or Naran."
        },
        {
          "day": 7,
          "label": "Day 7",
          "title": "",
          "description": "Return to Islamabad."
        }
      ],
      "highlightsTitle": "Trip Highlights",
      "highlights": [
        "Rakaposhi's north face up close",
        "Tagaphari meadow camp",
        "Minapin Glacier viewpoints",
        "Nagar village hospitality",
        "The junction of three great ranges"
      ],
      "includes": [
        "Transport as per itinerary",
        "Accommodation and campsite arrangements",
        "Scheduled meals",
        "Local trekking guide"
      ],
      "excludes": [
        "Personal equipment",
        "Travel insurance",
        "Additional porterage",
        "Personal expenses"
      ],
      "services": [],
      "infoTitle": "Important Information",
      "info": [
        "The trail is steep in sections. Good fitness and broken in boots are essential.",
        "Glacier edges are visited only with the guide."
      ],
      "says": "Come for the mountain. Stay for the magic.",
      "ctaLabel": "Enquire About Rakaposhi",
      "ctaNote": "Tell us your group size and preferred month.",
      "images": [
        "/assets/tour-road-hunza.jpg"
      ],
      "imageAlt": "Travellers looking out over the Hunza and Nagar valley",
      "order": 3,
      "durationLabel": "7 days",
      "durationDays": 7,
      "grade": "Moderate",
      "altitude": "3,500 M",
      "season": "June to September"
    },
    {
      "slug": "haramosh-base-camp-kutwal-lake",
      "imagePosition": "center 30%",
      "replaces": "",
      "title": "Haramosh Base Camp & Kutwal Lake",
      "category": "trekking",
      "tagline": "Into the Wild Heart of Haramosh",
      "shortDescription": "No crowds, no tea stalls, no signal. Just glacier fed streams, Wakhi and Shina villages and a lake that looks photoshopped in real life.",
      "overview": "Haramosh is for travelers who like their adventures wild and their trails quiet.",
      "factsTitle": "Fast Facts",
      "facts": [
        {
          "label": "Duration",
          "value": "8 Days, Islamabad to Islamabad"
        },
        {
          "label": "Grade",
          "value": "Moderate to Challenging"
        },
        {
          "label": "Max Altitude",
          "value": "About 3,300 m at Kutwal Lake. Viewpoint hikes go higher"
        },
        {
          "label": "Best Season",
          "value": "July to September"
        },
        {
          "label": "Stay",
          "value": "Hotels and camping"
        },
        {
          "label": "Departure",
          "value": "Islamabad. Lahore guests connect the evening before"
        }
      ],
      "itineraryTitle": "Day by Day",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Day 1",
          "title": "",
          "description": "Drive Islamabad to Chilas."
        },
        {
          "day": 2,
          "label": "Day 2",
          "title": "",
          "description": "Continue to Sassi on the Karakoram Highway, jeep to Dassu and trek to Iskere village."
        },
        {
          "day": 3,
          "label": "Day 3",
          "title": "",
          "description": "Trek through forest and farmland to Kutwal village and Kutwal Lake. Camp by the water."
        },
        {
          "day": 4,
          "label": "Day 4",
          "title": "",
          "description": "Day hike toward Haramosh Base Camp and Mani Glacier viewpoints, conditions permitting."
        },
        {
          "day": 5,
          "label": "Day 5",
          "title": "",
          "description": "Free day at Kutwal. Lake walks, photography and Laila Peak views."
        },
        {
          "day": 6,
          "label": "Day 6",
          "title": "",
          "description": "Trek out to Dassu and drive to Gilgit."
        },
        {
          "day": 7,
          "label": "Day 7",
          "title": "",
          "description": "Drive to Naran via Babusar Top in season, or to Chilas."
        },
        {
          "day": 8,
          "label": "Day 8",
          "title": "",
          "description": "Return to Islamabad."
        }
      ],
      "highlightsTitle": "Trip Highlights",
      "highlights": [
        "Camping at Kutwal Lake",
        "Haramosh and Laila Peak views",
        "Remote mountain villages",
        "Glacier viewpoint hike",
        "Genuine wilderness, very few trekkers"
      ],
      "includes": [
        "Trekking guide",
        "Group transport and jeeps",
        "Camping arrangements",
        "Scheduled meals"
      ],
      "excludes": [
        "Personal trekking equipment",
        "Insurance",
        "Additional porterage",
        "Emergency expenses"
      ],
      "services": [],
      "infoTitle": "Important Information",
      "info": [
        "Trailhead access depends on jeep road conditions after rain.",
        "Communication is very limited beyond Iskere."
      ],
      "says": "No crowds. No shortcuts. Just pure adventure.",
      "ctaLabel": "Enquire About Haramosh",
      "ctaNote": "Ideal for small groups who want somewhere new.",
      "images": [
        "/assets/exp-haramosh.jpg"
      ],
      "imageAlt": "Snow slopes below the Haramosh range",
      "order": 4,
      "durationLabel": "8 days",
      "durationDays": 8,
      "grade": "Moderate to Challenging",
      "altitude": "3,300 M",
      "season": "July to September"
    },
    {
      "slug": "rush-lake-rush-peak",
      "imagePosition": "center 45%",
      "replaces": "rush-lake-rush-pari-peak",
      "title": "Rush Lake & Rush Peak",
      "category": "trekking",
      "tagline": "Higher Altitude. Bigger Views.",
      "shortDescription": "Camp beside one of the highest alpine lakes on the planet. At sunrise, scramble to 5,098 m and see Spantik, the Hispar peaks and, on a clear morning, K2 on the horizon.",
      "overview": "Short daily distances, serious altitude. This is scenery you have to earn.",
      "factsTitle": "Fast Facts",
      "facts": [
        {
          "label": "Duration",
          "value": "11 Days, Islamabad to Islamabad"
        },
        {
          "label": "Grade",
          "value": "Challenging"
        },
        {
          "label": "Max Altitude",
          "value": "5,098 m at Rush Peak. Lake camp about 4,694 m"
        },
        {
          "label": "Best Season",
          "value": "July to September"
        },
        {
          "label": "Stay",
          "value": "Hotels and expedition camping"
        },
        {
          "label": "Departure",
          "value": "Islamabad. Lahore guests connect the evening before"
        }
      ],
      "itineraryTitle": "Day by Day",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Day 1",
          "title": "",
          "description": "Drive Islamabad to Chilas."
        },
        {
          "day": 2,
          "label": "Day 2",
          "title": "",
          "description": "Continue to Karimabad, Hunza."
        },
        {
          "day": 3,
          "label": "Day 3",
          "title": "",
          "description": "Acclimatization day in Hunza: Altit village and sunset at Duikar."
        },
        {
          "day": 4,
          "label": "Day 4",
          "title": "",
          "description": "Jeep to Hoper, cross the Bualtar Glacier and trek to Bericho Kor, about 3,300 m."
        },
        {
          "day": 5,
          "label": "Day 5",
          "title": "",
          "description": "Trek over high pastures to Chidin Harai, about 4,400 m."
        },
        {
          "day": 6,
          "label": "Day 6",
          "title": "",
          "description": "Short, steep climb to Rush Lake, about 4,694 m. Camp by the shore."
        },
        {
          "day": 7,
          "label": "Day 7",
          "title": "",
          "description": "Optional sunrise summit of Rush Peak, 5,098 m, or a rest day at the lake."
        },
        {
          "day": 8,
          "label": "Day 8",
          "title": "",
          "description": "Descend via Phahi Phari toward Hamdar."
        },
        {
          "day": 9,
          "label": "Day 9",
          "title": "",
          "description": "Trek down to Hoper and drive to Karimabad."
        },
        {
          "day": 10,
          "label": "Day 10",
          "title": "",
          "description": "Drive to Chilas or Naran."
        },
        {
          "day": 11,
          "label": "Day 11",
          "title": "",
          "description": "Return to Islamabad."
        }
      ],
      "highlightsTitle": "Trip Highlights",
      "highlights": [
        "Camping at Rush Lake",
        "Rush Peak summit panorama",
        "Bualtar and Miar glacier crossings",
        "Golden Peak and Ultar views",
        "Hunza and Nagar culture"
      ],
      "includes": [
        "Local trekking guide",
        "Camping support",
        "Group transport",
        "Scheduled meals and expedition logistics"
      ],
      "excludes": [
        "Personal equipment",
        "Summit specific gear if required",
        "Insurance",
        "Rescue costs"
      ],
      "services": [],
      "infoTitle": "Important Information",
      "info": [
        "The jump from Chidin Harai to the lake is significant. Anyone showing altitude symptoms stays lower.",
        "The Rush Peak summit is a non technical scramble but depends on snow conditions and individual acclimatization."
      ],
      "says": "The higher you climb, the better the stories.",
      "ctaLabel": "Enquire About Rush Lake",
      "ctaNote": "Share your trekking experience and we will advise on fit.",
      "images": [
        "/assets/trip-rush-lake.jpg"
      ],
      "imageAlt": "A high mountain lake ringed by snow",
      "order": 5,
      "durationLabel": "11 days",
      "durationDays": 11,
      "grade": "Challenging",
      "altitude": "5,098 M",
      "season": "July to September"
    },
    {
      "slug": "shimshal-pass-minglik-sar",
      "imagePosition": "center top",
      "replaces": "",
      "title": "Shimshal Pass & Minglik Sar",
      "category": "trekking",
      "tagline": "Walk the Roof of the Karakoram",
      "shortDescription": "Walk an ancient caravan route through a gorge so narrow it feels secret. Emerge onto high Pamir pastures where yak herders summer beside two glittering lakes.",
      "overview": "Then, if you have the legs and the lungs, a midnight start for the 6,050 m summit of Minglik Sar. Remote, authentic and unforgettable.",
      "factsTitle": "Fast Facts",
      "facts": [
        {
          "label": "Duration",
          "value": "19 Days, Islamabad to Islamabad"
        },
        {
          "label": "Grade",
          "value": "Very Challenging. Basic mountaineering skills needed for the summit"
        },
        {
          "label": "Max Altitude",
          "value": "6,050 m at Minglik Sar. Shimshal Pass 4,735 m"
        },
        {
          "label": "Best Season",
          "value": "July to August"
        },
        {
          "label": "Stay",
          "value": "Hotels, a village guesthouse and expedition camping"
        },
        {
          "label": "Departure",
          "value": "Islamabad, Lahore transfer on request"
        }
      ],
      "itineraryTitle": "Day by Day",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Day 1",
          "title": "",
          "description": "Drive Islamabad to Chilas."
        },
        {
          "day": 2,
          "label": "Day 2",
          "title": "",
          "description": "Continue to Karimabad, Hunza."
        },
        {
          "day": 3,
          "label": "Day 3",
          "title": "",
          "description": "Acclimatization day in Hunza."
        },
        {
          "day": 4,
          "label": "Day 4",
          "title": "",
          "description": "Drive via Passu along the dramatic Shimshal road to Shimshal village, about 3,000 m."
        },
        {
          "day": 5,
          "label": "Day 5",
          "title": "",
          "description": "Acclimatization hike and an afternoon with our Wakhi hosts."
        },
        {
          "day": 6,
          "label": "Day 6",
          "title": "",
          "description": "Trek through the Shimshal gorge to Past Furzin, about 3,365 m."
        },
        {
          "day": 7,
          "label": "Day 7",
          "title": "",
          "description": "Continue up the valley via Purien e Sar, camping above 4,000 m."
        },
        {
          "day": 8,
          "label": "Day 8",
          "title": "",
          "description": "Trek to Shuijerab, about 4,350 m."
        },
        {
          "day": 9,
          "label": "Day 9",
          "title": "",
          "description": "Cross onto Shimshal Pass, 4,735 m. Camp by the lakes."
        },
        {
          "day": 10,
          "label": "Day 10",
          "title": "",
          "description": "Rest day on the Pamir with the yak herders."
        },
        {
          "day": 11,
          "label": "Day 11",
          "title": "",
          "description": "Move to Minglik Sar base camp. Gear check and summit briefing."
        },
        {
          "day": 12,
          "label": "Day 12",
          "title": "",
          "description": "Summit attempt on Minglik Sar, 6,050 m, with a midnight start. Return to camp."
        },
        {
          "day": 13,
          "label": "Day 13",
          "title": "",
          "description": "Reserve summit or weather day."
        },
        {
          "day": 14,
          "label": "Day 14",
          "title": "",
          "description": "Descend to Shuijerab."
        },
        {
          "day": 15,
          "label": "Day 15",
          "title": "",
          "description": "Descend to Past Furzin."
        },
        {
          "day": 16,
          "label": "Day 16",
          "title": "",
          "description": "Return to Shimshal village."
        },
        {
          "day": 17,
          "label": "Day 17",
          "title": "",
          "description": "Drive to Karimabad."
        },
        {
          "day": 18,
          "label": "Day 18",
          "title": "",
          "description": "Drive to Chilas or Naran."
        },
        {
          "day": 19,
          "label": "Day 19",
          "title": "",
          "description": "Return to Islamabad."
        }
      ],
      "highlightsTitle": "Trip Highlights",
      "highlights": [
        "Shimshal Pass and the Pamir lakes",
        "Minglik Sar summit, 6,050 m",
        "Wakhi yak herding culture",
        "The Shimshal gorge",
        "Views toward K2 and Distaghil Sar from the summit"
      ],
      "includes": [
        "Local expedition team",
        "Camping logistics",
        "Scheduled meals",
        "Group transport"
      ],
      "excludes": [
        "Technical climbing equipment",
        "Personal gear",
        "Insurance and emergency rescue",
        "Unforeseen expenses"
      ],
      "services": [],
      "infoTitle": "Important Information",
      "info": [
        "Shimshal sits close to the Pakistan China border. Permit, security clearance and community fee requirements are confirmed at booking and may need several weeks.",
        "The summit attempt uses qualified climbing support and is made only if conditions and acclimatization allow.",
        "Trekkers who skip the summit can extend time on the Pamir."
      ],
      "says": "Go remote. Come back with a story worth telling.",
      "ctaLabel": "Enquire About Shimshal",
      "ctaNote": "Early enquiry recommended for permit lead time.",
      "images": [
        "/assets/trip-shimshal.jpg"
      ],
      "imageAlt": "Trekkers crossing a Karakoram glacier below dark rock towers",
      "order": 6,
      "durationLabel": "19 days",
      "durationDays": 19,
      "grade": "Very Challenging",
      "altitude": "6,050 M",
      "season": "July to August"
    },
    {
      "slug": "hunza-valley-escape",
      "replaces": "hunza",
      "title": "Hunza Valley Escape",
      "category": "tours",
      "tagline": "Seven Days in Pakistan's Mountain Paradise",
      "shortDescription": "Turquoise lakes, 700 year old forts, apricot orchards and views that make every photo look professionally edited.",
      "overview": "Hunza is happiness at altitude, and we planned this week so you spend it looking out of windows, not at the clock.",
      "factsTitle": "Fast Facts",
      "facts": [
        {
          "label": "Duration",
          "value": "7 Days, Islamabad to Islamabad"
        },
        {
          "label": "Grade",
          "value": "Easy"
        },
        {
          "label": "Max Altitude",
          "value": "About 4,693 m at Khunjerab Pass, by road"
        },
        {
          "label": "Best Season",
          "value": "April to October. Blossom in early April, autumn color late October"
        },
        {
          "label": "Stay",
          "value": "Hotels"
        },
        {
          "label": "Departure",
          "value": "Islamabad. Lahore guests connect early on Day 1 or the evening before"
        }
      ],
      "itineraryTitle": "Day by Day",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Day 1",
          "title": "",
          "description": "Drive from Islamabad through Kaghan Valley to Naran."
        },
        {
          "day": 2,
          "label": "Day 2",
          "title": "",
          "description": "Cross Babusar Top and follow the Karakoram Highway to Hunza, with a stop at the Rakaposhi viewpoint."
        },
        {
          "day": 3,
          "label": "Day 3",
          "title": "",
          "description": "Baltit Fort, Altit Fort and Karimabad bazaar. Sunset over Hunza and Nagar from Duikar."
        },
        {
          "day": 4,
          "label": "Day 4",
          "title": "",
          "description": "Boat on Attabad Lake, walk the Hussaini Suspension Bridge and stand beneath the Passu Cones."
        },
        {
          "day": 5,
          "label": "Day 5",
          "title": "",
          "description": "Upper Hunza: Gulmit and the Khunjerab Pass on the China border, subject to access."
        },
        {
          "day": 6,
          "label": "Day 6",
          "title": "",
          "description": "Slow breakfast with mountain views, then drive to Naran or Chilas."
        },
        {
          "day": 7,
          "label": "Day 7",
          "title": "",
          "description": "Return to Islamabad."
        }
      ],
      "highlightsTitle": "Trip Highlights",
      "highlights": [
        "Attabad Lake",
        "Passu Cones",
        "Baltit and Altit Forts",
        "Khunjerab Pass",
        "Hunza food and village cafés"
      ],
      "includes": [
        "Transport as per itinerary",
        "Hotel accommodation",
        "Scheduled meals",
        "Local guide"
      ],
      "excludes": [
        "Boating and entry tickets unless stated",
        "Personal expenses",
        "Travel insurance"
      ],
      "services": [],
      "infoTitle": "Important Information",
      "info": [
        "Babusar Top is usually open from June until the first snow. Outside that window we travel via Besham, or fly to Gilgit, weather permitting.",
        "Khunjerab Pass access is seasonal and set by the authorities."
      ],
      "says": "Mountains, memories and a whole lot of Hunza magic.",
      "ctaLabel": "Plan My Hunza Trip",
      "ctaNote": "Group, family and private departures.",
      "images": [
        "/assets/tour-road-hunza.jpg"
      ],
      "imageAlt": "Looking out over the Hunza valley from a high viewpoint",
      "order": 1,
      "durationLabel": "7 days",
      "durationDays": 7,
      "grade": "Easy",
      "altitude": "4,693 M",
      "season": "April to October"
    },
    {
      "slug": "skardu-land-of-giants",
      "replaces": "skardu",
      "title": "Skardu & the Land of Giants",
      "category": "tours",
      "tagline": "Where Every Turn Deserves a Photo Stop",
      "shortDescription": "Sand dunes at breakfast, emerald lakes by lunch, a royal palace by sunset.",
      "overview": "Skardu packs more landscapes into one valley than seems fair. Fly in over the Karakoram and let Baltistan show off.",
      "factsTitle": "Fast Facts",
      "facts": [
        {
          "label": "Duration",
          "value": "7 Days, Islamabad to Islamabad"
        },
        {
          "label": "Grade",
          "value": "Easy"
        },
        {
          "label": "Max Altitude",
          "value": "About 4,100 m on the Deosai Plains, by jeep"
        },
        {
          "label": "Best Season",
          "value": "May to October. Deosai roughly July to September"
        },
        {
          "label": "Stay",
          "value": "Hotels"
        },
        {
          "label": "Departure",
          "value": "Islamabad by air. Road packages on request"
        }
      ],
      "itineraryTitle": "Day by Day",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Day 1",
          "title": "",
          "description": "Fly Islamabad to Skardu, weather permitting. Settle in and explore town."
        },
        {
          "day": 2,
          "label": "Day 2",
          "title": "",
          "description": "Shangrila and Lower Kachura, then Upper Kachura Lake."
        },
        {
          "day": 3,
          "label": "Day 3",
          "title": "",
          "description": "Shigar Fort and valley. Sunset on the Katpana Cold Desert."
        },
        {
          "day": 4,
          "label": "Day 4",
          "title": "",
          "description": "Full day jeep safari across the Deosai Plains to Sheosar Lake."
        },
        {
          "day": 5,
          "label": "Day 5",
          "title": "",
          "description": "Drive to Khaplu. Explore Khaplu Palace and Balti villages."
        },
        {
          "day": 6,
          "label": "Day 6",
          "title": "",
          "description": "Return to Skardu. Bazaar time and a relaxed evening."
        },
        {
          "day": 7,
          "label": "Day 7",
          "title": "",
          "description": "Fly to Islamabad, weather permitting."
        }
      ],
      "highlightsTitle": "Trip Highlights",
      "highlights": [
        "Deosai Plains and Sheosar Lake",
        "Khaplu Palace",
        "Shigar Fort",
        "Katpana Cold Desert",
        "Upper Kachura Lake"
      ],
      "includes": [
        "Local transport and jeeps",
        "Hotel accommodation",
        "Scheduled meals",
        "Local guide"
      ],
      "excludes": [
        "Flights unless agreed in the package",
        "Entry tickets unless stated",
        "Personal expenses",
        "Travel insurance"
      ],
      "services": [],
      "infoTitle": "Important Information",
      "info": [
        "Skardu flights are weather dependent. If cancelled, the road journey takes two days each way.",
        "Deosai access depends on snow."
      ],
      "says": "One destination. A hundred different landscapes.",
      "ctaLabel": "Plan My Skardu Trip",
      "ctaNote": "Tell us your dates and group size.",
      "images": [
        "/assets/blog-skardu.jpg"
      ],
      "imageAlt": "Shangrila Lake and its red roofed cottages near Skardu",
      "order": 2,
      "durationLabel": "7 days",
      "durationDays": 7,
      "grade": "Easy",
      "altitude": "4,100 M",
      "season": "May to October"
    },
    {
      "slug": "cholistan-desert-safari-bahawalpur",
      "replaces": "cholistan-desert-safari",
      "title": "Cholistan Desert Safari & Bahawalpur",
      "category": "tours",
      "tagline": "Trade the Mountains for Sand Dunes",
      "shortDescription": "Golden dunes, a royal palace in white, the bastions of Derawar glowing at sunset and a night sky with no light pollution at all.",
      "overview": "Who said adventure only happens in the mountains?",
      "factsTitle": "Fast Facts",
      "facts": [
        {
          "label": "Duration",
          "value": "4 Days, Lahore to Lahore"
        },
        {
          "label": "Grade",
          "value": "Easy"
        },
        {
          "label": "Best Season",
          "value": "November to February. The Cholistan Jeep Rally is usually held in February"
        },
        {
          "label": "Stay",
          "value": "Hotels and desert camping"
        },
        {
          "label": "Departure",
          "value": "Lahore. Islamabad pickup on request"
        }
      ],
      "itineraryTitle": "Day by Day",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Day 1",
          "title": "",
          "description": "Drive Lahore to Bahawalpur. Evening in the old city with local food."
        },
        {
          "day": 2,
          "label": "Day 2",
          "title": "",
          "description": "Noor Mahal and Bahawalpur's royal heritage, then on to the desert edge near Derawar."
        },
        {
          "day": 3,
          "label": "Day 3",
          "title": "",
          "description": "Derawar Fort surroundings, dune jeep safari, a Cholistani village visit and sunset camp under the stars."
        },
        {
          "day": 4,
          "label": "Day 4",
          "title": "",
          "description": "Sunrise over the dunes, then return to Lahore."
        }
      ],
      "highlightsTitle": "Trip Highlights",
      "highlights": [
        "Derawar Fort at sunset",
        "Noor Mahal",
        "Dune jeep safari",
        "Desert camping and stargazing",
        "Cholistani crafts and culture"
      ],
      "includes": [
        "Transport and desert jeeps",
        "Hotel and camp accommodation",
        "Scheduled meals",
        "Local guide"
      ],
      "excludes": [
        "Entry tickets unless stated",
        "Personal expenses",
        "Travel insurance"
      ],
      "services": [],
      "infoTitle": "Important Information",
      "info": [
        "Derawar Fort interior access is not guaranteed.",
        "Desert nights are cold in winter. Bring warm layers."
      ],
      "says": "Get lost in the desert. Find your adventurous side.",
      "ctaLabel": "Plan My Desert Escape",
      "ctaNote": "Perfect for winter weekends and groups.",
      "images": [
        "/assets/trip-cholistan.jpg"
      ],
      "imageAlt": "Four travellers standing on pale sand dunes",
      "order": 3,
      "durationLabel": "4 days",
      "durationDays": 4,
      "grade": "Easy",
      "altitude": "",
      "season": "November to February"
    },
    {
      "slug": "kalash-valleys-chitral",
      "replaces": "chitral-kalash",
      "title": "Kalash Valleys & Chitral",
      "category": "tours",
      "tagline": "A Journey into Living Traditions",
      "shortDescription": "Colorful dress, carved wooden homes, walnut groves and a culture unlike anywhere else in the world.",
      "overview": "We visit the Kalash valleys with local hosts, slowly and respectfully, so the encounters feel real rather than staged.",
      "factsTitle": "Fast Facts",
      "facts": [
        {
          "label": "Duration",
          "value": "6 Days, Islamabad to Islamabad"
        },
        {
          "label": "Grade",
          "value": "Easy to Moderate"
        },
        {
          "label": "Best Season",
          "value": "April to October. Chilam Joshi in May, Uchau in August"
        },
        {
          "label": "Stay",
          "value": "Hotels and guesthouses"
        },
        {
          "label": "Departure",
          "value": "Islamabad. Lahore guests connect the evening before"
        }
      ],
      "itineraryTitle": "Day by Day",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Day 1",
          "title": "",
          "description": "Drive Islamabad to Dir through the Swat Motorway and Malakand."
        },
        {
          "day": 2,
          "label": "Day 2",
          "title": "",
          "description": "Through the Lowari Tunnel to Chitral. Chitral Fort surroundings and the Shahi Mosque."
        },
        {
          "day": 3,
          "label": "Day 3",
          "title": "",
          "description": "Bumburet Valley with Kalash hosts: villages, homes and the local museum."
        },
        {
          "day": 4,
          "label": "Day 4",
          "title": "",
          "description": "Rumbur Valley and a community guided cultural experience."
        },
        {
          "day": 5,
          "label": "Day 5",
          "title": "",
          "description": "Return over Lowari to Dir, with scenic stops."
        },
        {
          "day": 6,
          "label": "Day 6",
          "title": "",
          "description": "Return to Islamabad."
        }
      ],
      "highlightsTitle": "Trip Highlights",
      "highlights": [
        "Bumburet and Rumbur villages",
        "Kalash architecture and dress",
        "Chitral Fort and Shahi Mosque",
        "Lowari Tunnel crossing",
        "Regional food"
      ],
      "includes": [
        "Transport",
        "Hotel and guesthouse accommodation",
        "Scheduled meals",
        "Local guide and community hosts"
      ],
      "excludes": [
        "Personal expenses",
        "Entry and community fees unless stated",
        "Travel insurance"
      ],
      "services": [],
      "infoTitle": "Important Information",
      "info": [
        "Photography of people only with permission.",
        "Foreign nationals should confirm current registration requirements for Chitral and the Kalash valleys.",
        "Festival dates follow the local calendar and are confirmed each year."
      ],
      "says": "Different cultures. Shared stories. Unforgettable encounters.",
      "ctaLabel": "Plan My Kalash Journey",
      "ctaNote": "Ask about festival departures.",
      "images": [
        "/assets/trip-kalash.jpg"
      ],
      "imageAlt": "Kalash women in traditional dress",
      "order": 4,
      "durationLabel": "6 days",
      "durationDays": 6,
      "grade": "Easy to Moderate",
      "altitude": "",
      "season": "April to October"
    },
    {
      "slug": "naran-shogran-babusar-top",
      "replaces": "",
      "title": "Naran, Shogran & Babusar Top",
      "category": "tours",
      "tagline": "The Classic Northern Escape",
      "shortDescription": "Alpine lakes, cloud level meadows, winding mountain roads and enough fresh air to reset your whole month.",
      "overview": "Pakistan's classic mountain getaway, done properly.",
      "factsTitle": "Fast Facts",
      "facts": [
        {
          "label": "Duration",
          "value": "5 Days, Islamabad to Islamabad"
        },
        {
          "label": "Grade",
          "value": "Easy to Moderate"
        },
        {
          "label": "Max Altitude",
          "value": "4,173 m at Babusar Top, by road"
        },
        {
          "label": "Best Season",
          "value": "June to September"
        },
        {
          "label": "Stay",
          "value": "Hotels"
        },
        {
          "label": "Departure",
          "value": "Islamabad and Lahore"
        }
      ],
      "itineraryTitle": "Day by Day",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Day 1",
          "title": "",
          "description": "Drive via Balakot to Shogran."
        },
        {
          "day": 2,
          "label": "Day 2",
          "title": "",
          "description": "Jeep up to Siri Paye meadows. Picnic, photography and slow time."
        },
        {
          "day": 3,
          "label": "Day 3",
          "title": "",
          "description": "Drive to Naran. Jeep to Saif ul Malook Lake."
        },
        {
          "day": 4,
          "label": "Day 4",
          "title": "",
          "description": "Up Kaghan Valley to Lulusar Lake and Babusar Top, then back to Naran."
        },
        {
          "day": 5,
          "label": "Day 5",
          "title": "",
          "description": "Return to Islamabad and Lahore."
        }
      ],
      "highlightsTitle": "Trip Highlights",
      "highlights": [
        "Siri Paye meadows",
        "Saif ul Malook Lake",
        "Lulusar Lake",
        "Babusar Top",
        "Kunhar River drives"
      ],
      "includes": [
        "Transport and local jeeps",
        "Hotel accommodation",
        "Scheduled meals",
        "Local guide"
      ],
      "excludes": [
        "Personal expenses",
        "Activities not listed",
        "Travel insurance"
      ],
      "services": [],
      "infoTitle": "Important Information",
      "info": [
        "Lahore guests start early on Day 1. The drive to Shogran takes most of the day."
      ],
      "says": "Five days away. A lifetime of memories.",
      "ctaLabel": "Plan My Northern Escape",
      "ctaNote": "Family, friends and group departures.",
      "images": [
        "/assets/blog-shogran-makra.jpg"
      ],
      "imageAlt": "A pond on the Siri Paye meadows below Makra Peak",
      "order": 5,
      "durationLabel": "5 days",
      "durationDays": 5,
      "grade": "Easy to Moderate",
      "altitude": "4,173 M",
      "season": "June to September"
    },
    {
      "slug": "sufi-trails-of-punjab",
      "replaces": "shrines-of-the-south",
      "title": "Sufi Trails of Punjab",
      "category": "spiritual",
      "tagline": "Follow the Footsteps of Love, Poetry & Devotion",
      "shortDescription": "Qawwali echoing through marble courtyards. Turquoise tile domes over Multan. Verses by Bulleh Shah and Baba Farid that people still sing eight centuries on.",
      "overview": "This is not a sightseeing tour. It is an invitation into Punjab's spiritual heart, with guides who know the poetry as well as the history.",
      "factsTitle": "Fast Facts",
      "facts": [
        {
          "label": "Duration",
          "value": "6 Days, Lahore to Lahore"
        },
        {
          "label": "Grade",
          "value": "Easy"
        },
        {
          "label": "Best Season",
          "value": "October to March"
        },
        {
          "label": "Stay",
          "value": "Hotels"
        },
        {
          "label": "Departure",
          "value": "Lahore"
        }
      ],
      "itineraryTitle": "Day by Day",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Day 1",
          "title": "",
          "description": "Lahore: the shrine of Data Ganj Bakhsh and Shah Hussain. Evening qawwali where held."
        },
        {
          "day": 2,
          "label": "Day 2",
          "title": "",
          "description": "Kasur and the shrine of Bulleh Shah, then drive to Pakpattan."
        },
        {
          "day": 3,
          "label": "Day 3",
          "title": "",
          "description": "Shrine of Baba Fariduddin Ganjshakar in Pakpattan, then on to Multan."
        },
        {
          "day": 4,
          "label": "Day 4",
          "title": "",
          "description": "Multan: Bahauddin Zakariya, Shah Rukn e Alam and Shah Shams Tabrez."
        },
        {
          "day": 5,
          "label": "Day 5",
          "title": "",
          "description": "Day trip to Uch Sharif and its tile clad tombs."
        },
        {
          "day": 6,
          "label": "Day 6",
          "title": "",
          "description": "Multan's craft bazaars, then return to Lahore."
        }
      ],
      "highlightsTitle": "Trip Highlights",
      "highlights": [
        "Shah Rukn e Alam's great dome",
        "Uch Sharif's tombs",
        "Qawwali evenings",
        "Sufi poetry storytelling",
        "Multani blue pottery and crafts"
      ],
      "includes": [
        "Transport",
        "Hotel accommodation",
        "Scheduled meals",
        "Heritage guide"
      ],
      "excludes": [
        "Donations and offerings",
        "Personal expenses",
        "Travel insurance"
      ],
      "services": [],
      "infoTitle": "Important Information",
      "info": [
        "Modest dress is required at all shrines.",
        "Qawwali sessions follow each shrine's own schedule.",
        "Optional Islamabad extension: Bari Imam and Golra Sharif."
      ],
      "says": "Travel through history. Connect with something deeper.",
      "ctaLabel": "Begin the Sufi Trail",
      "ctaNote": "Private and small group departures.",
      "images": [
        "/assets/trip-sufi.jpg"
      ],
      "imageAlt": "Visitors outside a domed mosque",
      "order": 1,
      "durationLabel": "6 days",
      "durationDays": 6,
      "grade": "Easy",
      "altitude": "",
      "season": "October to March"
    },
    {
      "slug": "sikh-heritage-pilgrimage",
      "replaces": "",
      "title": "Sikh Heritage Pilgrimage: Nankana Sahib & Kartarpur",
      "category": "spiritual",
      "tagline": "A Journey of Faith, Heritage & Connection",
      "shortDescription": "Walk where Guru Nanak Dev Ji was born, and where he spent his final years.",
      "overview": "We handle the logistics with care so your attention stays where it belongs: on prayer, reflection and the warmth of Punjab's Sikh heritage.",
      "factsTitle": "Fast Facts",
      "facts": [
        {
          "label": "Duration",
          "value": "3 Days, Lahore to Lahore"
        },
        {
          "label": "Grade",
          "value": "Easy"
        },
        {
          "label": "Best Season",
          "value": "Year round. Gurpurab dates are the busiest"
        },
        {
          "label": "Stay",
          "value": "Hotels"
        },
        {
          "label": "Departure",
          "value": "Lahore"
        }
      ],
      "itineraryTitle": "Day by Day",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Day 1",
          "title": "",
          "description": "Arrive in Lahore. Gurdwara Dera Sahib, where permitted, and the Samadhi of Ranjit Singh."
        },
        {
          "day": 2,
          "label": "Day 2",
          "title": "",
          "description": "Drive to Nankana Sahib. Gurdwara Janam Asthan and the associated historic gurdwaras."
        },
        {
          "day": 3,
          "label": "Day 3",
          "title": "",
          "description": "Drive to Narowal for Gurdwara Darbar Sahib, Kartarpur. Return to Lahore."
        }
      ],
      "highlightsTitle": "Trip Highlights",
      "highlights": [
        "Gurdwara Janam Asthan",
        "Darbar Sahib Kartarpur",
        "Gurdwara Dera Sahib",
        "Langar where available",
        "Optional Panja Sahib extension"
      ],
      "includes": [
        "Transport",
        "Hotel accommodation",
        "Scheduled meals",
        "Heritage guide"
      ],
      "excludes": [
        "Visas",
        "Personal offerings",
        "Personal expenses",
        "Travel insurance"
      ],
      "services": [],
      "infoTitle": "Important Information",
      "info": [
        "Access, visa requirements and visiting procedures depend on nationality, entry route and current government regulations.",
        "The visa free Kartarpur Corridor from India has been closed since May 2025. Visitors from India currently need a visa and entry via Wagah. Confirm status at booking.",
        "Head covering and modest dress are required at all gurdwaras."
      ],
      "says": "Walk through history. Celebrate a shared heritage.",
      "ctaLabel": "Plan My Pilgrimage",
      "ctaNote": "Families and jatha groups welcome.",
      "images": [
        "/assets/trip-sikh.jpg"
      ],
      "imageAlt": "Travellers with raised arms on a ridge at dusk",
      "order": 2,
      "durationLabel": "3 days",
      "durationDays": 3,
      "grade": "Easy",
      "altitude": "",
      "season": "Year round"
    },
    {
      "slug": "yoga-mindfulness-retreats",
      "replaces": "stillness-at-altitude",
      "title": "Yoga & Mindfulness Retreats",
      "category": "spiritual",
      "tagline": "Disconnect to Reconnect",
      "shortDescription": "Swap notifications for birdsong and the morning rush for river sounds and sun salutations.",
      "overview": "Three hand picked settings, one idea: slow down long enough to actually feel rested.",
      "factsTitle": "Fast Facts",
      "facts": [
        {
          "label": "Duration",
          "value": "4 to 6 Days"
        },
        {
          "label": "Grade",
          "value": "Easy"
        },
        {
          "label": "Best Season",
          "value": "May to October, depending on destination"
        },
        {
          "label": "Stay",
          "value": "Lodges, resorts and nature retreats"
        },
        {
          "label": "Destinations",
          "value": "Kumrat Valley, Sharan Forest and Ayun, Chitral"
        },
        {
          "label": "Departure",
          "value": "Islamabad"
        }
      ],
      "itineraryTitle": "Retreat Options",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Kumrat, Day 1",
          "title": "",
          "description": "Drive to Kumrat via Dir. Riverside welcome circle."
        },
        {
          "day": 2,
          "label": "Kumrat, Day 2",
          "title": "",
          "description": "Sunrise yoga, forest walk and guided meditation."
        },
        {
          "day": 3,
          "label": "Kumrat, Day 3",
          "title": "",
          "description": "Breathwork, mindful nature trail and Kala Chashma waterfall."
        },
        {
          "day": 4,
          "label": "Kumrat, Day 4",
          "title": "",
          "description": "Yoga, wellness workshop and a full digital detox day."
        },
        {
          "day": 5,
          "label": "Kumrat, Day 5",
          "title": "",
          "description": "Morning reflection and return to Islamabad."
        },
        {
          "day": 6,
          "label": "Sharan, Day 1",
          "title": "",
          "description": "Drive to Sharan Forest near Kaghan. Welcome meditation."
        },
        {
          "day": 7,
          "label": "Sharan, Day 2",
          "title": "",
          "description": "Sunrise yoga, forest bathing and mindfulness session."
        },
        {
          "day": 8,
          "label": "Sharan, Day 3",
          "title": "",
          "description": "Guided forest walk, breathwork and evening reflection."
        },
        {
          "day": 9,
          "label": "Sharan, Day 4",
          "title": "",
          "description": "Closing practice and return to Islamabad."
        },
        {
          "day": 10,
          "label": "Ayun, Day 1",
          "title": "",
          "description": "Drive to Dir."
        },
        {
          "day": 11,
          "label": "Ayun, Day 2",
          "title": "",
          "description": "Through Lowari to Ayun. Orchard welcome and gentle practice."
        },
        {
          "day": 12,
          "label": "Ayun, Day 3",
          "title": "",
          "description": "Morning yoga, guided meditation and mindful dining."
        },
        {
          "day": 13,
          "label": "Ayun, Day 4",
          "title": "",
          "description": "Nature walks, breathwork and a Kalash valley visit."
        },
        {
          "day": 14,
          "label": "Ayun, Day 5",
          "title": "",
          "description": "Yoga, reflection and drive to Dir."
        },
        {
          "day": 15,
          "label": "Ayun, Day 6",
          "title": "",
          "description": "Return to Islamabad."
        }
      ],
      "highlightsTitle": "Trip Highlights",
      "highlights": [
        "Sunrise yoga outdoors",
        "Guided meditation and breathwork",
        "Forest bathing",
        "Healthy local meals",
        "Real time offline"
      ],
      "includes": [
        "Transport",
        "Accommodation",
        "Scheduled meals",
        "Retreat facilitation as agreed"
      ],
      "excludes": [
        "Personal wellness treatments",
        "Personal expenses",
        "Travel insurance"
      ],
      "services": [],
      "infoTitle": "Important Information",
      "info": [
        "Suitable for all levels. Mats can be arranged on request.",
        "Facilitator credentials are shared at booking."
      ],
      "says": "Less noise. More nature. A better you.",
      "ctaLabel": "Find My Retreat",
      "ctaNote": "Private retreats for groups, friends and teams.",
      "images": [
        "/assets/trip-yoga.jpg"
      ],
      "imageAlt": "A group seated in meditation on a ridge at dusk",
      "order": 3,
      "durationLabel": "4 to 6 days",
      "grade": "Easy",
      "altitude": "",
      "season": "May to October, depending on destination"
    },
    {
      "slug": "lahore-walled-city-heritage-walk",
      "replaces": "",
      "title": "Lahore Walled City Heritage Walk",
      "category": "spiritual",
      "tagline": "Get Lost in the Streets of Old Lahore",
      "shortDescription": "Every alley has a story, every haveli a secret and every corner something delicious frying.",
      "overview": "One day, on foot, through four centuries of Lahore.",
      "factsTitle": "Fast Facts",
      "facts": [
        {
          "label": "Duration",
          "value": "1 Day, about 9 AM to evening"
        },
        {
          "label": "Grade",
          "value": "Easy walking"
        },
        {
          "label": "Best Season",
          "value": "October to March"
        },
        {
          "label": "Departure",
          "value": "Delhi Gate, Lahore"
        }
      ],
      "itineraryTitle": "The Day",
      "fullItinerary": [
        {
          "day": 1,
          "label": "9:00 AM",
          "title": "",
          "description": "Meet at Delhi Gate and walk the old bazaar."
        },
        {
          "day": 2,
          "label": "9:45 AM",
          "title": "",
          "description": "Shahi Hammam, the restored Mughal bathhouse."
        },
        {
          "day": 3,
          "label": "10:30 AM",
          "title": "",
          "description": "Wazir Khan Mosque and its famous tilework."
        },
        {
          "day": 4,
          "label": "11:30 AM",
          "title": "",
          "description": "Heritage streets, havelis and artisan workshops."
        },
        {
          "day": 5,
          "label": "1:00 PM",
          "title": "",
          "description": "Traditional Lahori lunch."
        },
        {
          "day": 6,
          "label": "2:30 PM",
          "title": "",
          "description": "Lahore Fort: the Picture Wall and Sheesh Mahal."
        },
        {
          "day": 7,
          "label": "4:30 PM",
          "title": "",
          "description": "Badshahi Mosque and Hazuri Bagh."
        },
        {
          "day": 8,
          "label": "Evening",
          "title": "",
          "description": "Optional rooftop dinner overlooking the old city."
        }
      ],
      "highlightsTitle": "Trip Highlights",
      "highlights": [
        "Wazir Khan Mosque",
        "Lahore Fort and Sheesh Mahal",
        "Badshahi Mosque",
        "Shahi Hammam",
        "Lahori food"
      ],
      "includes": [
        "Heritage guide",
        "Lunch"
      ],
      "excludes": [
        "Entry tickets unless stated",
        "Rooftop dinner",
        "Transport to Delhi Gate"
      ],
      "services": [],
      "infoTitle": "Important Information",
      "info": [
        "Mosque visits pause during prayer times. Friday timings differ.",
        "Modest dress and comfortable shoes are recommended."
      ],
      "says": "Old Lahore. New stories. Endless flavors.",
      "ctaLabel": "Book the Heritage Walk",
      "ctaNote": "Daily on request. Private groups welcome.",
      "images": [
        "/assets/trip-lahore-walk.jpg"
      ],
      "imageAlt": "A group under an old stone and timber pavilion",
      "order": 4,
      "durationLabel": "1 day",
      "durationDays": 1,
      "grade": "Easy walking",
      "altitude": "",
      "season": "October to March"
    },
    {
      "slug": "local-food-trails",
      "replaces": "",
      "title": "Local Food Trails",
      "category": "spiritual",
      "tagline": "Eat Like a Local. Travel Like an Insider.",
      "shortDescription": "Forget restaurant hopping. We take you to the kitchens, bazaars and family run stalls where Lahore's flavors have been perfected over generations.",
      "overview": "Come hungry. Seriously.",
      "factsTitle": "Fast Facts",
      "facts": [
        {
          "label": "Duration",
          "value": "1 to 3 Days"
        },
        {
          "label": "Grade",
          "value": "Easy"
        },
        {
          "label": "Best Season",
          "value": "Year round. Winter is peak nihari season"
        },
        {
          "label": "Departure",
          "value": "Lahore"
        }
      ],
      "itineraryTitle": "Day by Day",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Day 1",
          "title": "",
          "description": "Old city breakfast trail: halwa puri, nihari, lassi and doodh patti chai."
        },
        {
          "day": 2,
          "label": "Day 2",
          "title": "",
          "description": "Punjabi street food: tikka, kebabs, chargha and classic desserts."
        },
        {
          "day": 3,
          "label": "Day 3",
          "title": "",
          "description": "Hosted cooking session with a local home chef, or a regional food excursion."
        }
      ],
      "highlightsTitle": "Trip Highlights",
      "highlights": [
        "Authentic old city flavors",
        "Family run stalls",
        "Food stories and history",
        "Hands on cooking session"
      ],
      "includes": [
        "Food guide",
        "Tastings as per itinerary"
      ],
      "excludes": [
        "Transport unless stated",
        "Additional food and drinks",
        "Personal expenses"
      ],
      "services": [],
      "infoTitle": "Important Information",
      "info": [
        "Tell us about allergies and dietary needs in advance."
      ],
      "says": "Come hungry. Leave happy.",
      "ctaLabel": "Book a Food Trail",
      "ctaNote": "Half day, full day and multi day options.",
      "images": [
        "/assets/trip-food.jpg"
      ],
      "imageAlt": "A tray of steaming cups being carried",
      "order": 5,
      "durationLabel": "1 to 3 days",
      "grade": "Easy",
      "altitude": "",
      "season": "Year round"
    },
    {
      "slug": "team-building-corporate-retreats",
      "replaces": "",
      "title": "Team Building & Corporate Retreats",
      "category": "corporate",
      "tagline": "Better Teams. Bigger Adventures.",
      "shortDescription": "Great teams are not built in meeting rooms. Take your people outdoors, stretch their comfort zones and build trust that lasts well past Monday morning.",
      "overview": "Every program is designed around your goals, your group and your calendar.",
      "factsTitle": "At a Glance",
      "facts": [
        {
          "label": "Format",
          "value": "Day programs to 5 day retreats"
        },
        {
          "label": "Group Size",
          "value": "15 to 150+ participants"
        },
        {
          "label": "Destinations",
          "value": "Islamabad, Murree, Nathia Gali, Khanpur and Hunza"
        },
        {
          "label": "Built For",
          "value": "HR, People and Leadership teams"
        }
      ],
      "itineraryTitle": "Sample Program",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Day 1",
          "title": "",
          "description": "Arrivals, icebreakers, outdoor team challenges and an evening bonfire."
        },
        {
          "day": 2,
          "label": "Day 2",
          "title": "",
          "description": "Leadership exercises, collaborative problem solving, awards and departures."
        }
      ],
      "highlightsTitle": "What You Get",
      "highlights": [
        "Stronger cross team trust and communication",
        "Leaders seen in action outside the office",
        "A shared story the team keeps telling",
        "Zero logistics stress for HR and admin"
      ],
      "includes": [],
      "excludes": [],
      "services": [
        "Program design around your objectives",
        "Outdoor challenges and treasure hunts",
        "Leadership and team workshops",
        "Camping and adventure activities",
        "Venue, accommodation, transport and catering",
        "On ground event management"
      ],
      "infoTitle": "Good to Know",
      "info": [
        "Programs are quoted after a short discovery call.",
        "Activity intensity is adapted to the group."
      ],
      "says": "Take your team somewhere extraordinary.",
      "ctaLabel": "Request a Custom Proposal",
      "ctaNote": "Share your group size, dates and goals. We reply with a tailored plan.",
      "images": [
        "/assets/trip-team-building.jpg"
      ],
      "imageAlt": "A team running hand in hand across a hillside at Khanpur",
      "order": 1,
      "durationLabel": "",
      "grade": "",
      "altitude": "",
      "season": ""
    },
    {
      "slug": "destination-weddings-celebrations",
      "replaces": "",
      "title": "Destination Weddings & Celebrations",
      "category": "corporate",
      "tagline": "Big Love. Beautiful Places. Unforgettable Celebrations.",
      "shortDescription": "Say your vows with Rakaposhi as your witness, or celebrate under Mughal arches in old Lahore.",
      "overview": "We turn extraordinary places into seamless celebrations, from the first guest arrival to the farewell brunch.",
      "factsTitle": "At a Glance",
      "facts": [
        {
          "label": "Format",
          "value": "2 to 5 day celebrations"
        },
        {
          "label": "Style",
          "value": "Intimate, luxury, heritage and adventure"
        },
        {
          "label": "Destinations",
          "value": "Hunza, Skardu, Lahore and countryside resorts"
        }
      ],
      "itineraryTitle": "Sample Program",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Day 1",
          "title": "",
          "description": "Guest arrivals, welcome dinner and a cultural evening."
        },
        {
          "day": 2,
          "label": "Day 2",
          "title": "",
          "description": "The main celebration, photography and curated entertainment."
        },
        {
          "day": 3,
          "label": "Day 3",
          "title": "",
          "description": "Farewell brunch, optional sightseeing and departures."
        }
      ],
      "highlightsTitle": "What You Get",
      "highlights": [
        "A setting your guests will never forget",
        "One team coordinating every moving part",
        "Guest experiences beyond the main event",
        "Family time instead of logistics time"
      ],
      "includes": [],
      "excludes": [],
      "services": [
        "Destination and venue selection",
        "Guest travel and accommodation",
        "Decor, catering and entertainment",
        "Photography and film",
        "Guest experiences and excursions",
        "Day of coordination"
      ],
      "infoTitle": "Good to Know",
      "info": [
        "Mountain venues are seasonal. Ideal months depend on destination.",
        "Guest numbers in remote valleys may be limited by available rooms."
      ],
      "says": "Your love story deserves an extraordinary setting.",
      "ctaLabel": "Start Planning Your Celebration",
      "ctaNote": "Tell us your dream setting and guest count.",
      "images": [
        "/assets/blog-skardu.jpg"
      ],
      "imageAlt": "Shangrila Lake resort near Skardu",
      "order": 2,
      "durationLabel": "",
      "grade": "",
      "altitude": "",
      "season": ""
    },
    {
      "slug": "sales-conferences-leadership-offsites",
      "replaces": "",
      "title": "Sales Conferences & Leadership Offsites",
      "category": "corporate",
      "tagline": "Inspire the Team. Align the Vision. Celebrate the Wins.",
      "shortDescription": "Turn your next sales conference into the event your team actually looks forward to.",
      "overview": "We combine sharp conference production with a change of scenery that gets people talking, thinking and celebrating.",
      "factsTitle": "At a Glance",
      "facts": [
        {
          "label": "Format",
          "value": "1 to 4 day conferences, workshops and executive retreats"
        },
        {
          "label": "Ideal For",
          "value": "Sales teams, leadership groups and corporate gatherings"
        },
        {
          "label": "Built For",
          "value": "Sales leadership, marketing and admin teams"
        }
      ],
      "itineraryTitle": "Sample Program",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Day 1",
          "title": "",
          "description": "Welcome, keynotes, annual performance review, awards and networking dinner."
        },
        {
          "day": 2,
          "label": "Day 2",
          "title": "",
          "description": "Sales workshops, strategy sessions, team activities and closing celebration."
        }
      ],
      "highlightsTitle": "What You Get",
      "highlights": [
        "A team aligned on targets and strategy",
        "Recognition moments that motivate",
        "Professional production that reflects your brand",
        "Networking that carries back to the office"
      ],
      "includes": [],
      "excludes": [],
      "services": [
        "Venue sourcing and accommodation",
        "Audiovisual production and stage design",
        "Event branding",
        "Speaker and entertainment coordination",
        "Awards and recognition design",
        "Team activities and excursions"
      ],
      "infoTitle": "Good to Know",
      "info": [
        "Every event is scoped and quoted after a brief."
      ],
      "says": "Big ideas deserve a change of scenery.",
      "ctaLabel": "Plan My Conference",
      "ctaNote": "Send us your brief and we will build the agenda around it.",
      "images": [
        "/assets/trip-conference.jpg"
      ],
      "imageAlt": "A large group gathered outside their tents",
      "order": 3,
      "durationLabel": "",
      "grade": "",
      "altitude": "",
      "season": ""
    },
    {
      "slug": "csr-campaigns-community-experiences",
      "replaces": "",
      "title": "CSR Campaigns & Community Experiences",
      "category": "corporate",
      "tagline": "Travel with Purpose. Create Real Impact.",
      "shortDescription": "Take your organization closer to the communities and landscapes that matter.",
      "overview": "We design responsible programs with local partners, so your team contributes something real and comes home changed by it.",
      "factsTitle": "At a Glance",
      "facts": [
        {
          "label": "Format",
          "value": "1 to 5 day customized programs"
        },
        {
          "label": "Focus",
          "value": "Community development, environment and responsible tourism"
        },
        {
          "label": "Built For",
          "value": "CSR, sustainability and People teams"
        }
      ],
      "itineraryTitle": "Sample Program",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Day 1",
          "title": "",
          "description": "Arrival, community orientation and partner introductions."
        },
        {
          "day": 2,
          "label": "Day 2",
          "title": "",
          "description": "A locally designed conservation, education or community project."
        },
        {
          "day": 3,
          "label": "Day 3",
          "title": "",
          "description": "Impact review, reflection session and return."
        }
      ],
      "highlightsTitle": "What You Get",
      "highlights": [
        "Meaningful employee engagement",
        "Projects shaped by community needs",
        "Reportable activity for CSR and ESG updates",
        "Authentic content your brand can share responsibly"
      ],
      "includes": [],
      "excludes": [],
      "services": [
        "Partner identification and project scoping",
        "Environmental restoration and clean up drives",
        "Education and school support",
        "Waste management initiatives",
        "Volunteer coordination and logistics",
        "Post program summary"
      ],
      "infoTitle": "Good to Know",
      "info": [
        "Project feasibility depends on local partner availability and season.",
        "We prioritize community consent and long term benefit over photo opportunities."
      ],
      "says": "Go somewhere. Do something that matters.",
      "ctaLabel": "Design a CSR Program",
      "ctaNote": "Tell us your cause, team size and timeline.",
      "images": [
        "/assets/tour-kalash.jpg"
      ],
      "imageAlt": "A guide with children from a mountain village",
      "order": 4,
      "durationLabel": "",
      "grade": "",
      "altitude": "",
      "season": ""
    },
    {
      "slug": "documentaries-destination-production",
      "replaces": "",
      "title": "Documentaries & Destination Production",
      "category": "corporate",
      "tagline": "Extraordinary Stories Deserve Extraordinary Locations.",
      "shortDescription": "From the ice of the Karakoram to the color of old Lahore, Pakistan is full of stories waiting for a lens.",
      "overview": "You bring the vision. We bring the ground knowledge, local crew and logistics that keep a shoot on schedule.",
      "factsTitle": "At a Glance",
      "facts": [
        {
          "label": "Format",
          "value": "Project based"
        },
        {
          "label": "Services",
          "value": "Production logistics, location scouting and local support"
        },
        {
          "label": "Ideal For",
          "value": "Filmmakers, agencies, brands and production houses"
        }
      ],
      "itineraryTitle": "Sample Program",
      "fullItinerary": [
        {
          "day": 1,
          "label": "Day 1",
          "title": "",
          "description": "Location scouting, permits review and production briefing."
        },
        {
          "day": 2,
          "label": "Day 2",
          "title": "",
          "description": "Primary filming, interviews and local storytelling."
        },
        {
          "day": 3,
          "label": "Day 3",
          "title": "",
          "description": "Landscape filming and cultural documentation."
        },
        {
          "day": 4,
          "label": "Day 4",
          "title": "",
          "description": "Additional locations, pickups and contingency filming."
        },
        {
          "day": 5,
          "label": "Day 5",
          "title": "",
          "description": "Wrap, logistics review and departures."
        }
      ],
      "highlightsTitle": "What You Get",
      "highlights": [
        "Locations matched to your creative brief",
        "Faster, smoother permit processes",
        "Local fixers who open the right doors",
        "Crew safety in remote terrain"
      ],
      "includes": [],
      "excludes": [],
      "services": [
        "Location research and scouting",
        "Local fixers and guides",
        "Permit assistance",
        "Transport and accommodation",
        "Production coordination",
        "High altitude and remote area support"
      ],
      "infoTitle": "Good to Know",
      "info": [
        "Filming permissions vary by location and nationality and are confirmed per project.",
        "Drone use is subject to current regulations."
      ],
      "says": "Your vision. Our ground expertise. One unforgettable production.",
      "ctaLabel": "Discuss Your Production",
      "ctaNote": "Share your brief, locations and shoot window.",
      "images": [
        "/assets/trip-production.jpg"
      ],
      "imageAlt": "A film crew with a camera and tripod in a mountain meadow",
      "order": 5,
      "durationLabel": "",
      "grade": "",
      "altitude": "",
      "season": ""
    }
  ],
  "bookingInfo": [
    {
      "title": "What's Included",
      "body": "Accommodation, agreed transport, scheduled meals, local guides, listed activities and group logistics, as set out in your selected package.",
      "order": 1
    },
    {
      "title": "What's Not Included",
      "body": "Personal shopping, additional meals and drinks, personal equipment, travel insurance, emergency evacuation and anything not listed in your package.",
      "order": 2
    },
    {
      "title": "What to Bring",
      "body": "Valid ID or passport, comfortable footwear, layered clothing, rain protection, a refillable water bottle, sunscreen, personal medication and any destination specific gear we advise at booking.",
      "order": 3
    },
    {
      "title": "Health & Safety",
      "body": "Every itinerary is subject to weather, road conditions, local regulations and your guide's judgment on the day. Mountain trips need suitable fitness, equipment and preparation. Travel insurance is strongly recommended, and required for high altitude expeditions.",
      "order": 4
    },
    {
      "title": "Booking & Cancellation",
      "body": "Payment schedules, cancellation terms, refund eligibility and group discounts are shared at booking, in line with XPITUDE's official policy.",
      "order": 5
    },
    {
      "title": "Custom & Private Trips",
      "body": "Every XPITUDE experience can be tailored for private groups, families, international travelers, schools and corporate teams, subject to destination and operational requirements.",
      "order": 6
    }
  ],
  "closing": {
    "infoTitle": "Good to Know Before You Book",
    "title": "Your Next Adventure Starts Here.",
    "text": "Choose your experience. Pick your dates. We will take care of the rest.",
    "button": "Start Planning",
    "signoff": "XPITUDE. Explore Beyond the Ordinary."
  },
  "notInFile": [
    "nangma-valley-expedition",
    "hunza-autumn-trip",
    "five-day-air-safari-skardu",
    "five-day-air-safari-hunza-valley",
    "road-trip-hunza-valley",
    "road-trip-skardu",
    "road-trip-chitral",
    "chitral-kalash-cultural-trip",
    "the-gandhara-trail",
    "hunza-leadership-retreat",
    "deosai-canvas-camp",
    "fairy-meadows-team-programme"
  ]
};
