"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  Wifi,
  Server,
  FileX,
} from "lucide-react";
import NeumorphicButton from "../../../../components/neumorphic-button";

type ErrorType = "network" | "server" | "not-found" | "generic";

interface MeetingDetailErrorProps {
  title?: string;
  description?: string;
  errorType?: ErrorType;
  onRetry?: () => void;
  onGoBack?: () => void;
  className?: string;
  showRetry?: boolean;
  showGoBack?: boolean;
}

const errorConfig = {
  network: {
    icon: Wifi,
    title: "Connection Problem",
    description:
      "Unable to connect to our servers. Please check your internet connection and try again.",
    color: "text-orange-500",
  },
  server: {
    icon: Server,
    title: "Server Error",
    description:
      "Something went wrong on our end. Our team has been notified and is working on a fix.",
    color: "text-red-500",
  },
  "not-found": {
    icon: FileX,
    title: "Meeting Not Found",
    description:
      "The meeting you're looking for doesn't exist or may have been removed.",
    color: "text-blue-500",
  },
  generic: {
    icon: AlertCircle,
    title: "Something Went Wrong",
    description:
      "An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.",
    color: "text-red-500",
  },
};

const MeetingDetailError: React.FC<MeetingDetailErrorProps> = ({
  title,
  description,
  errorType = "not-found",
  onRetry,
  onGoBack,
  className,
  showRetry = true,
  showGoBack = true,
}) => {
  const config = errorConfig[errorType];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex-1 flex items-center justify-center min-h-[500px] p-6",
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center gap-8 max-w-md w-full text-center">
        {/* Circular Error Icon Background */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            {title || config.title}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {description || config.description}
          </p>
          {errorType === "not-found" && (
            <p className="text-sm text-muted-foreground/70">Error Code: 404</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          {showGoBack && onGoBack && (
            <NeumorphicButton
              onClick={onGoBack}
              className="flex-1 h-12 px-6"
              variant="default"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Meetings
            </NeumorphicButton>
          )}

          {showRetry && onRetry && (
            <NeumorphicButton
              onClick={onRetry}
              className="flex-1 h-12 px-6"
              variant="outline"
              neumorphic={true}
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </NeumorphicButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailError;
