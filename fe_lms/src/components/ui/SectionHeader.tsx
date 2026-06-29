import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { fadeIn } from "@/lib/motion";

interface SectionHeaderProps {
  badge: string;
  title: string;
  description: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ badge, title, description }) => {
  return (
    <motion.div
      variants={fadeIn("up", 0.1, 0.6)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="max-w-2xl flex flex-col items-center text-center space-y-4"
    >
      <Badge className="bg-brand-light/10 border-brand-light/20 text-brand-dark">
        {badge}
      </Badge>
      <h2 className="font-fustat text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
        {title}
      </h2>
      <p className="font-inter text-slate-500 text-sm sm:text-base leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default SectionHeader;
