import { JSX, useState } from "react";
import ResponsiveDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface ConfirmOptions {
  confirmText?: string;
  loadingText?: string;
}

interface ConfirmState {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: (() => Promise<void>) | null;
  options?: ConfirmOptions;
}

export const useConfirm = () => {
  const [state, setState] = useState<ConfirmState>({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: null,
  });

  const [isPending, setIsPending] = useState(false);

  const confirm = (
    title: string,
    description: string,
    onConfirm: () => Promise<void>,
    options?: ConfirmOptions,
  ) => {
    setState({
      isOpen: true,
      title,
      description,
      onConfirm,
      options,
    });
  };

  const close = () => {
    if (!isPending) {
      setState((prev) => ({ ...prev, isOpen: false }));
    }
  };

  const handleConfirm = async () => {
    if (!state.onConfirm) return;

    setIsPending(true);
    try {
      await state.onConfirm();
      // Close on success
      setState((prev) => ({ ...prev, isOpen: false }));
    } catch (error) {
      // Keep dialog open on error for retry
      console.error("Confirmation action failed:", error);
    } finally {
      setIsPending(false);
    }
  };

  const { confirmText = "Confirm", loadingText = "Processing..." } =
    state.options || {};

  const ConfirmationDialog = () => (
    <ResponsiveDialog
      title={state.title}
      description={state.description}
      open={state.isOpen}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <div className="pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
        <Button
          onClick={close}
          variant="outline"
          className="w-full lg:w-auto"
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          className="w-full lg:w-auto"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              {loadingText}
            </>
          ) : (
            confirmText
          )}
        </Button>
      </div>
    </ResponsiveDialog>
  );

  return {
    ConfirmationDialog,
    confirm,
    isPending,
  };
};
