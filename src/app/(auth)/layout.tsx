import React from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";

interface AuthenticationLayoutProps {
  children: React.ReactNode;
}

const AuthenticationLayout = ({ children }: AuthenticationLayoutProps) => {
  return (
    <div className="relative min-h-svh overflow-hidden">
      {/* Professional Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 dark:from-main-900/10 dark:via-main-900 dark:to-black/10" />

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Connecting Lines to Card */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Top connecting lines */}
        <div className="absolute top-20 w-96 h-px bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent" />
        <div className="absolute top-32 w-72 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent" />

        {/* Bottom connecting lines */}
        <div className="absolute bottom-20 w-96 h-px bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent" />
        <div className="absolute bottom-32 w-72 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent" />

        {/* Side connecting lines */}
        <div className="absolute left-20 h-96 w-px bg-gradient-to-b from-transparent via-indigo-300/30 to-transparent" />
        <div className="absolute right-20 h-96 w-px bg-gradient-to-b from-transparent via-indigo-300/30 to-transparent" />
      </div>

      {/* Floating Orbs for Premium Feel */}
      {/*<div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl animate-pulse" />*/}
      {/*<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />*/}

      <div className="relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        {/* Mode Toggle */}
        <div className="absolute top-6 right-6 z-50">
          <ModeToggle />
        </div>

        {/* Embossed Container */}
        <div className="relative w-full max-w-sm md:max-w-4xl">
          {/* Embossed Shadow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 dark:to-transparent rounded-2xl transform translate-x-1 translate-y-1 blur-sm" />
          {/*<div className="absolute inset-0 bg-gradient-to-tl from-black/5 to-transparent dark:from-black/20 dark:to-transparent rounded-2xl transform -translate-x-1 -translate-y-1 bg-red-800" />*/}

          {/* Main Container */}
          <div className="relative bg-white/80 dark:bg-slate-900/20 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-2xl shadow-main-300/10">
            {children}
          </div>
        </div>
        <div className="mt-10 text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationLayout;
