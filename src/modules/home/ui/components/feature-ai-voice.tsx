import React from "react";
import { VideoIcon } from "lucide-react";
import { FiCircle, FiMic, FiMonitor, FiPhoneOff } from "react-icons/fi";
import { FaRobot } from "react-icons/fa";
import { TypingAnimation } from "@/components/ui/typing-animation";

export const FeatureAiVoice = () => {
  const transcripts = [
    "'Sarah suggested we prioritize backend integration first.'",
    "Noted. Adding that as an action item for this sprint.",
    "Alright. Logging that decision: focus on API performance next.",
    "Got it. Scheduling follow-up meeting for Thursday.",
  ];

  return (
    <div className="absolute top-[60%] -translate-y-[60%] left-1/2 -translate-x-1/2 flex flex-col items-center ">
      {/* Robot Avatar */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <div className="w-20 h-20 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 flex items-center justify-center animate-pulse border border-cyan-500/20">
            <div className="w-14 h-14 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center border border-cyan-500/30">
              <FaRobot className="w-6 h-6 sm:w-14 sm:h-14 text-white" />
            </div>
          </div>
          <div className="absolute inset-0 rounded-full bg-cyan-500/10 animate-ping" />
        </div>
      </div>

      {/* Transcribed Text */}
      <div className="mb-8 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-center max-w-xs sm:max-w-md">
        <TypingAnimation
          words={transcripts}
          loop
          typeSpeed={30}
          deleteSpeed={20}
          pauseDelay={2000}
          className="leading-0 text-cyan-200/40"
        />
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-x-2 mask-x-from-85% mask-x-to-95%">
        <div className="bg-white/[0.02] backdrop-blur-lg rounded-full flex items-center justify-center p-5 w-fit">
          <VideoIcon className="size-5 text-gray-400" />
        </div>

        <div className="bg-white/[0.02] backdrop-blur-lg rounded-full flex items-center justify-center p-5 w-fit">
          <FiMic className="size-5 text-gray-400" />
        </div>

        <div className="relative flex items-center justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-red-500/10 to-red-600/10 flex items-center justify-center animate-pulse border border-red-500/20">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center border border-red-500/30">
              <FiPhoneOff className="w-6 h-6 sm:w-8 sm:h-8 text-slate-50" />
            </div>
          </div>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-lg rounded-full flex items-center justify-center p-5 w-fit">
          <FiMonitor className="size-5 text-gray-400" />
        </div>

        <div className="bg-white/[0.02] backdrop-blur-lg rounded-full flex items-center justify-center p-5 w-fit">
          <FiCircle className="size-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};
