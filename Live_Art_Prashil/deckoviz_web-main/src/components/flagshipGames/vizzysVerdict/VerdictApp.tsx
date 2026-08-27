"use client";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { VerdictProvider } from "./lib/verdictState";
import VerdictLobby from "./VerdictLobby";
import VerdictPlay from "./VerdictPlay";
import VerdictLeaderboard from "./VerdictLeaderboard";

const VerdictApp: React.FC = () => (
  <VerdictProvider>
    <Routes>
      <Route index element={<VerdictLobby />} />
      <Route path="play" element={<VerdictPlay />} />
      <Route path="leaderboard" element={<VerdictLeaderboard />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  </VerdictProvider>
);

export default VerdictApp;
