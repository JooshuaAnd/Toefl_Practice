"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/layouts/MainLayout";
import { Navbar } from "@/components/navbar/Navbar";
import { Badge } from "@/components/ui/Badge";
import {
  Award,
  Sparkles,
  Zap,
  Play,
  Pause,
  Lock,
  ArrowRight,
  BookOpen,
  Headphones,
  FileText,
  Volume2,
  CheckCircle,
  XCircle,
  X,
  Compass
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FreeTrialPage() {
  const router = useRouter();

  // Authentication status simulation
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("linguedu_user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      // Show save progress popup after 5 seconds
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Questions definition
  const grammarQuestions = [
    {
      id: 1,
      section: "Grammar",
      question: "Although the geology of the region is complex, ______ it is highly mineralized.",
      options: ["nevertheless", "yet", "but", "however"],
      correct: 0,
      explanation: "'Although' introduces a subordinate clause; 'nevertheless' can join or emphasize the main clause without creating grammatical redundancy."
    },
    {
      id: 2,
      section: "Grammar",
      question: "Under no circumstances ______ the laboratory equipment without supervisor oversight.",
      options: ["students should operate", "should students operate", "students operate", "operating students"],
      correct: 1,
      explanation: "Negative adverbial phrases like 'Under no circumstances' require subject-auxiliary inversion."
    },
    {
      id: 3,
      section: "Grammar",
      question: "The director preferred that the researchers ______ the experiment with new materials.",
      options: ["conduct", "conducts", "conducted", "conducting"],
      correct: 0,
      explanation: "Verbs like 'preferred that' require the subjunctive base form of the verb ('conduct')."
    }
  ];

  const readingQuestions = {
    passage: "Photosynthesis is the biological process by which green plants utilize sunlight to synthesize nutrients from carbon dioxide and water. In plants, this reaction takes place inside the chloroplasts, which contain chlorophyll. Chlorophyll absorbs light energy, driving the reduction of carbon dioxide to simple sugars.",
    questions: [
      {
        id: 4,
        section: "Reading",
        question: "According to the passage, where does the photosynthetic process happen in plants?",
        options: ["Directly in water molecules", "Inside carbon dioxide molecules", "Inside the chloroplasts", "Within light waves"],
        correct: 2,
        explanation: "The passage explicitly states: 'this reaction takes place inside the chloroplasts.'"
      },
      {
        id: 5,
        section: "Reading",
        question: "The word 'utilize' is closest in meaning to:",
        options: ["waste", "use", "create", "observe"],
        correct: 1,
        explanation: "'Utilize' means to put to practical use."
      }
    ]
  };

  const listeningQuestions = [
    {
      id: 6,
      section: "Listening",
      question: "Why does the speaker mention chlorophyll?",
      options: [
        "To describe the substance that absorbs light energy.",
        "To argue that plants do not require carbon dioxide.",
        "To compare land vegetation with water algae.",
        "To highlight an alternative nutrient synthesis model."
      ],
      correct: 0,
      explanation: "The audio summary states chlorophyll absorbs light energy to drive the reduction of CO2."
    },
    {
      id: 7,
      section: "Listening",
      question: "What is the primary theme of the short recording?",
      options: [
        "Plant root absorption mechanics.",
        "The light-absorbing mechanism of photosynthesis.",
        "Techniques to cultivate greenhouse crops.",
        "Scientific classification of leafy green plants."
      ],
      correct: 1,
      explanation: "The recording summary details the light-driven energy conversion of photosynthesis."
    }
  ];

  // State Management
  const [currentStep, setCurrentStep] = useState(0); // 0: Grammar, 1: Reading, 2: Listening, 3: Material, 4: Results & locked state
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Computed Values
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = grammarQuestions.length + readingQuestions.questions.length + listeningQuestions.length; // 7 total

  // Simulated audio player timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 5;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSelectAnswer = (qId: number, optionIdx: number) => {
    if (answers[qId] !== undefined) return; // Answer locked
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    grammarQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) correctCount++;
    });
    readingQuestions.questions.forEach((q) => {
      if (answers[q.id] === q.correct) correctCount++;
    });
    listeningQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) correctCount++;
    });
    return {
      correctCount,
      scorePercent: Math.round((correctCount / totalQuestions) * 100)
    };
  };

  const handleStepForward = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <MainLayout>
      <Navbar />

      <div className="w-full max-w-4xl mx-auto pt-32 pb-24 px-4 space-y-8">
        
        {/* Headline Section */}
        {currentStep < 4 && (
          <div className="text-center space-y-3">
            <Badge className="bg-brand-light/10 border-brand-light/20 text-brand-dark">
              Free Trial Workspace
            </Badge>
            <h1 className="font-fustat text-3xl sm:text-4xl font-extrabold text-slate-800">
              Experience TOEFL Practice for Free
            </h1>
            <p className="font-inter text-slate-500 text-sm max-w-xl mx-auto">
              Try our premium TOEFL learning experience before subscribing. Complete the mini practice set to review your predictive metrics.
            </p>
          </div>
        )}

        {/* Progress Tracker Bar */}
        {currentStep < 4 && (
          <div className="glass-card p-4 rounded-2xl border border-white/50 space-y-2 hover:translate-y-0">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500">
              <span>{answeredCount} of {totalQuestions} Questions Completed</span>
              <span className="text-brand-dark">Section {currentStep + 1} of 4</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-brand-main h-full rounded-full transition-all duration-300"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Question Wizards */}
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Grammar Questions */}
          {currentStep === 0 && (
            <motion.div
              key="step-grammar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                <h2 className="font-fustat text-xl font-bold text-slate-800">Section 1: Grammar Practice</h2>
              </div>

              {grammarQuestions.map((q) => {
                const isAnswered = answers[q.id] !== undefined;
                return (
                  <div key={q.id} className="glass-card p-6 rounded-[24px] border border-white/50 space-y-4 hover:translate-y-0">
                    <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">Question {q.id}</span>
                    <p className="text-sm font-semibold text-slate-700 font-inter bg-white/40 p-4 rounded-xl border border-white/50">
                      {q.question}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((opt, idx) => {
                        const isCorrect = idx === q.correct;
                        const isSelected = answers[q.id] === idx;
                        let btnStyle = "bg-white/50 border-slate-100 hover:border-brand-main hover:bg-white";

                        if (isAnswered) {
                          if (isCorrect) {
                            btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold";
                          } else if (isSelected) {
                            btnStyle = "bg-rose-50 border-rose-300 text-rose-800 font-semibold";
                          } else {
                            btnStyle = "bg-slate-50/50 opacity-60 border-slate-100 pointer-events-none";
                          }
                        }

                        return (
                          <button
                            key={opt}
                            disabled={isAnswered}
                            onClick={() => handleSelectAnswer(q.id, idx)}
                            className={`py-3 px-4 rounded-xl text-xs font-semibold border text-left transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {isAnswered && isCorrect && <CheckCircle className="h-4 w-4 text-emerald-600" />}
                            {isAnswered && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-rose-600" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <div className="flex justify-end">
                <button
                  disabled={answers[1] === undefined || answers[2] === undefined || answers[3] === undefined}
                  onClick={handleStepForward}
                  className="px-6 py-3.5 bg-brand-main text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-brand-main/15 disabled:opacity-50 hover:scale-105 active:scale-95 transition-transform"
                >
                  <span>Next Section (Reading)</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Reading Passage & Questions */}
          {currentStep === 1 && (
            <motion.div
              key="step-reading"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-600" />
                <h2 className="font-fustat text-xl font-bold text-slate-800">Section 2: Reading Practice</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Passage */}
                <div className="lg:col-span-6 glass-card p-6 rounded-[24px] border border-white/50 h-[350px] overflow-y-auto space-y-4">
                  <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100">Academic passage</Badge>
                  <p className="text-xs text-slate-600 font-inter leading-relaxed">
                    {readingQuestions.passage}
                  </p>
                </div>

                {/* Questions */}
                <div className="lg:col-span-6 space-y-6">
                  {readingQuestions.questions.map((q) => {
                    const isAnswered = answers[q.id] !== undefined;
                    return (
                      <div key={q.id} className="glass-card p-5 rounded-2xl border border-white/50 space-y-3 hover:translate-y-0">
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Question {q.id}</span>
                        <p className="text-xs font-semibold text-slate-700 font-inter">
                          {q.question}
                        </p>
                        
                        <div className="space-y-2">
                          {q.options.map((opt, idx) => {
                            const isCorrect = idx === q.correct;
                            const isSelected = answers[q.id] === idx;
                            let btnStyle = "bg-white/50 border-slate-100 hover:border-brand-main hover:bg-white";

                            if (isAnswered) {
                              if (isCorrect) {
                                btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold";
                              } else if (isSelected) {
                                btnStyle = "bg-rose-50 border-rose-300 text-rose-800 font-semibold";
                              } else {
                                btnStyle = "bg-slate-50/50 opacity-60 border-slate-100 pointer-events-none";
                              }
                            }

                            return (
                              <button
                                key={opt}
                                disabled={isAnswered}
                                onClick={() => handleSelectAnswer(q.id, idx)}
                                className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold border text-left transition-all flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {isAnswered && isCorrect && <CheckCircle className="h-4 w-4 text-emerald-600" />}
                                {isAnswered && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-rose-600" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  disabled={answers[4] === undefined || answers[5] === undefined}
                  onClick={handleStepForward}
                  className="px-6 py-3.5 bg-brand-main text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-brand-main/15 disabled:opacity-50 hover:scale-105 active:scale-95 transition-transform"
                >
                  <span>Next Section (Listening)</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Listening Preview */}
          {currentStep === 2 && (
            <motion.div
              key="step-listening"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-blue-600" />
                <h2 className="font-fustat text-xl font-bold text-slate-800">Section 3: Listening Preview</h2>
              </div>

              {/* Glass Audio Player */}
              <div className="glass-card p-6 rounded-[24px] border border-white/50 flex flex-col md:flex-row items-center justify-between gap-6 hover:translate-y-0">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="h-14 w-14 rounded-full bg-brand-main text-white flex items-center justify-center shadow-lg shadow-brand-main/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    {isPlaying ? <Pause className="h-6 w-6 fill-white" /> : <Play className="h-6 w-6 fill-white ml-0.5" />}
                  </button>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Photosynthesis Mechanics Audio</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Teaser Lecture Snippet • 0:15</p>
                  </div>
                </div>

                {/* Progress bar & Waveform animation */}
                <div className="flex-1 w-full max-w-sm space-y-2">
                  <div className="flex items-center gap-0.5 h-6">
                    {[16, 24, 12, 28, 8, 20, 16, 22, 10, 18, 14, 26, 6, 20, 12].map((height, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-full bg-brand-main transition-all duration-300`}
                        style={{ height: isPlaying ? `${height}px` : "6px" }}
                      />
                    ))}
                  </div>
                  {/* Progress bar line */}
                  <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-brand-main h-full" style={{ width: `${audioProgress}%` }} />
                  </div>
                </div>
              </div>

              {/* Listening questions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {listeningQuestions.map((q) => {
                  const isAnswered = answers[q.id] !== undefined;
                  return (
                    <div key={q.id} className="glass-card p-5 rounded-2xl border border-white/50 space-y-3 hover:translate-y-0">
                      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Question {q.id}</span>
                      <p className="text-xs font-semibold text-slate-700 font-inter">
                        {q.question}
                      </p>
                      
                      <div className="space-y-2">
                        {q.options.map((opt, idx) => {
                          const isCorrect = idx === q.correct;
                          const isSelected = answers[q.id] === idx;
                          let btnStyle = "bg-white/50 border-slate-100 hover:border-brand-main hover:bg-white";

                          if (isAnswered) {
                            if (isCorrect) {
                              btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold";
                            } else if (isSelected) {
                              btnStyle = "bg-rose-50 border-rose-300 text-rose-800 font-semibold";
                            } else {
                              btnStyle = "bg-slate-50/50 opacity-60 border-slate-100 pointer-events-none";
                            }
                          }

                          return (
                            <button
                              key={opt}
                              disabled={isAnswered}
                              onClick={() => handleSelectAnswer(q.id, idx)}
                              className={`w-full py-2.5 px-3 rounded-lg text-xs font-semibold border text-left transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {isAnswered && isCorrect && <CheckCircle className="h-4 w-4 text-emerald-600" />}
                              {isAnswered && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-rose-600" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end">
                <button
                  disabled={answers[6] === undefined || answers[7] === undefined}
                  onClick={handleStepForward}
                  className="px-6 py-3.5 bg-brand-main text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-brand-main/15 disabled:opacity-50 hover:scale-105 active:scale-95 transition-transform"
                >
                  <span>Next: Free Study Material</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Free Learning Material Preview */}
          {currentStep === 3 && (
            <motion.div
              key="step-material"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2">
                <Compass className="h-5 w-5 text-amber-500" />
                <h2 className="font-fustat text-xl font-bold text-slate-800">Section 4: Free Learning Material Preview</h2>
              </div>

              <div className="glass-card p-8 rounded-[28px] border border-white/50 space-y-6 hover:translate-y-0 relative overflow-hidden">
                <Badge className="bg-amber-50 text-amber-600 border-amber-100">Study Guide</Badge>
                
                <h3 className="text-2xl font-extrabold text-slate-800 font-fustat">
                  Mastering the Subject-Verb Inversion
                </h3>

                <div className="space-y-4 text-xs text-slate-600 leading-relaxed font-inter">
                  <p>
                    One of the most frequent grammar structures tested in the TOEFL Structure section is <strong>inversion</strong>. Ordinarily, sentences place the subject before the verb (e.g., <em>"The students went there."</em>). However, specific conditions force the verb (or helper verb) to move in front of the subject.
                  </p>
                  
                  <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 font-semibold space-y-2">
                    <span className="text-[10px] text-brand-dark uppercase tracking-widest block font-bold">Inversion Scenario: Negative Adverbials</span>
                    <p className="italic">
                      "Never before had the country faced such a severe economic challenge."
                    </p>
                  </div>

                  <p>
                    Notice how <strong>'had'</strong> (auxiliary verb) precedes <strong>'the country'</strong> (subject) because the sentence begins with the negative adverbial phrase <strong>'Never before'</strong>. Other triggers include: <em>Hardly, Seldom, Rarely, and Under no circumstances.</em>
                  </p>
                </div>

                {/* locked blur section */}
                <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-white via-white/95 to-transparent flex flex-col justify-end p-8 text-center border-t border-slate-100/50">
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-slate-500">
                      This concludes the free trial preview material. Get instant access to all 48 strategies.
                    </p>
                    <button
                      onClick={handleStepForward}
                      className="px-6 py-3 bg-brand-main text-white font-semibold rounded-xl text-xs hover:bg-brand-dark transition-all shadow-md shadow-brand-main/15 mx-auto flex items-center justify-center gap-1.5 hover:scale-[1.03] active:scale-[0.97]"
                    >
                      <span>Show Results & Unlock Course</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Results & Locked Premium Content */}
          {currentStep === 4 && (
            <motion.div
              key="step-results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              {/* Score Results Card */}
              <div className="glass-card p-8 rounded-[28px] border border-white/50 flex flex-col md:flex-row items-center justify-between gap-6 hover:translate-y-0 text-center md:text-left bg-gradient-to-r from-brand-main/5 via-brand-light/5 to-transparent">
                <div className="space-y-3">
                  <Badge className="bg-brand-main/10 border-brand-main/20 text-brand-dark">Trial Completed</Badge>
                  <h2 className="text-2xl font-extrabold text-slate-800">Your TOEFL Practice Summary</h2>
                  <p className="text-xs text-slate-500 font-inter max-w-md">
                    You completed 7 questions. Register now to save this score in your permanent learning logs!
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Correct Answers</span>
                    <span className="text-3xl font-extrabold text-slate-800 block mt-1">
                      {calculateScore().correctCount} / {totalQuestions}
                    </span>
                  </div>
                  <div className="w-px h-10 bg-slate-200" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Predictive Grade</span>
                    <span className="text-3xl font-extrabold text-brand-main block mt-1">
                      {calculateScore().scorePercent}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Locked Content Behind Glass Overlay */}
              <div className="relative rounded-[28px] overflow-hidden border border-white/50">
                
                {/* Visual Premium Cards (Blurred) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 filter blur-[5px] pointer-events-none opacity-50 bg-slate-50/20">
                  {/* Lock items */}
                  <div className="glass-card p-6 rounded-2xl space-y-3">
                    <div className="h-10 w-10 bg-slate-100 rounded-xl" />
                    <h4 className="font-bold text-slate-700">TOEFL Mock Simulator</h4>
                    <p className="text-xs text-slate-400">Complete standard simulated timed exams.</p>
                  </div>
                  <div className="glass-card p-6 rounded-2xl space-y-3">
                    <div className="h-10 w-10 bg-slate-100 rounded-xl" />
                    <h4 className="font-bold text-slate-700">Vocabulary Master Class</h4>
                    <p className="text-xs text-slate-400">Access over 1200 high-frequency TOEFL words.</p>
                  </div>
                  <div className="glass-card p-6 rounded-2xl space-y-3">
                    <div className="h-10 w-10 bg-slate-100 rounded-xl" />
                    <h4 className="font-bold text-slate-700">Speaking Evaluation Module</h4>
                    <p className="text-xs text-slate-400">Record speaking responses for AI feedback.</p>
                  </div>
                  <div className="glass-card p-6 rounded-2xl space-y-3">
                    <div className="h-10 w-10 bg-slate-100 rounded-xl" />
                    <h4 className="font-bold text-slate-700">Advanced Listening Sets</h4>
                    <p className="text-xs text-slate-400">Track comprehension for 48 lecture classes.</p>
                  </div>
                </div>

                {/* Conversion Overlay */}
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[4px] flex items-center justify-center p-8">
                  <div className="text-center max-w-md space-y-6">
                    <div className="h-14 w-14 bg-brand-light/10 border border-brand-light/20 text-brand-dark rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                      <Lock className="h-6 w-6" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-extrabold text-slate-800">Continue Your English Learning Journey</h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-inter">
                        Unlock unlimited practice, full TOEFL simulations, listening modules, and personalized learning tools.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button
                        onClick={() => router.push("/pricing")}
                        className="w-full sm:w-auto px-6 py-3.5 bg-brand-main text-white font-semibold rounded-xl text-xs hover:bg-brand-dark transition-all shadow-md shadow-brand-main/15 flex items-center justify-center gap-1.5 hover:scale-[1.03] active:scale-[0.98]"
                      >
                        <span>Unlock Full Access</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => router.push("/signup")}
                        className="w-full sm:w-auto px-6 py-3.5 glass-button border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs hover:bg-slate-50 transition-all flex items-center justify-center hover:scale-[1.03] active:scale-[0.98]"
                      >
                        Create Free Account
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>

      {/* Floating Save Progress Popup (Subtle bottom-right popup) */}
      <AnimatePresence>
        {showPopup && !isLoggedIn && currentStep < 4 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-xs glass-card p-5 border border-white/60 shadow-xl rounded-2xl hover:translate-y-0"
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2.5 right-2.5 p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-all"
              aria-label="Close message"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <div className="space-y-3.5 text-left">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-brand-main" />
                <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">Tip</span>
              </div>
              <p className="text-xs text-slate-600 font-medium font-inter">
                Create an account to save your TOEFL progress.
              </p>
              <button
                onClick={() => router.push("/signup")}
                className="w-full py-2 bg-brand-main text-white text-[10px] font-bold rounded-lg hover:bg-brand-dark transition-all text-center block"
              >
                Sign Up Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}
