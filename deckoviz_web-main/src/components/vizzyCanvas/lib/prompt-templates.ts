// Vizzy creation canvas - official template library (103 prompts, 7 categories).
// Placeholders use [square brackets] and the renderer highlights them so users
// see at a glance what they should fill in.

export type TemplateCategory =
  | "Video art"
  | "Artwork"
  | "Posters"
  | "Stories"
  | "Narrative experiences"
  | "Personal & memory"
  | "Social & seasonal"

export interface PromptTemplate {
  id: string
  category: TemplateCategory
  title: string
  text: string
}

let _id = 0
const t = (
  category: TemplateCategory,
  title: string,
  text: string
): PromptTemplate => ({
  id: `tpl-${++_id}`,
  category,
  title,
  text,
})

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  // ===== Video art (8) =====
  t(
    "Video art",
    "video loop",
    "Create a living art loop for my home in the style of [impressionist / watercolour / cinematic] - inspired by [a memory, place, or feeling you describe]."
  ),
  t(
    "Video art",
    "ambient video",
    "Create a calming ambient video for my living room featuring [a scene from nature, a cityscape at golden hour, or a landscape you love] - slow, looping, no sound."
  ),
  t(
    "Video art",
    "kids video",
    "Create a short, colourful animated story video for my child [name, age] who loves [dinosaurs / space / fairies / animals]. Keep it gentle, playful, and full of wonder."
  ),
  t(
    "Video art",
    "family video",
    "Turn this family photo [upload image] into a softly animated living portrait - subtle motion, painterly style, warm and timeless."
  ),
  t(
    "Video art",
    "celebration video",
    "Create a short celebration video for [name]'s [birthday / graduation / anniversary] with a [joyful / elegant / nostalgic] mood and [a message you write here]."
  ),
  t(
    "Video art",
    "nature loop",
    "Create a looping nature video for my room that feels like [a Japanese forest in rain / the Amalfi coast at dusk / a snowy Nordic morning] - meditative and cinematic."
  ),
  t(
    "Video art",
    "narrative art video",
    "Create a short narrative art video based on the theme of [a theme you choose: grief, hope, wonder, solitude, joy] - visual poetry, no dialogue, 30–60 seconds."
  ),
  t(
    "Video art",
    "seasonal video",
    "Create a [season] mood video for my home - [winter hygge / spring bloom / monsoon evenings / autumn light] - with [warm / cool / golden] tones and a sense of stillness."
  ),

  // ===== Artwork (12) =====
  t(
    "Artwork",
    "figurative art",
    "Create a figurative art piece that expresses my current emotional state. I am feeling [describe your emotions in as much or as little detail as you like]."
  ),
  t(
    "Artwork",
    "abstract art",
    "Create an abstract artwork inspired by a memory that means a lot to me. The memory is [describe it - a place, a person, a moment, a feeling it left behind]."
  ),
  t(
    "Artwork",
    "mood art",
    "Create a hybrid representational and abstract piece that captures my mood today. My mood is [describe it freely - a weather metaphor, a colour, a texture, a few words]."
  ),
  t(
    "Artwork",
    "journal artwork",
    "Create a journal-themed artwork based on what I have been thinking about lately. Here is an entry or a thought: [paste a journal excerpt or write a few sentences]."
  ),
  t(
    "Artwork",
    "collaborative art",
    "Create a collaborative artwork for [me and my partner / me and my friend / our family]. Each of us will describe something: [Person 1: ...] [Person 2: ...] - blend our inputs into one cohesive piece."
  ),
  t(
    "Artwork",
    "historic art",
    "Create a historically inspired artwork in the style of [Renaissance / Mughal miniature / Ukiyo-e / Art Nouveau / Baroque] - themed around [a subject, scene, or story you describe]."
  ),
  t(
    "Artwork",
    "conceptual art",
    "Create a conceptual artwork that gives visual form to this idea or thought: [write your idea, question, or belief here]. Style: [minimal / symbolic / surrealist / figurative - your choice]."
  ),
  t(
    "Artwork",
    "nature art",
    "Create a painterly nature artwork inspired by [a specific landscape, plant, animal, or natural phenomenon you love] - in the style of [impressionism / botanical illustration / Chinese ink painting]."
  ),
  t(
    "Artwork",
    "portrait art",
    "Create an artistic portrait of [a person, real or imagined, or yourself] in the style of [a painter or art movement you love]. Mood: [describe the feeling you want the portrait to carry]."
  ),
  t(
    "Artwork",
    "seasonal art",
    "Create a seasonal artwork that captures [spring / summer / monsoon / autumn / winter] as I experience it - inspired by [a specific place, feeling, or tradition connected to this season for you]."
  ),
  t(
    "Artwork",
    "philosophical art",
    "Create an artwork that visualises the concept of [love / impermanence / belonging / solitude / time] - rendered as [figurative / abstract / surrealist] with a [warm / cool / monochrome] palette."
  ),
  t(
    "Artwork",
    "generative series",
    "Create a series of three related artworks - a visual triptych - around the theme of [a theme you choose]. Each piece should feel distinct but part of the same world."
  ),

  // ===== Posters (12) =====
  t(
    "Posters",
    "movie poster",
    "Create a cinematic movie poster for [a real film or an imaginary one you invent]. Tagline: [write your tagline]. Style: [noir / retro / minimalist / blockbuster / art-house]."
  ),
  t(
    "Posters",
    "poem poster",
    "Create a typographic poem poster using this poem or excerpt: [paste your poem or a line that moves you]. Visual style: [hand-lettered / editorial / painterly / geometric]."
  ),
  t(
    "Posters",
    "to-do list poster",
    "Create a beautifully designed to-do list poster for my [day / week / month]. Here are the items: [list them]. Style: [clean and minimal / playful / structured / hand-drawn]."
  ),
  t(
    "Posters",
    "goals poster",
    "Create a personal goals poster for [this year / this season / this chapter of my life]. My goals are: [list them]. Tone: [motivating / quiet and intentional / bold / reflective]."
  ),
  t(
    "Posters",
    "vision board",
    "Create a visual vision board poster for [a life area: career / relationships / travel / wellbeing / creativity]. Here are the words, images, and feelings I want it to capture: [describe freely]."
  ),
  t(
    "Posters",
    "affirmations board",
    "Create an affirmations board poster with these affirmations: [list yours, or ask Vizzy to generate them for a theme you name]. Visual style: [calm and earthy / bold and colourful / soft and minimal]."
  ),
  t(
    "Posters",
    "sports poster",
    "Create a sports poster celebrating [a sport, a team, an athlete, or a moment]. Mood: [triumphant / gritty / clean and modern / retro]. Include: [a headline or quote you choose]."
  ),
  t(
    "Posters",
    "quote poster",
    "Create a poster featuring this quote that means a lot to me: [write the quote and its author]. Style: [typographic / illustrated / painterly]. Colour palette: [describe or name a mood]."
  ),
  t(
    "Posters",
    "travel poster",
    "Create a vintage-style travel poster for [a destination you love or dream of]. Style: [mid-century / art deco / bold graphic / watercolour]. Tagline: [write one, or let Vizzy suggest]."
  ),
  t(
    "Posters",
    "music poster",
    "Create a music gig or album poster for [an artist, a band, or an imaginary one] in the style of [a decade or visual genre: 70s psychedelic / 90s rave / jazz era / contemporary minimal]."
  ),
  t(
    "Posters",
    "home rules poster",
    "Create a family or home values poster with these words or principles we live by: [list them]. Style: [warm and illustrated / clean and typographic / hand-lettered]. Tone: [joyful / gentle / grounded]."
  ),
  t(
    "Posters",
    "event poster",
    "Create a poster for [a personal event / celebration / gathering / occasion you describe]. Key details: [date, name, theme]. Visual style: [elegant / playful / bold / minimal]."
  ),

  // ===== Stories (10) =====
  t(
    "Stories",
    "children's story - static",
    "Create an illustrated children's story for my [son / daughter / child, name and age optional] who loves [dinosaurs / space / magic / animals / adventure]. Tone: [gentle and warm / exciting / funny]. Length: [short / medium]."
  ),
  t(
    "Stories",
    "thriller story - video",
    "Create a short thriller story visual for my team / group who enjoy [suspense / mystery / sci-fi]. Style: [cinematic stills / comic panels / graphic novel]. Setting: [describe or leave to Vizzy]."
  ),
  t(
    "Stories",
    "real-life story",
    "Create a story based on something that actually happened to me. Here is what happened: [describe the experience, as long or short as you like]. Style: [documentary / poetic / illustrated / cinematic]."
  ),
  t(
    "Stories",
    "journal story",
    "Create a visual story from this journal entry of mine: [paste your journal entry or write one now]. Transform it into [illustrated panels / a short film aesthetic / a poetic visual sequence]."
  ),
  t(
    "Stories",
    "co-written story",
    "Let's write a story together. I want to write a [genre: hard sci-fi / literary fiction / fantasy / thriller / romance]. Here is my opening idea or first paragraph: [write it]. Let's build it chapter by chapter."
  ),
  t(
    "Stories",
    "mythological story",
    "Create a story that retells [a myth, legend, or folk tale from a culture you name] - but set it in [a contemporary city / a future world / an imaginary landscape]. Tone: [lyrical / cinematic / graphic]."
  ),
  t(
    "Stories",
    "family story - static",
    "Create a visual storybook based on a family story or memory. The story is: [describe it]. Characters: [name and describe them]. Style: [warm illustrated / painterly / photorealistic / vintage]."
  ),
  t(
    "Stories",
    "comic strip",
    "Create a comic strip story around this scenario: [describe the situation, characters, and tone - funny / dramatic / surreal / slice-of-life]. Panels: [3 / 6 / 9]. Style: [bold graphic / hand-drawn / noir / colourful]."
  ),
  t(
    "Stories",
    "pet story",
    "Create a short illustrated story starring my pet [name, species, and a brief personality description]. Adventure theme: [describe an imaginary scenario - a great escape, a quest, a mystery]."
  ),
  t(
    "Stories",
    "future story - video",
    "Create a short film-style visual story set in the year [a year you choose]. The world looks like [describe it briefly]. The story follows [a character you describe]. Tone: [hopeful / dystopian / whimsical / philosophical]."
  ),

  // ===== Narrative experiences (8) =====
  t(
    "Narrative experiences",
    "guided meditation",
    "Create a guided meditation experience for me. I want to feel [calm / grounded / energised / hopeful / at peace]. Duration: [5 / 10 / 15 minutes]. Voice style: [warm and slow / neutral / gentle and poetic]."
  ),
  t(
    "Narrative experiences",
    "guided visualisation",
    "Create a guided visualisation journey that takes me to [a place that feels like home to me / a healing landscape / a future version of my life]. Voice: [calm / warm / lyrical]. Duration: [5–10 minutes]."
  ),
  t(
    "Narrative experiences",
    "AI storytelling",
    "Tell me a story in the voice of [a narrator style: a wise elder / a curious child / a poetic dreamer / a calm documentarian]. Story theme: [describe what you'd like to hear about]. Duration: [short / medium / long]."
  ),
  t(
    "Narrative experiences",
    "book reading",
    "Read me [a passage from a book I love / a poem / a short story] in the voice of [calm and measured / dramatic and expressive / warm and intimate / neutral]. Book or text: [name it or paste it]."
  ),
  t(
    "Narrative experiences",
    "interactive story",
    "Let's create a story in real time, together. I'll make choices at each turn. Genre: [fantasy / thriller / romance / mystery / sci-fi]. Opening setting: [describe where we begin]. I'll shape what happens next."
  ),
  t(
    "Narrative experiences",
    "personal song",
    "Create a personal song for me based on [a feeling / a memory / a person / a moment I describe]. Genre: [folk / ambient / cinematic / pop / soulful]. Lyrics should feel [intimate / poetic / direct / celebratory]."
  ),
  t(
    "Narrative experiences",
    "sleep story",
    "Create a soothing sleep story to help me drift off. Setting: [a cosy mountain cabin / a quiet beach / a library on a rainy evening / somewhere you describe]. Pace: slow, gentle, immersive. Voice: soft and unhurried."
  ),
  t(
    "Narrative experiences",
    "soundscape narrative",
    "Create an ambient soundscape with a soft narrative layer for [working / reading / unwinding / creating]. Mood: [focused / contemplative / cosy / inspired]. Describe any sounds or feelings you want included."
  ),

  // ===== Personal & memory (33) =====
  t(
    "Personal & memory",
    "photo to life",
    "Bring this photo to life as a softly animated loop. Upload your image. Style: [painterly / cinematic / subtle motion only]. Preserve the feeling of the original."
  ),
  t(
    "Personal & memory",
    "photo style transfer",
    "Take this photo I took [upload image] and render it in the style of [impressionism / Japanese woodblock / watercolour / oil painting / a photographer you name]. Keep the composition, transform the look."
  ),
  t(
    "Personal & memory",
    "family portrait",
    "Create an artistic family portrait based on [a photo upload / a description of us]. Style: [illustrated / painterly / timeless]. Mood: [warm / joyful / serene / celebratory]."
  ),
  t(
    "Personal & memory",
    "memory artwork",
    "Create an artwork from a memory I'd like to preserve. The memory: [describe it - who was there, where, what it felt like]. Style: [nostalgic and warm / dreamlike / painterly / photorealistic]."
  ),
  t(
    "Personal & memory",
    "gratitude board",
    "Create a beautiful gratitude board for the things I am most grateful for right now. Here they are: [list them freely]. Style: [soft and warm / bold and celebratory / minimal and quiet]."
  ),
  t(
    "Personal & memory",
    "love letter poster",
    "Create a visual love letter poster for [a partner / parent / child / friend]. Here are the things I want to say: [write freely]. Style: [romantic / tender / poetic / illustrated]."
  ),
  t(
    "Personal & memory",
    "milestone poster",
    "Create a milestone celebration poster for [an achievement, anniversary, or life moment you describe]. Name: [if applicable]. Style: [elegant / joyful / bold / minimal]."
  ),
  t(
    "Personal & memory",
    "dream artwork",
    "Create an artwork based on a dream I had. Here is what I remember: [describe the imagery, feelings, and fragments - as vivid or vague as you like]. Style: [surrealist / dreamlike / symbolic / abstract]."
  ),
  t(
    "Personal & memory",
    "self-portrait",
    "Create an artistic self-portrait - not photographic, but expressive. Describe yourself: [appearance, mood, what you're carrying right now, what you want the portrait to say about you]. Style: [your choice]."
  ),
  t(
    "Personal & memory",
    "bucket list poster",
    "Create a visual bucket list poster for my [year / decade / lifetime]. Here are the things I want to do: [list them]. Style: [adventurous and energising / elegant and aspirational / handwritten and warm]."
  ),
  t(
    "Personal & memory",
    "home mood board",
    "Create a home mood board for [a room or the whole home] that reflects how I want it to feel: [describe the atmosphere, colours, textures, and mood]. Style: [Scandi minimal / warm maximalist / Japanese calm / eclectic and personal]."
  ),
  t(
    "Personal & memory",
    "wedding artwork",
    "Create a piece of wedding or anniversary artwork for [names]. Date: [if you like]. Style: [romantic and elegant / illustrated / painterly / typographic]. Include: [a line, vow, or message you choose]."
  ),
  t(
    "Personal & memory",
    "travel memory",
    "Create an artwork or poster based on a trip that meant a lot to me. Destination: [name it]. What made it special: [describe freely]. Style: [travel poster / painterly / photographic / illustrated]."
  ),
  t(
    "Personal & memory",
    "childhood artwork",
    "Create an artwork that captures the feeling of my childhood. The place I grew up: [describe it]. A memory that defines it: [describe]. Style: [nostalgic and warm / storybook / impressionistic]."
  ),
  t(
    "Personal & memory",
    "personal mantra",
    "Create a typographic artwork featuring my personal mantra or a sentence I live by: [write it here]. Style: [bold and graphic / soft and handwritten / minimal / ornate]. Colour mood: [describe]."
  ),
  t(
    "Personal & memory",
    "pet portrait",
    "Create an artistic portrait of my pet [name, species]. Style: [painterly / illustrated / regal oil portrait / playful and graphic / photorealistic]. Mood: [exactly like them / elevated and timeless / playful]."
  ),
  t(
    "Personal & memory",
    "year-in-review",
    "Create a visual year-in-review for [year]. Here are the highlights, themes, and moments that defined it for me: [describe freely]. Format: [poster / illustrated spread / typographic / mood artwork]."
  ),
  t(
    "Personal & memory",
    "heritage artwork",
    "Create an artwork that honours my cultural heritage and background. My background: [describe - country, traditions, imagery, textiles, stories]. Style: [traditional / contemporary reinterpretation / abstract]."
  ),
  t(
    "Personal & memory",
    "reading corner art",
    "Create artwork for my reading nook or study. The feeling I want: [cosy and literary / quiet and minimal / rich and warm / bookshop aesthetic]. Include: [a quote, or leave to Vizzy]."
  ),
  t(
    "Personal & memory",
    "relationship artwork",
    "Create an artwork that represents [a relationship that matters to me - with a partner, friend, parent, or child]. What defines it: [describe freely]. Style: [abstract / figurative / symbolic / illustrative]."
  ),
  t(
    "Personal & memory",
    "grief & remembrance",
    "Create a gentle artwork in memory of [someone or something I have lost]. What I want to remember: [describe]. Style: [tender and quiet / abstract / symbolic / painterly]. Tone: [honouring / bittersweet / hopeful]."
  ),
  t(
    "Personal & memory",
    "pregnancy & new baby",
    "Create an artwork to celebrate [a pregnancy / a new arrival]. Details: [name if known, parents' names, feelings]. Style: [soft and illustrated / warm and painterly / typographic / celestial and dreamy]."
  ),
  t(
    "Personal & memory",
    "recipe artwork",
    "Create a beautifully illustrated recipe card or food artwork for [a dish that means something to you - a family recipe, a favourite, a memory]. Style: [vintage botanical / editorial / warm and rustic]."
  ),
  t(
    "Personal & memory",
    "music playlist art",
    "Create album-cover-style artwork for a playlist I love. Playlist name: [give it one]. Mood of the music: [describe]. Style: [retro / minimalist / painterly / graphic]. Colour palette: [describe]."
  ),
  t(
    "Personal & memory",
    "wellness board",
    "Create a wellness and intentions board for [this season / this year / this chapter]. Here are my intentions and the ways I want to care for myself: [list them]. Style: [calm and grounding / vibrant and energising]."
  ),
  t(
    "Personal & memory",
    "reading list poster",
    "Create a reading list poster featuring [books you have read, are reading, or want to read]. Style: [clean editorial / illustrated bookshelf / cosy and warm / bold typographic]."
  ),
  t(
    "Personal & memory",
    "star map",
    "Create a star map artwork for a night that mattered - [a birth, a wedding, a first meeting, an anniversary]. Date: [dd/mm/yyyy]. Location: [city or place]. Style: [minimal and elegant / celestial and romantic / bold graphic]."
  ),
  t(
    "Personal & memory",
    "friendship artwork",
    "Create an artwork celebrating a friendship. Describe the friendship in a few words or sentences: [who are you, what do you share, what does it mean to you]. Style: [joyful / warm and illustrated / abstract / typographic]."
  ),
  t(
    "Personal & memory",
    "home display - daily quote",
    "Set up a daily rotating quote display for my Deckoviz frame. Theme of quotes: [wisdom / poetry / humour / philosophy / nature / love - choose yours]. Typography style: [minimal / bold / handwritten]."
  ),
  t(
    "Personal & memory",
    "children's room art",
    "Create artwork for my child's room. Child's name and age: [optional]. Their current obsession: [describe]. Style: [playful and illustrated / dreamy / adventure-themed / colourful and bold]."
  ),
  t(
    "Personal & memory",
    "photo slideshow",
    "Create a curated photo slideshow for my Deckoviz frame using [images I upload]. Transition style: [slow fade / soft dissolve / painterly crossfade]. Mood: [warm / cinematic / celebratory / quiet]."
  ),
  t(
    "Personal & memory",
    "language & poetry",
    "Create a visual artwork featuring writing in [a language I love - Hindi, Urdu, Arabic, Japanese, French, etc.]. Text: [a word, phrase, or poem you supply]. Style: [calligraphic / typographic / illustrated]."
  ),
  t(
    "Personal & memory",
    "city portrait",
    "Create a painterly portrait of a city that means something to me: [name it]. The feeling it gives me: [describe]. Neighbourhood or landmark to include: [optional]. Style: [impressionist / graphic / ink and wash / cinematic]."
  ),

  // ===== Social & seasonal (20) =====
  t(
    "Social & seasonal",
    "birthday artwork",
    "Create a birthday artwork or poster for [name]. Age: [optional]. Their personality in three words: [describe]. Style: [joyful and bold / elegant / illustrated / typographic]. Include: [a message you write]."
  ),
  t(
    "Social & seasonal",
    "Diwali display",
    "Create a Diwali celebration display for my home frame. Style: [traditional and rich / contemporary / geometric rangoli / painterly candlelit]. Mood: [festive / warm / glowing / celebratory]."
  ),
  t(
    "Social & seasonal",
    "Christmas display",
    "Create a Christmas display for my Deckoviz frame. Style: [classic and warm / Scandinavian minimal / illustrated / cinematic winter]. Mood: [cosy / joyful / elegant / nostalgic]."
  ),
  t(
    "Social & seasonal",
    "Eid display",
    "Create an Eid celebration display. Style: [geometric and ornate / contemporary / calligraphic / soft and luminous]. Include: [a greeting, a crescent, lanterns, or floral motifs - your choice]."
  ),
  t(
    "Social & seasonal",
    "Holi display",
    "Create a Holi celebration display - an explosion of colour and joy. Style: [vibrant and painterly / abstract colour burst / illustrated / photographic]. Mood: [playful / celebratory / community]."
  ),
  t(
    "Social & seasonal",
    "seasonal display - spring",
    "Create a spring seasonal display for my home frame. Imagery: [cherry blossom / wildflowers / light and green / a specific spring memory]. Style: [watercolour / painterly / photographic / illustrated]."
  ),
  t(
    "Social & seasonal",
    "seasonal display - autumn",
    "Create an autumn seasonal display. Feeling: [cosy / melancholy and beautiful / harvest / woodland]. Colours: [amber / rust / deep green / golden]. Style: [painterly / photographic / illustrated / abstract]."
  ),
  t(
    "Social & seasonal",
    "wedding display",
    "Create a wedding display for [names]. Style: [romantic and floral / minimal and elegant / illustrated / typographic]. Include: [date, a quote or vow, or a welcome message for guests]."
  ),
  t(
    "Social & seasonal",
    "new year display",
    "Create a new year display for my home frame. Year: [the year]. Mood: [hopeful / celebratory / reflective / fresh start]. Style: [typographic / illustrated / abstract / cinematic]."
  ),
  t(
    "Social & seasonal",
    "Mother's Day artwork",
    "Create a Mother's Day artwork for [Mum / a specific name]. Here is what I want to say about her: [write freely - a quality, a memory, a thank you]. Style: [warm and painterly / floral / illustrated / typographic]."
  ),
  t(
    "Social & seasonal",
    "Father's Day artwork",
    "Create a Father's Day artwork for [Dad / a specific name]. Here is something I'd like to capture about him: [write freely]. Style: [classic / bold / illustrated / warm and personal]."
  ),
  t(
    "Social & seasonal",
    "baby shower display",
    "Create a baby shower display. Name if known: [optional]. Theme: [describe the shower theme or vibe]. Style: [soft and illustrated / botanical / playful / elegant and minimal]."
  ),
  t(
    "Social & seasonal",
    "house warming display",
    "Create a housewarming display for a new home. The feeling of the space: [describe]. A message or welcome to include: [write it]. Style: [warm and illustrated / architectural / typographic / botanical]."
  ),
  t(
    "Social & seasonal",
    "dinner party art",
    "Create a rotating art display for a dinner party at my home tonight. Guest mood: [relaxed / sophisticated / fun / eclectic]. Style: [gallery-worthy / conversational / colourful / ambient]."
  ),
  t(
    "Social & seasonal",
    "Lunar New Year display",
    "Create a Lunar New Year display. Year of the [animal - look up which year it is]. Style: [traditional red and gold / contemporary / illustrated / brush painting]. Mood: [festive / prosperous / joyful]."
  ),
  t(
    "Social & seasonal",
    "school year countdown",
    "Create a display counting down or celebrating [start of school / end of school / exam results / graduation]. Child's name: [optional]. Style: [bright and encouraging / illustrated / typographic / celebratory]."
  ),
  t(
    "Social & seasonal",
    "sports match day",
    "Create a match day display for [team name and sport]. Upcoming match against: [opponent]. Style: [bold and graphic / retro badge / editorial / supporter poster]. Colours: [team colours if you know them]."
  ),
  t(
    "Social & seasonal",
    "anniversary display",
    "Create an anniversary display for [names] - [number] years. What the journey has looked like: [a sentence or two, or a few words]. Style: [romantic / typographic / illustrated / cinematic]."
  ),
  t(
    "Social & seasonal",
    "charity & cause display",
    "Create a display supporting a cause I care about: [name the cause]. Message: [write what you want it to say]. Style: [bold and impactful / poetic and quiet / illustrated / typographic]."
  ),
  t(
    "Social & seasonal",
    "neighbourhood welcome display",
    "Create a welcome display for my home - something that reflects who we are for guests or visitors. Our home in three words: [describe]. Style: [warm / witty / illustrated / typographic / botanical]."
  ),
]

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  "Video art",
  "Artwork",
  "Posters",
  "Stories",
  "Narrative experiences",
  "Personal & memory",
  "Social & seasonal",
]
