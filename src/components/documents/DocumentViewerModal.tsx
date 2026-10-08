import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { DocumentDetailDto, DocumentDto, FileType } from "@/lib/types";
import FileTypeBadge from "@/components/shared/FileTypeBadge";
import DocumentViewer from "./DocumentViewer";
import { documentService } from "@/services/documents.service";

export default function DocumentViewerModal({
  document,
  trigger,
}: {
  document: DocumentDto;
  trigger?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const fileType = document.fileType.toUpperCase() as FileType;
  const [detail, setDetail] = useState<DocumentDetailDto | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(false);
  const currentDetail = detail?.id === document.id ? detail : null;

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    documentService
      .getDocument(document.id, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) {
          setDetail(result);
          setDetailLoading(false);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setDetailError(true);
          setDetailLoading(false);
        }
      });
    return () => controller.abort();
  }, [open, document.id]);

  function handleOpenChange(next: boolean) {
    setDetail(null);
    setDetailLoading(next);
    setDetailError(false);
    setOpen(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="flex h-[90dvh] max-h-[90dvh] w-full flex-col gap-0 p-0 sm:max-w-5xl">
        <div className="flex items-center gap-3 border-b border-border px-7 py-4 pr-14">
          <DialogTitle className="truncate text-base font-semibold">
            {document.fileName}
          </DialogTitle>
          <FileTypeBadge type={fileType} className="shrink-0" />
          <a
            href={currentDetail?.blobUrl ?? document.blobUrl}
            download={document.fileName}
            className="ml-auto flex shrink-0 items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface-container-high"
            title="Download"
          >
            <Download className="size-3.5" />
            Download
          </a>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <section
            className="max-h-40 shrink-0 overflow-y-auto border-b border-border px-7 py-3"
            aria-live="polite"
          >
            <h3 className="text-sm font-semibold text-foreground">
              AI summary
            </h3>
            <p className="mt-1 text-sm whitespace-pre-wrap text-muted-foreground">
              {detailLoading
                ? "Loading summary…"
                : detailError
                  ? "Summary is unavailable right now."
                  : currentDetail?.summary ||
                    "No summary is available for this document yet."}
            </p>
          </section>
          {open && (
            <DocumentViewer
              doc={{
                ...document,
                blobUrl: currentDetail?.blobUrl ?? document.blobUrl,
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
