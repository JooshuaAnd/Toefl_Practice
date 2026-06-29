"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_ITEMS } from "@/lib/constans";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeIn } from "@/lib/motion";
import { ChevronDown } from "lucide-react";

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative w-full py-24 px-4 overflow-visible">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center space-y-12">
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked Questions"
          description="Got questions? We've got answers. Can't find what you're looking for? Contact our support team."
        />

        <div className="w-full space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeIn("up", 0.05 * idx, 0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="glass-card rounded-2xl overflow-hidden hover:translate-y-0"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex items-center justify-between p-6 text-left transition-all duration-200"
              >
                <span className="font-fustat font-bold text-sm sm:text-base text-slate-800 pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="font-inter text-sm text-slate-500 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
