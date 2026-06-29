"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constans";
import { Sparkles, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ProfileDropdown } from "@/components/auth/ProfileDropdown";

export const Navbar: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const pathname = usePathname() || "";
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    return pathname === href;
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-[30px] left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="w-full max-w-5xl glass-nav rounded-[16px] px-6 py-3.5 flex items-center justify-between transition-transform duration-300 hover:scale-[1.01]">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-light to-brand-main text-white shadow-md shadow-brand-main/20 group-hover:rotate-6 transition-transform">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-fustat text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-brand-dark to-brand-main bg-clip-text text-transparent">
            TOEFL Prep
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`font-inter text-sm font-medium transition-colors duration-200 relative py-1 ${
                  active ? "text-brand-dark font-semibold" : "text-slate-600 hover:text-brand-dark"
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-main transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <ProfileDropdown />
          ) : (
            <>
              <Link
                href="/choose-account-type"
                className="font-inter text-sm font-medium text-slate-600 hover:text-brand-dark transition-colors"
              >
                Login
              </Link>
              <Link
                href="/choose-account-type"
                className="glass-button px-5 py-2 rounded-xl text-sm font-semibold text-brand-dark transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-brand-dark bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 transition-all active:scale-95"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[76px] left-4 right-4 glass-card rounded-2xl p-4 border border-white/30 shadow-xl z-40 md:hidden flex flex-col gap-2"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${
                  isActive(item.href)
                    ? "bg-brand-main/10 text-brand-dark"
                    : "text-slate-600 hover:bg-slate-50/50 hover:text-brand-dark"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {!isLoggedIn && (
              <div className="flex gap-2 pt-2 border-t border-slate-100 mt-2">
                <Link
                  href="/choose-account-type"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-center glass-button text-slate-700"
                >
                  Login
                </Link>
                <Link
                  href="/choose-account-type"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-center glass-button-primary text-white"
                >
                  Get Started
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
