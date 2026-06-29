import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const AuthModal: React.FC<{ allowClose?: boolean }> = ({ allowClose }) => {
  const { isAuthModalOpen, isAuthModalForced, closeAuthModal, login } = useAuth();

  const effectiveAllowClose = allowClose !== undefined ? allowClose : !isAuthModalForced;
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isLogin ? "/signin" : "/signup";
    const BASE_URL = import.meta.env.VITE_API_URL || "https://deckoviz-demo.onrender.com";
    const API_URL = `${BASE_URL}/api/auth`;
    try {
      const res = await axios.post(`${API_URL}${endpoint}`, { email, password });
      login(res.data.token, res.data.user);
    } catch (err: any) {
      setError(err.response?.data?.error || "Authentication failed");
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

            {/* Divider */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "rgba(37,99,235,0.2)" }} />
              <span className="text-xs" style={{ color: "rgba(147,197,253,0.4)" }}>or</span>
              <div className="flex-1 h-px" style={{ background: "rgba(37,99,235,0.2)" }} />
            </div>

            {/* Toggle */}
            <div className="mt-5 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm font-semibold transition-all duration-200 hover:scale-105"
                style={{ color: "#60a5fa" }}
              >
                {isLogin ? "No account yet? Sign up free →" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}</style>
    </div>
  );
};

export default AuthModal;
