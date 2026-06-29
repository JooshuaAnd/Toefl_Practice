"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MainLayout } from "@/layouts/MainLayout";
import { AuthInput } from "@/components/auth/AuthInput";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { useAuth } from "@/hooks/useAuth";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { fadeIn, scaleUp } from "@/lib/motion";

export default function SigninPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, rememberMe: e.target.checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const success = await login(formData.email);
      if (success) {
        router.push("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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
        <div className="w-full max-w-md flex flex-col items-center">
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
              Welcome Back
            </h1>
            <p className="font-inter text-sm text-slate-400 font-medium">
              Access your TOEFL dashboard
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            variants={scaleUp(0.1, 0.6)}
            initial="hidden"
            animate="show"
            className="w-full glass-card p-8 rounded-[32px] border border-white/40 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold font-inter">
                  {error}
                </div>
              )}

              <AuthInput
                label="Email Address"
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />

              <PasswordInput
                label="Password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
              />

              {/* Remember Me / Forgot Password */}
              <div className="flex items-center justify-between text-xs font-semibold font-inter">
                <label className="flex items-center gap-2 text-slate-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleCheckboxChange}
                    className="rounded border-slate-300 text-brand-main focus:ring-brand-light/30 h-4 w-4"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="text-brand-dark hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-2 rounded-[16px] glass-button-primary font-semibold text-white transition-all duration-300 shadow-lg shadow-brand-main/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <div className="text-center text-xs font-semibold text-slate-500 font-inter pt-2">
                Don't have an account?{" "}
                <Link href="/signup" className="text-brand-dark hover:underline">
                  Sign Up here
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
