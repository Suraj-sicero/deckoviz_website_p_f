import React, { useState, useEffect } from "react";
import "./WebFrame.css";
import { getFrameImage, clearFrameImage, getFrameSentAt } from "../lib/frameStore";

const DEFAULT_IMAGE = "/frames/deckoviz-frame-art.jpg";
const TEMP_DURATION_MS = 30 * 60 * 1000;

/** Sample 20×20 downscale of the image, return average RGB boosted for glow */
function extractGlowColor(img: HTMLImageElement): { r: number; g: number; b: number } {
  try {
    const size = 20;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return { r: 255, g: 170, b: 40 };

    ctx.drawImage(img, 0, 0, size, size);
    const { data } = ctx.getImageData(0, 0, size, size);

    let r = 0, g = 0, b = 0, n = 0;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      n++;
    }
    r = r / n;
    g = g / n;
    b = b / n;

    // Boost saturation: push each channel away from the mean
    const mean = (r + g + b) / 3;
    const sat = 2.2; // saturation boost factor
    r = Math.min(255, Math.max(0, mean + (r - mean) * sat));
    g = Math.min(255, Math.max(0, mean + (g - mean) * sat));
    b = Math.min(255, Math.max(0, mean + (b - mean) * sat));

    // Brightness boost so glow is vibrant
    const bri = 1.35;
    r = Math.min(255, r * bri);
    g = Math.min(255, g * bri);
    b = Math.min(255, b * bri);

    return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
  } catch {
    // Cross-origin or security error — fall back to warm amber
    return { r: 255, g: 170, b: 40 };
  }
}

const WebFrame: React.FC = () => {
  const [frameImage, setFrameImage] = useState<string>(DEFAULT_IMAGE);
  const [frameSize, setFrameSize] = useState({ width: 800, height: 450 }); // default 16:9
  const [glow, setGlow] = useState({ r: 255, g: 170, b: 40 });

  /** Compute display dimensions from natural image size, clamped to viewport */
  const computeSize = (natW: number, natH: number) => {
    const maxW = Math.min(window.innerWidth * 0.68, 980);
    const maxH = window.innerHeight * 0.70;
    let w = natW, h = natH;
    if (w > maxW) { h = h * (maxW / w); w = maxW; }
    if (h > maxH) { w = w * (maxH / h); h = maxH; }
    if (w < 320)  { h = h * (320 / w);  w = 320;  }
    return { width: Math.round(w), height: Math.round(h) };
  };

  const refreshImage = () => {
    const stored = getFrameImage();
    const sentAt = getFrameSentAt();
    if (stored) {
      if (sentAt && Date.now() - sentAt > TEMP_DURATION_MS) {
        clearFrameImage();
        setFrameImage(DEFAULT_IMAGE);
      } else {
        setFrameImage(stored);
      }
    } else {
      setFrameImage(DEFAULT_IMAGE);
    }
  };

  useEffect(() => {
    refreshImage();
    const handleStorage = (e: StorageEvent) => {
      if (
        e.key === "deckoviz_virtual_frame_image" ||
        e.key === "deckoviz_virtual_frame_sent_at"
      ) {
        refreshImage();
      }
    };
    const poll = setInterval(refreshImage, 1000);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(poll);
    };
  }, []);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const { naturalWidth, naturalHeight } = img;
    if (naturalWidth > 0 && naturalHeight > 0) {
      setFrameSize(computeSize(naturalWidth, naturalHeight));
    }
    setGlow(extractGlowColor(img));
  };

  const { r, g, b } = glow;

  // Dynamic box-shadow layers using extracted colour
  const frameShadow = [
    `0 0  80px 36px rgba(${r},${g},${b},0.78)`,
    `0 0 140px 60px rgba(${r},${g},${b},0.48)`,
    `0 0 220px 90px rgba(${r},${g},${b},0.22)`,
    `0 28px 50px 0   rgba(20,10,0,0.30)`,
    `inset 0 0 10px 2px rgba(0,0,0,0.32)`,
  ].join(", ");

  return (
    <div className="wf-page">
      <div className="wf-wall" />

      <div className="wf-content">
        <header className="wf-header">
          <h1 className="wf-title">Virtual Frame Experience</h1>
          <p className="wf-subtitle">
            A live simulation of the Deckoviz Frame, allowing artworks,
            collections, and experiences, and portal, to be previewed exactly
            as they'll appear on your walls, without requiring the hardware.
          </p>
        </header>

        <div className="wf-frame-wrap">
          <div
            className="wf-frame"
            style={{
              width: frameSize.width,
              height: frameSize.height,
              boxShadow: frameShadow,
            }}
          >
            <img
              key={frameImage}
              src={frameImage}
              alt="Deckoviz Frame"
              draggable={false}
              className="wf-artwork"
              onLoad={handleImageLoad}
              // Required for canvas cross-origin sampling of same-host images
              crossOrigin="anonymous"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebFrame;
