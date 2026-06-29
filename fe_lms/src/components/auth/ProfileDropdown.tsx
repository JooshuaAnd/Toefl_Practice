"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/stores/useAppStore";
import { useAuth } from "@/hooks/useAuth";
import { User, LogOut, Settings, BookOpen, LayoutDashboard, ChevronDown } from "lucide-react";

export const ProfileDropdown: React.FC = () => {
  const { currentUser: storeUser } = useAppStore();
  const { user: authUser } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentUser = storeUser || (authUser ? {
    id: authUser.email,
    role: (authUser.accountType || "individual") as "individual" | "company",
    name: authUser.name,
    email: authUser.email,
  } : null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    ["linguedu_selectedRole", "linguedu_selectedPackage", "linguedu_currentUser", "linguedu_subscription", "linguedu_user", "toefl_selected_package"].forEach((k) => localStorage.removeItem(k));
    setIsOpen(false);
    router.push("/");
  };

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  if (!currentUser) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 pl-2.5 pr-3.5 py-1.5 rounded-full border border-slate-100 hover:border-brand-light/35 bg-slate-50/50 hover:bg-white/60 transition-all duration-200 select-none"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-brand-light to-brand-main text-white flex items-center justify-center font-bold text-sm shadow-sm">
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
        <div className="hidden sm:flex flex-col items-start text-left">
          <span className="text-xs font-bold text-slate-800 font-inter leading-none">{currentUser.name}</span>
          <span className="text-[10px] text-slate-400 font-medium font-inter mt-0.5 capitalize">{currentUser.role}</span>
        </div>
        <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-3.5 w-56 origin-top-right rounded-2xl glass-card border border-white/40 shadow-xl overflow-hidden z-[100]"
          >
            <div className="px-4 py-3.5 border-b border-slate-100 bg-white/20">
              <p className="text-xs text-slate-400 font-medium">Logged in as</p>
              <p className="text-sm font-bold text-slate-800 truncate mt-0.5">{currentUser.email}</p>
            </div>

            <div className="p-1.5 space-y-1">
              <button onClick={() => handleNavigate(currentUser.role === "company" ? "/company/dashboard" : "/dashboard")}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-brand-dark rounded-xl hover:bg-brand-light/10 transition-colors">
                <LayoutDashboard className="h-4 w-4 text-slate-400" />
                <span>Dashboard</span>
              </button>
              <button onClick={() => handleNavigate("/practice")}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-brand-dark rounded-xl hover:bg-brand-light/10 transition-colors">
                <BookOpen className="h-4 w-4 text-slate-400" />
                <span>Practice Center</span>
              </button>
              <button onClick={() => handleNavigate("/account")}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-brand-dark rounded-xl hover:bg-brand-light/10 transition-colors">
                <Settings className="h-4 w-4 text-slate-400" />
                <span>Profile & Settings</span>
              </button>
            </div>

            <div className="p-1.5 border-t border-slate-100 bg-slate-50/20">
              <button onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-red-600 hover:text-red-700 rounded-xl hover:bg-red-50 transition-colors">
                <LogOut className="h-4 w-4 text-red-400" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ProfileDropdown;
