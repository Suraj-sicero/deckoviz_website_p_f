import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Deckoviz has truly been a game-changer. In just three weeks, they have given the entire project a rocket boost, going above and beyond.",
      author: "Sagar",
      role: "CEO",
      company: "SIP Social",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    {
      quote: "I must say their level of creativity and professionalism is unparalleled. Deckoviz exceeded our expectations. A design partner you can trust.",
      author: "Lindsay",
      role: "Head of Marketing",
      company: "Aero Interactive",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
    },
    {
      quote: "Deckoviz has truly been a game-changer. In just three weeks, they have given the entire project a rocket boost, going above and beyond.",
      author: "Sagar",
      role: "CEO",
      company: "SIP Social",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    {
      quote: "We've been truly impressed with how well they've nailed a Deckoviz. Highly recommended!",
      author: "Samantha",
      role: "Co-Founder",
      company: "KYU House",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    },
    {
      quote: "Deckoviz always good theme for our projects and helped us execute them at a high level, top work!",
      author: "Alice",
      role: "HR Manager",
      company: "Tech Solutions",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face"
    },
    {
      quote: "The communication is always excellent, the turnaround is extremely quick, and the designs are fresh, innovative, and spot on!",
      author: "Alex",
      role: "Recruitment Director",
      company: "Navarro Technology",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      quote: "With a great understanding of the project and current technologies. We were delighted and very impressed with the work they delivered.",
      author: "Edoardo",
      role: "Head of Design",
      company: "Vakey",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face"
    },
    {
      quote: "The team demonstrated a deep understanding of current technologies, delivering a design that not only met our requirements but also surpassed our expectations.",
      author: "Norbert",
      role: "Owner",
      company: "Villa Otis",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face"
    },
    {
      quote: "A very skilled team, they're knowledgeable with a broad understanding of the product and current technologies. We were delighted and very impressed with the work they delivered.",
      author: "Edoardo",
      role: "Head of Design",
      company: "Vakey",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face"
    }
  ];

  // Split testimonials into three columns
  const leftColumn = testimonials.filter((_, index) => index % 3 === 0);
  const centerColumn = testimonials.filter((_, index) => index % 3 === 1);
  const rightColumn = testimonials.filter((_, index) => index % 3 === 2);

  const TestimonialCard = ({ testimonial, index }: { testimonial: any, index: number }) => (
    <div className="bg-gray-100 rounded-2xl p-4 md:p-6 mb-4 md:mb-6 break-inside-avoid">
      <p className="text-gray-800 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
        "{testimonial.quote}"
      </p>
      
      <div className="flex items-center gap-3">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.author}
          className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="font-light text-gray-900 text-sm md:text-base">{testimonial.author}</p>
          <p className="text-xs md:text-sm text-gray-900 font-semibold">
            <span className="font-bold">{testimonial.role}</span> at <span className="font-light">{testimonial.company}</span>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-white">
      {/* External top fade effect */}
      <div className="absolute top-0 left-0 right-0 h-8 sm:h-10 bg-gradient-to-b from-white to-transparent z-10"></div>

      {/* External bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-10 bg-gradient-to-t from-white to-transparent z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-[#7441dd]">Customers Say</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
 Don't just take our word for it. Here's what people <span className="text-red-600 font-semibold">love</span> about Deckoviz.
</p>
        </div>

        {/* Mobile: Single column with proper spacing */}
        <div className="block sm:hidden space-y-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-100 rounded-2xl p-6 mx-2"
            >
              <p className="text-gray-800 mb-6 leading-relaxed text-sm">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{testimonial.author}</p>
                  <p className="text-xs text-gray-600 truncate">
                    <span className="font-semibold">{testimonial.role}</span> at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Three animated columns */}
        <div className="hidden sm:block relative">
          {/* Container with fixed height and overflow hidden to prevent leakage */}
          <div className="h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-full">
              {/* Left Column - Moving Up */}
              <div className="animate-slide-up">
                {leftColumn.map((testimonial, index) => (
                  <TestimonialCard key={`left-${index}`} testimonial={testimonial} index={index} />
                ))}
                {/* Duplicate for seamless loop */}
                {leftColumn.map((testimonial, index) => (
                  <TestimonialCard key={`left-dup-${index}`} testimonial={testimonial} index={index} />
                ))}
              </div>

              {/* Center Column - Moving Down */}
              <div className="animate-slide-down">
                {centerColumn.map((testimonial, index) => (
                  <TestimonialCard key={`center-${index}`} testimonial={testimonial} index={index} />
                ))}
                {/* Duplicate for seamless loop */}
                {centerColumn.map((testimonial, index) => (
                  <TestimonialCard key={`center-dup-${index}`} testimonial={testimonial} index={index} />
                ))}
              </div>

              {/* Right Column - Moving Up */}
              <div className="animate-slide-up-delayed">
                {rightColumn.map((testimonial, index) => (
                  <TestimonialCard key={`right-${index}`} testimonial={testimonial} index={index} />
                ))}
                {/* Duplicate for seamless loop */}
                {rightColumn.map((testimonial, index) => (
                  <TestimonialCard key={`right-dup-${index}`} testimonial={testimonial} index={index} />
                ))}
              </div>
            </div>
            
            {/* Internal top fade to prevent content from showing above container */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none"></div>
            
            {/* Internal bottom fade to prevent content from showing below container */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none"></div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          
          @keyframes slideDown {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0); }
          }
          
          .animate-slide-up {
            animation: slideUp 20s linear infinite;
          }
          
          .animate-slide-down {
            animation: slideDown 20s linear infinite;
          }
          
          .animate-slide-up-delayed {
            animation: slideUp 20s linear infinite;
            animation-delay: -10s;
          }
        `
      }} />
    </section>
  );
};

export default Testimonials;