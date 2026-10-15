// Travel Guide page content. Edit here, then run:  node tools/build-pages.mjs
// Links between guide pages are relative to /travel-guide/.

export const GUIDES = [
  {
    slug: "pakistan-at-a-glance",
    title: "Pakistan at a Glance",
    image: "hero.jpg",
    description: "Key facts for first time visitors to Pakistan: geography, language, money, connectivity, culture and what to expect on arrival.",
    intro: "The essentials for a first visit, from the shape of the country to how to pay for a cup of tea.",
    body: `
<h2>Key facts</h2>
<dl class="facts">
  <div><dt>Capital</dt><dd>Islamabad</dd></div>
  <div><dt>Time zone</dt><dd>UTC +5, no daylight saving</dd></div>
  <div><dt>Currency</dt><dd>Pakistani rupee (PKR)</dd></div>
  <div><dt>Dialling code</dt><dd>+92</dd></div>
  <div><dt>Languages</dt><dd>Urdu and English, with Balti, Shina, Burushaski, Wakhi and Khowar in the north</dd></div>
  <div><dt>Electricity</dt><dd>230 V, 50 Hz. Plug types C and D are the most common</dd></div>
  <div><dt>Driving</dt><dd>On the left</dd></div>
  <div><dt>Gateways</dt><dd>Islamabad for the north, Lahore and Karachi for the south</dd></div>
</dl>

<h2>The country in a paragraph</h2>
<p>Pakistan runs from the Arabian Sea to the greatest mountain junction on earth. The Karakoram, the Himalaya and the Hindu Kush meet in the north near Gilgit, and five of the world's fourteen peaks above 8,000 metres stand here, K2 at 8,611 metres among them. South of the mountains lie the Punjab plains, the Indus, the Cholistan desert and the old cities of Lahore and Multan. It is home to more than 240 million people and a great many languages.</p>

<h2>Money</h2>
<ul>
  <li>Pakistan is largely a cash economy once you leave the big cities. Carry enough rupees for the mountain section of your trip.</li>
  <li>ATMs exist in Islamabad, Lahore, Gilgit, Skardu and Hunza, but they do not always accept foreign cards and they do run empty.</li>
  <li>Change money in Islamabad or Lahore, where rates and availability are better than in the north.</li>
  <li>Cards are accepted at larger hotels in the cities and very rarely elsewhere.</li>
</ul>

<h2>Staying connected</h2>
<p>Coverage is good in the cities and along the main roads, and patchy to absent on trek. In Gilgit-Baltistan the regional network, SCOM, reaches furthest. Visitors can buy a local SIM with their passport at an operator's own franchise. Expect no signal beyond the last village on most trekking routes, and plan for that with the people at home.</p>

<h2>Culture and dress</h2>
<ul>
  <li>Pakistan is a conservative, Muslim majority country and a famously hospitable one. You will be offered tea often. Accepting it is the right answer.</li>
  <li>Dress modestly. Loose clothing that covers shoulders and knees suits both men and women, and women will want a scarf to hand for mosques and shrines.</li>
  <li>Remove your shoes before entering a mosque, a shrine or a home.</li>
  <li>Ask before you photograph people, women especially. Do not photograph military sites, checkpoints or bridges.</li>
  <li>Alcohol is not generally on sale. During Ramadan, avoid eating and drinking in public in daylight hours.</li>
</ul>

<h2>Food and water</h2>
<p>Drink bottled or treated water throughout, including for brushing teeth. Food in the north is simple and good: fresh bread, dal, rice, apricots and walnuts in season. Tell us about allergies and dietary needs before you travel so the kitchen can plan for them.</p>

<h2>Next steps</h2>
<p>Read the <a href="pakistan-visa-guide.html">Pakistan Visa Guide</a> and <a href="best-time-to-visit-pakistan.html">Best Time to Visit Pakistan</a> before you settle on dates.</p>
`,
  },

  {
    slug: "is-pakistan-safe-to-travel",
    title: "Is Pakistan Safe to Travel?",
    image: "tour-road-hunza.jpg",
    description: "An honest look at safety for visitors to Pakistan: which regions are calm, what the real risks are in the mountains, and how to prepare.",
    intro: "An honest answer has two halves. Here are both.",
    body: `
<h2>The short answer</h2>
<p>The regions most travellers come for, Hunza, Skardu, Fairy Meadows and the high Karakoram, are calm, welcoming and visited by foreign trekkers and climbers every season. Other parts of the country carry genuine risk and are the subject of government travel warnings. Both statements are true at once, which is why the region matters more than the country when you assess a trip.</p>

<h2>Read the official advice first</h2>
<ul>
  <li>Check your own government's travel advisory for Pakistan before you book, and again shortly before you leave. Advice is given region by region.</li>
  <li>Check what your insurer says about those same regions. Many policies do not cover travel to an area your government advises against. See the <a href="travel-insurance-guide.html">Travel Insurance Guide</a>.</li>
  <li>If your route passes through or near an area under a warning, raise it with us and we will talk through the alternatives.</li>
</ul>

<h2>The risks that matter in the mountains</h2>
<p>For a visitor to the north, the hazards are the ordinary ones of big mountains rather than anything else.</p>
<ul>
  <li><b>Roads.</b> Journeys are long, and the Karakoram Highway and the Skardu road are prone to rockfall and landslides, particularly after rain.</li>
  <li><b>Altitude.</b> Several of our routes go above 4,000 metres and two go above 5,000. Acclimatisation is built into the itinerary and is not optional.</li>
  <li><b>Weather.</b> Conditions change quickly and can close a pass, ground a flight or hold a group in camp for a day.</li>
  <li><b>Remoteness.</b> Medical facilities in the north are basic. Hospitals are in Gilgit and Skardu, and serious cases go to Islamabad.</li>
</ul>

<h2>What travelling with XPITUDE changes</h2>
<ul>
  <li>A licensed guide and trained crew on every departure.</li>
  <li>A coordinator in Islamabad who is reachable for the whole journey.</li>
  <li>A written kit list, altitude guidance and a pre departure call, so you arrive prepared.</li>
</ul>

<h2>On the ground</h2>
<ul>
  <li>Carry your passport and several photocopies of the photo page and visa. Foreign visitors are registered at checkpoints along the main roads.</li>
  <li>In some districts the authorities provide visitors with a police escort. It is routine and it is not a sign that something is wrong.</li>
  <li>Keep away from demonstrations and large political gatherings.</li>
  <li>Avoid mountain roads after dark.</li>
  <li>Follow your guide's judgement on weather, route and timing. It is what they are there for.</li>
</ul>

<h2>Women travellers</h2>
<p>Many women travel in northern Pakistan, in groups and alone, and are received with courtesy. Modest dress is expected everywhere. Hunza is noticeably more relaxed than the towns further south.</p>

<div class="note"><b>Please note.</b> This page is general guidance, not a security assessment. Conditions change. Your government's current advisory is the authority.</div>
`,
  },

  {
    slug: "pakistan-visa-guide",
    title: "Pakistan Visa Guide",
    image: "tour-air-hunza.jpg",
    description: "How to apply for a Pakistan tourist visa online, the documents you need, and when a trekking permit is required for routes such as K2 Base Camp.",
    intro: "Most visitors apply online. Here is how the process works and where trekking permits come in.",
    body: `
<h2>Who needs a visa</h2>
<p>Most foreign nationals need a visa to enter Pakistan, and most can apply for one online. What you are eligible for, how long it lasts and what it costs depend on your nationality. Pakistan widened its online visa scheme in 2024 and the rules have changed more than once in recent years, so treat the official portal as the authority and anything else, this page included, as a starting point.</p>
<div class="note"><b>Apply here.</b> The official Pakistan Online Visa System is at <a href="https://visa.nadra.gov.pk" rel="noopener" target="_blank">visa.nadra.gov.pk</a>. Use only the official site. Third party sites charge extra for the same form.</div>

<h2>How to apply</h2>
<ul>
  <li><b>Check your category.</b> The portal shows which visa types are open to your nationality and whether a fee applies.</li>
  <li><b>Gather your documents.</b> See the list below.</li>
  <li><b>Apply online.</b> Create an account, complete the form and upload your documents.</li>
  <li><b>Receive your approval.</b> It arrives by email. Print it and carry it with your passport.</li>
  <li><b>Arrive.</b> Present both at immigration.</li>
</ul>

<h2>What you will usually need</h2>
<ul>
  <li>A passport valid for at least six months beyond your arrival date, with blank pages.</li>
  <li>A recent passport style photograph.</li>
  <li>Proof of where you will stay, or a letter from your tour operator.</li>
  <li>Your travel dates and port of entry.</li>
</ul>

<h2>Trekking permits and restricted areas</h2>
<p>A visa lets you into the country. Some mountain areas need more.</p>
<ul>
  <li>Treks in restricted zones, including the Baltoro route to Concordia and K2 Base Camp, require a trekking permit applied for through a licensed Pakistani tour operator, and must be led by a licensed guide.</li>
  <li>Treks in open zones, such as Fairy Meadows and Rakaposhi Base Camp, do not need a trekking permit.</li>
  <li>National park entry fees apply in some areas, including the Central Karakoram National Park and Deosai.</li>
</ul>
<p>We handle trekking permits and the supporting paperwork as part of your booking. Permits take time to process, so restricted area treks need to be confirmed well ahead of departure.</p>

<h2>Timing</h2>
<ul>
  <li>Apply for your visa as soon as your dates are fixed. Do not leave it to the final fortnight.</li>
  <li>Check that the visa validity covers your whole trip, including buffer days at the end.</li>
  <li>Some nationalities follow a different process or cannot apply online. If the portal does not offer you a tourist visa, contact your nearest Pakistani embassy or consulate.</li>
</ul>
`,
  },

  {
    slug: "best-time-to-visit-pakistan",
    title: "Best Time to Visit Pakistan",
    image: "tour-autumn.jpg",
    description: "When to visit Pakistan by region and season: trekking in the Karakoram, Hunza in blossom and autumn, Kalash festivals and the deserts in winter.",
    intro: "The mountains have a summer. The south has a winter. Choose the region first and the month follows.",
    body: `
<h2>By region</h2>
<div class="tscroll"><table class="gtable">
  <thead><tr><th>Region</th><th>Best months</th><th>Why</th></tr></thead>
  <tbody>
    <tr><td>High treks</td><td>June to September</td><td>K2 Base Camp, Concordia and Rush Lake. The glaciers are passable and the high camps are clear of deep snow.</td></tr>
    <tr><td>Lower treks</td><td>May to October</td><td>Fairy Meadows, Nanga Parbat Base Camp and Rakaposhi Base Camp have a longer season at lower altitude.</td></tr>
    <tr><td>Hunza</td><td>April to October</td><td>Blossom in spring, green terraces in summer, and the poplars turning gold in October.</td></tr>
    <tr><td>Skardu</td><td>April to October</td><td>Reachable by air all year, at its best from spring to autumn. Deosai is open from June to September.</td></tr>
    <tr><td>Chitral &amp; Kalash</td><td>May to September</td><td>The valleys are open and the summer festivals fall in this window.</td></tr>
    <tr><td>Lahore, Multan and the south</td><td>October to March</td><td>Cool, clear days for the cities and shrines. Summer on the plains is fiercely hot.</td></tr>
    <tr><td>Cholistan desert</td><td>November to February</td><td>Winter is when the desert is worth being in.</td></tr>
  </tbody>
</table></div>

<h2>Season by season</h2>
<h3>Spring, March to May</h3>
<p>Apricot and cherry blossom moves up the Hunza valley from late March into April. The high passes are still closed and the nights are cold, but the valleys are at their prettiest and quietest.</p>
<h3>Summer, June to September</h3>
<p>The trekking season. The high routes open, Deosai is in flower and the days are long. The monsoon reaches the Punjab and the lower hills in July and August, and can cause landslides on the roads north, while the Karakoram itself stays comparatively dry.</p>
<h3>Autumn, October and early November</h3>
<p>Settled weather, sharp light and autumn colour across Hunza and Baltistan. The high treks are closing, but this is the best time of year for a road or air journey.</p>
<h3>Winter, December to February</h3>
<p>Deep cold in the north, with many high roads shut. This is the season for the south: Lahore, Multan, Uch Sharif and the Cholistan desert.</p>

<h2>Roads and passes</h2>
<ul>
  <li>The Khunjerab Pass on the Chinese border closes for the winter.</li>
  <li>The Babusar Pass, the shorter summer road north, is usually open from around June to October.</li>
  <li>The Deosai plateau is snowbound outside the summer months.</li>
</ul>

<h2>Festivals worth planning around</h2>
<ul>
  <li><b>Chilam Joshi</b>, the Kalash spring festival, in May.</li>
  <li><b>Uchal</b>, the Kalash harvest festival, in August.</li>
  <li><b>Hunza in autumn</b>, in October, when the poplars turn.</li>
</ul>
<p>Festival dates move from year to year. Ask us for the current dates before you book flights.</p>
`,
  },

  {
    slug: "trekking-trip-difficulty-grades",
    title: "Trekking &amp; Trip Difficulty Grades",
    image: "exp-k2.jpg",
    description: "How XPITUDE grades its treks and tours, from easy road journeys to strenuous glacier expeditions above 5,000 metres, and how to choose the right one.",
    intro: "What the grade on each trip means, and how to tell which one is right for you.",
    body: `
<h2>Trek grades</h2>
<div class="tscroll"><table class="gtable">
  <thead><tr><th>Grade</th><th>What to expect</th><th>Who it suits</th></tr></thead>
  <tbody>
    <tr><td>Grade I</td><td>Easy walking on good paths, three to five hours a day, at modest altitude.</td><td>Anyone who is active and enjoys a day walk.</td></tr>
    <tr><td>Grade II</td><td>Four to six hours a day with some steep or rough ground, reaching up to around 4,200 metres.</td><td>Good general fitness. No previous trekking needed.</td></tr>
    <tr><td>Grade III</td><td>Five to seven hours a day on moraine and rough trail, with several consecutive nights in camp.</td><td>Regular hill walkers with a multi day trek behind them.</td></tr>
    <tr><td>Grade IV</td><td>Six to eight hours a day for many days in a row, on glacier and moraine, sleeping above 4,000 metres and reaching above 5,000.</td><td>Fit, experienced trekkers, ideally with previous time at altitude.</td></tr>
    <tr><td>Grade V</td><td>Everything in Grade IV plus a technical section, such as a high pass with fixed ropes, crampons and an ice axe.</td><td>Strong trekkers with some mountaineering experience.</td></tr>
  </tbody>
</table></div>

<h2>Where our treks sit</h2>
<div class="tscroll"><table class="gtable">
  <thead><tr><th>Trek</th><th>High point</th><th>Grade</th></tr></thead>
  <tbody>
    <tr><td>Rakaposhi Base Camp</td><td>3,500 m</td><td>Grade II</td></tr>
    <tr><td>Nanga Parbat Base Camp and Fairy Meadows</td><td>4,200 m</td><td>Grade II</td></tr>
    <tr><td>Haramosh Base Camp and Kutwal Lake</td><td>3,900 m</td><td>Grade III</td></tr>
    <tr><td>Nangma Valley Expedition</td><td>4,300 m</td><td>Grade III</td></tr>
    <tr><td>Rush Lake and Rush Pari Peak</td><td>5,098 m</td><td>Grade IV</td></tr>
    <tr><td>K2 Base Camp and Concordia</td><td>5,150 m</td><td>Grade IV</td></tr>
  </tbody>
</table></div>
<p>The optional Gondogoro La crossing on the way out from Concordia is a technical addition to the K2 Base Camp trek. Talk to us before you plan on it.</p>

<h2>Tour grades</h2>
<ul>
  <li><b>Gentle.</b> Retreat pace. Short walks, long mornings and very little time on the road.</li>
  <li><b>Easy.</b> Travel by air or road with short walks to viewpoints, forts and villages. Suitable for all ages.</li>
  <li><b>Moderate.</b> Longer days on rougher mountain roads, with simpler accommodation in the more remote valleys.</li>
</ul>

<h2>Altitude</h2>
<p>Grade is about effort. Altitude is a separate question, and it affects fit people as readily as anyone else.</p>
<ul>
  <li>Above 3,000 metres, height should be gained gradually, with rest days built in. Our itineraries are paced for this.</li>
  <li>Headache, poor sleep and loss of appetite are common in the first days at altitude. Tell your guide about any symptom, however small.</li>
  <li>If symptoms get worse, the treatment is to go down. Your guide makes that call and it is final.</li>
  <li>Speak to your doctor before booking a Grade III trek or above if you have a heart, lung or blood pressure condition.</li>
</ul>

<div class="note"><b>A grade is a guide.</b> Weather, snow and the condition of the glacier can make any route harder than its grade in a given week. If you are unsure, tell us what you have done before and we will tell you honestly where it puts you.</div>
`,
  },

  {
    slug: "packing-equipment-checklist",
    title: "Essential Packing &amp; Equipment Checklist",
    image: "arc-4.jpg",
    description: "A complete packing and equipment checklist for trekking and touring in Pakistan: clothing layers, footwear, camp gear, documents and electronics.",
    intro: "What to bring, what to leave, and what matters most above the snow line.",
    body: `
<p>You receive a written kit list for your own departure before you leave, and where it differs from this page, that list is the one to follow. Use this as a general checklist while you plan.</p>

<h2>How to pack</h2>
<ul>
  <li><b>One duffel bag</b> for your main kit. Soft, tough and lockable. It travels with the porters or pack animals, so you will not see it during the day.</li>
  <li><b>One daypack</b> of 25 to 35 litres, carried by you, for water, layers, camera and snacks.</li>
  <li>Ask your planner for the weight allowance on your route. Porter loads are capped and domestic flights carry less than international ones.</li>
</ul>

<h2>Documents and money</h2>
<ul class="checks">
  <li>Passport and printed visa approval</li>
  <li>Photocopies of both, and passport photos</li>
  <li>Travel insurance certificate and emergency number</li>
  <li>Cash in rupees for the mountain section</li>
  <li>Flight tickets and booking references</li>
  <li>Emergency contact details</li>
</ul>

<h2>Clothing</h2>
<ul class="checks">
  <li>Base layers, top and bottom</li>
  <li>Trekking shirts, long sleeved</li>
  <li>Fleece or light insulated mid layer</li>
  <li>Down jacket</li>
  <li>Waterproof jacket and trousers</li>
  <li>Trekking trousers</li>
  <li>Warm hat and sun hat</li>
  <li>Buff or neck gaiter</li>
  <li>Liner gloves and warm gloves</li>
  <li>Trekking socks and liner socks</li>
  <li>Modest clothes for towns and villages</li>
  <li>A scarf, for mosques and shrines</li>
</ul>

<h2>Footwear</h2>
<ul class="checks">
  <li>Trekking boots, waterproof and well worn in</li>
  <li>Camp shoes or sandals</li>
  <li>Gaiters, for snow and scree</li>
  <li>Spare laces</li>
</ul>

<h2>Sleeping and camp</h2>
<ul class="checks">
  <li>Sleeping bag suited to the lowest night temperature on your route</li>
  <li>Sleeping bag liner</li>
  <li>Head torch and spare batteries</li>
  <li>Water bottles or bladder, two litres in total</li>
  <li>Water purification tablets or filter</li>
  <li>Quick drying towel</li>
  <li>Wet wipes and hand sanitiser</li>
  <li>Toiletries in small quantities</li>
</ul>

<h2>In your daypack</h2>
<ul class="checks">
  <li>Sunglasses rated category 3 or 4</li>
  <li>Sunscreen, SPF 50, and lip balm</li>
  <li>Trekking poles</li>
  <li>Personal medical kit</li>
  <li>Snacks you know you like</li>
  <li>Dry bag or pack cover</li>
</ul>

<h2>Electronics</h2>
<ul class="checks">
  <li>Power bank, the larger the better</li>
  <li>Plug adaptor for types C and D</li>
  <li>Camera, spare batteries and cards</li>
  <li>Charging cables</li>
</ul>

<h2>For Grade IV treks and above</h2>
<p>On routes that sleep above 4,000 metres, the cold is the thing to pack for. Bring a warmer sleeping bag, a heavier down jacket, insulated gloves and glacier grade sunglasses. If your route includes a technical pass, we will tell you exactly what is needed and what can be provided.</p>

<h2>For tours and road journeys</h2>
<p>You need far less. Comfortable walking shoes, layers for cool evenings, a warm jacket, sun protection and modest clothing cover almost every tour we run. See the <a href="recommended-medical-kit.html">Recommended Medical Kit</a> for what to carry on any trip.</p>
`,
  },

  {
    slug: "recommended-flights-airlines",
    title: "Recommended Flights &amp; Airlines",
    image: "tour-air-skardu.jpg",
    description: "How to fly to Pakistan and on to Skardu and Gilgit: international gateways, airlines with one stop connections to Islamabad, and booking advice.",
    intro: "How to reach Islamabad, and how to get from there to the mountains.",
    body: `
<h2>Where to fly into</h2>
<ul>
  <li><b>Islamabad (ISB)</b> is the gateway for everything in the north: Hunza, Skardu, Fairy Meadows, Chitral and every trek we run.</li>
  <li><b>Lahore (LHE)</b> suits journeys in the south, including Shrines of the South and the Cholistan desert.</li>
  <li><b>Karachi (KHI)</b> has the most international connections but is a long way from the mountains.</li>
</ul>

<h2>International airlines</h2>
<p>From Europe, North America and much of Asia, the simplest routes to Islamabad are one stop connections through the Gulf or Istanbul.</p>
<ul>
  <li><b>Qatar Airways</b>, through Doha</li>
  <li><b>Emirates</b>, through Dubai</li>
  <li><b>Etihad Airways</b>, through Abu Dhabi</li>
  <li><b>Turkish Airlines</b>, through Istanbul</li>
</ul>
<p>Other carriers serve Islamabad as well, and routes and schedules change from season to season. Check current timetables before you settle on dates.</p>

<h2>Domestic flights to the mountains</h2>
<p>Flights run from Islamabad to <b>Skardu</b> and to <b>Gilgit</b>, each taking about an hour. Pakistan International Airlines is the main operator on both. These are among the most spectacular scheduled flights anywhere, passing close to Nanga Parbat on a clear day.</p>
<p>They are also weather dependent and are cancelled often. Read <a href="flight-cancellations-travel-disruptions.html">Flight Cancellations &amp; Travel Disruptions</a> before you book your flight home.</p>

<h2>Booking advice</h2>
<ul>
  <li><b>Arrive a day early.</b> Land in Islamabad at least one full day before your trip begins. It absorbs a delayed connection and a lost bag, and it helps with jet lag.</li>
  <li><b>Leave a buffer at the end.</b> Do not book your international flight home for the day you are due back from the mountains.</li>
  <li><b>Buy a changeable ticket.</b> The small extra cost is worth it in a country where mountain weather sets the timetable.</li>
  <li><b>Check domestic baggage limits.</b> They are lower than international allowances. Pack your duffel to the smaller figure.</li>
  <li><b>Send us your flight details.</b> We plan your arrival and the first day around them.</li>
</ul>
`,
  },

  {
    slug: "flight-cancellations-travel-disruptions",
    title: "Flight Cancellations &amp; Travel Disruptions",
    image: "tour-road-skardu.jpg",
    description: "Why flights to Skardu and Gilgit are often cancelled, what happens when they are, and how to plan buffer days and road alternatives into your trip.",
    intro: "Mountain weather sets the timetable. Plan for it and a cancelled flight becomes a change of plan, not a crisis.",
    body: `
<h2>Why mountain flights are cancelled</h2>
<p>The flights from Islamabad to Skardu and Gilgit thread between very high mountains and operate only when visibility along the route is good. Cloud at either end, or anywhere between, can ground them. Cancellations are common in every season and cannot be predicted more than a day ahead. This is normal, and every sensible itinerary allows for it.</p>

<h2>What happens when a flight is cancelled</h2>
<ul>
  <li>The airline will usually offer a seat on the next available flight or a refund. After a run of bad weather, the next available seat may be several days away.</li>
  <li>The alternative is the road. Islamabad to Skardu or to Hunza is roughly two days by road along the Karakoram Highway. In summer the Babusar Pass shortens the drive.</li>
  <li>The drive is long, and it is also one of the great road journeys of Asia. Many guests end up glad to have done it once.</li>
</ul>

<h2>Road disruptions</h2>
<p>Landslides and rockfall can close the Karakoram Highway and the road to Skardu, most often during and after summer rain. Closures are usually cleared within hours, occasionally within days. Your guide and our coordinator in Islamabad follow road conditions throughout your journey and will adjust the plan when they need to.</p>

<h2>How to protect your trip</h2>
<ul>
  <li><b>Keep buffer days.</b> Leave at least one clear day, and preferably two, between your planned return from the mountains and your international flight.</li>
  <li><b>Buy flexible tickets.</b> Choose an international fare that can be changed.</li>
  <li><b>Check your insurance.</b> Make sure it covers delay, missed connections and the extra accommodation that follows. See the <a href="travel-insurance-guide.html">Travel Insurance Guide</a>.</li>
  <li><b>Stay reachable.</b> Give us a phone number that works in Pakistan, so we can reach you if plans change on the day.</li>
  <li><b>Hold the plan loosely.</b> In the mountains the order of days sometimes changes. The trip does not get worse for it.</li>
</ul>

<div class="note"><b>Ask before you book.</b> Tell us your international flight times before you buy the ticket. It is far easier to shape the itinerary around the right flight than to repair it around the wrong one.</div>
`,
  },

  {
    slug: "travel-insurance-guide",
    title: "Travel Insurance Guide",
    image: "exp-haramosh.jpg",
    description: "What your travel insurance needs to cover for trekking in Pakistan: altitude limits, helicopter evacuation, medical costs, cancellation and delay.",
    intro: "The policy most people already have will not cover a trek in the Karakoram. Here is what to look for.",
    body: `
<h2>What your policy must cover</h2>
<ul>
  <li><b>Trekking to the altitude of your route.</b> Many standard policies stop at 3,000 or 4,000 metres. K2 Base Camp is at 5,150 metres. Check the limit, and check that it is the height you walk to, not the height you sleep at.</li>
  <li><b>Emergency evacuation, including by helicopter.</b> This is the cover that matters most and the one most often missing.</li>
  <li><b>Emergency medical treatment and repatriation.</b></li>
  <li><b>Cancellation and curtailment,</b> from the day you book.</li>
  <li><b>Travel delay and missed connections,</b> given how often mountain flights are cancelled.</li>
  <li><b>Baggage and equipment,</b> including anything you hire.</li>
</ul>

<h2>Three checks before you buy</h2>
<ul>
  <li><b>Activity.</b> Trekking must be named as a covered activity. If your route crosses a glacier or a technical pass, ask the insurer in writing whether that is included.</li>
  <li><b>Destination.</b> Ask whether the policy is valid for Pakistan, and for the specific regions you will visit. Some insurers exclude areas that their government advises against.</li>
  <li><b>Evacuation.</b> Ask how a rescue is authorised and paid for. A policy that reimburses you afterwards is of limited use if a deposit is needed before a helicopter will fly.</li>
</ul>

<h2>Helicopter rescue in Pakistan</h2>
<p>Helicopter evacuation in the northern mountains is flown by Askari Aviation using military aircraft. It depends on weather and on aircraft availability, and it generally requires a financial guarantee to be in place before a flight is authorised. It is a last resort and never a certainty. Ask us how this is arranged for your route when you book.</p>

<h2>What to send us</h2>
<ul>
  <li>The name of your insurer and your policy number.</li>
  <li>The insurer's 24 hour emergency assistance number.</li>
  <li>The name and number of someone at home we can contact.</li>
</ul>
<p>Carry a printed copy of your certificate in your daypack as well. There is no signal on most of our trekking routes.</p>

<div class="note"><b>Please note.</b> We are not insurance advisers and cannot recommend a specific policy. Read the policy wording yourself, and get any answer that matters from your insurer in writing.</div>
`,
  },

  {
    slug: "recommended-medical-kit",
    title: "Recommended Medical Kit",
    image: "exp-rush.jpg",
    description: "A recommended personal medical kit for trekking and travel in Pakistan, covering first aid, stomach, altitude, sun and prescription medication.",
    intro: "A small, well chosen personal kit, and a conversation with your doctor before you go.",
    body: `
<div class="note"><b>See a doctor first.</b> This is a packing guide, not medical advice. Visit your doctor or a travel clinic six to eight weeks before you leave to discuss vaccinations, altitude and any medication listed here.</div>

<h2>Your own medication</h2>
<ul>
  <li>Enough of any regular prescription for the whole trip, plus a week's spare.</li>
  <li>Keep it in the original packaging, with a copy of the prescription, in your hand luggage.</li>
  <li>If you carry an inhaler, an adrenaline pen or insulin, tell us before departure and tell your guide on day one.</li>
</ul>

<h2>First aid</h2>
<ul class="checks">
  <li>Plasters in assorted sizes</li>
  <li>Blister plasters and zinc oxide tape</li>
  <li>Sterile dressings and a crepe bandage</li>
  <li>Antiseptic wipes or cream</li>
  <li>Small scissors and tweezers</li>
  <li>Disposable gloves</li>
</ul>

<h2>Pain, fever and allergy</h2>
<ul class="checks">
  <li>Paracetamol</li>
  <li>Ibuprofen</li>
  <li>Antihistamine tablets</li>
  <li>Throat lozenges</li>
</ul>

<h2>Stomach</h2>
<ul class="checks">
  <li>Oral rehydration salts</li>
  <li>Loperamide, for travel days</li>
  <li>Antacid tablets</li>
  <li>Hand sanitiser</li>
  <li>Water purification tablets</li>
  <li>An antibiotic for traveller's diarrhoea, if your doctor prescribes one</li>
</ul>

<h2>Altitude</h2>
<p>If your trek goes above 3,000 metres, talk to your doctor about altitude illness and about acetazolamide (Diamox). It is a prescription medicine, it does not suit everyone, and it is not a substitute for gaining height slowly. Never use medication to keep climbing with symptoms that are getting worse.</p>

<h2>Sun, skin and eyes</h2>
<ul class="checks">
  <li>Sunscreen, SPF 50</li>
  <li>Lip balm with SPF</li>
  <li>Moisturiser, for dry mountain air</li>
  <li>Eye drops</li>
  <li>Insect repellent, for the lower valleys and the south</li>
  <li>Spare glasses or contact lenses</li>
</ul>

<h2>Before you leave</h2>
<ul>
  <li>Check that your routine vaccinations are up to date and ask about any recommended for Pakistan.</li>
  <li>See a dentist if you have not been recently. The Baltoro is a poor place to find out about a tooth.</li>
  <li>Tell us about any medical condition, allergy or recent surgery when you book. It stays confidential, and it lets us plan properly.</li>
</ul>
<p>For everything else to pack, see the <a href="packing-equipment-checklist.html">Essential Packing &amp; Equipment Checklist</a>.</p>
`,
  },
];
