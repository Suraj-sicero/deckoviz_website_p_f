import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import PlaceOrder from './components/PlaceOrder';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import Features from './components/Features';
// import HowItWorks from './components/HowItWorks';
// import Gallery from './components/Gallery';
// import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
// import Referral from './components/Referral';
// import FAQ from './components/FAQ';
// import Contact from './components/Contact';
import WhoIsDeckovizFor from './components/WhoIsDeckovizFor';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ShippingPolicy from './components/ShippingPolicy';
import ReturnPolicy from './components/ReturnPolicy';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Pricing from './components/Pricing';
import DeckovizLanding from './components/DeckovizForHotels';

const ScrollToSectionOnHome: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <ScrollToSectionOnHome />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero/>
            {/* <Features /> */}
            <WhoIsDeckovizFor />
            {/* <HowItWorks />
            <Gallery />
            <Pricing /> */}
            <Testimonials />
             {/* <Referral />
            <FAQ /> 
            <Contact /> */}
          </>
        } />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path ="/deckovizforhotels" element={<DeckovizLanding />} />
        {/* <Route path="/how-it-works" element={<HowItWorks />} /> */}
        {/* <Route path="/gallery" element={<Gallery />} /> */}
        
        {/* <Route path="/testimonials" element={<Testimonials />} /> */}
        {/* <Route path="/referral" element={<Referral />} /> */}
        {/* <Route path="/faq" element={<FAQ />} /> */}

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;