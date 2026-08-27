import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FadeUp } from "./EnterpriseSectionLoader";

const faqs = [
  {
    category: "What Deckoviz Actually Is",
    items: [
      {
        q: "Isn't this just a fancy TV?",
        a: "It is a fair first question, and the honest answer is: it shares a screen with a TV, in the same way a Michelin-starred kitchen shares an oven with a fast food restaurant. The hardware is a starting point. What makes Deckoviz different is the intelligence running on it.\n\nDeckoviz is a generative ambience and visual intelligence platform. It creates, curates, and manages everything that appears on your frame - original artwork, professional signage, brand films, soundscapes, personalised guest experiences - all driven by an AI that learns your business over time and operates as your creative and marketing partner.\n\nA TV plays content you put into it. Deckoviz GAVPort generates content for you, adapts it to your brand, schedules it autonomously, and gets better the longer you use it. Over time, it becomes an increasingly impactful Chief Generative and Experience Officer for your space, and your business.\n\nThis could have been a pure art and generative frame, but we decided to provide as much value in one device as we could - that is our core philosophy.\nSome of our customers use the portal as a pure art frame, for its intelligent ambiance\nMany of our customers use it largely as an experience enhancer, for its generative, marketing and experiential intelligence.\nAnd the remaining set of our customers use it as a hybrid, using it as an art frame and experience enhancer most of the time, but occasionally, for special events like sports events and such, using it as a Google TV for streaming.\n\nThis is, by design, a create-your-own-adventure kind of an experience, where you will be assisted by Vizzy every step of the way to make the best use of the platform in whatever way suits your needs and preferences.\nTo learn more about the device and its differentiators, go to the What makes Deckoviz GAVPort section here: https://deckoviz.com/deckoviz-for-enterprises#deckoviz-special"
      },
      {
        q: "Isn't this just for art?",
        a: "Not remotely. Art is one of over a hundred and fifty features on the platform. Deckoviz generates professional visual content, be it posters, signage, live content, daily specials boards, product and dish photography, brand films, seasonal campaigns, customer souvenir artworks, ambient soundscapes, brand narrations, menu posters, event content, and much more.\n\nThink of it as the creative and marketing infrastructure of your space - everything your walls, your atmosphere, and your customer experience communicates, managed intelligently in one place. Art is part of that. It is far from all of it."
      },
      {
        q: "As an enterprise owner, say a restaurant owner, why should I actually care about this?",
        a: "It depends on what kind of experience you are attempting to create for your guests - and most operators are creating more than one of these at once.\n\nIf you care about guest experience, Deckoviz becomes your atmosphere and delight engine - creating the right visual and sonic environment for every service, personalising moments for special occasions, and giving guests something to notice, remember, and talk about.\nIf you care about brand storytelling, it becomes the medium through which your restaurant's legacy, philosophy, and food culture are communicated - the story behind your dishes, your provenance, your craft, told beautifully and continuously.\nIf your needs are primarily functional, it handles your daily specials board, your menu display, your event signage, and your promotional content - professionally, on-brand, in seconds rather than hours.\nAnd if you want your space to feel genuinely alive and adaptive, Deckoviz shifts the visual and atmospheric character of your room based on the time of day, the occasion, the customer in front of you - creating a space that feels different at Saturday lunch and Saturday dinner, because it actually is.\n\nMost businesses find they are all four of these things to varying degrees. Deckoviz handles all of them from one platform."
      },
      {
        q: "How does Deckoviz actually work?",
        a: "The system has three connected components. The Deckoviz frame lives on your wall - a large-format premium display running on Google TV OS, always on, always showing something purposeful, something beautiful. The mobile app connects directly to the frame and gives you real-time control from anywhere in your space. The GAVPort - our web portal - is your deeper operations hub for scheduling, content management, campaign building, and accessing the full Vizzy feature suite.\n\nEverything runs through Vizzy, our AI platform operating system. You describe what you need - a poster, a mood, a campaign, an ambiance shift - and Vizzy creates it, schedules it, and manages it on your behalf. As it learns your business over time, it takes on an increasingly proactive, autonomous role.\n\nFor a full walkthrough of the platform, visit the How It Works section of our website or speak with our team about a personalised demo."
      },
      {
        q: "What kinds of businesses is Deckoviz built for?",
        a: "Deckoviz is built for any business where the physical environment matters to the customer experience. That includes restaurants, cafes, and bars; hotels and hospitality venues; retail boutiques and flagship stores; beauty, wellness, and spa environments; co-working spaces and members' clubs; corporate lobbies and event spaces; and healthcare and professional waiting environments.\n\nIf your customers spend time in your space and their experience of that space influences how they feel about your brand, Deckoviz has a role to play. For a breakdown of use cases by vertical, visit our Industry Solutions section."
      }
    ]
  },
  {
    category: "Setup, Technology, and Ease of Use",
    items: [
      {
        q: "How easy is it to set up?",
        a: "Setup takes around ten to fifteen minutes from unboxing to first content on screen. You connect the frame to your Wi-Fi, sign into a Google account on the Google TV interface, download the Deckoviz mobile app, and pair your phone to the frame with a code. That is it.\n\nYour team does not need any technical expertise. The frame is designed to be set up by the person who runs the space, not by an IT department. Our onboarding team is available to walk you through the process if needed, and most customers are live within the first hour."
      },
      {
        q: "How easy is it to use day to day? Will it take significant time to manage?",
        a: "The short answer is no - and this is one of the things our customers comment on most consistently. Once your initial schedule and content preferences are set up, the frame runs itself. Most daily operations require less than five minutes of attention.\n\nFor new content - a daily specials poster, an event announcement, a mood shift - Vizzy generates it from a conversational brief in under a minute. You describe what you want, Vizzy creates it, and you push it to the frame. There is no design software, no briefing agency, no waiting.\n\nThe more you use it, the less you need to manage it. Vizzy learns your preferences, your schedule, and your patterns over time, and its Automagic Mode progressively takes on more of the curation and scheduling on your behalf."
      },
      {
        q: "Does Deckoviz require an internet connection?",
        a: "Yes, an active internet connection is required for the full Vizzy AI feature suite - content generation, real-time updates, scheduling sync between the app and the frame, and cloud library access all require connectivity.\n\nA stable broadband connection is recommended for the best experience. For venues with intermittent connectivity, we recommend speaking with our team about offline content options and pre-loaded content configurations that can bridge short connection gaps."
      },
      {
        q: "Does the frame work as a regular TV as well?",
        a: "Yes. The frame runs on Google TV OS, which means it has full access to streaming platforms, Google apps, and broadcast content alongside the Deckoviz platform. For sporting events, live broadcasts, or any occasion where you want to stream content, you can switch to Google TV mode at any time and back again.\n\nMost enterprise customers run Deckoviz as their default mode and use Google TV for specific events. The switch is instant and can be managed from the mobile app."
      },
      {
        q: "Can I manage multiple frames across multiple locations from one account?",
        a: "Yes. The GAVPort supports multi-frame and multi-site management from a single account. You can push different content to different frames simultaneously, synchronise content across frames for a unified brand moment, or manage entirely independent schedules for each location or each room within a location.\n\nFor groups with multiple properties, Vizzy can maintain group-wide brand consistency while allowing each property its own distinct configuration and content calendar. Speak with our enterprise team about multi-site setups and the bulk pricing options available."
      },
      {
        q: "What connectivity does the frame need? Does it require any specialist installation?",
        a: "The frame connects via standard Wi-Fi or ethernet and requires a standard power connection. No specialist installation is needed beyond wall-mounting, which follows the same process as mounting any large-format display.\n\nWe recommend a dedicated Wi-Fi network or ethernet connection for enterprise environments with heavy network traffic. Our team can advise on optimal connectivity setup during onboarding."
      }
    ]
  },
  {
    category: "Vizzy AI and Platform Capabilities",
    items: [
      {
        q: "Who or what is Vizzy?",
        a: "Vizzy is the AI operating system of the Deckoviz platform. It is not a chatbot, a template library, or a content scheduling tool. It is a unified creative intelligence that runs every feature on the platform - art generation, poster creation, video production, soundscapes, brand photography, scheduling, campaign planning, ambiance management, and more - through a single conversational interface.\n\nYou talk to Vizzy the way you would talk to a talented creative director who knows your business. You describe what you need, and Vizzy builds it. Over time, as it learns your brand, your customers, your offerings, and your operational patterns, it becomes an increasingly capable and proactive partner.\n\nThink of it as the difference between a tool and a team member. Vizzy is designed to become the latter."
      },
      {
        q: "What is CCEMO Mode? Does Vizzy actually become my space's creative and marketing officer?",
        a: "CCEMO stands for Chief Creative, Experience, and Marketing Officer - and yes, this is precisely the direction Vizzy is designed to move in over time.\n\nIn early use, Vizzy operates as a highly capable creative tool: you give it briefs, it produces excellent results. But as it accumulates context on your business - your brand identity, your customer personas, your seasonal patterns, your content preferences, your operational rhythms - it begins to operate more proactively. It suggests content before you ask for it. It identifies moments that deserve specific creative treatment. It builds campaigns, manages your content calendar, and curates your space's atmosphere with increasing autonomy.\n\nThe CCEMO mode is what we call Automagic Mode in practice: Vizzy functioning not just as a tool you use, but as an intelligent creative and marketing partner that manages your space's visual and experiential output on your behalf. For venues that want a beautifully managed space with minimal ongoing effort, this is the destination."
      },
      {
        q: "How contextual is Vizzy? Will it actually adapt to my specific business?",
        a: "This is one of the most important things to understand about Deckoviz. Everything Vizzy creates is anchored in your business profile - your brand identity, your colour palette, your tone of voice, your customer personas, your offerings, your space, and your aesthetic preferences. Nothing is generic.\n\nWhen you first set up your account, you upload your brand guidelines and complete a business profile that gives Vizzy its initial context. From that point, every piece of content it generates is brand-specific. And with every interaction - every brief you give it, every piece of content you approve or adjust, every scheduling pattern you establish - Vizzy's understanding of your business deepens.\n\nThe more you use it, the more it feels like it was built specifically for your business. Because, in a very real sense, it is."
      },
      {
        q: "What can Vizzy actually create? Give me the full picture.",
        a: "The honest answer is that a short FAQ cannot do this justice - the platform has over 150 individual features. But the core categories are: original artwork and custom art series; professional posters and signage; dish and product photography (phone upload to editorial-quality output); brand films and short videos; ambient soundscapes and generative music; brand narrations and voiceovers; seasonal and occasion-based campaigns; personalised customer souvenir artworks; daily and weekly scheduling; content collections and playlists; QR code integration; and multi-frame management.\n\nFor a comprehensive breakdown of capabilities by business type, visit our Platform Features section. For a walkthrough specific to your vertical, speak with our team."
      },
      {
        q: "Can I upload my own content - photos, brand assets, videos?",
        a: "Yes, and this is one of the most-used features on the platform. You can upload your brand photography, product or dish images, logos, videos, and any other visual assets. Uploaded content integrates fully with Vizzy - it can be used as the input for generation (transforming a phone photo of a dish into editorial-quality imagery, for example), included in collections and playlists, or displayed as-is on the frame.\n\nYour existing brand assets do not become redundant when you start using Deckoviz. They become the raw material Vizzy builds from."
      },
      {
        q: "Can Deckoviz create audio experiences, not just visual ones?",
        a: "Yes. The audio layer is a full part of the platform, not an add-on. Vizzy can generate ambient soundscapes tailored to your mood brief, curate music playlists by genre, tempo, and time of day, produce professional-quality brand narrations and voiceovers, and design layered audio environments that combine music, ambient sound, and narration.\n\nSound can be tied to your visual ambiance schedule - so as the room shifts from lunch service to dinner service visually, the sonic character of the space shifts with it - or managed independently. For environments where atmosphere is everything, the audio layer is one of the most impactful parts of the platform."
      }
    ]
  },
  {
    category: "Content, Scheduling, and Operations",
    items: [
      {
        q: "How does scheduling work? Can the frame really run itself?",
        a: "Yes. The scheduling system lets you programme exactly what appears on your frame, when, and for how long. Events can be one-off, recurring daily, recurring weekly, recurring monthly, or seasonal. Once set, the frame executes the schedule automatically with no manual intervention required.\n\nIn practice, most enterprise customers spend one session per week - often less - reviewing and refreshing their schedule. Everything between those sessions runs autonomously. For customers using Automagic Mode, even that session becomes optional: Vizzy manages the schedule on your behalf based on its accumulated understanding of your patterns."
      },
      {
        q: "How quickly can I create and publish new content?",
        a: "For most content types, from brief to frame in under two minutes. A daily specials poster: describe the dishes, Vizzy generates the poster, you push it to the frame. A mood shift for a private dining event: brief Vizzy, it builds the ambiance, it activates at the right time. A product video: Vizzy generates it from uploaded images and a text brief, ready to review within minutes.\n\nThe speed is one of the most consistently surprising things for new customers, particularly those who have previously relied on design agencies or in-house teams for content production. The throughput Deckoviz enables is categorically different from any previous workflow."
      },
      {
        q: "Can I create personalised content for specific customers or occasions?",
        a: "Yes, and this is one of the most distinctive things Deckoviz offers. You can generate bespoke content for individual occasions - a personalised artwork for a couple celebrating their anniversary, a welcome display for a VIP guest, a custom souvenir piece for a guest's hundredth visit.\n\nFor venues with CRM integration, returning guest profiles can be linked to the platform so that relevant personalised content can be surfaced automatically when known guests arrive. Personalised guest experiences at this level of specificity have historically required significant operational investment. Deckoviz makes them a routine capability."
      },
      {
        q: "What happens to all the content I create? Is it saved?",
        a: "Everything you create on Deckoviz is saved to your library - searchable, organised by type, and always accessible from the GAVPort or mobile app. You can organise content into named collections, build playlists, and access your full content history at any time.\n\nYour library grows into a genuine brand content asset over time. Content created for last year's Christmas campaign is there to build from this year. Artwork created for one location can be deployed at another. Nothing is lost and nothing needs to be recreated from scratch."
      },
      {
        q: "Can different zones in my venue show different content simultaneously?",
        a: "Yes. If you have multiple Deckoviz frames across different zones - lobby, restaurant, bar, spa, meeting rooms - each can be managed independently with its own content schedule and ambiance configuration. You can also synchronise frames across zones for unified brand moments, or group them by zone type.\n\nA hotel, for example, might have its lobby frame running destination and arrival-focused content while its restaurant frame is showing the evening's menu and ambiance, and its spa frame is running a calm, wellness-focused visual and audio environment - all managed from one GAVPort account, all running simultaneously."
      }
    ]
  },
  {
    category: "Commercial, Practical, and Long-Term Considerations",
    items: [
      {
        q: "What is the warranty on the frame?",
        a: "Deckoviz frames come with a standard manufacturer's warranty covering hardware defects. Enterprise customers additionally have access to our priority support programme, which includes faster response times for hardware issues, remote diagnostics for platform issues, and dedicated account management.\n\nFor full warranty terms and enterprise support options, speak with our enterprise team or visit the Support section of our website."
      },
      {
        q: "What does maintenance look like? Is there ongoing cost or effort?",
        a: "Hardware maintenance is minimal - the frame requires no more upkeep than any quality display product. Platform updates are delivered automatically and silently over Wi-Fi, so you are always on the latest version of Deckoviz and Vizzy without any action required from your team.\n\nThe platform subscription covers ongoing access to all features, Vizzy AI capabilities, the content library, and platform updates. There are no per-generation charges for content creation and no hidden fees for new features as they are released. Everything Vizzy adds over time is part of the same subscription."
      },
      {
        q: "Are bulk or multi-unit discounts available?",
        a: "Yes. We offer structured pricing for multi-unit purchases and multi-site enterprise accounts. The specifics depend on the number of frames, the locations, and the subscription configuration, and are handled on a case-by-case basis through our enterprise team.\n\nIf you are considering deploying Deckoviz across multiple venues or multiple zones within one venue, speak with us early in the process - the commercial structure for enterprise rollouts is meaningfully different from single-unit pricing, and we want to make sure you have the right proposal from the start."
      },
      {
        q: "What is the subscription cost on top of the hardware? What do I get for it?",
        a: "The platform subscription covers full access to Vizzy AI and all generative features, the Deckoviz content library, all platform updates and new feature releases, multi-frame management, scheduling and events tools, mobile app access, GAVPort web portal access, and customer support.\n\nSubscription pricing is structured by the number of frames and the level of enterprise features required. For current subscription pricing and a breakdown of what is included at each tier, visit our Pricing page or speak with our enterprise team who can put together a tailored proposal for your venue."
      },
      {
        q: "How does this compare to traditional digital signage? Why not just use what we already have?",
        a: "Traditional digital signage requires you to create content elsewhere, upload it manually, manage playlists yourself, and engage a designer or agency every time something needs to change. It is a display system. You provide the intelligence; it provides the screen.\n\nDeckoviz provides the intelligence too. Vizzy creates the content, manages the schedule, adapts to your brand, generates new material on demand, and improves over time. The comparison is roughly equivalent to asking why you would use a brilliant in-house creative and marketing team when you already have a noticeboard. The noticeboard holds content. The team creates it, refines it, and makes sure it is always right for the moment.\n\nFor venues already running digital signage, the transition to Deckoviz typically takes less than a day and immediately eliminates the content creation backlog that makes most signage systems underperform."
      },
      {
        q: "Is my content and brand data secure on the platform?",
        a: "Yes. All content and brand data uploaded to Deckoviz is stored securely, encrypted in transit and at rest, and is never used to train external AI models or shared with third parties. Your brand assets, business profile, and generated content belong entirely to you.\n\nFor enterprise customers with specific data residency or security requirements, speak with our team about our enterprise data policies and the configuration options available for your account."
      },
      {
        q: "We already have a marketing team and a designer. Is Deckoviz still relevant for us?",
        a: "Absolutely - and in fact, many of our most engaged enterprise customers have exactly this. Deckoviz is not a replacement for creative talent. It is the infrastructure that makes creative talent faster, more consistent, and more productive.\n\nYour designer can upload brand assets, set the visual rules, and build the framework. Vizzy then operates within that framework to handle the high-volume, high-frequency content needs - the daily specials, the mood shifts, the event signage, the seasonal content - that would otherwise eat into your team's time. The creative team focuses on the work that requires genuine creative direction. Deckoviz handles the execution layer.\n\nThe result is a consistently on-brand, high-quality visual environment that no team of any size could maintain purely manually."
      },
      {
        q: "What does getting started actually look like? What is the first step?",
        a: "The simplest starting point is a demonstration. Our team will walk you through the platform in the context of your specific business - your venue type, your customer base, your content needs - so you see exactly what Deckoviz would look like working for you rather than a generic showcase.\n\nFrom there, the typical journey is: select your frame tier, complete your business profile and brand upload during onboarding, set up your first week's content schedule with our team's support, and go live. Most enterprise customers are generating content and running a live schedule within their first week. Many have Vizzy operating autonomously within their first month.\n\nTo book a demo or speak with our enterprise team, visit deckoviz.com/enterprise or contact us directly. We would love to show you what your space could look like."
      }
    ]
  },
  {
    category: "TVs, Display Quality, and Hardware",
    items: [
      {
        q: "What if I already have TVs in my space? Why would we need Deckoviz as well?",
        a: "Great question, and an important one to be clear about. Deckoviz is not designed to be a TV. It is a generative ambience and visual intelligence portal that happens to run on a TV-grade display, for reasons of cost, optionality, and practicality, which we will get into below.\n\nThe role Deckoviz plays in a space is entirely different from the role a television plays. A television is there to show content someone else made, on demand, when a guest chooses to watch it. Deckoviz is there continuously, generating and curating an experience that is native to your brand and your space, whether anyone picks up a remote or not. Many of our customers already have TVs in their rooms or venues, and Deckoviz sits alongside them, doing a completely different job.\n\nHow our customers actually use it varies quite a bit, and that is intentional. Some use it purely as an intelligent art frame, generating and rotating custom artwork for a space that previously had either nothing on the wall at all, or something static and generic. Some use it primarily as a brand storytelling surface, telling the story of a restaurant's provenance, a hotel's history, or a product's craftsmanship. Some lean into it as a guest delight engine, creating personalised moments and memorable atmosphere for the people in front of them. Most customers land somewhere across all of these, using different capabilities for different rooms, different times, and different occasions.\n\nWe do build Deckoviz on a Google TV form factor, and there are two deliberate reasons for that. First, it lets us keep hardware costs down and pass that saving on to you, rather than building a bespoke display from scratch. Second, it gives customers who want it the optionality of also using the frame as a full Google TV - streaming a live sporting event, running a broadcast, or accessing standard smart TV apps - and switching straight back to Deckoviz mode when the moment has passed. You get the intelligence platform as the core experience, with the flexibility of a smart display underneath it, should you ever want it."
      },
      {
        q: "Since Deckoviz runs on a TV, does that mean the picture quality looks like a TV rather than like actual art?",
        a: "This is one of the most thoughtful questions we get, and we take it seriously, because it goes to the heart of what makes Deckoviz different from a screen.\n\nYou are right that the underlying hardware is TV-grade display technology, for the cost and optionality reasons covered above. But out-of-the-box television picture settings are built to make video content look vivid, punchy, and hyper-sharp - optimised for movies and sports, not for static or slow-moving artwork. Left untouched, that TV-tuned image would work against the art-like quality we want every Deckoviz frame to have. So we have addressed this deliberately, at three different levels.\n\nAt the firmware level, we adjust the display's underlying picture characteristics before the frame ever reaches you - reducing artificial sharpness, correcting oversaturation, and recalibrating settings that make video content look vivid but make artwork look synthetic. The result is a base image that reads as painted or printed rather than broadcast.\n\nAt the hardware level, we offer an optional anti-glare matte screen add-on. This is the single biggest lever for making a Deckoviz frame feel like a genuine canvas rather than a display - it softens reflections, removes the glassy sheen typical of TV panels, and gives the surface a texture much closer to real paper or canvas, especially in well-lit rooms.\n\nAnd at the software level, we give every customer a quick-reference guide to fine-tune picture settings beyond our factory defaults, so you can adapt brightness, warmth, and contrast to the specific lighting conditions of your space. A frame in a sun-drenched restaurant window and a frame in a dim, candlelit dining room need different settings to look their best, and this puts that control directly in your hands.\n\nBetween the firmware calibration we do before the frame ships, the optional matte finish, and the software controls available to you, the result is a display that customers consistently describe as looking like art on the wall, not a screen that happens to be turned on. It is a genuine design priority for us, not an afterthought, and it is one of the areas we continue to invest in as the hardware evolves."
      }
    ]
  }
];

const EnterpriseFAQ = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-indigo-50/80">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-b from-white to-transparent z-0 pointer-events-none" />
      <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, #e0e7ff, #c7d2fe)" }} />
      <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none opacity-50"
        style={{ background: "radial-gradient(circle, #e0e7ff, #ede9fe)" }} />
        
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="text-center mb-24 flex flex-col items-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/70 border border-white shadow-[0_4px_20px_rgba(37,99,235,0.05)] backdrop-blur-md mb-8">
              <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
              <span className="text-[11px] font-bold text-[#182A4A] tracking-[0.2em] uppercase">Enterprise FAQs</span>
            </div>

            {/* Title */}
            <h2 
              className="text-5xl md:text-7xl font-bold text-[#182A4A] leading-tight mb-6 tracking-tight" 
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Quick Reference <span className="italic bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent font-medium pr-2">Guide</span>
            </h2>

            {/* Subtitle */}
            <div className="text-lg md:text-[19px] text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
              <p>Everything you need to know about what Deckoviz can do for your business.</p>
              <p>Common questions from enterprise customers, answered clearly.</p>
            </div>
          </div>
        </FadeUp>

        <div className="space-y-16 md:space-y-24">
          {faqs.map((section, sIdx) => (
            <div key={sIdx} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-b border-indigo-100/30 pb-16 last:border-0 last:pb-0">
              {/* Category Title Column (Left) */}
              <div className="lg:col-span-4">
                <FadeUp delay={0.1 * sIdx}>
                  <div className="sticky top-32">
                    <h3 
                      className="text-3xl md:text-4xl font-semibold text-[#182A4A] mb-6 leading-tight tracking-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {section.category}
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full opacity-80" />
                  </div>
                </FadeUp>
              </div>
              
              {/* FAQ Items Column (Right) */}
              <div className="lg:col-span-8 space-y-5">
                {section.items.map((item, iIdx) => {
                  const id = `${sIdx}-${iIdx}`;
                  const isOpen = openIndex === id;

                  return (
                    <FadeUp key={id} delay={0.05 * iIdx}>
                      <div 
                        className={`group relative backdrop-blur-3xl rounded-2xl md:rounded-[1.5rem] overflow-hidden transition-all duration-500 cursor-pointer 
                          ${isOpen 
                            ? 'bg-white/60 border border-white/90 shadow-[0_20px_40px_rgba(0,0,0,0.08)] ring-1 ring-blue-400/30' 
                            : 'bg-white/30 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:bg-white/50 hover:border-white/80 hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)]'
                          }`}
                        style={{
                          boxShadow: isOpen 
                            ? "0 20px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,1)" 
                            : "0 8px 32px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)"
                        }}
                        onClick={() => toggleFAQ(id)}
                        onMouseEnter={() => setOpenIndex(id)}
                        onMouseLeave={() => setOpenIndex(null)}
                      >
                        {/* Animated Glass Shine */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[glass-sweep_1.5s_ease-in-out_infinite] z-0 pointer-events-none" />

                        <div className="relative z-10 flex justify-between items-center p-6 md:p-8 text-gray-900">
                          <h4 className={`font-bold text-lg md:text-xl pr-4 transition-colors duration-300 leading-snug ${isOpen ? 'text-blue-700' : 'text-[#182A4A] group-hover:text-blue-600'}`}>
                            {item.q}
                          </h4>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className={`shrink-0 transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-[#182A4A]/40 group-hover:text-blue-500'}`}
                          >
                            <ChevronDown size={24} strokeWidth={2.5} />
                          </motion.div>
                        </div>
                        
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <div className="relative z-10 px-6 md:px-8 pb-6 md:pb-8 text-gray-700 whitespace-pre-line text-[16px] leading-relaxed border-t border-black/5 pt-6 mt-2">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </FadeUp>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Animation Styles */}
      <style>
        {`
          @keyframes glass-sweep {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}
      </style>
    </section>
  );
};

export default EnterpriseFAQ;
