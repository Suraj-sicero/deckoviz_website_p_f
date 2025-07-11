import React, { useState } from 'react';
import { CheckCircle, Mail, Phone, ArrowRight, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const BulkOrder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    preferredSizes: '',
    locations: '',
    deliveryTimeframe: '',
    customizationNotes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMoreBenefits, setShowMoreBenefits] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log('Form submitted:', formData);
  };

 const perfectForData = [
  {
    icon: 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/user-group.svg',
    title: "Interior designers & architects",
    description: "Transform client spaces with dynamic art that evolves with their lifestyle and preferences."
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/building-office-2.svg',
    title: "Hospitality chains & boutique hotels",
    description: "Create memorable guest experiences with art that adapts to different moods and occasions."
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/building-office.svg',
    title: "Offices & co-working spaces",
    description: "Boost creativity and productivity with inspiring visuals that change throughout the day."
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/building-library.svg',
    title: "Art curators & institutions",
    description: "Showcase collections in new ways with interactive and educational art experiences."
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/home-modern.svg',
    title: "Developers & real estate showrooms",
    description: "Bring showrooms to life and help buyers envision their future homes with smart art."
  },
  {
    icon: 'https://cdn.jsdelivr.net/npm/heroicons@2.0.18/24/outline/academic-cap.svg',
    title: "Schools, wellness centers, and creative spaces",
    description: "Create inspiring educational environments that adapt to different learning activities."
  }
];

  const mainBenefits = [
    {
      icon: '💰',
      title: "Exclusive Discounts",
      description: "Tiered pricing for bulk quantities with significant savings as you order more."
    },
    {
      icon: '🎯',
      title: "Custom Branding Options",
      description: "Frame customizations, branded visuals, or curated collections tailored to your brand."
    },
    {
      icon: '🤝',
      title: "Dedicated Account Support",
      description: "From order to installation with expert guidance every step of the way."
    }
  ];

  const additionalBenefits = [
    {
      icon: '🚚',
      title: "Flexible Logistics",
      description: "Pan-India and international shipping coordination with white-glove delivery options."
    },
    {
      icon: '⚡',
      title: "Multi-Frame Syncing & Content Scheduling",
      description: "Centralized content control available on request for seamless management."
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        {/* Light background similar to your existing components */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-br from-purple-100/40 via-pink-50/30 to-transparent blur-3xl"></div>
          <div className="absolute top-1/4 right-0 w-1/2 h-1/3 bg-gradient-to-bl from-pink-100/40 via-orange-50/30 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-1/3 h-1/2 bg-gradient-to-tr from-orange-100/40 via-purple-50/30 to-transparent blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
          <div className="text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-6 text-gray-900">
              Thank You — Your Bulk Order Request Has Been Received!
            </h1>
           
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We've received your bulk order inquiry and our team is reviewing your details. You'll hear from us within the next 24–48 hours to finalize your quote and guide you through the next steps.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                We're thrilled that you've chosen to bring the magic of <span className="text-purple-600 font-semibold">Deckoviz</span> to your space — and we're excited to help you craft a powerful visual experience across your environments.
              </p>
            </div>

            {/* What happens next */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                What happens <span className="text-purple-600">next?</span>
              </h2>
              
              <div className="space-y-6 text-left max-w-2xl mx-auto">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">A Deckoviz representative will get in touch with you shortly.</h3>
                    <p className="text-gray-600 text-sm">Our expert team will review your requirements and reach out within 24-48 hours.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">You'll receive a personalized proposal.</h3>
                    <p className="text-gray-600 text-sm">Including pricing, shipping timelines, and recommendations tailored to your use case.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Upon confirmation, we'll initiate everything.</h3>
                    <p className="text-gray-600 text-sm">Production, customization (if any), and logistics coordination.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-900 rounded-2xl p-8 text-white mb-8">
              <h3 className="text-xl font-bold mb-6">Need to make a change or want to talk to someone now?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10">
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">orders@deckoviz.com</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10">
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">+44-XXXXXXXXXX</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Go Back
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Light background similar to your existing components */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-br from-purple-200 via-pink-200 to-transparent blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-1/2 h-1/3 bg-gradient-to-bl from-pink-300 via-orange-100 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-1/3 h-1/2 bg-gradient-to-tr from-orange-200 via-purple-200 to-transparent blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="bg-[#935fe6] text-white px-3 py-1 rounded-lg text-sm mt-7 font-medium shadow-lg">
              Bulk Orders Portal
            </div>
          </div>

          <h1 className="text-4xl md:text-4xl font-bold mt-10 mb-6 text-gray-900 leading-tight">
            Bulk Orders – Transform Spaces at Scale with <span className="bg-gradient-to-r from-[#793ae7] to-[#be37b1] bg-clip-text text-transparent">Deckoviz</span>
          </h1>
          
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <span className="text-purple-600 font-semibold">Deckoviz</span> is the world's first <span className="text-indigo-600 font-semibold">AI-powered dynamic art frame</span> — a powerful, beautiful blend of <span className="text-fuchsia-500 font-semibold">technology</span>, <span className="text-rose-500 font-semibold">creativity</span>, and <span className="text-purple-600 font-semibold">personalization</span>. Whether you're designing for homes, hotels, offices, or commercial spaces, Deckoviz helps you transform walls into <span className="text-indigo-600 font-semibold">living, evolving experiences</span>.
            </p>
            <p className="text-lg text-gray-800 font-medium">
              Order in bulk and enjoy <span className="text-pink-600 font-bold">exclusive pricing</span>, <span className="text-blue-600 font-bold">dedicated support</span>, and <span className="text-purple-600 font-bold">seamless customization</span>.
            </p>
          </div>

          {/* Perfect for Section */}
<div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-200 mb-12">
  <h2 className="text-2xl md:text-2xl font-semibold text-gray-900 mb-6">
    Perfect for :
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
    {perfectForData.map((item, index) => (
      <div
        key={index}
        className="flex flex-col items-center text-center p-4 md:p-6 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 bg-white"
      >
        <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-50 rounded-full flex items-center justify-center mb-3 border border-gray-200">
          <img
            src={item.icon}
            alt={item.title}
            className="w-6 h-6 md:w-7 md:h-7 text-gray-700 filter brightness-0 invert-0"
          />
        </div>
        <span className="text-sm md:text-base text-gray-800 font-medium">
          {item.title}
        </span>
      </div>
    ))}
  </div>
</div>



        </div>

        {/* Why Bulk Order Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Bulk Order with <span className="text-purple-600">Deckoviz?</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {mainBenefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Show More Benefits */}
          <div className="text-center mb-8">
            <button
              onClick={() => setShowMoreBenefits(!showMoreBenefits)}
              className="inline-flex items-center gap-2 text-gray-700 font-semibold hover:text-purple-700 transition-colors duration-300"
            >
              {showMoreBenefits ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              {showMoreBenefits ? 'Show Less' : 'Show More Benefits'}
            </button>
          </div>

          {showMoreBenefits && (
            <div className="grid md:grid-cols-2 gap-8">
              {additionalBenefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="text-3xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It <span className="text-purple-600">Works?</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-purple-500 rounded-full"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-purple-600">1</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Submit Your Requirements</h3>
              <p className="text-gray-600 leading-relaxed">Fill out the short form below with quantity, use case, preferences, and any custom needs.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Receive a Proposal</h3>
              <p className="text-gray-600 leading-relaxed">Our team will reach out with pricing, lead times, and recommendations tailored to your use case.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-green-500 rounded-full"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-green-600">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Finalize & Confirm</h3>
              <p className="text-gray-600 leading-relaxed">Once confirmed, we'll coordinate shipping, onboarding, and installation support.</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">
                Get a <span className="text-purple-600">Custom Quote</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Please fill in your requirements and our team will get back to you within <span className="text-purple-600 font-semibold">24–48 hours</span>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all duration-300"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company / Organization *</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all duration-300"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity Needed *</label>
                  <select
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all duration-300"
                  >
                    <option value="">Select quantity</option>
                    <option value="5-10">5-10 units</option>
                    <option value="11-25">11-25 units</option>
                    <option value="26-50">26-50 units</option>
                    <option value="51-100">51-100 units</option>
                    <option value="100+">100+ units</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Sizes</label>
                  <select
                    name="preferredSizes"
                    value={formData.preferredSizes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all duration-300"
                  >
                    <option value="">Select preferred sizes</option>
                    <option value="43-inch">43" (Starter)</option>
                    <option value="55-inch">55" (Premium)</option>
                    <option value="65-inch">65" (Ultra)</option>
                    <option value="75-inch">75" (Pro)</option>
                    <option value="85-inch">85" (Elite)</option>
                    <option value="custom">Custom sizes</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location(s) *</label>
                  <input
                    type="text"
                    name="locations"
                    value={formData.locations}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all duration-300"
                    placeholder="City, State/Country"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Delivery Timeframe</label>
                  <select
                    name="deliveryTimeframe"
                    value={formData.deliveryTimeframe}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition-all duration-300"
                  >
                    <option value="">Select timeframe</option>
                    <option value="1-2-weeks">1-2 weeks</option>
                    <option value="3-4-weeks">3-4 weeks</option>
                    <option value="1-2-months">1-2 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Any Customization or Use Case Notes</label>
                <textarea
                  name="customizationNotes"
                  value={formData.customizationNotes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 resize-none transition-all duration-300"
                  placeholder="Please describe your specific use case, any customization requirements, branding needs, or other special considerations..."
                />
              </div>

              <div className="text-center">
                <button onClick={() => (window.location.href = "/bulk-confirm")}
                  type="submit"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <Mail className="w-5 h-5" />
                  Submit Bulk Order Request
                </button>
              </div>
            </form>

            {/* Note Section */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-bold text-blue-700 uppercase tracking-wide">Important Note</span>
                </div>
                <p className="text-sm text-gray-700">
                  <strong>For urgent requirements or orders above 50 units,</strong> you can directly email us at{' '}
                  <a href="mailto:orders@deckoviz.com" className="text-purple-600 hover:text-purple-700 font-bold underline">
                    orders@deckoviz.com
                  </a>{' '}
                  or call us at{' '}
                  <a href="tel:+44-XXXXXXXXXX" className="text-purple-600 hover:text-purple-700 font-bold underline">
                    +44-XXXXXXXXXX
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOrder;