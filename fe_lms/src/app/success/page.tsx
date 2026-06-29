"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MainLayout } from "@/layouts/MainLayout";
import { Sparkles, Check, ArrowRight, Package, User, Mail, Calendar } from "lucide-react";
import Link from "next/link";
import { fadeIn } from "@/lib/motion";

interface UserData {
  fullName: string;
  email: string;
  package: {
    packageName: string;
    price: string;
  };
  registeredAt: string;
}

export default function SuccessPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("toefl_user");
    if (!stored) {
      router.push("/packages");
      return;
    }
    setUserData(JSON.parse(stored));
  }, [router]);

  if (!userData) return null;

  const date = new Date(userData.registeredAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <MainLayout>
      <div className="min-h-screen w-full flex flex-col justify-center items-center py-12 px-4">
        <motion.div
          variants={fadeIn("up", 0.1, 0.6)}
          initial="hidden"
          animate="show"
          className="w-full max-w-lg flex flex-col items-center space-y-8"
        >
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center"
          >
            <Check className="h-10 w-10 text-emerald-600" />
          </motion.div>

          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="font-fustat text-4xl font-extrabold text-slate-900 tracking-tight">
              Registration Successful!
            </h1>
            <p className="font-inter text-sm text-slate-500 max-w-sm mx-auto">
              Welcome to TOEFL Prep, {userData.fullName}! Your account has been created and your package is ready.
            </p>
          </div>

          {/* Summary card */}
          <motion.div
            variants={fadeIn("up", 0.3, 0.6)}
            initial="hidden"
            animate="show"
            className="w-full glass-card rounded-3xl p-6 border border-white/40 space-y-5 hover:translate-y-0"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-light to-brand-main flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-fustat font-bold text-slate-800">Account Summary</h2>
                <p className="text-[11px] text-slate-400">Your registration details</p>
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-lg bg-brand-light/10 flex items-center justify-center text-brand-dark">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Name</p>
                  <p className="font-semibold text-slate-700 text-sm">{userData.fullName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-lg bg-brand-light/10 flex items-center justify-center text-brand-dark">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</p>
                  <p className="font-semibold text-slate-700 text-sm">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-lg bg-brand-light/10 flex items-center justify-center text-brand-dark">
                  <Package className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Package</p>
                  <p className="font-semibold text-slate-700 text-sm">{userData.package.packageName} &middot; {userData.package.price}/month</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-lg bg-brand-light/10 flex items-center justify-center text-brand-dark">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registered</p>
                  <p className="font-semibold text-slate-700 text-sm">{formattedDate}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            variants={fadeIn("up", 0.4, 0.6)}
            initial="hidden"
            animate="show"
            className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <Link
              href="/dashboard"
              className="flex-1 glass-button-primary px-6 py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-brand-main/20"
            >
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/packages"
              className="flex-1 glass-button px-6 py-3.5 rounded-xl font-semibold text-slate-700 flex items-center justify-center gap-2 border border-slate-200"
            >
              View Packages
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
