"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();
  return (
    <section className="min-h-[100svh] flex items-center justify-center px-3 sm:px-4 md:px-6 pt-20 sm:pt-24 md:pt-32 lg:pt-36 pb-16 sm:pb-20 relative mask-b-from-40% mask-b-to-85%">
      {/* Background blur effects - adjusted for mobile */}
      <div className="blur-[8rem] sm:blur-[12rem] size-60 sm:size-80 bg-slate-50/40 absolute top-4 left-1/2 -translate-x-1/2 -z-1" />
      <div className="blur-[12rem] sm:blur-[20rem] size-40 sm:size-60 bg-slate-100/10 absolute top-4 left-1/2 -translate-x-1/2 -z-1" />
      <div className="w-full">
        {/* Constrained content area */}
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge - responsive sizing */}
          <div className="mb-4 sm:mb-6 md:mb-8 inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#5dd5ed] flex-shrink-0" />
            <span className="text-xs sm:text-sm whitespace-nowrap">
              Trusted by professionals
            </span>
          </div>

          {/* Main headline - fluid typography with better scaling */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent leading-[1.1] sm:leading-none px-2">
            <span className="headline-glow">Meet</span> with AI.
            <br />
            Decide faster.
          </h1>

          {/* Subheadline - responsive text sizing */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-6 sm:mb-8 md:mb-12 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-6">
            Real-time AI assistance that joins your conversations, captures
            every detail, and turns meetings into actionable insights.
          </p>

          {/* CTA Buttons - responsive sizing and stacking */}
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4 sm:px-0 w-fit mx-auto">
            <Button
              size="sm"
              className="btn-neomorph text-cyan-100 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-xl font-medium relative group w-fit bg-gradient-to-br from-cyan-600 via-cyan-700 to-cyan-800 shadow-[0_4px_16px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.3)] before:absolute before:-top-12 before:left-8 before:right-8 before:h-24 before:bg-cyan-500/30 before:blur-2xl before:content-['']"
              onClick={() => router.push("/sign-up")}
            >
              <span className="btn-inner-glow" />
              <span className="relative z-10 flex items-center justify-center">
                <ArrowRight className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Get Started
              </span>
              <span className="btn-glow-top" />
              <span className="btn-glow-bottom" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 glass-card hover:bg-white/10 text-white text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-xl transition-all duration-300 bg-transparent w-fit"
            >
              <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Full-width showcase - responsive widths */}
        <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto px-2 sm:px-4 md:px-6 lg:px-12 xl:px-16 z-10">
          <div className="relative">
            {/* Main showcase container - responsive padding */}
            <div className="relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl border border-white/20 overflow-hidden will-change-transform p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12">
              {/* Top accent glow line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-400/80 to-transparent"></div>

              {/* Inner container for video */}
              <div className="relative">
                {/* Corner decorative elements - responsive sizing */}
                <div className="absolute -top-1.5 sm:-top-2 md:-top-3 -left-1.5 sm:-left-2 md:-left-3 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 border-t border-l sm:border-t-2 sm:border-l-2 border-slate-400/30 rounded-tl-lg sm:rounded-tl-xl"></div>
                <div className="absolute -top-1.5 sm:-top-2 md:-top-3 -right-1.5 sm:-right-2 md:-right-3 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 border-t border-r sm:border-t-2 sm:border-r-2 border-slate-400/30 rounded-tr-lg sm:rounded-tr-xl"></div>
                <div className="absolute -bottom-1.5 sm:-bottom-2 md:-bottom-3 -left-1.5 sm:-left-2 md:-left-3 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 border-b border-l sm:border-b-2 sm:border-l-2 border-slate-400/30 rounded-bl-lg sm:rounded-bl-xl"></div>
                <div className="absolute -bottom-1.5 sm:-bottom-2 md:-bottom-3 -right-1.5 sm:-right-2 md:-right-3 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 border-b border-r sm:border-b-2 sm:border-r-2 border-slate-400/30 rounded-br-lg sm:rounded-br-xl"></div>

                {/* Video/Screenshot container with 16:9 aspect ratio */}
                <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] sm:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                  {/* Overlay grid pattern */}
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                      backgroundSize: "30px 30px",
                    }}
                  ></div>

                  {/* Video element */}
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/demo-video.mp4" type="video/mp4" />
                  </video>

                  {/* Inner shadow for depth */}
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.3)] sm:shadow-[inset_0_0_100px_rgba(0,0,0,0.3)] pointer-events-none"></div>

                  {/* Subtle vignette effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>

                  {/* Video corner accents - responsive */}
                  <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 w-6 sm:w-10 md:w-12 h-6 sm:h-10 md:h-12 border-t border-l sm:border-t-2 sm:border-l-2 border-slate-400/70 rounded-tl-md sm:rounded-tl-lg"></div>
                  <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 w-6 sm:w-10 md:w-12 h-6 sm:h-10 md:h-12 border-t border-r sm:border-t-2 sm:border-r-2 border-slate-400/70 rounded-tr-md sm:rounded-tr-lg"></div>
                  <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 w-6 sm:w-10 md:w-12 h-6 sm:h-10 md:h-12 border-b border-l sm:border-b-2 sm:border-l-2 border-slate-400/70 rounded-bl-md sm:rounded-bl-lg"></div>
                  <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 w-6 sm:w-10 md:w-12 h-6 sm:h-10 md:h-12 border-b border-r sm:border-b-2 sm:border-r-2 border-slate-400/70 rounded-br-md sm:rounded-br-lg"></div>
                </div>
              </div>

              {/* Bottom glow accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-400/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
