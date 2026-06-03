import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogs } from '../constants/blogs';
import { 
  Facebook, 
  Linkedin, 
  Link as LinkIcon, 
  X as XIcon, 
  ChevronLeft, 
  ChevronDown 
} from 'lucide-react';

const TABS = [
  { label: 'Updates', href: '/blog' },
  { label: 'Blogs', href: '/blog' },
  { label: 'News', href: '/blog' },
];

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

  const blog = blogs.find((b: any) => b.id === Number(id));

  // /* =======================
  //    CHATGPT TYPING EFFECT
  // ======================== */

  const [displayedContent, setDisplayedContent] = useState('');
  const typingIndex = useRef(0);

  useEffect(() => {
    if (!blog) return;

    const fullText = blog.content; // keep HTML
    typingIndex.current = 0;
    setDisplayedContent('');

    const interval = setInterval(() => {
      typingIndex.current += 3; // typing speed (increase for faster)
      setDisplayedContent(fullText.slice(0, typingIndex.current));

      if (typingIndex.current >= fullText.length) {
        clearInterval(interval);
      }
    }, 8); // typing speed

    return () => clearInterval(interval);
  }, [blog]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  if (!blog) return <div className="text-white p-10 text-center">Blog not found.</div>;

  const relatedArticles = blogs.filter((b: any) => b.id !== blog.id).slice(0, 3);
  const blogUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = (platform: string) => {
    const text = encodeURIComponent(blog.title);
    const url = encodeURIComponent(blogUrl);
    let shareUrl = '';
    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    else if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    else if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    
    if (shareUrl) window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030014] to-[#0a0a2e] text-white">
      <br/>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-16 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="lg:w-16 flex lg:flex-col items-center justify-between lg:justify-start gap-4 lg:pt-20">
          <Link
            to="/blog"
            className="flex items-center gap-2 bg-[#1e1e4a] text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-blue-600 transition"
          >
            <ChevronLeft size={20} />
            <span className="sm:hidden">Back</span>
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="flex lg:flex-col gap-3">
            <button className="bg-[#1e1e4a] hover:bg-blue-600 p-2.5 rounded-full transition" onClick={() => handleShare('twitter')}><XIcon size={16} /></button>
            <button className="bg-[#1e1e4a] hover:bg-blue-600 p-2.5 rounded-full transition" onClick={() => handleShare('facebook')}><Facebook size={16} /></button>
            <button className="bg-[#1e1e4a] hover:bg-blue-600 p-2.5 rounded-full transition" onClick={() => handleShare('linkedin')}><Linkedin size={16} /></button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">

          {/* Nav */}
          <div className="flex items-center flex-wrap gap-3 mb-8 relative">
            {TABS.map((tab) => (
              <button
                key={tab.label}
                onClick={() => navigate(tab.href)}
                className="px-5 py-2 rounded-lg font-semibold transition-all text-xs sm:text-sm bg-transparent border border-blue-800 text-blue-200 hover:bg-blue-900/30"
              >
                {tab.label}
              </button>
            ))}

            <div className="relative" ref={resourcesRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsResourcesOpen(!isResourcesOpen);
                }}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all text-xs sm:text-sm border outline-none ${
                  isResourcesOpen
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent'
                    : 'bg-transparent border-blue-800 text-blue-200'
                }`}
              >
                Resources
                <ChevronDown size={14} className={isResourcesOpen ? 'rotate-180' : ''} />
              </button>

              {isResourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#0a0a2e] border border-blue-800 rounded-xl shadow-2xl z-[999] overflow-hidden">
                  <Link to="/privacypolicy" className="block px-4 py-3 text-sm font-medium text-blue-100 hover:bg-blue-600/30 transition-colors">
                    Privacy Policy
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight"
          style={{
            fontSize:'32px',
            letterSpacing:'1px',
            marginBottom:'40px',
            fontWeight:600,
            background:'linear-gradient(to right, #ffffff, #3B82F6)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent'
          }}>
            {blog.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-3 mb-8">
            <img src='/p.jpeg' alt={blog.author} className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover" />
            <div>
              <p className="text-white font-semibold text-sm">{blog.author}</p>
              <p className="text-xs text-blue-200">{blog.date} • {blog.time}</p>
            </div>
          </div>

          <img src={blog.image} alt={blog.title} className="w-full h-[400px] object-cover rounded-2xl shadow-2xl mb-8 border border-white/10"/>

          {/* ✨ CHATGPT TYPING CONTENT */}
          <article
            className="prose prose-invert max-w-none mb-16 text-base sm:text-lg leading-relaxed text-slate-300"
            dangerouslySetInnerHTML={{ __html: displayedContent }}
          />

          {/* Related Articles */}
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedArticles.map((article: any) => (
              <Link to={`/blog/${article.id}`} key={article.id} className="bg-[#0a0a2e] hover:bg-[#1e1e4a] transition-all rounded-2xl overflow-hidden border border-blue-900/40 p-4">
                <span className="text-sm font-bold block mb-2">{article.title}</span>
                <span className="text-[10px] text-blue-400">{article.date}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogDetail;