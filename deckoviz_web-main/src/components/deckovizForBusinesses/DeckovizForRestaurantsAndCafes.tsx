import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Utensils, 
  CheckCircle2, 
  Palette, 
  Music, 
  MapPin, 
  Heart, 
  Home, 
  Layers, 
  Volume2, 
  Sun, 
  Flame, 
  Camera, 
  Compass, 
  Award,
  Sparkle
} from 'lucide-react';

// --- DATA STRUCTURES ---
const PROBLEMS = [
  {
    title: 'The "dead space" deficit',
    desc: 'Most restaurant walls are passive assets that produce zero revenue. Deckoviz converts them into high-performing, revenue-generating surfaces.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6.5 h-6.5 stroke-[#0A8378]">
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M17 7h4v4" />
      </svg>
    )
  },
  {
    title: 'Operational friction',
    desc: 'Eliminate the "design-to-print" bottleneck. No more waiting for designers, reprinting menus, or dealing with outdated signage.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6.5 h-6.5 stroke-[#0A8378]">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    )
  },
  {
    title: 'Atmospheric stagnation',
    desc: 'Static décor cannot adapt. Deckoviz solves the "vibe gap" by automatically transitioning your space from a bright brunch energy to an intimate dinner glow.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6.5 h-6.5 stroke-[#0A8378]">
        <path d="M12 3v2M12 19v2M5 5l1.5 1.5M17.5 17.5L19 19M3 12h2M19 12h2M5 19l1.5-1.5M17.5 6.5L19 5" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    )
  },
  {
    title: 'Visual noise vs. resonance',
    desc: 'Unlike traditional digital signage that feels like ads, Deckoviz creates ambient discovery-visuals that feel like art, not persuasion.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6.5 h-6.5 stroke-[#0A8378]">
        <circle cx="12" cy="12" r="9" />
        <circle cx="9" cy="10" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="14.5" cy="9" r="1" fill="currentColor" stroke="none" />
        <circle cx="10" cy="14.5" r="1" fill="currentColor" stroke="none" />
        <path d="M12 3a9 9 0 000 18c1 0 1.5-.6 1.5-1.4 0-.4-.15-.7-.4-1a1.4 1.4 0 011-2.4H16a3 3 0 003-3c0-4.4-3.6-8-7-8z" fill="none" />
      </svg>
    )
  }
];

const WHY = [
  { title: 'Command premium prices', desc: 'High-end atmosphere justifies higher margins.' },
  { title: 'Drive emotional ROI', desc: 'Guests return to places that made them feel something.' },
  { title: 'Future-proof your interior', desc: 'Your space receives monthly updates with new art styles, features, and AI models — you are investing in a platform that keeps becoming.' }
];

const PORTAL_FOR_RESTAURANTS = [
  {
    icon: <Palette className="w-6 h-6 stroke-[#0A8378]" />,
    title: 'Art You Actually Chose (Not Generic, Boring Stuff)',
    bullets: [
      "Choose from tens of thousands of artworks in Deckoviz's global art library, so the walls reflect real curation, not whatever was cheap and available when the place was being fitted out.",
      "Go further and create pieces themed around your own restaurant: its history, its local region, its food, its cultural roots.",
      "Use art deliberately for aesthetic effect too, building a specific fun vibe rather than leaving the walls as an afterthought once the kitchen and menu were sorted."
    ]
  },
  {
    icon: <Sparkles className="w-6 h-6 stroke-[#0A8378]" />,
    title: 'A Legacy Guests Can Actually Feel & Soak In',
    bullets: [
      "Showcase the history and inspiration behind your dishes instead of leaving that story in your head or buried in a menu footnote.",
      "Bring guests through that legacy and identity visually, with stunning art and looping visuals that turn waiting for a table into part of the experience.",
      "Let the space itself carry the story of the place, so regulars and first-timers alike pick up on what makes this restaurant different before the food even arrives."
    ]
  },
  {
    icon: <Layers className="w-6 h-6 stroke-[#0A8378]" />,
    title: 'An Immersive, Adaptive, Intelligent Visual Layer',
    bullets: [
      "Treat food as art and replace boring text-only paper menus with something visually enticing, worth looking at before it's worth ordering from.",
      "Turn specials into beautiful posters or loops, instead of a chalkboard scribble or a laminated insert nobody reads.",
      "Put glowing customer reviews up as striking wall pieces, and go further with actual artworks made from photos of past guests enjoying themselves in your space.",
      "Build an immersive, fun, personal atmosphere with AI — your own Vizzy — one that keeps shifting with customer-themed visuals, artworks, posters, and fresh visuals instead of freezing in place the day it was decorated."
    ]
  },
  {
    icon: <Heart className="w-6 h-6 stroke-[#0A8378]" />,
    title: 'Memorable Moments & Considered Spaces',
    bullets: [
      "Create the small, unexpected, delightful touches that turn an ordinary visit into something worth mentioning to a friend afterward.",
      "Build genuinely beautiful spaces, ones that feel considered and cared for, not just functional rooms with tables in them.",
      "Design for memorable experiences on top of good food: a wall that shifts for a birthday, a private event that actually feels different from a Tuesday night, a space that participates in the occasion instead of just hosting it."
    ]
  }
];

const RESTAURANT_PRACTICE_PILLARS = [
  {
    icon: <Palette className="w-6 h-6 stroke-[#0A8378]" />,
    title: 'Choose or create the art that actually fits your room',
    items: [
      'Pick from a massive, constantly expanding global art library and use any piece as a full art frame, no need to settle for whatever happened to be on sale at the local print shop.',
      'Or go further and create custom, themed art for specific occasions — a holiday, a seasonal menu launch, a one-night event — so the walls can actually change with the calendar instead of staying frozen year-round.',
      "Match the art to the exact vibe you've built the rest of the room around: refined and minimal, warm and rustic, bold and playful, whatever the space is actually going for."
    ]
  },
  {
    icon: <Utensils className="w-6 h-6 stroke-[#0A8378]" />,
    title: 'Turn your food itself into the art',
    items: [
      'Show dishes as stunning stills and loops, the kind of visual that makes food look the way it actually tastes.',
      'Turn specials into their own art pieces, stills and loops that replace a chalkboard scrawl with something worth a second look.',
      "Feature real moments of past guests enjoying themselves, turning your own customers into part of the room's story.",
      'Replace static, text-only menus with visual menus and menu loops that feel like part of the experience rather than paperwork handed over at the table.'
    ]
  },
  {
    icon: <Volume2 className="w-6 h-6 stroke-[#0A8378]" />,
    title: 'Set the mood with sound, not just sight',
    items: [
      'Layer in music from a library of hundreds and thousands of tracks, real sonic ambiance built for the room, not an aux cord playlist someone set up once and forgot about.',
      'Dial it in for the occasion: slow and intimate for a romantic evening, high-tempo and alive for a celebration or a packed Friday night.',
      "Take sound as seriously as visuals. It's one of the most underrated levers a restaurant has — what envelops guests acoustically shapes how they feel about the whole evening far more than most owners give it credit for, and it's one of the easiest things to get right once you're actually paying attention to it."
    ]
  },
  {
    icon: <MapPin className="w-6 h-6 stroke-[#0A8378]" />,
    title: 'Bring the local culture into the room',
    items: [
      'Feature photos from your own region, so the space feels rooted in where it actually is, not interchangeable with a restaurant three states over.',
      'Choose imagery that reinforces the specific vibe you\'re building: history, landscape, local life, whatever tells your story best.',
      'Let the photos do double duty: real cultural immersion for visitors passing through, and a quiet nod of recognition for the locals who know exactly what they\'re looking at.'
    ]
  }
];



const USE_CASES_15 = [
  { title: 'Dynamic AI menus', desc: 'Update specials and pricing instantly via voice or tap — zero printing costs.' },
  { title: '"Vizzy" dish transformation', desc: 'Turn basic kitchen photos into professional, appetite-building product art.' },
  { title: 'Silent hosting', desc: 'Welcome guests with ambient visuals and light that set the mood before a word is spoken.' },
  { title: 'Culinary storytelling', desc: 'Display the farm-to-table journey, chef inspirations, or ingredient origins.' },
  { title: 'Instagram-ready walls', desc: 'Create naturally photogenic spaces that guests want to share on social media.' },
  { title: 'Queue engagement', desc: 'Reduce perceived wait times with visual trivia or brand narratives.' },
  { title: 'Celebration mode', desc: 'Instantly activate personalized anniversary or birthday montages for VIP tables.' },
  { title: 'Time-aware transitions', desc: 'Automated shifts for morning serenity, lunch energy, and late-night intimacy.' },
  { title: 'Visual pairings', desc: 'Promote high-margin wine and spirit pairings alongside signature dishes.' },
  { title: 'Staff training surfaces', desc: 'Use back-of-house units for visual plating guides and consistency references.' },
  { title: 'Multi-site synchronization', desc: 'Manage the brand aesthetic across 50 locations from one central dashboard.' },
  { title: 'Legacy & roots', desc: 'Highlight the history and heritage of your establishment through archival-style AI art.' },
  { title: 'Interactive art loops', desc: 'Keep the atmosphere fresh with generative art that never repeats exactly the same way.' },
  { title: 'In-store marketing clips', desc: 'Create and run high-quality promo videos for your next event or location.' },
  { title: 'Ambient music sync', desc: 'Pair visuals with curated soundscapes to create a 360-degree sensory experience.' }
];

const BENEFITS_12 = [
  { title: 'Increased ticket size', desc: 'Visually upselling desserts and specials leads to higher average order values.' },
  { title: 'Faster table turnover', desc: 'Optimized visuals can subtly influence the pace and flow of the dining room.' },
  { title: 'Zero operational overhead', desc: 'Updates happen in seconds, not days, with no technical skills required.' },
  { title: 'Brand consistency', desc: 'Ensure every location feels like "your brand" while maintaining local character.' },
  { title: 'Cost elimination', desc: 'Stop spending on physical menus, posters, and seasonal décor.' },
  { title: 'Higher dwell time', desc: 'Guests linger longer in spaces that feel intentional and comfortable.' },
  { title: 'Instant experience upgrade', desc: 'Transform your interior without a single day of renovation or downtime.' },
  { title: 'Data-informed curation', desc: 'The system learns which visuals resonate best with your specific clientele over time.' },
  { title: 'Employee retention', desc: 'A high-tech, beautiful workspace improves staff pride and overall morale.' },
  { title: 'Sustainability', desc: 'Digital updates drastically reduce the paper waste and carbon footprint of your marketing.' },
  { title: 'Premium positioning', desc: 'Signals to investors and guests that your establishment is at the cutting edge of hospitality.' },
  { title: 'Dual-functionality', desc: "It's the only high-end art frame that doubles as a full Google TV for events." }
];

const CATEGORIES = [
  { 
    id: 'guest', 
    label: 'Guest experience', 
    glyph: '✦', 
    items: [
      { title: 'Personalized welcome artworks for reserved guests', desc: 'Create personalised artworks to greet guests who have reserved tables — names, portraits transformed into iconic art styles, or beautiful visual greetings as they arrive.' },
      { title: 'Birthday, anniversary & celebration moments', desc: 'Personalised montages, artworks, and celebration visuals for birthdays, anniversaries, proposals, family gatherings, and special occasions.' },
      { title: 'Personalized art gifts for guests', desc: 'Capture beautiful moments of guests enjoying their meal and convert them into artistic keepsakes they can take home digitally or physically.' },
      { title: 'Guest memory wall', desc: 'A visual archive of memorable guests, celebrations, and moments that happened in your restaurant.' },
      { title: 'Returning guest recognition', desc: 'Vizzy remembers returning guests, their favourite dishes, preferences, dietary choices, anniversaries, and special details to create delightful repeat experiences.' },
      { title: 'Personalized recommendations', desc: 'Recommend dishes based on past preferences, food choices, taste profiles, and guest behaviour.' },
      { title: 'VIP guest experiences', desc: 'Elevated personalised visual journeys for VIP guests, repeat customers, and premium diners.' },
      { title: 'Proposal & surprise planning support', desc: 'Use Deckoviz to help orchestrate surprise proposals, celebrations, birthday reveals, and memorable emotional moments.' }
    ]
  },
  { 
    id: 'menu', 
    label: 'Menu & food', 
    glyph: '◈', 
    items: [
      { title: 'Visual menu system', desc: 'Convert your menu into a fully visual menu where every dish is beautifully displayed and explained aesthetically.' },
      { title: 'Signature dish storytelling', desc: "Each dish can tell its story: ingredients, inspiration, chef's vision, sourcing, local history, and preparation journey." },
      { title: 'Live dish showcase loops', desc: 'Stunning static visuals or cinematic video loops of dishes being prepared and served beautifully.' },
      { title: 'Daily specials & chef recommendations', desc: 'Update specials dynamically throughout the day without printing new menus.' },
      { title: 'Seasonal menu storytelling', desc: 'Launch seasonal dishes with beautiful visual campaigns and story-led presentation.' },
      { title: 'Pairing recommendations', desc: 'Suggest desserts, drinks, wines, and side dishes visually alongside main dishes.' },
      { title: 'Ingredient education', desc: 'Show freshness, sourcing stories, local farm partnerships, premium ingredients, and sustainability efforts.' },
      { title: 'Nutritional & macro information', desc: 'Display calories, macros, health details, dietary suitability, and allergen information beautifully.' },
      { title: "Chef's table storytelling", desc: 'Let the chef explain the philosophy and creation behind a special tasting menu.' }
    ]
  },
  { 
    id: 'ambience', 
    label: 'Ambience & mood', 
    glyph: '◎', 
    items: [
      { title: 'Dynamic ambience engine', desc: 'Vizzy becomes your ambience layer, adapting lights, visuals, sounds, and mood depending on customer profile, time of day, and occasion.' },
      { title: 'Morning vs evening mood shifts', desc: 'Different visual and sensory environments for brunch, lunch, dinner, and late-night dining.' },
      { title: 'Weekend vs weekday atmosphere', desc: 'Entirely different restaurant moods depending on traffic and customer energy.' },
      { title: 'Romantic dinner mode', desc: 'Special visual ambience for couples, anniversaries, and romantic reservations.' },
      { title: 'Family dining mode', desc: 'Warmer, playful environments for families and group dinners.' },
      { title: 'Festival & holiday ambience', desc: "Christmas, Valentine's Day, Diwali, New Year, EPL season, local festivals — your restaurant transforms instantly." },
      { title: 'Weather-responsive ambience', desc: 'Rainy day moods, winter warmth, summer freshness — spaces that feel alive with context.' },
      { title: 'Local culture immersion', desc: 'Beautiful visual narratives inspired by your city, region, history, and cultural identity.' }
    ]
  },
  { 
    id: 'story', 
    label: 'Storytelling', 
    glyph: '◉', 
    items: [
      { title: "Your restaurant's story", desc: 'Tell the story of your restaurant: why it exists, your founder story, inspiration, family history, philosophy, and values.' },
      { title: 'Dish origin journeys', desc: 'Take guests on culinary journeys showing where dishes came from and how traditions evolved.' },
      { title: 'Local storytelling', desc: 'Stories of local ingredients, local producers, and regional culinary culture.' },
      { title: 'Cultural immersion experiences', desc: 'Deeper cultural dining experiences for cuisine-specific restaurants.' },
      { title: 'Chef storytelling', desc: 'Introduce the chef, their inspirations, philosophy, and culinary journey.' },
      { title: 'Farm-to-table storytelling', desc: 'Show the journey from source to plate in immersive visual form.' },
      { title: 'Sustainability storytelling', desc: 'Communicate ethical sourcing, sustainability efforts, and social responsibility beautifully.' },
      { title: 'Brand campaigns', desc: 'Run stunning visual campaigns around new launches, collaborations, events, and chef specials.' }
    ]
  },
  { 
    id: 'revenue', 
    label: 'Revenue & upselling', 
    glyph: '◆', 
    items: [
      { title: 'High-margin dish highlighting', desc: 'Strategically showcase premium dishes and high-margin offerings to influence ordering behaviour.' },
      { title: 'Dessert & drinks upselling', desc: 'Beautifully prompt guests toward desserts, signature drinks, pairings, and add-ons.' },
      { title: 'Limited-time offers', desc: 'Create urgency with elegant visual promotion of seasonal or limited-time dishes.' },
      { title: 'Upsell through appetite visuals', desc: 'Beautiful dish visuals increase appetite and conversion more than text ever can.' },
      { title: 'Premium experience positioning', desc: 'Increase perceived value of premium offerings through presentation and storytelling.' },
      { title: 'Event bookings promotion', desc: 'Promote private dining, event hosting, catering, and celebration packages.' },
      { title: 'Gift card promotions', desc: 'Beautifully display gift card and special dining package promotions.' }
    ]
  },
  { 
    id: 'social', 
    label: 'Social proof', 
    glyph: '◇', 
    items: [
      { title: 'Live customer feedback wall', desc: 'Display customer reviews, testimonials, and positive feedback beautifully, alongside guest photos and artistic portraits.' },
      { title: 'Review generation prompts', desc: 'Encourage guests to leave reviews through elegant post-meal prompts.' },
      { title: 'Instagrammable moments', desc: 'Highly shareable moments guests naturally want to photograph and post.' },
      { title: 'UGC wall', desc: 'Display customer-generated photos and social posts beautifully inside the restaurant.' },
      { title: 'Influencer & celebrity visits', desc: 'Celebrate notable guests and memorable visits with elegant visual displays.' },
      { title: 'Event memory reels', desc: 'Create montages from special nights, live music events, and tasting experiences.' }
    ]
  },
  { 
    id: 'kids', 
    label: 'Kids & families', 
    glyph: '◐', 
    items: [
      { title: 'Storytelling modes for children', desc: 'Visual stories, bedtime-style stories, and playful educational content for family dining.' },
      { title: 'Interactive quiz modes', desc: 'Fun games, quizzes, and playful experiences for kids and adults.' },
      { title: 'Waiting-time entertainment', desc: 'Reduce perceived waiting time through engaging storytelling and interactive visual experiences.' },
      { title: 'Family memory gifts', desc: 'Turn family dinners into beautiful keepsake artworks.' }
    ]
  },
  { 
    id: 'ops', 
    label: 'Operations', 
    glyph: '◑', 
    items: [
      { title: 'Beautiful signage system', desc: 'Aesthetic, premium signage for directions, reservations, policies, and information.' },
      { title: 'Queue & waiting management', desc: 'Elegant waiting lists, estimated wait times, and guest communication.' },
      { title: 'Reservation display wall', desc: 'Beautifully manage reservations and premium guest greetings.' },
      { title: 'Event announcements', desc: 'Live music nights, tasting events, chef specials, private events, and upcoming launches.' },
      { title: 'Staff recognition wall', desc: 'Celebrate your team, chefs, anniversaries, and internal culture.' },
      { title: 'Recruitment wall', desc: 'Hiring announcements presented beautifully and on-brand.' },
      { title: 'Vendor & partner showcases', desc: 'Highlight partnerships, farms, suppliers, wineries, and collaborators.' }
    ]
  }
];

const JOURNEY_STEPS = [
  'A guest enters and is greeted personally.',
  'They see their table waiting with a personalised welcome.',
  'The menu comes alive visually.',
  'Their dish tells its story.',
  'The ambience shifts with the evening.',
  'Their children are entertained.',
  'Their anniversary becomes memorable.',
  'They leave with a personalised artwork of the evening.'
];

const DeckovizForRestaurantsAndCafes = () => {
  const navigate = useNavigate();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const handleDemoClick = () => {
    navigate('/contact');
  };

  const activeCategory = CATEGORIES[activeCategoryIndex];

  return (
    <div 
      className="relative min-h-screen text-[#0E2438] overflow-x-hidden selection:bg-[#5CD9C4] selection:text-[#071B2C]"
      style={{
        background: `
          radial-gradient(ellipse 60% 45% at 15% 0%, #DDF6F0 0%, transparent 60%),
          radial-gradient(ellipse 55% 45% at 100% 15%, rgba(14, 169, 155, 0.10) 0%, transparent 55%),
          linear-gradient(180deg, #F6FAF9 0%, #EDF6F4 100%)
        `,
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Inline styles for custom animations & Fraunces font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap');
        
        .font-fraunces {
          font-family: 'Fraunces', serif;
        }

        @keyframes floatA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.08); }
        }
        @keyframes floatB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-35px, 25px) scale(1.05); }
        }
        @keyframes floatC {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(25px, -35px) scale(1.1); }
        }
        @keyframes pulseDot {
          0% { box-shadow: 0 0 0 0 rgba(14, 169, 155, 0.6); }
          70% { box-shadow: 0 0 0 9px rgba(14, 169, 155, 0); }
          100% { box-shadow: 0 0 0 0 rgba(14, 169, 155, 0); }
        }
        @keyframes gradShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 220% 50%; }
        }

        .animate-float-a { animation: floatA 22s ease-in-out infinite; }
        .animate-float-b { animation: floatB 26s ease-in-out infinite; }
        .animate-float-c { animation: floatC 30s ease-in-out infinite; }
        .animate-pulse-dot { animation: pulseDot 2.2s infinite; }

        .grad-text {
          background: linear-gradient(100deg, #0EA99B, #1B4C79, #2FC2AE);
          background-size: 220% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradShift 7s linear infinite;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.56);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.75);
          box-shadow: 0 20px 60px -25px rgba(11, 42, 69, 0.25);
        }

        .glass-card-strong {
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.85);
          box-shadow: 0 20px 60px -25px rgba(11, 42, 69, 0.25);
        }
      `}</style>

      {/* Decorative Background Ambient Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-[38vw] h-[38vw] top-[-8%] left-[-10%] rounded-full blur-[90px] opacity-55 bg-[radial-gradient(circle,#9BE8DB,transparent_70%)] animate-float-a" />
        <div className="absolute w-[34vw] h-[34vw] top-[8%] right-[-8%] rounded-full blur-[90px] opacity-32 bg-[radial-gradient(circle,#5CD9C4,transparent_70%)] animate-float-b" />
        <div className="absolute w-[30vw] h-[30vw] bottom-[6%] left-[20%] rounded-full blur-[90px] opacity-16 bg-[radial-gradient(circle,#1B4C79,transparent_72%)] animate-float-c" />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10">

        {/* HERO SECTION */}
        <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none z-[-1]" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
            <g stroke="#0EA99B" strokeWidth="1" fill="none" opacity="0.14">
              <path d="M0 80 Q 250 40 500 80 T 1000 80" />
              <path d="M0 180 Q 250 120 500 180 T 1000 180" />
              <path d="M0 600 Q 250 660 500 600 T 1000 600" />
              <path d="M0 520 Q 250 580 500 520 T 1000 520" />
            </g>
          </svg>

          <div className="max-w-5xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card text-sm font-semibold text-[#0A8378] tracking-tight mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#2FC2AE] animate-pulse-dot" />
              Deckoviz for restaurants
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-fraunces text-4xl sm:text-6xl lg:text-7xl font-medium text-[#0B2A45] leading-[1.1] tracking-tight mb-6"
            >
              The new standard in<br />
              <span className="grad-text">dining atmosphere</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl lg:text-2xl text-[#4C6A83] font-normal max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Elevate your establishment from a <em className="italic text-[#0B2A45] font-medium">"place to eat"</em> to a <em className="italic text-[#0B2A45] font-medium">"place to feel something more."</em>
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass-card rounded-3xl p-8 sm:p-10 text-left max-w-4xl mx-auto shadow-xl"
            >
              <h3 className="font-fraunces text-2xl sm:text-3xl text-[#0B2A45] font-medium mb-4">
                With the Deckoviz GAVP
              </h3>
              <p className="text-[#4C6A83] text-base sm:text-lg leading-relaxed mb-4">
                Deckoviz, the world's first Generative Ambiance and Visual Platform (GAVP), is a multi-sensory AI infrastructure that combines AI-driven creation, intelligent curation, and ambient display into a single, seamless ecosystem.
              </p>
              <p className="text-[#4C6A83] text-base sm:text-lg leading-relaxed">
                It uses our proprietary AI, Vizzy, to learn your brand's aesthetic and rhythm, ensuring your walls are always in sync with the soul of your restaurant.
              </p>
            </motion.div>
          </div>
        </section>

        {/* MEDIA / VIDEO & SOCIAL DEMO SECTION */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-fraunces text-3xl sm:text-5xl text-[#0B2A45] font-medium mb-4">
                A glimpse of Deckoviz for your restaurant
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-[#2FC2AE] to-[#1B4C79] mx-auto rounded-full mt-4" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <motion.div 
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col justify-between"
              >
                <div className="text-center mb-4">
                  <h3 className="font-fraunces text-xl font-medium text-[#0B2A45]">Watch Deckoviz Transform Spaces</h3>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-white/60">
                  <iframe
                    src="https://www.youtube.com/embed/pq6vb-AvmYc?rel=0&showinfo=0"
                    title="A Glimpse Of Deckoviz For Your Restaurant"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
                <p className="text-center text-[#4C6A83] text-sm sm:text-base mt-4">
                  Experience the magic of Deckoviz and see how it can transform your space.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col justify-between"
              >
                <div className="text-center mb-4">
                  <h3 className="font-fraunces text-xl font-medium text-[#0B2A45]">Follow Our Dining Stories</h3>
                </div>
                <div className="w-full aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden shadow-lg border border-white/60 bg-white/40">
                  <iframe
                    src="https://www.instagram.com/p/DLM9TrnSibN/embed"
                    className="w-full h-full border-0"
                    allowTransparency={true}
                    allow="encrypted-media"
                    title="Instagram Post"
                  />
                </div>
                <p className="text-center text-[#4C6A83] text-sm sm:text-base mt-4">
                  Daily ambiance inspiration, dish storytelling, and live installations.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CORE PROBLEMS WE SOLVE */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-fraunces text-3xl sm:text-5xl text-[#0B2A45] font-medium mb-4">
                Core problems we solve
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-[#2FC2AE] to-[#1B4C79] mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {PROBLEMS.map((prob, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, boxShadow: "0 30px 80px -30px rgba(14,169,155,0.35)" }}
                  transition={{ duration: 0.4 }}
                  className="glass-card rounded-3xl p-8 sm:p-10 flex gap-6 items-start border border-white/75 hover:border-[#0EA99B]/40 transition-colors"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#DDF6F0] to-white border border-white/80 flex items-center justify-center shadow-sm">
                    {prob.icon}
                  </div>
                  <div>
                    <h3 className="font-fraunces text-xl sm:text-2xl text-[#0B2A45] font-medium mb-2.5">
                      {prob.title}
                    </h3>
                    <p className="text-[#4C6A83] text-base leading-relaxed">
                      {prob.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY DECKOVIZ FOR RESTAURANTS */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-8">
            <div>
              <h2 className="font-fraunces text-3xl sm:text-5xl text-[#0B2A45] font-medium leading-tight mb-4">
                Why Deckoviz <span className="grad-text">for restaurants?</span>
              </h2>
              <p className="text-[#4C6A83] text-lg sm:text-xl font-normal leading-relaxed">
                Your establishment is a brand, not just a kitchen. Deckoviz gives you the power to:
              </p>
            </div>

            <div className="space-y-6 divide-y divide-[#0B2A45]/10">
              {WHY.map((item, idx) => (
                <div key={idx} className={`pt-6 ${idx === 0 ? 'pt-0 divide-none' : ''} flex gap-4 items-start`}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-[#2FC2AE] to-[#1B4C79] flex items-center justify-center text-white shadow-md mt-1">
                    <CheckCircle2 className="w-5 h-5 stroke-white" />
                  </div>
                  <div>
                    <h4 className="font-fraunces text-lg sm:text-xl text-[#0B2A45] font-medium mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[#4C6A83] text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEW SECTION 1: WHAT KINDS OF RESTAURANTS IS THE DECKOVIZ PORTAL FOR? */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-sm border-y border-[#0B2A45]/10">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-semibold text-[#0A8378] tracking-wide uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Core Philosophy
              </span>
              <h2 className="font-fraunces text-3xl sm:text-5xl text-[#0B2A45] font-medium leading-tight mb-4">
                What Kinds of Restaurants Is the <span className="grad-text">Deckoviz Portal For?</span>
              </h2>
              <p className="text-[#4C6A83] text-lg sm:text-xl leading-relaxed">
                Built for owners, chefs, and restaurateurs who refuse to settle for generic, static decor and want a living visual & atmospheric layer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PORTAL_FOR_RESTAURANTS.map((block, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-3xl p-8 sm:p-10 border border-white/80 shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DDF6F0] to-white border border-white/80 flex items-center justify-center shadow-sm">
                        {block.icon}
                      </div>
                      <h3 className="font-fraunces text-xl sm:text-2xl text-[#0B2A45] font-medium leading-snug">
                        {block.title}
                      </h3>
                    </div>

                    <div className="space-y-4 pt-2">
                      {block.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#0EA99B] mt-2 flex-shrink-0" />
                          <p className="text-[#4C6A83] text-base leading-relaxed">
                            {bullet}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* NEW SECTION 2: HOW RESTAURANTS USE DECKOVIZ, IN PRACTICE */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-semibold text-[#0A8378] tracking-wide uppercase mb-4">
                <Utensils className="w-3.5 h-3.5" /> In Practice
              </span>
              <h2 className="font-fraunces text-3xl sm:text-5xl text-[#0B2A45] font-medium leading-tight mb-4">
                How Restaurants Use Deckoviz, <span className="grad-text">in Practice</span>
              </h2>
              <p className="text-[#4C6A83] text-lg sm:text-xl leading-relaxed">
                Concrete ways leading establishments elevate their room, food, sound, and local culture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {RESTAURANT_PRACTICE_PILLARS.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-3xl p-8 sm:p-10 border border-white/80 shadow-xl"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DDF6F0] to-white border border-white/80 flex items-center justify-center shadow-sm">
                      {pillar.icon}
                    </div>
                    <h3 className="font-fraunces text-xl sm:text-2xl text-[#0B2A45] font-medium leading-snug">
                      {pillar.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {pillar.items.map((itemText, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 stroke-[#0EA99B] mt-0.5 flex-shrink-0" />
                        <p className="text-[#4C6A83] text-base leading-relaxed">
                          {itemText}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>



        {/* 15 HIGH IMPACT USE CASES GRID */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-fraunces text-3xl sm:text-5xl text-[#0B2A45] font-medium mb-4">
                15 high-impact use cases
              </h2>
              <p className="text-[#4C6A83] text-lg">
                Discover how Deckoviz transforms every aspect of your dining experience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {USE_CASES_15.map((uc, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.85)", boxShadow: "0 30px 80px -30px rgba(14,169,155,0.35)" }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-2xl p-7 border border-white/75 transition-all"
                >
                  <span className="font-fraunces italic text-base text-[#0EA99B] font-medium block mb-2">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h4 className="font-fraunces text-lg text-[#0B2A45] font-medium mb-2">
                    {uc.title}
                  </h4>
                  <p className="text-[#4C6A83] text-sm leading-relaxed">
                    {uc.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 12 UNRIVALED BENEFITS */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-fraunces text-3xl sm:text-5xl text-[#0B2A45] font-medium mb-4">
                12 unrivaled benefits
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-[#2FC2AE] to-[#1B4C79] mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-6">
              {BENEFITS_12.map((ben, idx) => (
                <div key={idx} className="flex gap-4 items-start py-5 border-b border-[#0B2A45]/10">
                  <div className="w-2.5 h-2.5 rounded-[3px] bg-gradient-to-br from-[#2FC2AE] to-[#26618f] rotate-45 mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-fraunces text-lg sm:text-xl text-[#0B2A45] font-medium mb-1">
                      {ben.title}
                    </h4>
                    <p className="text-[#4C6A83] text-base leading-relaxed">
                      {ben.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERACTIVE USE CASES CATEGORY JOURNEY TABS */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto space-y-4 mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-semibold text-[#0A8378] tracking-tight">
                <span className="w-2 h-2 rounded-full bg-[#2FC2AE] animate-pulse-dot" />
                An evolving list of use cases
              </div>

              <h2 className="font-fraunces text-3xl sm:text-5xl text-[#0B2A45] font-medium leading-tight">
                Deckoviz becomes your restaurant's <span className="grad-text">everything layer</span>
              </h2>

              <p className="text-[#4C6A83] text-lg sm:text-xl leading-relaxed">
                Deckoviz becomes your restaurant's visual layer, story layer, ambience layer, memory layer, and guest experience and delight system.
              </p>

              <p className="text-[#7C93A6] text-sm sm:text-base leading-relaxed pt-2">
                This is a living list of use cases we keep expanding as we discover new ways restaurants can use Deckoviz to create better customer experiences, stronger brand recall, and more memorable spaces.
              </p>
            </div>

            {/* Category Tabs Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {CATEGORIES.map((cat, idx) => {
                const isActive = idx === activeCategoryIndex;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryIndex(idx)}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0EA99B] to-[#123C63] text-white shadow-lg shadow-[#0EA99B]/30 -translate-y-0.5'
                        : 'glass-card text-[#4C6A83] hover:text-[#0B2A45] hover:bg-white/80'
                    }`}
                  >
                    <span className="text-base">{cat.glyph}</span>
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Category Header */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl sm:text-4xl text-[#0EA99B]">{activeCategory.glyph}</span>
              <div>
                <h3 className="font-fraunces text-2xl sm:text-3xl text-[#0B2A45] font-medium">
                  {activeCategory.label}
                </h3>
                <span className="text-xs sm:text-sm text-[#7C93A6]">
                  {activeCategory.items.length} use cases
                </span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-[#0B2A45]/15 to-transparent ml-4" />
            </div>

            {/* Category Items Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {activeCategory.items.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, boxShadow: "0 30px 80px -30px rgba(14,169,155,0.35)" }}
                    className="glass-card rounded-2xl p-6 border border-white/75"
                  >
                    <h5 className="font-medium text-base text-[#0B2A45] mb-2 leading-snug">
                      {item.title}
                    </h5>
                    <p className="text-sm text-[#4C6A83] leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* FULL EXPERIENCE PANEL & TIMELINE */}
            <div className="glass-card rounded-[32px] p-8 sm:p-14 mt-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(14,169,155,0.10),transparent_60%)] pointer-events-none" />
              
              <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
                <h3 className="font-fraunces text-2xl sm:text-4xl text-[#0B2A45] font-medium mb-3">
                  The full Deckoviz restaurant experience
                </h3>
                <p className="text-[#7C93A6] text-base">
                  The real magic happens when all of this works together.
                </p>
              </div>

              {/* Vertical Timeline */}
              <div className="max-w-2xl mx-auto relative pl-4 sm:pl-6 mb-16">
                <div className="absolute left-[23px] sm:left-[27px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#2FC2AE] to-[#26618f]" />
                <div className="space-y-6 relative z-10">
                  {JOURNEY_STEPS.map((stepText, stepIdx) => (
                    <div key={stepIdx} className="flex gap-5 items-start">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-[#2FC2AE] flex items-center justify-center shadow-sm flex-shrink-0 text-[#0A8378] font-fraunces font-bold text-sm">
                        {stepIdx + 1}
                      </div>
                      <p className="text-[#4C6A83] text-base sm:text-lg pt-1.5 font-normal">
                        {stepText}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Closing Statement */}
              <div className="text-center max-w-xl mx-auto relative z-10 space-y-4">
                <p className="text-[#4C6A83] text-xl font-normal">
                  That is no longer just dinner.
                </p>
                <p className="font-fraunces italic text-3xl sm:text-4xl grad-text font-medium py-1">
                  That becomes an experience.
                </p>
                <p className="text-[#4C6A83] text-lg font-normal">
                  And experiences are what people remember.
                </p>

                <div className="pt-6">
                  <button
                    onClick={handleDemoClick}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#0EA99B] to-[#123C63] text-white font-semibold text-base shadow-xl shadow-[#0EA99B]/30 hover:scale-105 transition-all duration-300"
                  >
                    See it in your restaurant
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="font-fraunces text-4xl sm:text-6xl text-[#0B2A45] font-medium leading-tight">
              The final word:<br />
              <span className="grad-text">why now?</span>
            </h2>

            <p className="text-[#4C6A83] text-lg sm:text-xl font-normal leading-relaxed max-w-3xl mx-auto">
              The future of dining isn't just about what's on the plate — it's about the stories told on the walls. Deckoviz GAVP is the easiest upgrade you can make to your restaurant, with the highest emotional and financial return.
            </p>

            <p className="text-[#4C6A83] text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              You are not just buying a product. You are entering a living system that makes your establishment more valuable, more unique, more storied every single day.
            </p>

            <p className="font-fraunces italic text-2xl sm:text-3xl text-[#0B2A45] font-medium pt-4">
              Bring incredible experiences to your guests with Deckoviz today.
            </p>

            <div className="pt-6">
              <button
                onClick={handleDemoClick}
                className="inline-flex items-center gap-3 px-9 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#0EA99B] to-[#123C63] text-white font-semibold text-base sm:text-lg shadow-2xl shadow-[#0EA99B]/40 hover:scale-105 transition-all duration-300"
              >
                Schedule your private GAVP demo
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 px-4 text-center text-[#7C93A6] text-sm relative z-10 border-t border-[#0B2A45]/10">
        <div className="font-fraunces italic font-medium text-xl text-[#0B2A45] flex items-center justify-center gap-2 mb-2">
          Deckoviz <span className="w-2 h-2 rounded-full bg-gradient-to-br from-[#2FC2AE] to-[#1B4C79]" />
        </div>
        <p>Deckoviz Space Labs — the AI-powered smart art frame platform.</p>
      </footer>
    </div>
  );
};

export default DeckovizForRestaurantsAndCafes;
