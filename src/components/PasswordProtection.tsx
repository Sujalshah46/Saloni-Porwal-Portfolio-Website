import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface PasswordProtectionProps {
  children: React.ReactNode;
}

const AUTH_STORAGE_KEY = 'saloni_portfolio_auth_unlocked';
const ACCESS_PASSWORD = 'Rocketman@21';

export const PasswordProtection: React.FC<PasswordProtectionProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    // Check if previously unlocked in this session or local storage
    const unlocked = localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (unlocked === 'true') {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.trim() === ACCESS_PASSWORD) {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsAuthenticated(true);
    } else {
      setError('Incorrect password. Please try again.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-6 h-6 border border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between px-6 py-12 relative overflow-hidden select-none">
      {/* Subtle Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Top Header / Brand */}
      <header className="relative z-10 text-center sm:text-left max-w-7xl mx-auto w-full">
        <div className="text-[10px] tracking-[0.35em] text-neutral-400 font-sans uppercase">
          SALONI PORWAL &bull; PORTFOLIO
        </div>
      </header>

      {/* Center Passcode Form */}
      <main className="relative z-10 max-w-md w-full mx-auto my-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 text-center"
        >
          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-white/15 bg-white/5 backdrop-blur-md">
            <Lock className="w-5 h-5 text-neutral-300" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-normal tracking-wide text-white">
              Private Preview
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans font-light max-w-xs mx-auto leading-relaxed">
              This portfolio is currently private while work in progress edits are being finalized.
            </p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            animate={isShaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-4 pt-2"
          >
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Enter password"
                autoFocus
                className="w-full px-4 py-3.5 pr-20 bg-neutral-900/90 border border-white/20 rounded-sm text-sm font-sans tracking-wider text-white placeholder-neutral-500 focus:outline-none focus:border-white/60 focus:ring-1 focus:ring-white/40 transition-all text-center"
              />

              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="submit"
                  disabled={!password}
                  className="p-1.5 bg-white text-black rounded-sm hover:bg-neutral-200 transition-colors disabled:opacity-30 disabled:hover:bg-white cursor-pointer"
                  title="Unlock portfolio"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-xs text-rose-400 font-sans tracking-wide"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <p className="text-[11px] text-neutral-500 font-sans tracking-widest uppercase pt-2">
              Production Design &bull; Art Direction &bull; Set Decoration
            </p>
          </motion.form>
        </motion.div>
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-10 text-center max-w-7xl mx-auto w-full">
        <div className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-sans">
          &copy; {new Date().getFullYear()} Saloni Porwal. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};
