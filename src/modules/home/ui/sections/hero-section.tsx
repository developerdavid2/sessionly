"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, Play, ArrowRight } from "lucide-react";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-bacground";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-36 pb-32 relative">
      <DottedGlowBackground
        className="pointer-events-none mask-radial-to-90% mask-radial-at-center opacity-20 dark:opacity-100 -z-1"
        opacity={0.2}
        gap={10}
        radius={4}
        colorLightVar="--color-neutral-500"
        glowColorLightVar="--color-neutral-600"
        colorDarkVar="--color-neutral-500"
        glowColorDarkVar="--color-sky-800"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />
      <div className="blur-[12rem] size-80 bg-cyan-50/40 absolute top-4 left-1/2 -translate-x-1/2 -z-1" />
      {/*<div className="blur-[20rem] size-60 bg-cyan-100/10 absolute top-4 left-1/2 -translate-x-1/2 -z-1" />*/}

      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card shadow-[0_0_20px_rgba(93,213,237,0.2)]">
          <Sparkles className="w-4 h-4 text-[#5dd5ed]" />
          <span className="text-sm text-[#5dd5ed]">
            Trusted by professionals
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent leading-none">
          Meet with AI.
          <br />
          Decide faster.
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Real-time AI assistance that joins your conversations, captures every
          detail, and turns meetings into actionable insights.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Button
            size="lg"
            className="bg-[#7D848C] text-white text-lg px-8 py-6 rounded-xl font-medium"
          >
            Start Free Session
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 glass-card hover:bg-white/10 text-white text-lg px-8 py-6 rounded-xl transition-all duration-300 bg-transparent"
          >
            <Play className="mr-2 w-5 h-5" />
            Watch Demo
          </Button>
        </div>

        {/* Floating Product Screenshot */}
      </div>
    </section>
  );
}
