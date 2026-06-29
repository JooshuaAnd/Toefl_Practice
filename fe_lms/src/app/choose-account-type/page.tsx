"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/layouts/MainLayout";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Badge } from "@/components/ui/Badge";
import { useAppStore } from "@/stores/useAppStore";
import { fadeIn } from "@/lib/motion";
import { User, Building2, Check } from "lucide-react";

export default function ChooseAccountTypePage() {
  const router = useRouter();
  const setSelectedRole = useAppStore((s) => s.setSelectedRole);
  const [selected, setSelected] = useState<"individual" | "company" | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    setSelectedRole(selected);
    router.push("/packages");
  };

  const cards = [
    {
      type: "individual" as const,
      icon: User,
      title: "Individual",
      desc: "Belajar TOEFL secara mandiri dengan materi, latihan soal, simulasi, dan sertifikat.",
    },
    {
      type: "company" as const,
      icon: Building2,
      title: "Company",
      desc: "Kelola banyak peserta TOEFL dalam satu akun perusahaan.",
    },
  ];

  return (
    <MainLayout>
      <Navbar />
      <section className="relative w-full min-h-screen pt-36 pb-24 px-4 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto space-y-12">
          <motion.div
            variants={fadeIn("up", 0.1, 0.6)}
            initial="hidden"
            animate="show"
            className="text-center space-y-4"
          >
            <Badge className="bg-brand-light/10 border-brand-light/20 text-brand-dark">
              Pilih Tipe Akun
            </Badge>
            <h1 className="font-fustat text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Siapa yang akan{" "}
              <span className="bg-gradient-to-r from-brand-dark via-brand-main to-brand-light bg-clip-text text-transparent">
                menggunakan?
              </span>
            </h1>
            <p className="font-inter text-base text-slate-500 max-w-lg mx-auto">
              Pilih tipe akun yang sesuai dengan kebutuhan Anda
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.2, 0.7)}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {cards.map((card) => {
              const Icon = card.icon;
              const isSelected = selected === card.type;
              return (
                <button
                  key={card.type}
                  onClick={() => setSelected(card.type)}
                  className={`relative p-8 rounded-[24px] backdrop-blur-[30px] border-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center space-y-5 hover:scale-[1.02] ${
                    isSelected
                      ? "border-brand-main bg-white/70 shadow-[0_12px_40px_rgba(49,154,255,0.2)] ring-1 ring-brand-main/30"
                      : "border-white/30 bg-white/30 hover:bg-white/40 shadow-[0_8px_32px_rgba(31,38,135,0.15)]"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-brand-main text-white flex items-center justify-center">
                      <Check className="h-4 w-4 stroke-[3]" />
                    </div>
                  )}
                  <div
                    className={`p-5 rounded-2xl transition-all duration-300 ${
                      isSelected ? "bg-brand-main text-white shadow-lg shadow-brand-main/30" : "bg-white/50 text-brand-dark"
                    }`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-fustat text-2xl font-bold text-slate-800">{card.title}</h3>
                    <p className="font-inter text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </button>
              );
            })}
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.3, 0.8)}
            initial="hidden"
            animate="show"
            className="flex justify-center"
          >
            <button
              onClick={handleContinue}
              disabled={!selected}
              className={`px-10 py-4 rounded-2xl font-semibold text-base transition-all duration-200 ${
                selected
                  ? "glass-button-primary text-white shadow-lg shadow-brand-main/20 hover:shadow-xl hover:shadow-brand-main/30"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              {selected ? "Continue to Packages" : "Pilih tipe akun terlebih dahulu"}
            </button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </MainLayout>
  );
}
