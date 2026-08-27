"use client";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MuseumProvider } from "./lib/museumState";
import MuseumLobby from "./MuseumLobby";
import MuseumPlay from "./MuseumPlay";

const MuseumOfUsApp: React.FC = () => (
  <MuseumProvider>
    <Routes>
      <Route index element={<MuseumLobby />} />
      <Route path="play" element={<MuseumPlay />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  </MuseumProvider>
);

export default MuseumOfUsApp;
