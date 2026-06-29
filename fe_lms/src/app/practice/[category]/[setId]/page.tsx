"use client";

import React, { useState, use, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { PRACTICE_SETS, PRACTICE_QUESTIONS } from "@/data/practice";
import {
  ArrowLeft, CheckCircle, XCircle, ChevronLeft, ChevronRight, Send, Clock,
  Headphones, FileText, BookOpen,
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  listening: <Headphones className="h-4 w-4" />,
  structure: <FileText className="h-4 w-4" />,
  reading: <BookOpen className="h-4 w-4" />,
};

const categoryColors: Record<string, string> = {
  listening: "text-blue-600 bg-blue-50",
  structure: "text-purple-600 bg-purple-50",
  reading: "text-emerald-600 bg-emerald-50",
};

export default function QuizPage({ params }: { params: Promise<{ category: string; setId: string }> }) {
  const { category, setId } = use(params);
  const router = useRouter();

  const set = PRACTICE_SETS.find((s) => s.id === setId && s.category === category);
  const questions = useMemo(() => PRACTICE_QUESTIONS.filter((q) => q.setId === setId), [setId]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!set || questions.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <p className="text-slate-400 font-semibold">Set soal tidak ditemukan</p>
          <Link href="/practice" className="text-brand-dark text-sm hover:underline">Kembali ke Practice</Link>
        </div>
      </DashboardLayout>
    );
  }

  const question = questions[currentIdx];
  const total = questions.length;
  const isFirst = currentIdx === 0;
  const isLast = currentIdx === total - 1;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === total;

  const handleSelect = (optIdx: number) => {
    if (submitted) return;
    setAnswers({ ...answers, [question.id]: optIdx });
  };

  const goNext = () => {
    if (!isLast) setCurrentIdx(currentIdx + 1);
  };

  const goPrev = () => {
    if (!isFirst) setCurrentIdx(currentIdx - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentIdx(0);
    setSubmitted(false);
  };

  // Score calculation
  const score = useMemo(() => {
    if (!submitted) return null;
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) correct++;
    });
    return { correct, total, percent: Math.round((correct / total) * 100) };
  }, [submitted, answers, questions]);

  // ----- SCORE PAGE -----
  if (submitted && score) {
    const grade = score.percent >= 80 ? "Excellent!" : score.percent >= 60 ? "Good" : "Keep Practicing";
    const gradeColor = score.percent >= 80 ? "text-emerald-600" : score.percent >= 60 ? "text-blue-600" : "text-amber-600";
    const gradeBg = score.percent >= 80 ? "bg-emerald-50" : score.percent >= 60 ? "bg-blue-50" : "bg-amber-50";

    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto space-y-8 py-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
            <div className={`h-24 w-24 rounded-full ${gradeBg} flex items-center justify-center mx-auto`}>
              {score.percent >= 60 ? (
                <CheckCircle className={`h-12 w-12 ${gradeColor}`} />
              ) : (
                <XCircle className="h-12 w-12 text-amber-500" />
              )}
            </div>

            <div className="space-y-2">
              <h1 className="font-fustat text-4xl font-extrabold text-slate-900">Quiz Completed!</h1>
              <p className={`font-fustat text-2xl font-bold ${gradeColor}`}>{grade}</p>
            </div>

            <div className="glass-card p-8 rounded-3xl inline-flex items-center gap-8 hover:translate-y-0">
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Correct</p>
                <p className="font-fustat text-4xl font-black text-emerald-600">{score.correct}</p>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</p>
                <p className="font-fustat text-4xl font-black text-slate-800">{score.total}</p>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</p>
                <p className="font-fustat text-4xl font-black text-brand-main">{score.percent}%</p>
              </div>
            </div>
          </motion.div>

          {/* Review answers */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-4">
            <h2 className="font-fustat text-xl font-bold text-slate-800">Review Answers</h2>
            {questions.map((q, idx) => {
              const userAns = answers[q.id];
              const isCorrect = userAns === q.correct;
              return (
                <div key={q.id} className={`glass-card p-5 rounded-2xl hover:translate-y-0 ${isCorrect ? "border-emerald-200/50" : "border-red-200/50"}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <span className={`text-[10px] font-bold ${isCorrect ? "text-emerald-600" : "text-red-500"} flex-shrink-0`}>
                      {idx + 1}.
                    </span>
                    <p className="text-sm font-semibold text-slate-700">{q.question}</p>
                  </div>
                  <div className="space-y-1.5 ml-6">
                    {q.options.map((opt, oi) => {
                      let cls = "text-xs text-slate-500";
                      if (oi === q.correct) cls = "text-xs text-emerald-700 font-semibold";
                      else if (oi === userAns && !isCorrect) cls = "text-xs text-red-500 font-semibold";
                      return (
                        <div key={oi} className="flex items-center gap-2">
                          {oi === q.correct && <CheckCircle className="h-3 w-3 text-emerald-500 flex-shrink-0" />}
                          {oi === userAns && !isCorrect && <XCircle className="h-3 w-3 text-red-500 flex-shrink-0" />}
                          {(oi !== q.correct && oi !== userAns) && <div className="w-3" />}
                          <span className={cls}>{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                  {q.explanation && (
                    <div className="mt-3 ml-6 p-3 rounded-xl bg-blue-50/50 border border-blue-100/50">
                      <p className="text-[11px] text-blue-700 font-medium">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>

          <div className="flex gap-4">
            <button onClick={handleRetry} className="flex-1 py-3.5 rounded-2xl glass-button text-slate-700 font-semibold text-sm border border-slate-200">
              Try Again
            </button>
            <Link href="/practice" className="flex-1 py-3.5 rounded-2xl bg-brand-main text-white font-semibold text-sm text-center shadow-md shadow-brand-main/15">
              Back to Practice
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ----- QUIZ PAGE -----
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/practice" className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-brand-dark transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali
          </Link>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${categoryColors[category] ?? "bg-slate-50 text-slate-500"}`}>
              {categoryIcons[category]} {set.title}
            </span>
            <span className="text-[10px] font-medium text-slate-400">{currentIdx + 1}/{total}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-brand-main h-full rounded-full transition-all duration-300" style={{ width: `${((answeredCount) / total) * 100}%` }} />
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card p-8 rounded-3xl hover:translate-y-0"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">
                  Question {currentIdx + 1} of {total}
                </span>
                <span className="text-[10px] font-medium text-slate-400">{answeredCount} answered</span>
              </div>

              <p className="font-fustat text-lg font-bold text-slate-800 leading-relaxed">
                {question.question}
              </p>

              <div className="space-y-3">
                {question.options.map((opt, idx) => {
                  const selected = answers[question.id] === idx;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(idx)}
                      className={`w-full text-left p-4 rounded-2xl text-sm font-medium border transition-all flex items-center gap-4 ${
                        selected
                          ? "bg-brand-main/10 border-brand-main text-brand-dark font-semibold"
                          : "bg-white/50 border-slate-100 text-slate-600 hover:border-brand-light/40 hover:bg-white"
                      }`}
                    >
                      <span className={`h-7 w-7 rounded-xl flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
                        selected ? "bg-brand-main text-white" : "bg-slate-100 text-slate-400"
                      }`}>
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
          <button
            onClick={goPrev}
            disabled={isFirst}
            className="px-5 py-3 rounded-2xl glass-button text-xs font-semibold text-slate-600 border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <span className="text-[10px] text-slate-400 font-medium">
            {currentIdx + 1} / {total}
          </span>

          {isLast ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="px-5 py-3 rounded-2xl bg-brand-main text-white text-xs font-semibold shadow-md shadow-brand-main/15 disabled:opacity-40 flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all"
            >
              <Send className="h-3.5 w-3.5" />
              Submit
            </button>
          ) : (
            <button
              onClick={goNext}
              className="px-5 py-3 rounded-2xl glass-button text-xs font-semibold text-slate-600 border border-slate-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Question dots */}
        <div className="flex items-center justify-center gap-2">
          {questions.map((q, idx) => {
            const isCurrent = idx === currentIdx;
            const answered = answers[q.id] !== undefined;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className={`h-2 rounded-full transition-all ${
                  isCurrent ? "w-6 bg-brand-main" : answered ? "w-2 bg-brand-light" : "w-2 bg-slate-200"
                }`}
              />
            );
          })}
        </div>

      </div>
    </DashboardLayout>
  );
}
