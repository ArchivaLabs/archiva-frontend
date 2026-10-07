import { Loader2, RotateCcw } from "lucide-react";
import DocumentAnalysisStatusBadge from "@/components/documents/DocumentAnalysisStatusBadge";
import { useRetryDocumentAnalysis } from "@/hooks/mutations/useRetryDocumentAnalysis";
import type { DocumentAnalysisStatus, DocumentDetailDto } from "@/lib/types";
import { useAuthStore } from "@/store/authStore";

const statusMessages: Record<DocumentAnalysisStatus, string> = {
  Pending: "Your upload is queued for text extraction and summary.",
  Processing: "Text extraction and summary are in progress.",
  Extracted: "The text is searchable. A summary is being prepared.",
  DeferredMonthlyUnitLimit:
    "Analysis will resume after the monthly extraction allowance resets.",
  DeferredDocumentUnitLimit:
    "This file exceeds the current extraction limit. Ask an organisation admin to raise it.",
  SummaryDeferredMonthlyLimit:
    "The extracted text is searchable. A summary will be created after the monthly allowance resets.",
  SummaryDeferredDocumentLimit:
    "The extracted text is searchable. This file exceeds the current summary limit.",
  SummaryDeferredModelUnavailable:
    "The extracted text is searchable. The summary model is not currently available.",
  Completed: "Document analysis is complete.",
  ExtractionFailed:
    "Text extraction failed. Ask an organisation admin to retry analysis.",
  SummaryFailed:
    "The extracted text remains searchable, but summary generation failed. Ask an organisation admin to retry.",
};

const activeStatuses: DocumentAnalysisStatus[] = [
  "Pending",
  "Processing",
  "Extracted",
];
const retryableStatuses: DocumentAnalysisStatus[] = [
  "ExtractionFailed",
  "SummaryFailed",
  "SummaryDeferredModelUnavailable",
];

export default function DocumentAnalysisPanel({
  document,
}: {
  document: DocumentDetailDto;
}) {
  const role = useAuthStore((state) => state.role);
  const retryAnalysis = useRetryDocumentAnalysis(
    document.id,
    document.meetingId
  );
  const isProcessing = activeStatuses.includes(document.analysisStatus);
  const canRetry =
    role === "Admin" && retryableStatuses.includes(document.analysisStatus);

  return (
    <section
      aria-live="polite"
      className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {isProcessing && (
            <Loader2 className="size-4 animate-spin text-primary" />
          )}
          <h2 className="text-lg font-semibold text-foreground">
            Document summary
          </h2>
          <DocumentAnalysisStatusBadge status={document.analysisStatus} />
        </div>
        {canRetry && (
          <button
            type="button"
            onClick={() => retryAnalysis.mutate()}
            disabled={retryAnalysis.isPending}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-container-low disabled:cursor-not-allowed disabled:opacity-50"
          >
            {retryAnalysis.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <RotateCcw className="size-4" />
            )}
            Retry analysis
          </button>
        )}
      </div>
      {document.summary ? (
        <p className="mt-3 text-sm leading-7 whitespace-pre-wrap text-muted-foreground">
          {document.summary}
        </p>
      ) : (
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {statusMessages[document.analysisStatus]}
        </p>
      )}
      {document.description && (
        <p className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">
          {document.description}
        </p>
      )}
    </section>
  );
}
