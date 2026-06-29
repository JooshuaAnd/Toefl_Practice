"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/stores/useAppStore";
import {
  Users, BarChart3, TrendingUp, Target, BookOpen, Award, Clock, ChevronRight, Sparkles, Building2,
} from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function CompanyDashboardPage() {
  const { currentUser, subscription } = useAppStore();
  if (!currentUser) return null;

  const menuItems = [
    { label: "Participants", icon: Users, href: "/company/dashboard/participants", desc: "Manage team members", color: "bg-blue-50 text-blue-600" },
    { label: "Reports", icon: BarChart3, href: "/company/dashboard/reports", desc: "Check progress & scores", color: "bg-purple-50 text-purple-600" },
    { label: "Profile", icon: Award, href: "/account", desc: "Company settings", color: "bg-rose-50 text-rose-600" },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-brand-main/10 text-brand-main">
                <Building2 className="h-6 w-6" />
              </div>
              <h1 className="font-fustat text-3xl font-extrabold text-slate-900">{currentUser.companyName || "Company Dashboard"}</h1>
            </div>
            <p className="font-inter text-sm text-slate-400 mt-1">Overview of team performance</p>
          </div>
          <Link href="/company/dashboard/participants"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-main text-white text-xs font-semibold shadow-md shadow-brand-main/15 hover:bg-brand-dark transition-all hover:scale-[1.02] active:scale-[0.98]">
            <Users className="h-4 w-4" />
            Manage Participants
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div initial="hidden" animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Total Seat", value: subscription?.packageName === "Enterprise" ? "∞" : "10", change: "Based on package", icon: Users, color: "bg-blue-50 text-blue-600", barColor: "bg-blue-500", percent: 100 },
          { label: "Used Seat", value: "4", change: "40% utilization", icon: Target, color: "bg-amber-50 text-amber-600", barColor: "bg-amber-500", percent: 40 },
          { label: "Remaining Seat", value: "6", change: "Available to assign", icon: Clock, color: "bg-emerald-50 text-emerald-600", barColor: "bg-emerald-500", percent: 60 },
          { label: "Average Score", value: "498", change: "+12 vs last month", icon: TrendingUp, color: "bg-purple-50 text-purple-600", barColor: "bg-purple-500", percent: 71 },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} variants={fadeUp} className="glass-card p-5 rounded-2xl hover:translate-y-0">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${stat.color} border border-white/50`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-800">{stat.value}</p>
              <p className="text-xs font-medium text-slate-500 mt-0.5">{stat.label}</p>
              <p className="text-[10px] text-slate-400 mt-1">{stat.change}</p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3">
                <div className={`${stat.barColor} h-full rounded-full transition-all duration-700`} style={{ width: `${stat.percent}%` }} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Paket Aktif */}
      <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-card p-6 rounded-2xl hover:translate-y-0">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-brand-main/10 text-brand-main">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Paket Aktif</p>
            <p className="font-fustat text-2xl font-extrabold text-slate-900">{subscription?.packageName ?? "No Active Package"}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400">Expiry</p>
            <p className="text-xs font-bold text-slate-700">
              {subscription?.expiryDate
                ? new Date(subscription.expiryDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
                : "N/A"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Menu */}
      <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }}>
        <h2 className="font-fustat text-xl font-bold text-slate-800 mb-4">Quick Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href}
                className="glass-card p-5 rounded-2xl flex items-center gap-4 hover:translate-y-0 group">
                <div className={`p-3 rounded-2xl ${item.color} border border-white/50 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-fustat font-bold text-sm text-slate-800">{item.label}</p>
                  <p className="text-[11px] text-slate-400">{item.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
