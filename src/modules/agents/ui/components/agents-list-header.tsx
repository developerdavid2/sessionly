"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import NewAgentDialog from "@/modules/agents/ui/components/new-agent-dialog";

const AgentsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="p-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => setIsDialogOpen((prevState) => !prevState)}>
            <PlusIcon />
            New Agents
          </Button>
        </div>
      </div>
    </>
  );
};
export default AgentsListHeader;
