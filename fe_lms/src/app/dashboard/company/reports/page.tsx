"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  BarChart3,
  TrendingUp,
  Download,
  ArrowUpDown,
  Headphones,
  FileText,
  BookOpen,
} from "lucide-react";

interface ReportEntry {
  id: string;
  name: string;
  email: string;
  learningProgress: {
    listening: number;
    structure: number;
    reading: number;
  };
  overallProgress: number;
  simulationScore: number | null;
  lastActive: string;
  joinDate: string;
}

const reportData: ReportEntry[] = [
  {
    id: "1", name: "Ahmad Fauzi", email: "ahmad@example.com",
    learningProgress: { listening: 88, structure: 82, reading: 85 },
    overallProgress: 85, simulationScore: 520, lastActive: "2 hours ago", joinDate: "2026-01-15",
  },
  {
    id: "2", name: "Siti Nurhaliza", email: "siti@example.com",
    learningProgress: { listening: 95, structure: 90, reading: 92 },
    overallProgress: 92, simulationScore: 540, lastActive: "5 hours ago", joinDate: "2026-01-20",
  },
  {
    id: "3", name: "Budi Santoso", email: "budi@example.com",
    learningProgress: { listening: 70, structure: 60, reading: 65 },
    overallProgress: 65, simulationScore: 490, lastActive: "1 day ago", joinDate: "2026-02-01",
  },
  {
    id: "4", name: "Dewi Lestari", email: "dewi@example.com",
    learningProgress: { listening: 80, structure: 75, reading: 78 },
    overallProgress: 78, simulationScore: 505, lastActive: "1 day ago", joinDate: "2026-02-10",
  },
  {
    id: "5", name: "Rudi Hermawan", email: "rudi@example.com",
    learningProgress: { listening: 50, structure: 42, reading: 44 },
    overallProgress: 45, simulationScore: 475, lastActive: "3 days ago", joinDate: "2026-02-15",
  },
  {
    id: "6", name: "Maya Indah", email: "maya@example.com",
    learningProgress: { listening: 72, structure: 68, reading: 70 },
    overallProgress: 70, simulationScore: null, lastActive: "1 week ago", joinDate: "2026-03-01",
  },
  {
    id: "7", name: "Dimas Prayoga", email: "dimas@example.com",
    learningProgress: { listening: 35, structure: 30, reading: 34 },
    overallProgress: 33, simulationScore: null, lastActive: "2 weeks ago", joinDate: "2026-03-10",
  },
  {
    id: "8", name: "Ratna Dewi", email: "ratna@example.com",
    learningProgress: { listening: 90, structure: 85, reading: 88 },
    overallProgress: 88, simulationScore: 510, lastActive: "6 hours ago", joinDate: "2026-01-25",
  },
];

type SortKey = "name" | "overallProgress" | "simulationScore";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function getScoreColor(score: number | null): string {
  if (score === null) return "text-slate-400";
  if (score >= 500) return "text-emerald-600";
  if (score >= 450) return "text-brand-main";
  return "text-amber-600";
}

function getScoreBg(score: number | null): string {
  if (score === null) return "bg-slate-50 text-slate-400";
  if (score >= 500) return "bg-emerald-50 text-emerald-600";
  if (score >= 450) return "bg-blue-50 text-brand-main";
  return "bg-amber-50 text-amber-600";
}

function getProgressColor(percent: number): string {
  if (percent >= 80) return "bg-emerald-500";
  if (percent >= 50) return "bg-brand-main";
  return "bg-amber-500";
}

export default function ReportsPage() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(key === "name");
    }
  };

  const filtered = useMemo(() => {
    const data = reportData.filter(
      (r) =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase())
    );

    data.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "overallProgress") cmp = a.overallProgress - b.overallProgress;
      else if (sortKey === "simulationScore") {
        const sa = a.simulationScore ?? 0;
        const sb = b.simulationScore ?? 0;
        cmp = sa - sb;
      }
      return sortAsc ? cmp : -cmp;
    });

    return data;
  }, [search, sortKey, sortAsc]);

  const avgProgress = Math.round(
    filtered.reduce((sum, r) => sum + r.overallProgress, 0) / filtered.length
  );

  const avgScore = Math.round(
    filtered.filter((r) => r.simulationScore !== null).reduce((sum, r) => sum + (r.simulationScore ?? 0), 0) /
      filtered.filter((r) => r.simulationScore !== null).length
  );

  const SortIcon = ({ active, asc }: { active: boolean; asc: boolean }) => (
    <ArrowUpDown className={`h-3.5 w-3.5 inline-block ml-1 transition-colors ${active ? "text-brand-main" : "text-slate-300"}`} />
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-fustat text-3xl font-extrabold text-slate-900">Reports</h1>
          <p className="font-inter text-sm text-slate-400 mt-1">
            Track learning progress and simulation scores for all participants
          </p>
        </div>
        <button
          onClick={() => {
            const csv = [
              ["Nama", "Email", "Progress (%)", "Listening", "Structure", "Reading", "Simulasi", "Terakhir Aktif"].join(","),
              ...filtered.map((r) =>
                [r.name, r.email, r.overallProgress, r.learningProgress.listening, r.learningProgress.structure, r.learningProgress.reading, r.simulationScore ?? "-", r.lastActive].join(",")
              ),
            ].join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "participant-reports.csv";
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-main text-white text-xs font-semibold shadow-md shadow-brand-main/15 hover:bg-brand-dark transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          { label: "Avg Progress", value: `${avgProgress}%`, icon: TrendingUp, color: "bg-emerald-50 text-emerald-600", barColor: "bg-emerald-500", percent: avgProgress },
          { label: "Avg Simulation", value: filtered.filter((r) => r.simulationScore !== null).length > 0 ? avgScore.toString() : "-", icon: BarChart3, color: "bg-purple-50 text-purple-600", barColor: "bg-purple-500", percent: avgScore ? Math.round((avgScore / 540) * 100) : 0 },
          { label: "Total Participants", value: reportData.length.toString(), icon: Headphones, color: "bg-blue-50 text-blue-600", barColor: "bg-blue-500", percent: 100 },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} variants={fadeUp} className="glass-card p-5 rounded-2xl hover:translate-y-0">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${stat.color} border border-white/50`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-800">{stat.value}</p>
              <p className="text-xs font-medium text-slate-500 mt-0.5">{stat.label}</p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3">
                <div className={`${stat.barColor} h-full rounded-full transition-all duration-700`} style={{ width: `${stat.percent}%` }} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Search */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="relative max-w-md"
      >
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-slate-100 bg-white/60 focus:bg-white text-xs font-medium focus:ring-1 focus:ring-brand-main focus:outline-none transition-all"
        />
      </motion.div>

      {/* Reports Table */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ duration: 0.5, delay: 0.12 }}
        className="glass-card rounded-2xl overflow-hidden hover:translate-y-0"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-12">No</th>
                <th
                  className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => handleSort("name")}
                >
                  Nama Peserta
                  <SortIcon active={sortKey === "name"} asc={sortAsc} />
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Progress Belajar
                </th>
                <th
                  className="py-3.5 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider cursor-pointer select-none text-right"
                  onClick={() => handleSort("simulationScore")}
                >
                  Nilai Simulasi
                  <SortIcon active={sortKey === "simulationScore"} asc={sortAsc} />
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <BarChart3 className="h-8 w-8 text-slate-300" />
                      <p className="text-sm text-slate-400 font-medium">No data found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((entry, idx) => (
                  <tr
                    key={entry.id}
                    className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors"
                  >
                    <td className="py-4 px-4 text-xs text-slate-400 font-medium">{idx + 1}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-light to-brand-main text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0">
                          {entry.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-700">{entry.name}</p>
                          <p className="text-[11px] text-slate-400">{entry.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-2 min-w-[200px]">
                        {/* Overall */}
                        <div className="flex items-center gap-2.5">
                          <span className="text-[10px] font-medium text-slate-500 w-14 flex-shrink-0">Overall</span>
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${getProgressColor(entry.overallProgress)}`}
                              style={{ width: `${entry.overallProgress}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-bold text-slate-600 w-8 text-right">{entry.overallProgress}%</span>
                        </div>
                        {/* Category breakdown */}
                        <div className="flex items-center gap-2.5 pl-14">
                          <Headphones className="h-3 w-3 text-blue-400" />
                          <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className="bg-blue-400 h-full rounded-full" style={{ width: `${entry.learningProgress.listening}%` }} />
                          </div>
                          <span className="text-[10px] text-slate-400 w-8 text-right">{entry.learningProgress.listening}%</span>
                        </div>
                        <div className="flex items-center gap-2.5 pl-14">
                          <FileText className="h-3 w-3 text-purple-400" />
                          <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className="bg-purple-400 h-full rounded-full" style={{ width: `${entry.learningProgress.structure}%` }} />
                          </div>
                          <span className="text-[10px] text-slate-400 w-8 text-right">{entry.learningProgress.structure}%</span>
                        </div>
                        <div className="flex items-center gap-2.5 pl-14">
                          <BookOpen className="h-3 w-3 text-emerald-400" />
                          <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${entry.learningProgress.reading}%` }} />
                          </div>
                          <span className="text-[10px] text-slate-400 w-8 text-right">{entry.learningProgress.reading}%</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      {entry.simulationScore !== null ? (
                        <div className="inline-flex flex-col items-end">
                          <span className={`text-lg font-black ${getScoreColor(entry.simulationScore)}`}>
                            {entry.simulationScore}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full mt-0.5 ${getScoreBg(entry.simulationScore)}`}>
                            {entry.simulationScore >= 500 ? "Excellent" : entry.simulationScore >= 450 ? "Good" : "Needs Work"}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">Not taken yet</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Showing {filtered.length} of {reportData.length} entries
          </span>
          <span className="text-[11px] text-slate-400">
            Avg Score: {filtered.filter((r) => r.simulationScore !== null).length > 0 ? avgScore : "-"}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
