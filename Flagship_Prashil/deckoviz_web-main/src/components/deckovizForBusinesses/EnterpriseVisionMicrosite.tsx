import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface EnterpriseVisionMicrositeProps {
  onClose: () => void;
}

const EnterpriseVisionMicrosite: React.FC<EnterpriseVisionMicrositeProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div
      ref={modalRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-0 z-[100] bg-slate-900 flex flex-col overflow-hidden"
    >
      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px] -translate-x-1/4 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-cyan-600/20 rounded-full blur-[150px] translate-x-1/4 translate-y-1/4 pointer-events-none" />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:scale-110"
      >
        <X size={28} />
      </button>

      {/* Scrollable Content */}
      <div className="overflow-y-auto scrollbar-hide flex-1 w-full px-6 py-12 sm:p-16 md:p-24 relative z-10 text-slate-300 leading-relaxed">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            >
              <span className="text-xl">🏢</span>
              <span className="text-blue-400 font-bold tracking-[0.15em] text-xs sm:text-sm uppercase">WHY DECKOVIZ - THE PROBLEM IT SOLVES FOR ENTERPRISES</span>
            </motion.div>
            <motion.h2 
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-7xl font-['Playfair_Display'] text-white leading-tight mb-8"
            >
              From passive spaces to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 italic">revenue-driving</span>, experience systems
            </motion.h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-20">
            
            {/* Section 1 */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-2xl md:text-3xl text-white font-semibold mb-6">The hidden inefficiency in most physical businesses</h3>
              <p className="mb-4">Most customer-facing businesses invest heavily in their spaces.</p>
              <p className="mb-4">You spend on:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-400">
                <li>interiors</li>
                <li>lighting</li>
                <li>layout</li>
                <li>branding</li>
                <li>furniture</li>
              </ul>
              <p className="mb-4">You design for first impressions, for comfort, for aesthetics.</p>
              <p className="mb-4">And then one of the most visible parts of your space - your walls - is left doing almost nothing.</p>
              <ul className="list-none pl-6 mb-6 space-y-2 text-slate-400 border-l-2 border-blue-500/30">
                <li>Static posters.</li>
                <li>Occasional signage.</li>
                <li>Screens that play the same loop.</li>
              </ul>
              <p className="mb-2">They don’t adapt.</p>
              <p className="mb-2">They don’t respond.</p>
              <p className="mb-6">They don’t improve over time.</p>
              <p className="text-xl font-medium text-blue-200">And most importantly, they don’t contribute meaningfully to revenue, experience, or decision-making.</p>
            </motion.section>

            {/* Section 2 */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-2xl md:text-3xl text-white font-semibold mb-6">The real problem: static environments in a dynamic world</h3>
              <p className="mb-4">Your customers are not static.</p>
              <p className="mb-4">Their expectations are shaped by:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-400">
                <li>personalised digital experiences</li>
                <li>adaptive interfaces</li>
                <li>constantly evolving content</li>
              </ul>
              <p className="mb-6">And then they walk into physical spaces that feel fixed, repetitive, and predictable.</p>
              <p className="mb-4 text-white font-medium">That gap matters.</p>
              <p className="mb-4">Because today, people don’t just evaluate:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-400">
                <li>your food</li>
                <li>your product</li>
                <li>your service</li>
              </ul>
              <p className="mb-6 text-white font-medium">They evaluate the experience around it.</p>
              <p className="mb-4">And increasingly, that experience determines:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-400">
                <li>how long they stay</li>
                <li>what they choose</li>
                <li>how much they spend</li>
                <li>whether they come back</li>
                <li>whether they recommend you</li>
              </ul>
            </motion.section>

            {/* Section 3 */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700/50">
              <h3 className="text-2xl md:text-3xl text-white font-semibold mb-6">Commodities don’t win. Experiences do.</h3>
              <p className="mb-2">Food can be replicated.</p>
              <p className="mb-2">Products can be copied.</p>
              <p className="mb-6">Pricing can be matched.</p>
              <p className="text-xl font-medium text-cyan-300 mb-6">What cannot be easily replicated is how your space makes someone feel.</p>
              <p className="mb-4">The best restaurants, retail stores, and hospitality brands already understand this.</p>
              <p className="mb-4">They don’t just serve.</p>
              <p className="mb-4">They create:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-400">
                <li>moments</li>
                <li>environments</li>
                <li>emotional impressions</li>
                <li>stories</li>
              </ul>
              <p className="mb-4 text-white">Because in a world where offerings converge, experience becomes the differentiator.</p>
              <p>And right now, most spaces are under-equipped to deliver that consistently.</p>
            </motion.section>

            {/* Section 4 */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-2xl md:text-3xl text-white font-semibold mb-6">Why Deckoviz exists</h3>
              <p className="mb-4">Deckoviz was built to solve a very practical problem:</p>
              <p className="text-xl font-medium text-white mb-6">Your physical space is not working as hard as it could be.</p>
              <p className="mb-4">Specifically:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-400">
                <li>your walls are underutilised</li>
                <li>your visual layer is static</li>
                <li>your storytelling is limited</li>
                <li>your ambience is fixed</li>
                <li>your ability to adapt is slow</li>
              </ul>
              <p className="mb-4 text-white font-medium">Deckoviz turns that into a system.</p>
              <p className="mb-4">A system that:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-400">
                <li>creates visuals</li>
                <li>adapts content</li>
                <li>personalises experiences</li>
                <li>evolves continuously</li>
              </ul>
              <p className="mb-2">This is not about adding another screen.</p>
              <p className="text-xl text-blue-300 font-medium">It is about adding a new operational layer to your space.</p>
            </motion.section>

            {/* Section 5 */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-3xl md:text-4xl text-white font-['Playfair_Display'] italic mb-10 text-center">What this changes, practically</h3>
              
              <div className="space-y-8">
                <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/30 hover:border-blue-500/30 transition-colors">
                  <h4 className="text-xl text-white font-semibold mb-4 text-blue-400">Your walls become active assets</h4>
                  <p className="mb-4">Instead of decoration, your walls start contributing to:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-400">
                    <li>influencing decisions</li>
                    <li>highlighting high-margin items</li>
                    <li>guiding attention</li>
                    <li>reinforcing brand</li>
                  </ul>
                  <p className="text-white font-medium">They go from passive to productive.</p>
                </div>

                <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/30 hover:border-cyan-500/30 transition-colors">
                  <h4 className="text-xl text-white font-semibold mb-4 text-cyan-400">You move from static to dynamic merchandising</h4>
                  <p className="mb-2">No more printing cycles</p>
                  <p className="mb-2">No more outdated visuals</p>
                  <p className="mb-4">No more fixed campaigns</p>
                  <p className="mb-4 text-white">Everything becomes:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-400">
                    <li>real-time</li>
                    <li>adaptable</li>
                    <li>testable</li>
                  </ul>
                  <p className="text-white font-medium">You can change what your customer sees in seconds.</p>
                </div>

                <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/30 hover:border-teal-500/30 transition-colors">
                  <h4 className="text-xl text-white font-semibold mb-4 text-teal-400">You shape decisions before they are made</h4>
                  <p className="mb-4">In environments like restaurants and retail:</p>
                  <p className="mb-4 text-white">Customers decide based on what they see.</p>
                  <p className="mb-4">Deckoviz allows you to:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-400">
                    <li>showcase dishes in their best form</li>
                    <li>visually elevate products</li>
                    <li>guide attention toward specific choices</li>
                    <li>subtly influence ordering and selection</li>
                  </ul>
                  <p className="mb-4 text-white">This directly impacts:</p>
                  <ul className="list-disc pl-6 space-y-2 text-slate-400">
                    <li>average order value</li>
                    <li>conversion rates</li>
                    <li>upsell behaviour</li>
                  </ul>
                </div>

                <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/30 hover:border-indigo-500/30 transition-colors">
                  <h4 className="text-xl text-white font-semibold mb-4 text-indigo-400">You create memorable, differentiated experiences</h4>
                  <p className="mb-4">Most spaces are forgettable.</p>
                  <p className="mb-4">Deckoviz helps you create:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-400">
                    <li>moments of surprise</li>
                    <li>moments of delight</li>
                    <li>personalised interactions</li>
                    <li>visually rich environments</li>
                  </ul>
                  <p className="mb-2 text-white font-medium">These are the things people remember.</p>
                  <p className="text-white font-medium">And talk about.</p>
                </div>

                <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/30 hover:border-violet-500/30 transition-colors">
                  <h4 className="text-xl text-white font-semibold mb-4 text-violet-400">You tell your story, not just show your product</h4>
                  <p className="mb-4">Instead of just displaying offerings, you can show:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-400">
                    <li>inspiration behind dishes</li>
                    <li>sourcing and ingredients</li>
                    <li>craftsmanship</li>
                    <li>brand narrative</li>
                  </ul>
                  <p className="text-white font-medium">You move from selling products to building meaning around them.</p>
                </div>

                <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/30 hover:border-pink-500/30 transition-colors">
                  <h4 className="text-xl text-white font-semibold mb-4 text-pink-400">You upgrade ambience without redesign</h4>
                  <p className="mb-4">Instead of physical changes, your space evolves digitally.</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-400">
                    <li>lunch vs dinner</li>
                    <li>weekday vs weekend</li>
                    <li>calm vs energetic</li>
                    <li>seasonal shifts</li>
                  </ul>
                  <p className="text-white font-medium">Your environment becomes flexible without requiring renovation.</p>
                </div>

                <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/30 hover:border-rose-500/30 transition-colors">
                  <h4 className="text-xl text-white font-semibold mb-4 text-rose-400">You reduce operational friction</h4>
                  <p className="mb-2 text-slate-400">no printing</p>
                  <p className="mb-2 text-slate-400">no design delays</p>
                  <p className="mb-2 text-slate-400">no vendor coordination</p>
                  <p className="mb-4 text-slate-400">no manual swaps</p>
                  <p className="mb-2 text-white font-medium">Updates happen instantly.</p>
                  <p className="text-white font-medium">Across one location or many.</p>
                </div>
              </div>
            </motion.section>

            {/* Section 6 */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-2xl md:text-3xl text-white font-semibold mb-8 text-center">Where this matters most</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-lg">
                  <h4 className="text-xl text-white font-bold mb-4">🍽️ Restaurants</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-400 text-sm">
                    <li>Increase appetite through visuals</li>
                    <li>Highlight high-margin dishes</li>
                    <li>Improve ordering behaviour</li>
                    <li>Create better dining environments</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-lg">
                  <h4 className="text-xl text-white font-bold mb-4">🛍️ Retail</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-400 text-sm">
                    <li>Improve product engagement</li>
                    <li>Help customers visualise usage</li>
                    <li>Increase conversion</li>
                    <li>Elevate perceived brand value</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-lg">
                  <h4 className="text-xl text-white font-bold mb-4">🏨 Hospitality</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-400 text-sm">
                    <li>Create immersive environments</li>
                    <li>Improve guest experience</li>
                    <li>Increase recall and repeat visits</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-lg">
                  <h4 className="text-xl text-white font-bold mb-4">🏢 Real Estate</h4>
                  <ul className="list-disc pl-5 space-y-2 text-slate-400 text-sm">
                    <li>Help buyers feel the space</li>
                    <li>Reduce imagination gap</li>
                    <li>Accelerate decisions</li>
                  </ul>
                </div>

              </div>
            </motion.section>

            {/* Section 7 */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-2xl md:text-3xl text-white font-semibold mb-6">The future of customer engagement</h3>
              <p className="mb-4">Physical spaces are changing.</p>
              <p className="mb-2 text-slate-400">From:</p>
              <ul className="list-none pl-6 mb-6 space-y-2 text-white font-medium border-l-2 border-cyan-500/30">
                <li>static <span className="text-slate-500">→</span> adaptive</li>
                <li>transactional <span className="text-slate-500">→</span> experiential</li>
                <li>generic <span className="text-slate-500">→</span> personalised</li>
              </ul>
              <p className="mb-4">Customers are no longer just buying:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-400">
                <li>food</li>
                <li>products</li>
                <li>services</li>
              </ul>
              <p className="mb-4 text-white">They are buying:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-400">
                <li>experiences</li>
                <li>memories</li>
                <li>environments</li>
              </ul>
              <p className="text-xl text-white font-medium">And the businesses that win will be the ones that can:</p>
              <p className="text-xl text-cyan-300 font-medium">connect, engage, and stay memorable.</p>
            </motion.section>

            {/* Section 8 */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-2xl md:text-3xl text-white font-semibold mb-6">Deckoviz as the connecting layer</h3>
              <p className="mb-4">Deckoviz sits between:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-400">
                <li>your brand</li>
                <li>your space</li>
                <li>and your customer</li>
              </ul>
              <p className="mb-4 text-white">It becomes the layer that:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-400">
                <li>communicates</li>
                <li>adapts</li>
                <li>engages</li>
                <li>evolves</li>
              </ul>
              <p className="text-xl text-white font-medium">In real time.</p>
            </motion.section>

            {/* Final Thought */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-10 rounded-3xl border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
              <p className="mb-2 text-lg text-slate-300">Most businesses treat their space as a cost.</p>
              <p className="mb-6 text-lg text-slate-300">A fixed environment that needs to be set up and maintained.</p>
              <p className="mb-4 text-xl text-white font-semibold">Deckoviz turns your space into a system.</p>
              <p className="mb-4 text-slate-300">One that:</p>
              <ul className="list-none mb-10 space-y-2 text-slate-300 inline-block text-left">
                <li><span className="text-blue-400 mr-2">✦</span> works continuously</li>
                <li><span className="text-blue-400 mr-2">✦</span> improves over time</li>
                <li><span className="text-blue-400 mr-2">✦</span> and contributes directly to experience and revenue</li>
              </ul>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-10 rounded-full" />
              <p className="text-2xl md:text-3xl text-white font-['Playfair_Display'] italic">Your space shouldn’t just exist.</p>
              <p className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-bold mt-4">It should perform.</p>
            </motion.section>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EnterpriseVisionMicrosite;
