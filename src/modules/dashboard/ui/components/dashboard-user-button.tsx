"use client";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import {
  ChevronDownIcon,
  CreditCardIcon,
  LogOutIcon,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export const DashboardUserButton = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (isPending) {
    return null;
  }

  if (!session?.user) {
    return null;
  }

  const onLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
          },
          onError: () => {
            setIsLoggingOut(false);
          },
        },
      });
    } catch (error) {
      setIsLoggingOut(false);
      console.log(error);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // Skeleton component for avatar loading
  const AvatarSkeleton = () => (
    <div className="size-9 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative backdrop-blur-xl bg-white/10 dark:bg-white/10 rounded-lg border border-black/5 dark:border-white/10 hover:bg-[#A0A8AF]/20 dark:hover:bg-main-100/10 shadow-2xl shadow-black/20 p-3 flex gap-x-3 cursor-pointer">
        {session.user.image && !imageError ? (
          <Avatar>
            <AvatarImage
              src={session.user.image}
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ display: imageLoaded ? "block" : "none" }}
            />
            <AvatarFallback asChild>
              {imageLoaded ? null : <AvatarSkeleton />}
            </AvatarFallback>
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={session.user.name}
            variant="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full text-foreground font-bold">
            {session.user.name}
          </p>
          <p className="text-sm truncate w-full text-gray-500 dark:text-gray-200/50">
            {session.user.email}
          </p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0 text-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72 bg-sidebar">
        <DropdownMenuLabel className="dark:hover:bg-main-100/10">
          <div className="flex flex-col gap-1">
            <span className="truncate font-bold">{session.user.name}</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-200/50 truncate">
              {session.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between dark:hover:bg-main-100/10">
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onLogout}
          disabled={isLoggingOut}
          className="cursor-pointer flex items-center justify-between dark:hover:bg-main-100/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
          {isLoggingOut ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <LogOutIcon className="size-4" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
