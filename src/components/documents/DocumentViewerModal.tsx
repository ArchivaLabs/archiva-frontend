import type { ReactNode } from "react";
import { useState } from "react";
import { Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { DocumentDto, FileType } from "@/lib/types";
import FileTypeBadge from "@/components/shared/FileTypeBadge";
import DocumentViewer from "./DocumentViewer";

export default function DocumentViewerModal({
  document,
  trigger,
}: {
  document: DocumentDto;
  trigger?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const fileType = document.fileType.toUpperCase() as FileType;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="flex h-[90vh] max-h-[90vh] w-full max-w-5xl flex-col gap-0 p-0">
        <div className="flex items-center gap-3 border-b border-border px-7 py-4 pr-14">
          <DialogTitle className="truncate text-base font-semibold">
            {document.fileName}
          </DialogTitle>
          <FileTypeBadge type={fileType} className="shrink-0" />
          <a
            href={document.blobUrl}
            download={document.fileName}
            className="ml-auto flex shrink-0 items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface-container-high"
            title="Download"
          >
            <Download className="size-3.5" />
            Download
          </a>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          {open && <DocumentViewer doc={document} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
