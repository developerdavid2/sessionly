"use client";

import React from "react";

interface AuthenticationLayoutProps {
  children: React.ReactNode;
}

const AuthenticationLayout = ({ children }: AuthenticationLayoutProps) => {
  return (
    <div className="relative min-h-svh overflow-hidden bg-[#0a0a0b] text-foreground">
      {/* Shared vertical beam */}
      <div className="absolute -top-[50%] left-[30%] -rotate-[30deg] w-16 h-[150%] bg-gradient-to-b from-slate-200 via-slate-400 to-transparent blur-[100px] sm:blur-[120px] opacity-70 z-[50]"></div>

      {/* Soft Grain / Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-soft-light pointer-events-none bg-[url('/noise.png')]" />

      {/* Faint Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="relative w-full max-w-sm md:max-w-4xl shadow-2xl/50 drop-shadow-2xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] ">
            {/* Ambient Light Glows */}
            <div className="absolute -top-15 right-0 w-64 h-64 bg-gradient-to-b from-slate-200 via-slate-400 to-transparent blur-[100px] sm:blur-[120px] opacity-70 rounded-full animate-pulse" />
            <div className="absolute -bottom-10 left-20 w-72 h-72 bg-gray-400/10 rounded-full blur-3xl animate-pulse delay-500" />
            <div className="relative z-10">{children}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-muted-foreground text-center text-xs pt-6 ">
          By continuing, you agree to our{" "}
          <a
            href="#"
            className=" hover:text-cyan-300 underline underline-offset-4 transition"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className=" hover:text-cyan-300 underline underline-offset-4 transition"
          >
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default AuthenticationLayout;
