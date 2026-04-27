import React, { useState, useEffect } from 'react';
import { 
  Utensils, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Palette, 
  Music, 
  Users, 
  Globe, 
  Leaf, 
  MonitorPlay,
  Heart,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const restaurantImages = Array.from({ length: 20 }, (_, i) => `/images/h${i + 1}.png`);

// ─── Use Cases Data ───────────────────────────────────────────────────────────
const useCaseCategories = [
  {
    id: 'guest',
    label: 'Guest Experience',
    icon: '✦',
    color: 'from-rose-500 to-pink-600',
    accent: '#fb7185',
    items: [
      { title: 'Personalized welcome artworks for reserved guests', desc: 'Create personalised artworks to greet guests who have reserved tables. Display their names, portraits transformed into iconic art styles, or beautiful visual greetings as they arrive.' },
      { title: 'Birthday, anniversary & celebration moments', desc: 'Create personalised montages, artworks, and celebration visuals for birthdays, anniversaries, proposals, family gatherings, and special occasions.' },
      { title: 'Personalized art gifts for guests', desc: 'Capture beautiful moments of guests enjoying their meal and convert them into artistic keepsakes they can take home digitally or physically.' },
      { title: 'Guest memory wall', desc: 'Create a visual archive of memorable guests, celebrations, and moments that happened in your restaurant.' },
      { title: 'Returning guest recognition', desc: 'Vizzy remembers returning guests, their favourite dishes, preferences, dietary choices, anniversaries, and special details to create delightful repeat experiences.' },
      { title: 'Personalized recommendations', desc: 'Recommend dishes based on past preferences, food choices, taste profiles, and guest behaviour.' },
      { title: 'VIP guest experiences', desc: 'Create elevated personalised visual journeys for VIP guests, repeat customers, and premium diners.' },
      { title: 'Proposal & surprise planning support', desc: 'Use Deckoviz to help orchestrate surprise proposals, celebrations, birthday reveals, and memorable emotional moments.' },
    ],
  },
  {
    id: 'menu',
    label: 'Menu & Food',
    icon: '◈',
    color: 'from-orange-500 to-amber-500',
    accent: '#fb923c',
    items: [
      { title: 'Visual menu system', desc: 'Convert your menu into a fully visual menu where every dish is beautifully displayed and explained aesthetically.' },
      { title: 'Signature dish storytelling', desc: 'Each dish can tell its story: ingredients, inspiration, chef\'s vision, sourcing, local history, and preparation journey.' },
      { title: 'Live dish showcase loops', desc: 'Display stunning static visuals or cinematic video loops of dishes being prepared and served beautifully.' },
      { title: 'Daily specials & chef recommendations', desc: 'Update specials dynamically throughout the day without printing new menus.' },
      { title: 'Seasonal menu storytelling', desc: 'Launch seasonal dishes with beautiful visual campaigns and story-led presentation.' },
      { title: 'Pairing recommendations', desc: 'Suggest desserts, drinks, wines, and side dishes visually alongside main dishes.' },
      { title: 'Ingredient education', desc: 'Show freshness, sourcing stories, local farm partnerships, premium ingredients, and sustainability efforts.' },
      { title: 'Nutritional & macro information', desc: 'Display calories, macros, health details, dietary suitability, and allergen information beautifully.' },
      { title: 'Chef\'s table storytelling', desc: 'Let the chef explain the philosophy and creation behind a special tasting menu.' },
    ],
  },
  {
    id: 'ambience',
    label: 'Ambience & Mood',
    icon: '◎',
    color: 'from-violet-500 to-purple-600',
    accent: '#a78bfa',
    items: [
      { title: 'Dynamic ambience engine', desc: 'Vizzy becomes your ambience layer, adapting lights, visuals, sounds, and mood depending on customer profile, time of day, and occasion.' },
      { title: 'Morning vs evening mood shifts', desc: 'Different visual and sensory environments for brunch, lunch, dinner, and late-night dining.' },
      { title: 'Weekend vs weekday atmosphere', desc: 'Create entirely different restaurant moods depending on traffic and customer energy.' },
      { title: 'Romantic dinner mode', desc: 'Special visual ambience for couples, anniversaries, and romantic reservations.' },
      { title: 'Family dining mode', desc: 'Warmer, playful environments for families and group dinners.' },
      { title: 'Festival & holiday ambience', desc: 'Christmas, Valentine\'s Day, Diwali, New Year, EPL season, local festivals - your restaurant transforms instantly.' },
      { title: 'Weather-responsive ambience', desc: 'Rainy day moods, winter warmth, summer freshness - spaces that feel alive with context.' },
      { title: 'Local culture immersion', desc: 'Display beautiful visual narratives inspired by your city, region, history, and cultural identity.' },
    ],
  },
  {
    id: 'story',
    label: 'Storytelling',
    icon: '◉',
    color: 'from-teal-500 to-cyan-500',
    accent: '#2dd4bf',
    items: [
      { title: 'Your restaurant\'s story', desc: 'Tell the story of your restaurant: why it exists, your founder story, inspiration, family history, philosophy, and values.' },
      { title: 'Dish origin journeys', desc: 'Take guests on culinary journeys showing where dishes came from and how traditions evolved.' },
      { title: 'Local storytelling', desc: 'Tell stories of local ingredients, local producers, and regional culinary culture.' },
      { title: 'Cultural immersion experiences', desc: 'Create deeper cultural dining experiences for cuisine-specific restaurants.' },
      { title: 'Chef storytelling', desc: 'Introduce the chef, their inspirations, philosophy, and culinary journey.' },
      { title: 'Farm-to-table storytelling', desc: 'Show the journey from source to plate in immersive visual form.' },
      { title: 'Sustainability storytelling', desc: 'Communicate ethical sourcing, sustainability efforts, and social responsibility beautifully.' },
      { title: 'Brand campaigns', desc: 'Run stunning visual campaigns around new launches, collaborations, events, and chef specials.' },
    ],
  },
  {
    id: 'revenue',
    label: 'Revenue & Upselling',
    icon: '◆',
    color: 'from-emerald-500 to-green-500',
    accent: '#34d399',
    items: [
      { title: 'High-margin dish highlighting', desc: 'Strategically showcase premium dishes and high-margin offerings to influence ordering behaviour.' },
      { title: 'Dessert & drinks upselling', desc: 'Beautifully prompt guests toward desserts, signature drinks, pairings, and add-ons.' },
      { title: 'Limited-time offers', desc: 'Create urgency with elegant visual promotion of seasonal or limited-time dishes.' },
      { title: 'Upsell through appetite visuals', desc: 'Beautiful dish visuals increase appetite and conversion more than text ever can.' },
      { title: 'Premium experience positioning', desc: 'Increase perceived value of premium offerings through presentation and storytelling.' },
      { title: 'Event bookings promotion', desc: 'Promote private dining, event hosting, catering, and celebration packages.' },
      { title: 'Gift card promotions', desc: 'Beautifully display gift card and special dining package promotions.' },
    ],
  },
  {
    id: 'social',
    label: 'Social Proof',
    icon: '◇',
    color: 'from-sky-500 to-blue-500',
    accent: '#38bdf8',
    items: [
      { title: 'Live customer feedback wall', desc: 'Display customer reviews, testimonials, and positive feedback beautifully, alongside guest photos and artistic portraits.' },
      { title: 'Review generation prompts', desc: 'Encourage guests to leave reviews through elegant post-meal prompts.' },
      { title: 'Instagrammable moments', desc: 'Create highly shareable moments guests naturally want to photograph and post.' },
      { title: 'UGC wall', desc: 'Display customer-generated photos and social posts beautifully inside the restaurant.' },
      { title: 'Influencer & celebrity visits', desc: 'Celebrate notable guests and memorable visits with elegant visual displays.' },
      { title: 'Event memory reels', desc: 'Create montages from special nights, live music events, and tasting experiences.' },
    ],
  },
  {
    id: 'kids',
    label: 'Kids & Families',
    icon: '◐',
    color: 'from-yellow-400 to-orange-400',
    accent: '#fbbf24',
    items: [
      { title: 'Storytelling modes for children', desc: 'Visual stories, bedtime-style stories, and playful educational content for family dining.' },
      { title: 'Interactive quiz modes', desc: 'Fun games, quizzes, and playful experiences for kids and adults.' },
      { title: 'Waiting-time entertainment', desc: 'Reduce perceived waiting time through engaging storytelling and interactive visual experiences.' },
      { title: 'Family memory gifts', desc: 'Turn family dinners into beautiful keepsake artworks.' },
    ],
  },
  {
    id: 'ops',
    label: 'Operations',
    icon: '◑',
    color: 'from-slate-400 to-gray-500',
    accent: '#94a3b8',
    items: [
      { title: 'Beautiful signage system', desc: 'Use Deckoviz as aesthetic, premium signage for directions, reservations, policies, and information.' },
      { title: 'Queue & waiting management', desc: 'Elegant waiting lists, estimated wait times, and guest communication.' },
      { title: 'Reservation display wall', desc: 'Beautifully manage reservations and premium guest greetings.' },
      { title: 'Event announcements', desc: 'Live music nights, tasting events, chef specials, private events, and upcoming launches.' },
      { title: 'Staff recognition wall', desc: 'Celebrate your team, chefs, anniversaries, and internal culture.' },
      { title: 'Recruitment wall', desc: 'Hiring announcements presented beautifully and on-brand.' },
      { title: 'Vendor & partner showcases', desc: 'Highlight partnerships, farms, suppliers, wineries, and collaborators.' },
    ],
  },
];

const journeySteps = [
  'A guest enters and is greeted personally.',
  'They see their table waiting with a personalised welcome.',
  'The menu comes alive visually.',
  'Their dish tells its story.',
  'The ambience shifts with the evening.',
  'Their children are entertained.',
  'Their anniversary becomes memorable.',
  'They leave with a personalised artwork of the evening.',
];

// ─── UseCasesJourney Component ────────────────────────────────────────────────
const UseCasesJourney = ({ onDemo }: { onDemo: () => void }) => {
  const [activeTab, setActiveTab] = useState(0);
  const cat = useCaseCategories[activeTab];

  return (
    <section className="relative py-32 z-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#0a0a10] to-black/60 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] rounded-full blur-[160px]"
          style={{ background: `radial-gradient(ellipse, ${cat.accent}18 0%, transparent 70%)`, transition: 'background 0.8s ease' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: cat.accent }} />
            <span className="text-sm font-medium tracking-wider text-orange-200 uppercase">An Evolving List of Use Cases</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-semibold mb-8 leading-tight">
            Deckoviz becomes your restaurant's{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-purple-400">
              everything layer
            </span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-400 leading-relaxed">
            <p>Deckoviz becomes your restaurant's visual layer, story layer, ambience layer, memory layer, and guest experience and delight system.</p>
            <p>It helps transform a restaurant from a place people eat at into a place people remember, talk about, and return to.</p>
            <p className="text-gray-500 text-base">This is a living list of use cases we keep expanding as we add and discover new ways restaurants can use Deckoviz to create better customer experiences, stronger brand recall, and more memorable spaces.</p>
          </div>
        </motion.div>

        {/* Category Tab Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-3 justify-center mb-16"
        >
          {useCaseCategories.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-400 border ${
                activeTab === i
                  ? 'text-white border-transparent shadow-lg scale-105'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              style={activeTab === i ? {
                background: `linear-gradient(135deg, ${c.accent}33, ${c.accent}11)`,
                borderColor: `${c.accent}55`,
                boxShadow: `0 0 20px ${c.accent}33`,
                color: c.accent,
              } : {}}
            >
              <span className="text-base">{c.icon}</span>
              {c.label}
            </button>
          ))}
        </motion.div>

        {/* Active Category Use Cases Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-10">
            <span className="text-4xl">{cat.icon}</span>
            <div>
              <h3 className="text-2xl md:text-3xl font-['Playfair_Display'] font-semibold text-white">{cat.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{cat.items.length} use cases</p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cat.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                className="group relative p-6 rounded-2xl border border-white/8 bg-white/4 hover:bg-white/8 transition-all duration-400 overflow-hidden cursor-default"
                style={{ borderColor: `${cat.accent}18` }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 30% 40%, ${cat.accent}12 0%, transparent 70%)` }} />
                <div className="absolute top-0 left-0 w-0.5 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to bottom, transparent, ${cat.accent}, transparent)` }} />
                <div className="relative z-10">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-3 text-xs font-bold"
                    style={{ background: `${cat.accent}22`, color: cat.accent }}>
                    {(idx + 1).toString().padStart(2, '0')}
                  </div>
                  <h4 className="text-base font-semibold text-white mb-2 leading-snug group-hover:text-white transition-colors"
                    style={{ color: undefined }}
                  >{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Total count strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-6 py-8 mb-24 border-y border-white/5"
        >
          {useCaseCategories.map((c, i) => (
            <button key={c.id} onClick={() => setActiveTab(i)}
              className="flex flex-col items-center gap-1 group transition-all duration-300">
              <span className="text-xl transition-transform group-hover:scale-125 duration-300">{c.icon}</span>
              <span className="text-xs text-gray-600 group-hover:text-gray-300 transition-colors">{c.items.length}</span>
            </button>
          ))}
          <div className="h-8 w-px bg-white/10" />
          <span className="text-sm text-gray-500">
            <span className="text-2xl font-['Playfair_Display'] text-white font-semibold">
              {useCaseCategories.reduce((a, c) => a + c.items.length, 0)}
            </span>
            {' '}total use cases & growing
          </span>
        </motion.div>

        {/* The Full Deckoviz Restaurant Experience — Cinematic Closing */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-purple-500/5 to-rose-500/5 rounded-3xl pointer-events-none" />
          <div className="border border-white/8 rounded-3xl p-10 md:p-16 backdrop-blur-sm">
            <div className="text-center mb-14">
              <h3 className="text-3xl md:text-5xl font-['Playfair_Display'] font-semibold text-white mb-4">
                The Full Deckoviz Restaurant Experience
              </h3>
              <p className="text-gray-500 text-lg">The real magic happens when all of this works together.</p>
            </div>

            {/* Journey Steps — staggered narrative */}
            <div className="relative max-w-2xl mx-auto mb-16">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/40 via-rose-500/40 to-purple-500/40" />
              {journeySteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative flex items-start gap-6 mb-6 pl-2"
                >
                  <div className="relative flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10"
                    style={{
                      background: `conic-gradient(from ${i * 45}deg, #fb923c, #f43f5e, #a855f7, #fb923c)`,
                    }}>
                    <div className="w-6 h-6 rounded-full bg-[#0a0a10] flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{i + 1}</span>
                    </div>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed pt-1">{step}</p>
                </motion.div>
              ))}
            </div>

            {/* Closing statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-6 max-w-3xl mx-auto"
            >
              <p className="text-2xl text-gray-300 font-light">That is no longer just dinner.</p>
              <p className="text-3xl md:text-4xl font-['Playfair_Display'] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-purple-400">
                That becomes an experience.
              </p>
              <p className="text-2xl text-gray-300 font-light">And experiences are what people remember.</p>
              <div className="pt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onDemo}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg text-black bg-white shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] transition-all duration-400"
                >
                  <span>See It In Your Restaurant</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};



const DeckovizForRestaurantsAndCafes = () => {
  const navigate = useNavigate();
  const [currentImg, setCurrentImg] = useState(0);
  const [prevImg, setPrevImg] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevImg(currentImg);
      setFading(true);
      setTimeout(() => {
        setCurrentImg(i => (i + 1) % restaurantImages.length);
        setFading(false);
        setPrevImg(null);
      }, 600);
    }, 2800);
    return () => clearInterval(timer);
  }, [currentImg]);

  const handleDemoClick = () => {
    navigate('/contact');
  };

  return (
    <div className="bg-[#0f0f13] min-h-screen text-gray-100 font-sans selection:bg-orange-500/30">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Animated Gradients */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-orange-600/20 rounded-full blur-[120px] mix-blend-screen" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-rose-600/20 rounded-full blur-[150px] mix-blend-screen" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen" 
          />

          {/* Curved Grid Pattern - Barrel Distortion Effect */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none"
            viewBox="0 0 1000 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <g stroke="white" strokeWidth="1" fill="none">
              {Array.from({ length: 25 }).map((_, i) => {
                const x = (i / 24) * 1000;
                const curvature = Math.sin((i / 24) * Math.PI) * 120;
                return (
                  <path
                    key={`v-${i}`}
                    d={`M ${x} 0 Q ${x + curvature} 400 ${x} 800`}
                  />
                );
              })}
              {Array.from({ length: 20 }).map((_, i) => {
                const y = (i / 19) * 800;
                const distanceFromCenter = Math.abs(y - 400) / 400;
                const compression = 1 - distanceFromCenter * 0.7;
                const curve = 150 * (1 - compression);
                return (
                  <path
                    key={`h-${i}`}
                    d={`M 0 ${y} Q ${250 + curve} ${y} 500 ${y} T 1000 ${y}`}
                  />
                );
              })}
            </g>
          </svg>

          {/* Floating Sparkles/Stars */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                scale: Math.random() * 0.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.2
              }}
              animate={{
                y: [null, Math.random() * -100 - 50],
                opacity: [null, Math.random() * 0.8 + 0.4, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
              style={{
                boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.4)"
              }}
            />
          ))}

          {/* Vignette overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(15,15,19,1)_80%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-sm font-medium tracking-wider text-orange-200 uppercase">Deckoviz For Restaurants</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-['Playfair_Display'] font-semibold mb-8 leading-tight tracking-tight"
          >
            The New Standard in <br className="hidden md:block" />
            <motion.span 
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-purple-500 bg-[length:200%_auto]"
            >
              Dining Atmosphere
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-xl md:text-3xl text-gray-300 font-light max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Elevate your establishment from a "place to eat" to a <span className="italic text-white">"place to feel something more"</span>.
          </motion.p>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 max-w-5xl mx-auto text-left shadow-2xl">
            <h3 className="text-2xl font-semibold mb-4 text-white">With the Deckoviz GAVP</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Deckoviz, the world's first Generative Ambiance and Visual Platform (GAVP), is a multi-sensory AI infrastructure that combines AAI-driven creation, intelligent curation, ambient display into a single, seamless ecosystem.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              It uses our proprietary AI, Vizzy, to learn your brand's aesthetic and rhythm, ensuring your walls are always in sync with the soul of your restaurant.
            </p>
          </div>
        </div>
      </section>

      {/* Core Problems We Solve */}
      <section className="py-24 relative z-10 bg-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-semibold mb-6">Core Problems We Solve</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-rose-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'The "Dead Space" Deficit',
                desc: 'Most restaurant walls are passive assets that produce zero revenue. Deckoviz converts them into high-performing, revenue-generating surfaces.',
                icon: <TrendingUp className="w-8 h-8 text-orange-400" />
              },
              {
                title: 'Operational Friction',
                desc: 'Eliminate the "design-to-print" bottleneck. No more waiting for designers, reprinting menus, or dealing with outdated signage.',
                icon: <Clock className="w-8 h-8 text-rose-400" />
              },
              {
                title: 'Atmospheric Stagnation',
                desc: 'Static décor cannot adapt. Deckoviz solves the "vibe gap" by automatically transitioning your space from a bright brunch energy to an intimate dinner glow.',
                icon: <Sparkles className="w-8 h-8 text-purple-400" />
              },
              {
                title: 'Visual Noise vs. Resonance',
                desc: 'Unlike traditional digital signage that feels like "ads," Deckoviz creates ambient discovery—visuals that feel like art, not persuasion.',
                icon: <Palette className="w-8 h-8 text-pink-400" />
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-start gap-6">
                  <div className="p-4 bg-black/50 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-white">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Deckoviz */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-semibold mb-8 leading-tight">
                Why Deckoviz <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">for Restaurants?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-12 font-light">
                Your establishment is a brand, not just a kitchen. Deckoviz gives you the power to:
              </p>
              
              <div className="space-y-8">
                {[
                  {
                    title: 'Command Premium Prices',
                    desc: 'High-end atmosphere justifies higher margins.'
                  },
                  {
                    title: 'Drive Emotional ROI',
                    desc: 'Guests return to places that made them feel something.'
                  },
                  {
                    title: 'Future-Proof Your Interior',
                    desc: 'Your space receives monthly updates with new art styles, features, and AI models. You are investing in a platform that keeps becoming.'
                  }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="mt-1 w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 flex items-center justify-center shrink-0">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-purple-500/20 blur-3xl rounded-full" />
              <div className="relative bg-white/5 border border-white/10 rounded-3xl p-4 backdrop-blur-xl">
                {/* Main rotating image */}
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
                  {/* Previous image fading out */}
                  {prevImg !== null && (
                    <img
                      key={`prev-${prevImg}`}
                      src={restaurantImages[prevImg]}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.6s ease' }}
                    />
                  )}
                  {/* Current image */}
                  <img
                    key={`curr-${currentImg}`}
                    src={restaurantImages[currentImg]}
                    alt={`Deckoviz dining atmosphere ${currentImg + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: fading ? 1 : 1, transition: 'opacity 0.6s ease' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="flex items-center gap-3 text-orange-400 mb-2">
                      <Sparkles className="w-5 h-5" />
                      <span className="text-sm font-semibold tracking-wider uppercase">Living System</span>
                    </div>
                    <p className="text-xl text-white font-['Playfair_Display']">Transforming spaces with intelligent design</p>
                  </div>
                  {/* Dot indicators */}
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5">
                    {restaurantImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImg(i)}
                        className={`w-1.5 rounded-full transition-all duration-300 ${
                          i === currentImg ? 'h-5 bg-orange-400' : 'h-1.5 bg-white/30 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {/* Thumbnail strip */}
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                  {restaurantImages.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImg(i)}
                      className={`shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        i === currentImg ? 'border-orange-400 scale-105' : 'border-transparent opacity-50 hover:opacity-80'
                      }`}
                    >
                      <img src={src} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 15 High-Impact Use Cases */}
      <section className="py-24 relative z-10 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-semibold mb-6">15 High-Impact Use Cases</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Discover how Deckoviz transforms every aspect of your dining experience.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Dynamic AI Menus', desc: 'Update specials and pricing instantly via voice or tap—zero printing costs.', icon: <Utensils /> },
              { title: '"Vizzy" Dish Transformation', desc: 'Turn basic kitchen photos into professional, appetite-building product art.', icon: <Sparkles /> },
              { title: 'Silent Hosting', desc: 'Welcome guests with ambient visuals and light that set the mood before a word is spoken.', icon: <Users /> },
              { title: 'Culinary Storytelling', desc: 'Display the "Farm-to-Table" journey, chef inspirations, or ingredient origins.', icon: <Leaf /> },
              { title: 'Instagram-Ready Walls', desc: 'Create naturally photogenic spaces that guests want to share on social media.', icon: <Heart /> },
              { title: 'Queue Engagement', desc: 'Reduce perceived wait times with visual trivia or brand narratives.', icon: <Clock /> },
              { title: 'Celebration Mode', desc: 'Instantly activate personalized anniversary or birthday montages for VIP tables.', icon: <Sparkles /> },
              { title: 'Time-Aware Transitions', desc: 'Automated shifts for morning serenity, lunch energy, and late-night intimacy.', icon: <Clock /> },
              { title: 'Visual Pairings', desc: 'Promote high-margin wine and spirit pairings alongside signature dishes.', icon: <Utensils /> },
              { title: 'Staff Training Surfaces', desc: 'Use back-of-house units for visual plating guides and consistency references.', icon: <Users /> },
              { title: 'Multi-Site Synchronization', desc: 'Manage the brand aesthetic across 50 locations from one central dashboard.', icon: <Globe /> },
              { title: 'Legacy & Roots', desc: 'Highlight the history and heritage of your establishment through archival-style AI art.', icon: <MonitorPlay /> },
              { title: 'Interactive Art loops', desc: 'Keep the atmosphere fresh with generative art that never repeats exactly the same way.', icon: <Palette /> },
              { title: 'In-Store Marketing Clips', desc: 'Create and run high-quality promo videos for your next event or location.', icon: <MonitorPlay /> },
              { title: 'Ambient Music Sync', desc: 'Pair visuals with curated soundscapes to create a 360-degree sensory experience.', icon: <Music /> },
            ].map((useCase, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.15 }}
                className="group p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  {React.cloneElement(useCase.icon as React.ReactElement, { size: 20 })}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{useCase.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{useCase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 12 Unrivaled Benefits */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-semibold mb-6">12 Unrivaled Benefits</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-rose-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              { title: 'Increased Ticket Size', desc: 'Visually upselling desserts and specials leads to higher average order values.' },
              { title: 'Faster Table Turnover', desc: 'Optimized visuals can subtly influence the pace and flow of the dining room.' },
              { title: 'Zero Operational Overhead', desc: 'Updates happen in seconds, not days, with no technical skills required.' },
              { title: 'Brand Consistency', desc: 'Ensure every location feels like "Your Brand" while maintaining local character.' },
              { title: 'Cost Elimination', desc: 'Stop spending on physical menus, posters, and seasonal décor.' },
              { title: 'Higher Dwell Time', desc: 'Guests linger longer in spaces that feel intentional and comfortable.' },
              { title: 'Instant Experience Upgrade', desc: 'Transform your interior without a single day of renovation or downtime.' },
              { title: 'Data-Informed Curation', desc: 'The system learns which visuals resonate best with your specific clientele over time.' },
              { title: 'Employee Retention', desc: 'A high-tech, beautiful workspace improves staff pride and overall morale.' },
              { title: 'Sustainability', desc: 'Digital updates drastically reduce the paper waste and carbon footprint of your marketing.' },
              { title: 'Premium Positioning', desc: 'Signals to investors and guests that your establishment is at the cutting edge of hospitality.' },
              { title: 'Dual-Functionality', desc: 'It\'s the only high-end art frame that doubles as a full Google TV for events.' },
            ].map((benefit, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (idx % 2) * 0.2 }}
                className="flex gap-4 border-b border-white/10 pb-6 group hover:border-orange-500/50 transition-colors"
              >
                <span className="text-3xl font-['Playfair_Display'] text-orange-500/50 group-hover:text-orange-400 transition-colors font-bold italic">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-200 transition-colors">{benefit.title}</h4>
                  <p className="text-gray-400">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          USE CASES JOURNEY SECTION
      ================================================================ */}
      <UseCasesJourney onDemo={handleDemoClick} />

      {/* CTA Section */}

      <section className="py-32 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-900/20 pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto px-6 text-center relative z-20"
        >
          <h2 className="text-5xl md:text-7xl font-['Playfair_Display'] font-semibold mb-8 text-white">
            The Final Word: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">Why Now?</span>
          </h2>
          
          <div className="space-y-6 text-xl text-gray-300 font-light leading-relaxed mb-12">
            <p>
              The future of dining isn't just about what's on the plate; it's about the stories told on the walls. Deckoviz GAVP is the easiest upgrade you can make to your restaurant with the highest emotional and financial return.
            </p>
            <p>
              You are not just buying a product; you are entering a living system that makes your establishment more valuable, more unique, more storied every single day.
            </p>
            <p className="text-2xl text-white font-medium italic mt-8">
              Bring incredible experiences to your guests with Deckoviz today!
            </p>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDemoClick}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold text-lg overflow-hidden shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] transition-shadow duration-500"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative group-hover:text-white transition-colors duration-300">Schedule Your Private GAVP Demo</span>
            <ArrowRight className="relative w-5 h-5 group-hover:text-white transition-colors duration-300 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default DeckovizForRestaurantsAndCafes;
