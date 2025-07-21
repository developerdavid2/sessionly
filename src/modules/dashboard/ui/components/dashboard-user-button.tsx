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
  ChevronUpIcon,
  CreditCardIcon,
  LogOutIcon,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useSidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export const DashboardUserButton = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isMobile, state } = useSidebar();

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
    <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
  );

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between overflow-hidden gap-x-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
            {session.user.image && !imageError ? (
              <Avatar className="size-8">
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
                className="size-8"
              />
            )}
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-bold text-foreground">
              {session.user.name}
            </span>
            <span className="truncate text-xs text-gray-500 dark:text-gray-200/50">
              {session.user.email}
            </span>
          </div>
          <ChevronUpIcon className="ml-auto size-4" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{session.user.name}</DrawerTitle>
            <DrawerDescription>{session.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant="outline" onClick={() => {}}>
              <CreditCardIcon className="size-4" />
              Billing
            </Button>
            <Button variant="outline" onClick={onLogout}>
              {isLoggingOut ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <LogOutIcon className="size-4" />
              )}
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={cn(
                "hover:bg-[#A0A8AF]/20 dark:hover:bg-main-100/10 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
                state === "expanded" &&
                  "backdrop-blur-xl bg-white/10 dark:bg-white/10 border border-black/5 dark:border-white/10 shadow-2xl shadow-black/20",
              )}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                {session.user.image && !imageError ? (
                  <Avatar className="size-8">
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
                    className="size-8"
                  />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold text-foreground">
                  {session.user.name}
                </span>
                <span className="truncate text-xs text-gray-500 dark:text-gray-200/50">
                  {session.user.email}
                </span>
              </div>
              <ChevronUpIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-sidebar"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
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
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
