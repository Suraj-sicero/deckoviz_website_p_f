import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SectionHeader = ({ number, title, subtitle }: { number: string, title: string, subtitle?: string }) => (
  <div className="mb-16 md:mb-24">
    <div className="flex items-center gap-4 mb-6">
      <span className="text-xl md:text-2xl font-light text-indigo-400 border border-indigo-400/30 rounded-full px-4 py-1">
        {number}
      </span>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent" />
    </div>
    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
      {title}
    </h2>
    {subtitle && (
      <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl">
        {subtitle}
      </p>
    )}
  </div>
);

const FeatureBlock = ({ title, content, delay = 0 }: { title: string, content: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay }}
    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-500"
  >
    <h3 className="text-2xl font-semibold text-white mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
      {title}
    </h3>
    <p className="text-gray-300 leading-relaxed text-lg">
      {content}
    </p>
  </motion.div>
);

const ExpandableUseCase = ({ category, items }: { category: string, items: { title: string, desc: string }[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <h3 className="text-2xl md:text-3xl font-light text-white group-hover:text-indigo-400 transition-colors duration-300" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
          {category}
        </h3>
        <span className={`text-3xl text-indigo-400 transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl p-6 border border-white/5 hover:border-indigo-500/30 transition-colors">
                  <h4 className="text-xl font-medium text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const HotelExperienceJourney: React.FC = () => {
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-indigo-500/30">
      
      {/* Intro Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              The Future of Hospitality: <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Beyond the Stay
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-light text-gray-300 mb-8 leading-relaxed">
              Transforming Hotels into Intelligent, Generative, Delightful Sanctuaries
            </p>
            <div className="space-y-6 text-xl text-gray-400 font-light max-w-3xl leading-relaxed">
              <p>
                In the world of high-end hospitality, luxury is no longer defined just by thread counts or marble bathrooms. It is defined by <strong>Resonance</strong>.
              </p>
              <p>
                Every hotel has walls, and every hotel has art, but most hotels have "dead" spaces: static décor that remains the same from the guest's arrival to their departure.
              </p>
              <p className="text-white font-medium text-2xl">
                Deckoviz is the evolution. We provide the Generative Ambiance and Visual Platform (GAVP) that turns a passive hotel into an intelligent, living environment. This is the shift from providing a room to providing an Ever-Evolving Experience.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Embed Section */}
      <section className="py-16 md:py-24 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              A Glimpse Of Deckoviz For Your Hotel
            </h2>
          </div>
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-3xl shadow-[0_0_50px_rgba(79,70,229,0.15)] border border-white/10">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/zCLi3OTFRFU?rel=0&showinfo=0"
              title="A Glimpse Of Deckoviz For Your Hotel"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* 01. The AI Layer */}
      <section className="py-24 md:py-32 px-6 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader 
            number="01" 
            title="The AI Layer" 
            subtitle="The Invisible Concierge of Atmosphere" 
          />
          <p className="text-xl text-gray-300 mb-16 max-w-4xl font-light leading-relaxed">
            Deckoviz is the AI Layer for your hotel infrastructure. We move beyond "screens" to provide a creative intelligence system that lives within your architecture.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureBlock 
              title="Vizzy: Your 24/7 Creative Intelligence Engine" 
              content="Most hotels struggle with content fatigue. With the Deckoviz AI layer, you have Vizzy, our proprietary AI that acts as your on-site Creative Director. Vizzy understands the DNA of your hotel brand. It doesn't just display images; it synthesizes unique, high-fidelity generative art and atmospheric visuals that align with your brand's specific aesthetic in real time."
              delay={0.1}
            />
            <FeatureBlock 
              title="Generative Synthesis vs. Static Storage" 
              content="Traditional digital signage is limited by what you upload. The Deckoviz AI layer generates an infinite stream of unique visuals. Whether it is a 'Deep Forest Calm' for your spa or a 'Metropolitan Energy' for your rooftop bar, the AI ensures that no two guests ever see the exact same visual twice, maintaining a constant sense of novelty and delight."
              delay={0.2}
            />
            <FeatureBlock 
              title="Predictive Atmospheric Intelligence" 
              content="The AI layer learns the rhythm of your hotel. It knows when to soften the lights and visuals as the sun sets, and when to energize the lobby for the morning checkout rush. It isn't just a display: it is a software-driven brain that optimizes the emotional temperature of every room."
              delay={0.3}
            />
            <FeatureBlock 
              title="Future-Ready Infrastructure" 
              content="By installing Deckoviz, you are making your hotel AI-Ready. As we release new AI models for scent integration, gesture control, and advanced guest personalization, your hotel updates automatically over the cloud. You are investing in a platform that becomes more valuable every month."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* 02. The Experience & Ambience Layer */}
      <section className="py-24 md:py-32 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader 
            number="02" 
            title="The Experience & Ambience Layer" 
            subtitle="Designing the Guest State-of-Being" 
          />
          <p className="text-xl text-gray-300 mb-16 max-w-4xl font-light leading-relaxed">
            Deckoviz is the Experience Layer that justifies premium rates. Guests do not pay for a room: they pay for how they feel while they are in it.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              { title: "Circadian Rhythm Integration", desc: "Use the Ambiance Layer to align your guest's internal clock with your environment. Deckoviz can automatically shift through light frequencies and visual tones that promote better sleep, faster recovery from jet lag, and a more profound sense of well-being." },
              { title: "Multisensory Immersion", desc: "We believe visuals are only one part of the story. Deckoviz pairs generative art with high-fidelity soundscapes and AI-driven narration. Imagine a guest entering their suite to find a beautiful, moving landscape paired with the soft sounds of a local forest and a narrated history of the region. This is 360-degree hospitality." },
              { title: "Personalized Mementos", desc: "Move beyond 'Welcome, Mr. Smith' on a TV screen. Deckoviz allows you to create Generative Welcome Moments. Create custom art based on a guest's preferences, or display personalized celebration visuals for honeymooners and anniversary guests that they will want to photograph and share instantly." },
              { title: "Visual Resonance, Not Noise", desc: "Typical hotel TVs are distractions. Deckoviz units are designed with minimalist wooden frames and halo backlighting to be part of the furniture. They provide a 'Calm Tech' experience that enhances the room's design rather than cluttering it with commercial noise." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex gap-6"
              >
                <div className="w-12 h-12 shrink-0 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xl border border-indigo-500/30">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. 8 Core Use Cases */}
      <section className="py-24 md:py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            number="03" 
            title="8 Core Use Cases" 
            subtitle="The Intelligent Journey" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { title: "The Living Lobby", desc: "Transform the first touchpoint into a gallery of your brand's soul. Use generative art that reflects the local culture, weather, and energy to immediately ground guests in a sense of place." },
              { title: "The Suite Sanctuary", desc: "Replace the 'black box' TV with a living canvas. Allow guests to choose their own 'Room Vibe' from a menu of AI-generated atmospheres like 'Zen Garden,' 'Oceanic Deep,' or 'Creative Studio.'" },
              { title: "The Spa Immersion", desc: "Elevate treatment rooms with visuals and soundscapes that are perfectly synchronized to the rhythm of the therapy, creating a deeper state of relaxation than music alone could ever achieve." },
              { title: "The Elevating Corridor", desc: "Turn long, boring hallways into a journey. Use Deckoviz units to show evolving art pieces that guide the guest toward their room, making every walk through the hotel an opportunity for discovery." },
              { title: "The Intelligent Concierge", desc: "Use the AI layer to provide dynamic, visual recommendations for local attractions, weather updates, and hotel events, all presented as beautiful, brand-aligned art rather than 'bullet points.'" },
              { title: "The Event Metamorphosis", desc: "Instantly transform your ballroom or conference space from a professional 'Tech Summit' vibe to a 'Gala Dinner' atmosphere with a single voice command." },
              { title: "The Rooftop Pulse", desc: "Sync your bar's visuals to the music and the sunset. As the night progresses, the generative art becomes more vibrant, driving the energy of the space and increasing beverage sales." },
              { title: "The Legacy Gallery", desc: "Tell the story of your hotel's history and architecture through AI-curated archival photos and narrated 'Time-Travel' loops that honor your heritage." }
            ].map((uc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative p-8 rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h4 className="text-xl font-bold text-white mb-4 relative z-10">{uc.title}</h4>
                <p className="text-gray-400 leading-relaxed text-sm relative z-10">{uc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. 12 Unrivaled Benefits */}
      <section className="py-24 md:py-32 px-6 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            number="04" 
            title="12 Unrivaled Benefits" 
            subtitle="The Business of Intelligent Atmosphere" 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
            {[
              { title: "Increased Guest Satisfaction (NPS)", desc: "Memorable, unique experiences lead to higher ratings, better reviews, and more repeat bookings." },
              { title: "Higher Average Daily Rate (ADR)", desc: "High-end, AI-driven environments justify premium pricing. An 'Intelligent Suite' is a higher-value product than a standard room." },
              { title: "Significant Revenue Upsell", desc: "Use the 'Experience Layer' to subtly promote high-margin services like spa treatments, private dining, or late checkout through beautiful, non-intrusive visuals." },
              { title: "Eliminate Printing Costs", desc: "Stop reprinting guest directories, event schedules, and seasonal posters. Everything is updated instantly through the cloud." },
              { title: "Zero Operational Friction", desc: "Your housekeeping and front-desk staff can manage the entire hotel's atmosphere through a central dashboard or simple voice commands." },
              { title: "Brand Differentiation", desc: "In a crowded market, Deckoviz makes your hotel 'The AI Hotel' or 'The Experience Hotel,' a unique category that competitors cannot easily replicate." },
              { title: "Sustainability Leadership", desc: "Dramatically reduce your paper and plastic waste. A digital-first approach to décor is better for the planet and better for your ESG reporting." },
              { title: "Reduced Guest Stress", desc: "Ambient visuals and circadian lighting help guests feel more relaxed, leading to fewer complaints and a more harmonious environment." },
              { title: "Talent Attraction", desc: "Modern staff want to work with modern tools. Providing an 'Intelligent Workplace' improves morale and helps you attract top-tier hospitality talent." },
              { title: "Organic Social Media Growth", desc: "Your hotel becomes 'Instagram-Famous' by design. Guests will naturally share the beautiful, generative moments created by Deckoviz, providing you with free, high-trust marketing." },
              { title: "Multi-Property Synchronization", desc: "Ensure that your flagship in London and your boutique in the Maldives maintain the same high-end aesthetic, controlled from one global headquarters." },
              { title: "A Growing Asset", desc: "Unlike a painting that fades or furniture that wears out, Deckoviz gets better with every software update. Your walls are an investment that continues to evolve." }
            ].map((ben, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                className="flex flex-col border-l border-indigo-500/30 pl-6 hover:border-indigo-400 transition-colors"
              >
                <h4 className="text-xl font-semibold text-white mb-3">{ben.title}</h4>
                <p className="text-gray-400 leading-relaxed">{ben.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Massive Expandable Section: Deckoviz for Hotels Evolving Use Cases */}
      <section className="py-24 md:py-32 px-6 border-t border-white/5 bg-white/5 relative">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>Deckoviz for Hotels:<br/> An Evolving List of Use Cases</h2>
            <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
              Deckoviz becomes your hotel's visual layer, storytelling layer, concierge layer, ambience layer, memory layer, and guest delight system.
              Hospitality is no longer just about rooms, service, and amenities. Most hotels can offer comfort. What guests remember is how the place made them feel, how personal the experience was, and whether the stay felt memorable enough to return to or recommend.
            </p>
            <p className="text-xl text-indigo-300 font-light max-w-3xl mx-auto leading-relaxed mt-6">
              Deckoviz helps transform hotels from accommodation spaces into immersive hospitality experiences.
              This is a living list of use cases we keep expanding as we discover new ways hotels can use Deckoviz to create stronger guest delight, deeper brand recall, better reviews, more upsells, and unforgettable stays.
            </p>
          </div>

          <div className="space-y-2">
            <ExpandableUseCase 
              category="Guest Experience & Personalisation"
              items={[
                { title: "Personalized guest welcome experiences", desc: "Welcome guests with personalised greetings at check-in, in rooms, or at concierge areas using their names, beautiful visuals, and tailored messages." },
                { title: "VIP guest recognition", desc: "Create elevated arrival experiences for premium guests, repeat visitors, honeymoon couples, corporate guests, and long-stay customers." },
                { title: "Returning guest memory system", desc: "Vizzy remembers preferences such as room choices, food preferences, favourite drinks, special requests, birthdays, anniversaries, and past stay details." },
                { title: "Birthday, anniversary & celebration moments", desc: "Create personalised visual experiences for birthdays, honeymoons, anniversaries, proposals, family trips, and milestone celebrations." },
                { title: "Personalized room welcome art", desc: "Guests enter rooms with personalised art, welcome montages, or beautiful custom visual greetings." },
                { title: "Guest memory gifts", desc: "Turn special travel moments into personalised artworks or keepsake visuals guests can take home digitally or physically." },
                { title: "Proposal & surprise planning support", desc: "Help orchestrate proposals, surprise celebrations, room reveals, romantic experiences, and unforgettable emotional moments." },
                { title: "Family stay personalization", desc: "Create special experiences for children, families, and multi-generational travel groups." }
              ]}
            />
            
            <ExpandableUseCase 
              category="Concierge & Guest Guidance"
              items={[
                { title: "AI-powered concierge layer", desc: "Vizzy becomes your digital concierge, helping guests with hotel information, services, local recommendations, bookings, and personal guidance." },
                { title: "Local city guide experiences", desc: "Beautiful visual guides for nearby attractions, restaurants, shopping, hidden gems, and local experiences." },
                { title: "Itinerary planning support", desc: "Help guests plan their day with personalised recommendations based on interests, mood, and trip type." },
                { title: "Event and schedule displays", desc: "Spa appointments, breakfast timings, pool schedules, live music nights, yoga sessions, local tours, and event reminders." },
                { title: "Local culture immersion", desc: "Introduce guests to local history, traditions, art, festivals, and regional stories beautifully." },
                { title: "Airport transfer and travel coordination", desc: "Elegant communication for pickups, drop-offs, travel plans, and concierge assistance." }
              ]}
            />

            <ExpandableUseCase 
              category="Room Experience & Ambience"
              items={[
                { title: "Dynamic room ambience engine", desc: "Vizzy becomes the room's mood layer, adapting visuals, sounds, and ambience depending on guest preferences and time of day." },
                { title: "Morning vs evening room moods", desc: "Different visual and sensory experiences for waking up, relaxation, work mode, and nighttime wind-down." },
                { title: "Romantic stay mode", desc: "Special ambience settings for honeymoon suites, anniversaries, and couple experiences." },
                { title: "Wellness and calm mode", desc: "Peaceful, restorative visual environments for relaxation-focused stays." },
                { title: "Business travel mode", desc: "Focused, calming environments for professionals and work-heavy stays." },
                { title: "Festival and holiday transformations", desc: "Christmas, New Year, Diwali, Valentine's Day, local festivals - rooms and shared spaces adapt beautifully." },
                { title: "Weather-responsive ambience", desc: "Rainy day warmth, winter luxury, summer freshness - spaces that feel alive with context." },
                { title: "Family and kids mode", desc: "Playful visuals, storytelling modes, and interactive experiences for children." }
              ]}
            />

            <ExpandableUseCase 
              category="Hotel Storytelling & Brand Layer"
              items={[
                { title: "Your hotel's story", desc: "Tell the story of your hotel: founding journey, heritage, architecture, values, and what makes the property special." },
                { title: "Property history storytelling", desc: "Especially powerful for heritage hotels, boutique properties, and legacy hospitality brands." },
                { title: "Destination storytelling", desc: "Show guests the soul of the location - its people, culture, traditions, food, and history." },
                { title: "Brand philosophy storytelling", desc: "Help guests understand your hotel beyond amenities - why it exists and what it stands for." },
                { title: "Sustainability storytelling", desc: "Communicate eco-conscious design, local sourcing, sustainability efforts, and responsible hospitality beautifully." },
                { title: "Staff and service stories", desc: "Introduce chefs, hosts, concierge teams, wellness experts, and the people who shape the guest experience." },
                { title: "Signature experience storytelling", desc: "Spa philosophy, wellness journeys, culinary inspiration, destination experiences, and curated adventures." }
              ]}
            />

            <ExpandableUseCase 
              category="Food, Dining & Restaurant Integration"
              items={[
                { title: "Visual dining menus", desc: "Convert restaurant menus into immersive visual experiences inside the hotel." },
                { title: "Signature dish storytelling", desc: "Show ingredients, inspiration, preparation, and chef philosophy behind signature dishes." },
                { title: "Dining ambience experiences", desc: "Different restaurant moods for breakfast, brunch, dinner, rooftop dining, and special events." },
                { title: "Room service visual menu", desc: "Make in-room dining more premium and engaging through visual storytelling." },
                { title: "Event dining personalization", desc: "Private dinners, anniversaries, business dinners, destination weddings, and celebration meals." },
                { title: "Culinary journey experiences", desc: "Take guests through regional cuisine and local food stories." }
              ]}
            />

            <ExpandableUseCase 
              category="Revenue Growth & Upselling"
              items={[
                { title: "Spa and wellness upselling", desc: "Beautifully showcase spa services, treatments, wellness journeys, and premium experiences." },
                { title: "Premium room and suite upgrades", desc: "Drive room upgrades through immersive visual storytelling and aspirational presentation." },
                { title: "Experience package promotions", desc: "Promote honeymoon packages, wellness retreats, family stays, workation packages, and celebration bundles." },
                { title: "Dining and event upselling", desc: "Drive bookings for private dining, tasting menus, rooftop dinners, and celebration packages." },
                { title: "Late checkout and premium services", desc: "Upsell airport transfers, concierge services, premium amenities, and convenience services." },
                { title: "Event and wedding bookings", desc: "Promote destination weddings, conferences, retreats, and event hosting beautifully." },
                { title: "Loyalty and membership programs", desc: "Highlight repeat guest benefits and premium membership experiences." }
              ]}
            />

            <ExpandableUseCase 
              category="Social Proof & Reputation"
              items={[
                { title: "Live guest review wall", desc: "Display positive guest reviews, testimonials, and memorable guest experiences beautifully." },
                { title: "Guest memory wall", desc: "Celebrate returning guests, weddings, proposals, celebrity visits, and milestone stays." },
                { title: "UGC and social wall", desc: "Display guest-generated content, beautiful travel moments, and shareable experiences." },
                { title: "Influencer and celebrity visits", desc: "Celebrate notable guests tastefully and elegantly." },
                { title: "Review generation prompts", desc: "Encourage happy guests to leave reviews through elegant checkout prompts." }
              ]}
            />

            <ExpandableUseCase 
              category="Events, Weddings & Experiences"
              items={[
                { title: "Destination wedding storytelling", desc: "Create beautiful immersive wedding journeys across the property." },
                { title: "Event and celebration displays", desc: "Corporate events, private celebrations, family gatherings, anniversaries, and milestone moments." },
                { title: "Conference and business event support", desc: "Elegant event branding, scheduling, welcome displays, and professional experiences." },
                { title: "Live music and cultural evenings", desc: "Promote performances, events, and special nights beautifully." },
                { title: "Seasonal and festive activations", desc: "Transform the hotel visually during key festive periods and local celebrations." }
              ]}
            />

            <ExpandableUseCase 
              category="Operations, Signage & Utility"
              items={[
                { title: "Beautiful signage system", desc: "Premium signage for directions, check-in guidance, event spaces, amenities, and guest information." },
                { title: "Queue and waiting management", desc: "Elegant check-in and waiting experiences that feel premium rather than transactional." },
                { title: "Multi-property brand consistency", desc: "Maintain visual and storytelling consistency across hotel chains and multiple locations." },
                { title: "Staff recognition wall", desc: "Celebrate team members, anniversaries, service excellence, and internal culture." },
                { title: "Recruitment wall", desc: "Hiring announcements presented beautifully and on-brand." },
                { title: "Vendor and partner showcases", desc: "Highlight local partnerships, artists, suppliers, wineries, wellness partners, and collaborators." }
              ]}
            />

            <ExpandableUseCase 
              category="Wellness, Spa & Retreat Experiences"
              items={[
                { title: "Meditation and mindfulness modes", desc: "Beautiful visual calm spaces for wellness-focused properties." },
                { title: "Spa storytelling", desc: "Explain rituals, treatments, healing traditions, and wellness philosophy." },
                { title: "Retreat experience journeys", desc: "Yoga retreats, detox retreats, spiritual stays, and healing journeys." },
                { title: "Emotional reset spaces", desc: "Create restorative environments guests deeply remember." }
              ]}
            />
          </div>
          
          <div className="mt-32 pt-16 border-t border-white/10">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-6" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                The Full Deckoviz Hospitality Experience
              </h3>
              <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
                The real magic happens when all of this works together.
              </p>
            </div>

            <div className="max-w-4xl mx-auto relative py-8">
              {/* Vertical line connecting steps */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-pink-500/0 md:-translate-x-1/2" />

              {[
                { icon: "✨", text: "A guest arrives and feels welcomed personally." },
                { icon: "🛏️", text: "Their room already feels prepared for them." },
                { icon: "🏛️", text: "The property tells its story beautifully." },
                { icon: "🍷", text: "Dining becomes immersive." },
                { icon: "🛎️", text: "The concierge feels intelligent and personal." },
                { icon: "🌅", text: "The ambience shifts with the moment." },
                { icon: "🥂", text: "Celebrations become unforgettable." },
                { icon: "📸", text: "The stay becomes a memory worth sharing." },
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative flex items-center mb-8 md:mb-12 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Connector Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.9)] transform -translate-x-1/2 z-10" />

                  {/* Content Container */}
                  <div className={`w-full md:w-1/2 flex pl-16 md:pl-0 ${idx % 2 === 0 ? "md:pr-16 md:justify-end" : "md:pl-16 md:justify-start"}`}>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20 hover:border-indigo-500/50 flex items-center gap-5 group w-full">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 group-hover:bg-indigo-500/20">
                        <span className="text-2xl filter grayscale group-hover:grayscale-0 transition-all duration-500">{step.icon}</span>
                      </div>
                      <p className="text-lg md:text-xl text-gray-200 font-light leading-snug group-hover:text-white transition-colors">{step.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center mt-20 relative px-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative z-10 bg-black/40 backdrop-blur-xl border border-white/10 p-10 md:p-16 rounded-3xl max-w-4xl mx-auto shadow-2xl">
                <h4 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  That is no longer just hospitality. <br className="hidden md:block" />
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent inline-block mt-2">That becomes an experience.</span>
                </h4>
                <p className="text-xl md:text-3xl text-gray-400 font-light mt-8">
                  And experiences are what guests return for.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 05. Call to Action */}
      <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-br from-indigo-900 to-[#050505]">
        <div className="absolute inset-0 bg-[url('/images/stars.svg')] opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionHeader 
            number="05" 
            title="Step Into the Era Of The Intelligent Hotels" 
          />
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-8" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>Don't just host guests. Immerse them.</h3>
          
          <div className="space-y-6 text-xl text-gray-300 font-light mb-12">
            <p>
              Static hospitality is the standard of the past. The modern traveler is looking for something more: they are looking for connection, novelty, and well-being. Deckoviz GAVP is the easiest, most impactful upgrade you can make to your hotel today.
            </p>
            <p>
              Most things you buy fill space: Deckoviz shapes how your guests live and feel within it.
            </p>
            <p>
              In a world of generic luxury, give your guests a space that finally speaks to them. The bed is where they sleep. The atmosphere is why they come back.
            </p>
            <p className="text-2xl text-white font-medium">
              Stop managing rooms. Start curating the future of hospitality.
            </p>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-10 py-5 rounded-full text-xl font-bold shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all"
            onClick={() => window.location.href = '/contact'}
          >
            Experience the GAVP – Schedule Your Private Hotel Demo Today
          </motion.button>
        </div>
      </section>

    </div>
  );
};

export default HotelExperienceJourney;
