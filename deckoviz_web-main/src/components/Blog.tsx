"use client";
import React from "react";
import { useState } from "react";
import { useRef, useEffect } from "react";
import { ChevronDown, ArrowRight, Clock, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { loadBlogs, MarkdownBlog } from "../lib/blogLoader";

import { useParams } from "react-router-dom";
const tags = [
  "View all",
  "Announcements",
  "Guides",
  "Use Cases",
  "Case Studies",
  "Innovations",
];

const Blog: React.FC = () => {
  const { slug } = useParams();
  const [blogs, setBlogs] = useState<MarkdownBlog[]>([]);
  const [email, setEmail] = useState("");
  const [activeTag, setActiveTag] = useState("View all");
  const [showAllHero, setShowAllHero] = useState(false);

  const pinnedBlogs = blogs
    .filter((post) => post.pinned)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const infinitePinnedBlogs = [...pinnedBlogs, ...pinnedBlogs];

  const unpinnedBlogs = blogs.filter((post) => !post.pinned);

  const pinnedTrackRef = useRef<HTMLDivElement | null>(null);
  const conveyorX = useRef(0);
  const isPaused = useRef(false);

  useEffect(() => {
    loadBlogs().then((loaded) => {
      const customItems: MarkdownBlog[] = [
        {
          id: -1,
          slug: "manifesto-custom",
          title: "The Manifesto We Live By",
          description: "Some of Our Core Beliefs at Deckoviz Space Labs.",
          tag: "Announcements",
          tagColor: "bg-orange-100 text-orange-700",
          date: "June 16, 2026",
          readTime: "8 min read",
          pinned: false,
          image: "/images/manifesto_cover.png",
          size: "medium",
          content: "",
          customLink: "/deckoviz-manifesto"
        },
        {
          id: -2,
          slug: "phoenix-custom",
          title: "Surviving Rearchitecting Hell: Vizzy 2.0 and the Year of Discipline",
          description: "After an arduous journey through what can only be described as pivot purgatory, we're back to the core idea that started it all.",
          tag: "Announcements",
          tagColor: "bg-purple-100 text-purple-700",
          date: "June 16, 2026",
          readTime: "10 min read",
          pinned: false,
          image: "/images/phoenix_rearchitecting.png",
          size: "large",
          content: "",
          customLink: "/rearchitecting-hell"
        }
      ];
      setBlogs([...customItems, ...loaded]);
    });
  }, []);

  useEffect(() => {
    const track = pinnedTrackRef.current;
    if (!track || pinnedBlogs.length === 0) return;

    const SPEED = 0.25;
    conveyorX.current = 0;
    let rafId: number | null = null;

    const animate = () => {
      if (!isPaused.current) {
        conveyorX.current -= SPEED;
      }

      if (Math.abs(conveyorX.current) >= track.scrollWidth / 2) {
        conveyorX.current = 0;
      }

      track.style.transform = `translateX(${conveyorX.current}px)`;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      track.style.transform = "translateX(0px)";
    };
  }, [pinnedBlogs.length]);

  const moveConveyor = (dir: "next" | "prev") => {
    if (isPaused.current) return;

    const track = pinnedTrackRef.current;
    if (!track) return;

    const cardWidth = 320 + 32;
    conveyorX.current += dir === "next" ? -cardWidth : cardWidth;

    if (Math.abs(conveyorX.current) >= track.scrollWidth / 2) {
      conveyorX.current = 0;
    }
  };

  // Fixed filter logic
  const filteredPosts =
    activeTag === "View all"
      ? blogs
      : blogs.filter((post) => post.tag === activeTag);

  const heroPostsToShow = showAllHero ? blogs.slice(0, 8) : blogs.slice(0, 5);

  const BlogCard = ({ post }: { post: MarkdownBlog }) => {
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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Refined Plain Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#c7d2fe] via-[#eef2ff] to-[#bfdbfe]"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #182A4A 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-10 pb-20">
        {/* Enhanced Header */}
        <div className="flex flex-col items-center mb-16">
          {/* Shiny Badge */}
          <div className="flex justify-center mt-24 mb-10 relative z-20">
            <div className="relative group cursor-default">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#182A4A] to-[#2563EB] rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-white px-6 py-2 rounded-xl text-sm font-semibold tracking-wide shadow-xl flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse"></span>
                Blog Sections
                <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse"></span>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-center mb-8 pb-4 leading-tight cursor-default bg-gradient-to-br from-gray-900 via-[#182A4A] to-[#2563EB] bg-clip-text text-transparent hover:scale-105 transition-transform duration-500">
            Blog And Articles
          </h1>

          <p className="text-gray-600 text-center text-xl max-w-3xl leading-relaxed font-medium">
            Discover{" "}
            <span className="text-[#2563EB] font-semibold hover:text-[#182A4A] transition-colors cursor-pointer underline underline-offset-4 decoration-dotted">insights</span>,{" "}
            <span className="text-[#182A4A] font-semibold hover:text-[#2563EB] transition-colors cursor-pointer underline underline-offset-4 decoration-dotted">guides</span>, and{" "}
            <span className="text-blue-600 font-semibold hover:text-[#182A4A] transition-colors cursor-pointer underline underline-offset-4 decoration-dotted">stories</span> that
            inspire{" "}
            <span className="text-[#2563EB] font-semibold hover:text-[#182A4A] transition-colors cursor-pointer underline underline-offset-4 decoration-dotted">creativity</span> and{" "}
            <span className="text-[#182A4A] font-semibold hover:text-[#2563EB] transition-colors cursor-pointer underline underline-offset-4 decoration-dotted">innovation</span> in
            art and{" "}
            <span className="text-blue-700 font-semibold hover:text-[#182A4A] transition-colors cursor-pointer underline underline-offset-4 decoration-dotted">technology</span>.
          </p>

          {/* Decorative divider */}
          <div className="mt-10 flex items-center gap-4 w-full max-w-xs">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#2563EB]/40"></div>
            <div className="w-2 h-2 rounded-full bg-[#2563EB]/60"></div>
            <div className="w-3 h-3 rounded-full bg-[#182A4A]/80"></div>
            <div className="w-2 h-2 rounded-full bg-[#2563EB]/60"></div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#182A4A]/40"></div>
          </div>
        </div>

        {pinnedBlogs.length > 0 && (
          <div className="mt-16 mb-24 w-full">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#182A4A] to-[#2563EB] flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 3a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2H5z"/>
                  </svg>
                </div>
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent">
                  Pinned Blogs
                </h2>
              </div>
              <span className="hidden sm:block text-xs font-medium text-[#2563EB] bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 shadow-sm shadow-blue-100">
                Featured &amp; highlighted posts
              </span>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="relative">
              {/* PREVIOUS BUTTON */}
              <button
                onClick={() => moveConveyor("prev")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20
               w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-[0_8px_32px_rgba(37,99,235,0.2)] border border-white/50
               flex items-center justify-center
               hover:scale-110 hover:bg-white hover:shadow-[0_8px_32px_rgba(37,99,235,0.4)] transition-all duration-300"
              >
                <ChevronDown className="rotate-90 w-5 h-5 text-[#182A4A]" />
              </button>

              {/* SCROLL CONTAINER */}
              <div className="overflow-hidden px-14 py-12 -my-12">
                <div
                  ref={pinnedTrackRef}
                  className="flex gap-8 whitespace-nowrap will-change-transform"
                >
                  {infinitePinnedBlogs.map((post, i) => (
                    <Link
                      key={i}
                      to={post.customLink || `/blog/${post.slug}`}
                      className="whitespace-normal min-w-[320px] max-w-[320px] group rounded-2xl transition-all duration-700 hover:-translate-y-2 flex flex-col bg-white/40 backdrop-blur-2xl border border-white shadow-[0_8px_32px_rgba(37,99,235,0.15)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.3)]"
                      onMouseEnter={e => { isPaused.current = true; }}
                      onMouseLeave={e => { isPaused.current = false; }}
                    >
                      {/* Image */}
                      <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
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

                        <span
                          className="absolute top-4 right-4 bg-white/90
                           text-[#2563EB] text-xs font-bold
                           px-3 py-1 rounded-full shadow"
                        >
                          PINNED
                        </span>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 p-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#2563EB] transition-colors duration-300">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {post.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{post.readTime}</span>
                          <span className="flex items-center gap-1 text-[#2563EB] font-medium group-hover:gap-2 transition-all duration-300">
                            Read
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* NEXT BUTTON */}
                <button
                  onClick={() => moveConveyor("next")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20
               w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-[0_8px_32px_rgba(37,99,235,0.2)] border border-white/50
               flex items-center justify-center
               hover:scale-110 hover:bg-white hover:shadow-[0_8px_32px_rgba(37,99,235,0.4)] transition-all duration-300"
                >
                  <ChevronDown className="-rotate-90 w-5 h-5 text-[#182A4A]" />
                </button>
              </div>
            </div>
          </div>
        )}
{/* hi 
        {/* Enhanced Hero Section - 2x3 Grid Layout **
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {heroPostsToShow.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Enhanced Show More Button **
          {!showAllHero && blogs.length > 5 && (
            <div className="flex justify-center mt-12">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-300"></div>
                <button
                  onClick={() => setShowAllHero(true)}
                  className="relative flex items-center px-8 py-4 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-violet-200 hover:border-violet-300 group"
                >
                  <span className="mr-3 font-bold text-gray-700 group-hover:text-violet-600 transition-colors duration-300">
                    Show more articles
                  </span>
                  <ChevronDown className="w-6 h-6 text-gray-700 group-hover:text-violet-600 transition-all duration-300 group-hover:translate-y-1 group-hover:scale-110" />
                </button>
              </div>
            </div>
          )}
        </div>
*/}
        {/* Hide Articles Button - Moved above category filter */}
        {showAllHero && (
          <>
            {/* Hide Articles Button - Moved above category filter */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setShowAllHero(false)}
                className="flex items-center px-8 py-3 bg-white text-[#182A4A] rounded-full transition-all duration-300 hover:scale-105 group border border-blue-100 shadow-md hover:shadow-[0_8px_24px_rgba(37,99,235,0.15)]"
              >
                <ChevronDown className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110 rotate-180 text-[#2563EB]" />
                <span className="font-semibold">Hide articles</span>
              </button>
            </div>
          </>
        )}

        {/* Revolutionary Card-Based Category Filter System */}
        <div className="mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center mb-10 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#182A4A] to-[#2563EB] flex items-center justify-center shadow-md shadow-blue-500/20 text-white text-sm">⚡</div>
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#182A4A] to-[#2563EB] bg-clip-text text-transparent">
                  Explore by Category
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#2563EB]/50"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/60"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#182A4A]/50"></div>
              </div>
            </div>

            {/* Interactive Category Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {tags.map((tag) => {
                const categoryPosts =
                  tag === "View all"
                    ? blogs
                    : blogs.filter((post) => post.tag === tag);

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
                          ? "bg-gradient-to-br from-[#182A4A] to-[#2563EB] p-[2px] shadow-[0_8px_32px_rgba(37,99,235,0.3)]"
                          : "bg-white/40 backdrop-blur-xl border border-white shadow-lg hover:shadow-[0_8px_32px_rgba(37,99,235,0.2)] hover:bg-white/60"
                      }`}
                    >
                      {/* Inner Content */}
                      <div
                        className={`relative overflow-hidden rounded-xl h-full ${isActive ? "bg-white/80 backdrop-blur-sm" : ""}`}
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
                          <div className="absolute inset-0 bg-gradient-to-t from-[#2563EB]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              <div
                className="mt-8 rounded-2xl p-6 bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_32px_rgba(37,99,235,0.15)]"
              >
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

       
<div className="mt-16">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

    {filteredPosts.map((post) => (
      <Link
        key={post.slug}
        to={post.customLink || `/blog/${post.slug}`}
        className="group rounded-3xl transition-all duration-500 hover:-translate-y-2 flex flex-col bg-white/40 backdrop-blur-2xl border border-white shadow-[0_8px_32px_rgba(37,99,235,0.15)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.3)]"
      >
        {/* IMAGE - Square */}
        <div className="relative aspect-square overflow-hidden rounded-t-3xl">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-full object-cover 
                       transition-transform duration-700 
                       group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <span
            className={`absolute top-4 left-4 px-3 py-1 rounded-full 
                        text-xs font-semibold ${post.tagColor} backdrop-blur-lg`}
          >
            {post.tag}
          </span>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 p-6 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 
                         group-hover:text-[#2563EB] transition-colors duration-300">
            {post.title}
          </h3>

          <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center justify-between mt-auto text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>

            <span className="flex items-center gap-2 text-[#2563EB] font-semibold group-hover:gap-3 transition-all">
              Read <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    ))}

  </div>
</div>
       
        {/* Newsletter Section - Deep Frosted Glass */}
        <div className="mt-24 relative rounded-[2rem] group/glass overflow-hidden"
          style={{ isolation: 'isolate' }}>

          {/* === Background blobs (rendered below the glass) === */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-[#2563EB]/50 blur-[70px] animate-[float_8s_ease-in-out_infinite]"></div>
            <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-[#182A4A]/40 blur-[80px] animate-[float_6s_ease-in-out_infinite_reverse]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-blue-300/40 blur-[50px] animate-[float_7s_ease-in-out_infinite]"></div>
          </div>

          {/* === Frosted glass panel === */}
          <div className="absolute inset-0 backdrop-blur-[20px] bg-white/8 border border-white/25 rounded-[2rem]"></div>

          {/* === Shiny top-edge highlight === */}
          <div className="absolute top-0 inset-x-8 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none rounded-full"></div>
          {/* === Shiny left-edge highlight === */}
          <div className="absolute left-0 inset-y-8 w-[1.5px] bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none rounded-full"></div>
          {/* === Subtle bottom edge === */}
          <div className="absolute bottom-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"></div>

          {/* === Diagonal glare sweep === */}
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-white/25 to-transparent pointer-events-none rounded-tl-[2rem] opacity-60 group-hover/glass:opacity-100 transition-opacity duration-700"></div>

          {/* === Inner ring border for depth === */}
          <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] border border-white/10 pointer-events-none"></div>

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
              <div className="relative flex-1 group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#182A4A] to-[#2563EB] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="relative w-full px-8 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all duration-300 shadow-sm bg-white/80 backdrop-blur-sm border border-white/50"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#182A4A] to-[#2563EB] rounded-full flex items-center justify-center shadow-md">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <button className="relative px-10 py-4 bg-gradient-to-r from-[#182A4A] to-[#2563EB] text-white rounded-full font-bold hover:from-[#13223B] hover:to-[#1D4ED8] transition-all duration-300 hover:scale-[1.02] shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transform border border-white/10">
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
