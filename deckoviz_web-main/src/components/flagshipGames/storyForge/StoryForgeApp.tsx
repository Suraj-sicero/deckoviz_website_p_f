"use client";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { StoryForgeProvider } from "./lib/storyForgeState";
import StoryForgeLobby from "./StoryForgeLobby";
import StoryForgePlay from "./StoryForgePlay";
import StoryForgeStorybook from "./StoryForgeStorybook";

const StoryForgeApp: React.FC = () => {
  return (
    <StoryForgeProvider>
      <Routes>
        <Route index element={<StoryForgeLobby />} />
        <Route path="play" element={<StoryForgePlay />} />
        <Route path="storybook" element={<StoryForgeStorybook />} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Routes>
    </StoryForgeProvider>
  );
};

export default StoryForgeApp;
