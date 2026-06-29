"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  LogOut,
  Building2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const SIDEBAR_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/company" },
  { label: "Participants", icon: Users, href: "/dashboard/company/participants" },
  { label: "Reports", icon: BarChart3, href: "/dashboard/company/reports" },
];

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("linguedu_user");
    if (!storedUser) {
      router.push("/signin");
    } else {
      setIsChecking(false);
    }
  }, [router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (isChecking || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white font-inter text-slate-500 gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-light to-brand-main text-white shadow-lg shadow-brand-main/20 animate-bounce">
          <Sparkles className="h-6 w-6 animate-pulse" />
        </div>
        <span className="text-sm font-semibold tracking-wide text-brand-dark animate-pulse">
          Loading Company Workspace...
        </span>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-white text-slate-900 selection:bg-brand-light/30 selection:text-brand-dark">
      <div className="bg-glow-container">
        <div className="bg-glow-1" />
        <div className="bg-glow-2" />
        <div className="bg-glow-3" />
        <div className="bg-grid-overlay" />
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-white/60 backdrop-blur-2xl border-r border-white/30 shadow-[4px_0_24px_-8px_rgba(0,132,255,0.06)] transition-all duration-300 flex flex-col ${
          sidebarOpen ? "w-64" : "w-[72px]"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className={`flex items-center h-[72px] px-4 border-b border-slate-100/80 ${sidebarOpen ? "justify-between" : "justify-center"}`}>
          {sidebarOpen ? (
            <>
              <Link href="/dashboard/company" className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-light to-brand-main text-white shadow-md shadow-brand-main/20">
                  <Building2 className="h-4.5 w-4.5" />
                </div>
                <span className="font-fustat text-lg font-bold bg-gradient-to-r from-slate-900 via-brand-dark to-brand-main bg-clip-text text-transparent">
                  LinguaCorp
                </span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="h-7 w-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors hidden lg:flex">
                <ChevronLeft className="h-4 w-4" />
              </button>
            </>
          ) : (
            <button onClick={() => setSidebarOpen(true)} className="h-9 w-9 rounded-xl bg-gradient-to-tr from-brand-light to-brand-main text-white shadow-md shadow-brand-main/20 flex items-center justify-center">
              <Building2 className="h-4.5 w-4.5" />
            </button>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-brand-main/10 to-brand-light/10 text-brand-dark font-semibold shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50/50"
                }`}
              >
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center transition-all ${
                  isActive
                    ? "bg-brand-main text-white shadow-sm shadow-brand-main/20"
                    : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
                }`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                {sidebarOpen && (
                  <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: user info + logout */}
        <div className={`border-t border-slate-100/80 p-3 ${sidebarOpen ? "" : "flex flex-col items-center"}`}>
          <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${sidebarOpen ? "" : "flex-col px-0"}`}>
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-brand-light to-brand-main text-white flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">{user.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={() => { logout(); router.push("/signin"); }}
              className="mt-2 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          )}
        </div>
      </aside>

      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-30 h-10 w-10 rounded-xl bg-white/80 backdrop-blur-md border border-slate-100 shadow-sm flex items-center justify-center lg:hidden"
      >
        <Menu className="h-5 w-5 text-slate-600" />
      </button>

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-[72px]"}`}>
        <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
