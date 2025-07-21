"use client";

import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DashboardCommand from "@/modules/dashboard/ui/components/dashboard-command";
import { cn } from "@/lib/utils";

const DashboardNavbar = () => {
  const [openCommand, setOpenCommand] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenCommand((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <DashboardCommand open={openCommand} setOpen={setOpenCommand} />
      <nav className="flex px-4 gap-x-2 items-center py-3 border-b shadow-lg bg-sidebar shrink-0">
        <SidebarTrigger className={cn("size-9 cursor-pointer")} />
        <Separator orientation="vertical" className="mx-2 h-4" />
        <Button
          className="h-9 w-fit justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          variant="outline"
          size="sm"
          onClick={() => {
            setOpenCommand((open) => !open);
          }}
        >
          <SearchIcon />
          Search or type a command
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
};
export default DashboardNavbar;
