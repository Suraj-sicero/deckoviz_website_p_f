"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, ArrowRight, Clock} from "lucide-react"

// UPDATED: Import Link for navigation and blogPosts from your new data file
import { Link } from "react-router-dom"
// This is the correct path
import { blogPosts } from '../data/blogPosts.js'; // Make sure the path is correct

// UPDATED: The 'blogPosts' const has been DELETED from this file. It now lives in /data/blogPosts.js



const Blog: React.FC = () => {
 
  const [activeTag, setActiveTag] = useState("View all")
  const [showAllHero, setShowAllHero] = useState(false)

  const filteredPosts = activeTag === "View all" ? blogPosts : blogPosts.filter((post) => post.tag === activeTag)

  const heroPostsToShow = showAllHero ? blogPosts.slice(0, 8) : blogPosts.slice(0, 5)

  const BlogCard = ({ post }: { post: (typeof blogPosts)[0] }) => {
    const isLarge = post.size === "large"
    const isMedium = post.size === "medium"

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
        {/* ... The inside of your BlogCard component remains exactly the same ... */}
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
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
          <div className="mb-4">
            <span
              className={`px-4 py-2 rounded-full text-xs font-bold backdrop-blur-lg ${post.tagColor} border border-white/30 shadow-xl`}
            >
              {post.tag}
            </span>
          </div>
          <h3
            className="text-xl md:text-2xl font-bold text-white mb-4 transition-all duration-500 group-hover:transform group-hover:translate-y-[-4px]"
            style={{
              textShadow: "0 4px 8px rgba(0,0,0,0.4), 0 8px 16px rgba(0,0,0,0.2)",
            }}
          >
            {post.title}
          </h3>
          <p className="text-white/90 mb-6 line-clamp-3 text-sm transition-all duration-500 group-hover:text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
            {post.description}
          </p>
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
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(219, 39, 119, 0.2), rgba(251, 146, 60, 0.1))",
            filter: "blur(20px)",
          }}
        ></div>
      </div>
    )
  }

  // Reorder posts for better layout balance
  const getReorderedPosts = () => {
    // ... this function remains the same
    const reorderedPosts = [...blogPosts]
    const digitalRestoration = reorderedPosts.find((post) => post.id === 7)
    const newPartnership = reorderedPosts.find((post) => post.id === 6)
    const virtualMuseum = reorderedPosts.find((post) => post.id === 8)

    if (digitalRestoration && newPartnership && virtualMuseum) {
      const filtered = reorderedPosts.filter((post) => ![6, 7, 8].includes(post.id))
      filtered.splice(5, 0, digitalRestoration, newPartnership, virtualMuseum)
      return filtered
    }
    return reorderedPosts
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ... Light Background and Header sections remain the same ... */}
       <div className="absolute inset-0">
        <div className="absolute inset-0 bg-white"></div>
        <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-br from-purple-100/40 via-pink-50/30 to-transparent blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-1/2 h-1/3 bg-gradient-to-bl from-pink-100/40 via-orange-50/30 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-1/3 h-1/2 bg-gradient-to-tr from-orange-100/40 via-purple-50/30 to-transparent blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-gradient-to-r from-pink-100/30 via-purple-100/30 to-orange-100/30 blur-2xl rounded-full"></div>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #7d39ec 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-10 pb-20">
        <div className="flex flex-col items-center mb-16">
          <div className="flex justify-center pt-4 pb-2 mt-24 mb-4">
            <div className="bg-[#7d39ec] text-white px-4 py-1 rounded-lg text-sm font-medium shadow-lg shadow-violet-500/50 hover:shadow-violet-500/80 transition-shadow duration-300">
              Blog Sections
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-black leading-tight">
            Blog And Articles
          </h1>
          <p className="text-gray-600 text-center text-xl max-w-3xl leading-relaxed font-medium">
            Discover <span className="text-purple-600 font-semibold">insights</span>,{" "}
            <span className="text-pink-600 font-semibold">guides</span>, and{" "}
            <span className="text-orange-600 font-semibold">stories</span> that inspire{" "}
            <span className="text-blue-600 font-semibold">creativity</span> and{" "}
            <span className="text-purple-600 font-semibold">innovation</span> in art and{" "}
            <span className="text-indigo-600 font-semibold">technology</span>.
          </p>
        </div>

      {/* Enhanced Hero Section - 2x3 Grid Layout */}
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* UPDATED: Each BlogCard is wrapped in a Link */}
          {heroPostsToShow.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.id}>
              <BlogCard post={post} />
            </Link>
          ))}
        </div>

        {/* ... "Show more" and other sections remain the same ... */}
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

      {/* ... Category Filter and other UI elements remain the same ... */}
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

        <div className="mb-16">
          {/* ... */}
        </div>
      
      {/* Filtered Content with improved layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* UPDATED: Each post is wrapped in a Link */}
        {(activeTag === "View all" ? getReorderedPosts() : filteredPosts).map((post) => (
          <Link to={`/blog/${post.slug}`} key={post.id}>
            <div className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:-rotate-1">
              {/* ... The rest of your card's JSX remains the same ... */}
              <div className="h-56 overflow-hidden relative">
                  <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 left-4 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${post.tagColor} border border-white/30`}>
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
                              <span className="text-sm font-medium">{post.readTime}</span>
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <span className="text-xs">{post.date}</span>
                          </div>
                          {/* This is now a visual cue inside a larger link, so the <button> can be a <div> */}
                          <div className="flex items-center text-purple-600 transition-all duration-300 group-hover:translate-x-2">
                              <span className="text-sm font-medium mr-2">Read more</span>
                              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm -z-10"></div>
            </div>
          </Link>
        ))}
      </div>

      {/* ... Newsletter Section remains the same ... */}
        <div className="mt-24 relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-pink-50 to-orange-50"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"></div>
            <div className="absolute top-8 left-8 w-12 h-12 bg-purple-200/30 rounded-full blur-xl"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 bg-pink-200/30 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-orange-200/30 rounded-full blur-xl"></div>
          </div>
          <div className="relative z-10 p-12 md:p-16 text-center">
            {/* ... */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog