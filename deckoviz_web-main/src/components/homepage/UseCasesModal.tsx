import React, { useEffect, useRef } from "react";
import { X, Sparkles, Heart, Palette, Brain, Star, Wind, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UseCasesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UseCasesModal: React.FC<UseCasesModalProps> = ({ isOpen, onClose }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] flex flex-col bg-slate-100/40 backdrop-blur-[60px] overflow-hidden selection:bg-blue-500/20 font-sans"
      >
        {/* Soft floating background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -left-[5%] w-[60vw] h-[60vw] bg-blue-300/10 rounded-full blur-[100px]" 
          />
          <motion.div 
            animate={{ rotate: -360, scale: [1, 1.2, 1] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute top-[30%] -right-[10%] w-[50vw] h-[50vw] bg-indigo-300/10 rounded-full blur-[100px]" 
          />
        </div>

        {/* Minimal Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="absolute top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        >
          <div className="max-w-4xl w-full bg-white/50 backdrop-blur-3xl border border-white/70 shadow-[0_15px_30px_rgba(37,99,235,0.06)] rounded-full py-4 px-6 md:px-10 flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#182A4A] to-[#2563EB] flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
                An Evolving Guide
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all duration-300 border border-slate-200 shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Content Wrapper */}
        <div ref={scrollRef} className="custom-scrollbar flex-1 overflow-y-auto overflow-x-hidden relative z-10 pt-32 md:pt-40 pb-32 px-4">
          <div className="max-w-5xl mx-auto">
            
            {/* Title Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-24"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                A Long and Evolving Guide To Deckoviz Use Cases and Highlights For Homes
              </h1>
              <h2 className="text-2xl md:text-3xl text-[#2563EB] font-light mb-12">
                Inspiration For How To Make The Most Of It
              </h2>
              
              <div className="bg-white/50 backdrop-blur-2xl border text-left border-white/60 shadow-lg p-10 md:p-14 rounded-[2rem] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#182A4A] to-[#2563EB]"></div>
                <p className="text-xl md:text-2xl leading-relaxed text-slate-700 font-light mb-6">
                  This guide is designed to grow. Deckoviz is not a finished product with a fixed set of uses. It is a living system, and like any living system, it reveals itself over time, growing and evolving with new capabilities and uses. New features will be added. New use cases will be discovered. By us, and by you. This document will keep growing alongside it. Think of it less as a manual and more as a growing anthology of possibility.
                </p>
                <p className="text-lg text-slate-900 font-semibold uppercase tracking-widest text-sm">Below is what we know so far.</p>
              </div>
            </motion.div>

            {/* Content Sections */}
            <div className="space-y-24">
              
              {/* 1. General Purpose and Everyday Use */}
              <section>
                <div className="flex items-center gap-6 mb-10 border-b border-indigo-100 pb-8">
                  <div className="p-4 bg-indigo-50 border border-indigo-100 text-[#2563EB] rounded-2xl shadow-sm">
                    <Wind className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                    1. General Purpose and Everyday Use
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-4">As a mood setter and state machine for the home</h4>
                    <p className="text-slate-600 mb-6 italic border-l-4 border-indigo-100 pl-4 font-light leading-relaxed">Perhaps the most fundamental thing Deckoviz does is give you control over the emotional atmosphere of a room. Not by adding something loud, but by shifting what is already there. Before you do anything deliberate with it, Deckoviz is already doing something. The question is whether you want to be intentional about it.</p>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li className="flex gap-3"><span className="text-[#2563EB] font-bold">•</span>Set a calm, expansive visual in the morning before anyone has said a word</li>
                      <li className="flex gap-3"><span className="text-[#2563EB] font-bold">•</span>Switch to an energizing mode when you need to move or shake</li>
                      <li className="flex gap-3"><span className="text-[#2563EB] font-bold">•</span>Wind down the room in the evening with slower, darker, quieter visuals before sleep</li>
                      <li className="flex gap-3"><span className="text-[#2563EB] font-bold">•</span>Use it to mark transitions in the day rather than letting time blur</li>
                      <li className="flex gap-3"><span className="text-[#2563EB] font-bold">•</span>Create a romantic vibe without changing a single piece of furniture</li>
                      <li className="flex gap-3"><span className="text-[#2563EB] font-bold">•</span>Activate a focus mode that signals to your nervous system that it is time to work</li>
                      <li className="flex gap-3"><span className="text-[#2563EB] font-bold">•</span>Drop into a grateful or reflective state at the end of the day effortlessly</li>
                      <li className="flex gap-3"><span className="text-[#2563EB] font-bold">•</span>Use the visual environment to flow the energy of a dinner party</li>
                      <li className="flex gap-3"><span className="text-[#2563EB] font-bold">•</span>Shift the mood between work hours and leisure hours seamlessly</li>
                      <li className="flex gap-3"><span className="text-[#2563EB] font-bold">•</span>Let Vizzy learn your rhythms and start doing this automatically over time</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-[#182A4A] to-[#2563EB] text-white border border-transparent rounded-3xl p-8 shadow-xl">
                    <h4 className="text-2xl font-bold text-white mb-6">As your personal generative art studio</h4>
                    <ul className="space-y-4 text-indigo-50 font-light text-[15px]">
                      <li className="flex gap-3"><span className="text-cyan-300 font-bold">•</span>Commission an artwork from your own memory, described in words</li>
                      <li className="flex gap-3"><span className="text-cyan-300 font-bold">•</span>Turn a feeling into a visual with no artistic skill required</li>
                      <li className="flex gap-3"><span className="text-cyan-300 font-bold">•</span>Watch a piece evolve slowly across a day rather than sitting static</li>
                      <li className="flex gap-3"><span className="text-cyan-300 font-bold">•</span>Generate something abstract that you genuinely could not have imagined</li>
                      <li className="flex gap-3"><span className="text-cyan-300 font-bold">•</span>Create a piece inspired by a specific artist or movement</li>
                      <li className="flex gap-3"><span className="text-cyan-300 font-bold">•</span>Have an artwork change with the light outside, or with the time of day</li>
                      <li className="flex gap-3"><span className="text-cyan-300 font-bold">•</span>Build a growing collection of artworks that reflect your aesthetic journey</li>
                      <li className="flex gap-3"><span className="text-cyan-300 font-bold">•</span>Use the physics-based or generative modes and let the piece breathe on its own</li>
                    </ul>
                  </div>

                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">As a living photo surface</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li className="flex gap-3"><span className="text-amber-500 font-bold">•</span>Display your favourite photographs not as a screensaver but as considered art</li>
                      <li className="flex gap-3"><span className="text-amber-500 font-bold">•</span>Have Deckoviz surface a memory you had forgotten on no particular occasion</li>
                      <li className="flex gap-3"><span className="text-amber-500 font-bold">•</span>Automatically display the right memory on anniversaries and birthdays</li>
                      <li className="flex gap-3"><span className="text-amber-500 font-bold">•</span>Transform an old photo into an oil painting, a watercolor, a sketch</li>
                      <li className="flex gap-3"><span className="text-amber-500 font-bold">•</span>Animate a still image so it moves gently without becoming a video</li>
                      <li className="flex gap-3"><span className="text-amber-500 font-bold">•</span>Build a rotating gallery of your best work from any period of life</li>
                      <li className="flex gap-3"><span className="text-amber-500 font-bold">•</span>Curate a themed collection and let it run for a week</li>
                    </ul>
                  </div>

                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">As a daily ritual anchor</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span>Start the morning with a quote that shifts the way you think about the day</li>
                      <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span>End the evening with the same image every night, as a signal to the body</li>
                      <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span>Have a specific piece of music and visual paired and activated every Sunday morning</li>
                      <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span>Create a weekly intention ritual where you set what you want the week to feel like</li>
                      <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span>Use a gratitude visual each evening to close the day consciously</li>
                      <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span>Mark the seasons with different visual themes, each activated automatically</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-6">As a source of daily inspiration</h4>
                        <ul className="space-y-3 text-slate-700 font-light text-[15px]">
                          <li>• Art for the Day: something Vizzy selects that it thinks you will love</li>
                          <li>• Quote for the Day: not a generic motivational line, but something calibrated to you</li>
                          <li>• Memory of the Day: a photograph or moment pulled from your history</li>
                          <li>• Knowledge for the Day: a visual prompt to learn something or think differently</li>
                          <li>• Discovery feed: artists, styles, and movements you had never encountered before</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-6">As your personal clock and timepiece</h4>
                        <ul className="space-y-3 text-slate-700 font-light text-[15px]">
                          <li>• Replace a standard clock with one that feels like art</li>
                          <li>• Have the time displayed through generative visuals that change through the day</li>
                          <li>• Use a living clock face that matches the mood of the hour</li>
                          <li>• Design your own clock aesthetic or choose from a growing library</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-6">As your ambient companion while working from home</h4>
                        <ul className="space-y-3 text-slate-700 font-light text-[15px]">
                          <li>• Run a focus visual that helps you stay in a productive state</li>
                          <li>• Use a soundscape paired with a visual to mask distractions</li>
                          <li>• Keep something moving in the background so the room does not feel static</li>
                          <li>• Switch modes when you transition from deep work to calls</li>
                          <li>• Signal to others in the home that you are in focus time without saying anything</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. Families & Kids */}
              <section>
                <div className="flex items-center gap-6 mb-10 border-b border-rose-100 pb-8 mt-24">
                  <div className="p-4 bg-rose-50 border border-rose-100 text-rose-500 rounded-2xl shadow-sm">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                    2. Deckoviz for Families and Kids
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">For the family as a whole</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Create a shared family visual identity: a recurring theme, palette, or aesthetic that is yours</li>
                      <li>• Build a family memory wall that surfaces moments from across the years</li>
                      <li>• Have Deckoviz celebrate family milestones automatically, birthdays, anniversaries, graduations</li>
                      <li>• Use a shared ritual mode that activates at the same time each week, building rhythm into family life</li>
                      <li>• Co-create artworks together and display them as a rotating family gallery</li>
                      <li>• Use the frame during family dinners to spark conversations with a visual prompt or game</li>
                      <li>• Build a visual family archive that grows over the years</li>
                    </ul>
                  </div>

                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">For learning, for kids and parents alike</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Turn a science concept into a visual explanation that makes it click immediately</li>
                      <li>• Use educational posters that are actually beautiful, so they get looked at</li>
                      <li>• Learn history through visual narratives rather than textbooks</li>
                      <li>• Make geography feel like exploration with map-based visual storytelling</li>
                      <li>• Visualize mathematical concepts in ways that make them intuitive</li>
                      <li>• Watch how a concept evolves from simple to complex through layered visuals</li>
                      <li>• Convert a topic your child is studying into a personalized song that teaches it</li>
                      <li>• Use the learning modes for immersive, subject-specific visual environments</li>
                    </ul>
                  </div>

                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">For bedtime and story rituals</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Read a bedtime story to your child while stunning visuals unfold behind you in real time</li>
                      <li>• Let Deckoviz narrate a story in a chosen voice while the imagery responds to the narrative</li>
                      <li>• Build a ritual around a specific story told every Sunday or every holiday</li>
                      <li>• Have a child describe a dream and turn it into a visual they can look at before sleep</li>
                      <li>• Use soft, slow visuals paired with narration as a wind-down ritual</li>
                      <li>• Create a visual storyboard of a family trip or memory and walk through it together</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">For creative play with children</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Transform a child's drawing into a full artwork displayed on the frame</li>
                      <li>• Let children design their own poster, their own rules, their own world</li>
                      <li>• Play a co-creation game where everyone adds one element to a story or artwork</li>
                      <li>• Use Deckoviz as a canvas for a family art project over several weeks</li>
                      <li>• Let children select their own artwork for their room's display</li>
                      <li>• Run Kids Mode which adapts content, pacing, and tone entirely for younger minds</li>
                    </ul>
                  </div>

                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">For educational posters and visual learning</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Alphabet and number displays that are actually beautiful rather than generic</li>
                      <li>• Animal posters with rich visual detail for young children</li>
                      <li>• Periodic table displays that animate and reveal information over time</li>
                      <li>• Maps of the world, of the solar system, of the human body</li>
                      <li>• Timelines of history, science, or art that unfold as visual narratives</li>
                      <li>• Vocabulary and language posters for children learning a second language</li>
                      <li>• Posters that change as a child's knowledge grows</li>
                    </ul>
                  </div>

                  <div className="bg-rose-50 border border-rose-100 shadow-sm rounded-3xl p-8">
                    <h4 className="text-2xl font-bold text-rose-950 mb-6">For the parent who wants something meaningful on the walls</h4>
                    <ul className="space-y-4 text-rose-900/80 font-light text-[15px]">
                      <li>• A rotating gallery of your children's milestones, displayed with beauty</li>
                      <li>• A visual family tree that grows and updates over the years</li>
                      <li>• A shared intention board for what the family is working toward together</li>
                      <li>• An artwork that reflects the mood of the household and invites conversation about it</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. Couples */}
              <section>
                <div className="flex items-center gap-6 mb-10 border-b border-purple-100 pb-8 mt-24">
                  <div className="p-4 bg-purple-50 border border-purple-100 text-purple-600 rounded-2xl shadow-sm">
                    <Star className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                    3. Deckoviz for Couples
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">Setting the scene for time spent together</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Activate a romantic mode for an evening at home without any additional setup</li>
                      <li>• Create a playlist of visuals and music paired together for a date night</li>
                      <li>• Set a slow, candle-lit visual atmosphere that changes the feeling of the room entirely</li>
                      <li>• Use a celebration mode for anniversaries that surfaces the best photographs from that year</li>
                      <li>• Have a visual moment automatically appear on your anniversary without having to remember it</li>
                      <li>• Build a couple's ritual: a specific visual, a specific piece of music, a specific time, weekly</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">Shared memory and reflection</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Build a couple's memory wall from photographs across your history together</li>
                      <li>• Have Deckoviz surface old photographs on meaningful dates</li>
                      <li>• Commission an artwork from a significant moment described in words</li>
                      <li>• Turn a photo from a trip into a painting that lives on the wall</li>
                      <li>• Create a visual book of your relationship across the years that can be scrolled through</li>
                      <li>• Build a growing archive of artworks that hold meaning for both of you</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-6">Shared creative experiences</h4>
                        <ul className="space-y-3 text-slate-700 font-light text-sm">
                          <li>• Co-create an artwork together and display it as something you made</li>
                          <li>• Use Deckoviz as a creative game to play together: describe a world, build it, share it</li>
                          <li>• Generate visual interpretations of songs that matter to your relationship</li>
                          <li>• Play one of the couple-mode games and let Deckoviz generate the prompts</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-6">Intention setting and relationship rituals</h4>
                        <ul className="space-y-3 text-slate-700 font-light text-sm">
                          <li>• Use Deckoviz to hold your shared intentions for the year, displayed as a living vision board</li>
                          <li>• Set a weekly couple ritual using a specific mode and visual sequence</li>
                          <li>• Use the Gratitude mode to end evenings with a shared moment of appreciation</li>
                          <li>• Create a visual reminder of shared goals, displayed in a beautiful way rather than a task list</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-6">Gifting through Deckoviz</h4>
                        <ul className="space-y-3 text-slate-700 font-light text-sm">
                          <li>• Send a personalized artwork directly to another Deckoviz frame as a gift</li>
                          <li>• Create an anniversary artwork from a shared memory and have it appear on their frame</li>
                          <li>• Design a visual love letter using words, music, and generated imagery</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. Creatives */}
              <section>
                <div className="flex items-center gap-6 mb-10 border-b border-amber-100 pb-8 mt-24">
                  <div className="p-4 bg-amber-50 border border-amber-100 text-amber-600 rounded-2xl shadow-sm">
                    <Palette className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                    4. Deckoviz for Creatives
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">As a creative stimulus and training ground</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Use Deckoviz to train your imagination: look at a generated piece and write about it</li>
                      <li>• Practice visualization by describing what you want to see and letting Deckoviz interpret it</li>
                      <li>• Use it as a daily creative prompt by setting Vizzy to surprise you each morning</li>
                      <li>• Build a moodboard for a project and let it live on the wall while you work</li>
                      <li>• Generate variations of a visual idea quickly to explore directions</li>
                      <li>• Use it as a creative mirror: what you are drawn to tells you something about where you are</li>
                    </ul>
                  </div>

                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">For writers</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Visualize the world you are building in real time as you describe it</li>
                      <li>• Turn a chapter or scene into a storyboard to see if the visual logic holds</li>
                      <li>• Use a specific visual mode to get into a character's perspective before writing</li>
                      <li>• Generate a visual for a book you are working on and use it as an anchor on your wall</li>
                      <li>• Turn a poem you have written into a visual experience with narration and music</li>
                      <li>• Use the Book-to-Frames mode on books that are influencing your work</li>
                    </ul>
                  </div>

                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">For visual artists and designers</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Use it to explore styles you are drawn to but have not yet attempted</li>
                      <li>• Generate references that do not exist anywhere else</li>
                      <li>• Run style transfers on your own photographs to explore directions</li>
                      <li>• Build a growing visual research archive of aesthetics and moods</li>
                      <li>• Use Deckoviz as a large-format sketchbook for early-stage concept exploration</li>
                      <li>• Let it generate variations on a visual idea so you can respond and push further</li>
                    </ul>
                  </div>

                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">For musicians and composers</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Sync visuals to your own music and see what it evokes</li>
                      <li>• Use music-responsive generative art as a live visual layer for a performance or session</li>
                      <li>• Use Deckoviz to generate the visual world of an album or project</li>
                      <li>• Use moodscapes to enter creative states before starting a session</li>
                    </ul>
                  </div>

                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">For storytellers and filmmakers</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Turn a story idea into a visual sequence to test its emotional rhythm</li>
                      <li>• Use the storyboard mode to develop a narrative structure with imagery</li>
                      <li>• Generate scene references from descriptions before committing to anything</li>
                      <li>• Visualize character environments to understand them more fully</li>
                      <li>• Use the storyboard-to-film mode to produce early concept sequences</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">For photographers</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Display your work in high quality and in portrait orientation as intended</li>
                      <li>• Cycle through curated selections from your own archive</li>
                      <li>• Apply style transfers to your photographs as a form of experimental practice</li>
                      <li>• Use Deckoviz as a gallery format for sharing work with visitors in your home</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 md:col-span-2">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">As a world-building and imagination training tool</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Describe a fictional world and watch it take visual form</li>
                      <li>• Build a visual mythology around a universe you are creating</li>
                      <li>• Generate landscapes, characters, and objects from a fictional world and curate them</li>
                      <li>• Use it as a companion tool alongside fiction writing to deepen your visual thinking</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 5. Miscellaneous */}
              <section>
                <div className="flex items-center gap-6 mb-10 border-b border-emerald-100 pb-8 mt-24">
                  <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl shadow-sm">
                    <Brain className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                    5. Miscellaneous: Everything Else Worth Knowing
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">Transport and escape</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Transport yourself to another world when you need a break from your own</li>
                      <li>• Use Deckoviz as a portal to nature: ocean waves, forests, mountains, rainfall, open sky</li>
                      <li>• Activate a specific landscape mode when you are homesick or need a particular environment</li>
                      <li>• Use it as a mental travel tool: a city you lived in, a place you want to visit, a landscape that calms you</li>
                      <li>• Let it be your meditation companion: a slow, breathing visual with ambient sound</li>
                      <li>• Use it as your comfort space: a visual environment that makes you feel safe and held</li>
                    </ul>
                  </div>

                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">As your meditation and mindfulness companion</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Use guided visualization experiences with voice and imagery</li>
                      <li>• Run a breathing visual where the piece expands and contracts with a rhythm</li>
                      <li>• Activate a stillness mode that is simply beautiful and asks nothing of you</li>
                      <li>• Use narrated journeys with matching imagery for guided meditation sessions</li>
                      <li>• Pair a specific piece of music and visual for a consistent daily meditation anchor</li>
                    </ul>
                  </div>

                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">As a fiction and fantasy reading companion</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Activate a visual world that matches the book you are reading</li>
                      <li>• Let scenes from the book unfold as visual backdrops while you read</li>
                      <li>• Use visual chat with the book to ask questions about the world while imagery plays behind you</li>
                      <li>• Visualize the settings and characters as you encounter them</li>
                      <li>• Build a visual companion library for every book you finish</li>
                    </ul>
                  </div>

                   <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">As a social space and conversation tool</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Let it run a curated sequence during a dinner party that quietly elevates the room</li>
                      <li>• Use a game mode during social gatherings to break into creativity together</li>
                      <li>• Have guests interact with the frame to co-create or respond to prompts</li>
                      <li>• Use it as a shared canvas during a creative evening with friends</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">For personal growth and intention</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Build a vision board that is actually beautiful and lives on your wall rather than a folder on your phone</li>
                      <li>• Create a visual representation of your goals for the year</li>
                      <li>• Use Deckoviz to hold your personal philosophy in a visual form you can look at daily</li>
                      <li>• Display quotes or principles that matter to you in ways that feel designed, not like motivational posters</li>
                      <li>• Use the intention and focus modes to begin your day with clarity</li>
                    </ul>
                  </div>

                  <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 hover:bg-white/60">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">For hospitality and hosting</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Set a welcoming visual and music combination that guests arrive to</li>
                      <li>• Create a visual sequence that reflects the occasion: a birthday, a holiday, a gathering</li>
                      <li>• Build a shared creative experience for guests to participate in during the evening</li>
                      <li>• Use celebratory modes that activate automatically for specific occasions</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">For wellbeing and rest</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Use wind-down rituals that signal to the body that the day is ending</li>
                      <li>• Run a calming visual at low brightness as a night mode</li>
                      <li>• Use a consistent morning visual to anchor the start of each day</li>
                      <li>• Let Vizzy curate something specifically for you when you need rest, not stimulation</li>
                    </ul>
                  </div>

                   <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300">
                    <h4 className="text-2xl font-bold text-slate-900 mb-6">For the home as a gallery</h4>
                    <ul className="space-y-4 text-slate-700 font-light text-[15px]">
                      <li>• Display a rotating gallery of artists you admire</li>
                      <li>• Discover lesser-known artists through the Deckoviz marketplace and library</li>
                      <li>• Build themed collections and rotate them across weeks</li>
                      <li>• Commission artworks from the marketplace and display them as you would a physical piece</li>
                      <li>• Use the frame as a genuine gallery that changes and grows with your taste</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-6">As a clock and display that does not feel like a device</h4>
                        <ul className="space-y-3 text-slate-700 font-light text-[15px]">
                          <li>• Replace a television screen that stays on doing nothing with something that does something</li>
                          <li>• Use Deckoviz as a clock that blends into the room aesthetically</li>
                          <li>• Have a timepiece that feels like a design object rather than a utility</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-6">For the individual profile and personalization layer</h4>
                        <ul className="space-y-3 text-slate-700 font-light text-[15px]">
                          <li>• Set up individual profiles for each person in the household so Deckoviz knows each person's preferences</li>
                          <li>• Let different profiles surface different artwork, music, and modes for different people</li>
                          <li>• Allow Vizzy to calibrate over time so that what it shows you becomes increasingly personal and precise</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* 6. Conclusion Section */}
              <section className="pb-32 mt-24">
                <div className="border border-indigo-100 p-12 md:p-20 rounded-[3rem] bg-indigo-50/50 shadow-sm">
                  
                  <div className="max-w-4xl mx-auto text-left">
                    <h3 className="text-4xl md:text-5xl font-bold mb-8 text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                      6. A Section That Will Never Be Finished
                    </h3>
                    <p className="text-slate-800 text-lg md:text-xl font-light mb-6">
                      This is the last section of this guide. It is also the one that will never be complete.
                    </p>
                    <p className="text-slate-800 text-lg md:text-xl font-light mb-6 leading-relaxed">
                      Deckoviz is designed as a system that reveals new uses over time. Not because we planned every use case in advance, but because people find things we did not anticipate. That is the nature of an open creative platform. The more people use it, the more the space of possibility expands.
                    </p>
                    <p className="text-slate-800 text-lg md:text-xl font-light mb-12 leading-relaxed">
                      Some uses will emerge from new features we ship. Some will emerge from combinations of existing features no one had thought to try. Some will come from a specific household, in a specific moment, when someone does something unexpected with the frame and realizes it works.
                      We will document those uses here as they appear.
                    </p>
                    
                    <div className="bg-white/50 border border-white/60 backdrop-blur-2xl shadow-lg p-10 md:p-14 rounded-[2rem] mb-16 text-left">
                      <h4 className="font-bold text-2xl mb-4 text-slate-900">Newly discovered and added use cases</h4>
                      <p className="text-slate-500 mb-8 italic text-sm">This section is updated as new features launch and as users share what they have discovered.</p>
                      <ul className="space-y-6 text-slate-700 font-light text-[15px]">
                        <li><span className="font-bold text-[#2563EB] mr-2">•</span>Use Deckoviz as a visual journaling companion: describe your day in words and let it generate a visual summary</li>
                        <li><span className="font-bold text-[#2563EB] mr-2">•</span>Pair Deckoviz with cooking: set a visual mode that matches the cuisine you are making</li>
                        <li><span className="font-bold text-[#2563EB] mr-2">•</span>Use it as a language immersion tool: display content in the language you are learning with visual context</li>
                        <li><span className="font-bold text-[#2563EB] mr-2">•</span>Run a visual timer using a generative artwork that slowly transforms as time passes</li>
                        <li><span className="font-bold text-[#2563EB] mr-2">•</span>Use the frame during a creative writing session as a live visual prompt that evolves in parallel with your writing</li>
                        <li><span className="font-bold text-[#2563EB] mr-2">•</span>Create a visual map of a book series and use it as a living companion across your reading of it</li>
                        <li><span className="font-bold text-[#2563EB] mr-2">•</span>Use Deckoviz during a yoga or movement practice as a visual anchor that evolves with the session</li>
                        <li><span className="font-bold text-[#2563EB] mr-2">•</span>Generate visual art from a piece of music you composed yourself and see how it reads back to you</li>
                        <li><span className="font-bold text-[#2563EB] mr-2">•</span>Use it as a visual anchor during therapy or coaching sessions: a neutral, beautiful surface that takes the pressure off eye contact</li>
                        <li><span className="font-bold text-[#2563EB] mr-2">•</span>Build a visual advent calendar using Deckoviz: a new image, story, or moment for each day of a season</li>
                        <li><span className="font-bold text-[#2563EB] mr-2">•</span>Use the frame as a collaborative world-building tool with a group: each person adds one element to a shared visual world across a week</li>
                      </ul>
                    </div>

                    <p className="italic text-[#2563EB] text-xl font-medium mb-16 text-center md:text-left">
                      This guide will keep growing. If you discover a use we have not documented, we want to know about it.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 border-t border-indigo-200 pt-10">
                      <div className="p-3 bg-gradient-to-tr from-[#182A4A] to-[#2563EB] rounded-full shadow-md">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold tracking-tight text-slate-900 border-l border-indigo-200 pl-6 py-2">
                        Deckoviz. <span className="font-light italic text-[#2563EB]">A living visual system for home.</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 14px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
            margin-block: 80px; 
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(37, 99, 235, 0.4);
            border-radius: 999px;
            border: 4px solid #F8FAFC; 
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(37, 99, 235, 0.7);
          }
        `}} />
      </motion.div>
    </AnimatePresence>
  );
};
