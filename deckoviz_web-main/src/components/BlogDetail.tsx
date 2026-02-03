import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { loadBlogs, MarkdownBlog } from "../lib/blogLoader"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import GithubSlugger from "github-slugger"

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const [post, setPost] = useState<MarkdownBlog | null>(null)

  /* ---------- LOAD BLOG FROM MARKDOWN FILES ---------- */
  useEffect(() => {
    loadBlogs().then((blogs) => {
      const found = blogs.find((b) => b.slug === slug)
      setPost(found ?? null)
    })
  }, [slug])

  if (!post) {
    return <div className="p-10 text-center">Article not found</div>
  }

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
  <div className="relative min-h-screen overflow-hidden">
    {/* Soft Background */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute -top-20 left-0 w-[40%] h-[60%] bg-gradient-to-br from-purple-100/60 via-pink-50/40 to-transparent blur-3xl" />
      <div className="absolute top-1/3 right-0 w-[45%] h-[50%] bg-gradient-to-bl from-pink-100/50 via-orange-50/40 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-[50%] h-[40%] bg-gradient-to-tr from-indigo-100/50 via-purple-50/40 to-transparent blur-3xl" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(125,57,236,0.9) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>

    {/* Layout */}
    <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">

              {/* MAIN CONTENT */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-purple-600 mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Glass Hero Image */}
        <div className="relative rounded-[34px] overflow-hidden mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-300/50 via-pink-300/40 to-orange-200/40 blur-md opacity-70" />
          <div className="relative bg-white/75 backdrop-blur-xl border border-white/60 shadow-[0_20px_80px_-30px_rgba(236,72,153,0.35)] rounded-[34px] overflow-hidden">
            <div className="w-full h-[420px] overflow-hidden bg-gray-200">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Meta info */}
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-6">
                <span className={`px-3 py-1 rounded-full ${post.tagColor}`}>
                  {post.tag}
                </span>

                <span className="flex items-center gap-2 bg-white/70 border border-white/60 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4 text-purple-600" />
                  {post.readTime}
                </span>

                <span className="bg-white/70 border border-white/60 px-3 py-1 rounded-full">
                  {post.date}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Article */}
        <div
          className="
            bg-white/70 backdrop-blur-xl
            border border-white/60
            shadow-[0_18px_70px_-40px_rgba(125,57,236,0.35)]
            rounded-[32px]
            px-6 py-10 md:px-10
          "
        >
          <div
            className="
              max-w-none
              prose prose-lg
              prose-p:leading-[1.85]
              prose-p:text-[17px]
              prose-p:text-gray-800
              prose-p:text-justify
              prose-strong:text-gray-900
              prose-strong:font-semibold

              prose-h2:text-3xl prose-h2:font-bold
              prose-h2:mt-16 prose-h2:mb-6
              prose-h2:scroll-mt-28
              prose-h3:text-2xl prose-h3:font-bold
              prose-h3:mt-14 prose-h3:mb-5

              prose-ul:my-6 prose-li:my-2
              prose-hr:my-14 prose-hr:border-gray-300/80
            "
          >
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                h2: ({ children }) => {
                  const text = String(children)
                  const id = headingMap.get(text)
                  return <h2 id={id}>{children}</h2>
                },
              }}
            >
              {cleanContent}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* TABLE OF CONTENTS */}
      {headings.length > 0 && (
        <aside className="hidden lg:block sticky top-28 self-start">
          <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg rounded-3xl p-6">
            <p className="text-sm font-semibold text-gray-800 mb-4">
              Table of contents
            </p>

            <ul className="space-y-3 text-sm text-gray-600">
              {headings.map((h) => (
                <li
                  key={h.id}
                  className="cursor-pointer hover:text-purple-600"
                  onClick={() =>
                    document
                      .getElementById(h.id)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {h.text}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </div>
  </div>
  )
}

export default BlogDetail
