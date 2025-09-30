import type React from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentDetailSkeletonProps {
  className?: string;
}

const AgentDetailSkeleton: React.FC<AgentDetailSkeletonProps> = ({
  className,
}) => {
  return (
    <div className={cn("min-h-screen bg-background p-6", className)}>
      <div className="mb-8">
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted/80 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span className="text-sm font-medium">Fetching agent details...</span>
        </div>
      </div>

      <div className="animate-pulse space-y-8 max-w-4xl mx-auto">
        <div className="flex items-start gap-6">
          {/* Circular avatar placeholder */}
          <div className="w-20 h-20 bg-muted rounded-full flex-shrink-0"></div>

          {/* Text placeholders */}
          <div className="flex-1 space-y-3 pt-2">
            <div className="h-6 bg-muted rounded-lg w-48"></div>
            <div className="h-4 bg-muted rounded w-64"></div>
            <div className="h-4 bg-muted rounded w-40"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded-lg"></div>
          ))}
        </div>

        <div className="h-64 bg-muted rounded-lg"></div>
      </div>
    </div>
  );
};

export default AgentDetailSkeleton;
