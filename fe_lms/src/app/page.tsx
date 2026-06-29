"use client";

import React from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Navbar } from "@/components/navbar/Navbar";
import { HeroSection } from "@/sections/HeroSection";
import { FeaturesSection } from "@/sections/FeaturesSection";
import { FreeTrialSection } from "@/sections/FreeTrialSection";
import { PackageSection } from "@/sections/PackageSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { FAQSection } from "@/sections/FAQSection";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <MainLayout>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <FreeTrialSection />
      <PackageSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </MainLayout>
  );
}
