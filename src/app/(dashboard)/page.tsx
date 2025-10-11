import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { redirect } from "next/navigation";
import { DashboardView } from "@/modules/dashboard/ui/views/dashboard-view";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return <DashboardView/>;
};

export default Page;
