"use client"

import React from "react"
import { useParams, Link } from "react-router-dom"
// At the top of BlogPostPage.tsx
import { blogPosts } from '../../data/blogPosts'; // CORRECTED PATH
import { ArrowLeft, Clock } from "lucide-react"

const BlogPostPage: React.FC = () => {
  const { postSlug } = useParams<{ postSlug: string }>()
  const post = blogPosts.find((p) => p.slug === postSlug)

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">Post not found!</h1>
        <Link to="/blog" className="text-indigo-600 mt-4 inline-block">
          ← Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          to="/blog"
          className="flex items-center text-gray-600 font-semibold mb-8 hover:text-purple-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all articles
        </Link>

        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${post.tagColor}`}>
          {post.tag}
        </span>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>

        <div className="flex items-center space-x-4 text-gray-500 mb-8">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>{post.readTime}</span>
          </div>
          <span>•</span>
          <span>{post.date}</span>
        </div>

        <img
          src={post.image}
          alt={post.title}
          className="w-full h-auto max-h-[500px] object-cover rounded-2xl mb-12 shadow-lg"
        />

        <div
          className="prose lg:prose-xl max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: post.fullContent || post.description }}
        />
      </div>
    </div>
  )
}

export default BlogPostPage