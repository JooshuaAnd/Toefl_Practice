"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import {
  Headphones, FileText, BookOpen, Play, Clock, CheckCircle, XCircle,
  ArrowRight, ChevronLeft, ChevronRight, BarChart3, Lightbulb, Target,
  AlertTriangle, Award, Sparkles, RotateCcw, Send,
} from "lucide-react";
import Link from "next/link";

const sections = [
  { id: "listening", label: "Listening", icon: Headphones, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", duration: "25 min", questions: 8 },
  { id: "structure", label: "Structure", icon: FileText, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100", duration: "20 min", questions: 8 },
  { id: "reading", label: "Reading", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", duration: "30 min", questions: 8 },
];

const allQuestions = [
  // LISTENING (8 questions)
  { id: 1, section: "listening", question: "What is the lecture mainly about?", options: ["The water cycle", "Plate tectonics", "Photosynthesis process", "Ocean currents"], correct: 2 },
  { id: 2, section: "listening", question: "Why does the professor mention chloroplasts?", options: ["To explain plant cell structure", "To describe where photosynthesis occurs", "To compare plant and animal cells", "To introduce a lab experiment"], correct: 1 },
  { id: 3, section: "listening", question: "What can be inferred about the speaker's view on renewable energy?", options: ["It is too expensive", "It is the only solution", "It needs more research", "It is immediately viable"], correct: 2 },
  { id: 4, section: "listening", question: "What does the professor say about the实验 results?", options: ["They were inconclusive", "They supported the hypothesis", "They contradicted previous studies", "They need to be replicated"], correct: 1 },
  { id: 5, section: "listening", question: "According to the discussion, what is a key feature of Romantic poetry?", options: ["Emphasis on reason", "Focus on emotion and nature", "Use of strict meter", "Political themes"], correct: 1 },
  { id: 6, section: "listening", question: "What is the student's main concern?", options: ["The assignment deadline", "Understanding the theory", "Choosing a research topic", "Finding enough sources"], correct: 2 },
  { id: 7, section: "listening", question: "What does the speaker imply about urbanization?", options: ["It has only negative effects", "It creates economic opportunities", "It is slowing down globally", "It affects rural areas equally"], correct: 1 },
  { id: 8, section: "listening", question: "What does the professor suggest the student do?", options: ["Drop the course", "Visit office hours", "Form a study group", "Read the textbook again"], correct: 2 },

  // STRUCTURE (8 questions)
  { id: 9, section: "structure", question: "The committee ______ to approve the budget next week.", options: ["is expected", "are expected", "expect", "expecting"], correct: 0 },
  { id: 10, section: "structure", question: "______ his illness, he completed the project on time.", options: ["Because", "Despite", "Although", "However"], correct: 1 },
  { id: 11, section: "structure", question: "The professor insisted that every student ______ the assignment.", options: ["completes", "complete", "completed", "completing"], correct: 1 },
  { id: 12, section: "structure", question: "Seldom ______ such a remarkable performance.", options: ["we have seen", "have we seen", "we saw", "did we see"], correct: 1 },
  { id: 13, section: "structure", question: "The data ______ carefully analyzed before publication.", options: ["was", "were", "has been", "have been"], correct: 1 },
  { id: 14, section: "structure", question: "Not only ______ the exam, but he also scored the highest.", options: ["he passed", "passed he", "did he pass", "he did pass"], correct: 2 },
  { id: 15, section: "structure", question: "The theory ______ by Dr. Smith is widely accepted.", options: ["propose", "proposing", "proposed", "proposes"], correct: 2 },
  { id: 16, section: "structure", question: "______ the budget cuts, the program continued.", options: ["In spite", "Despite of", "Despite", "Although"], correct: 2 },

  // READING (8 questions)
  { id: 17, section: "reading", question: "According to the passage, what is the primary cause of climate change?", options: ["Volcanic activity", "Industrial emissions", "Solar radiation", "Deforestation only"], correct: 1 },
  { id: 18, section: "reading", question: "The word 'mitigate' in paragraph 2 is closest in meaning to:", options: ["worsen", "reduce", "accelerate", "ignore"], correct: 1 },
  { id: 19, section: "reading", question: "Which of the following is NOT mentioned as an effect of global warming?", options: ["Rising sea levels", "Extreme weather", "Soil erosion", "Species extinction"], correct: 2 },
  { id: 20, section: "reading", question: "The author's tone can best be described as:", options: ["Optimistic", "Alarming", "Neutral", "Humorous"], correct: 1 },
  { id: 21, section: "reading", question: "What can be inferred from the last paragraph?", options: ["Solutions are unaffordable", "Immediate action is needed", "Technology will solve everything", "The situation is hopeless"], correct: 1 },
  { id: 22, section: "reading", question: "The passage suggests that renewable energy:", options: ["Is fully developed", "Requires further innovation", "Is too costly", "Has been abandoned"], correct: 1 },
  { id: 23, section: "reading", question: "What does the author say about international cooperation?", options: ["It is unnecessary", "It is essential for progress", "It has failed completely", "It only benefits rich nations"], correct: 1 },
  { id: 24, section: "reading", question: "Which best summarizes the main idea of the passage?", options: ["Climate change is a complex global challenge requiring urgent action", "Technology alone can solve environmental problems", "Climate change effects are exaggerated", "Individual actions are meaningless"], correct: 0 },
];

const sectionQuestions = (sectionId: string) => allQuestions.filter(q => q.section === sectionId);

// Dummy results for after completion
const generateResults = (answers: Record<number, number>) => {
  const sections_data = ["listening", "structure", "reading"].map((sec) => {
    const qs = allQuestions.filter(q => q.section === sec);
    let correct = 0;
    qs.forEach(q => { if (answers[q.id] === q.correct) correct++; });
    const score = Math.round((correct / qs.length) * 30);
    return { section: sec, correct, total: qs.length, score, percent: Math.round((correct / qs.length) * 100) };
  });

  const totalCorrect = sections_data.reduce((a, s) => a + s.correct, 0);
  const totalQuestions = sections_data.reduce((a, s) => a + s.total, 0);
  const predictedTOEFL = Math.round((totalCorrect / totalQuestions) * 120);

  const listeningScore = sections_data[0].score;
  const structureScore = sections_data[1].score;
  const readingScore = sections_data[2].score;

  const sorted = [...sections_data].sort((a, b) => b.percent - a.percent);
  const strength = sorted[0];
  const weakness = sorted[sorted.length - 1];

  const recommendations: Record<string, string> = {
    listening: "Perbanyak latihan listening dengan materi akademik dan catat kata kunci saat mendengarkan.",
    structure: "Pelajari kembali aturan tata bahasa dasar seperti subject-verb agreement dan inversion.",
    reading: "Tingkatkan kecepatan membaca dengan teknik skimming dan scanning pada teks akademik.",
  };

  return {
    sections: sections_data,
    totalCorrect,
    totalQuestions,
    predictedTOEFL,
    listeningScore,
    structureScore,
    readingScore,
    strength: { name: strength.section, label: strength.section === "listening" ? "Listening" : strength.section === "structure" ? "Structure" : "Reading", score: strength.score, percent: strength.percent },
    weakness: { name: weakness.section, label: weakness.section === "listening" ? "Listening" : weakness.section === "structure" ? "Structure" : "Reading", score: weakness.score, percent: weakness.percent },
    recommendation: recommendations[weakness.section],
  };
};

type Phase = "overview" | "quiz" | "result";

export default function SimulationPage() {
  const [phase, setPhase] = useState<Phase>("overview");
  const [sectionIdx, setSectionIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const currentSection = sections[sectionIdx];
  const questions = sectionQuestions(currentSection.id);
  const question = questions[qIdx];
  const isLastQuestion = sectionIdx === sections.length - 1 && qIdx === questions.length - 1;
  const isLastInSection = qIdx === questions.length - 1;

  const results = useMemo(() => generateResults(answers), [answers]);

  const handleSelect = (optIdx: number) => {
    setAnswers({ ...answers, [question.id]: optIdx });
  };

  const handleNext = () => {
    if (isLastInSection) {
      if (sectionIdx < sections.length - 1) {
        setSectionIdx(sectionIdx + 1);
        setQIdx(0);
      }
    } else {
      setQIdx(qIdx + 1);
    }
  };

  const handlePrev = () => {
    if (qIdx > 0) {
      setQIdx(qIdx - 1);
    } else if (sectionIdx > 0) {
      const prevSection = sections[sectionIdx - 1];
      const prevQuestions = sectionQuestions(prevSection.id);
      setSectionIdx(sectionIdx - 1);
      setQIdx(prevQuestions.length - 1);
    }
  };

  const handleFinish = () => {
    setPhase("result");
  };

  const handleRetry = () => {
    setAnswers({});
    setSectionIdx(0);
    setQIdx(0);
    setPhase("overview");
  };

  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = allQuestions.length;

  // === OVERVIEW ===
  if (phase === "overview") {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-light to-brand-main flex items-center justify-center mx-auto shadow-lg shadow-brand-main/20">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h1 className="font-fustat text-4xl sm:text-5xl font-extrabold text-slate-900">TOEFL Simulation</h1>
            <p className="font-inter text-sm text-slate-500 max-w-lg mx-auto">
              Simulasi TOEFL lengkap dengan 3 sesi. Selesaikan semua bagian untuk melihat skor prediktif dan analisis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.map((sec, idx) => {
              const Icon = sec.icon;
              const qs = sectionQuestions(sec.id);
              return (
                <motion.div key={sec.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }} className="glass-card p-6 rounded-2xl space-y-4 hover:translate-y-0">
                  <div className={`p-3 rounded-xl w-fit ${sec.bg} ${sec.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-fustat font-bold text-lg text-slate-800">{sec.label}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1"><FileText className="h-3.5 w-3.5" /> {qs.length} soal</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {sec.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-emerald-600">Ready</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-center">
            <button onClick={() => setPhase("quiz")} className="px-10 py-4 rounded-2xl bg-brand-main text-white font-semibold text-sm shadow-xl shadow-brand-main/20 hover:bg-brand-dark transition-all flex items-center gap-2 mx-auto hover:scale-105 active:scale-95">
              <Play className="h-5 w-5 fill-white" />
              Mulai Simulasi
            </button>
            <p className="text-[10px] text-slate-400 mt-3">Total: {totalQuestions} soal &middot; ±75 menit</p>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  // === QUIZ ===
  if (phase === "quiz") {
    const answeredCount = Object.keys(answers).filter(k => parseInt(k) >= allQuestions[0].id && parseInt(k) <= allQuestions[allQuestions.length - 1].id).length;
    const allAnsweredCurrentSection = questions.every(q => answers[q.id] !== undefined);

    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Progress header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {sections.map((sec, idx) => {
                const Icon = sec.icon;
                const isActive = idx === sectionIdx;
                const isDone = idx < sectionIdx;
                return (
                  <div key={sec.id} className={`flex items-center gap-2 ${idx > 0 ? "ml-2" : ""}`}>
                    {idx > 0 && <div className={`h-px w-4 ${isDone ? "bg-brand-main" : "bg-slate-200"}`} />}
                    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-bold ${
                      isActive ? "bg-brand-main text-white" : isDone ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400"
                    }`}>
                      <Icon className="h-3 w-3" />
                      <span>{sec.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <span className="text-[10px] font-medium text-slate-400">{answeredCount}/{totalQuestions}</span>
          </div>

          {/* Global progress */}
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-brand-main h-full rounded-full transition-all" style={{ width: `${(answeredCount / totalQuestions) * 100}%` }} />
          </div>

          {/* Section label */}
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${currentSection.bg} ${currentSection.color}`}>
              Section {sectionIdx + 1}: {currentSection.label}
            </span>
            <span className="text-[10px] text-slate-400">Question {qIdx + 1} of {questions.length}</span>
          </div>

          {/* Question card */}
          <AnimatePresence mode="wait">
            <motion.div key={question.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-8 rounded-3xl hover:translate-y-0">
              <div className="space-y-6">
                <p className="font-fustat text-lg font-bold text-slate-800 leading-relaxed">{question.question}</p>
                <div className="space-y-3">
                  {question.options.map((opt, idx) => {
                    const selected = answers[question.id] === idx;
                    return (
                      <button key={opt} onClick={() => handleSelect(idx)}
                        className={`w-full text-left p-4 rounded-2xl text-sm font-medium border transition-all flex items-center gap-4 ${
                          selected ? "bg-brand-main/10 border-brand-main text-brand-dark font-semibold" : "bg-white/50 border-slate-100 text-slate-600 hover:border-brand-light/40 hover:bg-white"
                        }`}>
                        <span className={`h-7 w-7 rounded-xl flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${selected ? "bg-brand-main text-white" : "bg-slate-100 text-slate-400"}`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button onClick={handlePrev} disabled={sectionIdx === 0 && qIdx === 0}
              className="px-5 py-3 rounded-2xl glass-button text-xs font-semibold text-slate-600 border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all">
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>

            {isLastQuestion ? (
              <button onClick={handleFinish}
                className="px-5 py-3 rounded-2xl bg-brand-main text-white text-xs font-semibold shadow-md shadow-brand-main/15 flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all">
                <Send className="h-3.5 w-3.5" /> Finish Simulation
              </button>
            ) : (
              <button onClick={handleNext}
                className="px-5 py-3 rounded-2xl glass-button text-xs font-semibold text-slate-600 border border-slate-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all">
                Next <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Question dots */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {allQuestions.map((q, idx) => {
              const isCurrent = q.id === question.id;
              const answered = answers[q.id] !== undefined;
              return (
                <button key={q.id} onClick={() => {
                  const qSectionIdx = sections.findIndex(s => s.id === q.section);
                  const qIdxInSection = sectionQuestions(q.section).findIndex(x => x.id === q.id);
                  setSectionIdx(qSectionIdx);
                  setQIdx(qIdxInSection);
                }}
                  className={`h-2 rounded-full transition-all ${isCurrent ? "w-6 bg-brand-main" : answered ? "w-2 bg-brand-light" : "w-2 bg-slate-200"}`}
                />
              );
            })}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // === RESULTS ===
  const r = results;
  const getGradeColor = (pct: number) => pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-blue-600" : "text-amber-600";
  const getGradeBg = (pct: number) => pct >= 80 ? "bg-emerald-50" : pct >= 60 ? "bg-blue-50" : "bg-amber-50";

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-5">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-brand-light to-brand-main flex items-center justify-center mx-auto shadow-lg shadow-brand-main/20">
            <Award className="h-10 w-10 text-white" />
          </div>
          <h1 className="font-fustat text-3xl sm:text-4xl font-extrabold text-slate-900">Simulation Complete!</h1>
          <p className="font-inter text-sm text-slate-500">Berikut hasil simulasi TOEFL Anda.</p>
        </motion.div>

        {/* Predicted TOEFL Score */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass-card p-8 rounded-3xl text-center hover:translate-y-0 bg-gradient-to-br from-brand-main/5 to-brand-light/5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Predicted TOEFL Score</p>
          <p className="font-fustat text-6xl sm:text-7xl font-black bg-gradient-to-r from-brand-dark via-brand-main to-brand-light bg-clip-text text-transparent">
            {r.predictedTOEFL}
          </p>
          <p className="text-xs text-slate-400 mt-1">out of 120</p>
          <div className="flex justify-center gap-6 mt-6 text-xs font-medium text-slate-400">
            <span>L: {r.listeningScore}/30</span>
            <span>S: {r.structureScore}/30</span>
            <span>R: {r.readingScore}/30</span>
          </div>
        </motion.div>

        {/* Section Scores */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {r.sections.map((sec) => {
            const meta = sections.find(s => s.id === sec.section)!;
            const Icon = meta.icon;
            return (
              <div key={sec.section} className={`glass-card p-5 rounded-2xl text-center hover:translate-y-0 ${getGradeBg(sec.percent)}`}>
                <Icon className={`h-5 w-5 mx-auto mb-2 ${getGradeColor(sec.percent)}`} />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{meta.label}</p>
                <p className={`font-fustat text-2xl font-black ${getGradeColor(sec.percent)}`}>{sec.score}/30</p>
                <p className="text-[11px] text-slate-400">{sec.correct}/{sec.total} correct</p>
              </div>
            );
          })}
        </motion.div>

        {/* Analysis */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-5">
          <h2 className="font-fustat text-xl font-bold text-slate-800 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-brand-main" />
            Analisis Hasil
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Strength */}
            <div className="glass-card p-6 rounded-2xl hover:translate-y-0 border-emerald-200/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-50">
                  <Award className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Strength</p>
                  <p className="font-fustat font-bold text-sm text-slate-800">{r.strength.label}</p>
                </div>
                <span className="ml-auto font-fustat font-black text-lg text-emerald-600">{r.strength.score}/30</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${r.strength.percent}%` }} />
              </div>
            </div>

            {/* Weakness */}
            <div className="glass-card p-6 rounded-2xl hover:translate-y-0 border-amber-200/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-amber-50">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Weakness</p>
                  <p className="font-fustat font-bold text-sm text-slate-800">{r.weakness.label}</p>
                </div>
                <span className="ml-auto font-fustat font-black text-lg text-amber-600">{r.weakness.score}/30</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${r.weakness.percent}%` }} />
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="glass-card p-6 rounded-2xl hover:translate-y-0">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 flex-shrink-0">
                <Lightbulb className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Recommendation</p>
                <p className="text-sm text-slate-600 font-inter leading-relaxed">{r.recommendation}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex gap-4">
          <button onClick={handleRetry} className="flex-1 py-3.5 rounded-2xl glass-button text-slate-700 font-semibold text-sm border border-slate-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <RotateCcw className="h-4 w-4" /> Try Again
          </button>
          <Link href="/practice" className="flex-1 py-3.5 rounded-2xl bg-brand-main text-white font-semibold text-sm text-center flex items-center justify-center gap-2 shadow-md shadow-brand-main/15 hover:scale-[1.02] active:scale-[0.98] transition-all">
            Practice More <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

      </div>
    </DashboardLayout>
  );
}
