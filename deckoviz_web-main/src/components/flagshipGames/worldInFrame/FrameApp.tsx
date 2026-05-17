"use client";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { FrameProvider } from "./lib/frameState";
import FrameLobby from "./FrameLobby";
import FramePlay from "./FramePlay";
import FrameLeaderboard from "./FrameLeaderboard";

const FrameApp: React.FC = () => (
  <FrameProvider>
    <Routes>
      <Route index element={<FrameLobby />} />
      <Route path="play" element={<FramePlay />} />
      <Route path="leaderboard" element={<FrameLeaderboard />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  </FrameProvider>
);

export default FrameApp;
