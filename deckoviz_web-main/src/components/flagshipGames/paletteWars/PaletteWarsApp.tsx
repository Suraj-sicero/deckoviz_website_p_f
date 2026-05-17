"use client";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PaletteWarsProvider } from "./lib/paletteWarsState";
import PaletteWarsLobby from "./PaletteWarsLobby";
import PaletteWarsPlay from "./PaletteWarsPlay";
import PaletteWarsLeaderboard from "./PaletteWarsLeaderboard";

const PaletteWarsApp: React.FC = () => (
  <PaletteWarsProvider>
    <Routes>
      <Route index element={<PaletteWarsLobby />} />
      <Route path="play" element={<PaletteWarsPlay />} />
      <Route path="leaderboard" element={<PaletteWarsLeaderboard />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  </PaletteWarsProvider>
);

export default PaletteWarsApp;
