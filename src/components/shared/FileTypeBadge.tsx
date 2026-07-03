import { cn } from "@/lib/utils";
import type { FileType } from "@/lib/types";

const variantStyles: Record<FileType, string> = {
  PDF: "bg-destructive-container text-on-destructive-container",
  DOCX: "bg-secondary-container text-on-secondary-container",
  XLSX: "bg-surface-container-highest text-on-surface-variant",
  TXT: "bg-surface-container-highest text-on-surface-variant",
};

interface FileTypeBadgeProps {
  type: FileType;
  className?: string;
}

export default function FileTypeBadge({ type, className }: FileTypeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-1 text-[10px] font-bold",
        variantStyles[type],
        className
      )}
    >
      {type}
    </span>
  );
}
