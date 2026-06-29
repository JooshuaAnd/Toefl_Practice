"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { PRACTICE_SETS } from "@/data/practice";
import { Headphones, FileText, BookOpen, ChevronRight, Clock } from "lucide-react";

const categories = [
  { id: "listening" as const, label: "Listening", icon: Headphones, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", count: 2 },
  { id: "structure" as const, label: "Structure", icon: FileText, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100", count: 2 },
  { id: "reading" as const, label: "Reading", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", count: 2 },
];

export default function PracticePage() {
  const [activeTab, setActiveTab] = useState<string>("listening");

  const filteredSets = PRACTICE_SETS.filter((s) => s.category === activeTab);
  const activeCat = categories.find((c) => c.id === activeTab);

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-fustat text-3xl sm:text-4xl font-extrabold text-slate-900">Practice</h1>
          <p className="font-inter text-sm text-slate-400 mt-1">Pilih kategori dan set soal untuk memulai latihan.</p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex gap-3 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all flex-shrink-0 ${
                  activeTab === cat.id
                    ? "glass-button-primary text-white shadow-md"
                    : "glass-button text-slate-600 border border-slate-200 hover:border-brand-light/40"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{cat.label}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  activeTab === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Set grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredSets.map((set, idx) => {
            const Icon = activeCat?.icon ?? Headphones;
            return (
              <Link
                key={set.id}
                href={`/practice/${set.category}/${set.id}`}
                className="glass-card p-6 rounded-2xl hover:translate-y-0 group transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${activeCat?.bg} ${activeCat?.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-brand-main transition-colors" />
                </div>

                <h3 className="font-fustat font-bold text-sm text-slate-800 group-hover:text-brand-dark transition-colors">
                  {set.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1.5 mb-4">{set.description}</p>

                <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium">
                  <span>{set.questionCount} questions</span>
                </div>
              </Link>
            );
          })}
        </motion.div>

        {/* Stats summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5 rounded-2xl flex items-center justify-between hover:translate-y-0"
        >
          <span className="text-xs text-slate-500">Total tersedia</span>
          <div className="flex items-center gap-6 text-xs font-semibold">
            <span className="text-blue-600">{PRACTICE_SETS.filter(s => s.category === "listening").reduce((a, s) => a + s.questionCount, 0)} Listening</span>
            <span className="text-purple-600">{PRACTICE_SETS.filter(s => s.category === "structure").reduce((a, s) => a + s.questionCount, 0)} Structure</span>
            <span className="text-emerald-600">{PRACTICE_SETS.filter(s => s.category === "reading").reduce((a, s) => a + s.questionCount, 0)} Reading</span>
          </div>
        </motion.div>

      </div>
    </DashboardLayout>
  );
}
