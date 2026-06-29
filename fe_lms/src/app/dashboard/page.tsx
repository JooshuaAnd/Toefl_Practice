"use client";

import React from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { useAppStore } from "@/stores/useAppStore";
import {
  Headphones, FileText, BookOpen, Play, BarChart3,
  TrendingUp, ChevronRight, Clock, Sparkles, Target,
} from "lucide-react";
import Link from "next/link";

const dummyProgress = {
  listening: { percent: 72, label: "Intermediate", color: "bg-blue-500" },
  structure: { percent: 58, label: "Fundamental", color: "bg-purple-500" },
  reading: { percent: 85, label: "Advanced", color: "bg-emerald-500" },
};

const dummyStats = {
  materiSelesai: 24,
  soalDikerjakan: 847,
  simulasiSelesai: 3,
};

const dummyContinue = {
  title: "TOEFL Structure: Subject-Verb Agreement",
  progress: "12/20 completed",
  module: "Module 4 - Grammar",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { currentUser, subscription } = useAppStore();
  if (!currentUser) return null;

  const expiryDate = subscription?.expiryDate
    ? new Date(subscription.expiryDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
    : "N/A";

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Welcome Card */}
        <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.5 }}
          className="glass-card p-8 rounded-3xl hover:translate-y-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand-light/10 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="font-fustat text-3xl sm:text-4xl font-extrabold text-slate-900">
                Welcome, {currentUser.name}
              </h1>
              <p className="font-inter text-sm text-slate-400">
                Selamat datang kembali di platform TOEFL Preparation.
              </p>
            </div>
            <div className="glass-card p-4 rounded-2xl border border-brand-light/20 inline-flex items-center gap-3 hover:translate-y-0 flex-shrink-0">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-light to-brand-main flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Paket Aktif</p>
                <p className="font-fustat font-bold text-sm text-slate-800">
                  {subscription?.packageName ?? "Free"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Paket Aktif + Expiry */}
        <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.5, delay: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="glass-card p-5 rounded-2xl flex items-center gap-4 hover:translate-y-0">
            <div className="p-3 rounded-2xl bg-brand-main/10 text-brand-main">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Paket Aktif</p>
              <p className="font-fustat font-bold text-lg text-slate-800">{subscription?.packageName ?? "Free"}</p>
            </div>
          </div>
          <div className="glass-card p-5 rounded-2xl flex items-center gap-4 hover:translate-y-0">
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expiry Date</p>
              <p className="font-fustat font-bold text-lg text-slate-800">{expiryDate}</p>
            </div>
          </div>
        </motion.div>

        {/* Learning Progress */}
        <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-5">
          <h2 className="font-fustat text-xl font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-brand-main" />
            Learning Progress
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { key: "listening", label: "Listening Progress", icon: Headphones, data: dummyProgress.listening, iconBg: "bg-blue-50 text-blue-600" },
              { key: "structure", label: "Structure Progress", icon: FileText, data: dummyProgress.structure, iconBg: "bg-purple-50 text-purple-600" },
              { key: "reading", label: "Reading Progress", icon: BookOpen, data: dummyProgress.reading, iconBg: "bg-emerald-50 text-emerald-600" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.key} className="glass-card p-6 rounded-2xl space-y-4 hover:translate-y-0">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl ${item.iconBg} border border-white/50`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-2xl font-black text-slate-800">{item.data.percent}%</span>
                  </div>
                  <div>
                    <h3 className="font-fustat font-bold text-sm text-slate-800">{item.label}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.data.label}</p>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`${item.data.color} h-full rounded-full transition-all duration-700`} style={{ width: `${item.data.percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Continue Learning + Statistics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 glass-card p-6 rounded-2xl hover:translate-y-0">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-xl bg-brand-main text-white flex items-center justify-center shadow-md shadow-brand-main/20">
                <Play className="h-5 w-5 fill-white ml-0.5" />
              </div>
              <div>
                <h3 className="font-fustat font-bold text-slate-800">Continue Learning</h3>
                <p className="text-[11px] text-slate-400">Lanjutkan materi terakhir</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-brand-main/5 to-brand-light/5 border border-brand-main/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-brand-dark uppercase tracking-wider">{dummyContinue.module}</span>
                  <p className="font-fustat font-bold text-sm text-slate-800">{dummyContinue.title}</p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{dummyContinue.progress}</span>
                  </div>
                </div>
                <Link href="/my-learning" className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-brand-main text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-brand-main/15 hover:bg-brand-dark transition-all hover:scale-105 active:scale-95">
                  Lanjutkan
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-4">
                <div className="bg-brand-main h-full rounded-full" style={{ width: "60%" }} />
              </div>
            </div>
          </motion.div>

          {/* Statistics */}
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-5 glass-card p-6 rounded-2xl hover:translate-y-0">
            <h3 className="font-fustat font-bold text-slate-800 mb-5 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-brand-main" />
              Statistics
            </h3>
            <div className="space-y-4">
              {[
                { label: "Materi Selesai", value: dummyStats.materiSelesai, suffix: "materi", color: "bg-blue-50 text-blue-600" },
                { label: "Soal Dikerjakan", value: dummyStats.soalDikerjakan, suffix: "soal", color: "bg-purple-50 text-purple-600" },
                { label: "Simulasi Selesai", value: dummyStats.simulasiSelesai, suffix: "simulasi", color: "bg-amber-50 text-amber-600" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/50 border border-slate-100">
                  <span className="text-xs font-medium text-slate-500">{stat.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-fustat font-black text-lg text-slate-800">{stat.value}</span>
                    <span className="text-[10px] text-slate-400">{stat.suffix}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>


      </div>
    </DashboardLayout>
  );
}
