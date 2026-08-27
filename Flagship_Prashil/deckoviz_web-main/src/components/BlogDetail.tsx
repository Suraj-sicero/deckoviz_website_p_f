import { useParams, Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { loadBlogs, MarkdownBlog } from "../lib/blogLoader"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import GithubSlugger from "github-slugger"

import { ChevronLeft, Clock, Calendar, BookOpen, ArrowUp, ChevronRight } from "lucide-react"

const StaticMarkdown = ({
  content,
  headingMap,
}: {
  content: string
  headingMap: Map<string, string>
}) => {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          h2: ({ children }) => {
            const text = String(children)
            const id = headingMap.get(text)

            return (
              <h2 id={id} className="scroll-mt-28">
                {children}
              </h2>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>()

  const [post, setPost] = useState<MarkdownBlog | null>(null)
  const [allBlogs, setAllBlogs] = useState<MarkdownBlog[]>([])
  const [readProgress, setReadProgress] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeTocId, setActiveTocId] = useState<string>("")
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadBlogs().then((blogs) => {
      setAllBlogs(blogs)
      const found = blogs.find((b) => b.slug === slug)
      setPost(found ?? null)
    })
  }, [slug])

  // Reading progress bar + scroll-to-top + active TOC tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setReadProgress(Math.min(progress, 100))
      setShowScrollTop(window.scrollY > 600)

      // Active TOC heading tracking
      const headingEls = document.querySelectorAll(".markdown-content h2[id]")
      let currentId = ""
      headingEls.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top <= 150) {
          currentId = el.id
        }
      })
      setActiveTocId(currentId)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] via-[#e8eeff] to-[#dbeafe]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#182a4a] to-[#2563EB] flex items-center justify-center text-white mx-auto mb-4 shadow-xl">
            <BookOpen size={28} />
          </div>
          <p className="text-gray-500 text-lg font-medium">Article not found</p>
          <Link to="/blog" className="mt-4 inline-flex items-center gap-2 text-sm text-[#2563EB] font-semibold hover:underline">
            <ChevronLeft size={16} /> Back to all articles
          </Link>
        </div>
      </div>
    )
  }

  const relatedArticles = allBlogs
    .filter((b) => b.slug !== post.slug)
    .slice(0, 4)

  /* ---------- CLEAN MARKDOWN ---------- */
  const cleanContent = post.content
    .split("\n")
    .map((line) => line.replace(/^\s+/, ""))
    .join("\n")

  /* ---------- TABLE OF CONTENTS ---------- */
  const slugger = new GithubSlugger()
  slugger.reset()

  const headingMap = new Map<string, string>()

  const headings = cleanContent
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.replace("## ", "").trim()
      const id = slugger.slug(text)
      headingMap.set(text, id)
      return { text, id }
    })

  return (
    <div className="blog-detail-page min-h-screen text-gray-900 relative">
      {/* ═══ Reading progress bar ═══ */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[60] transition-all duration-150"
        style={{
          width: `${readProgress}%`,
          background: "linear-gradient(90deg, #182a4a, #2563EB, #06b6d4)",
          boxShadow: "0 0 20px rgba(37,99,235,0.5)",
        }}
      />

      {/* ═══ Ambient Background ═══ */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#f0f4ff] via-[#e8eeff] to-[#dbeafe]" />
      {/* Paper texture dots */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #182A4A 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Ambient glow orbs */}
      <div className="fixed top-[-200px] right-[-100px] w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-200px] left-[-100px] w-[500px] h-[500px] bg-indigo-300/15 rounded-full blur-[130px] pointer-events-none" />

      {/* ═══ Cinematic Hero Header ═══ */}
      <div className="relative z-10 w-full overflow-hidden">
        <div className="relative h-[420px] md:h-[480px]">
          {/* Hero image with gradient overlay */}
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/70 to-[#182a4a]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/40 to-transparent" />

          {/* Back button - floating */}
          <div className="absolute top-6 left-6 z-20">
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white/90 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-lg"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back
            </Link>
          </div>

          {/* Hero content at bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 md:px-16 pb-10 z-10">
            <div className="max-w-4xl">
              {/* Tag */}
              {post.tag && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-cyan-300 bg-white/10 backdrop-blur-md border border-white/15 mb-4">
                  <BookOpen size={11} />
                  {post.tag}
                </span>
              )}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Calendar size={14} className="text-cyan-400" />
                  <span>{post.date}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/30" />
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Clock size={14} className="text-cyan-400" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom fade into page bg */}
          <div className="absolute -bottom-1 left-0 right-0 h-16 bg-gradient-to-t from-[#f0f4ff] to-transparent" />
        </div>
      </div>

      {/* ═══ Main Content Area ═══ */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-20">
        <div className="flex gap-10">
          {/* Article Body */}
          <div className="flex-1 min-w-0" ref={contentRef}>
            {/* Article Card - Glassmorphic */}
            <div className="blog-article-card relative rounded-[2rem] backdrop-blur-2xl bg-white/65 border border-white/80 shadow-[0_8px_60px_rgba(24,42,74,0.08),0_2px_4px_rgba(0,0,0,0.02)] px-6 py-10 sm:px-10 md:px-16 md:py-14 overflow-hidden">
              {/* Glass shine overlay */}
              <div className="absolute inset-0 pointer-events-none rounded-[2rem]"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.15) 100%)"
                }}
              />

              <article className="max-w-none relative z-10">
                <StaticMarkdown content={cleanContent} headingMap={headingMap} />
              </article>
            </div>

            {/* ═══ Related Articles ═══ */}
            <div className="mt-16 mb-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#182a4a] to-[#2563EB] bg-clip-text text-transparent" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Continue Reading
                </h2>
                <Link to="/blog" className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1">
                  All articles <ChevronRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {relatedArticles.map((article) => (
                  <Link
                    to={`/blog/${article.slug}`}
                    key={article.slug}
                    className="group relative bg-white/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/70 hover:shadow-[0_20px_60px_rgba(24,42,74,0.12)] hover:border-white/90 hover:-translate-y-1 transition-all duration-500"
                  >
                    {/* Card image */}
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>

                    {/* Card body */}
                    <div className="p-4">
                      <span className="text-[13px] font-bold block mb-2 text-[#0f172a] group-hover:text-[#2563EB] transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={10} className="text-[#2563EB]" />
                        <span className="text-[11px] text-slate-400 font-medium">
                          {article.date}
                        </span>
                      </div>
                    </div>

                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ Sticky Table of Contents ═══ */}
          {headings.length > 0 && (
            <aside className="hidden xl:block w-[280px] shrink-0">
              <div className="sticky top-24">
                <div className="relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-xl border border-white/70 p-6 shadow-[0_8px_40px_rgba(24,42,74,0.06)]">
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#182a4a] to-[#2563EB] rounded-t-2xl" />

                  {/* Glass overlay */}
                  <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 30%)" }} />

                  <p className="relative z-10 text-[10px] font-black text-[#182a4a]/50 uppercase tracking-[0.2em] mb-5">
                    Table of Contents
                  </p>

                  <ul className="relative z-10 space-y-1">
                    {headings.map((h) => {
                      const isActive = activeTocId === h.id
                      return (
                        <li
                          key={h.id}
                          className={`cursor-pointer text-[12.5px] leading-snug py-1.5 px-3 rounded-lg transition-all duration-300 ${
                            isActive
                              ? "text-[#2563EB] font-bold bg-blue-50/80 border-l-[3px] border-[#2563EB] -ml-[3px]"
                              : "text-slate-500 hover:text-[#182a4a] hover:bg-white/60 border-l-[3px] border-transparent -ml-[3px]"
                          }`}
                          onClick={() =>
                            document
                              .getElementById(h.id)
                              ?.scrollIntoView({ behavior: "smooth", block: "start" })
                          }
                        >
                          {h.text}
                        </li>
                      )
                    })}
                  </ul>

                  {/* Progress indicator */}
                  <div className="mt-6 pt-4 border-t border-gray-200/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Reading Progress</span>
                      <span className="text-[11px] font-bold text-[#2563EB]">{Math.round(readProgress)}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${readProgress}%`,
                          background: "linear-gradient(90deg, #182a4a, #2563EB)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      </main>

      {/* ═══ Scroll to Top Button ═══ */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-500 ${
          showScrollTop
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-75 pointer-events-none"
        }`}
        style={{
          background: "linear-gradient(135deg, #182a4a, #2563EB)",
          boxShadow: "0 8px 30px rgba(24,42,74,0.4)",
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  )
}

export default BlogDetail