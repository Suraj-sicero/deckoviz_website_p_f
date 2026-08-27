"use client";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MindsProvider } from "./lib/mindsState";
import BrilliantMindsLobby from "./BrilliantMindsLobby";
import BrilliantMindsPlay from "./BrilliantMindsPlay";
import BrilliantMindsLeaderboard from "./BrilliantMindsLeaderboard";

const BrilliantMindsApp: React.FC = () => (
  <MindsProvider>
    <Routes>
      <Route index element={<BrilliantMindsLobby />} />
      <Route path="play" element={<BrilliantMindsPlay />} />
      <Route path="leaderboard" element={<BrilliantMindsLeaderboard />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  </MindsProvider>
);

export default BrilliantMindsApp;
