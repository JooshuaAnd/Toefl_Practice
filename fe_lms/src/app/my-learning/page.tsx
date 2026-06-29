"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { MATERIALS, type LearningMaterial } from "@/lib/constans";
import { usePackage } from "@/hooks/usePackage";
import { Headphones, FileText, BookOpen, Lock, Play, CheckCircle, Clock } from "lucide-react";

const categories = [
  { id: "listening", label: "Listening", icon: Headphones, color: "text-blue-600", bar: "bg-blue-500" },
  { id: "structure", label: "Structure", icon: FileText, color: "text-purple-600", bar: "bg-purple-500" },
  { id: "reading", label: "Reading", icon: BookOpen, color: "text-emerald-600", bar: "bg-emerald-500" },
];

const tierOrder: Record<string, number> = {
  free: 0,
  starter: 1,
  silver: 2,
  gold: 3,
  corporate: 3,
};

interface ProgressMap {
  [materialId: string]: {
    completedLessons: number;
    status: "completed" | "in-progress";
  };
}

function getStatus(material: LearningMaterial, userTier: number, progress: ProgressMap) {
  if (userTier < material.minTier) return "locked";
  const prog = progress[material.id];
  if (prog?.status === "completed") return "completed";
  if (prog?.status === "in-progress") return "in-progress";
  if (userTier >= material.minTier) return "in-progress";
  return "locked";
}

export default function MyLearningPage() {
  const { selectedPackage } = usePackage();
  const [activeTab, setActiveTab] = useState("listening");
  const [progress, setProgress] = useState<ProgressMap>({});

  const userTier = tierOrder[selectedPackage?.packageId?.toLowerCase() ?? "free"] ?? 0;

  useEffect(() => {
    const stored = localStorage.getItem("toefl_learning_progress");
    if (stored) setProgress(JSON.parse(stored));
  }, []);

  const filtered = MATERIALS.filter((m) => m.category === activeTab);

  const CategoryIcon = categories.find((c) => c.id === activeTab)?.icon;

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-fustat text-3xl sm:text-4xl font-extrabold text-slate-900">My Learning</h1>
          <p className="font-inter text-sm text-slate-400 mt-1">Lanjutkan belajar atau jelajahi materi baru.</p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const count = MATERIALS.filter((m) => m.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 flex-shrink-0 ${
                  activeTab === cat.id
                    ? "glass-button-primary text-white shadow-md shadow-brand-main/15"
                    : "glass-button text-slate-600 border border-slate-200 hover:border-brand-light/40"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{cat.label}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  activeTab === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Material Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((material) => {
            const status = getStatus(material, userTier, progress);
            const progData = progress[material.id];
            const pct = progData ? Math.round((progData.completedLessons / material.totalLessons) * 100) : (status === "in-progress" ? 0 : status === "completed" ? 100 : 0);
            const isLocked = status === "locked";

            return (
              <Link
                key={material.id}
                href={isLocked ? "#" : `/my-learning/${material.id}`}
                onClick={(e) => { if (isLocked) e.preventDefault(); }}
                className={`glass-card rounded-3xl overflow-hidden hover:translate-y-0 group transition-all duration-200 ${
                  isLocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {/* Thumbnail */}
                <div className={`relative h-36 ${material.thumbnailColor} flex items-center justify-center`}>
                  <span className="text-5xl select-none">{material.thumbnail}</span>
                  {isLocked && (
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="h-12 w-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center">
                        <Lock className="h-6 w-6 text-slate-400" />
                      </div>
                    </div>
                  )}
                  {status === "completed" && (
                    <div className="absolute top-3 right-3">
                      <div className="h-7 w-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                  {status === "in-progress" && !isLocked && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white/80 text-brand-dark border-white text-[10px] shadow-sm">
                        {pct}%
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className={`font-fustat font-bold text-sm ${isLocked ? "text-slate-400" : "text-slate-800"} group-hover:text-brand-dark transition-colors`}>
                    {material.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                    {material.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      <span>{material.duration}</span>
                    </div>
                    <span>{material.totalLessons} lessons</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        status === "completed" ? "bg-emerald-500" : isLocked ? "bg-slate-200" : "bg-brand-main"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  {/* Status label */}
                  <div className="flex items-center justify-between">
                    {isLocked ? (
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Lock className="h-3 w-3" /> Terkunci
                      </span>
                    ) : status === "completed" ? (
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> Completed
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-brand-main flex items-center gap-1">
                        <Play className="h-3 w-3 fill-brand-main" /> {pct > 0 ? "Lanjutkan" : "Mulai"}
                      </span>
                    )}
                    {pct > 0 && !isLocked && (
                      <span className="text-[10px] font-semibold text-slate-400">{pct}%</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>

        {/* Upgrade prompt if some materials locked */}
        {userTier < 3 && filtered.some((m) => m.minTier > userTier) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 rounded-2xl text-center space-y-3 hover:translate-y-0"
          >
            <p className="text-sm font-semibold text-slate-600">
              🔓 Upgrade paket untuk membuka semua materi {categories.find((c) => c.id === activeTab)?.label}
            </p>
            <Link
              href="/packages"
              className="inline-flex px-5 py-2.5 rounded-xl bg-brand-main text-white text-xs font-semibold shadow-md shadow-brand-main/15 hover:bg-brand-dark transition-all"
            >
              Lihat Paket
            </Link>
          </motion.div>
        )}

      </div>
    </DashboardLayout>
  );
}
