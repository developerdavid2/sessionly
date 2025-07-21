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
} from "@/components/ui/sidebar";

import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { FaRobot, FaVideo } from "react-icons/fa";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { DashboardUserButton } from "@/modules/dashboard/ui/components/dashboard-user-button";

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

const DashboardSidebar = () => {
  const pathname = usePathname();
  // const pathname = "/upgrade";

  return (
    <Sidebar
      className={cn(
        "relative overflow-hidden border border-white/20 dark:border-slate-700/30 shadow-md shadow-gray-100/5",
      )}
    >
      {/* Subtle Light Rays */}
      <div className="absolute top-2 -left-1/2 w-32 h-52 bg-gradient-to-bl from-main-100 to-transparent rotate-45 blur-[5rem]" />

      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          <Image
            src="/logo.webp"
            height={150}
            width={150}
            alt="Sessionly AI"
            className="object-cover"
          />
        </Link>
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
                      "py-5  hover:bg-[#A0A8AF]/20 dark:hover:bg-main-100/10",
                      pathname === item.href &&
                        "!bg-main-100/10 dark:!bg-main-100/40 ",
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon
                        className={`size-10 mr-2 text-gray-500 dark:text-[#A0A8AF] ${pathname === item.href ? "text-foreground" : ""}`}
                      />
                      <span
                        className={`"text-sm font-medium text-gray-500 dark:text-[#A0A8AF] tracking-tight 
                           ${pathname === item.href ? "text-foreground !font-bold" : ""}`}
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
                      "py-5  hover:bg-[#A0A8AF]/20 dark:hover:bg-main-100/10",
                      pathname === item.href &&
                        "!bg-main-100/10 dark:!bg-main-100/40 ",
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon
                        className={`size-10 mr-2 text-yellow-700 dark:text-yellow-500 ${pathname === item.href ? "text-foreground" : ""}`}
                      />
                      <span
                        className={`"text-sm font-medium text-yellow-700 dark:text-yellow-500 tracking-tight 
                           ${pathname === item.href ? "text-foreground !font-bold" : ""}`}
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
      <SidebarFooter className="text-white">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
export default DashboardSidebar;
