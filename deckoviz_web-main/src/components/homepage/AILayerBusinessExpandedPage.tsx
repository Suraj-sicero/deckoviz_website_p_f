import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Home, Layers, Activity, Heart, Map, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

export default function AILayerBusinessExpandedPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-white to-blue-50/60" />
        <div className="absolute top-0 -left-1/4 w-[80%] h-[80%] bg-blue-100/50 blur-[150px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-0 -right-1/4 w-[80%] h-[80%] bg-indigo-100/50 blur-[150px] rounded-full mix-blend-multiply" />
      </div>

      {/* Navigation Bar (Minimal) */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100 px-6 md:px-12 py-4">
        <Link to="/enterprise" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Enterprise
        </Link>
      </nav>

      <main className="relative z-10 pt-32 pb-32 max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Article Header */}
        <motion.header 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-xs md:text-sm font-semibold tracking-wider text-blue-900 uppercase">Enterprise Vision</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight font-serif tracking-tight">
            Deckoviz: The AI Layer<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] via-indigo-600 to-blue-600 italic font-medium">for Your Business</span>
          </h1>
          <p className="text-2xl text-gray-600 font-serif italic max-w-2xl mx-auto leading-relaxed">
            Every customer-facing space is about to get an AI layer. The only question is whether yours leads or follows.
          </p>
        </motion.header>

        {/* Content Layout */}
        <div className="max-w-3xl mx-auto">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="prose prose-lg md:prose-xl prose-indigo max-w-none text-gray-700 leading-relaxed mb-24">
            <p className="text-xl md:text-2xl font-light text-gray-800 mb-8 leading-relaxed">
              Walk into most retail stores, restaurants, hotels, or showrooms today, and you're walking into a space that hasn't changed in any meaningful way in years.
            </p>
            <p>
              The art is the same. The signage is the same. The music, if there's any thought behind it at all, is the same playlist on loop since the place opened. Customers notice, even if they couldn't tell you what exactly feels stale.
            </p>
            <p>
              Sophistication and personalization have entered every other part of the customer experience, the app, the loyalty program, the personalisation engine behind every email, except the physical space itself, which still behaves like it's 2019.
            </p>
            <p>
              That's about to change, and fast. Every business with a physical presence is heading toward having an AI layer woven into its environment, an intelligence that understands the brand, reads the room, and shapes the experience in real time.
            </p>
            <p className="font-medium text-[#182A4A] border-l-4 border-indigo-300 pl-6 my-10 py-2">
              Deckoviz is built to be that layer: the marketing layer, the experience architecture, and the ambiance engine, all running through the same creative brand intelligence.
            </p>
          </motion.div>

          <Section
            icon={<Activity className="w-8 h-8 text-indigo-500" />}
            title="Meet Vizzy: your 24/7 creative director"
            content={[
              "Every brand has a creative bottleneck. Campaigns take weeks. Seasonal refreshes require a designer, a brief, three rounds of revisions, and a deadline that always arrives faster than the work does. Meanwhile, your physical space sits there, static, while your social feeds and your website move on without it.",
              "Vizzy removes the bottleneck entirely. It's a proprietary generative intelligence engine that lives inside your space and inside your marketing stack simultaneously, acting as:",
              "• Your in-house creative director - understands your brand's colours, typography, seasonal tone, and visual DNA, and generates on-brand work without a brief",
              "• Your on-location brand storyteller - turns your walls into a living expression of what your brand is and what it stands for",
              "• Your campaign generator - ideates and produces visual - and multisensory - campaigns for in-store displays and for social media, from the same creative brain",
              "• Your brand representative, concierge, and greeter - the first and last impression a guest has of your space, warm, intelligent, and on-brand",
              "• Your brand entertainer - for guests waiting, dining, browsing, or simply being in the space",
              "This isn't a content library. It's synthesis infra. Give Vizzy a theme, \"Sustainable Summer,\" \"Cyber-Urban Tech,\" \"Quiet Luxury,\" and it generates an infinite stream of original, high-fidelity visuals that match that mood precisely. Your space never looks stale or boring or the same old again. It always feels exactly like you."
            ]}
          />

          <Section
            icon={<Sparkles className="w-8 h-8 text-sky-500" />}
            title="Generative brand synthesis: the end of the same six images on loop"
            content={[
              "Here's the shift that matters most. Traditional digital signage is a storage problem, you upload assets, and the screen plays them back until someone remembers to update them. Most don't, for months.",
              "Deckoviz is a synthesis engine. Vizzy doesn't retrieve, it creates, continuously, on demand, in your brand's exact visual language. That means:",
              "• A campaign refresh that used to take an agency three weeks now takes a conversation",
              "• Seasonal, cultural, and event-based moments (a local festival, a product launch, a weather shift) can be reflected in your space's visuals same-day, sometimes same-hour",
              "• No visitor, even a daily regular, sees the exact same thing twice, yet everything they see feels unmistakably you",
              "This is brand consistency and infinite novelty, two things that have never coexisted at this scale before."
            ]}
          />

          <Section
            icon={<Map className="w-8 h-8 text-cyan-600" />}
            title="Context-aware by design: the space that reads the room"
            content={[
              "A great host doesn't treat every guest, every hour, every day the same way. Neither does Deckoviz.",
              "The system is continuously aware of:",
              "• Time of day - energising visuals for morning footfall, something more atmospheric as evening sets in",
              "• Season and occasion - your space shifts with the calendar, automatically, without anyone scheduling it",
              "• Footfall and traffic patterns - the system learns which visual cadences resonate with your actual customers, at the hours they're actually there, and optimises toward what works",
              "• Visitor personas - a different emotional register for a weekday lunch crowd than for a Saturday night",
              "• Special events - a private booking, a launch, a holiday, reflected in the space's atmosphere without manual intervention",
              "• Ambient conditions - natural light levels, weather, even the energy of the room itself, factored into what the space shows and how it feels",
              "This is the difference between a screen and a brain. The screen displays. The brain decides what should be displayed, and why, every hour of every day."
            ]}
          />

          <Section
            icon={<Heart className="w-8 h-8 text-blue-500" />}
            title="The experience layer: guests don't pay for a room, they pay for how they feel in it"
            content={[
              "This is the principle that underlies everything, particularly in hospitality, but increasingly in retail and dining too. The product was never just the product. It was always the feeling.",
              "Deckoviz becomes the Experience and Ambiance Layer that designs that feeling deliberately:",
              "• Multisensory immersion - generative art paired with high-fidelity soundscapes and AI narration. A guest walks into their suite and finds a moving landscape on the wall, the soft sound of a local forest, and a narrated story of the region they've just arrived in. Not a TV. An arrival.",
              "• Circadian alignment - for hotels, the ability to shift light frequencies and visual tones across the day to support better sleep, faster recovery from jet lag, and a genuine sense of well-being from the moment a guest enters their room",
              "• Generative welcome moments - beyond \"Welcome, Mr. Smith\" on a screen, custom-generated art for honeymooners, anniversary guests, returning regulars, the kind of personalised moment that gets photographed and shared before the guest has even unpacked",
              "• Calm tech, not commercial noise - minimalist hardware, halo backlighting, designed to disappear into the room's architecture rather than compete with it. The opposite of a hotel TV blasting promotional content at full volume",
              "For real estate developments, this same layer becomes a sales tool in itself: integrating an AI layer into the architecture of a building means you're no longer selling square footage, you're selling a future-ready lifestyle, a tangible, demonstrable \"wow\" that legacy developments simply cannot offer."
            ]}
          />

          <Section
            icon={<BarChart className="w-8 h-8 text-indigo-400" />}
            title="The marketing layer: campaigns, content, and consistency, generated continuously"
            content={[
              "Most marketing operates in layers, strategy, planning, creation, distribution, analytics, and the bottleneck is almost always creation. Deckoviz collapses that bottleneck into something that runs continuously, in the background, without waiting on a creative team's bandwidth.",
              "Practically, this means Vizzy can:",
              "• Generate in-store visual campaigns tied to a theme, season, or promotion, deployed instantly across every screen in the space",
              "• Produce social-ready content drawn from the same brand-aware engine, so what's on your walls and what's on your feed feel like they came from the same creative mind, because they did",
              "• Maintain brand consistency at scale across multiple locations, every site running the same DNA, expressed slightly differently based on local context",
              "• Surface performance insight over time, which visual moods, themes, and cadences correlate with longer dwell time, higher spend, repeat visits, closing the loop between creative and commercial outcomes",
              "This is the Insight Layer, the Content Layer, and the Distribution Layer of a marketing operation, fused into one system that's always on."
            ]}
          />

          <Section
            icon={<Home className="w-8 h-8 text-teal-500" />}
            title="Memory, recognition, and the personalisation that actually matters"
            content={[
              "Frequent guests and loyal customers want to feel known. Most loyalty programs express this through points and discounts. Deckoviz expresses it through atmosphere.",
              "The system can recognise returning guests and adjust the experience accordingly, the regular who always sits at the same table gets greeted by an environment that feels familiar; the anniversary guest gets a generative moment built for them specifically; the corporate client who visits monthly walks into a space that has, in some subtle way, remembered them.",
              "This is personalisation as hospitality, not personalisation as a database query."
            ]}
          />

          <Section
            icon={<Layers className="w-8 h-8 text-blue-600" />}
            title="What this becomes: the core AI layer of your business"
            content={[
              "Everything above describes what Deckoviz does today and what it's becoming. But the larger point is structural: this is designed to be the layer that everything else plugs into.",
              "On the software side, the roadmap includes:",
              "• Deeper integration with booking, POS, and CRM systems, so the AI layer responds not just to footfall but to actual transactions, reservations, and guest profiles",
              "• Mobile app extensions, so the same intelligence that shapes your physical space can reach guests before they arrive and after they leave",
              "• Multi-location brand management, a single creative brain expressed consistently and contextually across every site",
              "• Deeper analytics, turning the space itself into a source of insight about what resonates with customers, not just what they bought",
              "On the hardware side, the same architecture that holds today's frame is built to support:",
              "• Sensors and cameras that let the system perceive the room directly, footfall, dwell time, even ambient mood, without manual input",
              "• Spatial audio and sound design, extending the visual intelligence into a full sonic identity for the space",
              "• Scent, the next layer of multisensory immersion, fragrance synced to visual and sonic experience the way a soundtrack completes a film",
              "• Gesture and voice interaction, letting guests engage with the space directly",
              "Every new capability doesn't sit beside the existing layer. It plugs into the same brain, and the whole system gets smarter, more contextual, and more valuable, automatically, over the cloud, without a renovation."
            ]}
          />

          {/* Callout / Final Block */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={fadeIn}
            className="mt-32 p-12 rounded-[3rem] bg-indigo-50/50 border border-indigo-100 shadow-xl relative overflow-hidden text-center max-w-4xl mx-auto"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/50 rounded-full blur-[80px]" />
            
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#182A4A] mb-8 relative z-10 transition-colors">A high-performance asset that keeps on giving</h2>
            
            <p className="text-lg text-gray-700 leading-relaxed font-medium relative z-10 max-w-2xl mx-auto mb-6">
              The traditional model for a business's physical space is straightforward: you build it once, it depreciates, and every few years you spend again to keep it feeling current. Deckoviz inverts that model entirely.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed font-medium relative z-10 max-w-2xl mx-auto">
              This is infrastructure that appreciates. Every update to Vizzy's underlying models, every new creative capability, every new sensory layer, makes every space running Deckoviz better, automatically, without new capital expenditure. The investment you make today becomes more capable next year, and the year after that, and the year after that.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed font-medium relative z-10 max-w-2xl mx-auto mt-6">
              In a market where every competitor is racing to add an AI layer to their customer experience, the businesses that move first don't just get a better space today. They get a space that keeps getting better, indefinitely, while everyone else is still waiting on their next agency brief.
            </p>

            <h3 className="mt-12 text-2xl md:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#182A4A] via-indigo-600 to-blue-600 font-bold italic relative z-10">
              Deckoviz: the AI layer your space has been waiting for, and the one your competitors haven't installed yet.
            </h3>
          </motion.div>

        </div>
      </main>
    </div>
  );
}

function Section({ title, content, icon }: { title: string, content: string[], icon: React.ReactNode }) {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.section 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-100px" }} 
      variants={fadeIn}
      className="mb-24 relative"
    >
      <div className="flex items-start gap-6 mb-8 group">
        <div className="hidden sm:flex mt-1 w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(37,99,235,0.05)] items-center justify-center shrink-0 group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-500">
          {icon}
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#182A4A] leading-tight">
            {title}
          </h2>
        </div>
      </div>
      <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 leading-relaxed pl-0 sm:pl-[5.5rem]">
        {content.map((paragraph, idx) => (
          <p key={idx} className={paragraph.startsWith("•") ? "pl-6 mb-2" : "mb-6"}>
            {paragraph}
          </p>
        ))}
      </div>
    </motion.section>
  );
}
