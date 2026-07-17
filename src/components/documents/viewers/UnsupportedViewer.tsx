import { Download, FileWarning } from "lucide-react";

export default function UnsupportedViewer({
  fileName,
  blobUrl,
  message,
}: {
  fileName: string;
  blobUrl: string;
  message?: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <FileWarning className="size-10 text-muted-foreground" />
      <p className="text-sm font-medium text-foreground">Preview unavailable</p>
      <p className="max-w-sm text-xs text-muted-foreground">
        {message ??
          "This file can't be previewed in the browser. You can still download it."}
      </p>
      <a
        href={blobUrl}
        download={fileName}
        className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Download className="size-4" />
        Download
      </a>
    </div>
  );
}
