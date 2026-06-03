import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if we're on specific pages for styling
  const isAboutPage = location.pathname === '/about';
  const isHomePage = location.pathname === '/';

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Ellaris', path: '/ellaris' },
    { name: 'Blog', path: '/blog' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Join Us', path: '/join-us'},
   ];

  const handleNavClick = (item: { name: string; path: string }) => {
    setActiveItem(item.name);
    navigate(item.path);
    setMobileMenuOpen(false);
  };

  const isActive = (itemName: string) => activeItem === itemName && activeItem !== "";

  useEffect(() => {
    const currentPath = location.pathname;
    const matchedItem = navItems.find((item) => item.path === currentPath);

    if (matchedItem) {
      setActiveItem(matchedItem.name);
    } else {
      setActiveItem("");
    }
  }, [location]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 lg:px-13"
      style={{
        ...(isAboutPage 
          ? {
            // Updated: Deep Indigo to Royal Blue to Cyan-Blue
            backgroundImage: 'linear-gradient(90deg, #1e1b4b 0%, #1d4ed8 50%, #3b82f6 100%)',
            minHeight: '60px',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.15)',
            borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
          }
          : isHomePage
          ? {
            backgroundColor: 'transparent',
            minHeight: '60px',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
          }
          : {
            // Default dark state using the deep navy base
            backgroundColor: '#030014',
            minHeight: '60px',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.15), 0 0 30px rgba(123, 63, 228, 0.1)',
            borderBottom: '1px solid rgba(123, 63, 228, 0.1)',
          }
        ),
      }}
    >
      {/* Background overlay */}
      {!isAboutPage && !isHomePage && <div className="absolute inset-0 bg-black/40"></div>}

      <nav className="relative z-10 flex items-center justify-between h-full px-2 md:px-4">
        {/* Logo */}
        <div
          onClick={() => handleNavClick({ name: 'Home', path: '/' })}
          className="flex items-center cursor-pointer"
        >
          <img
            src={
              location.pathname === "/ellaris"
                ? "https://res.cloudinary.com/dge1qccxs/image/upload/v1778684434/c1f8ea4f-c0a7-47b5-8d9b-7763b7468f7c-removebg-preview_dlnxyk.png"
                : "https://res.cloudinary.com/dge1qccxs/image/upload/v1778672008/04235931-ebaa-4506-8551-d59bd86b6b26-removebg-preview_vyqdqe.png"
            }
            alt="Elinity Logo"
            className="h-20 md:h-20 -mr-2 md:-mr-4 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]"
            width="125"
            height="110"
          />
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Desktop Nav Links */}
        <div
          className="hidden md:flex ml-28 px-7 py-2 space-x-4 border-[0.25px] border-white/10 bg-white/5 backdrop-blur-xl text-sm"
          style={{
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.05), inset 0 0 8px rgba(255, 255, 255, 0.03)',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: '500',
            borderRadius: '16px',
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`px-3 py-1 rounded-full relative transition-all duration-300 ease-in-out ${
                isActive(item.name) ? 'text-white bg-white/10' : 'text-gray-400'
              } hover:text-white hover:bg-white/10 hover:scale-105`}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleNavClick(item)}
            >
              {isActive(item.name) && (
                <span className="absolute left-0 -translate-x-1 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white shadow-[0_0_8px_#fff]"></span>
              )}
              {item.name.toLowerCase()}
              {hoveredItem === item.name && !isActive(item.name) && (
                // Updated Gradient: Blue to Indigo
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-[#3B82F6] to-[#7B3FE4] rounded-full transition-all duration-300 ease-in-out"></div>
              )}
            </button>
          ))}
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          <a
            href="/login"
            className="px-3 py-1 lg:px-4 lg:py-2 border border-[#3B82F6]/50 text-white rounded-lg hover:bg-[#3B82F6]/10 transition-all duration-200 text-sm"
            style={{
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.15)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: '500',
            }}
          >
            login
          </a>
          <button
            onClick={() => navigate('/get-started')}
            className="px-3 py-1 lg:px-4 lg:py-2 rounded-lg text-white bg-gradient-to-r from-[#3B82F6] to-[#7B3FE4] hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 text-sm"
            style={{
              boxShadow: '0 0 15px rgba(59, 130, 246, 0.25)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: '500',
            }}
          >
            sign up
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#030014] border border-white/10 rounded-lg shadow-2xl p-4 md:hidden">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  className={`px-3 py-2 rounded-md text-left ${
                    isActive(item.name) ? 'text-white bg-white/10' : 'text-gray-300'
                  } hover:text-white hover:bg-white/10`}
                  onClick={() => handleNavClick(item)}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: '500',
                    textTransform: 'lowercase'
                  }}
                >
                  {item.name}
                </button>
              ))}
              <div className="border-t border-white/10 pt-3 mt-2 flex flex-col space-y-2">
                <a
                  href="/login"
                  className="px-3 py-2 border border-[#3B82F6]/50 text-white rounded-lg text-center"
                >
                  login
                </a>
                <button
                  onClick={() => { setMobileMenuOpen(false); navigate('/get-started'); }}
                  className="px-3 py-2 rounded-lg text-white bg-gradient-to-r from-[#3B82F6] to-[#7B3FE4] text-center"
                >
                  sign up
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;