"use client";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CartographersProvider } from "./lib/cartographersState";
import CartographersLobby from "./CartographersLobby";
import CartographersPlay from "./CartographersPlay";

const CartographersApp: React.FC = () => (
  <CartographersProvider>
    <Routes>
      <Route index element={<CartographersLobby />} />
      <Route path="play" element={<CartographersPlay />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  </CartographersProvider>
);

export default CartographersApp;
