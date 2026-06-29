"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, BookOpen, Headphones, Compass, Award, User } from "lucide-react";
import { ProfileDropdown } from "@/components/auth/ProfileDropdown";
import { useAuth } from "@/hooks/useAuth";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const INDIVIDUAL_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/dashboard" },
  { label: "Learning", href: "/my-learning", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Practice", href: "/practice", icon: <Headphones className="h-4 w-4" /> },
  { label: "Simulation", href: "/simulation", icon: <Compass className="h-4 w-4" /> },
  { label: "Certificate", href: "/account", icon: <Award className="h-4 w-4" /> },
  { label: "Profile", href: "/account", icon: <User className="h-4 w-4" /> },
];

const AUTH_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/dashboard" },
  { label: "Practice", href: "/practice" },
  { label: "Account", href: "/account" },
];

export const AuthNavbar: React.FC = () => {
  const { user } = useAuth();
  const pathname = usePathname() || "";
  const [isOpen, setIsOpen] = useState(false);

  const navItems = user?.accountType === "individual" ? INDIVIDUAL_NAV_ITEMS : AUTH_NAV_ITEMS;

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="w-full max-w-5xl glass-nav rounded-[20px] px-6 py-3.5 flex items-center justify-between transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_8px_32px_rgba(49,154,255,0.12)]">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-light to-brand-main text-white shadow-md shadow-brand-main/20 group-hover:rotate-6 transition-transform">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-fustat text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-brand-dark to-brand-main bg-clip-text text-transparent">
            LinguEdu
          </span>
        </Link>

        {/* Navigation Items (Desktop) */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors duration-200 relative rounded-lg ${
                  isActive
                    ? "text-brand-dark font-semibold bg-brand-main/5"
                    : "text-slate-500 hover:text-brand-dark hover:bg-slate-50/50"
                }`}
              >
                {item.icon}
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="activeAuthNav"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-main rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button / Profile dropdown */}
        <div className="hidden md:flex items-center gap-4">
          <ProfileDropdown />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <ProfileDropdown />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-600 hover:text-brand-dark bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 transition-all active:scale-95"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[76px] left-4 right-4 glass-card rounded-2xl p-4 border border-white/30 shadow-xl z-40 md:hidden flex flex-col gap-1"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-brand-main/10 text-brand-dark"
                      : "text-slate-600 hover:bg-slate-50/50 hover:text-brand-dark"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default AuthNavbar;
