import React from "react";
import { VideoIcon } from "lucide-react";
import { FiCircle, FiMic, FiMonitor, FiPhoneOff } from "react-icons/fi";
import Image from "next/image";
import { AiFillDiscord } from "react-icons/ai";
import { FaRobot } from "react-icons/fa";

export const FeatureAiVoice = () => {
  return (
    <div className="absolute top-[60%] -translate-y-[60%] left-1/2 -translate-x-1/2 ">
      <div className="flex items-center justify-center mb-12">
        <div className="relative">
          <div className="w-20 h-20 sm:size-40 rounded-full bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 flex items-center justify-center animate-pulse border border-cyan-500/20">
            <div className="w-14 h-14 sm:size-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center border border-cyan-500/30">
              <FaRobot className="w-6 h-6 sm:size-16 text-white" />
            </div>
          </div>
          <div className="absolute inset-0 rounded-full bg-cyan-500/10 animate-ping" />
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
