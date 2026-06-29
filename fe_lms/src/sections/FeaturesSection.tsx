import React from "react";
import { motion } from "framer-motion";
import { FEATURE_CARDS } from "@/lib/constans";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeIn, staggerContainer } from "@/lib/motion";
import {
  Compass,
  Headphones,
  FileText,
  BookOpen,
} from "lucide-react";

const getIcon = (iconName: string) => {
  const iconProps = { className: "h-6 w-6 text-brand-dark" };
  switch (iconName) {
    case "Compass":
      return <Compass {...iconProps} />;
    case "Headphones":
      return <Headphones {...iconProps} />;
    case "FileText":
      return <FileText {...iconProps} />;
    case "BookOpen":
      return <BookOpen {...iconProps} />;
    default:
      return <Compass {...iconProps} />;
  }
};

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="relative w-full py-24 px-4 overflow-visible">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center space-y-16">
        <SectionHeader
          badge="Features"
          title="Everything You Need to Master TOEFL"
          description="Comprehensive practice tools covering all sections of the TOEFL exam, designed to help you achieve your target score."
        />

        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          {FEATURE_CARDS.map((card, idx) => (
            <motion.div
              key={card.title}
              variants={fadeIn("up", 0.05 * idx, 0.5)}
              className="glass-card group relative p-8 rounded-3xl flex flex-col items-start text-left space-y-6 overflow-hidden cursor-pointer"
            >
              <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm group-hover:bg-brand-light/10 group-hover:border-brand-light/20 transition-all duration-300">
                {getIcon(card.iconName)}
              </div>

              <div className="space-y-2.5 flex-grow">
                <h3 className="font-fustat text-xl font-bold text-slate-800 transition-colors group-hover:text-brand-dark">
                  {card.title}
                </h3>
                <p className="font-inter text-slate-400 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="absolute bottom-5 right-6 w-1.5 h-1.5 rounded-full bg-brand-light scale-0 group-hover:scale-100 transition-transform duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
