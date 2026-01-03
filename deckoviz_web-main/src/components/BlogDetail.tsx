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
    <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
      {/* MAIN CONTENT */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-purple-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="w-full h-[420px] rounded-3xl shadow-lg mb-10 overflow-hidden bg-gray-200">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
          <span className={`px-3 py-1 rounded-full ${post.tagColor}`}>
            {post.tag}
          </span>

          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>

          <span>{post.date}</span>
        </div>

        <h1 className="text-4xl font-bold mb-10">{post.title}</h1>

        <div className="prose prose-lg max-w-none prose-h2:scroll-mt-28">
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

      {/* TABLE OF CONTENTS */}
      {headings.length > 0 && (
        <aside className="hidden lg:block sticky top-28 self-start">
          <div className="border-l pl-6">
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
  )
}

export default BlogDetail
