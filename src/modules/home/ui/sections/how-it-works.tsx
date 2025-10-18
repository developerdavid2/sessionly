import { Card } from "@/components/ui/card";
import { ArrowRight, Mic, Notebook } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AiFillRobot } from "react-icons/ai";

export const HowItWorks = () => {
  return (
    <section className="py-32 px-4 relative">
      <div className="container max-w-[1400px] mx-auto px-4">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <Badge className="text-xs sm:text-sm text-cyan-400 bg-cyan-600/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-cyan-400/20 mb-6 sm:mb-8">
            How It Works
          </Badge>

          <div className="flex flex-col lg:flex-row justify-between gap-4 sm:gap-6 lg:gap-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-none w-[50%]">
              Three steps to better meetings
            </h2>
            <div className="flex flex-col items-end gap-y-6">
              <p className="text-base text-gray-400 max-w-md lg:text-right">
                Discover how Sessionly AI helps your team stay focused, capture
                every key moment, and turn conversations into actionable
                insights — all automatically.
              </p>
              <Button
                size="sm"
                className="btn-neomorph text-cyan-400 text-base px-5 py-6 rounded-xl font-medium relative group w-fit"
              >
                <span className="btn-inner-glow" />
                <span className="relative z-10 flex items-center justify-center">
                  <ArrowRight className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Get Started
                </span>
                <span className="btn-glow-top" />
                <span className="btn-glow-bottom" />
              </Button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {/* Step 1 */}
            <Card className="relative group bg-white/[0.02] backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 h-[500px]">
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
                <div className="flex items-start justify-start gap-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors duration-500 flex-shrink-0">
                    <AiFillRobot className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-0.5 sm:mb-1 text-white">
                      Create your agent and meeting
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Spin up a smart meeting agent in seconds. Choose an agent
                      type that fits your session.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Step 2 */}
            <Card className="relative group bg-white/[0.02] backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 h-[500px]">
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

                <div className="flex items-start justify-start gap-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors duration-500 flex-shrink-0">
                    <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-0.5 sm:mb-1 text-white">
                      Start the meeting
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Launch your meeting, invite your team, and start the
                      conversation.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Step 3 */}
            <Card className="relative group bg-white/[0.02] backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 h-[500px]">
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
                <div className="flex items-start justify-start gap-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors duration-500 flex-shrink-0">
                    <Notebook className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-0.5 sm:mb-1 text-white">
                      Generate insights and summaries
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Once the meeting wraps, Sessionly automatically delivers
                      structured summaries.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
