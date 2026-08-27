"use client";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { InheritanceProvider } from "./lib/inheritanceState";
import InheritanceLobby from "./InheritanceLobby";
import InheritancePlay from "./InheritancePlay";

const InheritanceApp: React.FC = () => (
  <InheritanceProvider>
    <Routes>
      <Route index element={<InheritanceLobby />} />
      <Route path="play" element={<InheritancePlay />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  </InheritanceProvider>
);

export default InheritanceApp;
