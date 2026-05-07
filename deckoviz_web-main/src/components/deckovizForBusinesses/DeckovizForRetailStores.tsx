import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, TrendingUp, Clock, Sparkles, Globe, Leaf, ShoppingBag, Users, BarChart3, Shield, ChevronDown, ChevronUp } from 'lucide-react';

// ─── Use Cases Data ───────────────────────────────────────────────────────────
const retailUseCaseCategories = [
  {
    id: 'customer',
    label: 'Customer Experience & Personalisation',
    icon: '✦',
    color: 'from-violet-500 to-indigo-600',
    accent: '#a78bfa',
    items: [
      { title: 'Personalized customer greetings', desc: 'Welcome VIP customers, repeat buyers, and special guests with personalised visual greetings and tailored experiences.' },
      { title: 'Returning customer recognition', desc: 'Vizzy remembers customer preferences, past purchases, favourite styles, sizes, and shopping habits to create delightful repeat experiences.' },
      { title: 'Personalized recommendations', desc: 'Suggest products based on browsing history, purchase patterns, personal taste, and customer profiles.' },
      { title: 'Occasion-based shopping experiences', desc: 'Birthdays, anniversaries, weddings, gifting, festive shopping - create personalised shopping journeys around important life moments.' },
      { title: 'VIP shopping mode', desc: 'Create elevated premium experiences for high-value customers with customised visuals, concierge assistance, and tailored product journeys.' },
      { title: 'Personal stylist support', desc: 'Vizzy becomes a personal shopping assistant helping customers discover products that suit their style, needs, and goals.' },
      { title: 'Gifting recommendation experiences', desc: 'Help customers find the perfect gift with guided visual recommendations based on recipient type and occasion.' },
      { title: 'Personalised post-purchase art gifts', desc: 'Turn a memorable purchase moment into a personalised visual keepsake customers can take home.' },
    ],
  },
  {
    id: 'product',
    label: 'Product Display & Merchandising',
    icon: '◈',
    color: 'from-amber-500 to-orange-500',
    accent: '#f59e0b',
    items: [
      { title: 'Dynamic product showcases', desc: 'Display products in stunning visual formats that elevate perceived value and customer curiosity.' },
      { title: 'Product visualization wall', desc: 'Show products in use, in real environments, and across multiple lifestyle contexts.' },
      { title: 'Before-and-after transformations', desc: 'Perfect for fashion, beauty, furniture, home décor, fitness, and wellness retail.' },
      { title: 'Visual product storytelling', desc: 'Move beyond specs and show why the product matters, how it was made, and what it represents.' },
      { title: 'New arrivals spotlight', desc: 'Launch new collections and fresh inventory with dynamic campaigns that feel exciting and premium.' },
      { title: 'High-margin product highlighting', desc: 'Strategically feature premium products and high-margin items to guide customer attention.' },
      { title: 'Limited-edition collection launches', desc: 'Create urgency and exclusivity around drops, collaborations, and seasonal releases.' },
      { title: 'Cross-sell & upsell prompts', desc: 'Recommend complementary products beautifully at the right moment.' },
      { title: 'Product comparison experiences', desc: 'Help customers understand differences between options visually and intuitively.' },
      { title: 'Interactive catalog mode', desc: 'Customers can browse your extended catalog visually, even for products not physically present in-store.' },
    ],
  },
  {
    id: 'brand',
    label: 'Brand Storytelling & Identity',
    icon: '◉',
    color: 'from-rose-500 to-pink-600',
    accent: '#fb7185',
    items: [
      { title: 'Your brand story', desc: 'Tell the story of your store: your founder journey, inspiration, values, philosophy, and mission.' },
      { title: 'Craftsmanship storytelling', desc: 'Show how products are made, the hands behind them, the materials used, and the care involved.' },
      { title: 'Product origin stories', desc: 'Bring transparency and meaning to sourcing, design, and production journeys.' },
      { title: 'Designer & creator storytelling', desc: 'Introduce designers, makers, artists, and creators behind your products.' },
      { title: 'Sustainability storytelling', desc: 'Communicate ethical sourcing, eco-conscious decisions, and sustainability efforts beautifully.' },
      { title: 'Local maker support stories', desc: 'Highlight local artisans, regional makers, and community collaborations.' },
      { title: 'Heritage and legacy storytelling', desc: 'Especially powerful for luxury, handcrafted, legacy, and family-owned retail businesses.' },
      { title: 'Seasonal campaign storytelling', desc: 'Build emotional campaigns around festivals, launches, gifting seasons, and special occasions.' },
    ],
  },
  {
    id: 'ambience',
    label: 'Ambience, Mood & Atmosphere',
    icon: '◎',
    color: 'from-teal-500 to-cyan-500',
    accent: '#2dd4bf',
    items: [
      { title: 'Dynamic ambience engine', desc: 'Vizzy becomes your store\'s mood layer, adapting visuals, sounds, lighting, and atmosphere depending on customer flow, season, and time of day.' },
      { title: 'Morning vs evening retail moods', desc: 'Create different shopping energy for daytime browsing versus evening premium shopping.' },
      { title: 'Weekend vs weekday experience shifts', desc: 'Adjust visual and sensory experiences depending on customer traffic patterns.' },
      { title: 'Festival & holiday transformation', desc: 'Diwali, Christmas, Eid, Valentine\'s Day, wedding season, New Year, local festivals - your store transforms instantly.' },
      { title: 'Weather-responsive ambience', desc: 'Rainy day warmth, summer freshness, winter luxury - your store feels context-aware and alive.' },
      { title: 'Local culture immersion', desc: 'Reflect your city, community, and cultural identity through evolving visual storytelling.' },
      { title: 'Luxury premium mode', desc: 'Elevate the visual environment for premium shopping experiences.' },
      { title: 'Kids-friendly family mode', desc: 'More playful, engaging environments for family-heavy shopping hours.' },
    ],
  },
  {
    id: 'conversion',
    label: 'Conversion, Revenue & Sales',
    icon: '◆',
    color: 'from-emerald-500 to-green-500',
    accent: '#34d399',
    items: [
      { title: 'High-conversion visual merchandising', desc: 'Guide customer attention intentionally toward products that matter most.' },
      { title: 'Upselling through emotional context', desc: 'Help customers emotionally connect with premium purchases before they rationalise them.' },
      { title: 'Limited-time offer campaigns', desc: 'Beautifully present urgency-driven offers without cheapening brand perception.' },
      { title: 'Bundle promotion displays', desc: 'Show complete product ecosystems rather than isolated items.' },
      { title: 'Membership & loyalty program promotion', desc: 'Promote loyalty systems elegantly and consistently.' },
      { title: 'Gift cards & gifting packages', desc: 'Highlight gift experiences beautifully, especially during festive seasons.' },
      { title: 'Pre-order and waitlist campaigns', desc: 'Build anticipation for upcoming launches and exclusive releases.' },
      { title: 'Event and workshop promotion', desc: 'Promote styling sessions, launches, tastings, masterclasses, or in-store experiences.' },
    ],
  },
  {
    id: 'social',
    label: 'Social Proof & Trust Building',
    icon: '◇',
    color: 'from-sky-500 to-blue-500',
    accent: '#38bdf8',
    items: [
      { title: 'Live customer review wall', desc: 'Display customer reviews, testimonials, and real customer experiences beautifully.' },
      { title: 'UGC wall', desc: 'Show customer photos, styling inspiration, social posts, and authentic product use.' },
      { title: 'Influencer and celebrity visits', desc: 'Celebrate notable visitors and endorsements in a premium, tasteful way.' },
      { title: 'Success story displays', desc: 'For transformation-heavy businesses like beauty, fitness, design, or wellness retail.' },
      { title: 'Community highlights', desc: 'Feature loyal customers, creators, and local ambassadors.' },
      { title: 'Review generation prompts', desc: 'Encourage happy customers to leave reviews through elegant prompts.' },
    ],
  },
  {
    id: 'interactive',
    label: 'Interactive Shopping Experiences',
    icon: '◐',
    color: 'from-fuchsia-500 to-indigo-500',
    accent: '#d946ef',
    items: [
      { title: 'Virtual styling inspiration', desc: 'Show how products work together in complete lifestyle or styling contexts.' },
      { title: '"How it would look on you" visualization', desc: 'Fashion, jewellery, beauty, eyewear, accessories - help customers imagine ownership.' },
      { title: 'Home visualization mode', desc: 'Perfect for furniture, décor, interiors, and design stores.' },
      { title: 'Product education experiences', desc: 'Explain technical products beautifully without overwhelming customers.' },
      { title: 'Interactive quiz modes', desc: 'Help customers discover the right product through guided quizzes and playful discovery.' },
      { title: 'Guided buying journeys', desc: 'Especially useful for high-consideration purchases like electronics, furniture, luxury, or gifting.' },
    ],
  },
  {
    id: 'ops',
    label: 'Operations, Signage & Utility',
    icon: '◑',
    color: 'from-slate-400 to-gray-500',
    accent: '#94a3b8',
    items: [
      { title: 'Beautiful signage system', desc: 'Use Deckoviz for premium signage, directions, policies, store information, and customer guidance.' },
      { title: 'Queue and appointment management', desc: 'Elegant waiting experiences for salons, boutiques, premium stores, and service-led retail.' },
      { title: 'Appointment and consultation displays', desc: 'Perfect for personalised shopping appointments and consultations.' },
      { title: 'Staff recognition wall', desc: 'Celebrate your team, top performers, anniversaries, and internal culture.' },
      { title: 'Recruitment wall', desc: 'Hiring announcements presented beautifully and on-brand.' },
      { title: 'Franchise consistency layer', desc: 'Maintain visual and storytelling consistency across multiple store locations.' },
      { title: 'Vendor and partner showcases', desc: 'Highlight collaborators, suppliers, creators, and brand partnerships.' },
    ],
  },
  {
    id: 'events',
    label: 'Events, Launches & Community',
    icon: '✧',
    color: 'from-orange-500 to-red-500',
    accent: '#fb923c',
    items: [
      { title: 'Collection launch experiences', desc: 'Turn product launches into real in-store events people remember.' },
      { title: 'Workshop and event storytelling', desc: 'Masterclasses, launches, tasting events, community gatherings - make them visually rich.' },
      { title: 'Seasonal campaign activations', desc: 'Create immersive festive retail moments that drive footfall and recall.' },
      { title: 'Community event hosting', desc: 'Use your store as a living community and storytelling space.' },
    ],
  },
];

// ─── Use Cases Journey Component ─────────────────────────────────────────────
const RetailUseCasesJourney = ({ onDemo }: { onDemo: () => void }) => {
  const [activeTab, setActiveTab] = useState(0);
  const cat = retailUseCaseCategories[activeTab];
  const totalUseCases = retailUseCaseCategories.reduce((a, c) => a + c.items.length, 0);

  return (
    <section className="relative py-32 z-10 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[70vh] rounded-full blur-[180px] transition-all duration-1000"
          style={{ background: `radial-gradient(ellipse, ${cat.accent}14 0%, transparent 70%)` }}
        />
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
            <span className="text-sm font-medium tracking-wider text-violet-200 uppercase">An Evolving List of Use Cases</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-semibold mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
            Deckoviz becomes your store's{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400">
              everything layer
            </span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-400 leading-relaxed">
            <p>Deckoviz becomes your store's visual layer, storytelling layer, ambience layer, brand layer, and customer delight system.</p>
            <p>Retail is no longer just about selling products. Products are increasingly commodities. What customers remember is how your store made them feel, how clearly they understood your brand, and whether the experience felt worth returning for.</p>
            <p className="text-gray-500 text-base">Deckoviz helps transform retail stores from transactional spaces into immersive, memorable, high-conversion environments.</p>
            <p className="text-gray-500 text-base">This is a living list of use cases we keep expanding as we build, add and discover new ways retail spaces can use Deckoviz to create stronger customer engagement, higher conversions, better brand recall, and more delightful in-store experiences.</p>
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
          {retailUseCaseCategories.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 border ${
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

        {/* Active Category Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-10">
              <span className="text-4xl">{cat.icon}</span>
              <div>
                <h3 className="text-2xl md:text-3xl font-['Playfair_Display'] font-semibold text-white" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>{cat.label}</h3>
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
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className="group relative p-6 rounded-2xl border bg-white/4 hover:bg-white/8 transition-all duration-300 overflow-hidden cursor-default"
                  style={{ borderColor: `${cat.accent}20` }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 30% 40%, ${cat.accent}10 0%, transparent 70%)` }} />
                  <div className="absolute top-0 left-0 w-0.5 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to bottom, transparent, ${cat.accent}, transparent)` }} />
                  <div className="relative z-10">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-3 text-xs font-bold"
                      style={{ background: `${cat.accent}22`, color: cat.accent }}>
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>
                    <h4 className="text-base font-semibold text-white mb-2 leading-snug">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Total count strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 py-8 mb-24 border-y border-white/5"
        >
          {retailUseCaseCategories.map((c, i) => (
            <button key={c.id} onClick={() => setActiveTab(i)}
              className="flex flex-col items-center gap-1 group transition-all duration-300">
              <span className="text-xl transition-transform group-hover:scale-125 duration-300">{c.icon}</span>
              <span className="text-xs text-gray-600 group-hover:text-gray-300 transition-colors">{c.items.length}</span>
            </button>
          ))}
          <div className="h-8 w-px bg-white/10" />
          <span className="text-sm text-gray-500">
            <span className="text-2xl font-['Playfair_Display'] text-white font-semibold" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>{totalUseCases}</span>
            {' '}total use cases & growing
          </span>
        </motion.div>

        {/* The Full Deckoviz Retail Experience — Cinematic Closing */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-amber-500/5 rounded-3xl pointer-events-none" />
          <div className="border border-white/8 rounded-3xl p-10 md:p-16 backdrop-blur-sm">
            <div className="text-center mb-14">
              <h3 className="text-3xl md:text-5xl font-['Playfair_Display'] font-semibold text-white mb-4" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                The Full Deckoviz in Retail Experience
              </h3>
              <p className="text-gray-500 text-lg">The real magic happens when all of this works together.</p>
            </div>

            {/* Journey Steps */}
            <div className="relative max-w-2xl mx-auto mb-16">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/40 via-fuchsia-500/40 to-amber-500/40" />
              {[
                'A customer walks in and feels your brand instantly.',
                'Products are not just displayed - they are understood.',
                'Stories replace generic selling.',
                'Visuals guide attention naturally.',
                'The store adapts to the season, the customer, and the moment.',
                'Every purchase feels more meaningful.',
                'Every visit feels worth remembering.',
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative flex items-start gap-6 mb-6 pl-2"
                >
                  <div className="relative flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10"
                    style={{ background: `conic-gradient(from ${i * 51}deg, #7c3aed, #a855f7, #d946ef, #f59e0b, #7c3aed)` }}>
                    <div className="w-6 h-6 rounded-full bg-[#0a0a10] flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{i + 1}</span>
                    </div>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed pt-1">{step}</p>
                </motion.div>
              ))}
            </div>

            {/* Closing Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-6 max-w-3xl mx-auto"
            >
              <p className="text-2xl text-gray-300 font-light">That is no longer just shopping.</p>
              <p className="text-3xl md:text-4xl font-['Playfair_Display'] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                That becomes an experience.
              </p>
              <p className="text-2xl text-gray-300 font-light">And experiences are what people come back for.</p>
              <div className="pt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onDemo}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg text-black bg-white shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] transition-all duration-300"
                >
                  <span>See It In Your Store</span>
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

export { RetailUseCasesJourney, retailUseCaseCategories };
export default RetailUseCasesJourney;
