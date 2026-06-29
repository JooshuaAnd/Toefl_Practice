"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import {
  Users,
  BarChart3,
  TrendingUp,
  Target,
  BookOpen,
  Award,
  Clock,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const companyStats = [
  {
    label: "Total Participants",
    value: "48",
    change: "+12 this month",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
    barColor: "bg-blue-500",
    percent: 100,
  },
  {
    label: "Avg Progress",
    value: "74%",
    change: "+5% from last month",
    icon: TrendingUp,
    color: "bg-emerald-50 text-emerald-600",
    barColor: "bg-emerald-500",
    percent: 74,
  },
  {
    label: "Avg Simulation Score",
    value: "85",
    change: "out of 120",
    icon: Target,
    color: "bg-purple-50 text-purple-600",
    barColor: "bg-purple-500",
    percent: 71,
  },
  {
    label: "Active This Week",
    value: "32",
    change: "66% participation rate",
    icon: Clock,
    color: "bg-amber-50 text-amber-600",
    barColor: "bg-amber-500",
    percent: 66,
  },
];

const recentActivity = [
  { name: "Ahmad Fauzi", action: "completed Listening Practice", time: "2 hours ago", score: "92%" },
  { name: "Siti Nurhaliza", action: "finished TOEFL Simulation", time: "5 hours ago", score: "540" },
  { name: "Budi Santoso", action: "started Structure Module 3", time: "1 day ago", score: null },
  { name: "Dewi Lestari", action: "completed Reading Practice", time: "1 day ago", score: "88%" },
  { name: "Rudi Hermawan", action: "submitted Writing Task", time: "2 days ago", score: "78%" },
];

const topPerformers = [
  { name: "Siti Nurhaliza", score: 540, rank: 1 },
  { name: "Ahmad Fauzi", score: 520, rank: 2 },
  { name: "Dewi Lestari", score: 505, rank: 3 },
  { name: "Budi Santoso", score: 490, rank: 4 },
  { name: "Rudi Hermawan", score: 475, rank: 5 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function CompanyDashboardPage() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="space-y-8">

      {/* Header */}
      <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-fustat text-3xl font-extrabold text-slate-900">
              Company Dashboard
            </h1>
            <p className="font-inter text-sm text-slate-400 mt-1">
              {user.institution || "Your Institution"} — Overview of team performance
            </p>
          </div>
          <Link
            href="/dashboard/company/participants"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-main text-white text-xs font-semibold shadow-md shadow-brand-main/15 hover:bg-brand-dark transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Users className="h-4 w-4" />
            Manage Participants
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {companyStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="glass-card p-5 rounded-2xl hover:translate-y-0"
            >
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Recent Activity */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-7 glass-card p-6 rounded-2xl hover:translate-y-0"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-fustat font-bold text-slate-800 flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand-main" />
              Recent Activity
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">Today</span>
          </div>

          <div className="space-y-2">
            {recentActivity.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-light to-brand-main text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                    {activity.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate">{activity.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{activity.action}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {activity.score && (
                    <span className="text-xs font-bold text-brand-dark">{activity.score}</span>
                  )}
                  <span className="text-[10px] text-slate-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/dashboard/company/reports"
            className="mt-4 flex items-center justify-center gap-1 text-xs font-semibold text-brand-main hover:text-brand-dark transition-colors py-2"
          >
            View Full Report
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        {/* Top Performers */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-5 glass-card p-6 rounded-2xl hover:translate-y-0"
        >
          <h3 className="font-fustat font-bold text-slate-800 flex items-center gap-2 mb-5">
            <Award className="h-5 w-5 text-brand-main" />
            Top Performers
          </h3>

          <div className="space-y-3">
            {topPerformers.map((p) => (
              <div
                key={p.rank}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50/50 transition-colors"
              >
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                  p.rank === 1
                    ? "bg-yellow-100 text-yellow-700"
                    : p.rank === 2
                    ? "bg-slate-100 text-slate-600"
                    : p.rank === 3
                    ? "bg-orange-100 text-orange-700"
                    : "bg-slate-50 text-slate-400"
                }`}>
                  #{p.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">{p.name}</p>
                </div>
                <span className="text-sm font-black text-slate-800">{p.score}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-brand-main/5 to-brand-light/5 border border-brand-main/10">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-brand-main text-white flex items-center justify-center shadow-sm shadow-brand-main/20">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700">Team Average</p>
                <p className="text-lg font-black text-slate-800">498</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-[10px] text-slate-400">Predicted TOEFL</p>
                <p className="text-xs font-semibold text-emerald-600">+12 vs last month</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Quick Actions */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <h2 className="font-fustat text-xl font-bold text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Add Participant", icon: Users, href: "/dashboard/company/participants", desc: "Register new team member", color: "bg-blue-50 text-blue-600" },
            { label: "View Reports", icon: BarChart3, href: "/dashboard/company/reports", desc: "Check progress & scores", color: "bg-purple-50 text-purple-600" },
            { label: "Browse Packages", icon: BookOpen, href: "/packages", desc: "Upgrade corporate plan", color: "bg-amber-50 text-amber-600" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="glass-card p-5 rounded-2xl flex items-center gap-4 hover:translate-y-0 group"
              >
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
