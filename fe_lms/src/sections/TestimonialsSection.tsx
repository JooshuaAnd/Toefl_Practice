import React from "react";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constans";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { Star, Quote } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="relative w-full py-24 px-4 overflow-visible bg-slate-50/30">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center space-y-16">
        <SectionHeader
          badge="Testimonials"
          title="What Our Learners Say"
          description="Join thousands of successful learners who achieved their target TOEFL scores with our platform."
        />

        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
        >
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              variants={fadeIn("up", 0.05 * idx, 0.5)}
              className="glass-card p-8 rounded-3xl flex flex-col space-y-6 hover:translate-y-0"
            >
              <div className="flex items-start justify-between">
                <Quote className="h-8 w-8 text-brand-light/30" />
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>

              <p className="font-inter text-sm text-slate-600 leading-relaxed flex-grow">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-light to-brand-main flex items-center justify-center text-white text-xs font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-fustat font-bold text-sm text-slate-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {testimonial.role} &middot; {testimonial.company}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs font-bold text-brand-main bg-brand-light/10 px-3 py-1 rounded-full">
                    {testimonial.score}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
