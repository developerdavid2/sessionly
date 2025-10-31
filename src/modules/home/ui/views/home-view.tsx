import React from "react";
import { HeroSection } from "@/modules/home/ui/sections/hero-section";
import { Navigation } from "@/modules/home/ui/navigation";
import { TrustedBrandsScroll } from "@/modules/home/ui/sections/trusted-brands-scroll";
import { CapabilitiesSection } from "@/modules/home/ui/sections/capabilities-section";
import { HowItWorks } from "@/modules/home/ui/sections/how-it-works";
import { UseCasesSection } from "@/modules/home/ui/sections/use-cases-section";
import { PricingSection } from "@/modules/home/ui/sections/pricing-section";
import { TestimonialSection } from "@/modules/home/ui/sections/testimonials-section";
import CTASection from "@/modules/home/ui/sections/cta-section";
import { Footer } from "@/modules/home/ui/sections/footer-section";

export const HomeView = () => {
  return (
    <div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial gradient overlays */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#5dd5ed]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <TrustedBrandsScroll />
        <CapabilitiesSection />
        <HowItWorks />
        <UseCasesSection />
        <div className="relative overflow-hidden">
          {/* Shared vertical beam */}
          <div className="absolute -top-[50%] left-5 -rotate-[30deg] w-16 h-[150%] bg-gradient-to-b from-slate-200 via-slate-400 to-transparent blur-[100px] sm:blur-[120px] opacity-70 z-[50]"></div>
          <PricingSection />
          <TestimonialSection />
        </div>
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};
