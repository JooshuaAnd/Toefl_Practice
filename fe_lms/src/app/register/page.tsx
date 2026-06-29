"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/layouts/MainLayout";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAppStore } from "@/stores/useAppStore";
import { fadeIn } from "@/lib/motion";
import { User, Building2, Package, ArrowLeft, Check, Sparkles } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { selectedRole, selectedPackage, setCurrentUser } = useAppStore();

  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    picName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!selectedRole || !selectedPackage) {
      router.push("/choose-account-type");
    }
  }, [selectedRole, selectedPackage, router]);

  if (!selectedRole || !selectedPackage) return null;

  const isIndividual = selectedRole === "individual";

  const validate = () => {
    const errs: Record<string, string> = {};
    if (isIndividual) {
      if (!form.fullName.trim()) errs.fullName = "Full name is required";
      if (!form.email.trim()) errs.email = "Email is required";
      if (!form.password) errs.password = "Password is required";
      else if (form.password.length < 6) errs.password = "Min 6 characters";
      if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    } else {
      if (!form.companyName.trim()) errs.companyName = "Company name is required";
      if (!form.picName.trim()) errs.picName = "PIC name is required";
      if (!form.email.trim()) errs.email = "Email is required";
      if (!form.phone.trim()) errs.phone = "Phone number is required";
      if (!form.password) errs.password = "Password is required";
      else if (form.password.length < 6) errs.password = "Min 6 characters";
      if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    const user = {
      id: crypto.randomUUID(),
      role: selectedRole,
      name: isIndividual ? form.fullName : form.picName,
      email: form.email,
      ...(isIndividual ? {} : { companyName: form.companyName, picName: form.picName, phone: form.phone }),
    };

    setCurrentUser(user);
    setIsSubmitting(false);
    router.push("/checkout");
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <MainLayout>
      <Navbar />
      <section className="relative w-full min-h-screen pt-36 pb-24 px-4 flex items-center justify-center">
        <div className="w-full max-w-lg mx-auto space-y-8">
          <motion.div variants={fadeIn("up", 0.1, 0.6)} initial="hidden" animate="show" className="space-y-4">
            <Link href="/packages" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-brand-dark transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Packages
            </Link>
            <Badge className="bg-brand-light/10 border-brand-light/20 text-brand-dark">Register</Badge>
            <h1 className="font-fustat text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Buat Akun{" "}
              <span className="bg-gradient-to-r from-brand-dark via-brand-main to-brand-light bg-clip-text text-transparent">Anda</span>
            </h1>
          </motion.div>

          <motion.div variants={fadeIn("up", 0.15, 0.65)} initial="hidden" animate="show" className="glass-card p-5 rounded-2xl space-y-3 hover:translate-y-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-brand-main/10 text-brand-main">
                {isIndividual ? <User className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Selected Role</p>
                <p className="text-sm font-bold text-slate-800 capitalize">{selectedRole}</p>
              </div>
            </div>
            <div className="w-full h-px bg-slate-100" />
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <Package className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Selected Package</p>
                <p className="text-sm font-bold text-slate-800">{selectedPackage.name}</p>
              </div>
              <span className="text-sm font-black text-slate-800">{selectedPackage.price}</span>
            </div>
          </motion.div>

          <motion.form onSubmit={handleSubmit} variants={fadeIn("up", 0.2, 0.7)} initial="hidden" animate="show" className="glass-card p-8 rounded-3xl space-y-5 hover:translate-y-0">
            {isIndividual ? (
              <>
                <Input id="fullName" label="Full Name" placeholder="John Doe" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} error={errors.fullName} />
                <Input id="email" label="Email" type="email" placeholder="john@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} error={errors.email} />
                <Input id="password" label="Password" type="password" placeholder="Min 6 characters" value={form.password} onChange={(e) => update("password", e.target.value)} error={errors.password} />
                <Input id="confirmPassword" label="Confirm Password" type="password" placeholder="Repeat your password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} error={errors.confirmPassword} />
              </>
            ) : (
              <>
                <Input id="companyName" label="Company Name" placeholder="PT. Example" value={form.companyName} onChange={(e) => update("companyName", e.target.value)} error={errors.companyName} />
                <Input id="picName" label="PIC Name" placeholder="John Doe" value={form.picName} onChange={(e) => update("picName", e.target.value)} error={errors.picName} />
                <Input id="email" label="Email" type="email" placeholder="john@company.com" value={form.email} onChange={(e) => update("email", e.target.value)} error={errors.email} />
                <Input id="phone" label="Phone Number" placeholder="+62 812 3456 7890" value={form.phone} onChange={(e) => update("phone", e.target.value)} error={errors.phone} />
                <Input id="password" label="Password" type="password" placeholder="Min 6 characters" value={form.password} onChange={(e) => update("password", e.target.value)} error={errors.password} />
                <Input id="confirmPassword" label="Confirm Password" type="password" placeholder="Repeat your password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} error={errors.confirmPassword} />
              </>
            )}

            <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 animate-spin" />
                  Processing...
                </span>
              ) : (
                "Lanjut ke Checkout"
              )}
            </Button>
          </motion.form>
        </div>
      </section>
      <Footer />
    </MainLayout>
  );
}
