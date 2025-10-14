import React from "react";
import { VideoIcon } from "lucide-react";
import { FiCircle, FiMic, FiMonitor, FiPhoneOff } from "react-icons/fi";
import Image from "next/image";

export const FeatureAiVoice = () => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
      <div className="bg-white/[0.02] backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center w-fit mb-10 mx-auto p-4">
        <div className="flex justify-center items-center w-full size-[50%] relative">
          <Image
            className="w-auto h-auto object-cover pointer-events-none"
            fill
            src="/capabilities/robot.png"
            loading="lazy"
            alt="Robot"
          />
          <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-ping" />
        </div>
      </div>

      <div className="flex items-center gap-x-2 mask-x-from-70% mask-x-to-95%">
        <div className="bg-white/[0.02] backdrop-blur-lg rounded-full flex items-center justify-center size-full p-6 w-fit">
          <VideoIcon className="size-5" />
        </div>

        <div className="bg-white/[0.02] backdrop-blur-lg rounded-full flex items-center justify-center size-full p-6 w-fit">
          <FiMic className="size-5" />
        </div>
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center animate-pulse border border-blue-500/20">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-500/30">
                <FiPhoneOff className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-ping" />
          </div>
        </div>
        <div className="bg-white/[0.02] backdrop-blur-lg rounded-full flex items-center justify-center size-full p-6 w-fit">
          <FiMonitor className="size-5" />
        </div>
        <div className="bg-white/[0.02] backdrop-blur-lg rounded-full flex items-center justify-center size-full p-6 w-fit">
          <FiCircle className="size-5" />
        </div>
      </div>
    </div>
  );
};
