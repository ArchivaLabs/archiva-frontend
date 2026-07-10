import { useState, useRef, type ReactNode } from "react";
import { Upload, X, FileText, Loader2 } from "lucide-react";
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
import { useUploadDocument } from "@/hooks/mutations/useUploadDocument";
import { cn } from "@/lib/utils";

const ALLOWED_EXTENSIONS = [".pdf", ".docx", ".xlsx", ".txt"];
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadDocumentModal({
  meetingId,
  trigger,
}: {
  meetingId: number;
  trigger?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useUploadDocument(meetingId, () => handleOpenChange(false));

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setFile(null);
      setDescription("");
      setFileError(null);
      setDragOver(false);
    }
  }

  function validateFile(f: File): string | null {
    const ext = "." + f.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext))
      return `Only ${ALLOWED_EXTENSIONS.join(", ")} files are allowed.`;
    if (f.size > MAX_SIZE_BYTES)
      return `File size must not exceed ${MAX_SIZE_MB} MB.`;
    if (f.size === 0) return "File cannot be empty.";
    return null;
  }

  function handleFileSelect(f: File) {
    const error = validateFile(f);
    setFileError(error);
    setFile(error ? null : f);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) handleFileSelect(f);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFileSelect(f);
  }

  function handleSubmit() {
    if (!file) return;
    upload.mutate({ file, description: description.trim() || undefined });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="w-full gap-2">
            <Upload className="size-4" />
            Upload Document
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader>
          <DialogTitle>Upload a document</DialogTitle>
          <DialogDescription>
            Attach meeting minutes, transcripts, or supporting files to this
            meeting. Accepted formats: PDF, DOCX, XLSX, TXT — max {MAX_SIZE_MB}
            MB.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 px-7 py-6">
          {/* Drop zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 transition-colors",
              dragOver
                ? "border-primary bg-primary/5"
                : "border-border bg-surface-container-low hover:border-primary/50 hover:bg-surface-container"
            )}
          >
            <input
              ref={inputRef}
              type="file"
              accept={ALLOWED_EXTENSIONS.join(",")}
              className="hidden"
              onChange={handleInputChange}
            />

            {file ? (
              <div className="flex flex-col items-center gap-2 text-center">
                <FileText className="size-8 text-primary" />
                <p className="text-sm font-medium text-foreground">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setFileError(null);
                    if (inputRef.current) inputRef.current.value = "";
                  }}
                  className="mt-1 flex items-center gap-1 text-xs text-destructive hover:underline"
                >
                  <X className="size-3" />
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-center">
                <Upload className="size-8 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">
                  Drag and drop a file here, or{" "}
                  <span className="text-primary">browse</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, DOCX, XLSX, TXT — up to {MAX_SIZE_MB} MB
                </p>
              </div>
            )}
          </div>

          {fileError && <p className="text-sm text-destructive">{fileError}</p>}

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Description{" "}
              <span className="text-xs font-normal text-muted-foreground">
                (optional)
              </span>
            </label>
            <textarea
              rows={3}
              placeholder="What does this document contain?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none rounded-lg border border-border bg-surface-container-low px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-ring focus:outline-none"
            />
          </div>

          <DialogFooter className="-mx-7 mt-2 -mb-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleSubmit}
              disabled={!file || upload.isPending}
              className="gap-2 px-5"
            >
              {upload.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Upload className="size-4" />
              )}
              {upload.isPending ? "Uploading…" : "Upload document"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
