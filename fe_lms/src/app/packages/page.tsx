"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/layouts/MainLayout";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Badge } from "@/components/ui/Badge";
import { useAppStore } from "@/stores/useAppStore";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { Check, Users, User, Star, Sparkles, BookOpen, HelpCircle, ShieldCheck, Building2 } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  starter: <BookOpen className="h-6 w-6" />,
  silver: <Star className="h-6 w-6" />,
  gold: <Sparkles className="h-6 w-6" />,
  small: <Building2 className="h-6 w-6" />,
  medium: <Users className="h-6 w-6" />,
  enterprise: <Sparkles className="h-6 w-6" />,
};

const colorMap: Record<string, string> = {
  starter: "bg-slate-50 text-slate-600",
  silver: "bg-blue-50 text-blue-600",
  gold: "bg-amber-50 text-amber-600",
  small: "bg-purple-50 text-purple-600",
  medium: "bg-indigo-50 text-indigo-600",
  enterprise: "bg-rose-50 text-rose-600",
};

export default function PackagesPage() {
  const router = useRouter();
  const { selectedRole, selectedPackage, setSelectedPackage, getPackages } = useAppStore();
  const packages = getPackages();

  const handleChoose = (pkg: (typeof packages)[0]) => {
    setSelectedPackage(pkg);
    router.push("/register");
  };

  if (!selectedRole) {
    router.push("/choose-account-type");
    return null;
  }

  return (
    <MainLayout>
      <Navbar />
      <section className="relative w-full pt-36 pb-24 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div variants={fadeIn("up", 0.1, 0.6)} initial="hidden" animate="show" className="text-center space-y-6 max-w-3xl mx-auto">
            <Badge className="bg-brand-light/10 border-brand-light/20 text-brand-dark">
              {selectedRole === "individual" ? "Paket Individual" : "Paket Perusahaan"}
            </Badge>
            <h1 className="font-fustat text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Pilih Paket{" "}
              <span className="bg-gradient-to-r from-brand-dark via-brand-main to-brand-light bg-clip-text text-transparent">
                {selectedRole === "individual" ? "Terbaik untukmu" : "Perusahaan"}
              </span>
            </h1>
            <p className="font-inter text-base sm:text-lg text-slate-500 max-w-xl mx-auto">
              {selectedRole === "individual"
                ? "Mulai perjalanan TOEFL Anda dengan paket yang sesuai kebutuhan."
                : "Kelola tim Anda dengan paket perusahaan yang fleksibel."}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.08, 0.1)}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch max-w-5xl mx-auto"
          >
            {packages.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                variants={fadeIn("up", 0.05 * idx, 0.5)}
                className={`glass-card relative p-6 rounded-3xl flex flex-col text-left space-y-6 transition-all duration-300 ${
                  pkg.popular
                    ? "border-brand-main shadow-xl shadow-brand-main/10 ring-1 ring-brand-main/20 scale-100 md:scale-[1.03]"
                    : "hover:border-brand-light/30"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-brand-light to-brand-main text-white shadow-md shadow-brand-main/20">
                      Terpopuler
                    </span>
                  </div>
                )}

                <div className="space-y-5">
                  <div className={`p-3 rounded-2xl w-fit ${colorMap[pkg.id] ?? "bg-slate-50 text-slate-600"}`}>
                    {iconMap[pkg.id] ?? <HelpCircle className="h-6 w-6" />}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-fustat text-2xl font-bold text-slate-800">{pkg.name}</h3>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-fustat text-4xl font-black text-slate-900">{pkg.price}</span>
                    <span className="font-inter text-xs text-slate-400">{pkg.period}</span>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100" />

                <ul className="space-y-3 flex-grow">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs text-slate-600 font-inter">
                      <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 flex-shrink-0">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleChoose(pkg)}
                  className={`w-full py-3 px-4 rounded-2xl font-semibold text-sm transition-all duration-200 ${
                    pkg.popular
                      ? "glass-button-primary text-white shadow-md shadow-brand-main/15"
                      : "glass-button text-slate-700 border border-slate-200"
                  }`}
                >
                  Choose Package
                </button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeIn("up", 0.4, 0.6)} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Garansi uang kembali 7 hari</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Akses penuh ke semua fitur</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Dukungan prioritas 24/7</span>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </MainLayout>
  );
}
