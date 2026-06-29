"use client";

import React from "react";
import { useState } from "react";

const Audiobook: React.FC = () => {

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [style, setStyle] = useState("british-male");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [frames, setFrames] = useState(5);
  
  const generateAudiobook = async () => {

    if (!file) {
      alert("Please upload a PDF");
      return;
    }

    setLoading(true);
    setStatus("Uploading PDF...");

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("frames", frames.toString());
    formData.append("style", style);

    try {

      const res = await fetch("https://sudharsan051006-visual-audiobook-api.hf.space/generate", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Failed to start job");
      }

      const data = await res.json();
      const jobId = data.job_id;

      setStatus("Generating audiobook...");

      const interval = setInterval(async () => {

        try {

          const result = await fetch(`https://sudharsan051006-visual-audiobook-api.hf.space/result/${jobId}`);

          if (!result.ok) return;

          const json = await result.json();

          if (json.status === "processing") return;

          clearInterval(interval);

          if (json.status === "done" || json.status === "completed") {
            setStatus("Preparing download...");
            await downloadZip(jobId);
            setStatus("Download started");
            setLoading(false);
          } else {
            setStatus("Error generating audiobook");
            setLoading(false);
          }

        } catch (err) {
          console.error("Polling error:", err);
        }

      }, 5000);

    } catch (error) {

      console.error("Generate error:", error);
      setStatus("Error generating audiobook");
      setLoading(false);

    }
  };


  const downloadZip = async (jobId: string) => {

    const response = await fetch(`https://sudharsan051006-visual-audiobook-api.hf.space/download/${jobId}`);

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "visual_audiobook.zip";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  };
  return (
    <section className="relative min-h-screen px-6 py-24 bg-[#f5f6f8] overflow-hidden">
      {/* Background ambient blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] bg-blue-500/10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] bg-indigo-500/10 pointer-events-none" />

      {/* Main container */}
      <div className="relative max-w-5xl mx-auto bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 p-8 sm:p-12 md:p-16 space-y-20">

        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-center bg-gradient-to-r from-[#182a4a] to-[#2563EB] bg-clip-text text-transparent drop-shadow-sm">
          Audiobook Creator: Turn Any Book Into a Voice You’ll Want to Listen To
        </h1>

        {/* Alternate Titles */}
        <div className="text-center text-gray-700 space-y-2">
          <p className="font-semibold">Alternate options if you want variants:</p>
          <p>Your PDFs, Read Aloud Beautifully</p>
          <p>From Pages to Presence</p>
          <p>Instant Audiobooks, Done Right</p>
        </div>

        {/* Short Description */}
        <section className="space-y-4 text-gray-800 leading-relaxed">

        <div className="mt-8 sm:mt-10 p-5 sm:p-8 rounded-2xl bg-white/50 backdrop-blur-md border border-white/60 shadow-sm ring-1 ring-black/5 space-y-5 sm:space-y-6">

          {/* Intro line */}
          <p className="text-base sm:text-lg font-medium">
            Some ideas deserve to be heard, not just read.
          </p>

          {/* PDF Upload */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-800 text-sm sm:text-base">
              Upload your PDF
            </label>

<input
  type="file"
  accept="application/pdf"
  onChange={(e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }}
  className="w-full rounded-xl p-3 sm:p-3.5 text-sm
  bg-white border border-gray-200 shadow-sm
  focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium"
/>

            <p className="text-xs sm:text-sm text-gray-600">
              Supports most PDFs including books, papers, and essays.
            </p>
          </div>

          {/* Voice Selector */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-800 text-sm sm:text-base">
              Choose a voice
            </label>

        <div style={{ position: "relative", width: "100%" }}>
<select
  value={style}
  onChange={(e) => setStyle(e.target.value)}
  style={{
    width: "100%",
    padding: "12px 40px 12px 12px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
    outline: "none",
    appearance: "none",
    backgroundColor: "#ffffff",
    fontSize: "14px",
    fontWeight: 500
  }}
>
  <option value="british-male">British Male</option>
  <option value="british-female">British Female</option>
  <option value="australian-male">Australian Male</option>
  <option value="australian-female">Australian Female</option>
  <option value="american-male">American Male</option>
  <option value="american-female">American Female</option>
</select>

          {/* Custom Arrow */}
          <span
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              fontSize: "12px",
              color: "#2563EB"
            }}
          >
            ▼
          </span>
        </div>
          </div>

          {/* Frames selector */}
<div className="space-y-2">
  <label className="block font-semibold text-gray-800 text-sm sm:text-base">
    Number of visuals (frames)
  </label>

  <input
    type="number"
    min={1}
    value={frames}
    onChange={(e) => setFrames(Number(e.target.value))}
    className="w-full rounded-xl p-3 text-sm
    bg-white border border-gray-200 shadow-sm font-medium
    focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
  />

  <p className="text-xs text-gray-600">
    Example: If your PDF has 20 pages and you choose 5 frames,
    each visual will represent ~4 pages.
  </p>
</div>

          {/* Generate Button */}
<button
  onClick={generateAudiobook}
  disabled={loading}
  className="w-full py-4 rounded-xl font-bold text-white text-sm sm:text-base
  bg-gradient-to-r from-[#182A4A] to-[#2563EB] shadow-md
  active:scale-[0.98] sm:hover:-translate-y-0.5
  hover:shadow-[0_10px_25px_rgba(37,99,235,0.35)]
  transition-all duration-200"
>
  {loading ? "Generating..." : "Generate Audiobook"}
</button>

          {status && (
            <p className="text-sm text-gray-700 mt-2">
              {status}
            </p>
          )}
          {/* Closing text */}
          <p className="text-sm sm:text-base">
            Deckoviz lets you turn short stories, novels, essays, research papers,
            textbooks, and non-fiction into high-quality audio, in minutes.
            No friction. No setup. Just listening.
          </p>

        </div>
        </section>
        {/* Why This Tool Exists */}
        <section className="space-y-4 text-gray-800 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-900">
            Why This Tool Exists Here
          </h2>

          <p>
            Deckoviz is about giving ideas, stories, and meaning a life beyond
            the text, beyond the page.
          </p>

          <p>
            We built this tool for the same reason we built Deckoviz itself:
            because reading, learning, art, and storytelling shouldn’t be locked
            to screens or forced into rigid formats.
          </p>

          <p>
            Audiobooks let stories travel with you.<br/>
            They let ideas sink in differently.<br/>
            They turn time spent walking, resting, cooking, or reflecting into
            something richer.
          </p>

          <p>
            This tool is a small window into a much larger philosophy:
            content should adapt to humans, not the other way around.
          </p>
        </section>

        {/* How It Works */}
        <section className="space-y-10">
          <h2 className="text-3xl font-bold text-center">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-black/5 hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-semibold mb-4">1. Upload Your PDF</h3>

              <p>Upload any PDF:</p>

              <ul className="list-disc pl-6 space-y-1 mt-3 text-gray-700">
                <li>Short stories</li>
                <li>Fiction or novels</li>
                <li>Essays and papers</li>
                <li>Textbooks and study material</li>
                <li>Non-fiction and longform writing</li>
              </ul>

              <p className="mt-4 text-gray-700">
                We support clean text extraction for structured and unstructured documents.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-black/5 hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-semibold mb-4">2. Choose a Voice</h3>

              <p>Select from multiple voice styles:</p>

              <ul className="list-disc pl-6 space-y-1 mt-3 text-gray-700">
                <li>British Male</li>
                <li>British Female</li>
                <li>Australian Male</li>
                <li>Australian Female</li>
                <li>American Male</li>
                <li>American Female</li>
              </ul>

              <p className="mt-4 text-gray-700">
                Each voice is tuned for long listening sessions, not robotic reading.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-black/5 hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-semibold mb-4">3. Generate Your Audiobook</h3>

              <p>
                Deckoviz converts your PDF into a high-quality MP3 audiobook.
              </p>

              <ul className="list-disc pl-6 space-y-1 mt-3 text-gray-700">
                <li>Natural pacing</li>
                <li>Clean pronunciation</li>
                <li>Chapter-aware narration where possible</li>
              </ul>

              <p className="mt-4 text-gray-700">
                This is designed for listening, not just text-to-speech.
              </p>
            </div>

          </div>
        </section>

        {/* Output */}
        <section className="space-y-6 text-gray-800">

            <h2 className="text-2xl font-semibold">Output</h2>

            <h3 className="text-lg font-semibold">
              Your Audiobook (MP3)
            </h3>

            <p>Downloadable instantly</p>

            <p>
              Works across phones, headphones, speakers, cars, and yes, Deckoviz itself
            </p>

            <p>
              For longer works, you can generate multiple parts and listen at your own rhythm.
            </p>

            {/* Generate button */}
            {/* <button
              onClick={generateAudiobook}
              className="px-6 py-3 rounded-xl text-white font-semibold
              bg-gradient-to-r from-violet-600 via-pink-500 to-blue-500
              hover:scale-105 transition"
              disabled
            >
              Generate Sample Output
            </button> */}

            {/* Output Player */}
            {audioUrl && (
              <div className="mt-6 p-6 rounded-xl bg-white/40 backdrop-blur-lg border border-white/40 shadow-lg space-y-4">

                <p className="font-semibold text-gray-900">
                  Your audiobook is ready
                </p>

                <audio controls className="w-full">
                  <source src={audioUrl} type="audio/mpeg" />
                </audio>

                <a
                  href={audioUrl}
                  download
                  className="inline-block px-6 py-2.5 rounded-lg text-white font-semibold
                  bg-gradient-to-r from-[#182A4A] to-[#2563EB] shadow-md
                  hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                  Download MP3
                </a>

              </div>
            )}

        </section>
        {/* Quiet Bonus */}
        <section className="space-y-4 text-gray-800">
          <h2 className="text-2xl font-semibold">
            A Quiet Bonus
          </h2>

          <p>
            If you use Deckoviz at home, your audiobook can become part of your space.
          </p>

          <p>Listen while:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Reading along visually</li>
            <li>Studying with ambient visuals</li>
            <li>Winding down at night</li>
            <li>Pairing narration with calm art and soundscapes</li>
          </ul>

          <p>
            Stories don’t just belong in books. They belong in rooms.
          </p>
        </section>

        {/* Why This Fits Deckoviz */}
        <section className="space-y-4 text-gray-800">
          <h2 className="text-2xl font-semibold">
            Why This Fits Deckoviz
          </h2>

          <p>
            This tool is not a detour. It is a doorway.
          </p>

          <p>Deckoviz is building a future where:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Books become experiences</li>
            <li>Learning becomes immersive</li>
            <li>Stories live on walls, in sound, and in memory</li>
          </ul>

          <p>
            This audiobook creator is a simple, useful expression of that future.
          </p>
        </section>

      </div>

    </section>
  );
};

export default Audiobook;