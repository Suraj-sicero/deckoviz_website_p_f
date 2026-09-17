import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// ─── Use Cases Data ───────────────────────────────────────────────────────────
const retailUseCaseCategories = [
  {
    id: 'customer',
    label: 'Customer Experience & Personalisation',
    icon: '✦',
    color: 'from-violet-500 to-indigo-600',
    accent: '#0EA99B',
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
    accent: '#0A8378',
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
    accent: '#1B4C79',
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
    accent: '#0EA99B',
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
    accent: '#2FC2AE',
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
    accent: '#1B4C79',
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
    accent: '#0EA99B',
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
    accent: '#0A8378',
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
    accent: '#2FC2AE',
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
    <section className="relative py-24 z-10 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-[#0A8378] tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#2FC2AE] animate-pulse-dot" />
            An Evolving List of Use Cases
          </div>
          <h2 className="font-fraunces text-4xl sm:text-6xl font-medium text-[#0B2A45] leading-tight">
            Deckoviz becomes your store's <span className="grad-text">everything layer</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-base md:text-lg text-[#4C6A83] leading-relaxed">
            <p>Deckoviz becomes your store's visual layer, storytelling layer, ambience layer, brand layer, and customer delight system.</p>
            <p>Retail is no longer just about selling products. What customers remember is how your store made them feel, how clearly they understood your brand, and whether the experience felt worth returning for.</p>
          </div>
        </motion.div>

        {/* Category Tab Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {retailUseCaseCategories.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 border ${
                activeTab === i
                  ? 'bg-gradient-to-r from-[#DDF6F0] to-white border-[#0EA99B] text-[#0A8378] shadow-md scale-105'
                  : 'glass-card border-white/80 text-[#0B2A45] hover:border-[#0EA99B]'
              }`}
            >
              <span className="text-base text-[#0EA99B]">{c.icon}</span>
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
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl text-[#0EA99B]">{cat.icon}</span>
              <div>
                <h3 className="font-fraunces text-2xl md:text-3xl font-medium text-[#0B2A45]">{cat.label}</h3>
                <p className="text-xs text-[#0A8378] font-semibold mt-0.5">{cat.items.length} use cases</p>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-[#0EA99B]/30 to-transparent ml-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="glass-card rounded-2xl p-6 border border-white/80 shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-[#DDF6F0] text-[#0A8378] flex items-center justify-center mb-3 text-xs font-bold border border-white">
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>
                    <h4 className="font-fraunces text-lg font-medium text-[#0B2A45] mb-2 leading-snug">{item.title}</h4>
                    <p className="text-sm text-[#4C6A83] leading-relaxed">{item.desc}</p>
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
          className="flex flex-wrap items-center justify-center gap-6 py-6 mb-20 border-y border-[#0EA99B]/20"
        >
          {retailUseCaseCategories.map((c, i) => (
            <button key={c.id} onClick={() => setActiveTab(i)}
              className="flex flex-col items-center gap-1 group transition-all duration-300">
              <span className="text-lg text-[#0EA99B] group-hover:scale-125 transition-transform">{c.icon}</span>
              <span className="text-xs text-[#4C6A83] font-semibold">{c.items.length}</span>
            </button>
          ))}
          <div className="h-8 w-px bg-[#0EA99B]/20" />
          <span className="text-sm text-[#4C6A83]">
            <span className="text-2xl font-fraunces text-[#0B2A45] font-bold">{totalUseCases}</span>
            {' '}total use cases & growing
          </span>
        </motion.div>

        {/* The Full Deckoviz Retail Experience - Cinematic Closing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-[2.5rem] p-8 md:p-14 border border-white/80 shadow-2xl space-y-12"
        >
          <div className="text-center space-y-3">
            <h3 className="font-fraunces text-3xl md:text-5xl font-medium text-[#0B2A45]">
              The Full Deckoviz in Retail Experience
            </h3>
            <p className="text-[#4C6A83] text-lg font-normal">The real magic happens when all of this works together.</p>
          </div>

          {/* Journey Steps */}
          <div className="relative max-w-2xl mx-auto space-y-6">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#0EA99B] via-[#1B4C79] to-[#2FC2AE]" />
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
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex items-start gap-6 pl-2"
              >
                <div className="w-8 h-8 rounded-full bg-[#DDF6F0] border border-[#0EA99B]/30 flex items-center justify-center shrink-0 text-[#0A8378] font-bold text-sm z-10 shadow-sm">
                  {i + 1}
                </div>
                <p className="text-lg text-[#0B2A45] font-medium leading-relaxed pt-0.5">{step}</p>
              </motion.div>
            ))}
          </div>

          {/* Closing Statement */}
          <div className="text-center space-y-6 max-w-3xl mx-auto pt-6">
            <p className="text-xl text-[#4C6A83]">That is no longer just shopping.</p>
            <p className="font-fraunces text-3xl md:text-4xl font-medium grad-text">
              That becomes an experience.
            </p>
            <p className="text-xl text-[#4C6A83]">And experiences are what people come back for.</p>
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={onDemo}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-lg text-white bg-gradient-to-r from-[#0EA99B] to-[#123C63] shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <span>See It In Your Store</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { RetailUseCasesJourney, retailUseCaseCategories };
export default RetailUseCasesJourney;
