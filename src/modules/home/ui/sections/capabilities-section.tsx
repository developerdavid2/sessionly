"use client";
import { Card } from "@/components/ui/card";
import { FileText, Mic, Play, Search, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { FeatureAiVoice } from "@/modules/home/ui/components/feature-ai-voice";
import React from "react";

export function CapabilitiesSection() {
  return (
    <section
      id="features"
      className="py-16 sm:py-20 md:py-24 lg:py-32 px-3 sm:px-4 md:px-6 bg-black/20 relative overflow-hidden"
    >
      <div className="container max-w-[1400px] mx-auto px-4">
        {/*Custom ball Gradient*/}
        <div className="size-10 lg:size-20 rounded-full bg-gradient-to-br from-white to-cyan-900/15 absolute top-[20%] right-[4%] will-change-transform" />
        <div className="size-10 lg:size-32 rounded-full bg-gradient-to-br from-neutral-700 to-zinc-900/15 absolute bottom-[2%] left-[2%] will-change-transform" />
        {/* Connecting geometric lines - decorative */}
        <div className="absolute inset-0 pointer-events-none opacity-90">
          {/* Vertical lines */}
          <div className="absolute left-[15%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-500/30 to-transparent" />
          <div className="absolute left-[50%] -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-500/20 to-transparent" />
          <div className="absolute right-[15%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-500/30 to-transparent" />

          {/* Horizontal lines */}
          <div className="absolute top-[15%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent" />
          <div className="absolute top-[60%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-500/30 to-transparent" />

          {/* Diagonal connecting lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="15%"
              y1="25%"
              x2="45%"
              y2="60%"
              stroke="url(#gradient1)"
              strokeWidth="1"
            />
            <line
              x1="45%"
              y1="25%"
              x2="80%"
              y2="60%"
              stroke="url(#gradient2)"
              strokeWidth="1"
            />
            <defs>
              <linearGradient
                id="gradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(93, 213, 237, 0)" />
                <stop offset="50%" stopColor="rgba(93, 213, 237, 0.3)" />
                <stop offset="100%" stopColor="rgba(93, 213, 237, 0)" />
              </linearGradient>
              <linearGradient
                id="gradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(93, 213, 237, 0)" />
                <stop offset="50%" stopColor="rgba(93, 213, 237, 0.2)" />
                <stop offset="100%" stopColor="rgba(93, 213, 237, 0)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Connection dots */}
          <div className="absolute left-[15%] top-[25%] w-2 h-2 rounded-full bg-slate-500/40 blur-sm" />
          <div className="absolute left-[50%] top-[14.9%] -translate-y-[15%] -translate-x-1/2 w-2 h-2 rounded-full bg-slate-500/40" />
          <div className="absolute right-[15%] top-[60%] w-2 h-2 rounded-full bg-slate-500/40 blur-sm" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <Badge className="text-xs sm:text-sm text-cyan-400 bg-cyan-600/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-cyan-400/20 mb-6 sm:mb-8">
              Capabilities
            </Badge>

            <div className="flex flex-col lg:flex-row justify-between gap-4 sm:gap-6 lg:gap-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-none w-[50%]">
                Your AI meeting companion
              </h2>
              <p className="text-base text-gray-400 max-w-sm lg:text-right ">
                Sessionly joins your conversations and handles everything
                you&#39;d forget
              </p>
            </div>
          </div>

          {/* Bento Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 auto-rows-[minmax(180px,auto)] sm:auto-rows-[200px]">
            {/*FIRST CELL*/}
            {/* Large card - Never miss a detail */}
            <Card className="sm:col-span-2 lg:col-span-4 lg:row-span-3 relative group bg-[#161817] rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 ">
              {/* Subtle top glow line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/*Beam Glow*/}
              <div className="blur-[6rem] size-16 bg-slate-100 absolute top-5 left-1/2" />
              {/* Cyan accent glow on hover - very subtle */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="h-full p-4 sm:p-6 md:p-8 flex flex-col">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors duration-500">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                    Never miss a detail
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
                  Real-time transcription with speaker identification and
                  timestamps
                </p>

                <div className="absolute top-[30%] left-1/2 -translate-x-1/2  bg-gradient-to-br bg-zinc-500/10 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden w-[70%] mx-auto h-full border border-white/10 shadow-2xl  mask-b-from-10% mask-b-to-60%">
                  {/* Image element */}
                  <Image
                    className="w-auto h-auto object-cover pointer-events-none"
                    fill
                    src="/capabilities/feature-2.jpeg"
                    loading="lazy"
                    alt="Feature 1"
                  />
                  {/* Overlay grid pattern */}
                </div>
              </div>
            </Card>

            {/* Medium card - AI joins you */}
            <Card className="sm:col-span-2 lg:col-span-2 lg:row-span-3 relative group bg-white/[0.02] backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden transition-all duration-500">
              {/*Subtle border glow*/}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/*Beam Glow*/}
              <div className="blur-[6rem] size-16 bg-gradient-to-br from-slate-100/60 to-slate-200 absolute bottom-5 left-1/2" />

              <div className="relative h-full p-4 sm:p-6 flex flex-col">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors duration-500">
                    <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">
                    AI joins you
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-gray-400 mb-4">
                  Voice-activated assistant ready to help
                </p>
                <FeatureAiVoice />
              </div>
            </Card>

            {/* Small card - Find anything */}
            <Card className="sm:col-span-1 lg:col-span-2 lg:row-span-2 relative group bg-white/[0.02] backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden transition-all duration-500">
              {/*Subtle border glow*/}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/*Beam Glow*/}
              <div className="blur-[6rem] size-16 bg-cyan-100/30 absolute bottom-5 left-1/2" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative p-4 sm:p-6 flex items-end h-full gap-3 sm:gap-4">
                <div className="absolute top-[1%] left-1/2 -translate-x-1/2  bg-gradient-to-br bg-zinc-500/10 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden w-[90%] mx-auto h-full border border-white/10 shadow-2xl  mask-b-from-10% mask-b-to-80%">
                  {/* Image element */}
                  <Image
                    className="w-auto h-auto object-cover pointer-events-none"
                    fill
                    src="/capabilities/feature-search.webp"
                    loading="lazy"
                    alt="Feature Search"
                  />
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors duration-500 flex-shrink-0">
                  <Search className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold mb-0.5 sm:mb-1 text-white">
                    Find anything
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Instant semantic search
                  </p>
                </div>
              </div>
            </Card>

            {/* Large card - Share the full story */}
            <Card className="sm:col-span-2 lg:col-span-4 lg:row-span-4 relative group bg-white/[0.02] backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative h-full p-4 sm:p-6 md:p-8 flex flex-col">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors duration-500">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                    Share the full story
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
                  Playback with highlights and key moments
                </p>

                <div className="absolute top-[25%] left-1/2 -translate-x-1/2  bg-gradient-to-br bg-zinc-500/10 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden w-[90%] mx-auto h-full border border-white/10 shadow-2xl  mask-b-from-10% mask-b-to-80%">
                  {/* Image element */}
                  <Image
                    className="w-auto h-auto object-cover pointer-events-none"
                    fill
                    src="/capabilities/feature-search.webp"
                    loading="lazy"
                    alt="Feature Search"
                  />
                </div>
              </div>
            </Card>

            {/* Medium card - Decisions documented */}
            <Card className="sm:col-span-1 lg:col-span-2 lg:row-span-2 relative group bg-white/[0.02] backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden transition-all duration-500">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="absolute top-[5%] right-0  bg-gradient-to-br bg-zinc-500/10 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden w-[95%] mx-auto h-full border border-white/10 shadow-2xl  mask-b-from-10% mask-b-to-80% mask-r-from-70% mask-r-to-100%">
                {/* Image element */}
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/demo-video.mp4" type="video/mp4" />
                </video>
                {/* Overlay grid pattern */}
              </div>

              <div className="relative p-4 sm:p-6 flex items-end h-full gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors duration-500 flex-shrink-0">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold mb-0.5 sm:mb-1 text-white">
                    Decisions, documented
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    AI-generated summaries
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
