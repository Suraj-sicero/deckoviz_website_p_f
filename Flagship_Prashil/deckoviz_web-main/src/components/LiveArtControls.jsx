import React, { useState, useEffect } from 'react';
import { useLiveArt } from '../contexts/LiveArtContext';
import './LiveArtControls.css';

export default function LiveArtControls({ title }) {
  const { 
    isPlaying, togglePlay, 
    intensity, setIntensity, 
    triggerReset, 
    isAudioEnabled, toggleAudio,
    isFrameMode, setIsFrameMode,
    activeStyle, setActiveStyle
  } = useLiveArt();

  // Hide UI for headless video recording
  const isTVMode = new URLSearchParams(window.location.search).get('mode') === 'tv';
  if (isTVMode) return null;

  const [isUiVisible, setIsUiVisible] = useState(true);
  const [exportStatus, setExportStatus] = useState('');
  const [downloadLink, setDownloadLink] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  const triggerExport = async (minutes) => {
    try {
      setDownloadLink(null);
      setExportStatus('Queuing...');
      // Convert the Title to a modeId (e.g. "Ink Tide" -> "ink-tide")
      const modeId = title.toLowerCase().replace(/ /g, '-');
      const response = await fetch('http://localhost:3001/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modeId, durationMinutes: minutes })
      });
      if (response.ok) {
        const data = await response.json();
        
        // Since we now max out at 1 min captures and loop the rest via FFmpeg,
        // it will take ~60s + a few seconds for FFmpeg regardless of requested length.
        const totalSeconds = 75;
        setTimeLeft(totalSeconds);
        setExportStatus(`Exporting ${minutes}m Loop...`);
        
        // Timer for countdown
        const tickInterval = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev === null) return null;
            if (prev <= 1) return 1; // Hang at 1s if it takes slightly longer
            return prev - 1;
          });
        }, 1000);
        
        // Poll for completion
        const pollInterval = setInterval(async () => {
          try {
            const statusRes = await fetch(`http://localhost:3001/api/status/${data.jobId}`);
            if (statusRes.ok) {
              const jobData = await statusRes.json();
              if (jobData.status === 'complete') {
                clearInterval(pollInterval);
                clearInterval(tickInterval);
                setTimeLeft(null);
                setExportStatus(`✅ Video is exported!`);
                setDownloadLink(`http://localhost:3001/api/download/${jobData.file}`);
                // Clear the status text after 30 seconds
                setTimeout(() => {
                  setExportStatus('');
                  setDownloadLink(null);
                }, 30000);
              } else if (jobData.status === 'error') {
                setExportStatus(`❌ Error: ${jobData.error}`);
                clearInterval(pollInterval);
                clearInterval(tickInterval);
                setTimeLeft(null);
              }
            }
          } catch (e) {
            // Ignore fetch errors during polling
          }
        }, 5000);
        
      } else {
        setExportStatus('Error queuing export');
      }
    } catch (err) {
      console.error(err);
      setExportStatus('API Server Offline');
    }
  };

  // Auto-hide UI on idle
  useEffect(() => {
    let timeoutId;
    const handleMouseMove = () => {
      setIsUiVisible(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsUiVisible(false), 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    timeoutId = setTimeout(() => setIsUiVisible(false), 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        setIsFrameMode(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsFrameMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsFrameMode]);

  const hideUi = !isUiVisible || isFrameMode;

  return (
    <div className={`live-art-controls-wrapper ${hideUi ? 'hidden' : ''}`}>
      <div className="lac-header">
        <div className="lac-branding">DECKOVIZ PORTAL</div>
        <div className="lac-title">{title}</div>
      </div>

      <div className="lac-panel">
        <button className="lac-btn" onClick={togglePlay}>
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        
        <button className="lac-btn" onClick={toggleAudio}>
          {isAudioEnabled ? '🔊 Audio On' : '🔇 Audio Off'}
        </button>

        <button className="lac-btn" onClick={triggerReset}>
          ↺ Reset
        </button>

        <div className="lac-slider-group">
          <label>Intensity</label>
          <input 
            type="range" 
            min="0" max="1" step="0.01" 
            value={intensity} 
            onChange={(e) => setIntensity(parseFloat(e.target.value))} 
          />
        </div>
        
        {title === 'Gravity' && (
          <div style={{ marginTop: '15px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '15px' }}>
            <div style={{ fontSize: '14px', marginBottom: '10px' }}>Art Style</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                style={{
                  padding: '8px 12px', background: activeStyle === 0 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                  border: `1px solid ${activeStyle === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)'}`,
                  color: '#fff', borderRadius: '4px', cursor: 'pointer', textAlign: 'left',
                  fontWeight: activeStyle === 0 ? 'bold' : 'normal', transition: 'all 0.2s ease'
                }} 
                onClick={() => setActiveStyle(0)}
              >
                Stellar Dust
              </button>
              <button 
                style={{
                  padding: '8px 12px', background: activeStyle === 1 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                  border: `1px solid ${activeStyle === 1 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)'}`,
                  color: '#fff', borderRadius: '4px', cursor: 'pointer', textAlign: 'left',
                  fontWeight: activeStyle === 1 ? 'bold' : 'normal', transition: 'all 0.2s ease'
                }} 
                onClick={() => setActiveStyle(1)}
              >
                Constellation Web
              </button>
              <button 
                style={{
                  padding: '8px 12px', background: activeStyle === 2 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                  border: `1px solid ${activeStyle === 2 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)'}`,
                  color: '#fff', borderRadius: '4px', cursor: 'pointer', textAlign: 'left',
                  fontWeight: activeStyle === 2 ? 'bold' : 'normal', transition: 'all 0.2s ease'
                }} 
                onClick={() => setActiveStyle(2)}
              >
                Quantum Crystals
              </button>
              <button 
                style={{
                  padding: '8px 12px', background: activeStyle === 3 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                  border: `1px solid ${activeStyle === 3 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)'}`,
                  color: '#fff', borderRadius: '4px', cursor: 'pointer', textAlign: 'left',
                  fontWeight: activeStyle === 3 ? 'bold' : 'normal', transition: 'all 0.2s ease'
                }} 
                onClick={() => setActiveStyle(3)}
              >
                Original Gravity
              </button>
            </div>
          </div>
        )}
        {title === 'Reverie' && (
          <div style={{ marginTop: '15px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '15px' }}>
            <div style={{ fontSize: '14px', marginBottom: '10px' }}>Art Style</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                style={{
                  padding: '8px 12px', background: activeStyle === 0 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                  border: `1px solid ${activeStyle === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)'}`,
                  color: '#fff', borderRadius: '4px', cursor: 'pointer', textAlign: 'left',
                  fontWeight: activeStyle === 0 ? 'bold' : 'normal', transition: 'all 0.2s ease'
                }} 
                onClick={() => setActiveStyle(0)}
              >
                Smooth Vivid
              </button>
              <button 
                style={{
                  padding: '8px 12px', background: activeStyle === 1 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                  border: `1px solid ${activeStyle === 1 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)'}`,
                  color: '#fff', borderRadius: '4px', cursor: 'pointer', textAlign: 'left',
                  fontWeight: activeStyle === 1 ? 'bold' : 'normal', transition: 'all 0.2s ease'
                }} 
                onClick={() => setActiveStyle(1)}
              >
                Topographical
              </button>
              <button 
                style={{
                  padding: '8px 12px', background: activeStyle === 2 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                  border: `1px solid ${activeStyle === 2 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)'}`,
                  color: '#fff', borderRadius: '4px', cursor: 'pointer', textAlign: 'left',
                  fontWeight: activeStyle === 2 ? 'bold' : 'normal', transition: 'all 0.2s ease'
                }} 
                onClick={() => setActiveStyle(2)}
              >
                Original Flow
              </button>
            </div>
          </div>
        )}
        
        <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '15px' }}>
          <div style={{ fontSize: '14px', marginBottom: '10px' }}>Live Art to Video Convertor</div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button style={{ padding: '6px 12px', background: '#3b82f6', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer', flex: 1 }} onClick={() => triggerExport(5)}>5m</button>
            <button style={{ padding: '6px 12px', background: '#3b82f6', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer', flex: 1 }} onClick={() => triggerExport(10)}>10m</button>
            <button style={{ padding: '6px 12px', background: '#3b82f6', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer', flex: 1 }} onClick={() => triggerExport(20)}>20m</button>
            <button style={{ padding: '6px 12px', background: '#3b82f6', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer', flex: 1 }} onClick={() => triggerExport(30)}>30m</button>
          </div>
          {exportStatus && (
            <div style={{ marginTop: '10px', fontSize: '12px', color: '#a78bfa', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div>
                {exportStatus} {timeLeft !== null && `(Ready in ~${timeLeft}s)`}
              </div>
              {downloadLink && (
                <a 
                  href={downloadLink}
                  download
                  onClick={() => {
                    setExportStatus('✅ Saved to Downloads!');
                    setDownloadLink(null);
                  }}
                  style={{
                    padding: '8px 16px',
                    background: '#10b981',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Download MP4
                </a>
              )}
            </div>
          )}
        </div>

        <div className="lac-shortcut-hint">
          Press [F] for Frame Mode
        </div>
      </div>
    </div>
  );
}
