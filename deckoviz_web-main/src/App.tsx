import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AboutUs from './components/AboutUs';
import PlaceOrder from './components/payment/PlaceOrder';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/homepage/Hero';
import Features from './components/homepage/Features';
import Testimonials from './components/homepage/Testimonials';
import WhoIsDeckovizFor from './components/homepage/WhoIsDeckovizFor';
import PrivacyPolicy from './components/policies/PrivacyPolicy';
import TermsOfService from './components/policies/TermsOfService';
import ShippingPolicy from './components/policies/ShippingPolicy';
import ReturnPolicy from './components/policies/ReturnPolicy';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Pricing from './components/homepage/Pricing';
import Youtube from './components/homepage/Youtube';
import DeckovizLanding from './components/deckovizForBusinesses/DeckovizForHotels';
import DeckovizRestaurantLanding from './components/deckovizForBusinesses/DeckovizForRestaurants';
import DeckovizArchitectsLanding from './components/deckovizForBusinesses/DeckovizForArchitects';
import DeckovizOfficesLanding from './components/deckovizForBusinesses/DeckovizForOffices';
import DeckovizForRealEstate from './components/deckovizForBusinesses/DeckovizForRealestate';
import DeckovizTherapistsLanding from './components/deckovizForBusinesses/DeckovizForTherapists';
import DeckovizSchoolsLanding from './components/deckovizForBusinesses/DeckovizForSchools';
import DeckovizForRetail from './components/deckovizForBusinesses/DeckovizForStores';
import DeckovizForEnterprise from './components/deckovizForBusinesses/DeckovizForEnterprise';
import FAQ from './components/homepage/FAQ';
import WallOfLove from './components/WallOfLove';
import HowItWorks from './components/homepage/HowItWorks';
import AboutDeckoviz from "./components/homepage/AboutDeckoviz";
import AllFeatures from "./components/homepage/AllFeatures";
import Leaderboard from './components/Leaderboard';
import TransformWalls from './components/homepage/Transform';
import DesignedFor from './components/homepage/DesignedFor';
import OrderConfirmed from './components/payment/OrderConfirmed';
import BulkOrder from './components/payment/BulkOrder';
import BulkConfirm from './components/payment/BulkConfirm';
import GuestReactionsTestimonials from './components/homepage/GuestReactionsTestimonials';
import Referral from './components/Referral';

import Sitemap from "./components/Sitemap";

import BlogDetail from "./components/BlogDetail"

import { i } from 'framer-motion/client';
import Benefits from "./components/homepage/Benefits";
import AllBenefits from "./components/homepage/AllBenefits";


// ## 1. IMPORT THE NEW BLOG POST PAGE COMPONENT ##


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
            <TransformWalls />
            <Features />
<Benefits />

            <WhoIsDeckovizFor />
            <DesignedFor />
            <HowItWorks />
            <GuestReactionsTestimonials /> 
            <Youtube />
             <Referral />
            <Pricing />
            <FAQ /> 
          </>
        } />
        
        <Route path="/blog" element={<Blog />} />
        {/* ## 2. ADD THE NEW DYNAMIC ROUTE FOR SINGLE POSTS ## */}
<Route path="/blog/:slug" element={<BlogDetail />} />


        <Route path="/designed-for" element={<DesignedFor />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsOfService />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about-deckoviz" element={<AboutDeckoviz />} />
        <Route path="/benefits" element={<AllBenefits />} />
<Route path="/sitemap" element={<Sitemap />} />

        <Route path="/all-features" element={<AllFeatures />} />
        <Route path ="/deckoviz-for-hotels" element={<DeckovizLanding />} />
        <Route path ="/deckoviz-for-restaurants" element={<DeckovizRestaurantLanding />} />
        <Route path ="/deckoviz-for-architects" element={<DeckovizArchitectsLanding />} />
        <Route path ="/deckoviz-for-offices" element={<DeckovizOfficesLanding />} />
        <Route path ="/deckoviz-for-realestate" element={<DeckovizForRealEstate />} />
        <Route path ="/deckoviz-for-therapists" element={<DeckovizTherapistsLanding />} />
        <Route path ="/deckoviz-for-schools" element={<DeckovizSchoolsLanding />} />
        <Route path ="/deckoviz-for-retailstores" element={<DeckovizForRetail />} />
        <Route path ="/deckoviz-for-enterprises" element={<DeckovizForEnterprise />} />
        <Route path ="/Wall-Of-Love" element={<WallOfLove/>} />
        <Route path ="/Leaderboard" element={<Leaderboard/>} />
        <Route path ="/Transform-Walls" element={<TransformWalls/>} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/order-confirmed" element={<OrderConfirmed />} />
        <Route path ="bulk-orders" element={<BulkOrder />} />
        <Route path ="/bulk-confirm" element={<BulkConfirm />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;