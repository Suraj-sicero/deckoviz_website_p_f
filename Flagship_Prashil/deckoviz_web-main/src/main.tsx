import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { AudioProvider } from "./components/AudioProvider";

import App from "./App.tsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AudioProvider>
        <App />
      </AudioProvider>
    </AuthProvider>
  </StrictMode>
);
