import React from 'react';

interface PixelatedBackgroundProps {
  variant?: 'glacial' | 'volcano' | 'forest' | 'nebula';
}

const PixelatedBackground: React.FC<PixelatedBackgroundProps> = ({ variant = 'glacial' }) => {
  const videoSrc = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4";

  // Calculate filter based on variant to create different color effects from the same video
  let filter = 'none';
  
  switch (variant) {
    case 'volcano':
      // Shift blue to red/orange
      filter = 'hue-rotate(130deg) saturate(2.5) contrast(1.2)';
      break;
    case 'forest':
      // Shift blue to green
      filter = 'hue-rotate(-100deg) saturate(2) contrast(1.1)';
      break;
    case 'nebula':
      // Shift blue to purple/pink
      filter = 'hue-rotate(40deg) saturate(1.8)';
      break;
    case 'glacial':
    default:
      // Keep original blue or enhance it slightly
      filter = 'saturate(1.2) contrast(1.05)';
      break;
  }

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        style={{
          filter: filter,
          opacity: 0.5, // Blends with the dark background
          mixBlendMode: 'screen', // Helps blend the bright parts with the background
        }}
        src={videoSrc}
      />
      {/* Fallback overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[#050505]/30" />
    </div>
  );
};

export default PixelatedBackground;
