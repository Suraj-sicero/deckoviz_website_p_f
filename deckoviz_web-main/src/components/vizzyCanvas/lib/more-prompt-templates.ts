export interface MorePromptTemplate {
  id: string
  text: string
  isExample: boolean
}

export interface MorePromptSection {
  title: string
  templates: MorePromptTemplate[]
}

export interface MorePromptGroup {
  category: string
  sections: MorePromptSection[]
}

export const MORE_PROMPT_GROUPS: MorePromptGroup[] = [
  {
    category: "Artwork",
    sections: [
      {
        title: "Artwork - fill-in templates",
        templates: [
          {
            id: "more-art-fill-1",
            text: "Create a self-portrait that captures how I have been feeling this [week / month / season]. My emotional state right now: [describe freely]. Style: [abstract / figurative / expressionist / symbolic].",
            isExample: false,
          },
          {
            id: "more-art-fill-2",
            text: "Create an artwork that holds two places I have lived or loved in the same frame. Place one: [name and what it felt like]. Place two: [name and what it felt like]. Style: [abstract / illustrated / painterly / collage-inspired].",
            isExample: false,
          },
          {
            id: "more-art-fill-3",
            text: "Create an artwork based on a myth or folk tale from my culture or one I love. The story: [describe or name it]. Style: [classical / contemporary / illustrated / abstract].",
            isExample: false,
          },
          {
            id: "more-art-fill-4",
            text: "Create an artwork built around a handwritten note that matters to me. The text: [write it here]. Style: [painterly background / abstract / typographic / minimal].",
            isExample: false,
          },
          {
            id: "more-art-fill-5",
            text: "Create a pure colour study based on the emotions I associate with these colours: [describe 2–4 pairings freely]. No representational imagery - just colour and form. Style: [abstract / geometric / painterly].",
            isExample: false,
          },
          {
            id: "more-art-fill-6",
            text: "Create an artwork from a recurring image that lives in my imagination. What I see: [describe - fragments are fine]. Style: [surrealist / abstract / painterly / symbolic].",
            isExample: false,
          },
          {
            id: "more-art-fill-7",
            text: "Create an abstract artwork based on these three words that mean something to me right now: [word one], [word two], [word three]. Style: [abstract / painterly / geometric / expressive].",
            isExample: false,
          },
          {
            id: "more-art-fill-8",
            text: "Create a portrait of someone important to me without showing their face - only the world they inhabit, the objects they love, the light around them. Who they are: [describe]. Style: [painterly / still life / interior / abstract].",
            isExample: false,
          },
        ],
      },
      {
        title: "Artwork - ready-to-use examples",
        templates: [
          {
            id: "more-art-ex-9",
            text: "[example] Create a self-portrait that captures the feeling of being between two chapters of life - something ending, something not yet begun. A figure at the edge of a vast dark-blue sea at dusk. Painterly, impressionist, quiet. [Swap the situation to yours.]",
            isExample: true,
          },
          {
            id: "more-art-ex-10",
            text: "[example] Create an artwork inspired by the Hindu myth of Samudra Manthan - the churning of the cosmic ocean. Focus on the moment the poison emerges before Shiva drinks it. Dark, electric, epic. Contemporary painterly with classical composition. [Swap the myth to one you love.]",
            isExample: true,
          },
          {
            id: "more-art-ex-11",
            text: "[example] Create a pure abstract colour study: deep indigo for longing, burnt orange for warmth, pale silver for clarity. No shapes, no figures - let the colours bleed and hold each other. Large format, painterly, textured.",
            isExample: true,
          },
          {
            id: "more-art-ex-12",
            text: "[example] Create an artwork from this recurring image: an empty train platform at night, one yellow lamp, a departure board that never changes. Surrealist realism, slightly unsettling, beautiful. Muted palette with one bright detail. [Swap the image to yours.]",
            isExample: true,
          },
          {
            id: "more-art-ex-13",
            text: "[example] Create an abstract artwork that holds these three words at once: untethered, tender, vast. No literal imagery - just the feeling of all three coexisting. Abstract, painterly. Palette: deep green, cream, shadow grey. [Swap the words to yours.]",
            isExample: true,
          },
          {
            id: "more-art-ex-14",
            text: "[example] Create a portrait of my grandmother without showing her. Show instead: a worn wooden kitchen table, a brass tea strainer, afternoon light through net curtains, a half-read letter. Painterly still life, warm and quiet. [Describe your own person and their world.]",
            isExample: true,
          },
          {
            id: "more-art-ex-15",
            text: "[example] Create an artwork that holds Bombay and London in the same frame - the chaos and colour of one, the grey and quiet of the other - not as contrast but as coexistence. Abstract, layered, painterly. [Swap the cities to yours.]",
            isExample: true,
          },
          {
            id: "more-art-ex-16",
            text: "[example] Create an artwork built around the phrase \"we were here\" in loose handwriting, set against an abstract landscape of deep ochre and forest green. Painterly, warm, like a letter to the future. [Swap the phrase to yours.]",
            isExample: true,
          },
        ],
      },
    ],
  },
  {
    category: "Posters",
    sections: [
      {
        title: "Posters - fill-in templates",
        templates: [
          {
            id: "more-post-fill-17",
            text: "Create a book cover poster for a novel I wish existed. Title: [invent one]. Genre feel: [literary fiction / thriller / poetry / sci-fi]. Mood: [describe the book in a sentence].",
            isExample: false,
          },
          {
            id: "more-post-fill-18",
            text: "Create a poster that captures the defining feeling of a decade of my life. The decade: [e.g. my twenties / the 2010s]. What defined it: [describe - a mood, a place, a few images]. Style: [typographic / illustrated / collage / painterly].",
            isExample: false,
          },
          {
            id: "more-post-fill-19",
            text: "Create a night sky poster for a specific night that mattered to me. The night: [describe]. Style: [star map / illustrated / painterly / abstract]. Include: [a date, a place, a line of text - optional].",
            isExample: false,
          },
          {
            id: "more-post-fill-20",
            text: "Create a poster built around a philosophical idea I keep returning to. The idea: [write it as a question or a statement]. Style: [typographic / illustrated / abstract / minimal].",
            isExample: false,
          },
          {
            id: "more-post-fill-21",
            text: "Create an album cover poster for an imaginary record. Artist name: [invent one]. Album title: [invent one]. Genre feel: [describe the music in a sentence]. Style: [70s painterly / minimal / psychedelic / contemporary graphic].",
            isExample: false,
          },
          {
            id: "more-post-fill-22",
            text: "Create a poster designed around a letter to my future self. Key line: [write it]. Style: [typographic and elegant / handwritten feel / illustrated / painterly].",
            isExample: false,
          },
        ],
      },
      {
        title: "Posters - ready-to-use examples",
        templates: [
          {
            id: "more-post-ex-23",
            text: "[example] Create a noir movie poster for an imaginary film called The Last Signal. Tagline: Some frequencies were never meant to be heard. 1940s noir, deep shadow, one figure at a radio tower, rain. Heavy serif typography, white on black. [Swap the title and tagline to yours.]",
            isExample: true,
          },
          {
            id: "more-post-ex-24",
            text: "[example] Create a book cover poster for a novel called The Cartography of Small Losses. Literary fiction. A woman walking away along a coast path, fog ahead, wildflowers at the edge. Palette: sage, fog grey, pale gold. [Swap the title and description to yours.]",
            isExample: true,
          },
          {
            id: "more-post-ex-25",
            text: "[example] Create a typographic poster around the question: \"What would you do if you were not afraid?\" Minimal. White background, single weight serif font, centred, generous white space. Small italic attribution: after Frankl. [Swap the question to yours.]",
            isExample: true,
          },
          {
            id: "more-post-ex-26",
            text: "[example] Create an album cover for an imaginary record called Slow Burn, Soft Light by Nadia Moreau. Ambient folk, recorded in a stone cottage in winter. A single candle on a window ledge, rain outside, warm glow. Square format, painterly. [Swap the artist and album details to yours.]",
            isExample: true,
          },
          {
            id: "more-post-ex-27",
            text: "[example] Create a vintage travel poster for Varanasi - the ghats at dawn, diyas on the water, temple spires in morning mist. Mid-century illustrated, warm ochre and rose palette. Tagline: Where the river remembers everything. [Swap the city to yours.]",
            isExample: true,
          },
          {
            id: "more-post-ex-28",
            text: "[example] Create a poster built around this line: \"You were braver than you knew, and it was enough.\" Soft linen texture background, hand-lettered feel, warm ink-brown. Framed with a thin line. A4 portrait. [Swap the line to yours.]",
            isExample: true,
          },
          {
            id: "more-post-ex-29",
            text: "[example] Create a poster that captures the feeling of being twenty-five - restless, hopeful, perpetually arriving. Abstract background in deep blue and amber. A single serif line: The decade you learned to want things. Painterly, slightly worn edges. [Swap the decade description to yours.]",
            isExample: true,
          },
          {
            id: "more-post-ex-30",
            text: "[example] Create a star map poster for the night of 14 August 1947 over Delhi - the first night of independence. Deep indigo sky, a single line below: The stars that watched a country born. Elegant, minimal, black and gold. [Swap the date and city to yours.]",
            isExample: true,
          },
        ],
      },
    ],
  },
  {
    category: "Stories",
    sections: [
      {
        title: "Stories - fill-in templates",
        templates: [
          {
            id: "more-story-fill-31",
            text: "Write and illustrate the origin story of [a person, a place, a family, or an invented character]. The story begins: [write your opening sentence]. Tone: [mythic / intimate / funny / lyrical]. Format: [illustrated panels / storybook / single image with text].",
            isExample: false,
          },
          {
            id: "more-story-fill-32",
            text: "Create a short illustrated story set in an alternative version of history where [describe the change - one event went differently]. The world it creates: [describe briefly]. Tone: [serious and literary / playful / cinematic / speculative].",
            isExample: false,
          },
          {
            id: "more-story-fill-33",
            text: "Create a short story told entirely through objects - no characters shown, no dialogue. The objects: [list 4–6 things]. The story they tell: [describe loosely, or leave to Vizzy]. Style: [painterly still life sequence / illustrated / cinematic].",
            isExample: false,
          },
          {
            id: "more-story-fill-34",
            text: "Create a short story told through letters between two people who have never met. Characters: [describe them briefly]. What connects them: [describe the circumstance]. Tone: [romantic / bittersweet / funny / tense].",
            isExample: false,
          },
          {
            id: "more-story-fill-35",
            text: "Create a story about the day everything changed for [a character or a fictionalised version of yourself]. What changed: [describe]. Style: [cinematic stills / illustrated / painterly]. Tone: [honest / lyrical / dramatic / quiet].",
            isExample: false,
          },
          {
            id: "more-story-fill-36",
            text: "Create an illustrated children's story featuring a creature I'm inventing. The creature is called [name it] and looks like [describe]. It lives in [describe its world]. Its problem: [describe]. Style: [bright and playful / strange and wondrous / classic storybook]. For a child aged [age].",
            isExample: false,
          },
        ],
      },
      {
        title: "Stories - ready-to-use examples",
        templates: [
          {
            id: "more-story-ex-37",
            text: "[example] Create a short story told through five objects: a cracked compass, a folded train ticket from 1987, a matchbox with one match left, a photograph with a name on the back, and a key with no lock. They tell the story of a departure that was never explained. Cinematic painterly stills, warm and melancholy. [Swap the objects to ones that mean something to you.]",
            isExample: true,
          },
          {
            id: "more-story-ex-38",
            text: "[example] Write and illustrate the origin story of a girl born during a thunderstorm who grew up believing she could hear what trees were thinking. Mythic tone, lush and green, illustrated storybook. Opening line: The night Mira was born, the oldest oak in the valley split clean in two - and grew back by morning. [Swap the character to someone you know or invent.]",
            isExample: true,
          },
          {
            id: "more-story-ex-39",
            text: "[example] Create a short illustrated story set in a world where the Library of Alexandria was never burned - and by 2024 it is the largest living archive on earth, still being written. Quietly epic, speculative, literary. Painterly stills, warm candlelit light, vast interiors.",
            isExample: true,
          },
          {
            id: "more-story-ex-40",
            text: "[example] Create a story told through letters between a lighthouse keeper on a remote Scottish island and a jazz musician in 1960s Bombay who found the keeper's address in a bottle. Six letters, two worlds, one unlikely friendship. Illustrated with handwritten letter aesthetics, warm and intimate. [Swap the characters and setting to yours.]",
            isExample: true,
          },
          {
            id: "more-story-ex-41",
            text: "[example] Create an illustrated children's story about a small creature called a Fumblesnap - looks like a cross between a hedgehog and a lantern, glows when nervous, lives under library floorboards. It accidentally swallowed the word \"enormous\" and now everything it touches turns into that thing. For children aged 5–8. Bright, playful, funny. [Swap the creature name and word to yours.]",
            isExample: true,
          },
          {
            id: "more-story-ex-42",
            text: "[example] Create a short cinematic story about a woman who realised she had been living someone else's life - not dramatically, just quietly, like a coat she had worn so long she forgot it wasn't hers. Quiet and literary. Painterly stills, muted palette, interior spaces, no dialogue. [Make the character yours if you like.]",
            isExample: true,
          },
          {
            id: "more-story-ex-43",
            text: "[example] Create a three-panel illustrated story set in 1969 where the moon landing never happened and the space programme became an arts and philosophy mission. The first human in space was a poet. Retro-futurist illustrated, warm and idealistic.",
            isExample: true,
          },
          {
            id: "more-story-ex-44",
            text: "[example] Create the origin story of a city that grew up around a tree that refused to be cut down for four hundred years. Three illustrated panels: the tree, the first house built around it, the city today still built around its roots. Warm, painterly, a little magical. [Swap the central image to one that means something to you.]",
            isExample: true,
          },
        ],
      },
    ],
  },
  {
    category: "Narrative experiences",
    sections: [
      {
        title: "Narrative experiences - fill-in templates",
        templates: [
          {
            id: "more-narr-fill-45",
            text: "Create a guided visualisation of a walk through [a landscape you love or invent - a forest, a beach, a mountain path, a childhood street]. Duration: [5 / 10 / 15 minutes]. Voice: [calm and slow / warm and descriptive / poetic]. Season and time of day: [describe].",
            isExample: false,
          },
          {
            id: "more-narr-fill-46",
            text: "Read this letter to me in a warm, unhurried voice. The letter is from [a future version of yourself / a person who is no longer here / someone you admire]. Here is the letter: [write it or describe what it should say]. Voice style: [gentle / intimate / measured].",
            isExample: false,
          },
          {
            id: "more-narr-fill-47",
            text: "Create a bedtime story ritual for my household. Who it's for: [a child / myself / the whole family]. Recurring character: [describe, or leave to Vizzy]. Tone: [calm and sleepy / gently magical / funny and warm].",
            isExample: false,
          },
          {
            id: "more-narr-fill-48",
            text: "Create a poetry reading session for my living room frame. Theme: [nature / love / loss / wonder / a specific poet I love]. Duration: [10 / 20 / 30 minutes]. Voice: [measured and quiet / warm and expressive / neutral and clear].",
            isExample: false,
          },
          {
            id: "more-narr-fill-49",
            text: "Create a short morning intention-setting narration. Duration: [2–5 minutes]. My intentions today: [write them or describe the feeling you want to start with]. Voice: [calm and grounded / warm and gentle / clear and energising].",
            isExample: false,
          },
        ],
      },
      {
        title: "Narrative experiences - ready-to-use examples",
        templates: [
          {
            id: "more-narr-ex-50",
            text: "[example] Create a 10-minute guided visualisation of walking through an ancient redwood forest at early morning - mist in the canopy, soft earth underfoot, birdsong arriving slowly. Calm, unhurried, no music. Voice: warm and descriptive, present enough to guide and then step back. [Swap the landscape to one you love.]",
            isExample: true,
          },
          {
            id: "more-narr-ex-51",
            text: "[example] Create a 3-minute morning narration that begins: \"You are here. The day has not yet asked anything of you.\" Spoken in a grounded, unhurried voice. Ends with a pause and a single question to hold for the day. [Add your own intentions to personalise it.]",
            isExample: true,
          },
          {
            id: "more-narr-ex-52",
            text: "[example] Create a recurring bedtime story ritual built around a character called the Night Librarian - an old woman who travels between sleeping children's dreams and leaves one small story in each. Each night, a new story. Sleepy, gently magical, safe. For children aged 4–9. [Add a child's name to personalise it.]",
            isExample: true,
          },
          {
            id: "more-narr-ex-53",
            text: "[example] Create a 20-minute evening poetry reading session drawing from Rumi, Mary Oliver, and Wisława Szymborska. Theme: the ordinary and the infinite. Voice: warm, unhurried, as if reading by lamplight. Display the text on screen as each poem is read. Begin with Oliver's Wild Geese. [Swap the poets to your own favourites.]",
            isExample: true,
          },
          {
            id: "more-narr-ex-54",
            text: "[example] Read this letter aloud in a gentle, warm voice - a letter from my eighty-year-old self to me now. The letter says: \"You worried about the wrong things. The right things - the table, the people around it, the light through that particular window - those were always enough.\" Voice: slow, kind, a little amused. [Write your own version of the letter to swap it.]",
            isExample: true,
          },
        ],
      },
    ],
  },
  {
    category: "Music & sound",
    sections: [
      {
        title: "Music & sound - fill-in templates",
        templates: [
          {
            id: "more-music-fill-55",
            text: "Create a personal anthem for me - a song that sounds like who I am or who I'm becoming. I'd describe myself as: [write freely]. Genre: [folk / ambient / soul / cinematic / indie]. Lyric tone: [direct / poetic / understated / celebratory].",
            isExample: false,
          },
          {
            id: "more-music-fill-56",
            text: "Create a short original piece of music that sounds like [a place that lives in me - a city, a landscape, a room, a time of day]. What it feels like: [describe freely]. Genre: [ambient / classical / folk / electronic / cinematic]. Duration: [1 / 2 / 3 minutes].",
            isExample: false,
          },
          {
            id: "more-music-fill-57",
            text: "Create a song about [a relationship that has shaped me - with a person, a place, a version of myself]. What I want the song to hold: [describe]. Genre: [folk / soul / ambient / cinematic]. Lyric style: [personal and direct / abstract and poetic].",
            isExample: false,
          },
          {
            id: "more-music-fill-58",
            text: "Create a visual artwork and title card for a playlist that lives on my wall. Playlist name: [name it]. Mood of the music: [describe]. Visual style: [painterly / typographic / illustrated / minimal]. Colour palette: [describe].",
            isExample: false,
          },
          {
            id: "more-music-fill-59",
            text: "Create a lullaby for [a child / a younger version of yourself / someone you want to comfort]. What you want it to say: [write a few lines or the feeling you want it to carry]. Style: [gentle and simple / slightly melancholic / magical and dreamy].",
            isExample: false,
          },
        ],
      },
      {
        title: "Music & sound - ready-to-use examples",
        templates: [
          {
            id: "more-music-ex-60",
            text: "[example] Create a 2-minute ambient piece that sounds like Bombay at 5am - the city just beginning to stir, a call to prayer in the distance, the first autorickshaw, chai being made somewhere close. Warm, slightly humid, layered. Cinematic ambient. To loop softly in a kitchen in the morning. [Swap the city to yours.]",
            isExample: true,
          },
          {
            id: "more-music-ex-61",
            text: "[example] Create a gentle lullaby called The Slow Hours - for a child who thinks too much at bedtime. Simple melody, soft voice, lyrics about the stars agreeing to stay put, the moon keeping watch, and tomorrow promising to wait. Unhurried, warm, a little magical. [Add the child's name to personalise it.]",
            isExample: true,
          },
          {
            id: "more-music-ex-62",
            text: "[example] Create a personal anthem for someone who rebuilt themselves quietly, without anyone watching - not triumphant, not dramatic, just steady and warm. Folk-soul. Lyric tone: understated and true. A song about continuing. [Describe yourself and I'll rewrite the brief around you.]",
            isExample: true,
          },
          {
            id: "more-music-ex-63",
            text: "[example] Create a song about a friendship that has lasted twenty years and changed form four times. Genre: acoustic folk, gentle. Central lyric: \"We stopped explaining ourselves somewhere around thirty, and it got easier after that.\" [Rewrite the lyric line with your own memory.]",
            isExample: true,
          },
          {
            id: "more-music-ex-64",
            text: "[example] Create a wall art piece for a playlist called Late Light - music for the last hour before everyone goes to bed, the washing up done, a candle still going. Visual: a warm still life in amber tones, typographic title in a quiet serif. Painterly. [Rename the playlist to yours.]",
            isExample: true,
          },
        ],
      },
    ],
  },
  {
    category: "Video & motion",
    sections: [
      {
        title: "Video & motion - fill-in templates",
        templates: [
          {
            id: "more-video-fill-65",
            text: "Create a looping video portrait of my [living room / study / kitchen / bedroom] as I'd love it to feel - not as it is, but as it could be. The feeling I want: [describe]. Style: [cinematic / painterly / warm ambient].",
            isExample: false,
          },
          {
            id: "more-video-fill-66",
            text: "Create a looping video that captures [morning / afternoon / evening / late night] in my home - the light, the rhythm, the feeling of that particular time. Mood: [describe]. Style: [slow cinematic / painterly / ambient].",
            isExample: false,
          },
          {
            id: "more-video-fill-67",
            text: "Create a looping video that brings [a specific weather - heavy rain against glass / soft snow / morning fog / golden afternoon sun / a thunderstorm at a distance] into my home. Style: [photorealistic / painterly / cinematic / abstract].",
            isExample: false,
          },
          {
            id: "more-video-fill-68",
            text: "Create a looping video of the view I wish I had from my window. The view: [describe - a mountain, a harbour, a forest, a city rooftop]. Style: [photorealistic / painterly / cinematic]. Season: [describe]. Time of day: [describe].",
            isExample: false,
          },
          {
            id: "more-video-fill-69",
            text: "Take this photograph [upload image] and bring it gently to life - subtle motion only. Leaves moving, curtains breathing, light shifting slowly. Style: [painterly / photorealistic / impressionistic]. Preserve everything that matters in the original.",
            isExample: false,
          },
        ],
      },
      {
        title: "Video & motion - ready-to-use examples",
        templates: [
          {
            id: "more-video-ex-70",
            text: "[example] Create a looping video of heavy monsoon rain on a large window at night - city lights blurring through the glass, a single lamp reflected, the downpour outside. Photorealistic, warm inside and cool outside. For a bedroom or living room on a rainy evening. [Swap the weather to your favourite.]",
            isExample: true,
          },
          {
            id: "more-video-ex-71",
            text: "[example] Create a looping video of the view from a high apartment over a Japanese city at 3am - a grid of lit windows, a slow river below, occasional headlights. Cinematic, still, slightly melancholy, beautiful. To play in a home office late at night. [Describe your ideal window view to swap it.]",
            isExample: true,
          },
          {
            id: "more-video-ex-72",
            text: "[example] Create a looping video of an ideal study at dusk - floor-to-ceiling books, a wooden desk with a reading lamp, dust moving slowly in the last light, a city softening outside. Warm, cinematic, unhurried. [Describe your own ideal room to personalise it.]",
            isExample: true,
          },
          {
            id: "more-video-ex-73",
            text: "[example] Create a slow looping video that captures 6am on a Sunday - pale light through curtains, coffee steam rising, no voices yet, the particular quality of an unhurried morning. Cinematic, painterly, quiet. [Swap the time to yours.]",
            isExample: true,
          },
          {
            id: "more-video-ex-74",
            text: "[example] Take a photograph of my grandparents at their kitchen table [upload image] and bring it gently to life - steam rising from the cups, the curtain moving, light shifting a little, nothing more. Painterly, tender, preserve every detail of the original. [Upload any photograph to use this.]",
            isExample: true,
          },
        ],
      },
    ],
  },
  {
    category: "Memory & personal",
    sections: [
      {
        title: "Memory & personal - fill-in templates",
        templates: [
          {
            id: "more-mem-fill-75",
            text: "Create a visual portrait of who I was in [a specific decade or period of my life]. What I remember about that version of me: [describe freely - what you wanted, where you lived, what you were afraid of]. Style: [painterly / illustrated / photographic / abstract].",
            isExample: false,
          },
          {
            id: "more-mem-fill-76",
            text: "Create an artwork of a place I can no longer return to. The place: [describe - a childhood home, a city I left, a space that no longer exists]. What it felt like to be there: [describe]. Style: [painterly / dreamlike / impressionistic / abstract]. Not sad - just held.",
            isExample: false,
          },
          {
            id: "more-mem-fill-77",
            text: "Create an artwork based on a family photograph I'd like to transform into something lasting. The image: [describe or upload]. What I want to preserve: [the mood / the faces / the era / the feeling]. Style: [painterly / illustrated / archival / contemporary].",
            isExample: false,
          },
          {
            id: "more-mem-fill-78",
            text: "Create an artwork or short visual based on one of the best days I can remember. The day: [describe - where you were, who was there, what made it feel that way]. Style: [painterly / impressionistic / warm and cinematic].",
            isExample: false,
          },
          {
            id: "more-mem-fill-79",
            text: "Create an artwork that captures something I want to pass on - a value, a story, a way of seeing. What I want to pass on: [describe in your own words]. Who it's for: [children / grandchildren / no one specific - just the future]. Style: [painterly / illustrated / typographic / abstract].",
            isExample: false,
          },
        ],
      },
      {
        title: "Memory & personal - ready-to-use examples",
        templates: [
          {
            id: "more-mem-ex-80",
            text: "[example] Create an artwork of a grandmother's kitchen that no longer exists - brass utensils on a rack, a window onto a small courtyard, afternoon light, the warmth of cardamom and ghee implied in the palette. Painterly, impressionistic, warm. Held, not mourned. [Describe your own place to swap it in.]",
            isExample: true,
          },
          {
            id: "more-mem-ex-81",
            text: "[example] Create a painterly artwork of a specific memory: a long table outside in summer, ten people, mismatched glasses, a meal that went on for five hours, no one anywhere else they needed to be. Warm light, the feeling of time suspended. Impressionist, generous, alive. [Describe your own best day to use instead.]",
            isExample: true,
          },
          {
            id: "more-mem-ex-82",
            text: "[example] Create an artwork based on a black-and-white photograph of my grandparents on their wedding day - transform it into a warm painterly oil portrait, adding colour guided by what the era suggests. Keep their faces exact, make everything else feel timeless. [Upload your own photograph to use this.]",
            isExample: true,
          },
          {
            id: "more-mem-ex-83",
            text: "[example] Create a painterly portrait of who I was at twenty-two - someone who owned almost nothing, rented a room with one window, read everything, and believed the world was about to open. Warm, slightly wistful, honest. Not romanticised - just true. [Write your own decade and I'll rewrite it around it.]",
            isExample: true,
          },
          {
            id: "more-mem-ex-84",
            text: "[example] Create an artwork that holds this belief I want to pass on: \"The best things are always smaller than you expect and last longer than you planned for.\" Typographic and painterly, warm ink on aged paper, to hang where it's seen every day. [Replace the line with your own.]",
            isExample: true,
          },
        ],
      },
    ],
  },
  {
    category: "Ambient & living",
    sections: [
      {
        title: "Ambient & living - fill-in templates",
        templates: [
          {
            id: "more-amb-fill-85",
            text: "Create a set of four ambient displays for my [living room / bedroom / study] - one per season - that shift the feeling of the room with the year. My home's base mood: [describe]. What I want each season to feel like: [describe each or leave to Vizzy].",
            isExample: false,
          },
          {
            id: "more-amb-fill-86",
            text: "Create a set of ambient displays that change with the rhythm of my day. Morning: [describe the feeling you want]. Afternoon: [describe]. Evening: [describe]. Late night: [describe]. Consistent style across all: [painterly / abstract / minimal / illustrated].",
            isExample: false,
          },
          {
            id: "more-amb-fill-87",
            text: "Create an ambient display to run during a dinner party at my home. The mood I want to create: [describe - sophisticated / warm and relaxed / eclectic / intimate]. Style: [gallery art / cinematic / illustrated / abstract]. Should feel like it belongs in the room, not demand attention.",
            isExample: false,
          },
          {
            id: "more-amb-fill-88",
            text: "Create an ambient display for when I'm working deeply at home. My work: [describe briefly]. The mental state I want to support: [focused / creative / calm / energised]. Style: [abstract / geometric / minimal / slow painterly]. No text, no distraction.",
            isExample: false,
          },
          {
            id: "more-amb-fill-89",
            text: "Create a slowly evolving display that runs all day in my home, shifting colour and mood with the light outside. Mood arc: [describe how you want the day to feel - from what to what]. Style: [abstract / painterly / botanical / architectural]. No hard transitions - everything breathes.",
            isExample: false,
          },
          {
            id: "more-amb-fill-90",
            text: "Create a display for my home that changes with the seasons automatically. I want winter to feel [describe], spring to feel [describe], summer to feel [describe], autumn to feel [describe]. Style consistent throughout: [painterly / illustrated / abstract / typographic].",
            isExample: false,
          },
        ],
      },
      {
        title: "Ambient & living - ready-to-use examples",
        templates: [
          {
            id: "more-amb-ex-91",
            text: "[example] Create four seasonal ambient displays for a warm, book-filled living room. Spring: soft green light, botanical. Summer: golden afternoon, open windows implied. Autumn: amber and rust, candlelit warmth. Winter: deep navy, snow light, a fire implied in the palette. Painterly throughout, each unmistakably its season. [Describe your own room's mood to personalise.]",
            isExample: true,
          },
          {
            id: "more-amb-ex-92",
            text: "[example] Create four ambient displays that shift with the day. 7am: pale morning light, quiet, the day not yet asked anything. 12pm: clear and warm, slightly energised. 6pm: amber and deep green, the city softening. 11pm: deep indigo, one warm light source, the world at rest. Abstract painterly, seamless across the day. [Adjust times and moods to your own rhythm.]",
            isExample: true,
          },
          {
            id: "more-amb-ex-93",
            text: "[example] Create an ambient display for a dinner party - something gallery-worthy that creates atmosphere without competing with conversation. A slow abstract painting in deep burgundy, gold, and slate - as if a Rothko were alive. No motion, just depth and warmth. To run silently on the frame all evening. [Describe your preferred palette to adjust it.]",
            isExample: true,
          },
          {
            id: "more-amb-ex-94",
            text: "[example] Create an ambient display for deep writing sessions - a slow abstract visual in forest green and warm black, like looking through glass at leaves in low wind. Barely moving. No text. The kind of thing you can look at for three seconds and return to the page. Painterly, minimal, deeply calm. [Describe your work and preferred visual to adjust.]",
            isExample: true,
          },
        ],
      },
    ],
  },
  {
    category: "Seasonal & celebrations",
    sections: [
      {
        title: "Seasonal & celebrations - fill-in templates",
        templates: [
          {
            id: "more-seas-fill-95",
            text: "Create a [season] celebration display for my home that feels genuinely mine - not generic. What this season means to me: [describe - a specific memory, a tradition, a feeling]. Style: [painterly / illustrated / botanical / abstract]. Colours: [describe the palette you want].",
            isExample: false,
          },
          {
            id: "more-seas-fill-96",
            text: "Create a birthday display for [name]. Their personality in a few words: [describe]. Style: [joyful and illustrated / elegant / bold typographic]. A message to include: [write it or leave to Vizzy].",
            isExample: false,
          },
          {
            id: "more-seas-fill-97",
            text: "Create a display to mark [an anniversary / a milestone / a personal achievement] - something I can put on the wall and come back to. The occasion: [describe]. Names or dates: [optional]. Style: [warm and illustrated / elegant typographic / painterly / abstract].",
            isExample: false,
          },
          {
            id: "more-seas-fill-98",
            text: "Create a display for [a religious or cultural festival I celebrate]. What this occasion means to me: [describe]. Visual motifs I'd like included: [describe]. Style: [traditional / contemporary / abstract / illustrated].",
            isExample: false,
          },
        ],
      },
      {
        title: "Seasonal & celebrations - ready-to-use examples",
        templates: [
          {
            id: "more-seas-ex-99",
            text: "[example] Create a Diwali display that feels warm and contemporary - not literal diyas and rangoli, but the feeling underneath them: light arriving, darkness gently retreating, the warmth of people gathered. Deep amber, gold, and terracotta. Abstract and painterly. [Describe your own Diwali feeling to personalise it.]",
            isExample: true,
          },
          {
            id: "more-seas-ex-100",
            text: "[example] Create a winter solstice display for my living room - the longest night, a single candle, the slow promise of more light. Not Christmas, not festive - just still and ancient and beautiful. Deep navy, silver, one warm amber. Painterly. [Swap to the seasonal moment that matters most to you.]",
            isExample: true,
          },
          {
            id: "more-seas-ex-101",
            text: "[example] Create a New Year display for the home frame. Not celebratory - more like a quiet exhale, a turning of a page. Typography: a single line in a warm serif - The year that is still unwritten. Deep green, cream, and gold. Calm and intentional. [Swap the line and palette to yours.]",
            isExample: true,
          },
          {
            id: "more-seas-ex-102",
            text: "[example] Create a birthday display for someone who hates fuss but deserves to feel extraordinary - nothing loud, nothing with balloons. A painterly abstract in their favourite colours with a single line in quiet type: another year of being yourself, which turns out to be enough. [Add the name and favourite colours to personalise it.]",
            isExample: true,
          },
        ],
      },
    ],
  },
  {
    category: "Kids & family",
    sections: [
      {
        title: "Kids & family - fill-in templates",
        templates: [
          {
            id: "more-kids-fill-103",
            text: "Create an artwork for my child's room that reflects who they are right now, at [age]. Their current obsessions: [describe]. Their personality: [describe in a sentence]. Style: [playful and illustrated / dreamy / adventure-themed / bold and colourful].",
            isExample: false,
          },
          {
            id: "more-kids-fill-104",
            text: "Create a family portrait in an artistic style - not photographic, but expressive. Our family: [describe who we are - number of people, a few words on each]. The feeling I want it to carry: [describe]. Style: [painterly / illustrated / warm graphic / abstract].",
            isExample: false,
          },
          {
            id: "more-kids-fill-105",
            text: "Create a story series for my child that keeps going - a new episode each week. Main character: [describe or let Vizzy invent]. My child's name and age: [optional]. Their interests: [describe]. Tone: [funny / adventurous / gentle / magical].",
            isExample: false,
          },
          {
            id: "more-kids-fill-106",
            text: "Create a visual record of my child's year - a kind of illustrated annual. Key moments to include: [list or describe]. Style: [scrapbook and warm / clean editorial / painterly / storybook]. For them to look back on.",
            isExample: false,
          },
          {
            id: "more-kids-fill-107",
            text: "Create a display for our kitchen or family room that captures our family's values or the things we believe in. Our values: [list them in your own words]. Style: [illustrated / typographic / warm and hand-lettered / colourful]. Tone: [grounded / joyful / playful / quiet].",
            isExample: false,
          },
        ],
      },
      {
        title: "Kids & family - ready-to-use examples",
        templates: [
          {
            id: "more-kids-ex-108",
            text: "[example] Create artwork for a seven-year-old's bedroom who is obsessed with deep sea creatures and wants their room to feel like being at the bottom of the ocean - dark blue, bioluminescent, slightly mysterious but not scary. Illustrated, detailed, wonder-filled. [Swap the age and interest to your child's.]",
            isExample: true,
          },
          {
            id: "more-kids-ex-109",
            text: "[example] Create a family portrait - not photographic, but impressionistic and warm. A family of four around a kitchen table on an ordinary evening: one child reading, one drawing, two adults with tea, a dog underfoot. The light from an overhead lamp. Painted as if Bonnard were watching. [Describe your own family scene.]",
            isExample: true,
          },
          {
            id: "more-kids-ex-110",
            text: "[example] Create a weekly bedtime story series starring a small girl called Priya who can speak to rivers. Each episode: she goes to a new river in a new country and learns something surprising. Gentle, lyrical, adventurous. For a child aged 6. New episode every Sunday. [Swap the character details to yours.]",
            isExample: true,
          },
        ],
      },
    ],
  },
  {
    category: "Reflective & philosophical",
    sections: [
      {
        title: "Reflective & philosophical - fill-in templates",
        templates: [
          {
            id: "more-phil-fill-111",
            text: "Create an artwork that visualises a question I can't stop thinking about. The question: [write it]. Style: [abstract / symbolic / surrealist / figurative]. Mood: [contemplative / unsettling / quietly beautiful / open-ended].",
            isExample: false,
          },
          {
            id: "more-phil-fill-112",
            text: "Create a display that holds a belief I'm not sure I have the right words for yet. I'll try to describe it: [write as much or as little as you can]. Style: [abstract / typographic / painterly]. Not an illustration of the idea - just something that feels like it.",
            isExample: false,
          },
          {
            id: "more-phil-fill-113",
            text: "Create an artwork based on a period of difficulty I've come through. Not a celebration and not a wound - just a witness. What I went through: [describe as much as you're comfortable with]. Style: [abstract / painterly / symbolic]. Tone: [honest / tender / clear-eyed / quiet].",
            isExample: false,
          },
        ],
      },
      {
        title: "Reflective & philosophical - ready-to-use examples",
        templates: [
          {
            id: "more-phil-ex-114",
            text: "[example] Create an artwork that holds the question I keep returning to: \"What is a life well lived, and would I know it if I was living it?\" Abstract, painted in deep blue and warm gold. No figures, no symbols - just the quality of the question itself. Large format, painterly, unhurried. [Swap the question to yours.]",
            isExample: true,
          },
          {
            id: "more-phil-ex-115",
            text: "[example] Create an abstract artwork that feels like the concept of enough - not settling, not abundance, just the particular peace of sufficiency. Warm, still, slightly luminous. A painting you could look at for a long time and feel your shoulders drop. [Describe your own concept to swap it in.]",
            isExample: true,
          },
        ],
      },
    ],
  },
  {
    category: "Miscellaneous & wildcard",
    sections: [
      {
        title: "Miscellaneous & wildcard",
        templates: [
          {
            id: "more-misc-116",
            text: "Create something for my home that I wouldn't have thought to ask for - based on this about me: [describe yourself freely - your life, your home, your loves, your obsessions, what you're going through right now]. Surprise me.",
            isExample: false,
          },
          {
            id: "more-misc-117",
            text: "[example] Create something for a home that belongs to someone who reads too much, travels when they can, cooks from memory, and still hasn't decided what they want to be when they grow up. Something that feels like all of that at once. [Describe yourself instead and I'll create something for you.]",
            isExample: true,
          },
          {
            id: "more-misc-118",
            text: "Create a display that rotates daily and always shows me something I haven't seen before - drawn from [a theme or category: nature / abstract art / poetry / world architecture / science / mythology]. Style: [painterly / photographic / illustrated / graphic]. My taste in a sentence: [describe].",
            isExample: false,
          },
          {
            id: "more-misc-119",
            text: "[example] Create a living room display that works like a slow, evolving painting - it shifts almost imperceptibly over the course of a day, so that the room feels subtly different at 8am, 1pm, 6pm, and 11pm without anyone quite knowing why. Palette: warm terracotta, deep olive, cream. Abstract and painterly throughout. [Describe your preferred palette and mood to adjust it.]",
            isExample: true,
          },
          {
            id: "more-misc-120",
            text: "Create a single piece for my home that holds everything that matters to me right now - a visual diary of this particular moment in my life. What matters: [write freely - people, places, feelings, questions, objects, ambitions]. Style: [your choice - leave it open or describe what you want]. The kind of thing I'll look at in ten years and remember exactly who I was.",
            isExample: false,
          },
        ],
      },
    ],
  },
]
