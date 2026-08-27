"use client";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { OneWordProvider } from "./lib/oneWordState";
import OneWordLobby from "./OneWordLobby";
import OneWordPlay from "./OneWordPlay";
import OneWordLeaderboard from "./OneWordLeaderboard";

const OneWordApp: React.FC = () => (
  <OneWordProvider>
    <Routes>
      <Route index element={<OneWordLobby />} />
      <Route path="play" element={<OneWordPlay />} />
      <Route path="leaderboard" element={<OneWordLeaderboard />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  </OneWordProvider>
);

export default OneWordApp;
