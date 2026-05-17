"use client";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DreamArchitectProvider } from "./lib/dreamArchitectState";
import DreamArchitectLobby from "./DreamArchitectLobby";
import DreamArchitectPlay from "./DreamArchitectPlay";

const DreamArchitectApp: React.FC = () => (
  <DreamArchitectProvider>
    <Routes>
      <Route index element={<DreamArchitectLobby />} />
      <Route path="play" element={<DreamArchitectPlay />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  </DreamArchitectProvider>
);

export default DreamArchitectApp;
