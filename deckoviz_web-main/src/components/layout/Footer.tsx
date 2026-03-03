"use client"

import type React from "react"
import { useState } from "react"
import { Instagram, Linkedin, Facebook, Send } from "lucide-react"

const Footer: React.FC = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscribeMessage, setSubscribeMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setSubscribeMessage("Please enter your email")
      return
    }

    setIsSubmitting(true)
    setSubscribeMessage("")

    try {
      const response = await fetch("https://auth.deckoviz.com/auth/newsletter/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      })

      if (response.status == 201) {
        setEmail("")
        setSubscribeMessage("Successfully subscribed!")
      } else {
        setSubscribeMessage("Subscription failed. Please try again.")
      }
    } catch (error) {
      setSubscribeMessage("Network error. Please try again.")
      console.error("Newsletter subscription error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNavigation = (sectionId: string, fallbackUrl: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.href = fallbackUrl
    }
  }

  function handleOnClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault()
    window.location.href = "/place-order"
  }
  return (
    <footer className="bg-gradient-to-br from-white via-purple-50/30 to-violet-50/40">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-16 mb-20">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-8">
             
            {/* Center Logo with Comfortaa font */}
            <a href="/" className="flex items-center">
              <img 
                src="/images/deckospacelabs.png" 
                alt="Space Labs Logo" 
                className="h-16 w-auto object-contain ml-1 mb-2"
              />
            </a>
            </div>
            <p className="text-gray-600 leading-relaxed mb-8 max-w-md">
              Transform your space with AI-powered art that evolves with your style. Create personalized artwork that
              reflects your unique taste and brings your walls to life.
            </p>
            <div className="flex space-x-4">
            <a
  href="https://www.instagram.com/deckoviz/"
  target="_blank"
  rel="noopener noreferrer"
  className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-gray-600 hover:text-white hover:bg-gradient-to-bl hover:from-violet-500 hover:via-pink-500 hover:to-yellow-500 transition-all shadow-sm"
  aria-label="Instagram"
>
  <Instagram size={18} />
</a>
<a
  href="#"
  target="_blank"
  rel="noopener noreferrer"
  className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-gray-600 hover:text-white hover:bg-black transition-all shadow-sm"
  aria-label="X"
>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
</a>
<a
  href="#"
  target="_blank"
  rel="noopener noreferrer"
  className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-600 transition-all shadow-sm"
  aria-label="Facebook"
>
  <Facebook size={18} />
</a>
<a
  href="https://www.linkedin.com/company/deckoviz/"
  target="_blank"
  rel="noopener noreferrer"
  className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-700 transition-all shadow-sm"
  aria-label="LinkedIn"
>
  <Linkedin size={18} />
</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-8">Product</h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => handleNavigation("features", "/features")}
                  className="text-gray-600 hover:text-purple-700 transition-colors text-sm text-left block"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("how-it-works", "/how-it-works")}
                  className="text-gray-600 hover:text-purple-700 transition-colors text-sm text-left block"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("pricing", "/pricing")}
                  className="text-gray-600 hover:text-purple-700 transition-colors text-sm text-left block"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("faq", "/faq")}
                  className="text-gray-600 hover:text-purple-700 transition-colors text-sm text-left block"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
  onClick={() => handleNavigation("generalinfo", "/generalinfo")}
  className="text-gray-600 hover:text-purple-700 transition-colors text-sm text-left block"
>
  More Info
</button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-8">Company</h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => handleNavigation("about", "/about")}
                  className="text-gray-600 hover:text-purple-700 transition-colors text-sm text-left block"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                onClick={() => window.location.href = "https://www.linkedin.com/company/deckoviz-space/jobs/"}
                className="text-gray-600 hover:text-purple-700 transition-colors text-sm text-left block">
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("blog", "/blog")}
                  className="text-gray-600 hover:text-purple-700 transition-colors text-sm text-left block"
                >
                  Blog
                </button>
              </li>
                <li>
  <button 
    onClick={() => handleNavigation("contact", "/contact")}
    className="text-gray-600 hover:text-purple-700 transition-colors text-sm text-left block"
  >
    Contact Us
  </button>
</li>
<li>
  <button 
    onClick={() => handleNavigation("sitemap", "/sitemap")}
    className="text-gray-600 hover:text-purple-700 transition-colors text-sm text-left block"
  >
    Sitemap
  </button>

</li>
<li>
  <button 
    onClick={() => handleNavigation("partnership", "/partnership")}
    className="text-gray-600 hover:text-purple-700 transition-colors text-sm text-left block"
  >
    Partnership
  </button>
</li>

<li>
  <button 
    onClick={() => window.location.href = "/support"}
    className="text-gray-600 hover:text-purple-700 transition-colors text-sm text-left block"
  >
    Support
  </button>
</li>


            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-8">Stay in the Loop</h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Get exclusive design tips, new product launches, and special offers delivered straight to your inbox.
            </p>
            <div className="space-y-4">
              <div className="flex rounded-xl overflow-hidden bg-white shadow-lg border border-purple-100">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-inset bg-transparent"
                />
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-4 text-white text-sm font-medium transition-all hover:scale-105 disabled:opacity-70 bg-gradient-to-r from-purple-300 to-violet-400 hover:from-purple-400 hover:to-violet-500 flex items-center justify-center min-w-[60px]"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
              {subscribeMessage && (
                <p
                  className={`text-sm font-medium ${
                    subscribeMessage.includes("Successfully") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {subscribeMessage}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative mb-16">
          <div className="absolute inset-4 bg-gradient-to-r from-purple-100 via-orange-50 to-violet-100 rounded-3xl blur-lg shadow-2xl shadow-purple-200/50"></div>
          <div className="relative z-10 py-16 px-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-600 "> 
              Ready to transform your space?
            </h2>
            <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of happy customers who've brought their walls to life with Deckoviz.
            </p>
          <button  onClick = {handleOnClick}className="group relative px-8 py-3 text-white font-medium rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20 hover:scale-105 overflow-hidden text-base border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-300 via-pink-400 to-violet-500 transition-all duration-300 group-hover:from-orange-400 group-hover:via-pink-500 group-hover:to-violet-600"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative z-10 flex items-center justify-center gap-2 font-light">
              Shop Deckoviz Frames
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
          </div>
        </div>

       {/* Bottom Copyright */}
<div className="border-t border-purple-200/50 pt-8">
 <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
   <p className="text-gray-700 text-sm">© {new Date().getFullYear()} Deckoviz. All rights reserved.</p>
   <div className="flex space-x-6">
     <button
       onClick={() => handleNavigation("privacy", "/privacy-policy")}
       className="text-gray-600 hover:text-purple-700 transition-colors text-sm"
     >
       Privacy Policy
     </button>
     <button
       onClick={() => handleNavigation("terms", "/terms-conditions")}
       className="text-gray-600 hover:text-purple-700 transition-colors text-sm"
     >
       Terms & Conditions
     </button>
     <button
       onClick={() => handleNavigation("shipping", "/shipping-policy")}
       className="text-gray-600 hover:text-purple-700 transition-colors text-sm"
     >
       Shipping Policy
     </button>
   </div>
 </div>
</div>
      </div>
    </footer>
  )
}

export default Footer