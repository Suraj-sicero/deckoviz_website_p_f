import React from "react";
import "./WebFrame.css";

const WebFrame: React.FC = () => {
  return (
    <div className="webframe-page">
      {/* ── Ambient Gradient Background ── */}
      <div className="webframe-ambient-bg">
        <div className="webframe-ambient-top" />
        <div className="webframe-ambient-bottom" />

        {/* Floating ambient orbs */}
        <div className="webframe-orb webframe-orb--gold-1" />
        <div className="webframe-orb webframe-orb--gold-2" />
        <div className="webframe-orb webframe-orb--gold-3" />
        <div className="webframe-orb webframe-orb--grey-1" />
        <div className="webframe-orb webframe-orb--grey-2" />
      </div>

      {/* ── Title & Subtitle ── */}
      <header className="webframe-header">
        <h1 className="webframe-title">Virtual Frame Experience</h1>
        <p className="webframe-subtitle">
          A live simulation of the Deckoviz Frame, allowing artworks,
          collections, and experiences, and portal, to be previewed exactly as
          they'll appear on your walls, without requiring the hardware.
        </p>
      </header>

      {/* ── The Frame ── */}
      <div className="webframe-frame-wrapper">
        <div className="webframe-backlight" />
        <div className="webframe-frame-shadow" />
        <div className="webframe-frame">
          <img
            src="/frames/deckoviz-frame-art.jpg"
            alt="Deckoviz Virtual Frame – Mountain landscape with golden sunrise"
            draggable={false}
          />
          <div className="webframe-inner-shadow" />
        </div>
      </div>

      {/* ── Footer accent ── */}
      <div className="webframe-footer">
        <div className="webframe-footer-line" />
        <p className="webframe-footer-text">Deckoviz</p>
      </div>
    </div>
  );
};

export default WebFrame;
