import React, { useEffect, useState } from "react";
import { useRef } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import LoadingAnimation from "./components/LoadingAnimation";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import GeneralInfo from "./components/homepage/generalinfo";
import AboutUs from "./components/AboutUs";
import PlaceOrder from "./components/payment/PlaceOrder";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./components/homepage/Hero";
import Features from "./components/homepage/Features";
import WhoIsDeckovizFor from "./components/homepage/WhoIsDeckovizFor";
import PrivacyPolicy from "./components/policies/PrivacyPolicy";
import TermsOfService from "./components/policies/TermsOfService";
import ShippingPolicy from "./components/policies/ShippingPolicy";
import ReturnPolicy from "./components/policies/ReturnPolicy";
import ForHomesThatMeanSomething from "./components/homepage/ForHomesThatMeanSomething";
import HomeMeansSomething from "./components/homepage/HomeMeansSomething";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Pricing from "./components/homepage/Pricing";
import Youtube from "./components/homepage/Youtube";
import DeckovizLanding from "./components/deckovizForBusinesses/DeckovizForHotels";
import DeckovizRestaurantLanding from "./components/deckovizForBusinesses/DeckovizForRestaurants";
import DeckovizArchitectsLanding from "./components/deckovizForBusinesses/DeckovizForArchitects";
import DeckovizOfficesLanding from "./components/deckovizForBusinesses/DeckovizForOffices";
import DeckovizForRealEstate from "./components/deckovizForBusinesses/DeckovizForRealestate";
import DeckovizTherapistsLanding from "./components/deckovizForBusinesses/DeckovizForTherapists";
import DeckovizSchoolsLanding from "./components/deckovizForBusinesses/DeckovizForSchools";
import DeckovizForRetail from "./components/deckovizForBusinesses/DeckovizForStores";
import DeckovizForEnterprise from "./components/deckovizForBusinesses/DeckovizForEnterprise";
import FAQ from "./components/homepage/FAQ";
import WallOfLove from "./components/WallOfLove";
import HowItWorks from "./components/homepage/HowItWorks";

import AboutDeckoviz from "./components/homepage/AboutDeckoviz";
import AllFeatures from "./components/homepage/AllFeatures";
import Leaderboard from "./components/Leaderboard";
import TransformWalls from "./components/homepage/Transform";
import DesignedFor from "./components/homepage/DesignedFor";
import OrderConfirmed from "./components/payment/OrderConfirmed";
import BulkOrder from "./components/payment/BulkOrder";
import BulkConfirm from "./components/payment/BulkConfirm";
import GuestReactionsTestimonials from "./components/homepage/GuestReactionsTestimonials";
import Referral from "./components/Referral";
import GoogleTVSection from "./components/homepage/GoogleTVSection";
import DesignedForHumans from "./components/homepage/DesignedForHumans";
import Sitemap from "./components/Sitemap";
import YourLifePlayedBackGently from "./components/homepage/YourLifePlayedBackGently";
import NervousSystem from "./components/homepage/NervousSystem";
import TVPage from "./components/homepage/TVPage";

import BlogDetail from "./components/BlogDetail";
import MessageForVisitors from "./components/homepage/MessageForVisitors";
import MinimalistScreen from "./components/homepage/MinimalistScreen";
import InfinitePortal from "./components/homepage/InfinitePortal";
import Partnership from "./components/Partnership";
import CoreReading from "./components/CoreReading";
import MouseSparkles from "./components/MouseSparkles";


import Benefits from "./components/homepage/Benefits";
import AllBenefits from "./components/homepage/AllBenefits";
import Support from "./components/Support";
import MoreInfo from "./components/MoreInfo";
import DASPGuide from "./components/homepage/DASPGuide";
import StartHere from "./components/homepage/StartHere";
import DASPBusinessGuide from "./components/deckovizForBusinesses/DASPBusinessGuide";
import ToggleGallerySection from "./components/homepage/ToggleGallerySection";

import Audiobook from "./components/Audiobook";
import CreativeStudio from "./components/tools/CreativeStudio";
import AudiobookTool from "./components/tools/AudiobookTool";
import StorybookTool from "./components/tools/StorybookTool";
import MusicTool from "./components/tools/MusicTool";
import VisualJournalTool from "./components/tools/VisualJournalTool";
import ShortStoryTool from "./components/tools/ShortStoryTool";
import GreetingCardTool from "./components/tools/GreetingCardTool";
import ComicTool from "./components/tools/ComicTool";
import LifeBookTool from "./components/tools/LifeBookTool";
import SongTool from "./components/tools/SongTool";
import LearningBookTool from "./components/tools/LearningBookTool";
import LearningPortalTool from "./components/tools/LearningPortalTool";
import VisualBookTool from "./components/tools/VisualBookTool";
import StorybookStudioTool from "./components/tools/StorybookStudioTool";
import DailyInspirationTool from "./components/tools/DailyInspirationTool";
import VisualAudiobookTool from "./components/tools/VisualAudiobookTool";
import PostcardTool from "./components/tools/PostcardTool";
import WizzyPage from "./components/wizzy/WizzyPage";
import ToolGenerator from "./components/developerSpecs/ToolGenerator";
import FluidDreams from "./components/developerSpecs/FluidDreams";
import ParticleGalaxy from "./components/developerSpecs/ParticleGalaxy";
import AudioWaves from "./components/developerSpecs/AudioWaves";
import LivingPaintings from "./components/developerSpecs/LivingPaintings";
import FractalWorlds from "./components/developerSpecs/FractalWorlds";
import PhysicsSandbox from "./components/developerSpecs/PhysicsSandbox";
import NatureSystems from "./components/developerSpecs/NatureSystems";
import AIDreamWorlds from "./components/developerSpecs/AIDreamWorlds";
import TypographyArt from "./components/developerSpecs/TypographyArt";
import WeatherSimulations from "./components/developerSpecs/WeatherSimulations";
import ZenGarden from "./components/developerSpecs/ZenGarden";
import MotionArt from "./components/developerSpecs/MotionArt";
import DataAsArt from "./components/DataAsArt";
import MemoryLandscapes from "./components/MemoryLandscapes";
import CelestialCosmos from "./components/CelestialCosmos";
import MaterialSimulations from "./components/MaterialSimulations";
import DreamArchitecture from "./components/DreamArchitecture";
import OrganismSim from "./components/OrganismSim";
import AmbientRitual from "./components/AmbientRitual";
import SymmetryMachine from "./components/SymmetryMachine";
import ExperimentalArtModes from "./components/developerSpecs/ExperimentalArtModes";


// ## 1. IMPORT THE NEW BLOG POST PAGE COMPONENT ##

const ScrollToSectionOnHome: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return null;
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time - adjust as needed
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds minimum loading time

    // Also check if page is actually loaded
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 1500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <Router>
      <AppContent isLoading={isLoading} />
    </Router>
  );
};

const AppContent: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const location = useLocation();
  const isDeveloperTool = location.pathname.startsWith("/developer-specs");

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingAnimation key="loading" />}
      </AnimatePresence>

      <ScrollToTop />
      <ScrollToSectionOnHome />
      {!isDeveloperTool && <MouseSparkles />}

      <Navbar />
      <main className={isDeveloperTool ? "relative z-10 h-screen pt-20 bg-black overflow-hidden" : ""}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <TransformWalls />
              <Features />
              <Benefits />
              <WhoIsDeckovizFor />
              <DesignedFor />
              <HowItWorks />
              <GuestReactionsTestimonials />

              <ToggleGallerySection />
              <Youtube />
              <GoogleTVSection />
              <Referral />
              <StartHere />
              <Pricing />
              <FAQ />
            </>
          }
        />

        <Route path="/blog" element={<Blog />} />
        {/* ## 2. ADD THE NEW DYNAMIC ROUTE FOR SINGLE POSTS ## */}
        <Route path="/blog/:slug" element={<BlogDetail />} />

        <Route path="/designed-for" element={<DesignedFor />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route
          path="/homes-that-mean-something"
          element={<ForHomesThatMeanSomething />}
        />
        <Route path="/more-info" element={<MoreInfo />} />
        <Route path="/generalinfo" element={<GeneralInfo />} />

        <Route path="/nervous-system" element={<NervousSystem />} />

        <Route path="/infinite-portal" element={<InfinitePortal />} />
        <Route path="/tv" element={<TVPage />} />
        <Route path="/minimalist" element={<HomeMeansSomething />} />
        <Route path="/designed-for-humans" element={<DesignedForHumans />} />
        <Route
          path="/your-life-played-back-gently"
          element={<YourLifePlayedBackGently />}
        />
        <Route path="/dasp-guide" element={<DASPGuide />} />
        <Route path="/dasp-business-guide" element={<DASPBusinessGuide />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsOfService />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dasp-guide" element={<DASPGuide />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/benefits" element={<AllBenefits />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route
          path="/a-message-for-our-visitors"
          element={<MessageForVisitors />}
        />
        <Route path="/core-reading" element={<CoreReading />} />

        <Route path="/minimalist" element={<MinimalistScreen />} />

        <Route path="/all-features" element={<AllFeatures />} />
        <Route path="/deckoviz-for-hotels" element={<DeckovizLanding />} />
        <Route
          path="/deckoviz-for-restaurants"
          element={<DeckovizRestaurantLanding />}
        />
        <Route
          path="/deckoviz-for-architects"
          element={<DeckovizArchitectsLanding />}
        />
        <Route
          path="/deckoviz-for-offices"
          element={<DeckovizOfficesLanding />}
        />
        <Route
          path="/deckoviz-for-realestate"
          element={<DeckovizForRealEstate />}
        />
        <Route
          path="/deckoviz-for-therapists"
          element={<DeckovizTherapistsLanding />}
        />
        <Route
          path="/deckoviz-for-schools"
          element={<DeckovizSchoolsLanding />}
        />
        <Route
          path="/deckoviz-for-retailstores"
          element={<DeckovizForRetail />}
        />
        <Route
          path="/deckoviz-for-enterprises"
          element={<DeckovizForEnterprise />}
        />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/support" element={<Support />} />

        <Route path="/Wall-Of-Love" element={<WallOfLove />} />
        <Route path="/Leaderboard" element={<Leaderboard />} />
        <Route path="/Transform-Walls" element={<TransformWalls />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/order-confirmed" element={<OrderConfirmed />} />
        <Route path="bulk-orders" element={<BulkOrder />} />
        <Route path="/bulk-confirm" element={<BulkConfirm />} />
        <Route path="/audiobook" element={<Audiobook />} />

        {/* ── Creative Studio Hub ── */}
        <Route path="/creative-studio" element={<CreativeStudio />} />
        <Route path="/tools/audiobook" element={<AudiobookTool />} />
        <Route path="/tools/visual-audiobook" element={<VisualAudiobookTool />} />
        <Route path="/tools/storybook" element={<StorybookTool />} />
        <Route path="/tools/short-story" element={<ShortStoryTool />} />
        <Route path="/tools/comic" element={<ComicTool />} />
        <Route path="/tools/life-book" element={<LifeBookTool />} />
        <Route path="/tools/visual-journal" element={<VisualJournalTool />} />
        <Route path="/tools/greeting-card" element={<GreetingCardTool />} />
        <Route path="/tools/song" element={<SongTool />} />
        <Route path="/tools/learning-book" element={<LearningBookTool />} />
        <Route path="/tools/learning-portal" element={<LearningPortalTool />} />
        <Route path="/tools/visual-book" element={<VisualBookTool />} />
        <Route path="/tools/storybook-studio" element={<StorybookStudioTool />} />
        <Route path="/tools/daily" element={<DailyInspirationTool />} />
        <Route path="/tools/music" element={<MusicTool />} />
        <Route path="/tools/postcard" element={<PostcardTool />} />
        <Route path="/wizzy" element={<WizzyPage />} />
        <Route path="/experimental-art-modes" element={<ExperimentalArtModes />} />
        
        {/* ── Developer Specs ── */}
        <Route path="/developer-specs/fluid-dreams" element={<FluidDreams />} />
        <Route path="/developer-specs/particle-galaxy" element={<ParticleGalaxy />} />
        <Route path="/developer-specs/audio-waves" element={<AudioWaves />} />
        <Route path="/developer-specs/living-paintings" element={<LivingPaintings />} />
        <Route path="/developer-specs/fractal-worlds" element={<FractalWorlds />} />
        <Route path="/developer-specs/physics-sandbox" element={<PhysicsSandbox />} />
        <Route path="/developer-specs/nature-systems" element={<NatureSystems />} />
        <Route path="/developer-specs/ai-dream-worlds" element={<AIDreamWorlds />} />
        <Route path="/developer-specs/typography-art" element={<TypographyArt />} />
        <Route path="/developer-specs/weather-simulations" element={<WeatherSimulations />} />
        <Route path="/developer-specs/zen-garden" element={<ZenGarden />} />
        <Route path="/developer-specs/motion-art" element={<MotionArt />} />
        <Route path="/developer-specs/data-as-art" element={<DataAsArt />} />
        <Route path="/developer-specs/memory-landscapes" element={<MemoryLandscapes />} />
        <Route path="/developer-specs/celestial-cosmos" element={<CelestialCosmos />} />
        <Route path="/developer-specs/material-simulations" element={<MaterialSimulations />} />
        <Route path="/developer-specs/dream-architecture" element={<DreamArchitecture />} />
        <Route path="/developer-specs/organism-sim" element={<OrganismSim />} />
        <Route path="/developer-specs/ambient-ritual" element={<AmbientRitual />} />
        <Route path="/developer-specs/symmetry-machine" element={<SymmetryMachine />} />
      </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
