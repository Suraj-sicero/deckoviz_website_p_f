import React, { useState } from 'react';
import { Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setSubscribeMessage('Please enter your email');
      return;
    }
    
    setIsSubmitting(true);
    setSubscribeMessage('');
    
    try {
      const response = await fetch('https://auth.deckoviz.com/auth/newsletter/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });
      
      if (response.status == 201) {
        setEmail('');
        setSubscribeMessage('Successfully subscribed!');
      } else {
        setSubscribeMessage('Subscription failed. Please try again.');
      }
    } catch (error) {
      setSubscribeMessage('Network error. Please try again.');
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSectionNav = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
               <span
          className="text-3xl font-bold bg-clip-text text-transparent leading-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #05286d, #2da370, #c8d188, #e3aa4b, #ff9100, #602377, #2f1086)',
          }}
        >
          Deckoviz
        </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Transform your space with AI-powered art that evolves with your style.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/deckoviz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/deckoviz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Product</h3>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => handleSectionNav('features')} 
                  className="text-gray-500 hover:text-gray-900 transition-colors text-sm text-left"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionNav('how-it-works')} 
                  className="text-gray-500 hover:text-gray-900 transition-colors text-sm text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionNav('pricing')} 
                  className="text-gray-500 hover:text-gray-900 transition-colors text-sm text-left"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button className="text-gray-500 hover:text-gray-900 transition-colors text-sm text-left">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <button className="text-gray-500 hover:text-gray-900 transition-colors text-sm text-left">
                  About Us
                </button>
              </li>
              <li>
                <button className="text-gray-500 hover:text-gray-900 transition-colors text-sm text-left">
                  Careers
                </button>
              </li>
              <li>
                <button className="text-gray-500 hover:text-gray-900 transition-colors text-sm text-left">
                  Blog
                </button>
              </li>
             <li>
  <a href="/contact" className="text-gray-500 hover:text-gray-900 transition-colors text-sm text-left block">
    Contact Us
  </a>
</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Stay Updated</h3>
            <p className="text-gray-600 text-sm mb-6">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-3 text-white text-sm font-medium rounded-r-lg transition-colors disabled:opacity-70"
                  style={{ backgroundColor: '#7441dd' }}
                >
                  {isSubmitting ? '...' : '→'}
                </button>
              </div>
              {subscribeMessage && (
                <p className={`text-sm ${subscribeMessage.includes('Successfully') ? 'text-green-600' : 'text-red-600'}`}>
                  {subscribeMessage}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to transform your space?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who've brought their walls to life with Deckoviz.
          </p>
          <button 
            className="px-8 py-4 text-white font-light rounded-lg transition-colors hover:opacity-90"
            style={{ backgroundColor: '#7441dd' }}
          >
            Shop Deckoviz Frames
          </button>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Deckoviz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;