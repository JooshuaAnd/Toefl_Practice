"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/layouts/MainLayout";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/stores/useAppStore";
import { fadeIn } from "@/lib/motion";
import { Check, User, Building2, Package, Calendar, ShieldCheck, Sparkles, ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { selectedRole, selectedPackage, currentUser, setSubscription } = useAppStore();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!currentUser || !selectedPackage || !selectedRole) {
      router.push("/choose-account-type");
    }
  }, [currentUser, selectedPackage, selectedRole, router]);

  if (!currentUser || !selectedPackage || !selectedRole) return null;

  const handlePurchase = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));

    const now = new Date();
    const expiry = new Date(now);
    expiry.setMonth(expiry.getMonth() + 1);

    const sub = {
      packageName: selectedPackage.name,
      role: selectedRole,
      startDate: now.toISOString(),
      expiryDate: expiry.toISOString(),
      status: "active" as const,
      price: selectedPackage.price,
      period: selectedPackage.period,
      features: selectedPackage.features,
    };

    setSubscription(sub);
    setIsProcessing(false);

    if (selectedRole === "individual") {
      router.push("/dashboard");
    } else {
      router.push("/company/dashboard");
    }
  };

  return (
    <MainLayout>
      <Navbar />
      <section className="relative w-full min-h-screen pt-36 pb-24 px-4 flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <motion.div variants={fadeIn("up", 0.1, 0.6)} initial="hidden" animate="show" className="space-y-4">
            <Link href="/register" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-brand-dark transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Register
            </Link>
            <Badge className="bg-brand-light/10 border-brand-light/20 text-brand-dark">Checkout</Badge>
            <h1 className="font-fustat text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Konfirmasi{" "}
              <span className="bg-gradient-to-r from-brand-dark via-brand-main to-brand-light bg-clip-text text-transparent">Pesanan</span>
            </h1>
            <p className="font-inter text-sm text-slate-500">Review pesanan Anda sebelum melanjutkan pembayaran</p>
          </motion.div>

          <motion.div variants={fadeIn("up", 0.15, 0.65)} initial="hidden" animate="show" className="space-y-4">
            <div className="glass-card p-6 rounded-3xl space-y-5 hover:translate-y-0">
              <h3 className="font-fustat text-lg font-bold text-slate-800 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-brand-main" />
                Order Summary
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                  <div className="p-2.5 rounded-xl bg-brand-main/10 text-brand-main">
                    {selectedRole === "individual" ? <User className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account Type</p>
                    <p className="text-sm font-bold text-slate-800 capitalize">{selectedRole}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Package</p>
                    <p className="text-sm font-bold text-slate-800">{selectedPackage.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-slate-900">{selectedPackage.price}</p>
                    <p className="text-[10px] text-slate-400">{selectedPackage.period}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</p>
                    <p className="text-sm font-bold text-slate-800">1 Month</p>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-slate-100" />

              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Features Included</p>
                <ul className="space-y-2">
                  {selectedPackage.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 flex-shrink-0">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full h-px bg-slate-100" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600">Total</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-fustat text-2xl font-black text-slate-900">{selectedPackage.price}</span>
                  <span className="text-xs text-slate-400">{selectedPackage.period}</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl space-y-4 hover:translate-y-0">
              <h3 className="font-fustat text-base font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                Payment Simulation
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Karena backend belum tersedia, pembayaran akan disimulasikan. 
                Klik Complete Purchase untuk menyelesaikan pemesanan dan mengaktifkan paket Anda.
              </p>
            </div>

            <Button
              onClick={handlePurchase}
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 animate-spin" />
                  Processing Payment...
                </span>
              ) : (
                "Complete Purchase"
              )}
            </Button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </MainLayout>
  );
}
