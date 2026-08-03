import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { 
  auth, 
  googleProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup 
} from "../../lib/firebaseClient";

const AuthModal: React.FC<{ allowClose?: boolean }> = ({ allowClose }) => {
  const { isAuthModalOpen, isAuthModalForced, closeAuthModal, login } = useAuth();

  const effectiveAllowClose = allowClose !== undefined ? allowClose : !isAuthModalForced;
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "https://deckoviz-website-p-f.onrender.com";
  const API_URL = `${BASE_URL}/api/auth`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let idToken = "";
      let firebaseUid = "";

      if (isLogin) {
        // 1. Native Firebase Auth Sign In
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        idToken = await userCred.user.getIdToken();
        firebaseUid = userCred.user.uid;

        const res = await axios.post(`${API_URL}/signin`, { 
          email, 
          password, 
          id_token: idToken 
        });
        login(res.data.token || idToken, res.data.user);
      } else {
        // 2. Native Firebase Auth Sign Up
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        idToken = await userCred.user.getIdToken();
        firebaseUid = userCred.user.uid;

        const res = await axios.post(`${API_URL}/signup`, { 
          email, 
          password, 
          firebase_uid: firebaseUid,
          id_token: idToken 
        });
        login(res.data.token || idToken, res.data.user);
      }
    } catch (err: any) {
      console.error("Firebase Auth notice:", err);
      // Fallback directly to FastAPI backend if Firebase Auth client throws
      try {
        const endpoint = isLogin ? "/signin" : "/signup";
        const res = await axios.post(`${API_URL}${endpoint}`, { email, password });
        login(res.data.token, res.data.user);
      } catch (backendErr: any) {
        const msg = backendErr.response?.data?.detail || err.message || "";
        if (msg.includes("invalid-credential") || msg.includes("INVALID_LOGIN_CREDENTIALS") || backendErr.response?.status === 401) {
          setError("Invalid email or password. Please check your credentials.");
        } else if (msg.includes("unauthorized-domain")) {
          setError("Domain deckoviz.com must be added to Authorized Domains in Firebase Console.");
        } else {
          setError(msg || "Authentication failed. Please try again.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleOAuth = async () => {
    setError("");
    setLoading(true);

    try {
      // Native Firebase Google OAuth Popup
      const userCred = await signInWithPopup(auth, googleProvider);
      const idToken = await userCred.user.getIdToken();
      const userEmail = userCred.user.email || email;
      const userName = userCred.user.displayName || "";

      const res = await axios.post(`${API_URL}/signin`, {
        id_token: idToken,
        email: userEmail,
        name: userName
      });

      login(res.data.token || idToken, res.data.user);
    } catch (err: any) {
      console.error("Google OAuth error:", err);
      if (err?.code === "auth/unauthorized-domain" || err?.message?.includes("unauthorized-domain")) {
        setError("deckoviz.com is not authorized for Google Sign-In yet. Please add deckoviz.com in Firebase Console -> Authentication -> Settings -> Authorized domains.");
      } else {
        setError(err?.message || "Google sign in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(11,18,32,0.85)", backdropFilter: "blur(16px)" }}
    >
      {/* Ambient background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #1B2A4A 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Outer glow ring */}
        <div className="absolute -inset-[2px] rounded-[2rem] opacity-80 pointer-events-none"
          style={{ background: "linear-gradient(135deg, #2563EB, #1B2A4A, #2563EB)", padding: "2px" }}>
          <div className="w-full h-full rounded-[2rem]" style={{ background: "#0B1220" }} />
        </div>

        {/* Card */}
        <div className="relative rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(37,99,235,0.3)]"
          style={{ background: "linear-gradient(160deg, #0f1e38 0%, #0B1220 60%, #0d1a2e 100%)" }}
        >
          {/* Top decorative gradient strip */}
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #0B1220, #2563EB, #1B2A4A, #2563EB, #0B1220)" }} />

          {/* Header */}
          <div className="px-8 pt-8 pb-6 relative">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-white leading-tight">
                  {isLogin ? "Welcome Back" : "Get Started"}
                </h2>
                <p className="mt-1 text-sm" style={{ color: "rgba(147,197,253,0.7)" }}>
                  {isLogin ? "Sign in to continue your creative journey" : "Create your account & get 50 free credits"}
                </p>
              </div>
              <button
                onClick={() => {
                  if (effectiveAllowClose) {
                    closeAuthModal();
                  } else {
                    if (window.history.length > 2) {
                      window.history.back();
                    } else {
                      window.location.href = '/';
                    }
                  }
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)" }}
                aria-label="Close or Go Back"
              >
                <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Thin divider */}
            <div className="mt-6 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)" }} />
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm font-medium"
                style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5" }}>
                {error}
              </div>
            )}

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleOAuth}
              disabled={loading}
              className="w-full mb-4 py-3.5 px-4 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-3 transition-all duration-300 hover:bg-white/10 border border-white/15 shadow-md"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "rgba(37,99,235,0.2)" }} />
              <span className="text-xs" style={{ color: "rgba(147,197,253,0.4)" }}>or sign in with email</span>
              <div className="flex-1 h-px" style={{ background: "rgba(37,99,235,0.2)" }} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email field */}
              <div>
                <label className="block text-xs font-semibold mb-2 tracking-wider uppercase"
                  style={{ color: "rgba(147,197,253,0.7)" }}>
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-300"
                    style={{
                      background: "rgba(37,99,235,0.08)",
                      border: "1px solid rgba(37,99,235,0.2)",
                    }}
                    onFocus={e => {
                      e.currentTarget.style.border = "1px solid rgba(37,99,235,0.6)";
                      e.currentTarget.style.boxShadow = "0 0 20px rgba(37,99,235,0.15)";
                    }}
                    onBlur={e => {
                      e.currentTarget.style.border = "1px solid rgba(37,99,235,0.2)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <label className="block text-xs font-semibold mb-2 tracking-wider uppercase"
                  style={{ color: "rgba(147,197,253,0.7)" }}>
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-300"
                  style={{
                    background: "rgba(37,99,235,0.08)",
                    border: "1px solid rgba(37,99,235,0.2)",
                  }}
                  onFocus={e => {
                    e.currentTarget.style.border = "1px solid rgba(37,99,235,0.6)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(37,99,235,0.15)";
                  }}
                  onBlur={e => {
                    e.currentTarget.style.border = "1px solid rgba(37,99,235,0.2)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-white text-sm tracking-wide relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                style={{
                  background: "linear-gradient(135deg, #0B1220 0%, #1B2A4A 50%, #2563EB 100%)",
                  backgroundSize: "200% 200%",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15), 0 4px 20px rgba(37,99,235,0.3)",
                  animation: "gradientShift 4s ease infinite",
                }}
              >
                {/* Shimmer */}
                <div className="absolute top-0 -left-full w-1/2 h-full skew-x-[-20deg] pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)", animation: "shimmer 3s infinite" }} />
                <span className="relative z-10">
                  {loading ? "Processing..." : isLogin ? "Sign In →" : "Create Account & Get 50 Credits 🪙"}
                </span>
              </button>
            </form>

            {/* Toggle */}
            <div className="mt-5 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm font-semibold transition-all duration-200 hover:scale-105"
                style={{ color: "#60a5fa" }}
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
