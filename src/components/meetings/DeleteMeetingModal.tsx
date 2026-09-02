import { useState, type ReactNode } from "react";
import { Loader2, Trash2, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteMeeting } from "@/hooks/mutations/useDeleteMeeting";

interface DeleteMeetingModalProps {
  meetingId: number;
  title: string;
  documentCount: number;
  trigger?: ReactNode;
  onDeleted?: () => void;
}

export default function DeleteMeetingModal({
  meetingId,
  title,
  documentCount,
  trigger,
  onDeleted,
}: DeleteMeetingModalProps) {
  const [open, setOpen] = useState(false);

  const deleteMeeting = useDeleteMeeting(meetingId, () => {
    setOpen(false);
    onDeleted?.();
  });

  function handleOpenChange(next: boolean) {
    // Keep the dialog anchored while the request is in flight so the outcome is
    // never reported against a dialog the user already dismissed.
    if (!next && deleteMeeting.isPending) return;
    setOpen(next);
  }

  function handleConfirm() {
    if (deleteMeeting.isPending) return;
    deleteMeeting.mutate();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="destructive" className="w-full gap-2">
            <Trash2 className="size-4" />
            Delete Meeting
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        // overflow-hidden clips the footer's background to the dialog's
        // rounded corners — without it the square footer bleeds past them.
        className="max-w-md overflow-hidden p-0"
        showCloseButton={!deleteMeeting.isPending}
        onEscapeKeyDown={(e) => {
          if (deleteMeeting.isPending) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Delete this meeting?</DialogTitle>
          <DialogDescription>
            This removes the record for everyone in your organisation.
          </DialogDescription>
        </DialogHeader>

        <div className="px-7 py-6">
          <div className="flex gap-3 rounded-lg border border-destructive/20 bg-destructive-container/40 px-4 py-3.5">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
            <div className="min-w-0 text-sm">
              <p className="truncate font-semibold text-foreground">{title}</p>
              <p className="mt-1 text-muted-foreground">
                {documentCount > 0
                  ? `This meeting and its ${documentCount} attached ${
                      documentCount === 1 ? "document" : "documents"
                    } will be permanently deleted.`
                  : "This meeting will be permanently deleted."}
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            This action cannot be undone.
          </p>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              disabled={deleteMeeting.isPending}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={deleteMeeting.isPending}
            className="gap-2 bg-destructive px-5 text-background hover:bg-destructive/90 focus-visible:border-destructive/40 focus-visible:ring-destructive/30"
          >
            {deleteMeeting.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Trash2 className="size-4" />
            )}
            {deleteMeeting.isPending ? "Deleting…" : "Delete meeting"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
