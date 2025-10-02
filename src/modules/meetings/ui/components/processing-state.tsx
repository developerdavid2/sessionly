import EmptyState from "@/components/empty-state";

export const ProcessingState = () => {
  return (
    <div className="bg-background rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        title="Meeting Completed"
        description="The meeting is processing the recording and transcript. This may take a few minutes."
        image="/processing.svg"
      />
    </div>
  );
};
