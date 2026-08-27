"use client";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { OracleProvider } from "./lib/oracleState";
import OracleLobby from "./OracleLobby";
import OraclePlay from "./OraclePlay";

const OracleApp: React.FC = () => (
  <OracleProvider>
    <Routes>
      <Route index element={<OracleLobby />} />
      <Route path="play" element={<OraclePlay />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  </OracleProvider>
);

export default OracleApp;
