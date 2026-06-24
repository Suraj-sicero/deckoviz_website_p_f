import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { loadBlogs, MarkdownBlog } from "../lib/blogLoader"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import GithubSlugger from "github-slugger"

import { ChevronLeft, Clock, Calendar, BookOpen } from "lucide-react"

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

  useEffect(() => {
    loadBlogs().then((blogs) => {
      setAllBlogs(blogs)
      const found = blogs.find((b) => b.slug === slug)
      setPost(found ?? null)
    })
  }, [slug])

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setReadProgress(Math.min(progress, 100))
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!post) {
    return <div className="text-gray-800 p-10 text-center">Blog not found.</div>
  }

  const relatedArticles = allBlogs
    .filter((b) => b.slug !== post.slug)
    .slice(0, 3)

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
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-[3px] z-50 transition-all duration-150"
        style={{
          width: `${readProgress}%`,
          background: "linear-gradient(90deg, #2563EB, #06b6d4, #8b5cf6)",
        }}
      />

      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#f0f4ff] via-[#e8eeff] to-[#dbeafe]" />
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #182A4A 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 flex flex-col lg:flex-row gap-10">
        {/* Sidebar - Back Button */}
        <aside className="lg:w-16 flex lg:flex-col items-center justify-between lg:justify-start gap-4 lg:pt-20">
          <Link
            to="/blog"
            className="group flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-white/80 text-[#2563EB] px-4 py-2.5 rounded-full text-xs font-semibold hover:bg-white hover:shadow-lg transition-all duration-300"
            style={{ width: "140px" }}
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Back</span>
          </Link>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">

          {/* Tag Badge */}
          {post.tag && (
            <div className="mb-5">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-[#2563EB] border border-blue-200/50 backdrop-blur-sm">
                <BookOpen size={12} />
                {post.tag}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold mb-6 leading-[1.15] tracking-tight bg-gradient-to-r from-[#0f172a] via-[#1e3a5f] to-[#2563EB] bg-clip-text text-transparent">
            {post.title}
          </h1>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <Calendar size={14} className="text-[#2563EB]" />
              <span>{post.date}</span>
            </div>
            <div className="w-px h-4 bg-slate-300" />
            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <Clock size={14} className="text-[#2563EB]" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mb-12 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(37,99,235,0.18)]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
          </div>

          {/* Article Card */}
          <div className="blog-article-card mb-16 rounded-[28px] backdrop-blur-2xl bg-white/60 border border-white/80 shadow-[0_8px_40px_rgba(37,99,235,0.08),0_1px_3px_rgba(0,0,0,0.04)] px-6 py-10 sm:px-10 md:px-14 md:py-14">
            <article className="max-w-none">
              <StaticMarkdown content={cleanContent} headingMap={headingMap} />
            </article>
          </div>

          {/* Related Articles */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 bg-gradient-to-r from-[#0f172a] to-[#2563EB] bg-clip-text text-transparent">
              Related Articles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedArticles.map((article) => (
                <Link
                  to={`/blog/${article.slug}`}
                  key={article.slug}
                  className="group bg-white/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/80 p-5 hover:shadow-[0_12px_40px_rgba(37,99,235,0.15)] hover:bg-white/80 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="text-sm font-bold block mb-3 text-[#0f172a] group-hover:text-[#2563EB] transition-colors leading-snug">
                    {article.title}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={11} className="text-[#2563EB]" />
                    <span className="text-[11px] text-slate-400 font-medium">
                      {article.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Table of Contents */}
        {headings.length > 0 && (
          <aside className="hidden xl:block w-[260px] sticky top-24 self-start">
            <div className="bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl p-6 shadow-[0_8px_32px_rgba(37,99,235,0.08)]">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Table of Contents
              </p>
              <ul className="space-y-2.5 text-[13px]">
                {headings.map((h) => (
                  <li
                    key={h.id}
                    className="cursor-pointer text-slate-500 hover:text-[#2563EB] transition-colors duration-200 leading-snug border-l-2 border-transparent hover:border-[#2563EB] pl-3 -ml-3"
                    onClick={() =>
                      document
                        .getElementById(h.id)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                  >
                    {h.text}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </main>
    </div>
  )
}

export default BlogDetail