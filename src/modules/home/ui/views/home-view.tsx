import React from "react";
import { HeroSection } from "@/modules/home/ui/sections/hero-section";
import { Navigation } from "@/modules/home/ui/navigation";

export const HomeView = () => {
  return (
    <div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#5dd5ed]/20 to-transparent animate-pulse"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#4fc3f7]/20 to-transparent animate-pulse"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        />
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#5dd5ed]/10 to-transparent" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4fc3f7]/10 to-transparent" />

        {/* Radial gradient overlays */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#5dd5ed]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#4fc3f7]/5 rounded-full blur-3xl" />
      </div>
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        {/*<SocialProofSection />*/}
        {/*<CapabilitiesSection />*/}
        {/*<TimelineSection />*/}
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
