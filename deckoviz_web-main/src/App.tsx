import React, { useEffect, useState } from "react";

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
import HotelExperienceJourney from "./components/deckovizForBusinesses/HotelExperienceJourney";
import DeckovizRestaurantLanding from "./components/deckovizForBusinesses/DeckovizForRestaurantsAndCafes";
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
import AILayerForHome from "./components/homepage/AILayerForHome";
import AllBenefits from "./components/homepage/AllBenefits";
import WhyDeckoviz from "./components/homepage/WhyDeckoviz";
import Support from "./components/Support";
import MoreInfo from "./components/MoreInfo";
import DASPGuide from "./components/homepage/DASPGuide";
import DASPHomesGuide from "./components/homepage/DASPHomesGuide";
import StartHere from "./components/homepage/StartHere";
import AlternateUseCasesGuide from "./components/homepage/AlternateUseCasesGuide";
import VizzyArtEngineGuide from "./components/homepage/VizzyArtEngineGuide";
import DeckovizManifesto from "./components/homepage/DeckovizManifesto";
import VizzyRearchitectingDoc from "./components/homepage/VizzyRearchitectingDoc";
import DASPBusinessGuide from "./components/deckovizForBusinesses/DASPBusinessGuide";
import PragmaticBuyerGuide from "./components/deckovizForBusinesses/PragmaticBuyerGuide";
import ToggleGallerySection from "./components/homepage/ToggleGallerySection";
import AILayerExpandedPage from "./components/homepage/AILayerExpandedPage";
import AILayerBusinessExpandedPage from "./components/homepage/AILayerBusinessExpandedPage";

import Audiobook from "./components/Audiobook";
import CreativeStudio from "./components/tools/CreativeStudio";
import ConversationalStudio from "./components/tools/ConversationalStudio";
import CreativeJournalTool from "./components/tools/CreativeJournalTool";
import AudiobookTool from "./components/tools/AudiobookTool";
import StorybookTool from "./components/tools/StorybookTool";
import MusicTool from "./components/tools/MusicTool";
import SoundscapesTool from "./components/tools/SoundscapesTool";
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
import GratitudeCardTool from "./components/tools/GratitudeCardTool";
import QuotePosterTool from "./components/tools/QuotePosterTool";
import WizzyPage from "./components/wizzy/WizzyPage";
import InfiniteWormhole from "./components/developerSpecs/InfiniteWormhole";
import AmbientClock from "./components/developerSpecs/AmbientClock";
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
import DeckovizStorytelling from "./components/developerSpecs/DeckovizStorytelling";
import NightlyRitual from "./components/developerSpecs/NightlyRitual";
import MorningArchitecture from "./components/developerSpecs/MorningArchitecture";
import StorySeed from "./components/developerSpecs/StorySeed";
import DeepFocusField from "./components/developerSpecs/DeepFocusField";
import CorrespondenceRoom from "./components/developerSpecs/CorrespondenceRoom";
import MythologyEngine from "./components/developerSpecs/MythologyEngine";
import MemoryPalaceBuilder from "./components/developerSpecs/MemoryPalaceBuilder";
import ParallelLives from "./components/developerSpecs/ParallelLives";
import UnsentLetterArchive from "./components/developerSpecs/UnsentLetterArchive";
import WorldBuildersTable from "./components/developerSpecs/WorldBuildersTable";
import EmotionalWeatherReport from "./components/developerSpecs/EmotionalWeatherReport";
import AncestorTable from "./components/developerSpecs/AncestorTable";
import ScenarioRoom from "./components/developerSpecs/ScenarioRoom";
import LastWords from "./components/developerSpecs/LastWords";
import TheThreshold from "./components/developerSpecs/TheThreshold";
import ThousandYearQuestion from "./components/developerSpecs/ThousandYearQuestion";
import CharacterWitness from "./components/developerSpecs/CharacterWitness";
import TheRehearsal from "./components/developerSpecs/TheRehearsal";
import PermissionSlip from "./components/developerSpecs/PermissionSlip";
import LivingManifesto from "./components/developerSpecs/LivingManifesto";
import DeathbedEditor from "./components/developerSpecs/DeathbedEditor";
import CartographyOfLonging from "./components/developerSpecs/CartographyOfLonging";
import TheInheritance from "./components/developerSpecs/TheInheritance";
import SlowNews from "./components/developerSpecs/SlowNews";
import CourageInventory from "./components/developerSpecs/CourageInventory";
import UnfinishedBusinessBureau from "./components/developerSpecs/UnfinishedBusinessBureau";
import TheSacredOrdinary from "./components/developerSpecs/TheSacredOrdinary";
import GratitudeArchaeologist from "./components/developerSpecs/GratitudeArchaeologist";
import HonestEulogy from "./components/developerSpecs/HonestEulogy";
import AvoidedConversation from "./components/developerSpecs/AvoidedConversation";
import TimeCapsuleStudio from "./components/developerSpecs/TimeCapsuleStudio";
import TheSecondDraft from "./components/developerSpecs/TheSecondDraft";
import TheLovingAdversary from "./components/developerSpecs/TheLovingAdversary";
import InnerCouncil from "./components/developerSpecs/InnerCouncil";
import TheLastGoodDay from "./components/developerSpecs/TheLastGoodDay";
import TheForgivenessLab from "./components/developerSpecs/TheForgivenessLab";
import FearCartographer from "./components/developerSpecs/FearCartographer";
import LettersToUnknownSelf from "./components/developerSpecs/LettersToUnknownSelf";
import RelationshipSeasons from "./components/developerSpecs/RelationshipSeasons";
import TheFinalFrame from "./components/developerSpecs/TheFinalFrame";
import ShadowPuppetry from "./components/developerSpecs/ShadowPuppetry";
import FieldPainter from "./components/developerSpecs/FieldPainter";
import LivingMaps from "./components/developerSpecs/LivingMaps";
import EmotionAlchemy from "./components/developerSpecs/EmotionAlchemy";
import TidalRooms from "./components/developerSpecs/TidalRooms";
import MicroscopeWorld from "./components/developerSpecs/MicroscopeWorld";
import ConstellationBuilder from "./components/developerSpecs/ConstellationBuilder";
import DecayBloom from "./components/developerSpecs/DecayBloom";
import CityPulse from "./components/developerSpecs/CityPulse";
import SignalInterception from "./components/developerSpecs/SignalInterception";
import MirrorPainter from "./components/developerSpecs/MirrorPainter";
import SoundArchaeology from "./components/developerSpecs/SoundArchaeology";
import ThoughtWeaver from "./components/developerSpecs/ThoughtWeaver";
import ExtinctColor from "./components/developerSpecs/ExtinctColor";
import ProteinFold from "./components/developerSpecs/ProteinFold";
import DreamLogic from "./components/developerSpecs/DreamArchitecture";
import BioluminescentAbyss from "./components/developerSpecs/BioluminescentAbyss";
import LanguageMemorial from "./components/developerSpecs/LanguageMemorial";
import FermentingWorld from "./components/developerSpecs/FermentingWorld";
import LastLight from "./components/developerSpecs/LastLight";
import SolarWindPainter from "./components/developerSpecs/SolarWindPainter";
import NeuralFirestorm from "./components/developerSpecs/NeuralFirestorm";
import GriefCartographer from "./components/developerSpecs/GriefCartographer";
import SymmetryCrystals from "./components/developerSpecs/SymmetryCrystals";
import AncientTradeRoutes from "./components/developerSpecs/AncientTradeRoutes";
import SynesthesiaEngine from "./components/developerSpecs/SynesthesiaEngine";
import MurmurationEngine from "./components/developerSpecs/MurmurationEngine";
import SeismicMemory from "./components/developerSpecs/SeismicMemory";
import DreamTaxonomy from "./components/developerSpecs/DreamTaxonomy";
import CosmicBackground from "./components/developerSpecs/CosmicBackground";
import HumanConnectivity from "./components/developerSpecs/HumanConnectivity";
import QuantumFoam from "./components/developerSpecs/QuantumFoam";
import OralHistoryFire from "./components/developerSpecs/OralHistoryFire";
import SlimeMould from "./components/developerSpecs/SlimeMould";
import SkyChronometer from "./components/developerSpecs/SkyChronometer";
import ArgumentSculptor from "./components/developerSpecs/ArgumentSculptor";
import ExoplanetWeather from "./components/developerSpecs/ExoplanetWeather";
import InternetHeartbeat from "./components/developerSpecs/InternetHeartbeat";
import HapticMemory from "./components/developerSpecs/HapticMemory";
import SilenceArchitecture from "./components/developerSpecs/SilenceArchitecture";
import MusicResponsiveArt from "./components/developerSpecs/MusicResponsiveArt";
import AgenticShapeVortex from "./components/developerSpecs/AgenticShapeVortex";
import CreateWorld from "./pages/CreateWorld";
import MasterSuiteOfFeatures from "./pages/MasterSuiteOfFeatures";
import VisualBookCompanion from "./components/tools/VisualBookCompanion";
import FlagshipGamesPage from "./components/flagshipGames/FlagshipGamesPage";
import StoryForgeApp from "./components/flagshipGames/storyForge/StoryForgeApp";
import PaletteWarsApp from "./components/flagshipGames/paletteWars/PaletteWarsApp";
import DreamArchitectApp from "./components/flagshipGames/dreamArchitect/DreamArchitectApp";
import MuseumOfUsApp from "./components/flagshipGames/museumOfUs/MuseumOfUsApp";
import VerdictApp from "./components/flagshipGames/vizzysVerdict/VerdictApp";
import OneWordApp from "./components/flagshipGames/oneWord/OneWordApp";
import FrameApp from "./components/flagshipGames/worldInFrame/FrameApp";
import InheritanceApp from "./components/flagshipGames/inheritance/InheritanceApp";
import DebatingSocietyApp from "./components/flagshipGames/debatingSociety/DebatingSocietyApp";
import CartographersApp from "./components/flagshipGames/cartographers/CartographersApp";
import BrilliantMindsApp from "./components/flagshipGames/brilliantMinds/BrilliantMindsApp";
import OracleApp from "./components/flagshipGames/oracle/OracleApp";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import AuthModal from "./components/auth/AuthModal";
import VizzyChat from "./components/VizzyChat";
import { VizzyChat as VizzyCreationCanvas } from "./components/vizzyCanvas/vizzy-chat";
import VizzyLibrary from "./components/vizzyCanvas/vizzy-library";
import VizzyProfilePage from "./components/vizzyCanvas/profile-page";
import VizzySubscriptionPage from "./components/vizzyCanvas/subscription-page";
import { CanvasErrorBoundary } from "./components/vizzyCanvas/error-boundary";
import ElinityLanding from "./components/elinity/ElinityLanding";
import ElinityAboutUs from "./components/elinity/ElinityAboutUs";
import ElinityEllaris from "./components/elinity/ElinityEllaris";
import ElinityContact from "./components/elinity/ElinityContact";
import ElinityJoinUs from "./components/elinity/ElinityJoinUs";
import DailyCuratorPage from "./components/dailyCurator/DailyCuratorPage";
import AdminDailyCuratorPage from "./components/dailyCurator/AdminDailyCuratorPage";
import ElinityDeckovizGuide from "./components/homepage/ElinityDeckovizGuide";
import VizzyFunZone from "./pages/VizzyFunZone";
import DeckovizWebapp from "./components/webapp/DeckovizWebapp";
import EnterpriseWebapp from "./components/enterpriseWebapp/EnterpriseWebapp";

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
  const isCanvasPage = [
    "/vizzy-canvas",
    "/gallery",
    "/profile",
    "/subscription",
    "/wizzy",
    "/elinity",
    "/elinity/about",
    "/elinity/ellaris",
    "/elinity/contact",
    "/elinity/join-us",
    "/webapp",
  ].includes(location.pathname) || location.pathname.startsWith("/enterprise-webapp");

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && !isCanvasPage && <LoadingAnimation key="loading" />}
      </AnimatePresence>

      <ScrollToTop />
      <AuthModal />
      <ScrollToSectionOnHome />
      {!isDeveloperTool && !isCanvasPage && <MouseSparkles />}

      {!isCanvasPage && <Navbar />}
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
                <AILayerForHome />
                <WhyDeckoviz />
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
          <Route path="/dasp-homes-guide" element={<DASPHomesGuide />} />
          <Route path="/alternate-use-cases" element={<AlternateUseCasesGuide />} />
          <Route path="/vizzy-art-engine" element={<VizzyArtEngineGuide />} />
          <Route path="/ai-layer-for-home" element={<AILayerExpandedPage />} />
          <Route path="/ai-layer-for-business" element={<AILayerBusinessExpandedPage />} />
          <Route path="/deckoviz-manifesto" element={<DeckovizManifesto />} />
          <Route path="/rearchitecting-hell" element={<VizzyRearchitectingDoc />} />
          <Route path="/dasp-business-guide" element={<DASPBusinessGuide />} />
          <Route path="/pragmatic-buyer-guide" element={<PragmaticBuyerGuide />} />
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
          <Route path="/deckoviz-for-hotels" element={<HotelExperienceJourney />} />
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
          <Route path="/conversational-studio" element={<ProtectedRoute><ConversationalStudio /></ProtectedRoute>} />
          <Route path="/creative-journal" element={<ProtectedRoute><CreativeJournalTool /></ProtectedRoute>} />
          <Route path="/tools/audiobook" element={<AudiobookTool />} />
          <Route path="/tools/visual-audiobook" element={<ProtectedRoute><VisualAudiobookTool /></ProtectedRoute>} />
          <Route path="/tools/storybook" element={<ProtectedRoute><StorybookTool /></ProtectedRoute>} />
          <Route path="/tools/short-story" element={<ProtectedRoute><ShortStoryTool /></ProtectedRoute>} />
          <Route path="/tools/comic" element={<ProtectedRoute><ComicTool /></ProtectedRoute>} />
          <Route path="/tools/life-book" element={<ProtectedRoute><LifeBookTool /></ProtectedRoute>} />
          <Route path="/tools/visual-journal" element={<ProtectedRoute><VisualJournalTool /></ProtectedRoute>} />
          <Route path="/tools/greeting-card" element={<ProtectedRoute><GreetingCardTool /></ProtectedRoute>} />
          <Route path="/tools/song" element={<ProtectedRoute><SongTool /></ProtectedRoute>} />
          <Route path="/tools/learning-book" element={<ProtectedRoute><LearningBookTool /></ProtectedRoute>} />
          <Route path="/tools/learning-portal" element={<ProtectedRoute><LearningPortalTool /></ProtectedRoute>} />
          <Route path="/tools/visual-book" element={<ProtectedRoute><VisualBookTool /></ProtectedRoute>} />
          <Route path="/tools/storybook-studio" element={<ProtectedRoute><StorybookStudioTool /></ProtectedRoute>} />
          <Route path="/tools/daily" element={<ProtectedRoute><DailyInspirationTool /></ProtectedRoute>} />
          <Route path="/tools/music" element={<ProtectedRoute><MusicTool /></ProtectedRoute>} />
          <Route path="/tools/soundscapes" element={<SoundscapesTool />} />
          <Route path="/soundscapes" element={<SoundscapesTool />} />
          <Route path="/tools/postcard" element={<PostcardTool />} />
          <Route path="/tools/gratitude-card" element={<ProtectedRoute><GratitudeCardTool /></ProtectedRoute>} />
          <Route path="/tools/quote-poster" element={<ProtectedRoute><QuotePosterTool /></ProtectedRoute>} />
          <Route path="/wizzy" element={<ProtectedRoute><WizzyPage /></ProtectedRoute>} />
          <Route path="/vizzy-canvas" element={<ProtectedRoute><CanvasErrorBoundary><VizzyCreationCanvas /></CanvasErrorBoundary></ProtectedRoute>} />
          <Route path="/gallery" element={<ProtectedRoute><VizzyLibrary /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><VizzyProfilePage /></ProtectedRoute>} />
          <Route path="/subscription" element={<ProtectedRoute><VizzySubscriptionPage /></ProtectedRoute>} />
          <Route path="/experimental-art-modes" element={<ExperimentalArtModes />} />
          <Route path="/deckoviz-storytelling" element={<DeckovizStorytelling />} />
          <Route path="/deckoviz-storytelling/nightly-ritual" element={<NightlyRitual />} />
          <Route path="/deckoviz-storytelling/morning-architecture" element={<MorningArchitecture />} />
          <Route path="/deckoviz-storytelling/story-seed" element={<StorySeed />} />
          <Route path="/deckoviz-storytelling/deep-focus-field" element={<DeepFocusField />} />
          <Route path="/deckoviz-storytelling/correspondence-room" element={<CorrespondenceRoom />} />
          <Route path="/deckoviz-storytelling/mythology-engine" element={<MythologyEngine />} />
          <Route path="/deckoviz-storytelling/memory-palace-builder" element={<MemoryPalaceBuilder />} />
          <Route path="/deckoviz-storytelling/parallel-lives" element={<ParallelLives />} />
          <Route path="/deckoviz-storytelling/unsent-letter-archive" element={<UnsentLetterArchive />} />
          <Route path="/deckoviz-storytelling/world-builders-table" element={<WorldBuildersTable />} />
          <Route path="/deckoviz-storytelling/emotional-weather-report" element={<EmotionalWeatherReport />} />
          <Route path="/deckoviz-storytelling/ancestor-table" element={<AncestorTable />} />
          <Route path="/deckoviz-storytelling/scenario-room" element={<ScenarioRoom />} />
          <Route path="/deckoviz-storytelling/last-words" element={<LastWords />} />
          <Route path="/deckoviz-storytelling/the-threshold" element={<TheThreshold />} />
          <Route path="/deckoviz-storytelling/thousand-year-question" element={<ThousandYearQuestion />} />
          <Route path="/deckoviz-storytelling/character-witness" element={<CharacterWitness />} />
          <Route path="/deckoviz-storytelling/the-rehearsal" element={<TheRehearsal />} />
          <Route path="/deckoviz-storytelling/permission-slip" element={<PermissionSlip />} />
          <Route path="/deckoviz-storytelling/living-manifesto" element={<LivingManifesto />} />
          <Route path="/deckoviz-storytelling/deathbed-editor" element={<DeathbedEditor />} />
          <Route path="/deckoviz-storytelling/cartography-of-longing" element={<CartographyOfLonging />} />
          <Route path="/deckoviz-storytelling/the-inheritance" element={<TheInheritance />} />
          <Route path="/deckoviz-storytelling/slow-news" element={<SlowNews />} />
          <Route path="/deckoviz-storytelling/courage-inventory" element={<CourageInventory />} />
          <Route path="/deckoviz-storytelling/unfinished-business-bureau" element={<UnfinishedBusinessBureau />} />
          <Route path="/deckoviz-storytelling/the-sacred-ordinary" element={<TheSacredOrdinary />} />
          <Route path="/deckoviz-storytelling/gratitude-archaeologist" element={<GratitudeArchaeologist />} />
          <Route path="/deckoviz-storytelling/honest-eulogy" element={<HonestEulogy />} />
          <Route path="/deckoviz-storytelling/avoided-conversation" element={<AvoidedConversation />} />
          <Route path="/deckoviz-storytelling/time-capsule-studio" element={<TimeCapsuleStudio />} />
          <Route path="/deckoviz-storytelling/the-second-draft" element={<TheSecondDraft />} />
          <Route path="/deckoviz-storytelling/loving-adversary" element={<TheLovingAdversary />} />
          <Route path="/deckoviz-storytelling/inner-council" element={<InnerCouncil />} />
          <Route path="/deckoviz-storytelling/last-good-day" element={<TheLastGoodDay />} />
          <Route path="/deckoviz-storytelling/forgiveness-lab" element={<TheForgivenessLab />} />
          <Route path="/deckoviz-storytelling/fear-cartographer" element={<FearCartographer />} />
          <Route path="/deckoviz-storytelling/letters-to-unknown-self" element={<LettersToUnknownSelf />} />
          <Route path="/deckoviz-storytelling/relationship-seasons" element={<RelationshipSeasons />} />
          <Route path="/deckoviz-storytelling/final-frame" element={<TheFinalFrame />} />

          {/* ── Developer Specs ── */}
          <Route path="/developer-specs/ambient-clock" element={<AmbientClock />} />
          <Route path="/developer-specs/infinite-wormhole" element={<InfiniteWormhole />} />
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
          <Route path="/developer-specs/shadow-puppetry" element={<ShadowPuppetry />} />
          <Route path="/developer-specs/field-painter" element={<FieldPainter />} />
          <Route path="/developer-specs/living-maps" element={<LivingMaps />} />
          <Route path="/developer-specs/emotion-alchemy" element={<EmotionAlchemy />} />
          <Route path="/developer-specs/tidal-rooms" element={<TidalRooms />} />
          <Route path="/developer-specs/microscope-world" element={<MicroscopeWorld />} />
          <Route path="/developer-specs/constellation-builder" element={<ConstellationBuilder />} />
          <Route path="/developer-specs/decay-bloom" element={<DecayBloom />} />
          <Route path="/developer-specs/city-pulse" element={<CityPulse />} />
          <Route path="/developer-specs/signal-interception" element={<SignalInterception />} />
          <Route path="/developer-specs/mirror-painter" element={<MirrorPainter />} />
          <Route path="/developer-specs/sound-archaeology" element={<SoundArchaeology />} />
          <Route path="/developer-specs/thought-weaver" element={<ThoughtWeaver />} />
          <Route path="/developer-specs/extinct-color" element={<ExtinctColor />} />
          <Route path="/developer-specs/protein-fold" element={<ProteinFold />} />
          <Route path="/developer-specs/dream-logic" element={<DreamLogic />} />
          <Route path="/developer-specs/bioluminescent-abyss" element={<BioluminescentAbyss />} />
          <Route path="/developer-specs/language-memorial" element={<LanguageMemorial />} />
          <Route path="/developer-specs/fermenting-world" element={<FermentingWorld />} />
          <Route path="/developer-specs/last-light" element={<LastLight />} />
          <Route path="/developer-specs/solar-wind-painter" element={<SolarWindPainter />} />
          <Route path="/developer-specs/neural-firestorm" element={<NeuralFirestorm />} />
          <Route path="/developer-specs/grief-cartographer" element={<GriefCartographer />} />
          <Route path="/developer-specs/symmetry-crystals" element={<SymmetryCrystals />} />
          <Route path="/developer-specs/trade-atlas" element={<AncientTradeRoutes />} />
          <Route path="/developer-specs/synesthesia-engine" element={<SynesthesiaEngine />} />
          <Route path="/developer-specs/murmuration-engine" element={<MurmurationEngine />} />
          <Route path="/developer-specs/seismic-memory" element={<SeismicMemory />} />
          <Route path="/developer-specs/dream-taxonomy" element={<DreamTaxonomy />} />
          <Route path="/developer-specs/cosmic-background" element={<CosmicBackground />} />
          <Route path="/developer-specs/human-connectivity" element={<HumanConnectivity />} />
          <Route path="/developer-specs/quantum-foam" element={<QuantumFoam />} />
          <Route path="/developer-specs/oral-history-fire" element={<OralHistoryFire />} />
          <Route path="/developer-specs/slime-mould" element={<SlimeMould />} />
          <Route path="/developer-specs/sky-chronometer" element={<SkyChronometer />} />
          <Route path="/developer-specs/argument-sculptor" element={<ArgumentSculptor />} />
          <Route path="/developer-specs/exoplanet-weather" element={<ExoplanetWeather />} />
          <Route path="/developer-specs/internet-heartbeat" element={<InternetHeartbeat />} />
          <Route path="/developer-specs/haptic-memory" element={<HapticMemory />} />
          <Route path="/developer-specs/silence-architecture" element={<SilenceArchitecture />} />
          <Route path="/developer-specs/music-responsive-art" element={<MusicResponsiveArt />} />
          <Route path="/developer-specs/agentic-shape-vortex" element={<AgenticShapeVortex />} />
          <Route path="/tools/visual-book-companion" element={<ProtectedRoute><VisualBookCompanion /></ProtectedRoute>} />
          <Route path="/create-world" element={<CreateWorld />} />
          <Route path="/master-suite" element={<MasterSuiteOfFeatures />} />
          <Route path="/vizzy-fun-zone" element={<VizzyFunZone />} />
          <Route path="/elinity" element={<ElinityLanding />} />
          <Route path="/elinity/about" element={<ElinityAboutUs />} />
          <Route path="/elinity/ellaris" element={<ElinityEllaris />} />
          <Route path="/elinity/contact" element={<ElinityContact />} />
          <Route path="/elinity/join-us" element={<ElinityJoinUs />} />
          <Route path="/webapp" element={<DeckovizWebapp />} />
          <Route path="/enterprise-webapp/*" element={<EnterpriseWebapp />} />

          {/* ── Flagship Games ── */}
          <Route path="/flagship-games" element={<FlagshipGamesPage />} />
          <Route path="/flagship-games/story-forge/*" element={<StoryForgeApp />} />
          <Route path="/flagship-games/palette-wars/*" element={<PaletteWarsApp />} />
          <Route path="/flagship-games/dream-architect/*" element={<DreamArchitectApp />} />
          <Route path="/flagship-games/museum-of-us/*" element={<MuseumOfUsApp />} />
          <Route path="/flagship-games/vizzys-verdict/*" element={<VerdictApp />} />
          <Route path="/flagship-games/one-word/*" element={<OneWordApp />} />
          <Route path="/flagship-games/world-in-frame/*" element={<FrameApp />} />
          <Route path="/flagship-games/inheritance/*" element={<InheritanceApp />} />
          <Route path="/flagship-games/debating-society/*" element={<DebatingSocietyApp />} />
          <Route path="/flagship-games/cartographers/*" element={<CartographersApp />} />
          <Route path="/flagship-games/brilliant-minds/*" element={<BrilliantMindsApp />} />
          <Route path="/flagship-games/oracle/*" element={<OracleApp />} />

          {/* Daily Curator + Music Curation */}
          <Route path="/daily-curator" element={<ProtectedRoute><DailyCuratorPage /></ProtectedRoute>} />
          <Route path="/admin/daily-curator" element={<ProtectedRoute><AdminDailyCuratorPage /></ProtectedRoute>} />
          <Route path="/elinity-deckoviz-guide" element={<ElinityDeckovizGuide />} />
        </Routes>
      </main>
      {!isDeveloperTool && !isCanvasPage && <Footer />}
      {!isCanvasPage && <VizzyChat />}
    </>
  );
};

export default App;
