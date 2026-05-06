import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const AuthModal: React.FC<{ allowClose?: boolean }> = ({ allowClose }) => {
  const { isAuthModalOpen, isAuthModalForced, closeAuthModal, login } = useAuth();
  
  // Use prop if provided, otherwise fallback to context state
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
    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{isLogin ? "Welcome Back" : "Create Account"}</h2>
            <p className="text-violet-100 text-sm mt-1">
              {isLogin ? "Login to continue your creative journey" : "Sign up and get 50 free credits"}
            </p>
          </div>
          {effectiveAllowClose && (
            <button onClick={closeAuthModal} className="text-white hover:text-gray-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Form */}
        <div className="p-8">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm font-bold">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-violet-500 outline-none"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">Password</label>
              <input 
                type="password" 
                required
                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-violet-500 outline-none"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold hover:scale-[1.02] transition-transform flex justify-center items-center gap-2"
            >
              {loading ? "Processing..." : (isLogin ? "Sign In" : "Sign Up & Get 50 Credits 🪙")}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-violet-600 font-bold hover:underline"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
