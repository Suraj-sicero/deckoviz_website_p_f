import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hub from './pages/Hub';
import LiveArtWrapper from './pages/LiveArt/LiveArtWrapper';
import InkTide from './pages/LiveArt/modes/InkTide';
import Murmuration from './pages/LiveArt/modes/Murmuration';
import CoralBloom from './pages/LiveArt/modes/CoralBloom';
import Reverie from './pages/LiveArt/modes/Reverie';
import AuroraLedger from './pages/LiveArt/modes/AuroraLedger';
import Ripple from './pages/LiveArt/modes/Ripple';
import Resonance from './pages/LiveArt/modes/Resonance';
import Gravity from './pages/LiveArt/modes/Gravity';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route element={<LiveArtWrapper />}>
          <Route path="ink-tide" element={<InkTide />} />
          <Route path="murmuration" element={<Murmuration />} />
          <Route path="coral-bloom" element={<CoralBloom />} />
          <Route path="reverie" element={<Reverie />} />
          <Route path="aurora-ledger" element={<AuroraLedger />} />
          <Route path="ripple" element={<Ripple />} />
          <Route path="resonance" element={<Resonance />} />
          <Route path="gravity" element={<Gravity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
