import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AboutUs from './components/AboutUs';
import PlaceOrder from './components/PlaceOrder';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/homepage/Hero';
import Features from './components/homepage/Features';
// import HowItWorks from './components/HowItWorks';
// import Gallery from './components/Gallery';
// import Pricing from './components/Pricing';
import Testimonials from './components/homepage/Testimonials';
// import Referral from './components/Referral';
// import FAQ from './components/FAQ';
// import Contact from './components/Contact';
import WhoIsDeckovizFor from './components/homepage/WhoIsDeckovizFor';
import PrivacyPolicy from './components/policies/PrivacyPolicy';
import TermsOfService from './components/policies/TermsOfService';
import ShippingPolicy from './components/policies/ShippingPolicy';
import ReturnPolicy from './components/ReturnPolicy';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Pricing from './components/homepage/Pricing';
import DeckovizLanding from './components/deckovizForBusinesses/DeckovizForHotels';
import DeckovizRestaurantLanding from './components/deckovizForBusinesses/DeckovizForRestaurants';
import DeckovizArchitectsLanding from './components/deckovizForBusinesses/DeckovizForArchitects';
import DeckovizOfficesLanding from './components/deckovizForBusinesses/DeckovizForOffices';
import DeckovizForRealEstate from './components/deckovizForBusinesses/DeckovizForRealestate';
import DeckovizTherapistsLanding from './components/deckovizForBusinesses/DeckovizForTherapists';
import DeckovizSchoolsLanding from './components/deckovizForBusinesses/DeckovizForSchools';
import DeckovizForRetail from './components/deckovizForBusinesses/DeckovizForStores';
import FAQ from './components/homepage/FAQ';
import WallOfLove from './components/WallOfLove';
import HowItWorks from './components/homepage/HowItWorks';
import Leaderboard from './components/Leaderboard';

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
            <Features />
            <WhoIsDeckovizFor />
            <HowItWorks />
            {/* <Gallery /> */}
           
            <Testimonials />
             <Pricing />
             <FAQ /> 
             {/* <Referral />
           
            <Contact /> */}
          </>
        } />
        <Route path="/blog" element={<Blog />} />
         <Route path="/FAQ" element={<FAQ />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path ="/deckoviz-for-hotels" element={<DeckovizLanding />} />
        <Route path ="/deckoviz-for-restaurants" element={<DeckovizRestaurantLanding />} />
        <Route path ="/deckoviz-for-architects" element={<DeckovizArchitectsLanding />} />
        <Route path ="/deckoviz-for-offices" element={<DeckovizOfficesLanding />} />
        <Route path ="/deckoviz-for-realestate" element={<DeckovizForRealEstate />} />
        <Route path ="/deckoviz-for-therapists" element={<DeckovizTherapistsLanding />} />
        <Route path ="/deckoviz-for-schools" element={<DeckovizSchoolsLanding />} />
        <Route path ="/deckoviz-for-retailstores" element={<DeckovizForRetail />} />
         <Route path ="/Wall-Of-Love" element={<WallOfLove/>} />
           <Route path ="/Leaderboard" element={<Leaderboard/>} />



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