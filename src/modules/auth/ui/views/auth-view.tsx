import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const AuthView = () => {
  const { theme } = useTheme();

  // Sample avatar URLs from Unsplash
  const avatars = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face&auto=format&q=80",
    "https://images.unsplash.com/photo-1494790108755-2616b6b4d5c1?w=60&h=60&fit=crop&crop=face&auto=format&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face&auto=format&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face&auto=format&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face&auto=format&q=80",
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-blue-900/10 dark:from-neutral-900/50 dark:to-slate-900/50 max-md:hidden">
      {/* Background Effects Layer */}
      <div className="absolute inset-0">
        {/* Base gradient background */}

        {/* Subtle Light Rays */}
        <div className="absolute top-0 right-0 w-32 h-52 bg-gradient-to-bl from-main-100 to-transparent rotate-45 blur-[5rem]" />

        {/* Large Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          {/* Logo Image */}
          <Image
            src={
              theme === "dark"
                ? "/logo-large-dark.webp"
                : "/logo-large-light.webp"
            }
            alt="SessionlyAI Logo"
            width={300}
            height={300}
            loading="lazy"
            className="absolute opacity-20 dark:opacity-30 scale-110 mask-t-from-0.5"
          />
        </div>
      </div>

      {/* Glassmorphism Welcome Card - Now properly layered on top */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[85%] max-w-sm z-10">
        {/* Backdrop blur container - this creates the actual blur effect */}
        <div className="relative backdrop-blur-xl bg-white/10 dark:bg-white/5 rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl shadow-black/20">
          {/* Additional background layers for enhanced glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5 rounded-2xl" />

          {/* Content container */}
          <div className="relative z-10 p-6">
            {/* Floating particles */}
            <div className="absolute top-3 right-4 w-1 h-1 bg-blue-400/60 rounded-full animate-pulse" />
            <div className="absolute top-8 left-6 w-0.5 h-0.5 bg-indigo-400/80 rounded-full animate-pulse delay-500" />
            <div className="absolute bottom-4 right-8 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-pulse delay-1000" />

            <div className="text-center">
              {/* Welcome Text */}
              <h3 className="text-white font-semibold text-lg mb-2">
                Welcome to Sessionly AI
              </h3>

              {/* Stats */}
              <p className="text-muted-foreground text-sm mb-4 font-medium">
                Join over{" "}
                <span className="text-main-500 dark:text-gray-300 font-bold">
                  1K+
                </span>{" "}
                global users
              </p>

              {/* Avatar Group */}
              <div className="flex justify-center items-center space-x-[-8px] mb-2">
                {avatars.map((avatar, index) => (
                  <div
                    key={index}
                    className="relative w-8 h-8 rounded-full border-2 border-white/30 shadow-lg overflow-hidden transform hover:scale-110 transition-transform duration-200"
                    style={{
                      zIndex: avatars.length - index,
                    }}
                  >
                    <Image
                      src={avatar}
                      alt={`User ${index + 1}`}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                ))}

                {/* Plus indicator for more users */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-900 to-main-500 border-2 border-white/30 shadow-lg flex items-center justify-center text-white text-xs font-bold">
                  +
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
    </div>
  );
};

export default AuthView;
