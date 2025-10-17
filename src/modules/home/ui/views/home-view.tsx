import React from "react";
import { HeroSection } from "@/modules/home/ui/sections/hero-section";
import { Navigation } from "@/modules/home/ui/navigation";
import { TrustedBrandsScroll } from "@/modules/home/ui/sections/trusted-brands-scroll";
import { CapabilitiesSection } from "@/modules/home/ui/sections/capabilities-section";
import { TimelineSection } from "@/modules/home/ui/sections/timeline-section";

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
        <TimelineSection />
        {/*<UseCasesSection />*/}
        {/*<DemoSection />*/}
        {/*<PricingSection />*/}
        {/*<TestimonialsSection />*/}
        {/*<CTASection />*/}
        {/*<FooterSection />*/}
      </div>
    </div>
  );
};
