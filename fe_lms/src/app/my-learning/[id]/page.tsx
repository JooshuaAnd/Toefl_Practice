"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { MATERIALS, type LearningMaterial } from "@/lib/constans";
import { usePackage } from "@/hooks/usePackage";
import {
  ArrowLeft,
  Play,
  CheckCircle,
  Clock,
  Lock,
  Headphones,
  FileText,
  BookOpen,
  ChevronRight,
} from "lucide-react";

const categoryMeta = {
  listening: { icon: Headphones, color: "text-blue-600", bg: "bg-blue-50", bar: "bg-blue-500" },
  structure: { icon: FileText, color: "text-purple-600", bg: "bg-purple-50", bar: "bg-purple-500" },
  reading: { icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50", bar: "bg-emerald-500" },
};

const lessonDummy: Record<string, string[]> = {
  "listening-1": ["Introduction to Listening", "Main Ideas", "Supporting Details", "Signal Words", "Practice Quiz", "Review"],
  "listening-2": ["Lecture Structure", "Note-Taking Basics", "Key Terms", "Summarizing", "Practice Lecture 1", "Practice Lecture 2", "Review Quiz", "Final Review"],
  "listening-3": ["Understanding Tone", "Implied Meaning", "Speaker Intent", "Dialogue Practice", "Inference Quiz", "Review", "Final Test"],
  "listening-4": ["Scientific Vocabulary", "Abstract Concepts", "Data Interpretation", "Lecture Analysis", "Practice Set 1", "Practice Set 2", "Advanced Quiz", "Review", "Mastery Test", "Final Review"],
  "listening-5": ["Simulation Overview", "Section 1: Conversations", "Section 2: Lectures", "Section 3: Discussions", "Timed Practice", "Full Simulation", "Score Review", "Error Analysis", "Retake Strategy", "Performance Report", "Final Review", "Certificate Prep"],
  "structure-1": ["Basic Rules", "Compound Subjects", "Indefinite Pronouns", "Intervening Phrases", "Practice & Quiz"],
  "structure-2": ["Simple Tenses", "Perfect Tenses", "Progressive Forms", "Perfect Progressive", "Irregular Verbs", "Verb Consistency", "Practice Quiz", "Review"],
  "structure-3": ["Negative Adverbials", "Inversion Rules", "So/Such Constructions", "Conditional Inversions", "Practice Exercises", "Review Quiz"],
  "structure-4": ["Defining Clauses", "Non-Defining Clauses", "Relative Pronouns", "Modifier Placement", "Dangling Modifiers", "Practice Set", "Final Quiz"],
  "structure-5": ["Parallel Structure Rules", "Correlative Conjunctions", "Comparative Forms", "Superlative Forms", "Common Errors", "Practice Quiz", "Review"],
  "structure-6": ["Subjunctive Mood", "Wish/If Only", "Type 1 Conditionals", "Type 2 Conditionals", "Type 3 Conditionals", "Mixed Conditionals", "Advanced Practice", "Review Quiz", "Mastery Test"],
  "reading-1": ["Previewing Text", "Skimming Techniques", "Scanning for Details", "Keyword Recognition", "Practice Exercises"],
  "reading-2": ["Context Clues", "Word Families", "Affixes", "Inferring Meaning", "Practice Passages", "Review Quiz"],
  "reading-3": ["Identifying Thesis", "Topic Sentences", "Supporting Evidence", "Irrelevant Details", "Summarizing", "Practice Test", "Review"],
  "reading-4": ["Reading Between Lines", "Author's Tone", "Purpose Analysis", "Critical Reading", "Practice Set", "Inference Quiz", "Review"],
  "reading-5": ["Scientific Passages", "Historical Texts", "Data Dense Reading", "Abstract Concepts", "Timed Practice 1", "Timed Practice 2", "Comprehensive Quiz", "Review", "Final Test"],
  "reading-6": ["Simulation Overview", "Passage 1: Science", "Passage 2: History", "Passage 3: Social Science", "Timed Section", "Full Simulation", "Score Analysis", "Error Review", "Retake Prep", "Performance Summary", "Final Review", "Certificate"],
};

interface ProgressMap {
  [materialId: string]: {
    completedLessons: number;
    status: "completed" | "in-progress";
  };
}

export default function MaterialDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { selectedPackage } = usePackage();
  const [progress, setProgress] = useState<ProgressMap>({});

  const material = MATERIALS.find((m) => m.id === id);

  const tierOrder: Record<string, number> = { free: 0, starter: 1, silver: 2, gold: 3, corporate: 3 };
  const userTier = tierOrder[selectedPackage?.packageId?.toLowerCase() ?? "free"] ?? 0;

  useEffect(() => {
    const stored = localStorage.getItem("toefl_learning_progress");
    if (stored) setProgress(JSON.parse(stored));
  }, []);

  if (!material) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <p className="text-slate-400 font-semibold">Materi tidak ditemukan</p>
          <Link href="/my-learning" className="text-brand-dark text-sm hover:underline">Kembali ke My Learning</Link>
        </div>
      </DashboardLayout>
    );
  }

  const isLocked = userTier < material.minTier;
  const lessons = lessonDummy[material.id] ?? Array.from({ length: material.totalLessons }, (_, i) => `Lesson ${i + 1}`);
  const prog = progress[material.id];
  const completedCount = prog?.completedLessons ?? 0;
  const pct = Math.round((completedCount / material.totalLessons) * 100);
  const isCompleted = prog?.status === "completed";
  const meta = categoryMeta[material.category];
  const Icon = meta.icon;

  const handleMarkComplete = (lessonIdx: number) => {
    if (isLocked || isCompleted) return;
    const newCompleted = Math.max(completedCount, lessonIdx + 1);
    const newStatus: "completed" | "in-progress" = newCompleted >= material.totalLessons ? "completed" : "in-progress";
    const newProgress = {
      ...progress,
      [material.id]: { completedLessons: newCompleted, status: newStatus },
    };
    setProgress(newProgress);
    localStorage.setItem("toefl_learning_progress", JSON.stringify(newProgress));
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            href="/my-learning"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-brand-dark transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke My Learning
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 rounded-3xl hover:translate-y-0 relative overflow-hidden"
        >
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none -z-10 opacity-30 ${meta.bg}`} />

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className={`h-20 w-20 rounded-2xl ${meta.bg} flex items-center justify-center flex-shrink-0`}>
              <span className="text-4xl">{material.thumbnail}</span>
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${meta.color}`} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${meta.color}`}>
                  {material.category}
                </span>
                {isCompleted && (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Completed
                  </span>
                )}
                {isLocked && (
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Lock className="h-3 w-3" /> Terkunci
                  </span>
                )}
              </div>

              <h1 className="font-fustat text-2xl sm:text-3xl font-extrabold text-slate-900">
                {material.title}
              </h1>

              <p className="font-inter text-sm text-slate-500 max-w-xl">
                {material.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{material.duration}</span>
                </div>
                <span>{material.totalLessons} lessons</span>
                {!isLocked && (
                  <span>{completedCount} of {material.totalLessons} completed</span>
                )}
              </div>

              {!isLocked && (
                <div className="w-full max-w-md bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${isCompleted ? "bg-emerald-500" : "bg-brand-main"}`} style={{ width: `${pct}%` }} />
                </div>
              )}
            </div>

            {isLocked && (
              <Link
                href="/packages"
                className="flex-shrink-0 px-5 py-3 rounded-xl bg-brand-main text-white text-xs font-semibold shadow-md shadow-brand-main/15 hover:bg-brand-dark transition-all"
              >
                Upgrade Paket
              </Link>
            )}
          </div>
        </motion.div>

        {/* Lessons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="font-fustat text-xl font-bold text-slate-800">Daftar Pelajaran</h2>

          <div className="space-y-2">
            {lessons.map((lesson, idx) => {
              const isDone = idx < completedCount;
              const isCurrent = idx === completedCount && !isCompleted;
              return (
                <div
                  key={idx}
                  className={`glass-card p-4 rounded-2xl flex items-center justify-between hover:translate-y-0 transition-all ${
                    isCurrent ? "ring-1 ring-brand-main/30 border-brand-main/20" : ""
                  } ${isLocked ? "opacity-50" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-8 w-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                      isDone ? "bg-emerald-50 text-emerald-600" : isCurrent ? "bg-brand-main text-white" : "bg-slate-50 text-slate-400"
                    }`}>
                      {isDone ? <CheckCircle className="h-4 w-4" /> : idx + 1}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${isDone ? "text-slate-400 line-through" : "text-slate-700"}`}>
                        {lesson}
                      </p>
                      {isCurrent && <span className="text-[10px] font-bold text-brand-main">Lanjutkan</span>}
                    </div>
                  </div>

                  {!isLocked && !isDone && (
                    <button
                      onClick={() => handleMarkComplete(idx)}
                      className="px-3.5 py-1.5 rounded-xl bg-brand-main/10 text-brand-dark text-[10px] font-bold hover:bg-brand-main/20 transition-all"
                    >
                      Tandai Selesai
                    </button>
                  )}

                  {isLocked && (
                    <Lock className="h-4 w-4 text-slate-300" />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Start / Continue Button */}
        {!isLocked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={() => handleMarkComplete(completedCount)}
              className="w-full py-4 rounded-2xl bg-brand-main text-white font-semibold text-sm shadow-lg shadow-brand-main/20 hover:bg-brand-dark transition-all flex items-center justify-center gap-2"
            >
              <Play className="h-4 w-4 fill-white" />
              {isCompleted ? "Review Materi" : completedCount > 0 ? "Lanjutkan Belajar" : "Mulai Belajar"}
            </button>
          </motion.div>
        )}

      </div>
    </DashboardLayout>
  );
}
