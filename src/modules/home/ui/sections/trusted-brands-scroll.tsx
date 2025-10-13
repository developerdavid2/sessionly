import React from "react";
import ScrollVelocity from "@/modules/home/ui/components/scroll-velocity";
import { Separator } from "@/components/ui/separator";

export const TrustedBrandsScroll = () => {
  return (
    <section className="-mt-32 mask-x-from-80% mask-x-to-95% overflow-x-hidden pb-16 sm:pb-20 md:pb-28 lg:pb-32">
      {/* ScrollVelocity Sections */}
      <div className="relative overflow-hidden rotate-1 opacity-20">
        <Separator className="mt-6 mb-2 bg-slate-200" />
        <ScrollVelocity
          texts={["REQUIREMENTS ✧ DESIGNS ✧ DEVELOPEMENT ✧ TESTING ✧ "]}
          velocity={45}
          className="text-white custom-scroll-text font-poppins-bd whitespace-nowrap"
        />
        <Separator className="mt-2 bg-slate-200" />
        <div className="absolute top-0 left-0 w-24 h-full pointer-events-none bg-gradient-to-r from-slate-950 to-transparent" />
        <div className="absolute top-0 right-0 w-24 h-full pointer-events-none bg-gradient-to-l from-slate-950 to-transparent" />
      </div>

      <div className="relative mt-4 overflow-hidden -rotate-1 opacity-15">
        <Separator className="mt-6 mb-2 bg-slate-200" />
        <ScrollVelocity
          texts={["MONGODB ✦ EXPRESSJS ✦ REACTJS ✦ NODEJS ✦ "]}
          velocity={40}
          className="custom-scroll-text font-poppins-md whitespace-nowrap text-slate-200"
        />
        <Separator className="mt-2 bg-slate-200" />
        <div className="absolute top-0 left-0 w-24 h-full pointer-events-none bg-gradient-to-r from-slate-950 to-transparent" />
        <div className="absolute top-0 right-0 w-24 h-full pointer-events-none bg-gradient-to-l from-slate-950 to-transparent" />
      </div>
    </section>
  );
};
