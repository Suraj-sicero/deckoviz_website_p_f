"use client";

import type React from "react"
import { useState } from "react"
import { useRef, useEffect } from "react"
import { ChevronDown, ArrowRight, Clock, Search } from "lucide-react"
import { blogPosts } from "@/data/blogs"
import type { BlogPost } from "@/data/blogs"


const pinnedBlogs = blogPosts.filter((post) => post.pinned)
const tags = ["View all", "Announcements", "Guides", "Use Cases", "Case Studies"]

const Blog: React.FC = () => {
  const [email, setEmail] = useState("")
  const [activeTag, setActiveTag] = useState("View all")
  const [showAllHero, setShowAllHero] = useState(false)
  const pinnedContainerRef = useRef<HTMLDivElement | null>(null)
  const pinnedIndexRef = useRef(0)

  // Fixed filter logic
  const filteredPosts =
    activeTag === "View all"
      ? blogPosts
      : blogPosts.filter((post) => post.tag === activeTag);

  const heroPostsToShow = showAllHero
    ? blogPosts.slice(0, 8)
    : blogPosts.slice(0, 5);

  const BlogCard = ({ post }: { post: BlogPost }) => {

    const isLarge = post.size === "large";
    const isMedium = post.size === "medium";

    return (
      <div
        className={`group relative overflow-hidden rounded-3xl transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl cursor-pointer ${
          isLarge
            ? "md:col-span-2 md:row-span-2"
            : isMedium
            ? "md:col-span-1 md:row-span-2"
            : "md:col-span-1 md:row-span-1"
        }`}
        style={{
          background: `linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(219, 39, 119, 0.8), rgba(251, 146, 60, 0.7))`,
        }}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />

          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
        </div>

        {/* Floating 3D elements */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-end">
          {/* Tag with glassmorphism */}
          <div className="mb-4">
            <span
              className={`px-4 py-2 rounded-full text-xs font-bold backdrop-blur-lg ${post.tagColor} border border-white/30 shadow-xl`}
            >
              {post.tag}
            </span>
          </div>

          {/* Title with 3D text effect */}
          <h3
            className="text-xl md:text-2xl font-bold text-white mb-4 transition-all duration-500 group-hover:transform group-hover:translate-y-[-4px]"
            style={{
              textShadow:
                "0 4px 8px rgba(0,0,0,0.4), 0 8px 16px rgba(0,0,0,0.2)",
            }}
          >
            {post.title}
          </h3>

          {/* Description with fade-in animation */}
          <p className="text-white/90 mb-6 line-clamp-3 text-sm transition-all duration-500 group-hover:text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
            {post.description}
          </p>

          {/* Bottom section with micro-interactions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-white/80 group-hover:text-white transition-colors duration-300">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{post.readTime}</span>
              </div>
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
              <span className="text-sm">{post.date}</span>
            </div>

            <div className="flex items-center text-white bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 group-hover:translate-x-2 shadow-lg">
              <span className="text-sm font-medium mr-2">Read more</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(219, 39, 119, 0.2), rgba(251, 146, 60, 0.1))",
            filter: "blur(20px)",
          }}
        ></div>
      </div>
    );
  };

  // Reorder posts for better layout balance
  const getReorderedPosts = () => {
    const reorderedPosts = [...blogPosts];
    // Move Digital Restoration (id: 7) before New Partnership (id: 6)
    const digitalRestoration = reorderedPosts.find((post) => post.id === 7);
    const newPartnership = reorderedPosts.find((post) => post.id === 6);
    const virtualMuseum = reorderedPosts.find((post) => post.id === 8);

    if (digitalRestoration && newPartnership && virtualMuseum) {
      // Remove these posts from their current positions
      const filtered = reorderedPosts.filter(
        (post) => ![6, 7, 8].includes(post.id)
      );
      // Insert them in the desired order
      filtered.splice(5, 0, digitalRestoration, newPartnership, virtualMuseum);
      return filtered;
    }
    return reorderedPosts;
  };

  const scrollPinned = (direction: "next" | "prev") => {
    if (!pinnedContainerRef.current) return

    const container = pinnedContainerRef.current
    const cards = container.children
    if (!cards.length) return

    if (direction === "next") {
      pinnedIndexRef.current =
        (pinnedIndexRef.current + 1) % cards.length
    } else {
      pinnedIndexRef.current =
        (pinnedIndexRef.current - 1 + cards.length) % cards.length
    }

    const target = cards[pinnedIndexRef.current] as HTMLElement

    target.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      scrollPinned("next")
    }, 8000)

    return () => clearInterval(interval)
  }, [])


  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Light Background with Subtle Gradients */}
      <div className="absolute inset-0">
        {/* Pure white base */}
        <div className="absolute inset-0 bg-white"></div>

        {/* Light gradient overlays */}
        <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-br from-purple-100/40 via-pink-50/30 to-transparent blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-1/2 h-1/3 bg-gradient-to-bl from-pink-100/40 via-orange-50/30 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-1/3 h-1/2 bg-gradient-to-tr from-orange-100/40 via-purple-50/30 to-transparent blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-gradient-to-r from-pink-100/30 via-purple-100/30 to-orange-100/30 blur-2xl rounded-full"></div>

        {/* Very subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #7d39ec 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-10 pb-20">
        {/* Enhanced Header */}
        <div className="flex flex-col items-center mb-16">
          {/* Badge with About Us style */}
          <div className="flex justify-center pt-4 pb-2 mt-24 mb-4">
            <div className="bg-[#7d39ec] text-white px-4 py-1 rounded-lg text-sm font-medium shadow-lg shadow-violet-500/50 hover:shadow-violet-500/80 transition-shadow duration-300">
              Blog Sections
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-black leading-tight">
            Blog And Articles
          </h1>
          <p className="text-gray-600 text-center text-xl max-w-3xl leading-relaxed font-medium">
            Discover{" "}
            <span className="text-purple-600 font-semibold">insights</span>,{" "}
            <span className="text-pink-600 font-semibold">guides</span>, and{" "}
            <span className="text-orange-600 font-semibold">stories</span> that
            inspire{" "}
            <span className="text-blue-600 font-semibold">creativity</span> and{" "}
            <span className="text-purple-600 font-semibold">innovation</span> in
            art and{" "}
            <span className="text-indigo-600 font-semibold">technology</span>.
          </p>

{pinnedBlogs.length > 0 && (
  <div className="mt-16 mb-24 w-full">
    {/* Section Header */}
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              📍Pinned Blogs
      </h2>
      <span className="text-sm text-gray-500">
        Featured & highlighted posts
      </span>
    </div>

    {/* Horizontal Scroll Container */}
    <div className="relative">
  {/* PREVIOUS BUTTON */}
  <button
    onClick={() => scrollPinned("prev")}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-20
               w-12 h-12 rounded-full bg-white shadow-lg
               flex items-center justify-center
               hover:scale-110 transition-all duration-300"
  >
    <ChevronDown className="rotate-90 w-5 h-5 text-gray-700" />
  </button>

  {/* SCROLL CONTAINER */}
  <div
    ref={pinnedContainerRef}
    className="flex gap-8 overflow-hidden px-14 scroll-smooth"
  >
    {pinnedBlogs.map((post) => (
      <a
        key={post.id}
        href={post.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="min-w-[320px] max-w-[320px]
           group bg-white rounded-2xl
           shadow-lg transition-all duration-700
           hover:-translate-y-3 hover:scale-[1.03]
           hover:shadow-[0_20px_50px_rgba(236,72,153,0.35)]
           hover:bg-gradient-to-br hover:from-pink-50 hover:via-rose-50 hover:to-white"

      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover
                       transition-transform duration-700
                       group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <span
            className={`absolute top-4 left-4 px-3 py-1 rounded-full
                        text-xs font-semibold backdrop-blur-md ${post.tagColor}`}
          >
            {post.tag}
          </span>

          <span className="absolute top-4 right-4 bg-white/90
                           text-purple-600 text-xs font-bold
                           px-3 py-1 rounded-full shadow">
            PINNED
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {post.description}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{post.readTime}</span>
            <span className="flex items-center gap-1 text-purple-600 font-medium">
              Read
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </a>
    ))}
  </div>

  {/* NEXT BUTTON */}
  <button
    onClick={() => scrollPinned("next")}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-20
               w-12 h-12 rounded-full bg-white shadow-lg
               flex items-center justify-center
               hover:scale-110 transition-all duration-300"
  >
    <ChevronDown className="-rotate-90 w-5 h-5 text-gray-700" />
  </button>
</div>

  </div>
)}

        </div>

        {/* Enhanced Hero Section - 2x3 Grid Layout */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {heroPostsToShow.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Enhanced Show More Button */}
          {!showAllHero && blogPosts.length > 5 && (
            <div className="flex justify-center mt-12">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-300"></div>
                <button
                  onClick={() => setShowAllHero(true)}
                  className="relative flex items-center px-8 py-4 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-purple-200 hover:border-purple-300 group"
                >
                  <span className="mr-3 font-bold text-gray-700 group-hover:text-purple-600 transition-colors duration-300">
                    Show more articles
                  </span>
                  <ChevronDown className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-all duration-300 group-hover:translate-y-1 group-hover:scale-110" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Hide Articles Button - Moved above category filter */}
        {showAllHero && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowAllHero(false)}
              className="flex items-center px-8 py-3 bg-white text-gray-700 rounded-full transition-all duration-300 hover:scale-105 group border border-gray-200 shadow-md hover:shadow-lg"
            >
              <ChevronDown className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110 rotate-180" />
              <span className="font-medium">Hide articles</span>
            </button>
          </div>
        )}

        {/* Revolutionary Card-Based Category Filter System */}
        <div className="mb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Explore by Category
            </h2>

            {/* Interactive Category Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {tags.map((tag) => {
                const categoryPosts =
                  tag === "View all"
                    ? blogPosts
                    : blogPosts.filter((post) => post.tag === tag);
                const previewPost = categoryPosts[0];
                const isActive = activeTag === tag;

                return (
                  <div
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`group relative cursor-pointer transition-all duration-500 ${
                      isActive
                        ? "md:col-span-2 lg:col-span-2 scale-105 z-10"
                        : "hover:scale-105 hover:z-20"
                    }`}
                  >
                    {/* Main Card */}
                    <div
                      className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
                        isActive
                          ? "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-1 shadow-2xl"
                          : "bg-white shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {/* Inner Content */}
                      <div
                        className={`relative overflow-hidden rounded-xl ${
                          isActive ? "bg-white" : ""
                        }`}
                      >
                        {/* Background Image */}
                        {previewPost && (
                          <div
                            className={`relative overflow-hidden transition-all duration-500 ${
                              isActive ? "h-32" : "h-24"
                            }`}
                          >
                            <img
                              src={previewPost.image || "/placeholder.svg"}
                              alt={tag}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div
                              className={`absolute inset-0 transition-all duration-500 ${
                                isActive
                                  ? "bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                                  : "bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                              }`}
                            />
                          </div>
                        )}

                        {/* Content Overlay */}
                        <div
                          className={`absolute inset-0 flex flex-col justify-end p-4 transition-all duration-500`}
                        >
                          {/* Category Title */}
                          <div className="mb-2">
                            <h3
                              className={`font-bold transition-all duration-300 ${
                                isActive
                                  ? "text-white text-lg"
                                  : "text-white text-sm group-hover:text-base"
                              }`}
                            >
                              {tag}
                            </h3>

                            {/* Post Count Badge */}
                            <div
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                                isActive
                                  ? "bg-white/20 text-white backdrop-blur-sm"
                                  : "bg-white/30 text-white/90 backdrop-blur-sm"
                              }`}
                            >
                              {categoryPosts.length}{" "}
                              {categoryPosts.length === 1 ? "post" : "posts"}
                            </div>
                          </div>

                          {/* Active State: Show Preview Info */}
                          {isActive && previewPost && (
                            <div className="mt-2 opacity-0 animate-fadeIn">
                              <p className="text-white/90 text-xs line-clamp-2 mb-2">
                                {previewPost.title}
                              </p>
                              <div className="flex items-center text-white/80 text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                <span>{previewPost.readTime}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Active State Indicator */}
                        {isActive && (
                          <div className="absolute top-3 right-3">
                            <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-lg" />
                          </div>
                        )}

                        {/* Hover Effect for Non-Active Cards */}
                        {!isActive && (
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                      </div>
                    </div>

                    {/* Active Card: Extended Preview */}
                    {isActive && categoryPosts.length > 1 && (
                      <div className="absolute -bottom-2 left-2 right-2 bg-white rounded-lg shadow-lg p-3 opacity-0 animate-slideUp">
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>
                            Latest: {categoryPosts[1]?.title.substring(0, 30)}
                            ...
                          </span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Active Category Info Bar */}
            {activeTag !== "View all" && (
              <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      Viewing: {activeTag}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {filteredPosts.length} articles in this category
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTag("View all")}
                    className="flex items-center px-4 py-2 bg-white text-gray-700 rounded-full hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md group"
                  >
                    <span className="text-sm font-medium mr-2">View All</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filtered Content with improved layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(activeTag === "View all" ? getReorderedPosts() : filteredPosts).map(
            (post) => (
              <div
                key={post.id}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:-rotate-1"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute top-4 left-4 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${post.tagColor} border border-white/30`}
                    >
                      {post.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"></div>

                  <div className="relative z-10">
                    <h4 className="font-bold text-gray-900 mb-3 text-xl group-hover:text-purple-600 transition-colors duration-300 leading-tight">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {post.readTime}
                        </span>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span className="text-xs">{post.date}</span>
                      </div>
                      <button className="flex items-center text-purple-600 hover:text-purple-700 transition-all duration-300 group-hover:translate-x-2">
                        <span className="text-sm font-medium mr-2">
                          Read more
                        </span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm -z-10"></div>
              </div>
            )
          )}
        </div>

        {/* Enhanced Newsletter Section */}
        <div className="mt-24 relative overflow-hidden rounded-3xl">
          {/* Subtle background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-pink-50 to-orange-50"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>

            {/* Subtle floating elements */}
            <div className="absolute top-8 left-8 w-12 h-12 bg-purple-200/30 rounded-full blur-xl"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 bg-pink-200/30 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-orange-200/30 rounded-full blur-xl"></div>
          </div>

          <div className="relative z-10 p-12 md:p-16 text-center">
            <h3 className="text-4xl font-bold mb-6 text-gray-900">
              Stay Updated with the Future
            </h3>
            <p className="text-gray-700 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
              Get the latest insights on art, technology, and digital
              preservation delivered to your inbox with exclusive content and
              early access to new features.
            </p>

            <div className="flex flex-col md:flex-row gap-6 max-w-lg mx-auto">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-8 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-300 shadow-lg bg-white border border-gray-200"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <button className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Subscribe Now
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center space-x-8 mt-8 text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">No spam, ever</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">Privacy protected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Exclusive content</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
