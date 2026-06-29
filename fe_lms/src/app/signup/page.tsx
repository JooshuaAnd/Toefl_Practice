"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MainLayout } from "@/layouts/MainLayout";
import { AccountTypeCard } from "@/components/auth/AccountTypeCard";
import { IndividualSignupForm } from "@/components/auth/IndividualSignupForm";
import { CompanySignupForm } from "@/components/auth/CompanySignupForm";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { fadeIn, scaleUp } from "@/lib/motion";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<"individual" | "company" | null>(null);

  const handleNextStep = (type: "individual" | "company") => {
    setAccountType(type);
    setStep(2);
  };

  const handleSignupSuccess = () => {
    router.push("/dashboard");
  };

  return (
    <MainLayout>
      <div className="min-h-screen w-full flex flex-col justify-center items-center py-12 px-4 relative overflow-visible">
        {/* Back Link to Home */}
        <div className="absolute top-8 left-8 z-20">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-dark transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Center Container */}
        <div className="w-full max-w-2xl flex flex-col items-center">
          {/* Logo Header */}
          <motion.div
            variants={fadeIn("up", 0.1, 0.5)}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center mb-8 space-y-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-light to-brand-main text-white shadow-lg shadow-brand-main/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <h1 className="font-fustat text-3xl font-bold tracking-tight text-slate-900">
              Join LinguEdu
            </h1>
            <p className="font-inter text-sm text-slate-400 font-medium">
              Futuristic TOEFL LMS Platform
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            variants={scaleUp(0.1, 0.6)}
            initial="hidden"
            animate="show"
            className="w-full glass-card p-8 sm:p-10 rounded-[32px] border border-white/40 shadow-2xl relative overflow-visible"
          >
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-2">
                    <h2 className="font-fustat text-xl font-bold text-slate-800">
                      Choose Account Type
                    </h2>
                    <p className="font-inter text-slate-400 text-xs sm:text-sm">
                      Select how you plan to use the TOEFL learning management system.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <AccountTypeCard
                      type="individual"
                      selected={accountType === "individual"}
                      onClick={() => handleNextStep("individual")}
                    />
                    <AccountTypeCard
                      type="company"
                      selected={accountType === "company"}
                      onClick={() => handleNextStep("company")}
                    />
                  </div>

                  <div className="text-center text-xs font-semibold text-slate-500 font-inter pt-4">
                    Already have an account?{" "}
                    <Link href="/signin" className="text-brand-dark hover:underline">
                      Sign In here
                    </Link>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Step Back header */}
                  <div className="flex items-center justify-between pb-2">
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-brand-dark transition-colors font-inter uppercase tracking-wider"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Back
                    </button>
                    <span className="text-xs font-bold text-slate-400 font-inter uppercase tracking-wider">
                      Step 2 of 2
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h2 className="font-fustat text-xl font-bold text-slate-800">
                      {accountType === "company" ? "Institution Registration" : "Create Personal Account"}
                    </h2>
                    <p className="font-inter text-slate-400 text-xs">
                      Please enter details to construct your LinguEdu TOEFL dashboard.
                    </p>
                  </div>

                  {accountType === "individual" ? (
                    <IndividualSignupForm onSubmitSuccess={handleSignupSuccess} />
                  ) : (
                    <CompanySignupForm onSubmitSuccess={handleSignupSuccess} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
