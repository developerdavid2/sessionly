"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import CountUp from "react-countup";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export const plans = [
  {
    id: "0",
    title: "Starter",
    priceMonthly: 19,
    priceYearly: 12,
    caption: "Perfect for individuals",
    features: [
      "10 AI sessions per month",
      "Real-time transcription",
      "Basic AI summaries",
      "7-day meeting history",
      "Email support",
    ],
    icon: "/pricing/circle.svg",
    logo: "/pricing/plan-1.png",
  },
  {
    id: "1",
    title: "Pro",
    priceMonthly: 79,
    priceYearly: 59,
    caption: "Most popular plan",
    features: [
      "Unlimited AI sessions",
      "Advanced AI insights & analytics",
      "Meeting playback & recordings",
      "In-chat AI assistant",
      "90-day meeting history",
      "Priority support",
    ],
    icon: "/pricing/triangle.svg",
    logo: "/pricing/plan-2.png",
  },
  {
    id: "2",
    title: "Team",
    priceMonthly: 200,
    priceYearly: 150,
    caption: "Built for collaboration",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Shared meeting workspace",
      "Team analytics dashboard",
      "Custom AI training",
      "Dedicated account manager",
    ],
    icon: "/pricing/hexagon.svg",
    logo: "/pricing/plan-3.png",
  },
];

export const PricingSection = () => {
  const [monthly, setMonthly] = useState(true);

  const router = useRouter();

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-3 sm:px-4 md:px-6 relative overflow-hidden mask-b-from-85% mask-b-to-95%">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vertical beam of light */}
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 -rotate-45 w-16 h-[120%] bg-gradient-to-b from-cyan-100 via-blue-300 to-transparent blur-[100px] sm:blur-[120px] opacity-35"></div>
      </div>

      {/* Large 3D Logo */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[350px] h-[350px] opacity-40 pointer-events-none mask-b-from-30% mask-b-to-100%">
        <Image
          src="/logo-large-dark.webp"
          fill
          alt="Logo"
          className="w-full h-full object-contain mask-b-from-30% mask-b-to-100%"
        />
      </div>

      <div className="container max-w-[1200px] mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent pt-32 tracking-tighter">
            Pricing that <br /> scales with you
          </h2>
          <p className="text-base text-gray-400 max-w-3xl mx-auto">
            Start free, scale effortlessly. Whether you’re solo or leading a
            team,
            <br />
            Sessionly AI adapts to your pace — not the other way around.
          </p>
        </div>

        {/* Pricing Toggle with Embossed Effect */}
        <div className="relative z-20 mx-auto flex w-[375px] max-md:w-[310px] rounded-3xl border-2 border-white/10 bg-neutral-800/50 backdrop-blur-md p-2 mb-20 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3),0_4px_16px_rgba(0,0,0,0.2)]">
          {/* Sliding background with glow */}
          <div
            className={cn(
              "absolute left-2 top-2 h-[calc(100%-16px)] w-[calc(50%-8px)] rounded-2xl transition-transform duration-500 ease-out",
              "bg-gradient-to-br from-gray-600 via-[#1D1F1F] via-60% to-[#1D1F1F]/50",
              "shadow-[0_8px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.3)]",
              "before:absolute before:-top-12 before:left-8 before:right-8 before:h-24 before:bg-gray-500/30 before:blur-2xl before:content-['']",
              !monthly && "translate-x-full",
            )}
          />

          {/* Toggle Buttons */}
          <button
            className={cn(
              "relative z-10 h-14 flex-1 text-sm font-bold uppercase transition-colors duration-500 rounded-xl",
              monthly ? "text-white" : "text-gray-400 hover:text-gray-300",
            )}
            onClick={() => setMonthly(true)}
          >
            Monthly
          </button>
          <button
            className={cn(
              "relative z-10 h-14 flex-1 text-sm font-bold uppercase transition-colors duration-500 rounded-xl",
              !monthly ? "text-white" : "text-gray-400 hover:text-gray-300",
            )}
            onClick={() => setMonthly(false)}
          >
            Annual
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="relative z-10 flex items-start max-xl:overflow-x-auto max-xl:pb-8 -mt-4">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex-1 min-w-[320px] p-8 transition-all duration-500",
                // Border and background styles
                index === 1
                  ? "bg-[#1D1F1F] border-2 border-gray-500/40 rounded-3xl"
                  : "bg-gradient-to-tr from-[#171717] to-zinc-850 border-2 border-gray-700/50 rounded-3xl",
                // First card rounded corners
                index === 0 && "lg:rounded-tl-3xl lg:rounded-bl-3xl -mr-10 z-9",
                // Last card rounded corners
                index === 2 && "lg:rounded-tr-3xl lg:rounded-br-3xl -ml-10 z-9",
                // Middle card lift effect
                index === 1 && "lg:-mt-8 lg:mb-8 z-10",
              )}
            >
              {/* Top gradient glow for middle card */}
              {index === 1 && (
                <div className="absolute h-72 left-0 right-0 top-0 -z-10 bg-gradient-to-b from-slate-500/20 via-slate-600/10 to-transparent rounded-t-3xl" />
              )}

              {/* Plan Icon/Logo */}
              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 flex items-center justify-center",
                  index === 1 ? "-top-16 w-32 h-32" : "-top-12 w-24 h-24",
                )}
              >
                <div
                  className={cn(
                    "relative w-full h-full rounded-full flex items-center justify-center",
                    index === 1
                      ? "bg-gradient-to-tr from-gray-800 to-zinc-800 shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
                      : "bg-gradient-to-br from-gray-700 to-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.5)]",
                    "border-3 border-gray-500",
                  )}
                >
                  <Image
                    src={plan.logo}
                    alt={plan.title}
                    fill
                    className={cn(
                      "object-contain drop-shadow-2xl grayscale-75",
                      index === 1 ? "w-16 h-16" : "w-12 h-12",
                    )}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Plan Content */}
              <div
                className={cn(
                  "relative flex flex-col items-center",
                  index === 1 ? "pt-20" : "pt-16",
                )}
              >
                {/* Plan Title Badge */}
                <div
                  className={cn(
                    "relative z-20 mb-6 border-2 px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
                    index === 1
                      ? "border-cyan-400/50 text-cyan-400 bg-cyan-500/10"
                      : "border-gray-600 text-gray-300 bg-gray-800/50",
                  )}
                >
                  {plan.title}
                </div>

                {/* Price Display */}
                <div className="relative z-20 flex items-center justify-center mb-2">
                  <div
                    className={cn(
                      "flex items-start text-6xl font-bold",
                      index === 1 ? "text-cyan-400" : "text-white",
                    )}
                  >
                    <span className="text-3xl mt-2">$</span>
                    <CountUp
                      start={plan.priceMonthly}
                      end={monthly ? plan.priceMonthly : plan.priceYearly}
                      duration={0.4}
                      useEasing={false}
                      preserveValue
                    />
                  </div>
                  <div className="text-sm text-gray-400 ml-2 mt-8 uppercase font-medium">
                    / mo
                  </div>
                </div>

                {/* Caption */}
                <div
                  className={cn(
                    "relative z-20 w-full text-center text-gray-400 pb-8 mb-8",
                    index === 1
                      ? "border-b border-cyan-800/50"
                      : "border-b border-gray-700/50",
                  )}
                >
                  {plan.caption}
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-10 w-full">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={cn(
                        "flex items-center gap-3",
                        index === 2 && "ml-10",
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                          index === 1 ? "bg-cyan-500/20" : "bg-gray-700/50",
                        )}
                      >
                        <Check
                          className={cn(
                            "w-3 h-3",
                            index === 1 ? "text-cyan-400" : "text-gray-400",
                          )}
                        />
                      </div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="w-full mx-auto flex items-center justify-center">
                  <Button
                    className={cn(
                      "relative h-12 rounded-xl font-semibold text-sm uppercase tracking-wide text-white w-[60%] overflow-hidden group",
                      index === 1
                        ? "bg-gradient-to-br from-cyan-600 via-cyan-700 to-cyan-800/50 shadow-xl"
                        : "bg-gradient-to-br from-gray-600 via-[#1D1F1F] via-60% to-[#1D1F1F]/50 shadow-2xl",
                    )}
                    onClick={() => router.push("/sign-up")}
                  >
                    {/* Hover overlay for smooth transition */}
                    {index !== 1 && (
                      <span className="absolute inset-0 bg-gradient-to-br from-gray-600 via-[#1D1F1F] via-20% to-[#1D1F1F]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    )}

                    {/* Inner glow overlay */}
                    <span className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[5]"></span>

                    {/* Top edge glow */}
                    <span className="absolute left-[40%] top-0 z-[6] h-[2px] w-[60%] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent opacity-0 group-hover:opacity-60 group-hover:left-4 transition-all duration-500 pointer-events-none"></span>

                    {/* Bottom edge glow */}
                    <span className="absolute bottom-0 left-4 z-[6] h-[2px] w-[35%] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent opacity-0 group-hover:opacity-60 group-hover:left-[60%] transition-all duration-500 pointer-events-none"></span>

                    <span className="relative z-10 flex items-center">
                      Get Started
                    </span>
                  </Button>
                </div>

                {/* Limited Time Offer Badge */}
                {index === 1 && (
                  <p className="mt-6 text-center text-xs text-cyan-400 font-medium">
                    <span className="mx-2">—</span>
                    Limited time offer
                    <span className="mx-2">—</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
