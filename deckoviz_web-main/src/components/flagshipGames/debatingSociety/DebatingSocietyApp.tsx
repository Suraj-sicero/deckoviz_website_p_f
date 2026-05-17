"use client";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DebateProvider } from "./lib/debateState";
import DebateLobby from "./DebateLobby";
import DebatePlay from "./DebatePlay";

const DebatingSocietyApp: React.FC = () => (
  <DebateProvider>
    <Routes>
      <Route index element={<DebateLobby />} />
      <Route path="play" element={<DebatePlay />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  </DebateProvider>
);

export default DebatingSocietyApp;
