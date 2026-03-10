import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { loadBlogs, MarkdownBlog } from "../lib/blogLoader"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import GithubSlugger from "github-slugger"

import { ChevronLeft } from "lucide-react"

const TypingMarkdown = ({ content }: { content: string }) => {
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
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 text-gray-900">

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <aside className="lg:w-16 flex lg:flex-col items-center justify-between lg:justify-start gap-4 lg:pt-20">

          <Link
            to="/blog"
            className="flex items-center gap-2 bg-white border border-purple-200 text-purple-700 px-4 py-2 rounded-full text-xs font-medium hover:bg-purple-50 transition"
            style={{ width: "140px" }}
          >
            <ChevronLeft size={24} />
            <span className="hidden sm:inline">Back</span>
          </Link>

        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 bg-clip-text text-transparent">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-8 text-sm text-purple-500">
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
  backdrop-blur-xl
  bg-white/60
  border border-purple-200/60
  shadow-[0_20px_60px_rgba(168,85,247,0.25)]
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
    prose-p:text-gray-700
    prose-li:text-gray-700
    prose-strong:text-gray-900
    prose-a:text-purple-500
    prose-a:no-underline
    prose-a:font-medium
    prose-a:hover:text-pink-500
  "
  >
<TypingMarkdown content={cleanContent} />

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
                className="bg-white rounded-2xl overflow-hidden border border-purple-200 p-4 hover:border-pink-300 hover:shadow-lg transition"
              >
                <span className="text-sm font-bold block mb-2">
                  {article.title}
                </span>

                <span className="text-[10px] text-purple-400">
                  {article.date}
                </span>
              </Link>
            ))}
          </div>

        </div>

        {/* Table of Contents */}
        {headings.length > 0 && (
          <aside className="hidden xl:block w-[260px] sticky top-24 self-start">

            <div className="bg-white border border-purple-200 rounded-2xl p-6 shadow-sm">

              <p className="text-sm font-semibold text-purple-700 mb-4">
                Table of Contents
              </p>

              <ul className="space-y-3 text-sm text-purple-500">

                {headings.map((h) => (
                  <li
                    key={h.id}
                    className="cursor-pointer hover:text-pink-500 transition"
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