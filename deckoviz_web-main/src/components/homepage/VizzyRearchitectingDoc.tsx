import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Flame, BrainCircuit, ShieldAlert, Sparkles, 
  Orbit, Compass, Heart, Activity, Globe, Monitor
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VizzyRearchitectingDoc() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#050308] text-white selection:bg-purple-500/30 font-sans pb-32 overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[20%] w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[900px] h-[900px] rounded-full bg-fuchsia-600/10 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute top-[50%] left-[30%] w-[700px] h-[700px] rounded-full bg-crimson-600/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '15s', animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-16">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-white/60 hover:text-white mb-16 transition-all group"
        >
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:scale-105 group-hover:-translate-x-1 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold tracking-widest uppercase">Go Back</span>
        </button>

        {/* Header Title */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeIn}
          className="text-center mb-28 space-y-8"
        >
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-white/10 rounded-full shadow-[0_0_60px_rgba(168,85,247,0.3)] mb-8">
            <ShieldAlert className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-br from-white via-purple-100 to-fuchsia-400 bg-clip-text text-transparent leading-[1.1] tracking-tight drop-shadow-lg max-w-4xl mx-auto">
            Surviving Rearchitecting Hell
          </h1>
          <p className="text-xl sm:text-3xl text-purple-200/80 font-light tracking-wide pt-6 max-w-3xl mx-auto leading-relaxed">
            Vizzy 2.0 and the Year of Discipline
          </p>
        </motion.div>

        {/* Content Container */}
        <div className="space-y-24">

          {/* Intro Section */}
          <SectionBlock color="purple">
            <P>
              After an arduous journey through what I can only describe as pivot purgatory, we're back, and back to the roots, to the core idea that started it all.
            </P>
            <P>
              It’s taken a while to get to DASP 1.2, and we have had to meander through quite a few hairpin stretches. Because of the nature of what we were building, because of how genuinely exciting the possibilities were, it became so easy to get overexcited and stretched thin in various directions; when you have constrained resources, this richness of options became a serious issue, and it almost killed us.
            </P>
            <P>
              Building a personal art and story engine is intoxicating - you see all these directions you could go, all these capabilities you could add, all these markets and people and personas you could serve. And when you're early and ambitious, when you have drunk enough of your own kool aid, the temptation to do it all, and do it fast, and do it all together, becomes almost irresistible.
            </P>
            <P>
              Especially today, when everything is moving oh-so fast, and you get captured by the fastness dimension of it, ignoring the richness and salience. And so it was, which led to a product that became way too bloated, and that veered too much from the original wedge vision.
            </P>

            <BlockQuote variant="purple">
              After a months-long near-death experience, the core realization we are imbibing deep into the most foundational DNA is being disciplined is how we will not only survive but give ourselves the best chance of thriving in the long future.
            </BlockQuote>
            
            <H3 className="text-purple-300">This chapter is called the year of discipline.</H3>
            <P>
              We have made a conscious choice to only add more modules upon hitting certain user numbers. There will come a time when we can build just for kicks - for now, we are building with a very clear focus - no distractions, no scope creep, no throwing every feature we can think of at the wall and hoping some stick. Unless it passes both the conviction/intuition AND the data bar, it does not belong at this time.
            </P>
          </SectionBlock>

          <Divider color="purple" />

          {/* Threshold Section */}
          <SectionBlock 
            title="The 300 Threshold: And The Big Blunder"
            icon={<Activity className="w-8 h-8 text-fuchsia-400" />}
            color="fuchsia"
          >
            <P>
              To get production going, to go from prototype to actually shipping, we needed to get pre-orders of 300 units - the minimum order our manufacturing partner would accept whilst still keeping the manufacturing costs in the acceptable realm. And we had a very limited window in which to hit those numbers.
            </P>
            <P>
              We were in a real pickle - without getting to that magic number, we simply couldn't get production started. This put us under immense pressure, pressure that got converted into a strategy as sophisticated as throwing spaghetti at the wall targeting everyone one, with decision making that was so scrambled on my part I think I need to get my head checked! So yeah, that didn't quite work out.
            </P>
            <P>
              In hindsight, starting small and starting organically would have been the right move. We've now found a neat temporary solution out of the dilemma, which has given us some breathing space without having that 300-unit number hanging over my head like a guillotine blade.
            </P>
            <P className="font-medium text-fuchsia-200 text-xl border-l-[4px] border-fuchsia-500/50 pl-6 my-6 italic">
              The undue pressure also led to scrambled decisions, bringing people on for roles we didn't actually need yet, building for futures that weren't guaranteed to materialize. Taking on too many things simultaneously. Getting overextended instead of building the best personal generative art frame period.
            </P>
            <P>
              I set some short-term goals that in hindsight, I’d say were cuckoo, and I had to set these partially due to the hard manufacturing threshold requirements, but I'm sure I could have found an alternative to such reach goals had I spent more time on target calibration even back then, as we have now.
            </P>
            <P>
              The necessity of needing to cross the 300-unit threshold and the ensuing pressure led to making many suboptimal decisions in product positioning, roadmap, hiring, architecture. It led me to prematurely expand the scope of the product before we'd established PMF, and in doing so, we got stuck in scope creep, half-heartedly building lots of stuff for imaginary markets instead of narrowing down the people we wanted to serve and building something lean, mean, and focused for them.
            </P>
            <P>
              The whole affair felt like we were just painting by numbers, a death knell to a company that was trying to serve creativity on a platter. It was cosmic irony.
            </P>
            <H3 className="text-fuchsia-300">Now, we have rectified that glaring error.</H3>
            <P>
              If you are going to put yourself beyond the optimal level of pressure, or learn the tools to navigate that pressure and transmute that pressure and use that, to channel that, then your decision making and your creativity are going to suffer, and it's going to suffer big time. And considering the fact that your decisions, your strategy, your creativity are the alpha, the only thing that you have as a start up, if you're not operating optimally at that level, you are cooked, you are ngmt.
            </P>
          </SectionBlock>

          {/* Journey Section */}
          <SectionBlock 
            title="I Share This Because of The Art, The Medium"
            icon={<Heart className="w-8 h-8 text-pink-400" />}
            color="pink"
          >
            <P>
              I don't particularly enjoy sharing the personal journey, the messy parts. But building in public is necessary for certain kinds of companies, even when it's uncomfortable, especially when it's uncomfortable. Because the sanitized version of entrepreneurship, where everything goes according to plan and setbacks are just minor speed bumps, that version is a lie. The reality is much messier, much more brutal, and much more instructive.
            </P>
            <P>
              Especially for us, as we are building an art-and-story platform, we've got to be able to share our story, and art is all about transmuting pain and setbacks into elevated meaning. Stories have their arcs, their ups and downs, and I'm going to be building this for the next ten years, for the next twenty years, and I want to share the many ups and the many downs we'll face and bring people in along the journey.
            </P>
            <P className="font-semibold text-pink-200">
              We failed with the first version of the product. Failed disastrously, epically, in the worst way I could have anticipated. Simple as. I'd be lying to myself if I didn't accept that, and that's a cardinal sin I have no time for.
            </P>
            <P>
              But it's better to be early and fail than being late and failing. In the latter case, you have no more shots on goal. In our case, our chambers are still loaded for a few more attempts. And one more attempt is all we need.
            </P>
            
            <BlockQuote variant="pink">
              I feel like I have been through the ringer over the last 6 months. There were nights I would wake up with cold sweats, thinking about how we could survive, whether we could, with literal dreams of melting runways and burning ropes visiting me every night. Because this was existential.
            </BlockQuote>

            <P>
              We didn't have long left. We didn't have many shots. As a resource-intensive outfit, this was it. This was our last pass. Get it wrong, and all the blood, sweat, and tears would be for nought. It was death by a thousand cuts. All resources maxed out, credit cards, loans, all of it. Wouldn't recommend this to anyone, but I share this because at some point in the future it will be fun to look back at just how crazy things were and how we made it work. At some point, I hope to laugh and smile about the weight. Isn’t that what art is all about, after all.
            </P>
            <P>
              In one of those nights, I had the answer to our woes. It's the architecture, silly. Simplify the product and the market. When in doubt, simplify, as Eric Ries wrote in the Lean Startup. I should have known better, learnt faster, since it was one of my favourite books 10 years back. From that need for clarity was thus born Vizzy 2.0.
            </P>
          </SectionBlock>

          <Divider color="fuchsia" />

          {/* Death Spiral Section */}
          <SectionBlock 
            title="The Death Spiral and the Phoenix"
            icon={<Flame className="w-8 h-8 text-rose-400" />}
            color="rose"
          >
            <P>
              Since we didn't meet the target for manufacturing, and considering the burn, especially with the punishing infrastructure spend, we were functionally dead in the water. But not buried yet. This period has been pretty brutal, especially so because it seemed like we should be able to meet the threshold for manufacturing comfortably. Not doing so put us in a genuine death spiral.
            </P>
            <P>
              I've faced some dark times in previous times and ventures, but I don't think anything comes close to how punishing the post-threshold failure period has been. We didn't have enough capital to keep our servers running, which can be a death knell for any company. I was cooked, and all that was left was the fat lady coming to sing. You also have your loved ones and well wishers say that maybe the data is telling you something. That you are beating your head against the wall, and the wall is not relenting. Nothing is. Instead of a reality distortion field, you feel the inevitable suck towards a black hole, pulling you ever closer to your demise, slowly but surely.
            </P>
            <H3 className="text-rose-300 border-l-[3px] border-rose-500 pl-4 py-1">
              When you have the blows we did, you start doubting everything about the project, about the mission. Failure has this feature to it, where it can colonize your entire thinking.
            </H3>
            <P>
              Failing in one part of the product - in my case, not meeting the production threshold and some product architecture suboptimalities, can lead to you concluding that the whole thing was misguided from the start, to reduce the psychological weight. In your single-mindedness and narrow view, you fail to realize that you didn't fail because the project lacks promise or massive potential with the right execution, but because you made some critical calls wrong. Had you made different choices regarding version one scope, architecture, team, etc, you would have been able to avoid the needless pain.
            </P>
            <P>
              This forced a lot of reevaluation, product redesign, and what has arisen from that cold freezing water is the phoenix by the name of Vizzy. Redesigning our architecture from scratch has felt like such a lease of life for me. Because it's difficult to keep conviction going when all you're getting are blow after blow, but having a breakthrough of this magnitude feels like the sun peeking through after months of unrelenting storms.
            </P>
          </SectionBlock>

          {/* Architecture Section */}
          <SectionBlock 
            title="The Architectural Breakthrough"
            icon={<BrainCircuit className="w-8 h-8 text-indigo-400" />}
            color="indigo"
          >
            <P>
              Around five months back, when it became certain that we were going to miss the minimum order mark, thus unable to ship any units, and thus unable to generate any revenue, we had a moment of great crisis. All the best laid plans lain to waste, and it felt like the end of the dream. But c'est la vie. You fall and you have to learn to rise up with more conviction the next time.
            </P>
            <P>
              I share all this as a reminder that a lot of building is expecting the worst, having unrelenting setbacks, walking through the feet puncturing glass, and moving forward while maintaining the same determination, resolve, and ideal. Also, in many cases, if you are smart about it, you can transmute a delay or setback into something of a good thing, because the alternative path may get you to a better product. Though you don’t want to console yourself with fairytales of “this is better” just because. For us, this meant having three eureka moments that have changed the shape of the product completely.
            </P>
            
            <H3 className="text-indigo-300">The Router Insight</H3>
            <P>
              One of the eureka moments was inspired by routers. Routers are so magnificently simple, and yet they are one of the secret sauces behind human cognition, the LLM/ChatGPT explosion, and the DeepSeek 10x cost reduction leap. They reduce complexity, thus allowing a richer breadth of outcomes, counterintuitively.
            </P>
            <P>
              This is where we had our first big insight. Instead of having more than 50 disparate entry points for 50 features, as we had, why don't we unify all of them into one, into Vizzy Creation Canvas, letting it guide the user? We used inspiration from a mixture of expert models, building a routing system so we can have the best results - with optimized agents - for each specific use case while maintaining a single, unified interface.
            </P>
            <P>
              It had never really clicked like this until now. Because while the ultimate product vision was as clear as it's been, there are many ways to skin a cat, and we never really did find the one that would make us go nuts with excitement. Until now. There is a charming beauty to simplicity. Not just aesthetic beauty, but product beauty.
            </P>
          </SectionBlock>

          <Divider color="purple" />

          {/* Less Is More Section */}
          <SectionBlock 
            title="The Lesson: Less Is More"
            icon={<Compass className="w-8 h-8 text-purple-400" />}
            color="purple"
          >
            <P>
              One of the mistakes we made was building in a vacuum. People I spoke with loved it, but for many early testers, they were inundated by too much stuff. They said maybe over time they could utilize more and more, but to start with, they don't need a ton. We had 50 different interfaces for various modalities of art creation, visual generation, story and enterprise features, and more.
            </P>
            <P>
              Early testers were overwhelmed. And so we have now compressed everything into a seamless interface, agentic in the backend, very intuitive, with one place for artworks, posters, products, everything, helping you navigate this very intuitively with your Vizzy.
            </P>
            <BlockQuote variant="purple">
              When you're building, you realize the many directions possible, and you get excited. The key to a good product is saying no, and no, and no.
            </BlockQuote>
            <P>
              Take your favourite chatbot, for instance: ChatGPT offers so much, but through one interface. Claude Code has a super simple UI. The future is one super simple UI for everything - people want more options, but they have a limited bandwidth - so add more in the backend, minimize entry points in the front end.
            </P>
            <P>
              We had so many physics-based art modules and generative art capabilities, beyond transformer-based into computational art, procedural generation, all sorts of sophisticated stuff. People don't need that at the start. People need familiarity. Too much novelty, too much radicalism in design and product can be disorienting. Even if we had the tech, a smartphone wouldn't have worked in the world of 1960. Even if we had the tech, an electric car wouldn't have worked in 1860.
            </P>
            <P>
              As revolutionary as a product may be, it has to meet people where they are. OpenAI seems to have had a similar realization, and it does give me some solace that even an 800 billion pound gorilla like OpenAI can be prone to the same set of misplaced conclusions, and mistakes, which is reflected in them downgrading their plans with their first AI wearable from something radically futuristic to something more accessible, more day-to-day in its form factor.
            </P>
          </SectionBlock>

          {/* Strategy Section */}
          <SectionBlock 
            title="A Lesson In How To Think About Building for the Future"
            icon={<Orbit className="w-8 h-8 text-fuchsia-400" />}
            color="fuchsia"
          >
            <P>
              The temptation to build for where the puck will be in five years has been quite strong in me, and it can become a problem. Even with Elinity, one of the big lessons I've come to realize is sure, build the future, but build it one familiar step after another. Too much unfamiliar stuff, and you lose the wedge.
            </P>
            <P>
              We thus redesigned that product from the ground up around this insight. We had built up many experiences, modes, session types, games, only to realize that this is absolutely the wrong way to go about it. This realization didn't even need contact with reality like the Deckoviz realization did. I just parlayed the Deckoviz lesson onto Elinity. Collapsing complexity should be the name of the game at the start. Once you have the base, then you can launch your fancy experiments.
            </P>
            <H3 className="text-fuchsia-300">Resist The "More Is Better" Trap</H3>
            <P>
              Another strong temptation is that more is better. Resist that. It may be better in the longer term, but the name of the game in the first stage is all about collapsing complexity and having a clean, clear-cut experience, and getting a critical mass of users who love that atomic unit of utility. Vizzy now provides a very natural way of interfacing with the platform and its inherent richness, which could easily become confusing or cluttered if you're not careful.
            </P>
            <P>
              One of the reasons the set of realizations took longer to register, it took far longer for the penny to drop, is because of the all-in, all-consuming nature of this bet. If you've maxed everything out and gone all in, you're prone to not looking at the bigger picture holistically, even strategically, as you become more caught up in the tactics of it. And that can be your undoing.
            </P>
            <BlockQuote variant="fuchsia">
              When you're all in, there's a strong undercurrent of pressure, an underlying fear response, the absolute necessity of it needing to work out or else. Which makes you prone to tunnel vision.
            </BlockQuote>
            <P>
              Going all in is fine, conviction is a glorious thing to behold, but only the intelligent, grounded, constantly-challenged kind. You need a strong counterweight to that internal pressure that just eats up your background cognition, high-level intuition, bandwidth. That, I realized, was one of the failure modes in the first phase.
            </P>
            <P>
              All in sounds fun, but if you're not careful, all in can soon turn into all gone. You may not have another shot left. So build a system that keeps questioning you and pushing you and prodding you and probing you all the time. The more you question your assumptions, the more your question in general, the better the quality of the questions will get, and the better the answers will get, and the better the product will get.
            </P>
          </SectionBlock>

          <Divider color="pink" />

          {/* Rearchitecting vs Pivoting */}
          <SectionBlock 
            title="On Rearchitecting vs. Pivoting"
            icon={<Globe className="w-8 h-8 text-pink-400" />}
            color="pink"
          >
            <P>
              Rearchitecting is somewhat like pivoting in the sense that you change your approach, but not the direction or the endpoints. We're still building a personal art platform. That hasn't changed. What's changed is how we're building it, how we're structuring the product, how we're presenting it to users. It's the same mountain, just a different route to the summit.
            </P>
            <P>
              If you can't critique your creation or product like it's your most ferocious competitor's, if you can't rip it to shreds when necessary, if you can't be ruthlessly honest about what's working and what's not, then you don't have the iron and you're not going to make it. That capacity for brutal self-assessment is what will allow you to recognize you may need to tear everything down and rebuild from first principles.
            </P>
            <P>
              And you have to get resourceful - you may need to bite the bullet and reduce the ambition in the shorter term. We had to do that, which allows us to start shipping now, without needing to meet the original thresholds.
            </P>
            <P className="font-semibold text-pink-200 mt-6">
              This phase felt a kind of pivot hell, like purgatory, trying various approaches with everything maxed-out and essentially no runway, with imminent death. Things really seemed dire.
            </P>
            <P>
              Through some dark nights, faith did flicker if I'm being honest, but the art has been a massive help, as if it was made for that very moment. And it was. While I never lost the faith entirely, even as the many relentless issues seemed to become insurmountable considering the timelines, there were moments of real doubt, and in these moments, the art created with Vizzy became front and center, it become a cornerstone of courage, hope, resolve, conviction, belief. In a way, I relearnt the power of art and stories - the very power and promise we want to put in every single home - because I went through this hellish phase.
            </P>
          </SectionBlock>

          {/* DASP 2.0 */}
          <SectionBlock 
            title="The Vizzy Philosophy and DASP 2.0"
            icon={<Sparkles className="w-8 h-8 text-indigo-400" />}
            color="indigo"
          >
            <P>
              We have also recalibrated the messaging and the framing, pun intended. When you're building something of this sort, the risk of being too early can be fatal. I know this is the future, but the world doesn't leap into the future. You have to cajole it, you have to hold its hand, and you have to bring the future one accessible step at a time.
            </P>
            <P>
              So we reduced a lot of the future-heavy-esque, expansive messaging. The goal is to wedge ourselves in in this world as it exists today, so we may have the chance to expand into those glorious futures and to expand forth from there.
            </P>
            
            <H3 className="text-indigo-300">A Unified Master AI</H3>
            <P>
              With the many changes we have been making, one of the big ones is a brand new architecture: Vizzy 2.0 is a lot more than your creation engine. It's your creative companion, your thinking partner, your muse, your interface to everything the platform can do. With our new routing architecture, we have built specialized modules for the core use cases on the platform, and they're all accessible through Vizzy. Think of you as the owner, Vizzy as your manager, and it has various personas or agents working under it that it directs at your direction.
            </P>
            <P>
              We like to call these agents "personas" or "avatars" because "agents" sounds too sterile for the kind of work we do. And "agents" would never cut the mustard for our homes. For that, we have creative buddies and muses and companions. Vizzy has around 20 sub-agents that are then deployed from the unified chat interface to give you what you want.
            </P>
            <BlockQuote variant="indigo">
              In a way, we have redesigned everything around Vizzy. A unified architecture, a unified interface, and a unitary master AI that manages all the others.
            </BlockQuote>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div>
                <H3 className="text-purple-300 border-b border-purple-500/30 pb-2 mb-4 text-xl">What Vizzy Can Do For Homes</H3>
                <P className="text-sm">For home users, Vizzy becomes your creative ecosystem:</P>
                <div className="space-y-4 mt-6">
                  <div>
                    <span className="font-bold text-white block mb-1">Personal Artist</span>
                    <span className="text-white/60 text-sm">Your partner in creating deeply meaningful artworks, exploring ideas, motifs, themes, states, feelings, iterating on concepts, and co-generating pieces.</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-1">Poster Creator</span>
                    <span className="text-white/60 text-sm">Personalized posters for any occasion, theme, need. For movies, quotes, vision boards. Grounding, calm, or inspiration.</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-1">Curator, Ambiance & Vibe Setter</span>
                    <span className="text-white/60 text-sm">Moodscapes and experience creator that sets the right atmosphere for any mood, moment, bringing together just the right visuals, sounds.</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-1">Story Buddy</span>
                    <span className="text-white/60 text-sm">Your companion in creating stories together, whether for children at bedtime, personal reflection, fantasy worlds, or visual short stories.</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-1">Journal Bud</span>
                    <span className="text-white/60 text-sm">Your Inner World Exploration Companion. A space to process emotions, use art, poems, and diary entries as a tool for self-understanding.</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-1">Vizzy Visual Chat Companion</span>
                    <span className="text-white/60 text-sm">For books and reading, creating visual companions to your reading experience, bringing ideas to life.</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-1">Vizzy Muse</span>
                    <span className="text-white/60 text-sm">When you have a seed of an idea but need a thinking partner. This persona animates all other avatars. A meta-avatar.</span>
                  </div>
                </div>
              </div>

              <div>
                <H3 className="text-fuchsia-300 border-b border-fuchsia-500/30 pb-2 mb-4 text-xl">What Vizzy Can Do For Businesses</H3>
                <P className="text-sm">For enterprise customers, Vizzy transforms into a business platform:</P>
                <div className="space-y-4 mt-6">
                  <div>
                    <span className="font-bold text-white block mb-1">Vizzy as Chief Agent</span>
                    <span className="text-white/60 text-sm">Space concierge that understands context, frequent guests, brand experience representative, engaging with guests inside the location.</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-1">Signage & Poster Creator</span>
                    <span className="text-white/60 text-sm">Creating professional signage for any business need: specials, dynamic menus, event announcements, sales.</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-1">Brand Photographer</span>
                    <span className="text-white/60 text-sm">Stunning product/dish photos, images representing the items in different contexts, capturing photos and visualizing customers artistically.</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-1">Director Agent & Video Creator</span>
                    <span className="text-white/60 text-sm">Brand videocreator for ads, demonstrations, dish presentations. Content without expensive crews or in-store ads.</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-1">Experience Designer</span>
                    <span className="text-white/60 text-sm">Curator of moodscapes to match the atmosphere, changing the vibe based on customer personas in real-time.</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-1">Custom Art Creator</span>
                    <span className="text-white/60 text-sm">Personalized artworks for customers making interactions memorable. Mementos of their visits.</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-1">Brand Storyteller & Copywriter</span>
                    <span className="text-white/60 text-sm">Ensuring aesthetic, consistent, compelling, & on-brand messaging for posters, signage, videos, and menus.</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-1">Sounds, Music, Narration</span>
                    <span className="text-white/60 text-sm">Designing auditory experiences. Background music, voice-overs, soundscapes.</span>
                  </div>
                  <div>
                    <span className="font-bold text-white block mb-1">Business Strategist</span>
                    <span className="text-white/60 text-sm">Helping brainstorm marketing, in-store ads, remembering guest preferences for returning customers to create personalization at scale.</span>
                  </div>
                </div>
              </div>
            </div>

          </SectionBlock>

          <Divider color="purple" />

          {/* Iterative Realizations / Post Script */}
          <SectionBlock 
            title="The Path Forward & Iterative Realizations"
            icon={<Monitor className="w-8 h-8 text-purple-500" />}
            color="purple"
          >
            <P>
              Doing too much was quite foolhardy. And there were some pretty monumental strategic mistakes. Now it's back to the simple goal of building the ultimate personal art and storytelling platform. Not being able to start production, and compelled to go back to the drawing board, we did the only thing we could - we took the time to improve the product dramatically.
            </P>
            <P>
              We have also made foundational changes, improving visual quality, art generation depth, refining the memory layer and system card. We've created one unified interface that early testers now love instead of being overwhelmed by. Seeing how much the platform has been evolving has been the most fun part of building it.
            </P>
            <P>
              In the last three months, after being back to the drawing board, racing against time, facing what seemed like insurmountable obstacles at times, what has emerged from that pressure cooker is something far improved. Something that actually delivers on the promise we've been chasing.
            </P>

            <div className="my-10 p-8 rounded-3xl border border-white/10 bg-white/5 shadow-inner">
              <H3 className="text-white uppercase tracking-widest text-sm mb-4 border-b border-white/20 pb-2 inline-block">Realizations Log</H3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                  <span className="text-white/70 leading-relaxed">I learnt a lot from the failures of the last 6 months. We focused on too many verticals, too many features, too many offerings.</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                  <span className="text-white/70 leading-relaxed">We have refined and streamlined our offerings, focusing on the pure essence, no bells and whistles, no additional suites and modules. In a way, it feels good to go back to the roots - of the seed that started it all. Moving away faster from the conception, outgrowing your revenue, is the quickest way to kill a product's potential.</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                  <span className="text-white/70 leading-relaxed">When you start building something with as much creative potential as Deckoviz it's easy to get carried away and forget the fundamentals. One of which is the only job right now is to minimize complexity. Even in terms of B2B markets, we have discarded all but 1 for this phase.</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 mt-2 shrink-0" />
                  <span className="text-white/70 leading-relaxed font-semibold italic text-fuchsia-100">Extreme essentialism is the name of this phase.</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                  <span className="text-white/70 leading-relaxed">Essentialism has been one of my favourite books of all time since I read it 5 years back. But the work me never did internalize those lessons the non-work me did. Funny how compartmentalization works.</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                  <span className="text-white/70 leading-relaxed">And a clear-eyed view of what went wrong with DASP 1: Our less is more philosophy was missing. Having loads of features also made infra costs exorbitant, which put pressure on everything.</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                  <span className="text-white/70 leading-relaxed">DASP 1.2: Core things we have added. We have made it simpler by design. Revamped.</span>
                </li>
              </ul>
            </div>

            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mt-20 p-10 md:p-14 rounded-[3rem] bg-gradient-to-br from-purple-900/40 via-indigo-900/20 to-fuchsia-900/40 border border-purple-500/20 backdrop-blur-xl shadow-[0_0_80px_rgba(168,85,247,0.15)] relative overflow-hidden group text-center"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="relative z-10 space-y-6">
                <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
                  The year of discipline starts now.
                </p>
                <div className="h-px w-24 bg-purple-500/50 mx-auto my-6" />
                <p className="text-xl sm:text-2xl text-purple-200 font-light leading-relaxed max-w-2xl mx-auto">
                  One clear vision. One focused mission. No more scope creep, no more trying to be everything to everyone, no more building for imaginary or future markets. 
                </p>
                <p className="text-2xl sm:text-3xl pt-6 font-black bg-gradient-to-br from-white via-purple-200 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
                  Just building the best personal art platform we possibly can, one disciplined decision at a time.
                </p>
              </div>
            </motion.div>

          </SectionBlock>

        </div>
      </div>
    </div>
  );
}


/* -------------------------------------------------------------------------- */
/*                            REUSABLE COMPONENTS                             */
/* -------------------------------------------------------------------------- */

function SectionBlock({ title, children, icon, color = "purple" }: { title?: string, children: React.ReactNode, icon?: React.ReactNode, color?: string }) {
  const borderColors: Record<string, string> = {
    purple: "border-purple-500/20 group-hover:border-purple-500/40",
    fuchsia: "border-fuchsia-500/20 group-hover:border-fuchsia-500/40",
    pink: "border-pink-500/20 group-hover:border-pink-500/40",
    rose: "border-rose-500/20 group-hover:border-rose-500/40",
    indigo: "border-indigo-500/20 group-hover:border-indigo-500/40",
  };

  const shadowColors: Record<string, string> = {
    purple: "shadow-[0_8px_32px_rgba(168,85,247,0.05)]",
    fuchsia: "shadow-[0_8px_32px_rgba(217,70,239,0.05)]",
    pink: "shadow-[0_8px_32px_rgba(236,72,153,0.05)]",
    rose: "shadow-[0_8px_32px_rgba(244,63,94,0.05)]",
    indigo: "shadow-[0_8px_32px_rgba(99,102,241,0.05)]",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative p-8 sm:p-14 bg-[#140b20]/40 border rounded-[3rem] backdrop-blur-2xl ${borderColors[color] || borderColors.purple} ${shadowColors[color] || shadowColors.purple} overflow-hidden group transition-colors duration-700`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="relative z-10">
        {title && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-12 pb-8 border-b border-white/10">
            {icon && (
              <div className="p-4 bg-white/5 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] shrink-0">
                {icon}
              </div>
            )}
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent drop-shadow-md leading-tight">
                {title}
              </h2>
            </div>
          </div>
        )}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function H3({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return <h3 className={`text-2xl font-semibold mt-10 mb-5 tracking-wide leading-relaxed ${className}`}>{children}</h3>;
}

function P({ children, className = "text-white/70 leading-relaxed text-[18px]" }: { children: React.ReactNode, className?: string }) {
  return <p className={className}>{children}</p>;
}

function BlockQuote({ children, variant = "purple" }: { children: React.ReactNode, variant?: "purple" | "fuchsia" | "pink" | "rose" | "indigo" }) {
  const colors: Record<string, string> = {
    purple: "border-purple-500/40 bg-purple-500/5 text-purple-200 shadow-[0_0_30px_rgba(168,85,247,0.1)]",
    fuchsia: "border-fuchsia-500/40 bg-fuchsia-500/5 text-fuchsia-200 shadow-[0_0_30px_rgba(217,70,239,0.1)]",
    pink: "border-pink-500/40 bg-pink-500/5 text-pink-200 shadow-[0_0_30px_rgba(236,72,153,0.1)]",
    rose: "border-rose-500/40 bg-rose-500/5 text-rose-200 shadow-[0_0_30px_rgba(244,63,94,0.1)]",
    indigo: "border-indigo-500/40 bg-indigo-500/5 text-indigo-200 shadow-[0_0_30px_rgba(99,102,241,0.1)]",
  };
  return (
    <blockquote className={`my-10 p-8 rounded-3xl border ${colors[variant] || colors.purple} border-l-[6px] text-2xl font-medium leading-relaxed italic`}>
      "{children}"
    </blockquote>
  );
}

function Divider({ color = "purple" }: { color?: string }) {
  const innerColors: Record<string, string> = {
    purple: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]",
    fuchsia: "bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.8)]",
    pink: "bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]",
    rose: "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]",
  };
  return (
    <div className="py-16 flex items-center justify-center opacity-40">
      <div className="h-px w-full max-w-[200px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div className={`w-2 h-2 rounded-full mx-4 ${innerColors[color] || innerColors.purple}`} />
      <div className="h-px w-full max-w-[200px] bg-gradient-to-r from-white/50 via-transparent to-transparent" />
    </div>
  );
}
