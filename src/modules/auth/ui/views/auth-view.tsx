import React from "react";
import Image from "next/image";

const AuthView = () => {
  // Sample avatar URLs from Unsplash
  const avatars = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face&auto=format&q=80",
    "https://images.unsplash.com/photo-1494790108755-2616b6b4d5c1?w=60&h=60&fit=crop&crop=face&auto=format&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face&auto=format&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face&auto=format&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face&auto=format&q=80",
  ];

  return (
    <div className="relative overflow-hidden bg-black/20 max-md:hidden">
      {/* Background Effects Layer */}
      <div className="absolute inset-0">
        {/* Subtle Light Rays */}
        <div className="absolute top-0 right-0 w-32 h-52 bg-gradient-to-bl from-cyan-500/20 to-transparent rotate-45 blur-[5rem]" />

        {/* Large Background Logo */}
        <div className="relative flex items-center justify-center pointer-events-none overflow-hidden h-full">
          <Image
            src={"/logo-large-dark.webp"}
            alt="SessionlyAI Logo"
            width={300}
            height={300}
            className="scale-110 opacity-20"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 20%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 20%, black 100%)",
            }}
          />
        </div>
      </div>

      {/* Glassmorphism Welcome Card */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[85%] max-w-sm bg-white/[0.08] backdrop-blur-3xl border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden">
        {/* Top glow line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        {/* Content container */}
        <div className="relative z-10 p-6">
          {/* Floating particles */}
          <div className="absolute top-3 right-4 w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse" />
          <div
            className="absolute top-8 left-6 w-0.5 h-0.5 bg-blue-400/80 rounded-full animate-pulse"
            style={{ animationDelay: "500ms" }}
          />
          <div
            className="absolute bottom-4 right-8 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-pulse"
            style={{ animationDelay: "1000ms" }}
          />

          <div className="text-center">
            {/* Welcome Text */}
            <h3 className="text-white font-semibold text-lg mb-2">
              Welcome to Sessionly AI
            </h3>

            {/* Stats */}
            <p className="text-gray-300 text-sm mb-4 font-medium">
              Join over <span className="text-cyan-400 font-bold">1K+</span>{" "}
              global users
            </p>

            {/* Avatar Group */}
            <div className="flex justify-center items-center mb-2">
              <div className="flex -space-x-2">
                {avatars.map((avatar, index) => (
                  <div
                    key={index}
                    className="relative w-8 h-8 rounded-full border-2 border-white/30 shadow-lg overflow-hidden transform hover:scale-110 transition-transform duration-200 bg-gray-800"
                    style={{
                      zIndex: avatars.length - index,
                    }}
                  >
                    <img
                      src={avatar}
                      alt={`User ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                ))}

                {/* Plus indicator for more users */}
                <div
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-900 to-cyan-600 border-2 border-white/30 shadow-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ zIndex: 0 }}
                >
                  +
                </div>
              </div>
            </div>

            {/* Subtle pulse indicator */}
            <div className="flex justify-center mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
