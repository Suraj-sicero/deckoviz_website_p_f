import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Paintbrush2,
  Image as ImageIcon,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const artworkFilenames = [
  "ChatGPT Image Aug 2, 2026, 02_49_49 AM.png",
  "ChatGPT Image Aug 2, 2026, 02_49_57 AM.png",
  "ChatGPT Image Aug 2, 2026, 02_50_03 AM.png",
  "ChatGPT Image Aug 2, 2026, 02_51_06 AM.png",
  "ChatGPT Image Aug 25, 2026, 10_05_37 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_12_27 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_15_03 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_15_34 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_29_49 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_33_13 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_35_21 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_36_39 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_38_04 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_38_46 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_38_55 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_39_06 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_40_55 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_40_58 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_44_13 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_46_20 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_46_22 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_46_30 PM (1).png",
  "ChatGPT Image Aug 25, 2026, 10_46_30 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_46_33 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_46_44 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_49_39 PM.png",
  "ChatGPT Image Aug 26, 2026, 02_30_03 AM.png",
  "ChatGPT Image Aug 26, 2026, 02_30_57 AM.png",
  "ChatGPT Image Aug 26, 2026, 02_31_54 AM (1).png",
  "ChatGPT Image Aug 26, 2026, 02_31_54 AM.png",
  "ChatGPT Image Aug 26, 2026, 02_33_28 AM.png",
  "ChatGPT Image Aug 26, 2026, 02_33_34 AM.png",
  "ChatGPT Image Aug 26, 2026, 02_35_11 AM.png",
  "ChatGPT Image Aug 26, 2026, 02_35_31 AM.png",
  "ChatGPT Image Aug 26, 2026, 02_56_19 AM.png",
  "ChatGPT Image Aug 26, 2026, 02_57_32 AM.png",
  "ChatGPT Image Aug 26, 2026, 02_57_46 AM.png",
  "ChatGPT Image Aug 5, 2026, 10_33_04 PM.png",
  "ChatGPT Image Aug 5, 2026, 10_33_15 PM.png",
  "ChatGPT Image Aug 5, 2026, 10_37_05 PM.png",
  "ChatGPT Image Aug 5, 2026, 10_42_46 PM.png",
  "ChatGPT Image Aug 5, 2026, 10_42_50 PM.png",
  "ChatGPT Image Aug 5, 2026, 10_44_10 PM.png",
  "ChatGPT Image Aug 5, 2026, 10_47_38 PM.png",
  "ChatGPT Image Aug 5, 2026, 10_47_42 PM.png",
  "ChatGPT Image Aug 5, 2026, 10_49_25 PM.png",
  "ChatGPT Image Aug 5, 2026, 10_49_30 PM.png",
  "ChatGPT Image Aug 6, 2026, 01_07_09 AM.png",
  "ChatGPT Image Aug 6, 2026, 01_07_12 AM.png",
  "ChatGPT Image Aug 6, 2026, 01_07_18 AM.png",
  "ChatGPT Image Aug 6, 2026, 01_07_29 AM.png",
  "ChatGPT Image Aug 6, 2026, 12_38_43 AM.png",
  "ChatGPT Image Aug 6, 2026, 12_45_56 AM.png",
  "ChatGPT Image Aug 6, 2026, 12_54_36 AM.png",
  "ChatGPT Image Jul 26, 2026, 09_48_41 PM.png",
  "ChatGPT Image Jul 26, 2026, 09_49_12 PM.png",
  "ChatGPT Image Jul 26, 2026, 09_54_59 PM.png",
  "ChatGPT Image Jul 26, 2026, 09_59_48 PM.png",
  "ChatGPT Image Jul 26, 2026, 10_00_36 PM.png",
  "ChatGPT Image Jul 26, 2026, 10_03_08 PM.png",
  "ChatGPT Image Jul 26, 2026, 10_05_12 PM.png",
  "ChatGPT Image Jul 26, 2026, 10_05_35 PM.png",
  "ChatGPT Image Jul 26, 2026, 10_11_45 PM.png",
  "ChatGPT Image Jul 26, 2026, 10_13_04 PM.png",
  "ChatGPT Image Jul 26, 2026, 10_18_32 PM.png",
  "ChatGPT Image Jul 26, 2026, 10_18_54 PM.png",
  "ChatGPT Image Jul 26, 2026, 10_47_28 PM.png",
  "ChatGPT Image Jul 27, 2026, 08_39_20 PM.png",
  "ChatGPT Image Jul 27, 2026, 08_41_46 PM.png",
];

const posterFilenames = [
  "ChatGPT Image Aug 2, 2026, 01_25_16 AM.png",
  "ChatGPT Image Aug 2, 2026, 01_25_36 AM.png",
  "ChatGPT Image Aug 2, 2026, 01_36_10 AM.png",
  "ChatGPT Image Aug 2, 2026, 01_36_18 AM.png",
  "ChatGPT Image Aug 2, 2026, 01_36_30 AM (1).png",
  "ChatGPT Image Aug 2, 2026, 01_36_30 AM.png",
  "ChatGPT Image Aug 2, 2026, 01_36_54 AM.png",
  "ChatGPT Image Aug 2, 2026, 01_37_02 AM (1).png",
  "ChatGPT Image Aug 2, 2026, 01_37_02 AM.png",
  "ChatGPT Image Aug 2, 2026, 01_37_37 AM (1).png",
  "ChatGPT Image Aug 2, 2026, 01_37_37 AM.png",
  "ChatGPT Image Aug 2, 2026, 01_37_47 AM (1).png",
  "ChatGPT Image Aug 2, 2026, 01_37_47 AM.png",
  "ChatGPT Image Aug 2, 2026, 01_40_07 AM.png",
  "ChatGPT Image Aug 2, 2026, 01_42_23 AM.png",
  "ChatGPT Image Aug 2, 2026, 01_42_37 AM.png",
  "ChatGPT Image Aug 2, 2026, 01_47_57 AM.png",
  "ChatGPT Image Aug 2, 2026, 01_50_47 AM (1).png",
  "ChatGPT Image Aug 2, 2026, 01_50_47 AM.png",
  "ChatGPT Image Aug 2, 2026, 01_52_00 AM.png",
  "ChatGPT Image Aug 2, 2026, 01_52_08 AM.png",
  "ChatGPT Image Aug 2, 2026, 01_52_30 AM.png",
  "ChatGPT Image Aug 2, 2026, 01_54_45 AM.png",
  "ChatGPT Image Aug 25, 2026, 10_08_34 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_25_00 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_25_17 PM.png",
  "ChatGPT Image Aug 25, 2026, 10_45_31 PM.png",
  "ChatGPT Image Aug 26, 2026, 02_47_40 AM.png",
  "ChatGPT Image Aug 26, 2026, 02_56_05 AM.png",
  "ChatGPT Image Aug 26, 2026, 02_58_34 AM.png",
  "ChatGPT Image Aug 26, 2026, 02_58_38 AM.png",
  "ChatGPT Image Aug 26, 2026, 02_59_05 AM.png",
  "ChatGPT Image Aug 26, 2026, 02_59_15 AM.png",
  "ChatGPT Image Aug 6, 2026, 12_30_31 AM.png",
  "ChatGPT Image Aug 6, 2026, 12_32_34 AM.png",
  "ChatGPT Image Aug 6, 2026, 12_32_53 AM.png",
  "ChatGPT Image Aug 6, 2026, 12_32_57 AM.png",
  "ChatGPT Image Aug 6, 2026, 12_33_04 AM.png",
  "ChatGPT Image Aug 6, 2026, 12_33_38 AM.png",
  "ChatGPT Image Aug 6, 2026, 12_33_55 AM.png",
  "ChatGPT Image Aug 6, 2026, 12_33_58 AM.png",
  "ChatGPT Image Aug 6, 2026, 12_34_10 AM.png",
  "ChatGPT Image Aug 6, 2026, 12_34_40 AM.png",
  "ChatGPT Image Aug 6, 2026, 12_34_52 AM.png",
  "ChatGPT Image Feb 24, 2026, 04_26_50 PM.png",
  "ChatGPT Image Feb 24, 2026, 04_39_16 PM.png",
  "ChatGPT Image Feb 24, 2026, 04_53_49 PM.png",
  "ChatGPT Image Feb 24, 2026, 04_53_56 PM.png",
  "ChatGPT Image Feb 24, 2026, 04_54_01 PM.png",
  "ChatGPT Image Feb 24, 2026, 04_55_10 PM.png",
  "ChatGPT Image Feb 24, 2026, 04_56_00 PM.png",
  "ChatGPT Image Feb 24, 2026, 06_02_14 PM.png",
  "ChatGPT Image Feb 24, 2026, 06_02_21 PM.png",
  "ChatGPT Image Jul 27, 2026, 08_48_17 PM.png",
  "ChatGPT Image Jul 27, 2026, 08_48_21 PM.png",
  "ChatGPT Image Jul 27, 2026, 08_50_16 PM.png",
  "ChatGPT Image Jul 27, 2026, 08_50_49 PM.png",
  "ChatGPT Image Jul 27, 2026, 09_06_18 PM.png",
  "ChatGPT Image Jul 27, 2026, 09_06_25 PM.png",
  "ChatGPT Image Jul 27, 2026, 09_09_28 PM.png",
  "ChatGPT Image Jul 27, 2026, 09_09_42 PM.png",
  "ChatGPT Image Jul 27, 2026, 09_10_26 PM.png",
  "ChatGPT Image Jul 27, 2026, 09_11_01 PM.png",
];

// encodeURI ensures proper URL paths without breaking commas & parens in filenames
const artworkImages = artworkFilenames.map(
  (name) => encodeURI(`/images/favourite_artworks/${name}`)
);

const posterImages = posterFilenames.map(
  (name) => encodeURI(`/images/Favourite_posters/${name}`)
);

const photoFilenames = [
  "WhatsApp Image 2026-08-29 at 5.20.28 PM (1).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.28 PM (10).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.28 PM (11).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.28 PM (12).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.28 PM (2).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.28 PM (3).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.28 PM (4).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.28 PM (5).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.28 PM (6).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.28 PM (7).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.28 PM (8).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.28 PM (9).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.28 PM.jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.29 PM (1).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.29 PM (10).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.29 PM (11).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.29 PM (12).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.29 PM (2).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.29 PM (3).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.29 PM (4).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.29 PM (5).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.29 PM (6).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.29 PM (7).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.29 PM (8).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.29 PM (9).jpeg",
  "WhatsApp Image 2026-08-29 at 5.20.29 PM.jpeg",
];

const photoImages = photoFilenames.map(
  (name) => encodeURI(`/images/favourite_photo/${name}`)
);

// Instagram-style protection wrapper component to block downloads, context menus, and drags
interface ProtectedImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  objectFit?: "cover" | "contain";
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const ProtectedImage: React.FC<ProtectedImageProps> = ({
  src,
  alt,
  className = "",
  imgClassName = "",
  objectFit = "cover",
  onError,
}) => {
  return (
    <div
      className={`relative select-none ${objectFit === "contain" ? "max-w-full max-h-full flex items-center justify-center overflow-hidden" : ""} ${className}`}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={{
        WebkitUserSelect: "none",
        userSelect: "none",
        WebkitTouchCallout: "none",
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        onError={onError}
        className={`pointer-events-none select-none ${
          objectFit === "contain"
            ? "object-contain max-w-full max-h-full w-auto h-auto"
            : "object-cover w-full h-full"
        } ${imgClassName}`}
        style={{
          WebkitUserSelect: "none",
          userSelect: "none",
          WebkitTouchCallout: "none",
        }}
      />
      {/* Instagram-style transparent protection overlay */}
      <div
        className="absolute inset-0 z-10 bg-transparent select-none"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      />
    </div>
  );
};

interface GalleryCardData {
  id: string;
  badge: string;
  badgeIcon: React.ReactNode;
  title: string;
  subtitle: string;
  images: string[];
  imageAlt: string;
  link: string;
}

const galleryCards: GalleryCardData[] = [
  {
    id: "artworks",
    badge: "ARTWORK",
    badgeIcon: <Paintbrush2 size={14} />,
    title: "Favourite Artworks",
    subtitle: "Some of our",
    images: artworkImages,
    imageAlt: "Artwork gallery showcase",
    link: "#artworks",
  },
  {
    id: "posters",
    badge: "POSTERS",
    badgeIcon: <ImageIcon size={14} />,
    title: "Favourite Posters",
    subtitle: "Some of our",
    images: posterImages,
    imageAlt: "Posters gallery showcase",
    link: "#posters",
  },
  {
    id: "photos",
    badge: "PHOTOS",
    badgeIcon: <Camera size={14} />,
    title: "Favourite Photos",
    subtitle: "Some of our",
    images: photoImages,
    imageAlt: "Photos gallery showcase",
    link: "#photos",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

interface CardComponentProps {
  card: GalleryCardData;
  onOpenGallery: (card: GalleryCardData) => void;
}

const GalleryCardItem: React.FC<CardComponentProps> = ({ card, onOpenGallery }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!card.images || card.images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % card.images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [card.images]);

  // Preload upcoming cover images
  useEffect(() => {
    if (!card.images || card.images.length === 0) return;
    const nextIndex1 = (currentIndex + 1) % card.images.length;
    const nextIndex2 = (currentIndex + 2) % card.images.length;
    const img1 = new window.Image();
    img1.src = card.images[nextIndex1];
    const img2 = new window.Image();
    img2.src = card.images[nextIndex2];
  }, [currentIndex, card.images]);

  const currentImageSrc = card.images[currentIndex] || card.images[0];

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onClick={() => onOpenGallery(card)}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      className="group relative rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between select-none"
      style={{
        background: "rgba(255,255,255,0.78)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.9)",
        boxShadow:
          "0 8px 32px rgba(24,42,74,0.10), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 20px 48px rgba(24,42,74,0.22), 0 4px 16px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,1)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 8px 32px rgba(24,42,74,0.10), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)")
      }
    >
      {/* Image container area */}
      <div className="relative h-56 overflow-hidden bg-gray-900/10">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentImageSrc}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <ProtectedImage
              src={currentImageSrc}
              alt={card.imageAlt}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/images/h1.png";
              }}
              className="w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none z-[1]" />

        {/* Badge pill */}
        <div
          className="absolute top-4 left-4 z-[2] flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: "#182a4a",
            boxShadow: "0 2px 10px rgba(0,0,0,0.10)",
            letterSpacing: "0.05em",
          }}
        >
          <span style={{ color: "#182a4a" }}>{card.badgeIcon}</span>
          {card.badge}
        </div>

        {/* Protected badge + Rotation indicator */}
        <div className="absolute top-4 right-4 z-[2] flex items-center gap-2">
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold"
            style={{
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(8px)",
              color: "rgba(255,255,255,0.9)",
            }}
            title="Protected Artwork"
          >
            <ShieldCheck size={11} className="text-emerald-400" />
            <span className="text-[9px] uppercase tracking-wider text-emerald-300">Protected</span>
          </div>

          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
            style={{
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(8px)",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b5f99] animate-pulse" />
            {currentIndex + 1} / {card.images.length}
          </div>
        </div>

        {/* Quick Click Hint Overlay */}
        <div className="absolute inset-0 z-[2] opacity-0 group-hover:opacity-100 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="px-4 py-2 rounded-full bg-white/95 text-[#182a4a] text-xs font-semibold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Maximize2 size={13} style={{ color: "#182a4a" }} /> View Gallery ({card.images.length} items)
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs text-gray-400 mb-0.5">{card.subtitle}</p>
          <h3
            className="text-lg font-bold text-[#182a4a] mb-2 leading-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            {card.title}
          </h3>
          <span
            className="text-sm font-semibold hover:underline flex items-center gap-1"
            style={{ color: "#182a4a" }}
          >
            Explore collection ({card.images.length})
          </span>
        </div>

        {/* Arrow button */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#182a4a] group-hover:text-white"
          style={{
            background: "rgba(24,42,74,0.08)",
            color: "#182a4a",
          }}
        >
          <ArrowRight size={16} />
        </div>
      </div>
    </motion.div>
  );
};

// Full Interactive Gallery Modal component
interface GalleryModalProps {
  initialCard: GalleryCardData;
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ initialCard, onClose }) => {
  const [activeTabId, setActiveTabId] = useState<string>(initialCard.id);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeCard = galleryCards.find((c) => c.id === activeTabId) || initialCard;

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null
        ? prev > 0
          ? prev - 1
          : activeCard.images.length - 1
        : 0
    );
  }, [lightboxIndex, activeCard.images.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null
        ? prev < activeCard.images.length - 1
          ? prev + 1
          : 0
        : 0
    );
  }, [lightboxIndex, activeCard.images.length]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") setLightboxIndex(null);
        else if (e.key === "ArrowLeft") handlePrev();
        else if (e.key === "ArrowRight") handleNext();
      } else {
        if (e.key === "Escape") onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handlePrev, handleNext, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex flex-col bg-[#070b14] text-white overflow-hidden selection:bg-[#182a4a] selection:text-white"
    >
      {/* Background ambient lighting blurs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#182a4a]/40 blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#243b68]/30 blur-[160px] pointer-events-none z-0" />

      {/* Luxury Modal Header */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/[0.08] bg-[#0a1220]/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        {/* Left Controls: Go Back + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-[#182a4a]/50 border border-white/[0.12] hover:border-[#3b5f99]/50 text-white text-xs font-semibold backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(24,42,74,0.4)] hover:-translate-x-0.5 cursor-pointer"
            title="Go Back to Website"
          >
            <ArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span>Go Back</span>
          </button>

          <div className="hidden sm:block h-6 w-px bg-white/10" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#182a4a]/40 to-[#2b4c7e]/40 border border-[#3b5f99]/40 flex items-center justify-center text-[#a0c4f8] shadow-inner hidden sm:flex">
              {activeCard.badgeIcon}
            </div>
            <div>
              <h2
                className="text-lg md:text-xl font-bold font-serif text-white tracking-tight flex items-center gap-2.5"
                style={{ fontFamily: "Georgia, Cambria, 'Times New Roman', Times, serif" }}
              >
                {activeCard.title}
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#182a4a]/60 text-[#a0c4f8] border border-[#3b5f99]/40 tracking-wider uppercase font-sans">
                  {activeCard.images.length} Items
                </span>
              </h2>
              <p className="text-[11px] text-gray-400 hidden md:block flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-400 inline" /> Protected Deckoviz Gallery &bull; Click any frame to view in full resolution
              </p>
            </div>
          </div>
        </div>

        {/* Center: Collection Category Switcher (Tabs) */}
        <div className="hidden md:flex items-center gap-1.5 bg-black/50 p-1.5 rounded-full border border-white/10 shadow-inner">
          {galleryCards.map((card) => {
            const isActive = activeTabId === card.id;
            return (
              <button
                key={card.id}
                onClick={() => {
                  setActiveTabId(card.id);
                  setLightboxIndex(null);
                }}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#182a4a] via-[#243b68] to-[#2b4c7e] text-white shadow-[0_0_24px_rgba(24,42,74,0.6)] border border-[#3b5f99]/50"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{card.badgeIcon}</span>
                <span>{card.badge}</span>
                <span className="opacity-70 text-[10px]">({card.images.length})</span>
              </button>
            );
          })}
        </div>

        {/* Right Exit Button */}
        <button
          onClick={onClose}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 hover:bg-rose-600 border border-rose-500/30 text-rose-300 hover:text-white text-xs font-bold transition-all duration-300 shadow-[0_0_15px_rgba(244,63,94,0.15)] hover:shadow-[0_0_25px_rgba(244,63,94,0.4)] cursor-pointer"
          title="Exit Gallery (Esc)"
        >
          <X size={16} className="transition-transform duration-300 group-hover:rotate-90" />
          <span>Exit</span>
        </button>
      </div>

      {/* Mobile Category Switcher */}
      <div className="flex md:hidden items-center justify-center gap-2 p-3 border-b border-white/10 bg-[#0a1220]/80 backdrop-blur-md">
        {galleryCards.map((card) => (
          <button
            key={card.id}
            onClick={() => {
              setActiveTabId(card.id);
              setLightboxIndex(null);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTabId === card.id
                ? "bg-gradient-to-r from-[#182a4a] to-[#243b68] text-white shadow-md shadow-[#182a4a]/50"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            {card.badge} ({card.images.length})
          </button>
        ))}
      </div>

      {/* Gallery Grid Body */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {activeCard.images.map((imgSrc, index) => (
            <motion.div
              key={imgSrc + index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.4) }}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setLightboxIndex(index)}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-white/10 hover:border-[#3b5f99]/70 shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_40px_rgba(24,42,74,0.4)] transition-all duration-300 select-none"
            >
              <ProtectedImage
                src={imgSrc}
                alt={`${activeCard.title} #${index + 1}`}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/h1.png";
                }}
                className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Museum frame ambient gradient overlay */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 pointer-events-none">
                <span className="self-end text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-black/60 text-[#a0c4f8] border border-[#3b5f99]/30 backdrop-blur-md">
                  #{index + 1}
                </span>

                <div className="flex items-center justify-between text-white">
                  <span className="text-xs font-semibold tracking-wide">View Fullsize</span>
                  <div className="w-8 h-8 rounded-full bg-[#182a4a] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Maximize2 size={14} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            className="fixed inset-0 z-[100002] bg-[#050810]/98 backdrop-blur-3xl flex flex-col justify-between overflow-hidden select-none"
          >
            {/* Ambient artwork backlight effect */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
              <div className="w-[500px] h-[500px] rounded-full bg-[#182a4a]/40 blur-[160px]" />
            </div>

            {/* Lightbox Header */}
            <div className="relative z-10 flex items-center justify-between px-6 py-4 bg-[#0a1220]/90 backdrop-blur-xl border-b border-white/10 shadow-lg">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#182a4a] to-[#243b68] hover:from-[#243b68] hover:to-[#2b4c7e] text-white text-xs font-semibold shadow-lg transition-all hover:scale-105 cursor-pointer border border-[#3b5f99]/40"
                  title="Go Back to Grid View"
                >
                  <ArrowLeft size={15} />
                  <span>Go Back to Grid</span>
                </button>

                <div className="hidden sm:block h-5 w-px bg-white/10" />

                <div className="flex items-center gap-2 hidden sm:flex">
                  <Sparkles className="text-[#a0c4f8]" size={18} />
                  <span
                    className="text-sm font-bold font-serif text-white"
                    style={{ fontFamily: "Georgia, Cambria, 'Times New Roman', Times, serif" }}
                  >
                    {activeCard.title}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-gray-300 font-mono">
                    {lightboxIndex + 1} / {activeCard.images.length}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
                  title="Close Image View (Esc)"
                >
                  <X size={16} />
                  <span>Close View</span>
                </button>

                <button
                  onClick={onClose}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg transition-all hover:scale-105 cursor-pointer"
                  title="Exit All (Esc)"
                >
                  <X size={16} />
                  <span>Exit Gallery</span>
                </button>
              </div>
            </div>

            {/* Lightbox Main Image Display (Framed like Deckoviz Frame with non-downloadable overlay) */}
            <div
              className="relative z-10 flex-1 flex items-center justify-center p-4 md:p-10 overflow-hidden select-none"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            >
              <button
                onClick={handlePrev}
                className="absolute left-4 md:left-10 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-[#182a4a] text-white border border-[#3b5f99]/30 flex items-center justify-center backdrop-blur-md transition-all shadow-2xl hover:scale-110 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative p-2 md:p-4 rounded-3xl bg-slate-900/90 border border-[#3b5f99]/40 shadow-[0_0_60px_rgba(24,42,74,0.4)] backdrop-blur-xl flex items-center justify-center select-none max-w-[82vw] max-h-[76vh] overflow-hidden"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                >
                  <ProtectedImage
                    src={activeCard.images[lightboxIndex]}
                    alt={`${activeCard.title} item ${lightboxIndex + 1}`}
                    objectFit="contain"
                    className="max-w-full max-h-full flex items-center justify-center"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/h1.png";
                    }}
                    imgClassName="max-w-[76vw] max-h-[70vh] md:max-h-[72vh] object-contain w-auto h-auto rounded-2xl"
                  />
                </motion.div>
              </AnimatePresence>

              <button
                onClick={handleNext}
                className="absolute right-4 md:right-10 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-[#182a4a] text-white border border-[#3b5f99]/30 flex items-center justify-center backdrop-blur-md transition-all shadow-2xl hover:scale-110 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const DeckovizGallerySection: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<GalleryCardData | null>(null);

  return (
    <section
      className="relative w-full py-20 px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #eef1fb 0%, #f5f7ff 40%, #e8edff 70%, #eaedff 100%)",
      }}
    >
      {/* Decorative dot-scatter background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(24,42,74,0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Decorative blobs */}
      <div
        className="absolute top-10 left-10 w-72 h-72 rounded-full blur-[100px] opacity-40 pointer-events-none z-0"
        style={{ background: "rgba(24,42,74,0.18)" }}
      />
      <div
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-[100px] opacity-30 pointer-events-none z-0"
        style={{ background: "rgba(36,59,104,0.16)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          {/* Top label */}
          <div className="inline-flex items-center gap-2 mb-4">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#182a4a]"
            >
              <path
                d="M12 2L13.5 9H21L15 13.5L17.5 21L12 16.5L6.5 21L9 13.5L3 9H10.5L12 2Z"
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase text-[#182a4a]"
            >
              Explore the Deckoviz Gallery
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold font-serif text-[#182a4a] mb-4 leading-tight"
            style={{ fontFamily: "Georgia, Cambria, 'Times New Roman', Times, serif" }}
          >
            Three ways to experience the{" "}
            <span className="italic bg-gradient-to-r from-[#182a4a] via-[#243b68] to-[#3b5f99] bg-clip-text text-transparent inline-block pb-1 font-serif">
              things we love.
            </span>
          </h2>

          <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
            Handpicked selections from across Deckoviz.
            <br />
            Art that inspires, informs, and transforms.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {galleryCards.map((card) => (
            <GalleryCardItem
              key={card.id}
              card={card}
              onOpenGallery={(selected) => setSelectedCard(selected)}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center mt-12"
        >
          <button
            onClick={() => setSelectedCard(galleryCards[0])}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer text-[#182a4a] bg-white/90 backdrop-blur-md border border-[#182a4a]/25 shadow-[0_4px_20px_rgba(24,42,74,0.12)]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#182a4a]"
            >
              <path
                d="M12 2L13.5 9H21L15 13.5L17.5 21L12 16.5L6.5 21L9 13.5L3 9H10.5L12 2Z"
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
            <span>Discover More in the Full Gallery</span>
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1 text-[#182a4a]"
            />
          </button>
        </motion.div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedCard && (
          <GalleryModal
            initialCard={selectedCard}
            onClose={() => setSelectedCard(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default DeckovizGallerySection;

