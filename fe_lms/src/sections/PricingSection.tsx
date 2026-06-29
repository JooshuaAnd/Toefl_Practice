import React from "react";
import { motion } from "framer-motion";
import { PACKAGE_PLANS } from "@/lib/constans";
import { Badge } from "@/components/ui/Badge";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { Check, Users, User } from "lucide-react";

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="relative w-full py-24 px-4 overflow-visible bg-slate-50/30">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center space-y-16">
        <div className="max-w-2xl flex flex-col items-center space-y-4">
          <Badge className="bg-brand-light/10 border-brand-light/20 text-brand-dark">
            Pricing Plans
          </Badge>
          <h2 className="font-fustat text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Choose Your Preparation Plan
          </h2>
          <p className="font-inter text-slate-500 text-sm sm:text-base leading-relaxed">
            Flexible packages designed for individual learners and corporate teams.
          </p>
        </div>

        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-stretch"
        >
          {PACKAGE_PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              variants={fadeIn("up", 0.05 * idx, 0.5)}
              className={`glass-card relative p-6 rounded-3xl flex flex-col text-left space-y-6 cursor-pointer ${
                plan.isPopular
                  ? "border-brand-main shadow-xl shadow-brand-main/10 ring-1 ring-brand-main/20 scale-100 md:scale-[1.03]"
                  : ""
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                  <Badge className="bg-gradient-to-r from-brand-light to-brand-main text-white border-transparent py-1 shadow-md shadow-brand-main/20">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-fustat text-xl font-bold text-slate-800">{plan.name}</h3>
                  <div className={`p-1.5 rounded-lg ${plan.target === "Company" ? "bg-purple-50 text-purple-600" : "bg-brand-light/10 text-brand-dark"}`}>
                    {plan.target === "Company" ? <Users className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                </div>
                <p className="font-inter text-slate-400 text-xs leading-relaxed min-h-[36px]">{plan.description}</p>
                <div className="flex items-baseline gap-1 pt-1">
                  <span className="font-fustat text-3xl sm:text-4xl font-black text-slate-900">{plan.price}</span>
                  <span className="font-inter text-slate-400 text-xs">/{plan.period}</span>
                </div>
              </div>

              <div className="w-full h-px bg-slate-100" />

              <ul className="space-y-3 flex-grow">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-xs text-slate-500 font-inter">
                    <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-light/10 text-brand-dark flex-shrink-0">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-4 rounded-2xl font-semibold text-sm transition-all duration-200 ${
                plan.isPopular
                  ? "glass-button-primary text-white shadow-md shadow-brand-main/15"
                  : "glass-button text-slate-700 border border-slate-200"
              }`}>
                {plan.ctaText}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
