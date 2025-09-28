import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "@/components/ui/button";

interface NeumorphicButtonProps
  extends React.ComponentProps<typeof Button>,
    VariantProps<typeof buttonVariants> {
  neumorphic?: boolean;
}

const NeumorphicButton: React.FC<NeumorphicButtonProps> = ({
  className,
  neumorphic = true,
  children,
  disabled,
  variant = "default",
  ...props
}) => {
  const neumorphicStyles = neumorphic
    ? cn(
        // Base neumorphic styling with gradients and shadows
        "relative cursor-pointer rounded-full font-semibold transition-all duration-300 transform overflow-hidden",
        "bg-gradient-to-b from-slate-100 to-slate-200 hover:from-slate-50 hover:to-slate-200",
        "shadow-lg shadow-slate-200/60 hover:shadow-xl hover:shadow-slate-300/70",
        "border border-slate-200/50 text-slate-700",

        // Dark mode styling
        "dark:bg-gradient-to-b dark:from-slate-900/30 dark:to-slate-700/10",
        "dark:hover:bg-slate-500/30 dark:hover:text-gray-300",
        "dark:border-slate-600/50 dark:hover:border-slate-500/30",
        "dark:shadow-black/10 dark:hover:shadow-md dark:hover:shadow-black/20",
        "dark:text-slate-200",

        // Interactive states
        "active:scale-95 hover:scale-[1.02]",
        "disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none",

        // Primary variant (blue button)
        variant === "default" && [
          "bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500",
          "shadow-lg shadow-blue-200/60 hover:shadow-xl hover:shadow-blue-300/70",
          "border-blue-400/50 text-white",
          "dark:from-blue-600/80 dark:to-blue-700/80 dark:hover:from-blue-500/80 dark:hover:to-blue-600/80",
          "dark:shadow-blue-900/20 dark:hover:shadow-blue-900/30",
          "dark:border-blue-500/50",
        ],
      )
    : "";

  return (
    <Button
      className={cn(neumorphicStyles, className)}
      disabled={disabled}
      {...props}
    >
      {/* Subtle highlight overlay */}
      <div className="absolute inset-0 bg-gradient-to-bl from-white/60 via-white/20 to-transparent dark:from-white/10 dark:via-transparent dark:to-transparent rounded-full" />

      {/* Top highlight line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 dark:via-white/40 to-transparent" />

      {/* Bottom shadow line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-400/40 to-transparent dark:via-transparent" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </Button>
  );
};

export default NeumorphicButton;
