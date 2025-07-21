import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar";
import DashboardNavbar from "@/modules/dashboard/ui/components/dashboard-navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider
      defaultOpen={true}
      // Mobile sidebar starts closed
      // This ensures the sidebar can be completely collapsed/hidden
      style={
        {
          "--sidebar-width": "280px",
          "--sidebar-width-mobile": "280px",
        } as React.CSSProperties
      }
    >
      <div className="flex h-screen w-full">
        <DashboardSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <DashboardNavbar />
          <main className="flex-1 overflow-auto bg-muted">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
export default Layout;
