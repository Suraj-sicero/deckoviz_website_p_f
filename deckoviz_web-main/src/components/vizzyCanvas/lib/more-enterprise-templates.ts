export interface MoreEnterpriseTemplate {
  id: string
  text: string
  isExample: boolean
}

export interface MoreEnterpriseSection {
  title: string
  templates: MoreEnterpriseTemplate[]
}

export interface MoreEnterpriseGroup {
  category: string
  sections: MoreEnterpriseSection[]
}

export const MORE_ENTERPRISE_GROUPS: MoreEnterpriseGroup[] = [
  {
    category: "Restaurants",
    sections: [
      {
        title: "Restaurants — fill-in templates",
        templates: [
          {
            id: "ent-rest-fill-1",
            text: "Create a cinematic loop video of our signature dish [dish name] on the pass — steam rising, sauce catching the light, the final garnish landing. Style: [warm and candlelit / cool and editorial / bold and graphic]. No text. To display on the frame in the dining room or at the bar.",
            isExample: false,
          },
          {
            id: "ent-rest-fill-2",
            text: "Create a dish assembly video for [dish name] — ingredients appearing one by one, layering up, the plate revealed. Style: [graphic and illustrated / photorealistic / painterly / slow motion]. To loop on the frame near the dish or at the entrance.",
            isExample: false,
          },
          {
            id: "ent-rest-fill-3",
            text: "Create a visual that tells the origin story of our cuisine. Our cuisine: [describe — region, culture, tradition, what makes it ours]. Style: [cinematic / illustrated / painterly / documentary still]. Mood: [warm and proud / poetic / quietly epic]. For the dining room wall.",
            isExample: false,
          },
          {
            id: "ent-rest-fill-4",
            text: "Create a daily specials display for our frame. Today's specials: [list dishes and prices if desired]. Style: [chalkboard aesthetic / editorial / bold typographic / illustrated]. Brand colours: [describe]. Tone: [warm and inviting / clean and modern / rustic].",
            isExample: false,
          },
          {
            id: "ent-rest-fill-5",
            text: "Create a brunch-to-dinner atmosphere shift — two linked displays that change the feeling of our dining room across the day. Brunch: [describe the mood you want]. Dinner: [describe the mood you want]. Style consistent across both: [painterly / cinematic / editorial / illustrated].",
            isExample: false,
          },
          {
            id: "ent-rest-fill-6",
            text: "Create a fine-art-style painting of our signature dish [dish name] — not a food photograph, a work of art. Style: [Dutch still life / contemporary painterly / watercolour / bold graphic]. To hang in the dining room or private dining space.",
            isExample: false,
          },
          {
            id: "ent-rest-fill-7",
            text: "Create an artistic portrait of our head chef [name, optional] — expressive and characterful, not photographic. Style: [painterly / bold illustrated / graphic / warm and human]. For display at the entrance or behind the bar.",
            isExample: false,
          },
          {
            id: "ent-rest-fill-8",
            text: "Create a visual for our seasonal menu — [season]. Key ingredients to feature: [list them]. Mood: [fresh and light / rich and warming / abundant / restrained and elegant]. Style: [illustrated / painterly / editorial / graphic].",
            isExample: false,
          },
          {
            id: "ent-rest-fill-9",
            text: "Create a display that takes guests through the sourcing story of our hero ingredient [ingredient name]. From: [origin or farm]. To: the plate. Style: [documentary / editorial / illustrated / cinematic]. For display near the relevant dish or on the menu wall.",
            isExample: false,
          },
          {
            id: "ent-rest-fill-10",
            text: "Create a guest farewell memento for a table celebrating [occasion]. Names: [optional]. A personalised artwork to send digitally at the end of the meal. Style: [painterly and warm / illustrated / elegant typographic]. Mood: [celebratory / intimate / timeless].",
            isExample: false,
          },
          {
            id: "ent-rest-fill-11",
            text: "Create a display for our bar that captures the craft of making our signature cocktail [name]. Show the process — ice, pour, garnish — in a way that makes people want to order it. Style: [cinematic / graphic / slow and editorial]. To loop behind the bar.",
            isExample: false,
          },
          {
            id: "ent-rest-fill-12",
            text: "Create a tasting menu visual journey — one distinct visual moment per course, [number] courses in total. Tone: [elegant and cinematic / playful and illustrated / abstract and artistic]. Each image should feel like a chapter. To display during the tasting experience.",
            isExample: false,
          },
          {
            id: "ent-rest-fill-13",
            text: "Create a visual for our private dining room that feels like it belongs only here — not generic restaurant art. Theme: [our location / our cuisine's culture / an abstract that captures our food philosophy]. Style: [painterly / graphic / minimalist / bold]. Large format, portrait orientation.",
            isExample: false,
          },
          {
            id: "ent-rest-fill-14",
            text: "Create a display for our wine list or a featured producer [name / region]. Tell the story of the wine: [describe what makes it special — the terroir, the winemaker, the story]. Style: [editorial / painterly / cinematic]. Mood: [warm and intimate / refined and minimal / earthy and honest].",
            isExample: false,
          },
          {
            id: "ent-rest-fill-15",
            text: "Create a rotating display of the faces and stories behind our food — farmers, suppliers, the people who grow what we serve. Stories to feature: [describe one or two]. Style: [documentary / illustrated / editorial / warm and human]. For the dining room or entrance.",
            isExample: false,
          },
          {
            id: "ent-rest-fill-16",
            text: "Create a display for our open kitchen that celebrates the craft and precision happening in there — without showing staff. The process, the heat, the detail. Style: [graphic and bold / cinematic / close and editorial]. To display at the pass or the kitchen window.",
            isExample: false,
          },
          {
            id: "ent-rest-fill-17",
            text: "Create a display for a restaurant group that updates our daily specials across [number] locations simultaneously every morning. Format: [consistent template with space for today's dishes]. Style: [clean and branded / editorial / chalkboard / illustrated]. Brand colours: [describe].",
            isExample: false,
          },
        ],
      },
      {
        title: "Restaurants — ready-to-use examples",
        templates: [
          {
            id: "ent-rest-ex-18",
            text: "[example] Create a slow cinematic loop of a bowl of ramen being assembled — broth poured first, noodles placed, egg halved and set down, spring onion scattered, a curl of steam rising at the end. Warm, close, unhurried. To loop on the frame near the pass. [Swap the dish to yours.]",
            isExample: true,
          },
          {
            id: "ent-rest-ex-19",
            text: "[example] Create a looping video of an espresso being pulled — the first dark drop, the crema forming, the cup sliding forward. Fifteen seconds. Cinematic, close, no text. To play on the frame at the coffee bar. [Swap the drink to yours.]",
            isExample: true,
          },
          {
            id: "ent-rest-ex-20",
            text: "[example] Create a fine-art painting of a whole roasted chicken on a worn wooden board, surrounded by roasted garlic, thyme, and a pool of resting juices. Style: Dutch Golden Age still life, warm and generous. For the dining room wall of a neighbourhood restaurant. [Swap the dish to yours.]",
            isExample: true,
          },
          {
            id: "ent-rest-ex-21",
            text: "[example] Create a daily specials display for an Italian restaurant. Font: clean serif. Layout: three dishes, each with a short description and price. Style: cream background, dark ink, like a well-designed menu insert. Update each morning. [Adapt the cuisine and dishes to yours.]",
            isExample: true,
          },
          {
            id: "ent-rest-ex-22",
            text: "[example] Create a two-part atmosphere display. Lunchtime: bright, open, a sense of unhurried midday — pale yellow, natural light implied, editorial. Evening: deep amber and burgundy, candlelit, intimate, the city outside going quiet. Painterly, seamless transition at 5pm. For a brasserie that does both. [Describe your own mood arc to adjust.]",
            isExample: true,
          },
          {
            id: "ent-rest-ex-23",
            text: "[example] Create a visual that tells the origin story of Neapolitan pizza — the flour, the water, the wood fire, the particular hands that shaped the tradition. Warm, cinematic, slightly mythic. To play on the dining room frame of a Neapolitan pizzeria. [Swap the cuisine origin to yours.]",
            isExample: true,
          },
          {
            id: "ent-rest-ex-24",
            text: "[example] Create an artwork celebrating the truffle — the most prized ingredient on our menu. Show it in earth, in a hand, shaved over a finished plate. Three panels, gallery-worthy, dark and atmospheric. For the entrance wall of a fine dining restaurant. [Swap the hero ingredient to yours.]",
            isExample: true,
          },
          {
            id: "ent-rest-ex-25",
            text: "[example] Create a farewell memento for a couple celebrating their tenth wedding anniversary at our restaurant tonight. Painted scene: two figures at a candlelit table, wine, a single rose, the warmth of ten years implied in the light. No faces. To send digitally at the end of the evening. [Swap the occasion and details to yours.]",
            isExample: true,
          },
          {
            id: "ent-rest-ex-26",
            text: "[example] Create a display for our wine wall that rotates through three featured bottles each week — one natural, one classic, one discovery. Each gets a visual: the label, the region shown as a loose illustrated map, a single tasting note in quiet type. Warm, editorial, for a wine bar. [Adapt the format and selection to yours.]",
            isExample: true,
          },
          {
            id: "ent-rest-ex-27",
            text: "[example] Create a display for a ramen restaurant's open kitchen — close shots of the broth simmering, noodles being lifted, steam rising from the pass. No people. Just the process, patient and unhurried. Dark, warm, cinematic. To loop on the frame above the counter. [Swap the cuisine to yours.]",
            isExample: true,
          },
          {
            id: "ent-rest-ex-28",
            text: "[example] Create an artwork for the private dining room of a modern Indian restaurant — a rich, painterly triptych based on the spice route: pepper in Kerala, saffron in Kashmir, cardamom in the hills. Warm, detailed, gallery-worthy. Not decorative — genuinely beautiful. [Describe your own cuisine and origin to swap it in.]",
            isExample: true,
          },
        ],
      },
    ],
  },
  {
    category: "Retail",
    sections: [
      {
        title: "Retail — fill-in templates",
        templates: [
          {
            id: "ent-ret-fill-29",
            text: "Create a visual launching our new [season / collection name] collection. Key pieces or themes: [describe briefly]. Brand mood: [describe]. Style: [editorial / cinematic / bold graphic / minimal]. To go live across all store frames on launch day.",
            isExample: false,
          },
          {
            id: "ent-ret-fill-30",
            text: "Create a short loop video showing our hero product [name and category] in motion — worn, carried, used, in its natural context. Style: [editorial / lifestyle / cinematic / bold graphic]. No text. To display in store or at the window.",
            isExample: false,
          },
          {
            id: "ent-ret-fill-31",
            text: "Create a brand story display that communicates who we are without logos, slogans, or product shots. Our story: [describe your origin, mission, and values in a few sentences]. Style: [cinematic / illustrated / abstract / typographic].",
            isExample: false,
          },
          {
            id: "ent-ret-fill-32",
            text: "Create a window display visual for our current season. Season / campaign theme: [describe]. Key message: [one line, or leave to Vizzy]. Style: [bold and graphic / illustrated / painterly / minimal]. Must work at a glance from the street.",
            isExample: false,
          },
          {
            id: "ent-ret-fill-33",
            text: "Create a display for our fitting room area that shows our current hero pieces styled together in [3 / 5] different looks. Pieces: [list them]. Style: [editorial / lifestyle / bold / minimal]. To loop and inspire while customers try things on.",
            isExample: false,
          },
          {
            id: "ent-ret-fill-34",
            text: "Create a loyalty memento for a customer who has just made a significant purchase — [product or occasion]. Style: [editorial / painterly / bold illustrated]. A personalised visual to send digitally after their visit. Tone: [warm / cool / aspirational / celebratory].",
            isExample: false,
          },
          {
            id: "ent-ret-fill-35",
            text: "Create a campaign display for our [promotion / sale / seasonal campaign]. Campaign name: [describe]. Key message: [one line]. Style: [bold and graphic / editorial / warm / energetic]. To run across all store frames simultaneously.",
            isExample: false,
          },
          {
            id: "ent-ret-fill-36",
            text: "Create an abstract brand identity artwork for our [flagship store / main wall / window]. Our brand in three words: [describe]. Colour palette: [describe]. Style: [geometric / expressive / painterly / minimal]. No product imagery — just the spirit of the brand.",
            isExample: false,
          },
          {
            id: "ent-ret-fill-37",
            text: "Create an evening atmosphere display that shifts our store from the energy of daytime trading to a quieter, more curated mood for late opening or events. Day mood: [describe]. Evening mood: [describe]. Style: [editorial / abstract / botanical / cinematic].",
            isExample: false,
          },
          {
            id: "ent-ret-fill-38",
            text: "Create a display that tells the sourcing or making story of our hero product [name]. Where it comes from: [describe]. How it's made: [describe briefly]. Style: [documentary / illustrated / editorial / cinematic]. To display near the product on the floor.",
            isExample: false,
          },
        ],
      },
      {
        title: "Retail — ready-to-use examples",
        templates: [
          {
            id: "ent-ret-ex-39",
            text: "[example] Create a launch display for an autumn/winter collection — a visual that feels like the first genuinely cold morning of the year, the kind that makes you want to be inside with the right coat on. Deep forest green, charcoal, cream. Editorial, cinematic. No product shown. To go live across all frames on launch day. [Adapt the season and palette to yours.]",
            isExample: true,
          },
          {
            id: "ent-ret-ex-40",
            text: "[example] Create a short loop video of a hand-stitched leather bag being made — needle, thread, the pull of the stitch, the finished edge. Fifteen seconds. Close, warm, no text. To display in a leather goods boutique. [Swap the product and craft to yours.]",
            isExample: true,
          },
          {
            id: "ent-ret-ex-41",
            text: "[example] Create a brand story display for an independent bookshop. No text, no product — just the feeling of a particular kind of afternoon: light through old windows, dust motes, the sound of a page turning implied in the stillness. Painterly, warm, unhurried. For the main wall. [Describe your own brand feeling to swap it.]",
            isExample: true,
          },
          {
            id: "ent-ret-ex-42",
            text: "[example] Create a window display visual for a menswear store's summer collection — a visual that feels like a slow afternoon in a Mediterranean port town. White linen, shade, the light off the water. Editorial, clean, aspirational. [Adapt to your brand and season.]",
            isExample: true,
          },
          {
            id: "ent-ret-ex-43",
            text: "[example] Create a loyalty memento for a customer who just bought their first piece from our jewellery collection. A painterly image: the piece resting in morning light, beautifully lit, with a single line below in quiet type — yours now. To send digitally on purchase. [Swap the product and line to yours.]",
            isExample: true,
          },
          {
            id: "ent-ret-ex-44",
            text: "[example] Create an evening atmosphere shift for a concept store — from the bright, open energy of daytime to something more editorial and intimate for the late crowd. Day: clean white light, airy. Evening: deep shadows, one warm light source, the kind of space where you want to stay. Cinematic, seamless. [Describe your day and evening moods.]",
            isExample: true,
          },
          {
            id: "ent-ret-ex-45",
            text: "[example] Create a campaign display for a mid-season sale that doesn't look like a sale — no percentages, no red, no urgency. Instead: a beautiful editorial visual that says everything is a little more accessible right now without saying it. Warm, understated, brand-coherent. [Adapt to your brand aesthetic.]",
            isExample: true,
          },
          {
            id: "ent-ret-ex-46",
            text: "[example] Create a large abstract artwork for the flagship store's main wall — something that says the brand is confident enough not to explain itself. Deep terracotta, brushed gold, black. Painterly, large format, the kind of thing you look at differently every time. For a contemporary womenswear brand. [Describe your brand and palette to personalise.]",
            isExample: true,
          },
        ],
      },
    ],
  },
  {
    category: "Hotels",
    sections: [
      {
        title: "Hotels — fill-in templates",
        templates: [
          {
            id: "ent-hot-fill-47",
            text: "Create an arrival welcome display for our hotel lobby that sets the tone before a single word is spoken. Hotel name: [name]. Location character: [describe — coastal / urban / countryside / mountain]. Style: [cinematic / editorial / illustrated / warm painterly]. Mood: [describe what you want guests to feel on arrival].",
            isExample: false,
          },
          {
            id: "ent-hot-fill-48",
            text: "Create a room artwork that immerses the guest in the character of our destination. Location: [describe]. What makes it distinctive: [views, culture, nature, history, light]. Style: [painterly / photographic / illustrated / abstract]. Portrait format, large.",
            isExample: false,
          },
          {
            id: "ent-hot-fill-49",
            text: "Create a lobby ambiance display that shifts three times a day — morning arrivals, evening social hour, and late night. Describe the mood you want for each: [morning / evening / late night]. Style consistent across all: [cinematic / painterly / abstract / editorial].",
            isExample: false,
          },
          {
            id: "ent-hot-fill-50",
            text: "Create a guest stay memento for a departing guest. Their stay: [describe — occasion, length, anything personal]. Style: [illustrated / elegant typographic / painterly]. To send digitally on checkout. Something beautiful, personal, and unexpected.",
            isExample: false,
          },
          {
            id: "ent-hot-fill-51",
            text: "Create a spa display that communicates the philosophy of our treatments without showing people — through botanicals, texture, water, light, and abstraction. Our spa philosophy: [describe in a sentence]. Style: [abstract / painterly / slow ambient loop / editorial].",
            isExample: false,
          },
          {
            id: "ent-hot-fill-52",
            text: "Create a heritage story display for our hotel lobby that tells guests the story of this building. Key historical details: [describe]. Style: [archival and illustrated / typographic / painterly / documentary]. For the corridor, lift lobby, or entrance.",
            isExample: false,
          },
          {
            id: "ent-hot-fill-53",
            text: "Create a series of three artworks specific to this property — images that couldn't belong to any other hotel in our group. What is unique here: [describe the location, architecture, history, or landscape]. Style: [painterly / illustrated / abstract / photographic].",
            isExample: false,
          },
        ],
      },
      {
        title: "Hotels — ready-to-use examples",
        templates: [
          {
            id: "ent-hot-ex-54",
            text: "[example] Create an arrival display for a coastal hotel in the south of India — the Arabian Sea at golden hour, a fishing boat returning, the light that only exists here for twenty minutes a day. Painterly, cinematic, warm. The first thing guests see. [Swap the location and its character to yours.]",
            isExample: true,
          },
          {
            id: "ent-hot-ex-55",
            text: "[example] Create a three-part daily ambiance display for a city hotel. Morning: pale light, a sense of the city just waking, clean and hopeful. Evening: amber and slate, the city going out, warm and social. Late night: deep blue and one lamp, the hotel holding its guests quietly. Cinematic, seamless transitions. [Describe your own location and mood arc.]",
            isExample: true,
          },
          {
            id: "ent-hot-ex-56",
            text: "[example] Create a room artwork for a heritage hotel in Rajasthan — a painterly rendering of the landscape at dusk as seen from the property: the desert turning gold, a fort on the horizon, the last light before night. Large format portrait, gallery-worthy, deeply specific to this place. [Describe your property and its view to swap it.]",
            isExample: true,
          },
          {
            id: "ent-hot-ex-57",
            text: "[example] Create a stay memento for a couple who just celebrated their anniversary at our hotel. Illustrated: two figures on a hotel terrace at dusk, the sea below, a table between them. No faces. Just the feeling of that particular evening. To send digitally on checkout. A gift they will keep. [Swap the occasion and setting to yours.]",
            isExample: true,
          },
          {
            id: "ent-hot-ex-58",
            text: "[example] Create a spa display for a mountain wellness retreat — the feeling of cold air, pine trees, a wooden interior, the kind of silence that has texture. Abstract and botanical, no people, just atmosphere. To run in the treatment rooms between appointments. [Describe your spa setting to adjust.]",
            isExample: true,
          },
          {
            id: "ent-hot-ex-59",
            text: "[example] Create a heritage display for a hotel housed in a 19th-century colonial building — three illustrated panels covering its life as a trading house, a residence, and now a hotel. Archival in feel, warm in palette, specific in detail. For the main corridor. [Describe your building's history to swap it.]",
            isExample: true,
          },
          {
            id: "ent-hot-ex-60",
            text: "[example] Create a series of three room artworks for a boutique hotel in Kyoto — one for the garden in spring, one for the temple rooflines in autumn rain, one for the city lanterns at night. Painterly, Japanese in influence but contemporary in execution. Specific to Kyoto, no other city. [Describe your location and its three defining images.]",
            isExample: true,
          },
        ],
      },
    ],
  },
  {
    category: "Wellness spaces",
    sections: [
      {
        title: "Wellness spaces — fill-in templates",
        templates: [
          {
            id: "ent-well-fill-61",
            text: "Create an entrance display for our [yoga studio / spa / wellness centre / meditation space] that immediately shifts the nervous system on arrival. The feeling we want guests to have the moment they walk in: [describe]. Style: [abstract / botanical / minimal / slow painterly loop].",
            isExample: false,
          },
          {
            id: "ent-well-fill-62",
            text: "Create a treatment room ambient loop — something that plays silently during sessions and amplifies the mood of the treatment. The treatment: [describe]. The feeling we want the visual to support: [describe]. Style: [abstract / botanical / slow water / light and texture].",
            isExample: false,
          },
          {
            id: "ent-well-fill-63",
            text: "Create a seasonal wellness display for our reception. Season: [describe]. What this season means in our practice: [describe — renewal / grounding / rest / energy]. Style: [botanical / warm painterly / abstract / illustrated]. Mood: [nourishing / energising / grounding / restoring].",
            isExample: false,
          },
          {
            id: "ent-well-fill-64",
            text: "Create a class schedule display for our weekly programme. Classes and times: [list]. Style: [clean and typographic / illustrated / warm / minimal]. Brand colours: [describe].",
            isExample: false,
          },
          {
            id: "ent-well-fill-65",
            text: "Create a display that tells the story of our philosophy or founding belief — not in words, but in image. Our philosophy: [describe in a sentence]. Style: [abstract / botanical / painterly / typographic]. For the entrance wall or the main studio space.",
            isExample: false,
          },
          {
            id: "ent-well-fill-66",
            text: "Create a product story display for our [treatment / product / ritual — name it]. The ingredients: [list key ones]. The process: [describe briefly]. The effect: [describe]. Style: [abstract and sensory / editorial / slow loop / botanical]. For the retail or reception area.",
            isExample: false,
          },
        ],
      },
      {
        title: "Wellness spaces — ready-to-use examples",
        templates: [
          {
            id: "ent-well-ex-67",
            text: "[example] Create an entrance ambient loop for a yoga studio — something that makes you exhale the moment you see it. A slow abstract visual in deep green, soft white, and warm grey — like breathing in a forest. No text, no movement beyond a gentle pulse. To run on the reception frame as guests arrive. [Describe your studio's feeling to adjust.]",
            isExample: true,
          },
          {
            id: "ent-well-ex-68",
            text: "[example] Create a treatment room loop for a massage studio — slow, abstract, water-like movement in pale blue and warm cream. Barely moving. The kind of visual that disappears after thirty seconds and just becomes atmosphere. No music cues, no text. [Describe your treatment and preferred mood.]",
            isExample: true,
          },
          {
            id: "ent-well-ex-69",
            text: "[example] Create a seasonal display for an Ayurvedic wellness centre marking the transition into autumn — the Vata season. Imagery: dry leaves, the colour of turmeric and ashwagandha root, a warm oil implied in the palette. Grounding, warm, deeply calming. Educational in atmosphere, not in text. [Describe your practice and season to adjust.]",
            isExample: true,
          },
          {
            id: "ent-well-ex-70",
            text: "[example] Create a product story display for a wellness brand's hero oil — a blend of rosehip, frankincense, and jojoba. Show the plants, the cold press process, the finished product catching the light. Abstract and botanical, editorial quality. For the retail shelf display. [Swap the product and ingredients to yours.]",
            isExample: true,
          },
          {
            id: "ent-well-ex-71",
            text: "[example] Create a philosophy display for a meditation centre whose founding belief is that stillness is not the absence of noise but a quality of attention. Visual: an abstract painting that feels like that — not empty, but settled. Deep indigo, warm black, one small point of light. No text. For the main studio wall. [Describe your own philosophy to swap it.]",
            isExample: true,
          },
        ],
      },
    ],
  },
  {
    category: "Schools & learning",
    sections: [
      {
        title: "Learning centres & schools — fill-in templates",
        templates: [
          {
            id: "ent-sch-fill-72",
            text: "Create a welcoming entrance display for our [school / academy / learning centre]. Name: [name]. Ethos or values: [describe in a sentence or two]. Style: [bright and encouraging / calm and thoughtful / illustrated / typographic]. Appropriate for [age group].",
            isExample: false,
          },
          {
            id: "ent-sch-fill-73",
            text: "Create an artwork celebrating [a subject or theme — science / literature / mathematics / history / creativity / the natural world]. To display in [a classroom / a hallway / a library]. Style: [illustrated / bold graphic / typographic / abstract]. Age group: [describe].",
            isExample: false,
          },
          {
            id: "ent-sch-fill-74",
            text: "Create a rotating achievement display to celebrate student milestones. The milestones to feature: [describe — exam results, competitions, projects, firsts]. Style: [warm and celebratory / illustrated / typographic / bold]. Names: [shown / kept private].",
            isExample: false,
          },
          {
            id: "ent-sch-fill-75",
            text: "Create a STEM-themed display for our science or technology space. Theme: [space / biology / coding / engineering / mathematics / the environment]. Style: [bold and graphic / illustrated / diagrammatic / cinematic]. For students aged [age group].",
            isExample: false,
          },
          {
            id: "ent-sch-fill-76",
            text: "Create a wellbeing display for our [corridors / common room / pastoral area]. Theme: [self-care / kindness / mental health / belonging / resilience]. Style: [warm and gentle / illustrated / typographic / calm]. Age-appropriate for [age group].",
            isExample: false,
          },
          {
            id: "ent-sch-fill-77",
            text: "Create a display for our library or reading space that makes books feel like the most exciting thing in the room. Featured authors, themes, or genres: [optional]. Style: [illustrated / warm typographic / cosy / bold]. For students aged [age group].",
            isExample: false,
          },
        ],
      },
      {
        title: "Learning centres & schools — ready-to-use examples",
        templates: [
          {
            id: "ent-sch-ex-78",
            text: "[example] Create an entrance display for a primary school built around the idea that every child who walks through this door is already curious — they just need the right questions. Bright, warm, illustrated. A visual that feels like permission to wonder. For students aged 5–11. [Adapt the ethos and age group to yours.]",
            isExample: true,
          },
          {
            id: "ent-sch-ex-79",
            text: "[example] Create a science corridor display for a secondary school — a visual journey through scale, from quantum particles to the observable universe. Each panel shows a different order of magnitude. Bold, graphic, awe-inspiring. For students aged 12–18. [Adapt the subject and age group to yours.]",
            isExample: true,
          },
          {
            id: "ent-sch-ex-80",
            text: "[example] Create a reading corner display for a primary school library featuring a giant illustrated map of an imaginary world — every section of the map corresponds to a different genre of book, so finding your next read feels like choosing where to travel. For students aged 6–12. [Adapt the concept and age group to yours.]",
            isExample: true,
          },
          {
            id: "ent-sch-ex-81",
            text: "[example] Create a wellbeing display for a secondary school common room built around five simple ideas: rest is productive, asking for help is strength, you belong here, today doesn't define you, kindness costs nothing. Each idea gets its own visual panel. Calm, honest, not preachy. For students aged 13–18. [Adapt the messages and age group to yours.]",
            isExample: true,
          },
          {
            id: "ent-sch-ex-82",
            text: "[example] Create an end-of-year celebration display for a graduating class — something that honours where they started and where they're going without being generic. A visual of doors opening, many paths, one horizon. Bold typographic with illustrated elements. To display in the main hall on results day. [Add the year group and any specific details to personalise.]",
            isExample: true,
          },
        ],
      },
    ],
  },
  {
    category: "Offices",
    sections: [
      {
        title: "Offices — fill-in templates",
        templates: [
          {
            id: "ent-off-fill-83",
            text: "Create a morning energy display for our office — something that sets a purposeful, positive tone as people arrive. Mood: [focused / inspiring / warm / creative]. Style: [typographic / abstract / editorial / illustrated]. To rotate daily or weekly.",
            isExample: false,
          },
          {
            id: "ent-off-fill-84",
            text: "Create a company values artwork for our main wall — something that expresses our values through image, not text. Values: [list 3–5]. Visual language: [abstract / geometric / warm and human / architectural / natural]. Style: [painterly / graphic / illustrated].",
            isExample: false,
          },
          {
            id: "ent-off-fill-85",
            text: "Create a display for our client-facing reception that communicates who we are at a glance — through atmosphere, not copy. Our brand in three words: [describe]. Style: [abstract / geometric / painterly / editorial].",
            isExample: false,
          },
          {
            id: "ent-off-fill-86",
            text: "Create a rotating team culture display for our common area. Content to feature: [team wins / company milestones / values in action / team quotes]. Style: [warm and editorial / illustrated / typographic]. Tone: [genuine / celebratory / human].",
            isExample: false,
          },
          {
            id: "ent-off-fill-87",
            text: "Create an evening atmosphere display that transitions our office from daytime energy to a calmer, quieter mood for late workers or evening events. Day mood: [describe]. Evening mood: [describe]. Style: [abstract / editorial / botanical / cinematic].",
            isExample: false,
          },
          {
            id: "ent-off-fill-88",
            text: "Create a display for our [board room / main meeting room] that communicates ambition and focus without cliché. Our company in a sentence: [describe what you do and why it matters]. Style: [bold typographic / abstract / architectural / editorial].",
            isExample: false,
          },
        ],
      },
      {
        title: "Offices — ready-to-use examples",
        templates: [
          {
            id: "ent-off-ex-89",
            text: "[example] Create a morning display for an open-plan tech office — something that makes people feel like today matters without being motivational-poster about it. A slow abstract visual in deep blue and warm white, like the sky just before full light. Calm, purposeful, says nothing but implies everything. [Adapt the palette and mood to your brand.]",
            isExample: true,
          },
          {
            id: "ent-off-ex-90",
            text: "[example] Create a reception artwork for a design studio — something abstract and confident, the kind of thing that makes a client walk in and immediately trust that taste lives here. Large format. Deep terracotta, brushed gold, matte black. No logos, no text. The work speaks. [Describe your brand and palette to personalise.]",
            isExample: true,
          },
          {
            id: "ent-off-ex-91",
            text: "[example] Create a culture display for a startup's common area that rotates through the company's milestones — first customer, first product shipped, first office, first hire. Each milestone gets a small illustrated panel. Warm, human, honest. The kind of wall that makes new joiners feel the weight of what they've joined. [Add your own milestones to personalise.]",
            isExample: true,
          },
          {
            id: "ent-off-ex-92",
            text: "[example] Create a board room display for a social enterprise — a visual that holds their mission in the room during every meeting. The mission: to make clean water accessible to the next billion people. Abstract, vast, urgent but calm. Deep blue, clean white, one warm light. No text. The mission should be felt, not read. [Swap the mission to yours.]",
            isExample: true,
          },
          {
            id: "ent-off-ex-93",
            text: "[example] Create an evening atmosphere transition for a professional services firm — from the sharp, focused energy of the working day to something quieter and more reflective for the hours after 6pm. Day: clean white, structured. Evening: warm amber, deep grey, a city winding down outside. Cinematic, seamless, branded but not corporate. [Describe your firm's day and evening moods.]",
            isExample: true,
          },
        ],
      },
    ],
  },
  {
    category: "Mixed verticals",
    sections: [
      {
        title: "Mixed verticals — high-impact use cases",
        templates: [
          {
            id: "ent-mix-fill-94",
            text: "Create a visual that updates automatically across [number] locations every morning — a consistent branded display that all sites receive simultaneously. Content to rotate: [daily specials / campaign visuals / seasonal updates / motivational content]. Style: [describe your brand aesthetic]. Format: consistent template, location-specific details swappable.",
            isExample: false,
          },
          {
            id: "ent-mix-ex-95",
            text: "[example] Create a campaign visual for a retail chain's summer launch — a single image that goes live in all 40 stores on the same morning. The image: a sun-bleached landscape, a road, a sense of movement and heat. No product. Just the feeling the collection is going for. Cinematic, bold, stops you mid-stride. [Describe your campaign mood and season to adapt.]",
            isExample: true,
          },
          {
            id: "ent-mix-fill-96",
            text: "Create a personalised post-visit memento for a [guest / customer / client] who has just experienced something significant with us. The occasion: [describe]. What happened: [describe briefly]. Style: [painterly / illustrated / typographic]. Something they'll keep, not discard.",
            isExample: false,
          },
          {
            id: "ent-mix-ex-97",
            text: "[example] Create a post-visit memento for a guest who stayed in a boutique hotel in Lisbon during their honeymoon — a painted scene of the Tagus at dusk, two figures on a tiled terrace, the city below. No faces. Just the feeling of that particular trip. To email on checkout. [Swap the city and occasion to yours.]",
            isExample: true,
          },
          {
            id: "ent-mix-fill-98",
            text: "Create an immersive destination story display for our [hotel lobby / spa / restaurant entrance] — not a promotional video, but a slow atmospheric visual essay about the place we're in. Our location: [describe — city, landscape, character, light]. Style: [cinematic / painterly / documentary / illustrated].",
            isExample: false,
          },
          {
            id: "ent-mix-ex-99",
            text: "[example] Create an immersive destination display for the lobby of a hotel in the Scottish Highlands — slow, atmospheric, cinematic. Mist over a loch at dawn. A single deer on a hillside. The quality of northern light. No narration, no text. The kind of visual that makes you feel you've already arrived somewhere rare. [Swap the location to yours.]",
            isExample: true,
          },
          {
            id: "ent-mix-fill-100",
            text: "Create a display that shifts the atmosphere of our [restaurant / store / hotel / studio] based on the time of day — automatically. Three or four distinct moods across a day. Define them: [morning / afternoon / evening / night]. Style: [painterly / cinematic / abstract / editorial].",
            isExample: false,
          },
        ],
      },
    ],
  },
  {
    category: "Food & beverage",
    sections: [
      {
        title: "Food & beverage — deeper templates",
        templates: [
          {
            id: "ent-fb-fill-101",
            text: "Create a visual menu for our coffee programme — each brewing method gets its own illustrated panel showing the process and the cup. Methods: [list — espresso / filter / cold brew / aeropress / etc.]. Style: [illustrated / editorial / graphic / warm typographic]. For display above the bar.",
            isExample: false,
          },
          {
            id: "ent-fb-ex-102",
            text: "[example] Create a coffee programme display for a specialty café — four panels, one per method: espresso, pour-over, cold brew, and AeroPress. Each panel shows the equipment, the process, and the cup. Illustrated, warm, educational but not didactic. For the wall above the bar. [Adapt to your methods and aesthetic.]",
            isExample: true,
          },
          {
            id: "ent-fb-fill-103",
            text: "Create a display that celebrates our pastry or dessert programme — [describe the range briefly]. Style: [illustrated / editorial painterly / warm and inviting / bold graphic]. To display in the café or patisserie. Not a menu — an artwork that makes people want to eat.",
            isExample: false,
          },
          {
            id: "ent-fb-ex-104",
            text: "[example] Create a dessert programme display for a French patisserie — an illustrated still life of the six signature pastries, each one rendered with the detail of a botanical illustration. Warm cream background, fine lines, the kind of image that makes you want to be better. For the main counter wall. [Describe your pastries and aesthetic to adapt.]",
            isExample: true,
          },
          {
            id: "ent-fb-fill-105",
            text: "Create a behind-the-scenes display that shows what happens in our kitchen before service — the prep, the mise en place, the quiet discipline of it. Style: [documentary / cinematic / graphic / illustrated]. No people shown — just the process and the ingredients. For display in the dining room.",
            isExample: false,
          },
        ],
      },
    ],
  },
  {
    category: "Fashion & beauty",
    sections: [
      {
        title: "Fashion & beauty retail — specific templates",
        templates: [
          {
            id: "ent-fash-fill-106",
            text: "Create a display for our beauty counter that tells the story of our hero product [name] through its key ingredients — where they grow, how they're harvested, what they do. Style: [botanical / editorial / abstract / slow loop]. For the in-store frame at point of sale.",
            isExample: false,
          },
          {
            id: "ent-fash-ex-107",
            text: "[example] Create an ingredient story display for a luxury skincare brand's hero serum — built around bakuchiol, a plant-based retinol alternative. Show the babchi plant in a field in India, the seed, the cold-press extraction, the finished formula. Botanical, editorial, premium. For the beauty counter display. [Swap the ingredient and product to yours.]",
            isExample: true,
          },
          {
            id: "ent-fash-fill-108",
            text: "Create a new season launch visual for our fashion brand. Collection name: [name]. The mood of this collection: [describe in a sentence — what feeling, what world does it belong to?]. Style: [editorial / cinematic / abstract / illustrated]. To run across all store frames from launch day.",
            isExample: false,
          },
          {
            id: "ent-fash-ex-109",
            text: "[example] Create a launch visual for a womenswear brand's spring collection — a visual that feels like the first genuinely warm afternoon of the year, a white shirt in a Mediterranean courtyard, the light doing most of the work. Editorial, clean, aspirational. No product — just the feeling. [Describe your collection's mood to adapt.]",
            isExample: true,
          },
          {
            id: "ent-fash-fill-110",
            text: "Create a display for our fitting room that makes the experience feel elevated — not just a room to try things on, but a moment. The mood we want to create: [describe]. Style: [editorial / warm / cinematic / minimal]. Something that makes customers feel like the best version of themselves is just through that door.",
            isExample: false,
          },
        ],
      },
    ],
  },
  {
    category: "Cross-sector",
    sections: [
      {
        title: "Cross-sector — memorable guest moments",
        templates: [
          {
            id: "ent-cross-fill-111",
            text: "Create a personalised artwork to give a [customer / guest / client] who has just [reached a milestone / celebrated a special occasion / made a significant first purchase]. The occasion: [describe]. A small, beautiful, digital gift they didn't expect. Style: [painterly / illustrated / typographic / abstract].",
            isExample: false,
          },
          {
            id: "ent-cross-ex-112",
            text: "[example] Create a personalised artwork for a restaurant guest who proposed over dinner tonight. A painterly scene: a small table, two glasses of champagne, a ring box open between them, candlelight, the city out of focus through the window. No faces. Warm, intimate, cinematic. To send digitally at the end of the evening. The first piece of art from a night they'll never forget. [Swap the occasion to yours.]",
            isExample: true,
          },
          {
            id: "ent-cross-ex-113",
            text: "[example] Create a loyalty milestone artwork for a customer who has just made their fiftieth purchase from our store. Not a voucher, not a discount — a genuine piece of art. An abstract painting in the brand's palette with a single line in quiet type: fifty reasons we're glad you found us. To send digitally. [Adapt the milestone and message to yours.]",
            isExample: true,
          },
          {
            id: "ent-cross-fill-114",
            text: "Create a farewell display to run in the lobby or checkout area — something that thanks guests for visiting and sends them off well. Tone: [warm / understated / celebratory / quiet]. Style: [typographic / illustrated / abstract / painterly]. Brand-appropriate but genuinely felt.",
            isExample: false,
          },
          {
            id: "ent-cross-ex-115",
            text: "[example] Create a checkout display for a boutique hotel that plays for guests as they settle their bill — a slow, beautiful visual of the best moments the property offers: the view from room 12, the garden at 7am, the fireplace in winter. No words. Just a reminder of what they're leaving and why they'll come back. [Describe your property's defining moments to adapt.]",
            isExample: true,
          },
        ],
      },
    ],
  },
  {
    category: "Miscellaneous",
    sections: [
      {
        title: "Miscellaneous enterprise — wildcards",
        templates: [
          {
            id: "ent-misc-fill-116",
            text: "Create a display for our [brand / space / business] that I wouldn't have thought to ask for — based on this about us: [describe your business, your customers, your space, and what you want people to feel when they're with you]. Surprise us.",
            isExample: false,
          },
          {
            id: "ent-misc-ex-117",
            text: "[example] Create something for a 40-seat neighbourhood restaurant that has been in the same family for three generations, serves the same twelve dishes it always has, and whose regulars know the menu by heart. Something that honours what that kind of loyalty means — not nostalgic, not sentimental, just true. A painterly artwork for the wall opposite the door. The first thing you see when you sit down.",
            isExample: true,
          },
          {
            id: "ent-misc-fill-118",
            text: "Create a campaign visual for our brand that works equally well as in-store display, a social post, and a printed piece. The campaign: [describe]. Key visual idea: [describe]. Style: [describe your brand aesthetic]. Adaptable to all three formats.",
            isExample: false,
          },
          {
            id: "ent-misc-ex-119",
            text: "[example] Create a year-end display for a law firm's reception — something that marks the close of the year with genuine warmth, not corporate cheerfulness. Deep navy, warm gold, a quiet typographic composition. A single line: another year of people who trusted us with what mattered most. For display in December. [Adapt the sector and line to yours.]",
            isExample: true,
          },
          {
            id: "ent-misc-fill-120",
            text: "Create a display series for our business that rotates every [week / month / season] — keeping the space feeling alive and current without requiring constant manual updates. Theme for the series: [describe]. Style direction: [consistent across all]. Brand parameters: [describe your palette, tone, and any constraints].",
            isExample: false,
          },
        ],
      },
    ],
  },
]
