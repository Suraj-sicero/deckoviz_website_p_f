import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RefreshCw, Globe, Zap, Eye, ExternalLink } from 'lucide-react';
import WorldScene from '../components/world/WorldScene';
import { generatePreviewImage, generateMarbleWorld, MarbleWorldResult } from '../lib/generateWorld';

type Stage = 'idle' | 'loading_image' | 'preview' | 'loading_world' | 'ready';

// ── Loading bar ───────────────────────────────────────────────────────────────
const LoadingBar: React.FC<{ label: string; sub: string; color: string; progress?: number }> = ({ label, sub, color, progress }) => (
  <div className="flex flex-col items-center gap-6 max-w-sm w-full">
    <div className="relative w-20 h-20 rounded-3xl flex items-center justify-center"
         style={{ background: `radial-gradient(circle, ${color}33, transparent 70%)` }}>
      <div className="absolute inset-0 rounded-3xl animate-ping opacity-20" style={{ background: color }} />
      <Sparkles className="w-9 h-9" style={{ color }} />
    </div>
    <div className="text-center space-y-1">
      <h2 className="text-xl font-bold tracking-[0.12em] uppercase text-white animate-pulse">{label}</h2>
      <p className="text-xs font-mono text-white/40 tracking-widest">{sub}</p>
    </div>
    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
      <motion.div className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        initial={{ width: '5%' }}
        animate={{ width: `${progress ?? 85}%` }}
        transition={{ duration: progress ? 0.5 : 5, ease: 'easeInOut' }} />
    </div>
  </div>
);

const PROMPTS = [
  "A lava land with pathways and dragons flying in the sky",
  "An island surrounded by turquoise water with a few cottages",
  "A dark cyberpunk city with neon lights and flying ships at night",
  "An ancient forest with giant glowing mushrooms and ruins",
  "A snowy arctic tundra with aurora borealis and ice crystals",
];

const Steps: React.FC<{ current: number }> = ({ current }) => (
  <div className="flex items-center gap-2 mb-12 w-full max-w-xs">
    {['Describe', 'Preview', 'Explore'].map((s, i) => (
      <React.Fragment key={s}>
        <div className={`flex items-center gap-2 transition-all duration-500 ${i <= current ? 'opacity-100' : 'opacity-30'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all
            ${i < current ? 'bg-purple-500 text-white' : i === current ? 'bg-white text-black' : 'bg-white/10 text-white/40'}`}>
            {i < current ? '✓' : i + 1}
          </div>
          <span className="text-xs font-medium uppercase tracking-wider text-white/60">{s}</span>
        </div>
        {i < 2 && <div className={`flex-1 h-px transition-all duration-700 ${i < current ? 'bg-purple-500' : 'bg-white/10'}`} />}
      </React.Fragment>
    ))}
  </div>
);

// ── Main page ─────────────────────────────────────────────────────────────────
const CreateWorld: React.FC = () => {
  const [stage,       setStage]       = useState<Stage>('idle');
  const [prompt,      setPrompt]      = useState('');
  const [previewUrl,  setPreviewUrl]  = useState('');
  const [marbleWorld, setMarbleWorld] = useState<MarbleWorldResult | null>(null);
  const [marbleError, setMarbleError] = useState<string | null>(null);
  const [marbleProgress, setMarbleProgress] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentStep = stage === 'idle' || stage === 'loading_image' ? 0
                    : stage === 'preview' ? 1 : 2;

  // Step 1 — generate concept art preview
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setStage('loading_image');
    try {
      const url = await generatePreviewImage(prompt);
      setPreviewUrl(url);
      setStage('preview');
    } catch {
      setStage('idle');
    }
  };

  // Step 2 — call Marble API to build real 3D world
  const handleBringToLife = async () => {
    setStage('loading_world');
    setMarbleWorld(null);
    setMarbleError(null);
    setMarbleProgress(10);

    // Animate progress heuristically
    const interval = setInterval(() => {
      setMarbleProgress(p => Math.min(p + Math.random() * 8, 88));
    }, 4000);

    try {
      // Pass the concept art as image input → uses marble-1.1-plus
      const world = await generateMarbleWorld(prompt, previewUrl.startsWith('http') ? previewUrl : undefined);
      setMarbleWorld(world);
      setMarbleProgress(100);
      clearInterval(interval);
      setStage('ready');
    } catch (err: any) {
      clearInterval(interval);
      console.error('[CreateWorld] Marble error:', err);
      setMarbleError(err?.message || 'World generation failed');
      // Still go to ready — fall back to procedural world
      setMarbleProgress(100);
      setStage('ready');
    }
  };

  const handleReset = () => {
    setStage('idle'); setPrompt(''); setPreviewUrl('');
    setMarbleWorld(null); setMarbleError(null); setMarbleProgress(0);
  };

  // ── READY: show the 3D world ───────────────────────────────────────────────
  if (stage === 'ready') {
    return (
      <motion.div key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-black">
        <WorldScene textureUrl={previewUrl} prompt={prompt} marbleWorld={marbleWorld} />
        {marbleError && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] bg-yellow-900/60 backdrop-blur border border-yellow-500/30 px-4 py-2 rounded-full">
            <p className="text-yellow-300 text-xs font-mono">Marble unavailable — showing procedural world</p>
          </div>
        )}
        <button onClick={handleReset}
          className="fixed bottom-8 right-8 z-[60] bg-black/60 backdrop-blur-xl border border-white/20 text-white px-5 py-3 rounded-full flex items-center gap-2 hover:bg-white/10 transition-all group text-sm font-medium">
          <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          New World
        </button>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-hidden selection:bg-purple-500/30"
         style={{ backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(99,60,180,0.15), transparent 60%)' }}>
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <AnimatePresence mode="wait">

          {/* ── IDLE / LOADING IMAGE ─────────────────────────────────────────── */}
          {(stage === 'idle' || stage === 'loading_image') && (
            <motion.div key="idle" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.5 }}
              className="w-full max-w-3xl flex flex-col items-center">
              <Steps current={currentStep} />

              <div className="relative mb-8">
                <div className="absolute inset-0 blur-3xl bg-purple-600/30 rounded-full scale-150" />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-2xl">
                  <Globe className="w-8 h-8 text-white" />
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-center mb-4 leading-none tracking-tight">
                Virtual{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">World</span>
              </h1>
              <p className="text-center text-white/40 mb-12 text-base max-w-md mx-auto leading-relaxed">
                Describe a world → get a concept art preview → step inside a real{' '}
                <span className="text-purple-400">Marble 3D Gaussian Splat</span> environment.
              </p>

              {/* Prompt box */}
              <div className="relative group w-full">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-600/50 via-blue-600/30 to-purple-600/50 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-sm" />
                <div className="relative bg-white/[0.04] border border-white/10 rounded-2xl p-1 group-focus-within:border-purple-500/30 transition-all">
                  <textarea ref={textareaRef} value={prompt}
                    onChange={e => setPrompt(e.target.value)} rows={4}
                    disabled={stage === 'loading_image'}
                    placeholder="Describe your world… (e.g. a lava land with dragons, an island with cottages)"
                    className="w-full bg-transparent px-5 pt-5 pb-16 text-base leading-relaxed outline-none placeholder:text-white/20 resize-none text-white/90 disabled:opacity-50"
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleGenerate(); } }}
                  />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <p className="text-white/20 text-xs font-mono">{prompt.length > 0 ? `${prompt.length} chars` : 'Enter to generate'}</p>
                    <button onClick={handleGenerate} disabled={!prompt.trim() || stage === 'loading_image'}
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20">
                      {stage === 'loading_image'
                        ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Generating…</>
                        : <>Generate <ArrowRight className="w-4 h-4" /></>}
                    </button>
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="mt-6 w-full">
                <p className="text-xs text-white/20 text-center mb-3 uppercase tracking-widest">Try one of these</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {PROMPTS.map((p, i) => (
                    <button key={i} onClick={() => { setPrompt(p); textareaRef.current?.focus(); }}
                      className="text-xs text-white/40 hover:text-white/80 border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full transition-all">
                      {p.length > 50 ? p.slice(0, 50) + '…' : p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feature row */}
              <div className="flex justify-center gap-8 mt-12 flex-wrap">
                {[
                  { icon: Eye,      label: 'Concept Art',     desc: 'AI-generated preview' },
                  { icon: Zap,      label: 'Marble API',       desc: 'Real 3D Gaussian Splats' },
                  { icon: Sparkles, label: 'Spark.js Shaders', desc: 'GLSL + dyno effects' },
                ].map(({ icon: I, label, desc }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <I className="w-4 h-4 text-purple-400" />
                    </div>
                    <div><p className="text-xs font-semibold text-white/80">{label}</p><p className="text-xs text-white/30">{desc}</p></div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── PREVIEW ──────────────────────────────────────────────────────── */}
          {stage === 'preview' && (
            <motion.div key="preview" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-4xl">
              <Steps current={1} />
              <h2 className="text-center text-3xl font-bold mb-2">Concept Art Ready</h2>
              <p className="text-center text-white/40 text-sm mb-8">
                This preview will be used as the <span className="text-purple-400">image input</span> for Marble's 3D world generation
              </p>

              <div className="relative group rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10 aspect-video mb-8">
                <img src={previewUrl} alt="World preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white/70 text-sm italic">"{prompt}"</p>
                </div>
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full">
                  <p className="text-white/60 text-xs font-mono flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-400" /> Concept Art
                  </p>
                </div>
              </div>

              {/* Marble info panel */}
              <div className="bg-purple-900/20 border border-purple-500/20 rounded-2xl p-5 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Globe className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-purple-300 mb-1">Marble World Labs API</p>
                    <p className="text-xs text-white/40 leading-relaxed">
                      Clicking "Bring to Life" will submit this image + your prompt to the <strong className="text-white/60">Marble marble-1.1-plus</strong> model.
                      It generates a real photorealistic 3D Gaussian Splat world with a <code className="text-purple-300">.spz</code> file,
                      collider mesh, and panorama. This takes 2–5 minutes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-center">
                <button onClick={handleReset}
                  className="px-7 py-3.5 rounded-xl border border-white/15 hover:bg-white/5 text-white/70 hover:text-white text-sm font-medium transition-all">
                  Start Over
                </button>
                <button onClick={handleBringToLife}
                  className="relative px-10 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-bold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all">
                  <span className="flex items-center gap-2">Bring to Life <Sparkles className="w-4 h-4" /></span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ── LOADING MARBLE WORLD ─────────────────────────────────────────── */}
          {stage === 'loading_world' && (
            <motion.div key="loading_world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-screen gap-8">
              <LoadingBar
                label="Constructing 3D World"
                sub={
                  marbleProgress < 30 ? "Initializing Marble AI Pipeline..." :
                  marbleProgress < 60 ? "Reconstructing Gaussian Splat Geometry..." :
                  marbleProgress < 85 ? "Optimizing Volumetric Lighting & Texture..." :
                  "Finalizing 3D Assets..."
                }
                color="#7c3aed"
                progress={marbleProgress}
              />
              <div className="text-center space-y-2">
                <p className="text-white/40 text-xs font-mono animate-pulse">
                  {marbleProgress < 20 ? "Submitting prompt to World Labs..." :
                   marbleProgress < 40 ? "Processing volumetric data..." :
                   marbleProgress < 70 ? "Generating high-fidelity .spz files..." :
                   "Preparing your immersive environment..."}
                </p>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-white/20 text-[10px] uppercase tracking-[0.2em]">Processing Time: ~2-5 Minutes</p>
                  <p className="text-purple-400/30 text-[10px]">Real-time 3D reconstruction is a compute-heavy process</p>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default CreateWorld;
