import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  Palette, 
  Music, 
  MapPin, 
  Heart, 
  Layers, 
  Volume2, 
  Sun, 
  Bed, 
  GlassWater, 
  Compass, 
  Crown,
  Sparkle
} from 'lucide-react';

// --- DATA STRUCTURES ---
const HOTEL_PROBLEMS = [
  {
    title: 'Generic Bulk-Framed Art',
    desc: 'Bulk-ordered prints for 300 identical rooms make luxury properties feel commoditized. Deckoviz turns every wall into a curated, evolving gallery.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6.5 h-6.5 stroke-[#0A8378]">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    )
  },
  {
    title: 'Atmospheric Stagnation',
    desc: 'Lobbies and bars remain visually static year-round. Deckoviz seamlessly shifts light, art, and mood between morning coffee, evening cocktails, and private galas.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6.5 h-6.5 stroke-[#0A8378]">
        <path d="M12 3v2M12 19v2M5 5l1.5 1.5M17.5 17.5L19 19M3 12h2M19 12h2M5 19l1.5-1.5M17.5 6.5L19 5" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    )
  },
  {
    title: 'Event Space Friction',
    desc: 'Ballrooms require expensive temporary decor for weddings and corporate galas. Deckoviz transforms event room walls instantly at the touch of a button.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6.5 h-6.5 stroke-[#0A8378]">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  },
  {
    title: 'Fragmented Guest Journey',
    desc: 'Guest rooms often feel disconnected from the hotel’s lobby character. Deckoviz extends one cohesive visual & sonic world from arrival to check-out.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6.5 h-6.5 stroke-[#0A8378]">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    )
  }
];

const HOTEL_WHY = [
  { title: 'Command Higher RevPAR & ADR', desc: 'Curated, emotionally resonance atmosphere justifies premium room rates and suite pricing.' },
  { title: 'Create Unforgettable First Impressions', desc: 'Turn lobbies into living art galleries that mesmerize arriving guests.' },
  { title: 'Drive Long-Term Brand Loyalty', desc: 'Guests remember properties that tailored room ambiance to their personal milestone.' }
];

const WHAT_KINDS_OF_HOTELS = [
  {
    icon: <Palette className="w-6 h-6 stroke-[#0A8378]" />,
    title: 'Say Something the Moment Guests Walk In',
    bullets: [
      'Choose from a massive, constantly expanding global art library for the lobby, the restaurant, the spa, the corridors, so the whole property feels curated rather than furnished.',
      'Create custom art themed around your brand, your city, or the season, and refresh it for a holiday, an event, or a campaign without touching a wall.',
      'Extend the same visual identity consistently across every public space, so a guest moving from lobby to bar to breakfast room feels one continuous world, not a series of disconnected rooms.'
    ]
  },
  {
    icon: <Crown className="w-6 h-6 stroke-[#0A8378]" />,
    title: 'Heritage as Atmosphere, Not a Forgotten Plaque',
    bullets: [
      'Show the history behind the building, the brand, or the destination itself, art and looping visuals that turn a lobby wait into part of the story rather than dead time.',
      'Give returning guests a sense of continuity, a property that clearly knows what it is and where it comes from, not one that could be swapped with any other hotel in the chain.',
      'Let heritage become atmosphere, not a plaque by the elevator that nobody reads.'
    ]
  },
  {
    icon: <Bed className="w-6 h-6 stroke-[#0A8378]" />,
    title: 'Every Room Set Up for the Person Staying in It',
    bullets: [
      "Give each room its own personalized art frame, so what's on the wall reflects the guest, not a fixed print ordered for three hundred identical rooms.",
      'Put Vizzy in the room as a genuine companion, not just a screen, greeting the guest by name, adjusting to how they actually want to spend the stay, business trip, honeymoon, family vacation.',
      'Set the mood and ambiance to match the occasion automatically, quiet and warm for someone arriving late after a long flight, celebratory for an anniversary suite, calm and unhurried for a wellness stay.',
      'Layer sound in alongside the visuals, so the room feels considered on more than one sense, not just decorated.',
      'Make the greeting itself part of the experience, a room that feels like it was expecting them, rather than one they simply unlocked.'
    ]
  },
  {
    icon: <MapPin className="w-6 h-6 stroke-[#0A8378]" />,
    title: 'Feel the Destination, Not Just Occupy a Room',
    bullets: [
      'Bring local art, photography, and culture into both the common spaces and the rooms themselves, so the property feels rooted in where it actually is.',
      'Give guests a sense of place before they\'ve left the building, the region\'s history, its landscape, its character, present the moment they arrive.',
      'Make cultural immersion consistent throughout the stay, not just a mural in the lobby that stops mattering the moment the elevator doors close.'
    ]
  },
  {
    icon: <Heart className="w-6 h-6 stroke-[#0A8378]" />,
    title: 'A Considered Journey Across the Whole Stay',
    bullets: [
      'Carry the experience across the entire journey, arrival, room, common spaces, departure, as one considered arc instead of a single strong first impression that fades by day two.',
      'Make event spaces genuinely responsive, a wedding, a conference, a private dinner, each one actually feeling like its own occasion rather than the same ballroom with different chairs.',
      'Build toward the moment a guest tells someone else about the stay, the small, personal, unexpected touch that makes this hotel the one they mention, not just the one they booked.'
    ]
  }
];

const HOTEL_PRACTICE_PILLARS = [
  {
    icon: <Palette className="w-6 h-6 stroke-[#0A8378]" />,
    title: 'Choose or create the art that fits every space you have',
    items: [
      'Pick from a massive, constantly expanding global art library for the lobby, the restaurant, the spa, the corridors, and every room — no more sourcing generic prints in bulk for three hundred identical walls.',
      'Create custom, themed art for your property specifically: your brand, your city, a seasonal campaign, a signature event, so the visual identity actually changes with the calendar instead of staying frozen the day the hotel opened.',
      'Keep one coherent aesthetic running across public spaces and private rooms alike, refined and minimal, warm and heritage-driven, bold and contemporary, whatever your brand is actually going for, so a guest never feels like they\'ve walked into a different hotel between the lobby and their floor.'
    ]
  },
  {
    icon: <Bed className="w-6 h-6 stroke-[#0A8378]" />,
    title: 'Give every room its own art, its own companion, its own welcome',
    items: [
      'Put a personalized art frame in each room, reflecting the guest staying there rather than a fixed print ordered for the whole property.',
      'Give each room Vizzy as a real in-room companion, greeting the guest by name and adjusting to why they\'re actually there: a business trip, a honeymoon, a family vacation, a solo wellness stay.',
      'Set the room\'s mood automatically for the occasion: quiet and warm for a late arrival after a long flight, celebratory for an anniversary suite, calm and unhurried for a spa weekend.',
      'Layer music into the room alongside the visuals, so the space feels considered the moment the door opens, not just tidied and turned down.'
    ]
  },
  {
    icon: <Crown className="w-6 h-6 stroke-[#0A8378]" />,
    title: 'Turn event spaces into whatever the occasion actually needs',
    items: [
      'Transform a ballroom or private room for a wedding, a conference, or a private dinner, no repainting, no rented decor, no extra labor to hand-build a mood that only lasts one night.',
      'Match the space to the specific energy of the event, romantic and slow for a wedding reception, sharp and energized for a corporate gathering, so it feels designed for that occasion rather than the same room with different linens.',
      'Turn genuinely great guest moments, a wedding first dance, a milestone celebration, into art the property can showcase elsewhere, the hospitality equivalent of a restaurant putting happy customers on the wall.'
    ]
  },
  {
    icon: <Volume2 className="w-6 h-6 stroke-[#0A8378]" />,
    title: 'Set the mood with sound, not just sight, everywhere on the property',
    items: [
      'Choose from a library of hundreds of thousands of tracks to build real sonic atmosphere in the lobby, the bar, the spa, and each individual room, not a single playlist piped through the whole building.',
      'Tune it to the moment: soft and unobtrusive in a spa, warm and social in a bar, calibrated to the guest\'s own occasion in-room.',
      'Treat sound as seriously as visuals. What envelops a guest acoustically shapes how a stay feels as much as anything on the walls does, and it\'s usually the most underused lever a property has.'
    ]
  },
  {
    icon: <MapPin className="w-6 h-6 stroke-[#0A8378]" />,
    title: 'Bring the destination into every space, common areas and rooms alike',
    items: [
      'Feature local art, photography, and culture throughout the property, so a guest feels genuinely placed in your city, not in an interchangeable box that could be anywhere.',
      'Extend that sense of place into the room itself, not just the lobby, so cultural immersion doesn\'t stop mattering the moment the elevator doors close.',
      'Let the destination\'s character carry the guest from arrival to departure, one continuous sense of place instead of a single mural near the front desk.'
    ]
  }
];

const HOTEL_JOURNEY_STEPS = [
  'Guest arrives at lobby — greeted with living local artwork and ambient entrance music.',
  'Check-in is smooth and personalized based on guest profile and visit reason.',
  'Guest enters room — room art frame displays personalized greeting with guest name.',
  'In-room Vizzy adjusts room light, visuals, and acoustics for late arrival or relaxed evening.',
  'Morning shift — room art transitions gently to soft morning light and ambient wake-up visuals.',
  'Dining & Spa — public spaces evolve seamlessly from daytime freshness to evening luxury glow.',
  'Private Events — ballrooms transform visually for weddings, galas, or high-level summits.',
  'Departure — guest receives a digital memory keepsake artwork of their stay.'
];

const HotelExperienceJourney: React.FC = () => {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    navigate('/contact');
  };

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
              Deckoviz for Hotels
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-fraunces text-4xl sm:text-6xl lg:text-7xl font-medium text-[#0B2A45] leading-[1.1] tracking-tight mb-6"
            >
              The new standard in<br />
              <span className="grad-text">hotel atmosphere & guest journey</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl lg:text-2xl text-[#4C6A83] font-normal max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Elevate your property from a <em className="italic text-[#0B2A45] font-medium">"place to sleep"</em> to an <em className="italic text-[#0B2A45] font-medium">"unforgettable sanctuary of art, story, and sanctuary."</em>
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass-card rounded-3xl p-8 sm:p-10 text-left max-w-4xl mx-auto shadow-xl"
            >
              <h3 className="font-fraunces text-2xl sm:text-3xl text-[#0B2A45] font-medium mb-4">
                With the Deckoviz Hotel GAVP
              </h3>
              <p className="text-[#4C6A83] text-base sm:text-lg leading-relaxed mb-4">
                Deckoviz for Hotels is an AI-powered multi-sensory ambiance infrastructure designed for luxury hotels, boutique resorts, and hospitality groups.
              </p>
              <p className="text-[#4C6A83] text-base sm:text-lg leading-relaxed">
                Using our proprietary AI, Vizzy, Deckoviz curates artwork, local heritage narratives, in-room guest greetings, and ambient soundscapes across your lobby, corridors, guest suites, and ballrooms.
              </p>
            </motion.div>
          </div>
        </section>

        {/* MEDIA / VIDEO & DEMO SECTION */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-fraunces text-3xl sm:text-5xl text-[#0B2A45] font-medium mb-4">
                A glimpse of Deckoviz for your hotel
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
                  <h3 className="font-fraunces text-xl font-medium text-[#0B2A45]">Watch Deckoviz Transform Hotel Spaces</h3>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-white/60">
                  <iframe
                    src="https://www.youtube.com/embed/pq6vb-AvmYc?rel=0&showinfo=0"
                    title="Deckoviz Hotel Ambiance Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
                <p className="text-center text-[#4C6A83] text-sm sm:text-base mt-4">
                  See how Deckoviz elevates lobbies, suites, and public rooms into living art spaces.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col justify-between"
              >
                <div className="text-center mb-4">
                  <h3 className="font-fraunces text-xl font-medium text-[#0B2A45]">Hospitality Visual Stories</h3>
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
                  Explore custom regional curation, guest welcome frames, and resort installations.
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
                Core problems we solve for hotels
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-[#2FC2AE] to-[#1B4C79] mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {HOTEL_PROBLEMS.map((prob, idx) => (
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

        {/* WHY DECKOVIZ FOR HOTELS */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-8">
            <div>
              <h2 className="font-fraunces text-3xl sm:text-5xl text-[#0B2A45] font-medium leading-tight mb-4">
                Why Deckoviz <span className="grad-text">for hotels?</span>
              </h2>
              <p className="text-[#4C6A83] text-lg sm:text-xl font-normal leading-relaxed">
                Your property is a brand destination, not just guest rooms. Deckoviz gives you the power to:
              </p>
            </div>

            <div className="space-y-6 divide-y divide-[#0B2A45]/10">
              {HOTEL_WHY.map((item, idx) => (
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

        {/* SECTION 1: WHAT KINDS OF HOTELS IS THE DECKOVIZ PORTAL FOR? */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-sm border-y border-[#0B2A45]/10">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-semibold text-[#0A8378] tracking-wide uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Hospitality Philosophy
              </span>
              <h2 className="font-fraunces text-3xl sm:text-5xl text-[#0B2A45] font-medium leading-tight mb-4">
                What Kinds of Hotels Is The <span className="grad-text">Deckoviz Portal For?</span>
              </h2>
              <p className="text-[#4C6A83] text-lg sm:text-xl leading-relaxed">
                For properties that want space to speak, heritage to live, and every room to feel personally expected.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {WHAT_KINDS_OF_HOTELS.map((block, idx) => (
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

        {/* SECTION 2: HOW HOTELS USE THE DECKOVIZ PORTAL, IN PRACTICE */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-semibold text-[#0A8378] tracking-wide uppercase mb-4">
                <Building2 className="w-3.5 h-3.5" /> In Practice
              </span>
              <h2 className="font-fraunces text-3xl sm:text-5xl text-[#0B2A45] font-medium leading-tight mb-4">
                How Hotels Use The Deckoviz Portal, <span className="grad-text">in Practice</span>
              </h2>
              <p className="text-[#4C6A83] text-lg sm:text-xl leading-relaxed">
                Concrete ways leading luxury properties, boutique hotels, and resorts transform their public & private spaces.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {HOTEL_PRACTICE_PILLARS.map((pillar, idx) => (
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

        {/* FULL EXPERIENCE PANEL & TIMELINE FOR HOTELS */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="glass-card rounded-[32px] p-8 sm:p-14 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(14,169,155,0.10),transparent_60%)] pointer-events-none" />
              
              <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
                <h3 className="font-fraunces text-2xl sm:text-4xl text-[#0B2A45] font-medium mb-3">
                  The complete Deckoviz hotel guest journey
                </h3>
                <p className="text-[#7C93A6] text-base">
                  From arrival to in-room welcome, dining, spa, and departure.
                </p>
              </div>

              {/* Vertical Timeline */}
              <div className="max-w-2xl mx-auto relative pl-4 sm:pl-6 mb-16">
                <div className="absolute left-[23px] sm:left-[27px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#2FC2AE] to-[#26618f]" />
                <div className="space-y-6 relative z-10">
                  {HOTEL_JOURNEY_STEPS.map((stepText, stepIdx) => (
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
                  That is no longer just a room booking.
                </p>
                <p className="font-fraunces italic text-3xl sm:text-4xl grad-text font-medium py-1">
                  That becomes a cherished sanctuary.
                </p>
                <p className="text-[#4C6A83] text-lg font-normal">
                  And sanctuary is what guests return to.
                </p>

                <div className="pt-6">
                  <button
                    onClick={handleDemoClick}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#0EA99B] to-[#123C63] text-white font-semibold text-base shadow-xl shadow-[#0EA99B]/30 hover:scale-105 transition-all duration-300"
                  >
                    See it in your hotel
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
              Transform your hotel experience:<br />
              <span className="grad-text">schedule your private demo</span>
            </h2>

            <p className="text-[#4C6A83] text-lg sm:text-xl font-normal leading-relaxed max-w-3xl mx-auto">
              The future of hospitality is multi-sensory, personalized, and emotionally intelligent. Deckoviz GAVP for Hotels brings your walls, rooms, and event spaces to life.
            </p>

            <p className="font-fraunces italic text-2xl sm:text-3xl text-[#0B2A45] font-medium pt-4">
              Bring incredible ambiance and guest delight to your property today.
            </p>

            <div className="pt-6">
              <button
                onClick={handleDemoClick}
                className="inline-flex items-center gap-3 px-9 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#0EA99B] to-[#123C63] text-white font-semibold text-base sm:text-lg shadow-2xl shadow-[#0EA99B]/40 hover:scale-105 transition-all duration-300"
              >
                Schedule your private hotel demo
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
        <p>Deckoviz Space Labs — the AI-powered smart art frame platform for hospitality.</p>
      </footer>
    </div>
  );
};

export default HotelExperienceJourney;
