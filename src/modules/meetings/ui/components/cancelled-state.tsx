import EmptyState from "@/components/empty-state";

export const CancelledState = () => {
  return (
    <div className="bg-background rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        title="Meeting Cancelled"
        description="This meeting has been cancelled."
        image="/cancelled.svg"
      />
    </div>
  );
};
