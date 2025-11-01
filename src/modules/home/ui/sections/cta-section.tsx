"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { AuroraText } from "@/components/ui/aurora-text";

export default function CTASection() {
  const router = useRouter();
  return (
    <section className="relative w-full py-24 flex items-center justify-center overflow-hidden bg-black/10 min-h-screen rounded-t-[4rem] mask-t-from-70% ">
      {/* Vertical beam of light */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 -rotate-45 w-16 h-[120%] bg-gradient-to-b from-cyan-100 via-sky-300 to-transparent blur-[100px] sm:blur-[120px] opacity-35"></div>

      {/*Custom ball gradient*/}
      <div className="size-10 lg:size-32 rounded-full bg-gradient-to-br from-neutral-700 to-zinc-900/15 absolute bottom-[2%] left-[2%] will-change-transform opacity-40" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2">
        {/* Outer Glow Layer */}
        <div className="relative flex items-center justify-center">
          <div className="absolute size-[40rem] rounded-full overflow-hidden border border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.4)] backdrop-blur-3xl opacity-40 bg-gradient-to-br from-gray-600 via-[#1D1F1F] via-20% to-[#1D1F1F]/70">
            <Image
              src="/cta/pattern.png"
              alt="Background pattern"
              fill
              priority
              className="object-cover mix-blend-overlay"
            />
          </div>

          {/* Mid Layer */}
          <div className="absolute size-[30rem] rounded-full overflow-hidden border border-white/10  shadow-[0_0_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl opacity-50 bg-gradient-to-br from-gray-600 via-[#1D1F1F] via-20% to-[#1D1F1F]/70">
            <Image
              src="/cta/pattern.png"
              alt="Background pattern"
              fill
              priority
              className="object-cover mix-blend-overlay"
            />
          </div>

          {/* Inner Layer */}
          <div className="absolute size-[20rem] rounded-full overflow-hidden border border-white/20 bg-[#3A3848]/80 shadow-[0_0_20px_rgba(0,0,0,0.3)]  bg-gradient-to-br from-gray-600 via-[#1D1F1F] via-20% to-[#1D1F1F]/70">
            <Image
              src="/cta/pattern.png"
              alt="Background pattern"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent pt-32 tracking-tighter">
          Start your first <AuroraText>AI session</AuroraText>
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          Join <span className="font-medium text-white">10,000+</span>{" "}
          professionals already boosting productivity with Sessionly AI.
        </p>

        {/* CTA Button */}
        <div className="w-full mx-auto flex items-center justify-center">
          <Button
            className={cn(
              "relative h-12 rounded-xl font-semibold text-sm uppercase tracking-wide text-white w-[40%] overflow-hidden group",
              "bg-gradient-to-br from-gray-600 via-[#1D1F1F] via-60% to-[#1D1F1F]/50 shadow-xl",
            )}
            onClick={() => router.push("/sign-up")}
          >
            {/* Inner glow overlay */}
            <span className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[5]"></span>

            {/* Top edge glow */}
            <span className="absolute left-[40%] top-0 z-[6] h-[2px] w-[60%] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent opacity-0 group-hover:opacity-60 group-hover:left-4 transition-all duration-500 pointer-events-none"></span>

            {/* Bottom edge glow */}
            <span className="absolute bottom-0 left-4 z-[6] h-[2px] w-[35%] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent opacity-0 group-hover:opacity-60 group-hover:left-[60%] transition-all duration-500 pointer-events-none"></span>

            <span className="relative z-10 flex items-center">Get Started</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
