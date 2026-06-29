import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { Headphones, FileText, BookOpen, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

const trialItems = [
  {
    icon: Headphones,
    title: "Listening",
    count: "5 Questions",
    description: "Experience realistic TOEFL listening passages with comprehension questions.",
    color: "from-cyan-400 to-blue-500",
    bgColor: "bg-cyan-50",
    textColor: "text-cyan-600",
  },
  {
    icon: FileText,
    title: "Structure",
    count: "5 Questions",
    description: "Practice grammar and written expression questions with instant feedback.",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    icon: BookOpen,
    title: "Reading",
    count: "5 Questions",
    description: "Read academic passages and answer comprehension questions like the real test.",
    color: "from-sky-400 to-blue-500",
    bgColor: "bg-sky-50",
    textColor: "text-sky-600",
  },
];

export const FreeTrialSection: React.FC = () => {
  return (
    <section id="free-trial" className="relative w-full py-24 px-4 overflow-visible bg-slate-50/30">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center space-y-16">
        <SectionHeader
          badge="Free Trial"
          title="Try Before You Subscribe"
          description="Get instant access to 15 TOEFL practice questions — absolutely free. No credit card required."
        />

        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        >
          {trialItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeIn("up", 0.05 * idx, 0.5)}
                className="glass-card p-8 rounded-3xl flex flex-col items-start text-left space-y-5 hover:translate-y-0"
              >
                <div className={`p-4 rounded-2xl ${item.bgColor} ${item.textColor}`}>
                  <Icon className="h-7 w-7" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-fustat text-xl font-bold text-slate-800">
                      {item.title}
                    </h3>
                    <span className="text-xs font-bold text-brand-main bg-brand-light/10 px-2.5 py-0.5 rounded-full">
                      {item.count}
                    </span>
                  </div>
                  <p className="font-inter text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-500 font-inter">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Real TOEFL-style questions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Instant answer feedback</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Detailed explanations</span>
                  </li>
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeIn("up", 0.4, 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Link
            href="/free-trial"
            className="glass-button-primary px-8 py-4 rounded-xl font-semibold text-white flex items-center gap-2 shadow-lg shadow-brand-main/20 hover:shadow-xl hover:shadow-brand-main/30 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Start Free Trial Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeTrialSection;
