export interface EnterpriseCategory {
  id: string
  label: string
  icon: string
  si: string // Light mode background class or color reference
  tag: string // Badge background/text color reference
  themeGlow: string // Custom shadow/glow effect
}

export interface EnterpriseTemplate {
  cat: string
  type: string
  text: string
}

export const ENTERPRISE_CATS: EnterpriseCategory[] = [
  { 
    id: "restaurant", 
    label: "Restaurant", 
    icon: "UtensilsCrossed", 
    si: "bg-[#FAECE7]/80 dark:bg-[#FAECE7]/10", 
    tag: "text-[#993C1D] bg-[#FAECE7] dark:text-[#FAECE7] dark:bg-[#993C1D]/30",
    themeGlow: "shadow-[0_0_20px_rgba(249,115,22,0.15)]"
  },
  { 
    id: "retail", 
    label: "Retail", 
    icon: "ShoppingBag", 
    si: "bg-[#EEEDFE]/80 dark:bg-[#EEEDFE]/10", 
    tag: "text-[#3C3489] bg-[#EEEDFE] dark:text-[#EEEDFE] dark:bg-[#3C3489]/30",
    themeGlow: "shadow-[0_0_20px_rgba(124,58,237,0.15)]"
  },
  { 
    id: "artwork", 
    label: "Artwork", 
    icon: "Palette", 
    si: "bg-[#E1F5EE]/80 dark:bg-[#E1F5EE]/10", 
    tag: "text-[#0F6E56] bg-[#E1F5EE] dark:text-[#E1F5EE] dark:bg-[#0F6E56]/30",
    themeGlow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]"
  },
  { 
    id: "poster", 
    label: "Posters & signage", 
    icon: "Layout", 
    si: "bg-[#E6F1FB]/80 dark:bg-[#E6F1FB]/10", 
    tag: "text-[#185FA5] bg-[#E6F1FB] dark:text-[#E6F1FB] dark:bg-[#185FA5]/30",
    themeGlow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]"
  },
  { 
    id: "video", 
    label: "Video", 
    icon: "Video", 
    si: "bg-[#FBEAF0]/80 dark:bg-[#FBEAF0]/10", 
    tag: "text-[#993556] bg-[#FBEAF0] dark:text-[#FBEAF0] dark:bg-[#993556]/30",
    themeGlow: "shadow-[0_0_20px_rgba(236,72,153,0.15)]"
  },
  { 
    id: "product", 
    label: "Product & dish visuals", 
    icon: "Camera", 
    si: "bg-[#FAEEDA]/80 dark:bg-[#FAEEDA]/10", 
    tag: "text-[#854F0B] bg-[#FAEEDA] dark:text-[#FAEEDA] dark:bg-[#854F0B]/30",
    themeGlow: "shadow-[0_0_20px_rgba(234,179,8,0.15)]"
  },
  { 
    id: "hotel", 
    label: "Hotels", 
    icon: "Building2", 
    si: "bg-[#EAF3DE]/80 dark:bg-[#EAF3DE]/10", 
    tag: "text-[#3B6D11] bg-[#EAF3DE] dark:text-[#EAF3DE] dark:bg-[#3B6D11]/30",
    themeGlow: "shadow-[0_0_20px_rgba(132,204,22,0.15)]"
  },
  { 
    id: "school", 
    label: "Schools & learning", 
    icon: "GraduationCap", 
    si: "bg-[#E6F1FB]/80 dark:bg-[#E6F1FB]/10", 
    tag: "text-[#185FA5] bg-[#E6F1FB] dark:text-[#E6F1FB] dark:bg-[#185FA5]/30",
    themeGlow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]"
  },
  { 
    id: "wellness", 
    label: "Wellness spaces", 
    icon: "Heart", 
    si: "bg-[#FBEAF0]/80 dark:bg-[#FBEAF0]/10", 
    tag: "text-[#993556] bg-[#FBEAF0] dark:text-[#FBEAF0] dark:bg-[#993556]/30",
    themeGlow: "shadow-[0_0_20px_rgba(236,72,153,0.15)]"
  },
  { 
    id: "office", 
    label: "Offices", 
    icon: "Briefcase", 
    si: "bg-[#F1EFE8]/80 dark:bg-[#F1EFE8]/10", 
    tag: "text-[#5F5E5A] bg-[#F1EFE8] dark:text-[#F1EFE8] dark:bg-[#5F5E5A]/30",
    themeGlow: "shadow-[0_0_20px_rgba(107,114,128,0.15)]"
  },
]

export const ENTERPRISE_TEMPLATES: EnterpriseTemplate[] = [
  // ── RESTAURANT (16) ──
  { cat: "restaurant", type: "dish assembly video", text: "Create a short loop video showing my dish [dish name] being assembled in a bold, graphic style — ingredients layering in, garnish landing, the final plate revealed. Style: [cinematic / graphic / painterly / slow motion]." },
  { cat: "restaurant", type: "dish portrait loop", text: "Create a slow, beautiful loop video of my dish [dish name] on the pass — steam rising, sauce catching the light, subtle motion. Style: [cinematic / warm and candlelit / cool and minimal]. No text, just the visual." },
  { cat: "restaurant", type: "daily specials board", text: "Create a daily specials display for my restaurant. Today's specials: [list dishes, prices if desired]. Style: [chalkboard / editorial / bold typographic / illustrated]. Tone: [warm and inviting / clean and modern / rustic]." },
  { cat: "restaurant", type: "cuisine origin story", text: "Create an immersive visual that tells the story of our cuisine's origins. Our cuisine: [describe — region, culture, tradition]. Mood: [cinematic and atmospheric / illustrated / documentary still / painterly]. Display: lobby or dining room." },
  { cat: "restaurant", type: "ingredient story", text: "Create a visual that celebrates the hero ingredient in our signature dish [dish name]. Ingredient: [name it]. Show it at source, in preparation, and on the plate. Style: [editorial / cinematic / graphic]." },
  { cat: "restaurant", type: "chef portrait artwork", text: "Create an artistic portrait of our head chef [name, optional] — not photographic but expressive and characterful. Style: [painterly / bold illustrated / graphic / warm and human]. To hang or display in the dining room." },
  { cat: "restaurant", type: "table memento artwork", text: "Create a painterly artwork of a couple or group at a table in our restaurant — warm, candlelit, intimate. Style: [impressionist / illustrated / cinematic still]. To be gifted to guests digitally at the end of their meal." },
  { cat: "restaurant", type: "menu as art display", text: "Create a beautifully designed visual menu display for our frame. Sections: [starters / mains / desserts / drinks — include as relevant]. Style: [editorial / typographic / illustrated / handwritten]. Brand colours: [describe]." },
  { cat: "restaurant", type: "brunch to dinner mood shift", text: "Create two linked visual moods — one for brunch service and one for dinner service — that shift the atmosphere of our dining room across the day. Brunch feel: [bright / relaxed / playful]. Dinner feel: [intimate / warm / sophisticated]." },
  { cat: "restaurant", type: "cocktail craft video", text: "Create a short loop video showing our signature cocktail [name] being crafted — ice, pour, garnish. Style: [cinematic and slow / bold and graphic / cool and editorial]. To display at the bar." },
  { cat: "restaurant", type: "wine or beverage story", text: "Create a visual that tells the story of our wine list or a featured wine [name / region]. Show vineyard, bottle, pour. Style: [editorial / painterly / cinematic]. Mood: [warm and intimate / refined and minimal]." },
  { cat: "restaurant", type: "seasonal menu visual", text: "Create a seasonal visual display for our [spring / summer / autumn / winter] menu. Seasonal ingredients to feature: [list]. Style: [illustrated / painterly / editorial / photographic]. Tone: [warm / fresh / rich / minimal]." },
  { cat: "restaurant", type: "private dining room art", text: "Create an artwork for our private dining room that feels distinctive and special. Theme: [local heritage / abstract / food as art / landscape]. Style: [painterly / graphic / minimalist / bold]. Size: large format portrait." },
  { cat: "restaurant", type: "tasting menu journey", text: "Create a visual journey that takes guests through the courses of our tasting menu [number of courses]. Each course gets a visual moment. Tone: [elegant and cinematic / playful and illustrated / abstract and artistic]." },
  { cat: "restaurant", type: "open kitchen display", text: "Create a looping visual that celebrates the craft happening in our open kitchen — motion, heat, precision. Style: [graphic and bold / cinematic / documentary still]. No people shown, focus on the process and ingredients." },
  { cat: "restaurant", type: "guest farewell memento", text: "Create a personalised visual memento for a guest's special occasion dinner. Occasion: [birthday / anniversary / proposal / celebration]. Names: [optional]. Style: [elegant / illustrated / warm painterly]. To be sent digitally on checkout." },

  // ── RETAIL (14) ──
  { cat: "retail", type: "new collection launch", text: "Create a visual display launching our new [season / collection name] collection. Key pieces: [describe briefly]. Brand mood: [describe]. Style: [editorial / cinematic / bold graphic / minimal]. To go live across all store frames simultaneously." },
  { cat: "retail", type: "product spotlight video", text: "Create a short loop video spotlighting our hero product [product name and category]. Show it in context, in motion, in use. Style: [editorial / cinematic / bold / warm]. No text — let the visual speak." },
  { cat: "retail", type: "brand story display", text: "Create a brand story display that communicates who we are without logos or slogans. Our story in a few sentences: [describe your brand origin, mission, and values]. Style: [cinematic / illustrated / abstract / typographic]." },
  { cat: "retail", type: "campaign visual", text: "Create a campaign visual for our [promotion / sale / seasonal campaign]. Campaign name or theme: [describe]. Key message: [one line]. Style: [bold and graphic / editorial / warm / energetic]. To run across all store frames." },
  { cat: "retail", type: "garment in context video", text: "Create a short video showing our [garment / product type] worn or used in [a setting: urban commute / countryside / evening out / home / travel]. Style: [editorial / cinematic / lifestyle]. No mannequin — context and atmosphere only." },
  { cat: "retail", type: "window display art", text: "Create an artwork designed for our shop window display frame. Season / theme: [describe]. Brand palette: [describe colours]. Style: [bold and graphic / illustrated / painterly / minimal]. Must work at a glance from outside." },
  { cat: "retail", type: "loyalty memento", text: "Create a stylised visual of a customer wearing or using our product [product name] to share as a personal memento after their visit. Style: [editorial / painterly / bold illustrated]. Tone: [warm / cool / aspirational]." },
  { cat: "retail", type: "brand identity art", text: "Create an abstract brand identity artwork that expresses the essence of [brand name] without showing product — through colour, texture, form, and feeling. Our brand in three words: [describe]. Style: [abstract / geometric / painterly]." },
  { cat: "retail", type: "sale event display", text: "Create an in-store sale event display. Event: [describe — mid-season / clearance / launch day]. Key info: [dates, offer]. Style: [bold and high energy / clean typographic / editorial]. Brand colours: [describe]." },
  { cat: "retail", type: "evening atmosphere shift", text: "Create an atmosphere visual that shifts our store from the energy of day trading to a quieter, more curated evening mood — for late opening or events. Day mood: [energetic / bright]. Evening mood: [intimate / editorial / calm]." },
  { cat: "retail", type: "flagship destination art", text: "Create a large-format artwork for our flagship store that makes the space feel like a destination, not just a shop. Theme: [local area / brand heritage / abstract / nature]. Style: [painterly / cinematic / bold graphic / illustrated]." },
  { cat: "retail", type: "product origin story", text: "Create a visual that tells the sourcing story of our product [product name] — where it comes from, how it's made, what goes into it. Style: [documentary / illustrated / editorial]. To display near the product on the floor." },
  { cat: "retail", type: "campaign countdown", text: "Create a visual countdown display for our upcoming [sale / launch / event] on [date]. Brand style: [describe]. Mood: [anticipation / excitement / exclusive / celebratory]. Update the number each day." },
  { cat: "retail", type: "styling suggestion display", text: "Create a display that shows our current hero pieces styled together in [3 / 5] different looks. Pieces: [list them]. Style: [editorial / lifestyle / bold / minimal]. To run as a loop in the fitting room area." },

  // ── ARTWORK (12) ──
  { cat: "artwork", type: "custom location artwork", text: "Create a custom artwork inspired by the location and neighbourhood our business is in. Location: [street, area, city]. What makes it special: [describe — architecture, history, feel]. Style: [painterly / illustrated / graphic / ink]." },
  { cat: "artwork", type: "heritage artwork", text: "Create a legacy and heritage artwork that celebrates [our brand's founding story / our building's history / our city's culture]. Key details: [describe]. Style: [rich and classic / illustrated / typographic / painterly]. For the entrance or main wall." },
  { cat: "artwork", type: "cuisine culture artwork", text: "Create an artwork that celebrates the cultural roots of our cuisine. Culture / region: [describe]. Visual motifs to include: [ingredients, textiles, landscapes, traditions — your choice]. Style: [painterly / illustrative / abstract]." },
  { cat: "artwork", type: "abstract brand artwork", text: "Create an abstract artwork that captures the spirit of our brand without any product imagery. Our brand values: [list 3]. Colour palette: [describe]. Style: [geometric / expressive / painterly / minimal]. For the main dining room or lobby wall." },
  { cat: "artwork", type: "dish as fine art", text: "Create a fine-art-style artwork featuring our signature dish [dish name] — elevated, painterly, gallery-worthy. Not a food photo, but a work of art. Style: [Dutch still life / contemporary painting / watercolour / bold graphic]." },
  { cat: "artwork", type: "local history artwork", text: "Create an artwork that celebrates the history of [our local area / our building / our street]. Historical reference: [describe what happened here or what the area is known for]. Style: [illustrated / archival / painterly / typographic]." },
  { cat: "artwork", type: "founder or legacy portrait", text: "Create an artistic portrait of our founder [name and brief description] or a figure central to our brand story. Style: [painterly / bold illustrated / classic oil portrait treatment / graphic]. For a wall of honour or entrance." },
  { cat: "artwork", type: "seasonal rotating artwork", text: "Create a set of four artworks — one per season — that rotate on our frame through the year, each capturing the feel of that season as it applies to our space and cuisine / products. Our setting: [describe]." },
  { cat: "artwork", type: "triptych wall art", text: "Create a three-panel triptych artwork for our dining room or lobby wall. Theme: [describe — landscape / abstraction / food / culture / nature]. Style: [painterly / graphic / illustrated]. Panels should feel connected but distinct." },
  { cat: "artwork", type: "local artist collaboration", text: "Create an artwork in the style of a local artist whose work we admire. Artist or style reference: [describe or name]. Subject: [related to our space, brand, or location]. For display with attribution." },
  { cat: "artwork", type: "guest memento artwork", text: "Create a personal artwork to gift to VIP guests or customers. Occasion: [anniversary meal / loyalty milestone / special visit]. Style: [painterly / illustrated / elegant typographic]. To be sent digitally after their visit." },
  { cat: "artwork", type: "values artwork", text: "Create an artwork that visualises our company's mission or values without text. Values: [list them]. Visual language: [abstract forms / natural imagery / architectural / human and warm]. For the office or lobby." },

  // ── POSTER & SIGNAGE (12) ──
  { cat: "poster", type: "entrance welcome display", text: "Create an entrance welcome display for our [restaurant / shop / hotel / space]. Brand name: [name]. Tagline or welcome message: [write it or let Vizzy suggest]. Style: [warm and editorial / bold typographic / illustrated / minimal]." },
  { cat: "poster", type: "specials board", text: "Create a specials board display for today. Specials: [list dishes or products]. Prices: [optional]. Style: [chalkboard aesthetic / editorial / clean and typographic / illustrated]. Brand colours: [describe]." },
  { cat: "poster", type: "wayfinding signage", text: "Create a visual wayfinding display for our space. Directions needed: [e.g. reception, lift, restrooms, dining room, exit]. Style: [clean and typographic / branded / illustrated / minimal]. Brand palette: [describe]." },
  { cat: "poster", type: "opening hours display", text: "Create a beautifully designed opening hours display. Hours: [list by day]. Brand style: [describe]. Include: [address / phone / website — optional]. Style: [minimal / illustrated / typographic / bold]." },
  { cat: "poster", type: "event announcement poster", text: "Create an event announcement display for [event name and type]. Date and time: [details]. Location: [room or venue]. Style: [elegant / bold / illustrated / editorial]. Brand colours: [describe]. Mood: [anticipation / excitement / exclusive]." },
  { cat: "poster", type: "promotion display", text: "Create an in-space promotion display. Offer: [describe the promotion clearly]. Valid: [dates or conditions]. Style: [bold and clear / editorial / warm / minimal]. Must be readable at a glance." },
  { cat: "poster", type: "social proof display", text: "Create a rotating display of guest reviews and testimonials. Reviews to include: [paste 3–5 short quotes]. Style: [editorial / typographic / warm / minimal]. Attribute to [first name only / initials / platform name]." },
  { cat: "poster", type: "award or press display", text: "Create a display celebrating our awards, press mentions, or recognition. Details: [list what you've won or been featured in]. Style: [elegant and refined / bold / typographic / minimal]. For entrance or bar area." },
  { cat: "poster", type: "private hire signage", text: "Create a private hire or event-in-progress display. Event type: [describe]. Custom message: [write it or leave blank for a generic but beautiful design]. Style: [elegant / warm / bold / illustrated]." },
  { cat: "poster", type: "queue or wait display", text: "Create an engaging wait-time or queue display that keeps guests entertained. Content to rotate: [brand story / dish facts / ingredient info / behind the scenes / tips]. Style: [editorial / illustrated / cinematic / typographic]." },
  { cat: "poster", type: "health and allergen display", text: "Create a clear and well-designed allergen information display. Allergens to list: [standard 14 or your specific list]. Style: [clean and accessible / brand-aligned / typographic]. Add: [a short warm message about dietary requests]." },
  { cat: "poster", type: "brand manifesto display", text: "Create a manifesto or belief statement display for our brand. Our manifesto or a key paragraph about who we are: [write it or describe the spirit of it]. Style: [bold typographic / editorial / illustrated / minimal]." },

  // ── VIDEO (8) ──
  { cat: "video", type: "dish assembly — graphic", text: "Create a short loop video showing [dish name] being assembled frame by frame in a bold, graphic animation — ingredients appearing in layers, garnish dropping, the final reveal. Style: [graphic / illustrated / photorealistic / painterly]." },
  { cat: "video", type: "dish portrait — cinematic loop", text: "Create a slow, looping cinematic video of [dish name] — steam rising gently, sauce moving, the light catching the plating. Subtle, beautiful, no assembly. Style: [warm candlelit / cool and minimal / editorial / painterly]. To display on the pass or at the table." },
  { cat: "video", type: "coffee or drinks craft loop", text: "Create a looping video of our [coffee / cocktail / drink — name it] being crafted — the pour, the foam, the finish. Style: [slow and cinematic / graphic and bold / warm and close]. No text. Display at bar or counter." },
  { cat: "video", type: "brand atmosphere film", text: "Create a short ambient brand film for our [restaurant / store / lobby]. No narration, no product shots — just the feeling of the space. Mood: [describe — warm, busy, refined, creative]. Style: [cinematic / documentary / editorial]." },
  { cat: "video", type: "product in motion — retail", text: "Create a short video of our [product name and category] in motion — worn, carried, used, in its natural setting. Style: [editorial / lifestyle / cinematic / bold graphic]. No text. To display in store or window." },
  { cat: "video", type: "destination story — hotel lobby", text: "Create a slow, atmospheric destination story for our hotel lobby. Our location: [describe — city, landscape, character]. Mood: [cinematic / immersive / painterly / documentary]. A sense of place without being a travel ad." },
  { cat: "video", type: "ingredient field-to-fork", text: "Create a field-to-fork video journey for our hero ingredient [ingredient name]. Show it at source, in transit, in preparation, and on the plate. Style: [documentary / editorial / cinematic / illustrated]. Loop: [30 / 60 seconds]." },
  { cat: "video", type: "day in the life loop", text: "Create a looping video that captures a day in the life of our [restaurant / store / hotel] — morning prep, the rush, the quiet moments, the close. Style: [documentary / cinematic / graphic time-lapse]. Mood: [warm / aspirational / honest]." },

  // ── PRODUCT & DISH VISUALS (8) ──
  { cat: "product", type: "hero dish visual", text: "Create a gallery-quality still visual of our signature dish [dish name]. Plating style: [describe]. Hero ingredient: [name]. Style: [editorial food photography / painterly / dark and moody / bright and fresh]. For menus, frames, and marketing." },
  { cat: "product", type: "full menu visual set", text: "Create a set of visual treatments for our menu — one for each section: [starters / mains / desserts / drinks]. Consistent style across all. Brand palette: [describe]. Style: [illustrated / editorial / painterly / bold graphic]." },
  { cat: "product", type: "product flatlay visual", text: "Create a styled flatlay visual for our product [product name and category]. Props or context to include: [describe]. Background: [describe or leave to Vizzy]. Style: [editorial / clean and minimal / warm and lifestyle / bold]." },
  { cat: "product", type: "dish ingredient breakdown", text: "Create a visual that breaks down the components of our dish [dish name] — each ingredient named and shown separately, then coming together. Style: [editorial / illustrated / graphic / infographic]. For menus or table cards." },
  { cat: "product", type: "product lifestyle visual", text: "Create a lifestyle visual showing our product [name and category] in its ideal context — who uses it, where, and how it makes them feel. Style: [editorial / warm and human / aspirational / minimal]. No models needed — focus on context and object." },
  { cat: "product", type: "seasonal dish visual", text: "Create a visual for our seasonal dish [dish name] that captures the season in the plating, background, and mood. Season: [spring / summer / autumn / winter]. Style: [editorial / painterly / illustrated / graphic]." },
  { cat: "product", type: "merchandise visual", text: "Create a visual for our branded merchandise [describe items — tote, apron, mug, candle, etc.]. Style: [editorial / lifestyle / bold graphic / minimal]. Context: [café counter / gift shelf / flat laid]. To use in-store and online." },
  { cat: "product", type: "packaging visual", text: "Create a visual showcasing our product packaging [describe the packaging and product]. Style: [editorial / studio / lifestyle / deconstructed]. Mood: [premium / warm / graphic / minimal]. Background: [describe or leave to Vizzy]." },

  // ── HOTELS (10) ──
  { cat: "hotel", type: "arrival welcome display", text: "Create an arrival welcome display for our hotel lobby that sets the tone the moment guests walk in. Hotel name: [name]. Location character: [describe — coastal / urban / countryside / mountain]. Style: [cinematic / editorial / illustrated / warm]." },
  { cat: "hotel", type: "room art — destination", text: "Create a room artwork that immerses the guest in the character of our destination. Location: [describe]. What makes it special: [views, culture, nature, history]. Style: [painterly / photographic / illustrated / abstract]. Portrait format." },
  { cat: "hotel", type: "spa treatment story", text: "Create a calming visual story for our spa that communicates the essence of [a treatment or the spa's philosophy] without showing people. Use: [botanicals / textures / water / light / abstract forms]. Style: [abstract / painterly / slow motion / editorial]." },
  { cat: "hotel", type: "lobby ambiance shift", text: "Create a timed ambiance display for our lobby that shifts three times a day: arrivals [morning], social hour [evening], and late night [quiet and calm]. Style for each: [describe three distinct moods]. Transitions: slow and seamless." },
  { cat: "hotel", type: "guest stay memento", text: "Create a personalised visual memento for a departing guest. Their stay details: [dates, room type, occasion if relevant]. Style: [illustrated / elegant typographic / painterly]. Gifted digitally on checkout — beautiful, personal, unexpected." },
  { cat: "hotel", type: "restaurant within hotel", text: "Create a display for our hotel restaurant [name] that expresses its identity independently from the hotel brand. Cuisine type: [describe]. Mood: [intimate / vibrant / refined / relaxed]. Style: [editorial / illustrated / cinematic]." },
  { cat: "hotel", type: "property-specific art series", text: "Create a series of three artworks specific to this property that couldn't belong to any other hotel in our group. What is unique here: [describe the location, architecture, history, or landscape]. Style: [painterly / illustrated / abstract]." },
  { cat: "hotel", type: "events and weddings display", text: "Create a display for our events and wedding enquiries area that shows the space and atmosphere at its best. Style: [romantic and elegant / editorial / cinematic]. Include: [a soft call to action or contact line — optional]." },
  { cat: "hotel", type: "heritage story display", text: "Create a heritage story display for our hotel that tells the building's history to guests passing through the lobby. Key historical facts: [describe]. Style: [archival and illustrated / typographic / painterly / documentary]." },
  { cat: "hotel", type: "loyalty thank you artwork", text: "Create a personalised artwork for a returning or loyalty guest. Their name: [optional]. Their home city or something personal: [optional]. Style: [warm and illustrated / elegant / painterly]. A gift that makes them feel genuinely known." },

  // ── SCHOOLS & LEARNING (10) ──
  { cat: "school", type: "welcome display", text: "Create a welcoming entrance display for our [school / academy / learning centre]. Name: [name]. Values or ethos: [describe in a sentence]. Style: [bright and encouraging / calm and thoughtful / illustrated / typographic]. Appropriate for [children / teens / adults]." },
  { cat: "school", type: "learning theme artwork", text: "Create an artwork that celebrates [a subject or theme: science / literature / mathematics / the natural world / history / creativity]. Style: [illustrated / bold graphic / typographic / abstract]. To display in [a classroom / hallway / library]." },
  { cat: "school", type: "student achievement display", text: "Create a rotating achievement display to celebrate student milestones. Achievements to feature: [describe — grades, competitions, projects, firsts]. Style: [warm and celebratory / illustrated / typographic / bold]. Keep names [shown / anonymous]." },
  { cat: "school", type: "school calendar display", text: "Create a visual calendar display for the term ahead. Key dates: [list]. Style: [illustrated / clean typographic / colourful / minimal]. For the entrance or main hallway. Age group: [primary / secondary / further education]." },
  { cat: "school", type: "reading corner display", text: "Create an inspiring reading corner display. Featured books or authors: [optional — list or let Vizzy suggest]. Theme: [adventure / science / imagination / history]. Style: [illustrated / warm / typographic / cosy]." },
  { cat: "school", type: "values and ethos display", text: "Create a visual display of our school values. Values: [list them — e.g. curiosity, kindness, resilience, excellence]. Style: [illustrated / typographic / abstract / warm]. To display in the entrance or main hall." },
  { cat: "school", type: "STEM visual display", text: "Create an inspiring STEM-themed visual for our science or technology space. Theme: [space / biology / coding / engineering / maths]. Style: [bold and graphic / illustrated / diagrammatic / cinematic]. Age group: [describe]." },
  { cat: "school", type: "history or geography artwork", text: "Create an artwork or display based on a topic we are currently studying: [describe the topic, period, or region]. Style: [illustrated / map-inspired / painterly / documentary]. For classroom or project display." },
  { cat: "school", type: "wellbeing display", text: "Create a student wellbeing display for our [corridors / common room / pastoral area]. Theme: [self-care / kindness / mental health / belonging]. Style: [warm and gentle / illustrated / typographic / calm]. Age-appropriate for [age group]." },
  { cat: "school", type: "graduation or end of year display", text: "Create a celebration display for our [graduation / end of year / leavers]. Year group: [describe]. Message to include: [write something or leave to Vizzy]. Style: [celebratory / warm / typographic / illustrated]. Names: [shown / not shown]." },

  // ── WELLNESS SPACES (10) ──
  { cat: "wellness", type: "entrance calm display", text: "Create a calming entrance display for our [yoga studio / spa / gym / wellness centre / meditation space]. Brand name: [name]. Feeling on arrival: [grounded / energised / peaceful / healed]. Style: [abstract / botanical / minimal / painterly]." },
  { cat: "wellness", type: "treatment menu display", text: "Create a beautiful treatment or class menu display. Treatments or classes offered: [list]. Style: [calm and editorial / illustrated / typographic / botanical]. Tone: [nurturing / energising / refined / holistic]." },
  { cat: "wellness", type: "meditation visual loop", text: "Create a looping meditation visual for our studio or treatment room. Imagery: [water / breath / light / nature / abstract form]. Style: [slow and painterly / abstract / botanical / minimal]. No text. To run silently during sessions or between classes." },
  { cat: "wellness", type: "seasonal wellness display", text: "Create a seasonal wellness display for our reception or common area. Season: [describe]. Seasonal rituals or themes we want to reflect: [describe]. Style: [botanical / warm / abstract / illustrated]. Mood: [grounding / refreshing / cosy / renewing]." },
  { cat: "wellness", type: "product and ritual story", text: "Create a visual story for our [product / treatment / ritual — name it]. Show the process, the ingredients, the effect — without showing people. Style: [abstract and sensory / editorial / slow loop / botanical]. For display in treatment rooms." },
  { cat: "wellness", type: "class schedule display", text: "Create a weekly class schedule display. Classes and times: [list]. Style: [clean and typographic / illustrated / warm / minimal]. Brand colours: [describe]. To display at reception or in the changing room area." },
  { cat: "wellness", type: "instructor or team artwork", text: "Create artistic portraits of our wellness team [number of people]. Not photographic — expressive and characterful. Style: [illustrated / painterly / minimal / warm graphic]. For the team wall or staff introduction display." },
  { cat: "wellness", type: "ambient nature loop", text: "Create a slow, ambient nature loop for our treatment or relaxation room. Scene: [forest / ocean / mountain morning / garden at dusk — your choice]. Style: [photorealistic / painterly / abstract / impressionistic]. Sound: [describe separately or leave silent]." },
  { cat: "wellness", type: "testimonial and community display", text: "Create a rotating display of community testimonials and member stories. Quotes to include: [paste 3–5]. Style: [warm and editorial / typographic / illustrated / minimal]. Attribute to [first name / initials / anonymous]." },
  { cat: "wellness", type: "brand philosophy display", text: "Create a visual display of our wellness philosophy or brand belief. Our philosophy in a few sentences: [write it]. Style: [abstract / botanical / typographic / calm and minimal]. For the entrance or reception wall." },

  // ── OFFICES (10) ──
  { cat: "office", type: "morning energy display", text: "Create an energising morning display for our office — something that sets a purposeful, positive tone as people arrive. Mood: [focused / inspiring / warm / creative]. Style: [typographic / abstract / editorial / illustrated]. Rotate daily or weekly." },
  { cat: "office", type: "company values artwork", text: "Create an artwork that expresses our company values without text. Values: [list 3–5]. Visual language: [abstract / geometric / human and warm / architectural / natural]. Style: [painterly / graphic / illustrated]. For the main wall or reception." },
  { cat: "office", type: "mission display", text: "Create a visual display of our company mission. Mission statement: [write it]. Style: [bold typographic / editorial / illustrated / abstract]. Mood: [purposeful / optimistic / grounded / ambitious]. For the entrance or main meeting room." },
  { cat: "office", type: "team culture display", text: "Create a rotating display that celebrates our team culture. Content to feature: [team wins / company milestones / values in action / quotes from the team]. Style: [warm and editorial / illustrated / typographic]. Tone: [genuine / celebratory / human]." },
  { cat: "office", type: "office calm — evening shift", text: "Create an evening atmosphere display that transitions the office from daytime energy to a calmer, quieter mood for late workers. Day mood: [bright / focused]. Evening mood: [calm / ambient / soft]. Style: [abstract / editorial / botanical]." },
  { cat: "office", type: "client reception artwork", text: "Create an artwork for our client-facing reception area that communicates who we are at a glance — through atmosphere and aesthetics, not copy. Our brand in three words: [describe]. Style: [abstract / geometric / painterly / editorial]." },
  { cat: "office", type: "milestone celebration display", text: "Create a celebration display for [a company milestone: a funding round / anniversary / product launch / team achievement]. Details: [describe]. Style: [celebratory / editorial / bold / elegant]. For the main common area." },
  { cat: "office", type: "wellbeing corner display", text: "Create a gentle display for our office wellbeing or rest area. Mood: [calm and restorative / nature-inspired / minimal / warm]. Style: [botanical / abstract / slow loop / painterly]. No productivity messaging — just atmosphere." },
  { cat: "office", type: "local area artwork", text: "Create an artwork inspired by the area or city our office is located in. Location: [describe — neighbourhood, landmarks, character]. Style: [painterly / illustrated / graphic / typographic]. For a corridor or breakout space." },
  { cat: "office", type: "new joiner welcome display", text: "Create a personalised welcome display for a new team member joining today. Name: [name]. Role: [optional]. Tone: [warm and human / playful / bold]. A small gesture that makes arrival feel considered and intentional." },
]
