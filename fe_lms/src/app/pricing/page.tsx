"use client";

import React from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Navbar } from "@/components/navbar/Navbar";
import { PricingSection } from "@/sections/PricingSection";

export default function PricingPage() {
  return (
    <MainLayout>
      <Navbar />
      <div className="pt-20">
        <PricingSection />
      </div>
    </MainLayout>
  );
}
