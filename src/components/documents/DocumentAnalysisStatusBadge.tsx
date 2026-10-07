import type { DocumentAnalysisStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusLabel: Record<DocumentAnalysisStatus, string> = {
  Pending: "Queued",
  Processing: "Processing",
  Extracted: "Summarising",
  DeferredMonthlyUnitLimit: "Deferred",
  DeferredDocumentUnitLimit: "Deferred",
  SummaryDeferredMonthlyLimit: "Summary deferred",
  SummaryDeferredDocumentLimit: "Summary deferred",
  SummaryDeferredModelUnavailable: "Summary deferred",
  Completed: "Complete",
  ExtractionFailed: "Analysis failed",
  SummaryFailed: "Summary failed",
};

export default function DocumentAnalysisStatusBadge({
  status,
}: {
  status: DocumentAnalysisStatus;
}) {
  const isFailed = status === "ExtractionFailed" || status === "SummaryFailed";
  const isActive =
    status === "Pending" || status === "Processing" || status === "Extracted";

  return (
    <span
      className={cn(
        "inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-medium",
        isFailed
          ? "bg-destructive/10 text-destructive"
          : isActive
            ? "bg-primary/10 text-primary"
            : "bg-surface-container-high text-on-surface-variant"
      )}
    >
      {statusLabel[status]}
    </span>
  );
}
