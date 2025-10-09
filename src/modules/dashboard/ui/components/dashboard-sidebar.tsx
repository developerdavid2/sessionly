"use client";
import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { FaRobot, FaVideo } from "react-icons/fa";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { DashboardUserButton } from "@/modules/dashboard/ui/components/dashboard-user-button";
import { DashboardTrial } from "@/modules/dashboard/ui/components/dashboard-trial";

const firstSection = [
  {
    icon: FaVideo,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: FaRobot,
    label: "Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: MdOutlineWorkspacePremium,
    label: "Upgrade",
    href: "/upgrade",
  },
];

const DashboardSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "relative overflow-hidden border border-white/20 dark:border-slate-700/30 shadow-md shadow-gray-100/5",
      )}
      {...props}
    >
      {/* Subtle Light Rays */}
      <div className="absolute top-2 -left-1/2 w-32 h-52 bg-gradient-to-bl from-main-100 to-transparent rotate-45 blur-[5rem]" />

      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-transparent focus-visible:bg-transparent w-fit"
            >
              <Link href="/" className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src="/logo-small-dark.jpg"
                    height={24}
                    width={24}
                    alt="Sessionly AI"
                    className="object-cover rounded"
                  />
                </div>
                <div className="grid flex-1 text-left leading-tight overflow-hidden">
                  <span className="text-xl font-bold text-neutral-400 dark:text-[#9098A0] truncate transition-all duration-200 ease-in-out">
                    Sessionly AI
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="text-gray-500" />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "py-5 hover:bg-[#A0A8AF]/20 dark:hover:bg-main-100/10 transition-colors duration-200",
                      pathname === item.href &&
                        "!bg-main-100/10 dark:!bg-main-100/40",
                    )}
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon
                        className={cn(
                          "size-5 text-gray-500 dark:text-[#A0A8AF] transition-colors duration-200",
                          pathname === item.href && "text-foreground",
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm font-medium text-gray-500 dark:text-[#A0A8AF] tracking-tight transition-colors duration-200",
                          pathname === item.href &&
                            "text-foreground !font-bold",
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-4 py-2">
          <Separator className="text-gray-500" />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "py-5 hover:bg-[#A0A8AF]/20 dark:hover:bg-main-100/10 transition-colors duration-200",
                      pathname === item.href &&
                        "!bg-main-100/10 dark:!bg-main-100/40",
                    )}
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon
                        className={cn(
                          "size-5 text-yellow-700 dark:text-yellow-500 transition-colors duration-200",
                          pathname === item.href && "text-foreground",
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm font-medium text-yellow-700 dark:text-yellow-500 tracking-tight transition-colors duration-200",
                          pathname === item.href &&
                            "text-foreground !font-bold",
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <DashboardTrial />
        <DashboardUserButton />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSidebar;
