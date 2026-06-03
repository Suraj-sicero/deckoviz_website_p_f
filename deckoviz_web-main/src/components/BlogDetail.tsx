import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { loadBlogs, MarkdownBlog } from "../lib/blogLoader"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import GithubSlugger from "github-slugger"

import { ChevronLeft } from "lucide-react"

const TypingMarkdown = ({
  content,
  headingMap,
}: {
  content: string
  headingMap: Map<string, string>
}) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(content.slice(0, i));
      i += 2; // typing speed

      if (i >= content.length) {
        clearInterval(interval);
        setDisplayed(content);
      }
    }, 8);

    return () => clearInterval(interval);
  }, [content]);

  return (
    <div className="typing-markdown">
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
        {displayed}
      </ReactMarkdown>
      <span className="typing-cursor">|</span>
    </div>
  );
};


const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const [post, setPost] = useState<MarkdownBlog | null>(null)
  const [allBlogs, setAllBlogs] = useState<MarkdownBlog[]>([])

  useEffect(() => {
    loadBlogs().then((blogs) => {
      setAllBlogs(blogs)
      const found = blogs.find((b) => b.slug === slug)
      setPost(found ?? null)
    })
  }, [slug])

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
    <div className="min-h-screen bg-gradient-to-br from-[#c7d2fe] via-[#eef2ff] to-[#bfdbfe] text-gray-900 relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #182A4A 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 flex flex-col lg:flex-row gap-8 relative z-10">

        {/* Sidebar */}
        <aside className="lg:w-16 flex lg:flex-col items-center justify-between lg:justify-start gap-4 lg:pt-20">

          <Link
            to="/blog"
            className="flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-white text-[#2563EB] px-4 py-2 rounded-full text-xs font-medium hover:bg-white/80 transition-all shadow-sm"
            style={{ width: "140px" }}
          >
            <ChevronLeft size={24} />
            <span className="hidden sm:inline">Back</span>
          </Link>

        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-8 text-sm text-[#2563EB]">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          {/* Hero Image */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto object-cover rounded-2xl shadow-xl mb-10"
          />

          {/* Article */}
          <div
  className="
  mb-16
  rounded-[32px]
  backdrop-blur-2xl
  bg-white/40
  border border-white
  shadow-[0_20px_60px_rgba(37,99,235,0.15)]
  px-8 py-10 md:px-12
"
>
  <article
    className="
    prose
    max-w-none
    prose-lg
    prose-headings:font-bold
    prose-h2:text-3xl
    prose-h3:text-2xl
    prose-p:text-black
    prose-li:text-black
    prose-strong:text-black
    prose-a:text-[#2563EB]
    prose-a:no-underline
    prose-a:font-medium
    prose-a:hover:text-[#182A4A]
  "
  >
<TypingMarkdown content={cleanContent} headingMap={headingMap} />

          </article>
          </div>

          {/* Related Articles */}
          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            Related Articles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedArticles.map((article) => (
              <Link
                to={`/blog/${article.slug}`}
                key={article.slug}
                className="bg-white/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white p-4 hover:shadow-[0_8px_32px_rgba(37,99,235,0.2)] hover:bg-white/60 transition-all duration-300"
              >
                <span className="text-sm font-bold block mb-2">
                  {article.title}
                </span>

                <span className="text-[10px] text-[#2563EB]">
                  {article.date}
                </span>
              </Link>
            ))}
          </div>

        </div>

        {/* Table of Contents */}
        {headings.length > 0 && (
          <aside className="hidden xl:block w-[260px] sticky top-24 self-start">

            <div className="bg-white/40 backdrop-blur-xl border border-white rounded-2xl p-6 shadow-[0_8px_32px_rgba(37,99,235,0.15)]">

              <p className="text-sm font-semibold text-[#182A4A] mb-4">
                Table of Contents
              </p>

              <ul className="space-y-3 text-sm text-[#2563EB]">

                {headings.map((h) => (
                  <li
                    key={h.id}
                    className="cursor-pointer hover:text-[#182A4A] transition"
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
<style>
{`
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease forwards;
}
`}
</style>
          </aside>
        )}

      </main>
    </div>
    
    
  )
  
}
export default BlogDetail