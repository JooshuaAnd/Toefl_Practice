"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore, CurrentUser } from "@/stores/useAppStore";
import { AuthNavbar } from "@/components/navbar/AuthNavbar";
import { Sparkles } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const currentUser = useAppStore((s) => s.currentUser);
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [fallbackUser, setFallbackUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const cu = localStorage.getItem("linguedu_currentUser");
    if (cu) {
      setIsChecking(false);
      return;
    }

    const legacy = localStorage.getItem("linguedu_user");
    if (legacy) {
      const p = JSON.parse(legacy);
      setFallbackUser({
        id: p.email,
        role: p.accountType || "individual",
        name: p.name,
        email: p.email,
      });
      setIsChecking(false);
      return;
    }

    router.push("/choose-account-type");
  }, [router]);

  const effectiveUser = currentUser || fallbackUser;

  if (isChecking || !effectiveUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white font-inter text-slate-500 gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-light to-brand-main text-white shadow-lg shadow-brand-main/20 animate-bounce">
          <Sparkles className="h-6 w-6 animate-pulse" />
        </div>
        <span className="text-sm font-semibold tracking-wide text-brand-dark animate-pulse">
          Loading LinguEdu Workspace...
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
      <AuthNavbar />
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        <main className="flex-grow pt-32 pb-20 px-4 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
