"use client"

import React, { useEffect, useRef, useState } from "react"
import { ChevronDown, ArrowRight, Clock, Search } from "lucide-react"
import { Link } from "react-router-dom"
import { loadBlogs, MarkdownBlog } from "../lib/blogLoader"

const tags = ["View all", "Announcements", "Guides", "Use Cases", "Case Studies", "Innovations"]

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<MarkdownBlog[]>([])
  const [email, setEmail] = useState("")
  const [activeTag, setActiveTag] = useState("View all")
  const [showAllHero, setShowAllHero] = useState(false)

  /** Load blogs from markdown */
  useEffect(() => {
    loadBlogs().then(setBlogs)
  }, [])

  /** Pinned blogs logic */
  const pinnedBlogs = blogs
    .filter(post => post.pinned)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)

  const infinitePinnedBlogs = [...pinnedBlogs, ...pinnedBlogs]
  const unpinnedBlogs = blogs.filter(post => !post.pinned)

  /** Conveyor animation */
  const pinnedTrackRef = useRef<HTMLDivElement | null>(null)
  const conveyorX = useRef(0)
  const isPaused = useRef(false)

  useEffect(() => {
    const track = pinnedTrackRef.current
    if (!track || pinnedBlogs.length === 0) return

    const SPEED = 0.25
    conveyorX.current = 0
    let rafId: number

    const animate = () => {
      if (!isPaused.current) conveyorX.current -= SPEED
      if (Math.abs(conveyorX.current) >= track.scrollWidth / 2) {
        conveyorX.current = 0
      }
      track.style.transform = `translateX(${conveyorX.current}px)`
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [pinnedBlogs.length])

  const moveConveyor = (dir: "next" | "prev") => {
    if (isPaused.current) return
    const track = pinnedTrackRef.current
    if (!track) return
    const cardWidth = 352
    conveyorX.current += dir === "next" ? -cardWidth : cardWidth
  }

  /** Filtering */
  const filteredPosts =
    activeTag === "View all"
      ? blogs
      : blogs.filter(post => post.tag === activeTag)

  const heroPostsToShow = showAllHero ? blogs.slice(0, 8) : blogs.slice(0, 5)

  /** Blog Card */
  const BlogCard = ({ post }: { post: MarkdownBlog }) => (
    <Link
      to={`/blog/${post.id}`}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-xl
                 transition-all duration-500 hover:scale-[1.03] hover:-rotate-1
                 h-[460px] flex flex-col"
    >
      <div className="h-56 overflow-hidden relative">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${post.tagColor}`}>
          {post.tag}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h4 className="font-bold text-gray-900 mb-3 text-xl line-clamp-2">
          {post.title}
        </h4>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {post.description}
        </p>
        <div className="flex items-center justify-between mt-auto text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
          <span className="flex items-center gap-1 text-purple-600 font-medium">
            Read more <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  )

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-20">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog & Articles</h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Discover insights, guides, and stories that inspire creativity and innovation.
          </p>
        </div>

        {/* Pinned Blogs */}
        {pinnedBlogs.length > 0 && (
          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-8">📍 Pinned Blogs</h2>

            <div className="relative">
              <button
                onClick={() => moveConveyor("prev")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow rounded-full"
              >
                <ChevronDown className="rotate-90" />
              </button>

              <div className="overflow-hidden px-14">
                <div ref={pinnedTrackRef} className="flex gap-8 whitespace-nowrap">
                  {infinitePinnedBlogs.map(post => (
                    <Link
                      key={`${post.id}-${Math.random()}`}
                      to={`/blog/${post.id}`}
                      onMouseEnter={() => (isPaused.current = true)}
                      onMouseLeave={() => (isPaused.current = false)}
                      className="min-w-[320px] bg-white rounded-2xl shadow-lg"
                    >
                      <img src={post.image} className="h-48 w-full object-cover rounded-t-2xl" />
                      <div className="p-5">
                        <h3 className="font-bold mb-2">{post.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <button
                onClick={() => moveConveyor("next")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow rounded-full"
              >
                <ChevronDown className="-rotate-90" />
              </button>
            </div>
          </div>
        )}

        {/* All Blogs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <div className="flex max-w-md mx-auto gap-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 px-4 py-3 rounded-full border"
            />
            <button className="px-6 py-3 bg-purple-600 text-white rounded-full">
              Subscribe
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Blog