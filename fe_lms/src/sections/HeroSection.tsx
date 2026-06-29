import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { fadeIn, scaleUp } from "@/lib/motion";
import { ArrowRight, Award, Users, Star, Sparkles } from "lucide-react";
import Link from "next/link";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen pt-36 pb-20 flex items-center justify-center px-4 overflow-visible">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          <motion.div variants={fadeIn("up", 0.1, 0.6)} initial="hidden" animate="show">
            <Badge className="px-3.5 py-1.5 bg-brand-light/10 border-brand-light/30 text-brand-dark flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-brand-main" />
              <span>#1 TOEFL Preparation Platform</span>
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeIn("up", 0.2, 0.7)}
            initial="hidden"
            animate="show"
            className="font-fustat text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]"
          >
            Prepare for TOEFL{" "}
            <span className="bg-gradient-to-r from-brand-dark via-brand-main to-brand-light bg-clip-text text-transparent">
              More Effectively
            </span>
          </motion.h1>

          <motion.p
            variants={fadeIn("up", 0.3, 0.8)}
            initial="hidden"
            animate="show"
            className="font-inter text-base sm:text-lg text-slate-500 max-w-lg leading-relaxed"
          >
            Belajar TOEFL melalui materi, latihan soal, simulasi, dan sertifikasi.
          </motion.p>

          <motion.div
            variants={fadeIn("up", 0.4, 0.9)}
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <Link
              href="/choose-account-type"
              className="glass-button-primary px-7 py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-brand-main/20 hover:shadow-xl hover:shadow-brand-main/30"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/packages"
              className="glass-button px-7 py-3.5 rounded-xl font-semibold text-slate-700 flex items-center justify-center gap-2 border border-slate-200"
            >
              <Sparkles className="h-4 w-4" />
              View Packages
            </Link>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.5, 1.0)}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-400 font-medium"
          >
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span>4.9/5 from 2,000+ learners</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-brand-main" />
              <span>50+ corporate partners</span>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative flex items-center justify-center h-[420px] md:h-[500px]">
          <motion.div
            variants={scaleUp(0.3, 1)}
            initial="hidden"
            animate="show"
            className="relative w-full h-full flex items-center justify-center"
          >
            <div className="relative w-[300px] h-[300px] md:w-[360px] md:h-[360px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-light/20 via-brand-main/10 to-brand-dark/20 rounded-full blur-3xl animate-pulse-glow" />
              <div className="absolute inset-4 bg-gradient-to-br from-brand-light/30 to-brand-main/30 rounded-full blur-2xl animate-float-slow" />
              <div className="absolute inset-8 rounded-full border border-brand-light/20 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-black text-brand-main font-fustat">TOEFL</div>
                  <div className="text-sm font-semibold text-slate-500 mt-1">Preparation</div>
                  <div className="mt-3 flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ x: -30, y: -20, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute top-10 left-0 md:-left-6 z-20 glass-card p-4 rounded-2xl flex items-center gap-3.5 max-w-[210px] animate-float-slow"
            >
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-brand-light/20 to-brand-main/20 text-brand-dark shadow-sm">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Target Score</p>
                <h4 className="text-xl font-bold text-slate-800">100+<span className="text-xs font-semibold text-slate-400">/120</span></h4>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 30, y: 20, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="absolute bottom-10 right-0 md:-right-6 z-20 glass-card p-4 rounded-2xl flex items-center gap-3.5 max-w-[220px] animate-float-medium"
            >
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 shadow-sm">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Learners</p>
                <h4 className="text-sm font-bold text-slate-800">15,000+</h4>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
