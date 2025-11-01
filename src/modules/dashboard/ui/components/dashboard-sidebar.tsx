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
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { FaRobot, FaVideo } from "react-icons/fa";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { DashboardUserButton } from "@/modules/dashboard/ui/components/dashboard-user-button";
import { DashboardTrial } from "@/modules/dashboard/ui/components/dashboard-trial";

const firstSection = [
  { icon: FaVideo, label: "Meetings", href: "/meetings" },
  { icon: FaRobot, label: "Agents", href: "/agents" },
];

const secondSection = [
  { icon: MdOutlineWorkspacePremium, label: "Upgrade", href: "/upgrade" },
];

export default function DashboardSidebar({ ...props }) {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "relative overflow-hidden border border-white/5 bg-[#0D0E10]/80 backdrop-blur-xl shadow-[0_0_40px_-15px_rgba(0,0,0,0.9)]",
      )}
      {...props}
    >
      <div className="absolute top-0 left-0 w-48 h-48 bg-[#00B5FF]/10 blur-[140px]" />

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
                <span className="text-lg font-semibold text-[#8D96A1]">
                  Sessionly AI
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-y-6">
              {firstSection.map((item) => {
                const active = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.label}
                      className={cn(
                        "group py-5 rounded-md transition-colors duration-150",
                        "hover:bg-white/5",
                        active && "bg-white/10",
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon
                          className={cn(
                            "size-5 text-[#8D96A1]",
                            active && "text-white",
                          )}
                        />
                        <span
                          className={cn(
                            "text-sm font-medium text-[#8D96A1]",
                            active && "text-white font-semibold",
                          )}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => {
                const active = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.label}
                      className={cn(
                        "group py-5 rounded-md transition-colors duration-150",
                        "hover:bg-white/5",
                        active && "bg-white/10",
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon
                          className={cn(
                            "size-5 text-yellow-500",
                            active && "text-yellow-300",
                          )}
                        />
                        <span
                          className={cn(
                            "text-sm font-medium text-yellow-500",
                            active && "text-yellow-300 font-semibold",
                          )}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
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
}
